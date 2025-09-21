import { useState, useEffect } from "react";
import Frame from "./components/Frame";

function App() {
  // Estado para las estadísticas de cada mascota
  const [allPetStats, setAllPetStats] = useState({
    fox: { hunger: 80, happiness: 60, health: 90 },
    unicorn: { hunger: 75, happiness: 85, health: 70 },
    panda: { hunger: 90, happiness: 95, health: 85 },
    pom: { hunger: 70, happiness: 50, health: 80 },
    totoro: { hunger: 85, happiness: 75, health: 65 }
  });
  
  const [currentPet, setCurrentPet] = useState('fox');

  // Función para actualizar las estadísticas de la mascota actual
  const setPetStats = (newStats) => {
    if (typeof newStats === 'function') {
      setAllPetStats(prevAllStats => ({
        ...prevAllStats,
        [currentPet]: newStats(prevAllStats[currentPet])
      }));
    } else {
      setAllPetStats(prevAllStats => ({
        ...prevAllStats,
        [currentPet]: newStats
      }));
    }
  };

  // Sistema de decaimiento para todas las mascotas
  useEffect(() => {
    const interval = setInterval(() => {
      setAllPetStats(prevAllStats => {
        const newAllStats = { ...prevAllStats };
        
        // Aplicar decaimiento a todas las mascotas
        Object.keys(newAllStats).forEach(petType => {
          newAllStats[petType] = {
            hunger: Math.max(0, newAllStats[petType].hunger - 1),   
            happiness: Math.max(0, newAllStats[petType].happiness - 1), 
            health: Math.max(0, newAllStats[petType].health - 1)      
          };
        });
        
        return newAllStats;
      });
    }, 10000); 

    return () => clearInterval(interval);
  }, []);

  // Actualizar mascota actual cuando se cambie en Frame
  useEffect(() => {
    const handlePetChange = () => {
      // Este efecto se puede usar para manejar cambios adicionales
      // cuando se cambie de mascota si es necesario
    };
    
    handlePetChange();
  }, [currentPet]);

  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: '#FFF2DC' }}
    >
      <Frame 
        petStats={allPetStats[currentPet]} 
        setPetStats={setPetStats}
        currentPet={currentPet}
        onPetChange={setCurrentPet}
        allPetStats={allPetStats}
      />
    </div>
  );
}

export default App;