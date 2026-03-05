import { Routes,Route,Link } from 'react-router-dom'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import AddUser from './pages/adduser'
import Landing from './pages/landing'

function App() {

  return (
    <>
    <nav>
    <Link to="/landing">landing</Link>
    <Link to="/add-user">Add User</Link>
    </nav>
     <Routes>
      <Route path="/landing" element={<Landing />} />
      <Route path="/add-user" element={<AddUser />} />
    </Routes>
    </>
  )
}

export default App
