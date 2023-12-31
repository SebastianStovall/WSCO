import { useState } from "react"
import "./NewJournal.css"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { addJournalThunk } from "../../store/store"

function NewJournal() {

    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [photos, setPhotos] = useState(["", "", ""]);
    const [formErrors, setFormErrors] = useState({})
    const [loading, setLoading] = useState(false);
    const [userSubmitted, setUserSubmitted] = useState(false);

    const handleNewJournal = async(e) => {
        e.preventDefault()

        let photoCount = 0
        for(let i = 0; i < photos.length; i++) {
            if (photos[i] !== "") photoCount++
        }

        setUserSubmitted(true)
        const errors = {}

        if(!title) {
            errors.title = "Journal must have a title"
        }
        if(title.length > 50) {
            errors.title = "title cannot exceed 50 characters"
        }
        if (!title.replace(/\s/g, '').length && title.length !== 0) {
            errors.title2 = 'title can not contain only whitespace (ie. spaces, tabs or line breaks)'
        }
        if(description.length > 150) {
            errors.description = "description cannot exceed 150 characters"
        }
        if (!description.replace(/\s/g, '').length && description.length !== 0) {
            errors.description2 = 'description can not contain only whitespace (ie. spaces, tabs or line breaks)'
        }
        if(photoCount < 3) {
            errors.photos = "Please provide at least 3 photos"
        }

        let fileExtCheck = true;
        photos.forEach((photo) => {
            if(photo) {
                const lowerCaseName = photo.name.toLowerCase();
                if(!lowerCaseName.endsWith("jpeg") && !lowerCaseName.endsWith("jpg") && !lowerCaseName.endsWith("png")) fileExtCheck = false
            }
        })

        if(!fileExtCheck) {
            errors.file = ' Photos must end in either "jpg", "jpeg", or "png" '
        }

        if(Object.keys(errors).length > 0) {
            setFormErrors(errors)
            setUserSubmitted(false)
            return
        }

        const formData = new FormData();
        for(let i = 0; i < photos.length; i++) {
            formData.append(`photoUrl`, photos[i])
        }

        formData.append("title", title);
        formData.append("description", description);
        formData.append("userId", user.id);

        setLoading(true)
        await dispatch(addJournalThunk(formData))

        setLoading(false)
        setUserSubmitted(false)

        history.push(`/${user.username}/gallery`)

    }

    return(
        <div id="new-journal-main-container">
            <p id="exit-button-journal" onClick={() => history.push(`/${user?.username}/gallery`)}>X</p>
            <form id="new-journal-form" onSubmit={handleNewJournal}>
                <div id="new-journal-basic-info-section">
                    <h2>Basic Info</h2>
                    <div>
                        {formErrors.title && <span className="errors">{formErrors.title}</span>}
                        {formErrors.title2 && <span className="errors">{formErrors.title2}</span>}
                        <input
                            type="text"
                            placeholder="Journal Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Description (optional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    {formErrors.description && <span className="errors">{formErrors.description}</span>}
                    {formErrors.description2 && <span className="errors">{formErrors.description2}</span>}
                </div>

                <div id="new-journal-photos-section">
                    <h2>Attatch Photos</h2>
                    <p>Please provide at least 3 photos</p>
                    {formErrors.photos && <span className="errors">{formErrors.photos}</span>}
                    {formErrors.file && <span className="errors">{formErrors.file}</span>}

                    <div className="product-button-container">
                        {/* // ADD A Photo */}
                        {photos.length < 10 && (
                            <button
                                className="add-delete-photo-buttons"
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const newPhotos = [...photos, ""];
                                    setPhotos(newPhotos);
                                }}
                            >
                            Add Photo
                            </button>
                        )}
                    </div>

                    <div className="product-button-container">
                        {/* REMOVE A Photo */}
                        {photos.length > 3 && (
                            <button
                                className="add-delete-photo-buttons"
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const newPhotos = [...photos];
                                    newPhotos.pop();
                                    setPhotos(newPhotos);
                                }}
                            >
                            Remove Photo
                            </button>
                        )}
                    </div>
                    {/* {errors.photos && <span className="errors">{errors.photos[0]}</span>} */}

                    <div>
                        {photos?.map((str, index) => (
                            <input
                                // key={index}
                                type="file"
                                accept="image*/"
                                // placeholder={`Photo ${index + 1}`}
                                // value={photos[index]}
                                onChange={(e) => {
                                    let newPhotos = [...photos];
                                    newPhotos[index] = e.target.files[0];
                                    setPhotos(newPhotos);
                                }}
                            />
                        ))}
                    </div>


                </div>
                <button type="submit" id="new-journal-create-button" disabled={userSubmitted}>Create Journal</button>
                {loading ? <p>Loading...</p> : ""}
            </form>
        </div>
    )
}

export default NewJournal
