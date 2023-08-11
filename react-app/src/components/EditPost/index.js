import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { editPostThunk } from "../../store/store";

function EditPost() {
    const history = useHistory()
    const {username, postId} = useParams()
    const dispatch = useDispatch()
    const allStoreData = useSelector((store) => store.store);

    const [url, setUrl] = useState("")
    const [caption, setCaption] = useState("")
    const [formErrors, setFormErrors] = useState({})

    const postDetails = allStoreData.posts.filter((post) => post.id === Number(postId))[0]

    useEffect(() => {
        if (postDetails) {
            setUrl(postDetails.photoUrl);
            setCaption(postDetails.caption);
        }
    }, [postDetails]);

    const handleEditPost = async(e) => {
        e.preventDefault()

        const editedPostObj = {
            photoUrl: url,
            caption: caption
        }

        const response = await dispatch(editPostThunk(postId, editedPostObj))
        if(response.errors) {
            const errors = response.errors
            setFormErrors(errors)
        } else {
            history.push(`/${username}/gallery/${postId}`)
        }
    }

    return (
        <div>
            <h4>Studio</h4>

            <form>
                <div>
                    <label>
                        url
                    </label>
                    <input
                        id="new_photo_url"
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
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
                <button type="submit" className="new-post-submit-button" onClick={handleEditPost}>Save Changes</button>
            </form>
        </div>
    )
}

export default EditPost
