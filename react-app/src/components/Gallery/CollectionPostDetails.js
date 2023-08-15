import { getAllStoreDataThunk } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import CreateComment from "../CreateComment";
import EditComment from "../EditComment";
import { addToCollectionThunk } from "../../store/store";
import { deleteFromCollectionThunk } from "../../store/store";

// Purpose of this file is the same as normal post details, except exiting redirects you to the person's collection page that your currently viewing

function CollectionPostDetails() {

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

    const handleAddToCollection = async() => {
        await dispatch(addToCollectionThunk(user.id, postId))
        // only way i could fix (add to collection bug), wont update without this dispatch
        await dispatch(getAllStoreDataThunk())
        history.push(`/${user.username}/gallery`)
    }

    const handleRemoveFromCollection = async() => {
        await dispatch(deleteFromCollectionThunk(user.id, postId))
        history.push(`/${user.username}/gallery`)
    }

    // if you dont have necessary info to load this page, return null to re-render
    if(!allStoreData.posts.length) return null

    if(!user) {
        return (
            <div id="login-redirect-page-container">
                <h2>Like what you see?</h2>
                <p>Log in or Sign up to interact with community posts!</p>
            </div>
        )
    }

    // find post details
    const postDetails = allStoreData?.posts.filter((post) => post.id === Number(postId))[0]
    const comments = allStoreData?.comments.filter((comment) => comment.postId === Number(postId))

    for (let index = 0; index < comments.length; index++) {
        const ele = comments[index]
        const user = allStoreData?.user.find((user) => user.id === ele.userId)
        ele.user = user
    }

    // find user info thats associated with this post
    const userIndex = allStoreData?.user.findIndex((user) => user.username === username)
    const userInfo = allStoreData?.user[userIndex]
    const userId = userInfo.id

    // see if the user has the post in their collection... will return -1 if NOT IN COLLECTION
    const hasPostInCollection = user?.collection?.filter((likedPost) => likedPost.id === postDetails?.id)

    let hasComment = false
    if(user.id !== userId) {
        const doesUserHaveComment = comments.filter((comment) => comment.userId === user.id)
        if(doesUserHaveComment.length > 0) hasComment = true
    }

    return (
        <div id="post-details-main-container">
                <p id="exit-button" onClick={() => history.push(`/${username}/gallery`)}>X</p>
            <div id="post-details-image-container">
                <img src={postDetails?.photoUrl} />
            </div>
            <div id="post-details-crud-buttons">
                {userId !== user.id && !hasComment ? <OpenModalButton buttonText={"Comment"} modalComponent={<CreateComment postId={postDetails.id}/>} /> : null}
                {hasPostInCollection.length === 0 && postDetails?.userId !== user.id ? <button id="add-to-collection-button" onClick={handleAddToCollection}>Add to Collection</button> : ""}
                {hasPostInCollection.length > 0 && postDetails?.userId !== user.id ? <button id="add-to-collection-button" onClick={handleRemoveFromCollection}>Remove from Collection</button> : ""}
            </div>
            <div id="post-details-post-info-container">
                <p onClick={() => history.push(`/${postDetails?.user?.username}/gallery`)}>{postDetails?.user?.username}</p>
                <div id="limit-caption-container">
                    <p>{postDetails?.caption}</p>
                </div>
            </div>
            <div id="comments-main-container">
                {comments.length ? <p>Comments: ({comments.length})</p> : ""}
                {comments.map((comment) => {
                    return <div id="single-comment-component" key={comment.id}>
                        <div>
                            <div id="comment-profile-img-container">
                                {comment.user.profileImgUrl ? <img src={comment.user.profileImgUrl} />
                                : <img src="https://rassets.vsco.co/avatars/avatar-other.png?c=1&d=1&w=300" />}
                            </div>
                            <div id="inner-comment-content">
                                <p>
                                    {comment.comment}
                                    {comment.userId === user.id ? <OpenModalButton buttonText={"edit"} modalComponent={<EditComment commentText={comment.comment} commentId={comment.id}/>} />: null}
                                </p>
                                <p>{comment.user.username}</p>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default CollectionPostDetails
