import { getAllStoreDataThunk } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { deletePostThunk } from "../../store/store";
import "./PostDetails.css"

function PostDetails() {

    const { postId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    let user = useSelector((store) => store.session.user)
    const allStoreData = useSelector((store) => store.store);

    useEffect(() => {
        if (!allStoreData.posts.length || !allStoreData.user.length || !allStoreData.comments.length || !allStoreData.journals.length) {
            async function fetchData() {
                await dispatch(getAllStoreDataThunk())
            }
            fetchData()
        }
    }, [dispatch, allStoreData]);

    const handleDeletePost = async() => {
        await dispatch(deletePostThunk(postId))
        await dispatch(getAllStoreDataThunk())
        history.push(`/${user?.username}/gallery`)
    }

    if(!user) return null
    // if(!allStoreData.user.length === 0 || !allStoreData.posts.length) return null

    const loggedInUserPost = user?.posts.filter(img => img.id === Number(postId))[0]
    let postDetails = loggedInUserPost

    if(postDetails === undefined) {
        postDetails = allStoreData.posts.filter((post) => post.id === Number(postId))[0]
        user = allStoreData.user.filter((user) => user.id === Number(postDetails.userId))[0]
    }


    return (
        <div id="post-details-main-container">
                <p id="exit-button" onClick={() => history.push(`/${user.username}/gallery`)}>X</p>
            <div id="post-details-image-container">
                <img src={postDetails.photoUrl} />
            </div>
            <div id="post-details-crud-buttons">
                {loggedInUserPost !== undefined ? <button onClick={handleDeletePost}>Edit</button> : null}
                {loggedInUserPost !== undefined ? <button onClick={handleDeletePost}>Delete</button> : null}
            </div>
            <div id="post-details-post-info-container">
                <p onClick={() => history.push(`/${user.username}/gallery`)}>{user?.username}</p>
            </div>
        </div>
    )

}

export default PostDetails
