import { getAllStoreDataThunk } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { deletePostThunk } from "../../store/store";
import "./PostDetails.css"

function PostDetails() {

    const { username, postId } = useParams()
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

    // if you dont have necessary info to load this page, return null to re-render
    if(!user || !allStoreData.posts.length) return null

    // find post details
    const postDetails = allStoreData.posts.filter((post) => post.id === Number(postId))[0]

    // find user info thats associated with this post
    const userIndex = allStoreData.user.findIndex((user) => user.username === username)
    const userInfo = allStoreData.user[userIndex]
    const userId = userInfo.id


    return (
        <div id="post-details-main-container">
                <p id="exit-button" onClick={() => history.push(`/${user.username}/gallery`)}>X</p>
            <div id="post-details-image-container">
                <img src={postDetails?.photoUrl} />
            </div>
            <div id="post-details-crud-buttons">
                {userId === user.id ? <button onClick={() => history.push(`/${user.username}/edit/${postDetails?.id}`)}>Edit</button> : null}
                {userId === user.id ? <button onClick={handleDeletePost}>Delete</button> : null}
            </div>
            <div id="post-details-post-info-container">
                <p onClick={() => history.push(`/${user.username}/gallery`)}>{user?.username}</p>
            </div>
        </div>
    )

}

export default PostDetails
