import { useDispatch, useSelector } from 'react-redux'
import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react"
import { editCommentThunk } from '../../store/store';
import { deleteCommentThunk } from '../../store/store';

function EditComment({commentText, commentId}) {

    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const [comment, setComment] = useState("")
    const [formErrors, setFormErrors] = useState({})

    useEffect(() => {
        setComment(commentText)
    }, [dispatch, commentText])

    const handleEditComment = async (e) => {
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

        const updatedCommentObj = {
            comment: comment,
        }

        await dispatch(editCommentThunk(commentId, updatedCommentObj))
        closeModal()
    }

    const handleDeleteComment = async() => {
        await dispatch(deleteCommentThunk(commentId))
        closeModal()
    }

    return (
        <div id="create-comment-main-container">
            <form id="create-comment-form" onSubmit={handleEditComment}>
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
                <button type="submit" id="submit-new-comment-button">Save Changes</button>
            </form>
            <button id="delete-comment-button" onClick={handleDeleteComment}>Delete Comment</button>
        </div>
    )
}

export default EditComment
