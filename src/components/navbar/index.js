import React from 'react'

import {
  Navbar,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  NavLink,
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import './styles.css'

const HomepageNavbar = () => {
  const userData = JSON.parse(window.localStorage.getItem('userData'))
  const username = userData?.username

  const onLogoutHandler = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <Navbar
      color="dark"
      expand="md"
      fixed="top"
      dark
    >
      <div className="container-lg">
        <NavbarBrand href="/">
          User Area
        </NavbarBrand>
        <Nav
          className="me-auto"
          navbar
        >
          <NavItem>
            <NavLink href="/">
              Rental
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/riwayat-rental">
              Riwayat
            </NavLink>
          </NavItem>
        </Nav>
        <Nav navbar>
          <UncontrolledDropdown className="dropdown-div" nav inNavbar>
            <DropdownToggle nav caret className="text-capitalize">
              {username}
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>
                Profile
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={onLogoutHandler}>
                Log out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </div>
    </Navbar>
  )
}

export default HomepageNavbar