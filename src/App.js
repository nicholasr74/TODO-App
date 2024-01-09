import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage.js';
import SignupPage from './pages/SignupPage.js';
import Todo from './pages/Todo.js';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Todo/>}/>
        <Route path="/login" element={<LoginPage/>}/> 
        <Route path="/signup" element={<SignupPage/>}/> 
      </Routes>
    </Router>
  );
}

export default App;
