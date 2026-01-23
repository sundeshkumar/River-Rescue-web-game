import React, { useState } from 'react';
import WaterLevelGame from './WaterLevelGame';
import IntroScreen from './IntroScreen';
import OutroScreen from './OutroScreen';

function App() {
  const [screen, setScreen] = useState('intro');
  const [playerWon, setPlayerWon] = useState(false);

  const handleGameEnd = (didWin) => {
    setPlayerWon(didWin);
    setScreen('outro');
  };

  return (
    <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
      
      {/* 1. INTRO */}
      {screen === 'intro' && (
        <IntroScreen onFinish={() => setScreen('game')} />
      )}

      {/* 2. GAME */}
      {screen === 'game' && (
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
            
            {/* Header Text - Smaller for Mobile */}
            <div style={{ marginBottom: '10px' }}>
              <h2 style={{ fontSize: '1.5rem', margin: '5px 0', color: '#4a3b2a' }}>Adjust the Water level so that the little ringed plover can breed</h2>
             <p style={{ margin: '0', fontSize: '1rem', color: '#555' }}>
                Stop between <strong>20 - 30</strong>
              </p>
            </div>
            
            <WaterLevelGame onGameEnd={handleGameEnd} />
        </div>
      )}

      {/* 3. OUTRO */}
      {screen === 'outro' && (
        <OutroScreen didWin={playerWon} />
      )}
    </div>
  );
}

export default App;