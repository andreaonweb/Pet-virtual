import React, { useState } from 'react';
import frameImage from '../assets/FrameMain.png';
import Needs from './Needs';
import FoxPet from './FoxPet';
import ActionButtons from './ActionButtons';

function Frame({ petStats, setPetStats }) {
  const [petAnimationTrigger, setPetAnimationTrigger] = useState(0);
  const [lastActionType, setLastActionType] = useState('pet');

  // Función para manejar acciones y activar animaciones
  const handlePetAction = (actionType) => {
    setLastActionType(actionType);
    setPetAnimationTrigger(prev => prev + 1);
  };

  // Función para cuando se hace click directo en el zorro
  const handleDirectPetClick = () => {
    setLastActionType('pet');
    setPetStats(prevStats => ({
      ...prevStats,
      happiness: Math.min(100, prevStats.happiness + 5)
    }));
  };

  return (
    <div className="position-relative d-flex justify-content-center align-items-center">
      <img
        src={frameImage}
        alt="A decorative frame for the virtual pet"
        className="img-fluid"
      />
      
      {/* Barras de necesidades */}
      <div 
        className="position-absolute d-flex justify-content-center w-100"
        style={{
          top: '20px', 
          left: '0',
          right: '0',
          zIndex: 10
        }}
      >
        <Needs petStats={petStats} />
      </div>

      {/* Zorro con animaciones específicas */}
      <div 
        className="position-absolute d-flex justify-content-center w-100"
        style={{
          top: '50%',
          left: '0',
          right: '0',
          transform: 'translateY(-50%)',
          zIndex: 5
        }}
      >
        <FoxPet 
          petStats={petStats} 
          onInteract={handleDirectPetClick}
          triggerAnimation={petAnimationTrigger}
          actionType={lastActionType}
        />
      </div>

      {/* Botones de acción */}
      <div 
        className="position-absolute d-flex justify-content-center w-100"
        style={{
          bottom: '50px',
          left: '0',
          right: '0',
          zIndex: 10
        }}
      >
        <ActionButtons setPetStats={setPetStats} onAction={handlePetAction} />
      </div>
    </div>
  );
}

export default Frame;