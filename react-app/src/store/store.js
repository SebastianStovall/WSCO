import { dataNormalizer } from "./utilities";

// constants
const GET_STORE_DATA = "users/GET__STORE_DATA"

const DELETE_POST = "users/DELETE_POST"

// ACTION CREATORS
const getAllStoreData = (users) => ({
    type: GET_STORE_DATA,
    payload: users
})

const deletePost = (obj) => ({
    type: DELETE_POST,
    payload: obj
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

export const deletePostThunk = (postId, userId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    // if(response.ok) {
        const data = await response.json();
        console.log("RESPONSE FORM THUNK", data)
        dispatch(deletePost({postId, userId}))
        return data
    // }
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
            const {postId, userId} = action.payload
            const newState = {...state}

            const postArray = newState[userId].posts
            const indexToDelete = postArray.findIndex((post) => post.id === Number(postId))

            postArray.splice(indexToDelete, 1)
            return newState

        }
		default:
			return state;
	}
}
