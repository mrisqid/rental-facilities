import { RoutesNotLoggedIn, AdminRoutes, UserRoutes } from './routes'

import Sidebar from './components/sidebar'
import Headbar from './components/headbar'
import Navbar from './components/navbar'

import './App.css'

require('dotenv').config()

function App() {
  const login = localStorage.getItem("isLoggedIn")
  const userData = JSON.parse(localStorage.getItem('userData'))
  const isAdmin = userData?.level === 'admin'

  if (login && isAdmin) {
    return (
      <div className="App">
        <div className="template-div h-100 bg-white shadow">
            <Sidebar />
            <div className="main bg-white h-100">
              <Headbar />
                <div className="h-100 pb-3">
                  <AdminRoutes />
                </div>
            </div>
          </div>
      </div>
    )
  }

  if (login && !isAdmin) {
    return (
      <div className="App">
        <div className="navbar-container">
          <Navbar />
        </div>
        <div className="home bg-white shadow">
          <UserRoutes />
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <RoutesNotLoggedIn />
    </div>
  )
}

export default App
