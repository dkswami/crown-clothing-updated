import { createContext, useState, useEffect, useContext } from "react";
import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";
import SHOP_DATA from '../shop-data.js';

export const ProductsContext = createContext({
	products: [],
});

export const ProductsProvider = ({ children }) => {
	const [ products, setProducts ] = useState(SHOP_DATA);

	// useEffect(() => {
	// 	addCollectionAndDocuments('collections',SHOP_DATA);
	// },[]);

	const value = {products}
	return(
		<ProductsContext.Provider value={value}>
			{ children }
		</ProductsContext.Provider>
	)
}