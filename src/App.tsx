import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Reader from './pages/Reader';

function App() {
  useEffect(() => {
    // Initialize theme on app load
    const savedTheme = localStorage.getItem('theme') || 'original';
    const html = document.documentElement;

    // Remove any existing theme classes
    html.className = html.className.replace(/theme-\w+/g, '').trim();

    // Add the current theme class
    html.classList.add(`theme-${savedTheme}`);
  }, []);

  return (
    <Router basename="/killsixbilliondemons-espanol">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reader" element={<Reader />} />
      </Routes>
    </Router>
  );
}

export default App;
