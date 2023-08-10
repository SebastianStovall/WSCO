import { dataNormalizer } from "./utilities";

// constants
const GET_USERS = "session/GET_USERS"

// ACTION CREATORS
const getAllUsers = (users) => ({
    type: GET_USERS,
    payload: users
})

// THUNKS
const initialState = {};
export const getAllUsersThunk = () => async (dispatch) => {
    const response = await fetch("/api/users/");

    if(response.ok) {
        const data = await response.json();
        dispatch(getAllUsers(data))
    }
}


export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_USERS: {
            const allUsers = action.payload;
            const normalizedUsers = dataNormalizer(allUsers);
            return {
                ...state,
                ...normalizedUsers
            }
        }
		default:
			return state;
	}
}
