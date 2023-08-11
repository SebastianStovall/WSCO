import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { createNewPostThunk } from "../../store/store";
import { getAllStoreDataThunk } from "../../store/store";

function NewPost() {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)

    const [url, setUrl] = useState("")
    const [caption, setCaption] = useState("")

    const [formErrors, setFormErrors] = useState({})

    const handleCreatePost = async(e) => {
        e.preventDefault()

        const newPostObj = {
            photoUrl: url,
            caption: caption
        }

        const response = await dispatch(createNewPostThunk(newPostObj))
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
                <button type="submit" className="new-post-submit-button" onClick={handleCreatePost}>Post</button>
            </form>
        </div>
    )
}

export default NewPost
