import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/Nav';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import LoginPage from './components/LoginPage';
import Solution from './components/Solution';
import SignupPage from './components/SignUpPage';
import Dashboard from './components/Dashboard'; // <-- Import Dashboard

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/solution' element={<Solution />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signUpPage' element={<SignupPage />} />
          <Route path='/dashboard' element={<Dashboard />} /> {/* New Route */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

