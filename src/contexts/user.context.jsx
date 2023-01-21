import { createContext, useEffect, useReducer } from "react";


export const UserContext = createContext({
	setCurrentUser: () => null,
	currentUser: null,
});

export const USER_ACTION_TYPES = {
	SET_CURRENT_USER: 'SET_CURRENT_USER',
}

const INITIAL_STATE = {
	currentUser: null,
}

const userReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return { ...state, currentUser: payload };
		default:
			throw new Error(`Unhandled type ${type} in userReducer`);
	}
}

export const UserProvider = ({ children }) => {
	//const [ currentUser, setCurrentUser ] = useState(null);
	const [ state, dispatch ] = useReducer(userReducer, INITIAL_STATE);
	const { currentUser } = state;	

	const value = { currentUser };

	return (
		<UserContext.Provider value={value} >
			{children}
		</UserContext.Provider>
	);
}