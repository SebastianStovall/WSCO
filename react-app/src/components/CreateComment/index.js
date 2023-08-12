import { useDispatch, useSelector } from 'react-redux'
import { useModal } from "../../context/Modal";
import { useState } from "react"
import { createCommentThunk } from '../../store/store';
import "./CreateComment.css"

function CreateComment({postId}) {

    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const user = useSelector(state => state.session.user)

    const [comment, setComment] = useState("")
    const [formErrors, setFormErrors] = useState({})

    const handleCreateComment = async (e) => {
        e.preventDefault()

        if(comment.length === 0) {
            const errors = {}
            errors.comment = "comment cannot be empty text"
            setFormErrors(errors)
            return
        }

        if(comment.length > 255) {
            const errors = {}
            errors.comment = "comment cannot exceed 255 characters"
            setFormErrors(errors)
            return
        }

        const commentObj = {
            comment: comment,
            postId: postId,
            userId: user.id
        }

        await dispatch(createCommentThunk(commentObj))
        closeModal()

    }


    return (
        <div id="create-comment-main-container">
            <form id="create-comment-form" onSubmit={handleCreateComment}>
                <div>
                    <textarea
                        type="text"
                        placeholder="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                </div>
                    {formErrors.comment && <span className='errors'>{formErrors.comment}</span>}
                <button type="submit" id="submit-new-comment-button">Submit</button>
            </form>
        </div>
    )
}

export default CreateComment
