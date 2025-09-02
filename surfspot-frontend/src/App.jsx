// src/App.jsx
import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import './styles/App.css';
import SurfSpots from './pages/Surfspots';
import { isTokenExpired } from './api/auth';
//import SideBar from './components/SideBar'; // Se la usi

function App() {
  const [token, setToken] = useState(localStorage.getItem('jwtToken'));

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("jwtToken");
      setToken(null);
    }
  }, []);

  const handleLoginSuccess = (newToken) => {
    localStorage.setItem('jwtToken', newToken);
    setToken(newToken);
  };


  // CAMBIA E FAI TUTTO CON IL BACKGROUND. CI PENSA APP.CSS A GESTIRE TUTTO
  return (
    <div
      className={`min-h-screen w-screen font-sans ${
        !token ? "bg-gradient-to-br from-blue-200 to-blue-500 text-white" : ""
      }`}
    >
      {!token ? (
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow">
            Benvenuto su SurfSpot
          </h1>
          <p className="text-lg mb-8">
            Scopri e condividi i migliori spot per fare surf nel mondo.
          </p>
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
      ) : (
        <div className="w-screen h-screen">
          <SurfSpots />
        </div>
      )}
    </div>
  );
}

export default App;
