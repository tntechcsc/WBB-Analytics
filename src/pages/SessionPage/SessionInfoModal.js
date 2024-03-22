import React, { useState } from 'react';
<<<<<<<< HEAD:wbb-analytics/src/pages/CreateSession/components/SessionInfoModal.js
import './SessionInfoModal.css';
========
import './Session.css';
>>>>>>>> 05796df4db5a58df7ab0b4d8bf43aa3dcf3c4027:src/pages/SessionPage/SessionInfoModal.js

const SessionInfoModal = ({ isOpen, onClose, onAddSessionInfo }) => {
  const [opponentTeam, setOpponentTeam] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');

  const handleAddSessionInfo = () => {
    // Check if the opponent team, start time, and end time are not empty
    if (opponentTeam.trim() !== '' && startTime.trim() !== '' && endTime.trim() !== '' && date.trim() !== ''){
      onAddSessionInfo(opponentTeam.trim(), startTime.trim(), endTime.trim(), date.trim());
      setOpponentTeam('');
      setStartTime('');
      setEndTime('');
      setDate('');
      onClose();
    }
  };



  return (
    isOpen && (
      <div className="session-info-modal-overlay">
        <div className="session-info-modal-content">
          <h2>Session Information</h2>

          <label htmlFor="opponentTeam">Opponent Team:</label>
          <input
            type="text"
            id="opponentTeam"
            value={opponentTeam}
            onChange={(e) => setOpponentTeam(e.target.value)}
            placeholder='If None, enter NA'
          />

          <label htmlFor="startTime">Start Time:</label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />

          <label htmlFor="endTime">End Time:</label>
          <input
            type="time"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />

          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button onClick={handleAddSessionInfo}>Add Session Information</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    )
  );
};

export default SessionInfoModal;