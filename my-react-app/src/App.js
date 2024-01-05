import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RecoilRoot } from 'recoil';
import EmployeeForm from './pages/EmployeeForm';
import Employee from './pages/Employee';

export function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<EmployeeForm />} />
          <Route path='/employee' element={<Employee />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
