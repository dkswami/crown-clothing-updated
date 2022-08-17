import { CartItemContainer, ItemDetail } from "./cart-item.styles";

const CartItem = ({cartItem}) => {
	const { name, price, imageUrl, quantity } = cartItem;

	return(
		<CartItemContainer>
			<img src={imageUrl} alt={name}/>
			<ItemDetail>
				<h2 className='name'>{name}</h2>
				<span className='price'>
					{quantity} x ${price}
				</span>
			</ItemDetail>	
		</CartItemContainer>
	);
}

export default CartItem;