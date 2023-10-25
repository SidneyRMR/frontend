import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DataContextProvider } from './Context/DataContext';
import { VendasContextProvider } from './Context/VendasContext';
import Login from './Telas/Login'
import Administrativo from './Telas/Administrativo';
import Vendas from './Telas/Vendas';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/administrativo" element={
              <DataContextProvider>
                <Administrativo/>
            </DataContextProvider>
        } 
        />
          <Route path="/vendas" element={
              <VendasContextProvider>
                <Vendas/>
            </VendasContextProvider>
        } 
        />
          
          <Route path="/*" element={<Navigate replace to="/login"/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
