import { useContext } from 'react';
import './shop.styles.scss';
import { CategoriesContext } from '../../contexts/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';
const Shop = () => {
	const { categoriesMap } = useContext(CategoriesContext);
	return(
		<div className='shop-container'>
			{Object.keys(categoriesMap).map((key) => {
				const products = categoriesMap[key];
				return <CategoryPreview key={key} title={key} products={products} />;
			})}
		</div>	
	);
}

export default Shop;