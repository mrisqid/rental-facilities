import { RoutesNotLoggedIn, RoutesLoggedIn } from './routes'

import Sidebar from './components/sidebar'
import Headbar from './components/headbar'

import './App.css'

function App() {
  const login = localStorage.getItem("isLoggedIn")

  return (
    <div className="App">
      {
        login ? (
          <div className="template-div h-100 bg-white shadow">
            <Sidebar />
            <div className="main bg-white h-100">
              <Headbar />
                <div className="h-100 pb-3">
                  <RoutesLoggedIn />
                </div>
            </div>
          </div>
        ) : <RoutesNotLoggedIn />
      }
    </div>
  )
}

export default App
