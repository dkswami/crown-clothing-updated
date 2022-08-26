import { useNavigate } from 'react-router-dom';
import { BackgroundImage, DirectoryItemContainer } from './directory-item.styles.jsx';

const DirectoryItem = ({ category }) => {
	const { title, imageUrl, route } = category;
	const navigate = useNavigate();

	const onNavigateHandler = () => navigate(route);

	return (
		<DirectoryItemContainer onClick={onNavigateHandler}>
			<BackgroundImage imageUrl={imageUrl} />
			<div className="body">
				<h2>{title}</h2>
				<p>Shop Now</p>
			</div>
		</DirectoryItemContainer>
	);
	
}

export default DirectoryItem;