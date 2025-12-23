import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/scss/styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TitleManager from './components/TitleManager.jsx';
import AddPage from './components/AddPage.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<TitleManager />} />
        <Route path='/add' element={<AddPage />} />
      </Routes>

    </BrowserRouter>
    
  </StrictMode>,
)
