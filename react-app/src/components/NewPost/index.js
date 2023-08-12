import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createNewPostThunk } from "../../store/store";

function NewPost() {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)

    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [caption, setCaption] = useState("")

    const [formErrors, setFormErrors] = useState({})

    const handleCreatePost = async(e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append("photoUrl", image);
        formData.append("caption", caption)

        setImageLoading(true);
        const response = await dispatch(createNewPostThunk(formData))
        if(response.errors) {
            const errors = response.errors
            setFormErrors(errors)
        } else {
            history.push(`/${user.username}/gallery`)
        }
    }


    return (
        <div>
            <h4>Studio</h4>

            <form encType="multipart/form-data" onSubmit={handleCreatePost}>
                <div>
                    <label>
                        url
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    {formErrors.photoUrl && <span className='errors'>{formErrors.photoUrl}</span>}
                </div>
                <div>
                    <label>
                        caption
                    </label>
                    <input
                        id="new_photo_caption"
                        type="text"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    />
                    {formErrors.caption && <span className='errors'>{formErrors.caption}</span>}
                </div>
                <button type="submit" className="new-post-submit-button">Post</button>
                {(imageLoading)&& <p>Loading...</p>}
            </form>
        </div>
    )
}

export default NewPost
