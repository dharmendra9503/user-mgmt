import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ViewUser from './components/viewUsers';
import AddUser from './components/addUser';
import Welcome from './components/Welcome';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Welcome />} />
          <Route exact path='/addUser' element={<AddUser  title="ADD USER INFORMATION"/>} />
          <Route exact path='/users' element={<ViewUser/>} />
          {/* <Route exact path='/updateUser' element={<AddUser title="UPDATE USER INFORMATION" update="true"/>} /> */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
