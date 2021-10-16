import {
  Navbar,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import './styles.css'

const Headbar = () => {
  const onLogoutHandler = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <Navbar className="navbar shadow" color="light" light expand="md">
      <div className="navbar-div">
        <NavbarBrand>
          <FontAwesomeIcon icon={faUser} />
        </NavbarBrand>
        <Nav navbar>
          <UncontrolledDropdown className="dropdown-div" nav inNavbar>
            <DropdownToggle nav caret>
              Admin
            </DropdownToggle>
            <DropdownMenu right>
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

export default Headbar