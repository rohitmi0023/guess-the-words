import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const NavBar = () => {
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
	const guestLinks = (
		<Fragment>
			<Navbar color='primary' light expand='md'>
				<NavbarToggler onClick={e => toggleNavbar(e)} className='mr-2' />
				<NavbarBrand className='mr-auto nav-link' tag={Link} to='/'>
					Gam3rs
				</NavbarBrand>
				<Collapse isOpen={!collapsed} navbar>
					<Nav className='ml-auto' navbar>
						<NavItem className='navItem'>
							<NavLink
								style={navLinkIcon}
								tag={Link}
								to='/login'
								className='nav-link'
								activeclassname='active'
							>
								Log In
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								style={navLinkIcon}
								tag={Link}
								to='/register'
								className='nav-link'
								activeclassname='active'
							>
								Sign Up
							</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
			<NavLink />
		</Fragment>
	);

	return <Fragment>{guestLinks}</Fragment>;
};

export default NavBar;
