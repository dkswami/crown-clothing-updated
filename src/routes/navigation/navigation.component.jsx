import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from '../../store/user/user.selector'

import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {
	NavigationContainer,
	LogoContainer,
	NavLinks,
	NavLink
} from './navigation.styles';

const Navigation = () => {
	const currentUser = useSelector(selectCurrentUser);

	const { isCartOpen } = useContext(CartContext);

	// const signOutHandler = async () => {
	// 	await signOutUser();
	// }

	return(
		<Fragment>
			<NavigationContainer>
				<LogoContainer to="/">
					<CrownLogo className="logo" />
				</LogoContainer>
				<NavLinks>
					<NavLink to='/shop'>
						SHOP
					</NavLink>
					{ currentUser ?(
						<NavLink as='span' onClick={signOutUser}>{' '} SIGN OUT {' '}</NavLink> 
					) : (
						<NavLink to='/auth'>
							SIGN IN
						</NavLink>
					) }
					<CartIcon/>
				</NavLinks>
				{  isCartOpen && <CartDropdown />	}
			</NavigationContainer>
			<Outlet />
		</Fragment>
	);
}

export default Navigation;