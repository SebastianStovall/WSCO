import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { editPostThunk } from "../../store/store";
import "./EditPost.css"

function EditPost() {
    const history = useHistory()
    const {username, postId} = useParams()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const allStoreData = useSelector((store) => store.store);

    // const [url, setUrl] = useState("")
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [caption, setCaption] = useState("")
    const [formErrors, setFormErrors] = useState({})
    const [newPhoto, setNewPhoto] = useState(false)

    const postDetails = allStoreData.posts.filter((post) => post.id === Number(postId))[0]

    useEffect(() => {
        if (postDetails) {
            // setImage(postDetails.photoUrl);
            setImageUrl(postDetails.photoUrl);
            setCaption(postDetails.caption);
        }
    }, [postDetails]);

    const handleEditPost = async(e) => {
        e.preventDefault()

        console.log("THIS IS THE IMAGE", image)
        const errors = {}
        if(newPhoto) {
            if(image === null) {
                errors.photoUrl = "Must attach a new image for this post"
                setFormErrors(errors)
                return
            }
            let fileExtCheck = true;
            if(!image.name.endsWith("jpeg") && !image.name.endsWith("jpg") && !image.name.endsWith("png")) fileExtCheck = false

            if(!fileExtCheck) {
            errors.photoUrl = 'Image must end in either "jpg", "jpeg", or "png"'
            setFormErrors(errors)
            return
            }
        }

        if (!caption.replace(/\s/g, '').length && caption.length !== 0) {
            errors.caption = 'caption can not contain only whitespace (ie. spaces, tabs or line breaks)'
            setFormErrors(errors)
            return
            }

        const formData = new FormData();

        if(newPhoto) {
            setImageUrl(URL.createObjectURL(image)); // Set temporary image URL
            formData.append("photoUrl", image);
            formData.append("caption", caption);
        } else {
            formData.append("caption", caption);
        }

        const response = await dispatch(editPostThunk(postId, formData))
        if(response.errors) {
            const errors = response.errors
            setFormErrors(errors)
            setImageUrl(null); // Clear temporary image URL on error
        } else {
            setImageUrl(null); // Clear temporary image URL on error
            history.push(`/${username}/gallery/${postId}`)
        }
    }

    return (
        <div id="edit-post-main-container">
            <p className="exit-button" onClick={() => history.push(`/${user?.username}/gallery`)}>X</p>
            <h3>Studio</h3>
            <form encType="multipart/form-data" onSubmit={handleEditPost}>
                <div id="upload-image-container">
                    {imageUrl ? <img src={imageUrl} alt="Selected" />
                    : <img src="https://filetandvine.com/wp-content/uploads/2015/10/pix-vertical-placeholder.jpg" alt="img-placeholder"/>}
                </div>
                <button type="button" onClick={() => {setNewPhoto(true); setImageUrl(null)}} className={ !newPhoto ? "swap-photo-button" : "swap-photo-button-hide"}>Change Photo</button>
                {newPhoto ? <div id="file-upload-container">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            setImage(e.target.files[0]);
                            setImageUrl(URL.createObjectURL(e.target.files[0])); // Update temporary image URL
                        }}
                        />
                </div> : null}
                        {formErrors.photoUrl && <span className='errors'>{formErrors.photoUrl}</span>}
                <div id="edit-post-caption-container">
                    <textarea
                        id="new_photo_caption"
                        type="text"
                        placeholder="caption (optional)"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    />
                    {formErrors.caption && <span className='errors'>{formErrors.caption}</span>}
                </div>
                <button type="submit" className="new-post-submit-button">Save Changes</button>
            </form>
        </div>
    )
}

export default EditPost
