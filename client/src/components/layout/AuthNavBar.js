import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const AuthNavBar = () => {
	const navLinkIcon = {
		fontSize: '20px',
		paddingLeft: '25px',
		paddingRight: '25px',
		color: 'red',
	};
	const [collapsed, setIsCollapsed] = useState(true);
	const toggleNavbar = () => {
		setIsCollapsed(prevState => !prevState);
	};
	const authLinks = (
		<Fragment>
			<Navbar color='primary' light expand='md'>
				<NavbarToggler onClick={e => toggleNavbar(e)} className='mr-2' />
				<NavbarBrand className='mr-2 nav-link' tag={Link} to='/home'>
					Gam3rs
				</NavbarBrand>
				<Collapse isOpen={!collapsed} navbar>
					<Nav className='ml-auto' navbar>
						<NavItem className='navItem'>
							<NavLink
								style={navLinkIcon}
								tag={Link}
								to='/logout'
								className='nav-link'
							>
								Log Out
							</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</Fragment>
	);
	return <Fragment>{authLinks}</Fragment>;
};

export default AuthNavBar;
