
// constants
const GET_STORE_DATA = "store/GET__STORE_DATA"

const CREATE_POST = "store/CREATE_POST"
const EDIT_POST = "store/EDIT_POST"
const DELETE_POST = "store/DELETE_POST"

const CREATE_COMMENT = "store/CREATE_COMMENT"
const EDIT_COMMENT = "store/EDIT_COMMENT"
const DELETE_COMMENT = "store/DELETE_COMMENT"

const ADD_TO_COLLECTION = "store/ADD_TO_COLLECTION"
const DELETE_FROM_COLLECTION = "store/DELETE_FROM_COLLECTION"

const CREATE_JOURNAL = "store/CREATE_JOURNAL"
const DELETE_JOURNAL = "store/DELETE_JOURNAL"

// ACTION CREATORS
const getAllStoreData = (users) => ({
    type: GET_STORE_DATA,
    payload: users
})

//WSCO POST(s) ACTIONS
const createPost = (postData) => ({
    type: CREATE_POST,
    payload: postData
})

const editPost = (postData) => ({
    type: EDIT_POST,
    payload: postData
})

const deletePost = (postId) => ({
    type: DELETE_POST,
    payload: postId
})


//COMMENT ACTIONS
const createComment = (commentData) => ({
    type: CREATE_COMMENT,
    payload: commentData
})

const editComment = (commentData) => ({
    type: EDIT_COMMENT,
    payload: commentData
})

const deleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    payload: commentId
})

//COLLECTION ACTIONS

const addToCollection = (collectionInfo) => ({
    type: ADD_TO_COLLECTION,
    payload: collectionInfo
})

const deleteFromCollection = (collectionInfo) => ({
    type: DELETE_FROM_COLLECTION,
    payload: collectionInfo
})

// JOURNAL ACTIONS

const addJournal = (journalObj) => ({
    type: CREATE_JOURNAL,
    payload: journalObj
})

const deleteJournal = (journalId) => ({
    type: DELETE_JOURNAL,
    payload: journalId
})


// THUNKS
const initialState = {user: [], posts: [], comments: [], journals: []};

// GET (user, posts, comments, journals)
export const getAllStoreDataThunk = () => async (dispatch) => {
    const response = await fetch("/api/users/");

    if(response.ok) {
        const data = await response.json();
        dispatch(getAllStoreData(data))
    }
}

//POST THUNKS

export const createNewPostThunk = (formData) => async (dispatch) => {
    const response = await fetch("/api/posts/new", {
        method: "POST",
        body: formData
    });

    if(response.ok) {
        const postData = await response.json();
        dispatch(createPost(postData))
        return postData
    }
}

export const editPostThunk = (postId, formData) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        body: formData
    });

    if(response.ok) {
        const postData = await response.json();
        dispatch(editPost(postData))
        return postData
    }
}

export const deletePostThunk = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE"
    });

    try {
        if(response.ok) {
            // const data = await response.json();
            dispatch(deletePost(postId))
            // return data
        }
    } catch(e) {
        return e
    }

}

//COMMENT THUNKS

export const createCommentThunk = (commentObj) => async (dispatch) => {
    const response = await fetch('/api/comments/new', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentObj)
    })

    if(response.ok) {
        const commentData = await response.json();
        dispatch(createComment(commentData))
        return commentData
    }

}

export const editCommentThunk = (commentId, updatedCommentObj) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCommentObj),
    });

    if(response.ok) {
        const commentData = await response.json();
        dispatch(editComment(commentData))
        return commentData
    }
}

export const deleteCommentThunk = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    });

    if(response.ok) {
        dispatch(deleteComment(commentId))
    }

}

//COLLECTION THUNKS

export const addToCollectionThunk = (userId, postId) => async (dispatch) => {
    const response = await fetch('/api/collections/add', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({userId, postId})
    })

    if(response.ok) {
        const data = await response.json()
        dispatch(addToCollection({userId, postId}))
    }

}

export const deleteFromCollectionThunk = (userId, postId) => async (dispatch) => {
    const response = await fetch(`/api/collections/${postId}`, {
        method: "DELETE"
    });

    if(response.ok) {
        dispatch(deleteFromCollection({userId, postId}))
    }

}

// JOURNAL THUNKS

export const addJournalThunk = (formData) => async (dispatch) => {
    const response = await fetch('/api/journals/new', {
        method: "POST",
        body: formData
    })

    if(response.ok) {
        const journalData = await response.json();
        dispatch(addJournal(journalData))
    }

}

export const deleteJournalThunk = (journalId) => async (dispatch) => {
    const response = await fetch(`/api/journals/${journalId}`, {
        method: "DELETE"
    })

    if(response.ok) {
        dispatch(deleteJournal(journalId))
    }
}


export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_STORE_DATA: {
            const allUsers = action.payload;
            let allUser = []
            let allPosts = []
            let allComments = []
            let allJournals = []

            allUsers.forEach(user => {
                allPosts.push(user.posts)
                allComments.push(user.comments)
                allJournals.push(user.journals)

                allUser.push({
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "profileImgUrl": user.profileImgUrl,
                    "profileBio": user.profileBio,
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "collection": user.collection
                })


            });

            allPosts = allPosts.flat()
            allComments = allComments.flat()
            allJournals = allJournals.flat()

            return {...state, user: allUser, posts: allPosts, comments: allComments, journals: allJournals}

        }
        case CREATE_POST: {
            const postObj = action.payload
            const newState = {...state, posts: [postObj, ...state.posts] };
            return newState
        }
        case EDIT_POST: {
            const editedPost = action.payload
            const postId = editedPost.id

            const postIndex = state.posts.findIndex(post => post.id === postId)

            const updatedPosts = [...state.posts];
            updatedPosts[postIndex] = editedPost
            return {...state, posts: updatedPosts}

        }
        case DELETE_POST: {
            const postId = action.payload
            const newState = { ...state }

            const postArray = newState.posts
            const indexToDelete = postArray.findIndex((post) => post.id === Number(postId))

            postArray.splice(indexToDelete, 1)
            return newState
        }
        case CREATE_COMMENT: {
            const commentObj = action.payload
            const newState = {...state, comments: [commentObj, ...state.comments] };
            return newState
        }
        case EDIT_COMMENT: {
            const editedComment = action.payload
            const commentId = editedComment.id

            const commentIndex = state.comments.findIndex(comment => comment.id === commentId)

            const updatedComments = [...state.comments];
            updatedComments[commentIndex] = editedComment
            return {...state, comments: updatedComments}
        }
        case DELETE_COMMENT: {
            const commentId = action.payload
            const newState = { ...state }

            const commentArray = newState.comments
            const indexToDelete = commentArray.findIndex((comment) => comment.id === Number(commentId))

            commentArray.splice(indexToDelete, 1)
            return newState
        }
        case ADD_TO_COLLECTION: {
            const {userId, postId} = action.payload
            const newState = {...state}

            const postInfoForCollection = state.posts.find((post) => post.id === Number(postId))
            const findUserIndex = state.user.findIndex((user) => user.id === Number(userId))

            const newCollectionObj = {
                caption: postInfoForCollection.caption,
                id: Number(postId),
                photoUrl: postInfoForCollection.photoUrl,
                userId: postInfoForCollection.userId
            }

            // Update the user's collection array by adding the new collection object
            newState.user[findUserIndex].collection.unshift(newCollectionObj);
            return newState;
        }
        case DELETE_FROM_COLLECTION: {
            const {userId, postId} = action.payload
            const newState = {...state}

            const findUserIndex = newState.user.findIndex((user) => user.id === Number(userId))

            const findCollectionIndex = newState.user[findUserIndex].collection.findIndex((collection) => collection.id === Number(postId))
            newState.user[findUserIndex].collection.splice(findCollectionIndex, 1)

            return newState;
        }
        case CREATE_JOURNAL: {
            const journalObj = action.payload;
            const newJournals = [journalObj, ...state.journals];
            const newState = { ...state, journals: newJournals };
            return newState;
        }
        case DELETE_JOURNAL: {
            const journalId = action.payload
            const newState = { ...state }

            const journalArray = newState.journals
            const indexToDelete = journalArray.findIndex((journal) => journal.id === Number(journalId))

            journalArray.splice(indexToDelete, 1)
            return newState
        }
		default:
			return state;
	}
}
