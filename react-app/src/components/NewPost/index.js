import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createNewPostThunk } from "../../store/store";
import "./NewPost.css"

function NewPost() {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [caption, setCaption] = useState("")
    const [formErrors, setFormErrors] = useState({})

    const handleCreatePost = async(e) => {
        e.preventDefault()

        const errors = {}
        if (!caption.replace(/\s/g, '').length && caption.length !== 0) {
            errors.caption = 'caption can not contain only whitespace (ie. spaces, tabs or line breaks)'
            setFormErrors(errors)
            return
            }

        const formData = new FormData();
        formData.append("photoUrl", image);
        formData.append("caption", caption)

        setImageUrl(URL.createObjectURL(image)); // Set temporary image URL

        const response = await dispatch(createNewPostThunk(formData))
        if(response.errors) {
            const errors = response.errors
            setFormErrors(errors)
            setImageUrl(null); // Clear temporary image URL on error
        } else {
            history.push(`/${user.username}/gallery`)
            setImageUrl(null); // Clear temporary image URL on success
        }
    }


    return (
        <div id="new-post-main-container">
            <p className="exit-button" onClick={() => history.push(`/${user?.username}/gallery`)}>X</p>
            <h3>Studio</h3>

            <form encType="multipart/form-data" onSubmit={handleCreatePost}>
                <div id="upload-image-container">
                    {imageUrl ? <img src={imageUrl} alt="Selected" />
                    : <img src="https://filetandvine.com/wp-content/uploads/2015/10/pix-vertical-placeholder.jpg" alt="img-placeholder"/>}
                </div>
                <div id="file-upload-container">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            setImage(e.target.files[0]);
                            setImageUrl(URL.createObjectURL(e.target.files[0])); // Update temporary image URL
                        }}
                    />
                </div>
                    {formErrors.photoUrl && <span className='errors'>{formErrors.photoUrl}</span>}
                <div id="create-post-caption-container">
                    <textarea
                        id="new_photo_caption"
                        type="text"
                        placeholder="caption (optional)"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    />
                    {formErrors.caption && <span className='errors'>{formErrors.caption}</span>}
                </div>
                <button type="submit" className="new-post-submit-button">Post</button>
            </form>
        </div>
    )
}

export default NewPost
