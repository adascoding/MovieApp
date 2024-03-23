import './App.css'
import NavBar from './components/NavBar.jsx'
import Content from './components/Content.jsx'
import LoginPage from './components/LoginPage.jsx';
import Profile from './components/Profile.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Content/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
