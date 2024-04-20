import React, { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/dash';
import Acourt from './components/jk';
import './style/index.css';
import Legal from './components/legal';

function App() {
  const [navVisible, setNavVisible] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar visible={navVisible} show={setNavVisible} />
        <Routes>
          <Route path="/" element={<Dashboard navVisible={navVisible} />} />
          <Route path="/E-court" element={<Acourt navVisible={navVisible} />} />
          <Route path="/Legal-QA" element={<Legal navVisible={navVisible} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
