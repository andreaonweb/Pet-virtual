import { useState, useEffect } from "react";
import Frame from "./components/Frame";

function App() {
  const [petStats, setPetStats] = useState({
    hunger: 80,
    happiness: 60,
    health: 90
  });

  // Sistema de decaimiento
  useEffect(() => {
    const interval = setInterval(() => {
      setPetStats(prevStats => ({
        hunger: Math.max(0, prevStats.hunger - 1),   
        happiness: Math.max(0, prevStats.happiness - 1), 
        health: Math.max(0, prevStats.health - 1)      
      }));
    }, 10000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: '#FFF2DC' }}
    >
      <Frame petStats={petStats} setPetStats={setPetStats} />
    </div>
  );
}

export default App;