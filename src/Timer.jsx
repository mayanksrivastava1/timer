import React, { useState, useEffect } from 'react';
import { BsPlay, BsPause, BsArrowRepeat } from 'react-icons/bs';

import './Timer.css';

const Timer = () => {
  const [minutes, setMinutes] = useState('');
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [countdown, setCountdown] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const startTimer = () => {
    const parsedMinutes = parseInt(minutes, 10);

    if (isNaN(parsedMinutes) || parsedMinutes <= 0) {
      alert('Please enter a valid positive number for minutes.');
      return;
    }

    if (countdown) {
      clearInterval(countdown);
    }

    setSecondsRemaining(parsedMinutes * 60);

    setCountdown(setInterval(() => {
      setSecondsRemaining(prevSeconds => prevSeconds - 1);
    }, 1000));

    setIsPaused(false);
  };

  const togglePause = () => {
    if (countdown) {
      if (isPaused) {
        setCountdown(setInterval(() => {
          setSecondsRemaining(prevSeconds => prevSeconds - 1);
        }, 1000));
      } else {
        clearInterval(countdown);
      }

      setIsPaused(!isPaused);
    }
  };

  const resetTimer = () => {
    if (countdown) {
      clearInterval(countdown);
    }
  
    setMinutes('');
    setSecondsRemaining(0);
    setIsPaused(false);
    setCountdown(null); 
  };

  useEffect(() => {
    if (secondsRemaining < 0) {
      clearInterval(countdown);
    }
  }, [secondsRemaining, countdown]);

  const formattedMinutes = String(Math.floor(secondsRemaining / 60)).padStart(2, '0');
  const formattedSeconds = String(secondsRemaining % 60).padStart(2, '0');

  return (
    <div className="countdown-container">
      <h3 style={{color:'#61dafb'}}>Enter Minutes</h3>
      <input
        type="number"
        value={minutes}
        onChange={(e) => {
          if (!countdown) {
            setMinutes(e.target.value);
          }
        }}
        placeholder="Enter minutes"
        className="input-field"
        disabled={!!countdown}
      />

      <div className='timercontainer'>
      <button onClick={startTimer} disabled={!!countdown} className="action-button">
        <BsPlay size={20} />
      </button>
      <div id="timer" className="timer">
        {formattedMinutes}:{formattedSeconds}
      </div>
      </div>
        <div className='action-button-container'>
      <button onClick={togglePause} disabled={!countdown} className="action-button">
        {isPaused ? <BsPlay size={20} /> : <BsPause size={20} />}
      </button>
      <button onClick={resetTimer} className="action-button">
        <BsArrowRepeat size={20} />
      </button>
      </div>
    </div>
  );
};

export default Timer;
