// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const UPDATE_USER = "session/UPDATE_USER";
// const UPDATE_USER_PASSWORD = "session/UPDATE_USER_PASSWORD";
const DELETE_USER = "session/DELETE_USER";

//ACTION CREATORS

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const editUser = (updatedInfo) => ({
	type: UPDATE_USER,
	payload: updatedInfo
})

// const editUserPassword = (updatedInfo) => ({
// 	type: UPDATE_USER,
// 	payload: updatedInfo
// })

const deleteUser = () => ({
	type: DELETE_USER,
	payload: null
})

const initialState = { user: null };

//THUNKS

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const updateUser = (formData) => async (dispatch) => {
	const response = await fetch("/api/users/account", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData)
	})

	if(response.ok) {
		const thunkResponse = await response.json()
		dispatch(editUser(thunkResponse))
		return thunkResponse
	}
}

// export const updateUserPassword = (formData) => async (dispatch) => {
// 	const response = await fetch("/api/users/account/pasword", {
// 		method: "PUT",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(formData)
// 	})

// 	if(response.ok) {
// 		const thunkResponse = await response.json()
// 		dispatch(editUserPassword(thunkResponse))
// 		return thunkResponse
// 	}
// }

export const deleteUserAccount = () => async (dispatch) => {
	const response = await fetch("/api/users/delete", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		}
	})

	if(response.ok) {
		dispatch(deleteUser())
	}
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case UPDATE_USER:
			return {user: action.payload};
		// case UPDATE_USER_PASSWORD:
		// 	return {user: action.payload};
		case DELETE_USER:
			return {user: action.payload}
		default:
			return state;
	}
}
