import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './Telas/Login'
import Administrativo from './Telas/Administrativo';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/administrativo" element={<Administrativo/>} />
          
          <Route path="/*" element={<Navigate replace to="/login"/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
