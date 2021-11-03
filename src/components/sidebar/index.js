import {
  ListGroup,
  ListGroupItem,
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faFileInvoice,
  faBuilding,
  faUsers,
  faAtom,
} from '@fortawesome/free-solid-svg-icons'

import './styles.css'

const Sidebar = () => {
  return (
    <div className="sidebar bg-primary shadow pr-5">
      <div className="sidebar-title-div">
        <a href="/" className="text-white sidebar-title">
          <FontAwesomeIcon icon={faAtom} className="sidebar-title-icon" />
          Admin Panel
        </a>
      </div>
      <div className="h-100">
        <ListGroup flush>
          <ListGroupItem className="list-item" color="primary" tag="a" href="/" action>
            <div className="d-flex list-item-icon">
              <FontAwesomeIcon icon={faHome} />
            </div>
            Dashboard
          </ListGroupItem>
          <ListGroupItem className="list-item" color="primary" tag="a" href="/rental" action>
            <div className="d-flex list-item-icon">
              <FontAwesomeIcon icon={faFileInvoice} />
            </div>
            Rentals
          </ListGroupItem>
          <ListGroupItem className="list-item" color="primary" tag="a" href="/facility" action>
            <div className="d-flex list-item-icon">
              <FontAwesomeIcon icon={faBuilding} />
            </div>
            Facilities
          </ListGroupItem>
          <ListGroupItem className="list-item" color="primary" tag="a" href="/user" action>
            <div className="d-flex list-item-icon">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            Users
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  )
}

export default Sidebar