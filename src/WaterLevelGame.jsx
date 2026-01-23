import React, { useState, useEffect } from 'react';
import './WaterLevelGame.css';

export default function WaterLevelGame({ onGameEnd }) {
  // STATE
  const [level, setLevel] = useState(50);         
  const [direction, setDirection] = useState(1);  
  const [isRunning, setIsRunning] = useState(true);
  
  // NEW STATE FOR GAMEPLAY
  const [attempts, setAttempts] = useState(3); // 3 Chances
  const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'lost'
  
  // ANIMATION LOOP
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setLevel((prev) => {
        let next = prev + direction;
        if (next >= 70) { setDirection(-1); return 70; }
        if (next <= 0) { setDirection(1); return 0; }
        return next;
      });
    }, 20); // Speed

    return () => clearInterval(interval);
  }, [isRunning, direction]);

  // IMAGE LOGIC (0-7)
  const imageIndex = Math.min(8, Math.floor((level / 70) * 8));

  // --- MAIN CLICK HANDLER ---
  const handleSliderClick = () => {
    // If game is over or won, do nothing (wait for user to click button)
    if (gameState === 'won' || gameState === 'lost') return;

    // If currently stopped (waiting for retry), restart the game
    if (!isRunning) {
      setIsRunning(true);
      return;
    }

    // --- STOPPING THE SLIDER ---
    setIsRunning(false);

    // CHECK WIN CONDITION (Between 20 and 30)
    if (level >= 20 && level <= 30) {
      setGameState('won');
    } else {
      // MISSED!
      const newAttempts = attempts - 1;
      setAttempts(newAttempts);

      if (newAttempts === 0) {
        setGameState('lost');
      }
    }
  };

  return (
    <div className="water-game-wrapper">
      
      {/* SLIDER (Clickable) */}
      <div 
        className="slider-container" 
        onClick={handleSliderClick} 
        style={{ cursor: 'pointer' }}
      >
        <input 
          type="range" min="0" max="70" value={level} readOnly 
          style={{ pointerEvents: 'none' }} 
        />
        
        {/* Visual Marker for the Target Zone (20-30) */}
        <div style={{
          position: 'absolute',
          bottom: '25%', // Starts at 20%
          height: '17%', // Covers 10% (20 to 30)
          width: '100%',
          backgroundColor: 'rgba(0, 255, 0, 0.3)', // Green transparent zone
          border: '1px dashed green',
          pointerEvents: 'none'
        }}></div>
      </div>

      {/* GAME BOX */}
      <div className="game-box">
        <img className="river-bg" src={`/images/level-${imageIndex}.png`} alt="Level" />

        {/* --- BIRD RESTORED HERE --- */}
        {/* Only shows if you won (Level is 20-30) */}
        {gameState === 'won' && (
          <img className="bird" src="/images/bird.png" alt="Bird" />
        )}

        {/* --- MESSAGES & POPUPS --- */}

        {/* 1. WIN POPUP (ufergras) */}
        {gameState === 'won' && (
          <div className="popup-overlay">
            <div className="popup-box">
              <h2>YOU WIN</h2>
              <img src="/images/ufergras_sammeln.png" alt=" ufergras Reward" className="ufergras-img" />
              <p>You found a Magical ufergras! The ecosystem is saved.</p>
              <button className="action-btn" onClick={() => onGameEnd(true)}>
                Continue ➡
              </button>
            </div>
          </div>
        )}

        {/* 2. GAME OVER POPUP */}
        {gameState === 'lost' && (
          <div className="popup-overlay">
            <div className="popup-box">
              <h2 style={{color: 'red'}}>Game Over</h2>
              <p>The water level was never safe.</p>
              <button className="action-btn" onClick={() => onGameEnd(false)}>
                Continue ➡
              </button>
            </div>
          </div>
        )}

        {/* 3. RETRY MESSAGE (If missed but attempts left) */}
        {!isRunning && gameState === 'playing' && (
          <div className="status-msg warning">
            <h3>Missed!</h3>
            <p>Target is 20-30. You hit {level}.</p>
            <p><strong>{attempts} Attempts Left</strong></p>
            <p style={{fontSize: '14px', marginTop:'5px'}}>(Click Slider to Try Again)</p>
          </div>
        )}

        {/* 4. RUNNING INFO */}
        {isRunning && (
           <div className="status-msg info" style={{opacity: 0.8}}>
             <p>Stop between <strong>20 - 30</strong></p>
             <p>Attempts: {attempts}</p>
           </div>
        )}

      </div>
    </div>
  );
}

