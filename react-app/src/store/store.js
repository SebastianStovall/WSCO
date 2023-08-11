import { dataNormalizer } from "./utilities";

// constants
const GET_STORE_DATA = "store/GET__STORE_DATA"

const CREATE_POST = "store/CREATE_POST"
const EDIT_POST = "store/EDIT_POST"
const DELETE_POST = "store/DELETE_POST"

// ACTION CREATORS
const getAllStoreData = (users) => ({
    type: GET_STORE_DATA,
    payload: users
})

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

// THUNKS
const initialState = {user: [], posts: [], comments: [], journals: []};


export const getAllStoreDataThunk = () => async (dispatch) => {
    const response = await fetch("/api/users/");

    if(response.ok) {
        const data = await response.json();
        dispatch(getAllStoreData(data))
    }
}

export const createNewPostThunk = (formData) => async (dispatch) => {
    const response = await fetch("/api/posts/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });

    if(response.ok) {
        const postData = await response.json();
        dispatch(createPost(postData))
        return postData
    }
}

export const editPostThunk = (postId, postObj) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postObj),
    });

    if(response.ok) {
        const postData = await response.json();
        dispatch(editPost(postData))
        return postData
    }
}

export const deletePostThunk = (postId) => async (dispatch) => {
    console.log("ITS IN THUNK")
    const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE"
    });

    try {
        if(response.ok) {
            const data = await response.json();
            dispatch(deletePost(postId))
            return data
        }
    } catch(e) {
        return e
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
		default:
			return state;
	}
}
