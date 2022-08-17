import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../contexts/cart.context';
import {
	CartDropdownContainer,
	CartItemContainer,
	EmptyMessage,
} from './cart-dropdown.styles';


const CartDropdown = () => {
	const {cartItems } = useContext(CartContext);

	const navigate = useNavigate();

	const goToCheckoutHandler = () => navigate('/checkout');

	return(
		<CartDropdownContainer>
			<CartItemContainer>
				{cartItems.length ? (
					cartItems.map((cartItem) => (
						<CartItem key={cartItem.id} cartItem={cartItem} />
					))
				) : (
					<EmptyMessage as='span'>Your cart is empty</EmptyMessage>
				)}
			</CartItemContainer>
			<Button onClick={ goToCheckoutHandler } >GO TO CHECKOUT</Button>
		</CartDropdownContainer>
	)
}

export default CartDropdown;