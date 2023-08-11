import { dataNormalizer } from "./utilities";

// constants
const GET_STORE_DATA = "store/GET__STORE_DATA"

const DELETE_POST = "store/DELETE_POST"

// ACTION CREATORS
const getAllStoreData = (users) => ({
    type: GET_STORE_DATA,
    payload: users
})

const deletePost = (postId) => ({
    type: DELETE_POST,
    payload: postId
})

// THUNKS
const initialState = {user: {}, posts: {}, comments: {}, journals: {}};


export const getAllStoreDataThunk = () => async (dispatch) => {
    const response = await fetch("/api/users/");

    if(response.ok) {
        const data = await response.json();
        dispatch(getAllStoreData(data))
    }
}

export const deletePostThunk = (postId) => async (dispatch) => {
    console.log("ITS IN THUNK")
    const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE"
    });

    try {
        if(response.ok) {
            console.log("ITS OK STATUS")
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
