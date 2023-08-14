import { useEffect, useState } from "react"
import "./NewJournal.css"
import { useDispatch, useSelector } from "react-redux"
import { addJournalThunk } from "../../store/store"

function NewJournal() {

    const user = useSelector((state) => state.session.user)

    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [photos, setPhotos] = useState(["", "", ""]);

    const handleNewJournal = async(e) => {
        e.preventDefault()

        const formData = new FormData();
        for(let i = 0; i < photos.length; i++) {
            formData.append(`photoUrl`, photos[i])
        }

        formData.append("title", title);
        formData.append("description", description);
        formData.append("userId", user.id);

        await dispatch(addJournalThunk(formData))

    }

    return(
        <div id="new-journal-main-container">
            <form id="new-journal-form" onSubmit={handleNewJournal}>
                <div id="new-journal-basic-info-section">
                    <h2>Basic Info</h2>
                    <div>
                        <input
                            type="text"
                            placeholder="Journal Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    {/* {errors.title && <span className="errors">{errors.title[0]}</span>} */}

                    <div>
                        <input
                            type="text"
                            placeholder="Description (optional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    {/* {errors.description && <span className="errors">{errors.description[0]}</span>} */}
                </div>

                <div id="new-journal-photos-section">
                    <h2>Attatch Photos</h2>
                    <p>Please provide at least 3 photos</p>

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
                        {photos.length > 1 && (
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
                <button type="submit" id="new-journal-create-button">Create Journal</button>
            </form>
        </div>
    )
}

export default NewJournal
