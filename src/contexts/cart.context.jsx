import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems,productToAdd) => {
	// find if cartItems contains productToAdd
	const existingCartItem = (cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	));

	// If found, increment quantity
	if(existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
			);
	};

	// return new array with modified cartItems/new cart item
	return [ ...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
	// find if the cart item exists or not
	const existingCartItem = cartItems.find((cartItem) => 
		cartItem.id === productToRemove.id
	);

	// if quantity = 1 then, remove cartitem from cartItems.
	if(existingCartItem.quantity === 1) {
		return cartItems.filter( (cartItem) => cartItem.id != productToRemove.id);
	}

	// if cartItem exists then reduce quantity by 1
	if(existingCartItem) {
		const updatedCartItem = cartItems.map( (cartItem) =>
			cartItem.id === existingCartItem.id ? {...cartItem, quantity: cartItem.quantity -1 } : cartItem
		);
		return updatedCartItem;
	}
}

const clearCartItem = (cartItems, cartItemToClear) => {
	return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id );
}

const CART_ACTION_TYPES = {
	SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
	SET_CART_ITEMS: 'SET_CART_ITEMS',
	SET_CART_COUNT: 'SET_CART_COUNT',
	SET_CART_TOTAL: 'SET_CART_TOTAL',
}

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	cartTotal: 0,
}

const cartReducer = (state, action) => {
	const { type, payload } = action;

	switch(type) {
		case CART_ACTION_TYPES.SET_CART_ITEMS :
			return { ...state, ...payload };
		case CART_ACTION_TYPES.SET_IS_CART_OPEN :
			return { ...state, isCartOpen: payload };
		default:
			throw new Error(`Unhandled action type: ${type} in cartReducer`);
		}
};


export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	cartItemCount: 0,
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	clearItemFromCart: () => {},
	cartTotal: 0,
});

export const CartProvider = ({children}) => {
	const [ { isCartOpen, cartCount, cartTotal, cartItems }, dispatch ] = useReducer(cartReducer, INITIAL_STATE);

	const updateCartItemsReducer = (cartItems) => {
		const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
		const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

		const payload = { cartItems, cartCount: newCartCount, cartTotal: newCartTotal };

		dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
	}

	const setIsCartOpen = (bool) => {
		dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
	}

	// useEffect( () => {
	// 	const count = cartItems.reduce(
	// 		(total, cartItem) => total + cartItem.quantity,
	// 		0
	// 	);
	// 	setCartItemCount(count);
	// }, [cartItems]);

	// useEffect(() => {
	// 	const totalAmount = cartItems.reduce(
	// 		(total, cartItem) => total + cartItem.quantity*cartItem.price,
	// 		0
	// 	);
	// 	setCartTotal(totalAmount);
	// },[cartItems]);

	const addItemToCart = (productToAdd) => {
		const newCartItems = addCartItem(cartItems, productToAdd);
		updateCartItemsReducer(newCartItems);
		// setCartItems(addCartItem(cartItems, productToAdd));
	}

	const removeItemFromCart = (productToRemove) => {
		const newCartItems = removeCartItem(cartItems, productToRemove);
		updateCartItemsReducer(newCartItems);
		// setCartItems(removeCartItem(cartItems,productToRemove));
	}

	const clearItemFromCart = (cartItemToClear) => {
		const newCartItems = clearCartItem(cartItems, cartItemToClear);
		updateCartItemsReducer(newCartItems);
		// setCartItems(clearCartItem(cartItems,cartItemToClear));
	} 

	const value = { 
		isCartOpen,
		setIsCartOpen,
		cartItems,
		cartCount,
		addItemToCart,
		removeItemFromCart,
		clearItemFromCart,
		cartTotal,
	};

	return(
		<CartContext.Provider value={ value }>
			{ children }
		</CartContext.Provider>
	)
}