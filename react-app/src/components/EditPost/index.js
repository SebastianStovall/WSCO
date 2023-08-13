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

    const postDetails = allStoreData.posts.filter((post) => post.id === Number(postId))[0]

    useEffect(() => {
        if (postDetails) {
            setImage(postDetails.photoUrl);
            setImageUrl(postDetails.photoUrl)
            setCaption(postDetails.caption);
        }
    }, [postDetails]);

    const handleEditPost = async(e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append("photoUrl", image);
        formData.append("caption", caption);

        setImageUrl(URL.createObjectURL(image)); // Set temporary image URL

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
            <p id="exit-button" onClick={() => history.push(`/${user?.username}/gallery`)}>X</p>
            <h3>Studio</h3>
            <form encType="multipart/form-data" onSubmit={handleEditPost}>
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
                    {formErrors.photoUrl && <span className='errors'>{formErrors.photoUrl}</span>}
                </div>
                <div id="edit-post-caption-container">
                    <textarea
                        id="new_photo_caption"
                        type="text"
                        placeholder="caption"
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
