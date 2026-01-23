import React, { useState } from 'react';
import './IntroScreen.css';

export default function IntroScreen({ onFinish }) {
  // Start at slide 1
  const [slide, setSlide] = useState(1);

  // Total number of images you have
  const totalSlides = 10;

  // Handle clicking anywhere on the screen
  const handleNext = () => {
    if (slide < totalSlides) {
      // Go to next image
      setSlide(slide + 1);
    } else {
      // If at the end, tell App.jsx to start the game
      onFinish();
    }
  };

  // Helper to format number: 1 becomes "01", 10 stays "10"
  const getFileName = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  return (
    // WHOLE SCREEN IS CLICKABLE
    <div className="intro-container" onClick={handleNext}>
      
      {/* The Image */}
      <img 
        className="intro-image"
        src={`/images/Intro_${getFileName(slide)}.png`} 
        alt={`Story part ${slide}`} 
      />

      {/* Small Hint Text */}
      <p className="click-hint">
        {slide === totalSlides ? "(Click to Start Game)" : "(Click anywhere to continue)"}
      </p>

    </div>
  );
}