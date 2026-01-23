import React, { useState } from 'react';
import './OutroScreen.css';

export default function OutroScreen({ didWin }) {
  // 1. STATE: Start at slide 1
  const [slide, setSlide] = useState(1);

  // ⚙️ CONFIGURATION: You have 4 images
  const totalSlides = 4;

  // Handler for clicking anywhere on the screen
  const handleNext = () => {
    if (slide < totalSlides) {
      // Go to next slide
      setSlide(slide + 1);
    } else {
      // On last slide, restart the game
      window.location.reload();
    }
  };

  // Helper to format number: 1 -> "01"
  const getFileName = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  return (
    // THE WHOLE SCREEN IS CLICKABLE NOW
    <div className="outro-container" onClick={handleNext}>
      
      <h1 className="outro-title">
        {didWin ? "Great Job!" : "The End"}
      </h1>

      {/* The Outro Image */}
      <img 
        className="outro-image"
        src={`/images/Outro_${getFileName(slide)}.png`} 
        alt={`Outro Part ${slide}`} 
      />

      {/* Small Hint Text instead of a Button */}
      <p className="click-hint">
        {slide === totalSlides ? "(Click to Play Again)" : "(Click anywhere to continue)"}
      </p>

    </div>
  );
}