import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Form from './components/Form';
import Navbar from './components/Navbar'
import { RecoilRoot } from 'recoil';

ReactDOM.render(
      <React.StrictMode>
        <Navbar/>
        <BrowserRouter>
          <RecoilRoot>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path='/' element={<App />}/>
                <Route path='jadwal/:hari' element={<Form/>}/>
            </Routes>
            </React.Suspense>
          </RecoilRoot>
        </BrowserRouter>
      </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
