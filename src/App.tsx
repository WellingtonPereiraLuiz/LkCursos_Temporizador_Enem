import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Sobre from './components/Sobre';
import Countdown from './components/Countdown';
import Notifications from './components/Notifications';

function App() {
  useEffect(() => {
    // Change title based on visibility
    document.title = "LK Cursos - Preparatório ENEM & Concursos";
    
    // Handle visibility change to update title when tab is inactive/active
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Volte! Continue sua preparação! 📚";
      } else {
        document.title = "LK Cursos - Preparatório ENEM & Concursos";
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Sobre />
      <Countdown />
      <Notifications />
    </div>
  );
}

export default App;