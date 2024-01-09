import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage.js';
import Signup from './pages/Signup.js';
import Todo from './pages/Todo.js';
import ProtectedRoute from './pages/ProtectedRoute.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/todo" element={<ProtectedRoute><Todo/></ProtectedRoute>}/>
        <Route path="/" element={<LoginPage/>}/> 
        <Route path="/signup" element={<Signup/>}/> 
      </Routes>
    </Router>
  );
}

export default App;
