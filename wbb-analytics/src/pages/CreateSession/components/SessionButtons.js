import './SessionButtons.css';
import SessionInfoModal from '../components/SessionInfoModal';
import React, { useState } from 'react';

const SessionButtons = ({ setOpponentTeam, setStartTime, setEndTime, setDate }) => {
    const [opponentTeamInput, setOpponentTeamInput] = useState('');
    const [startTimeInput, setStartTimeInput] = useState('');
    const [endTimeInput, setEndTimeInput] = useState('');
    const [dateInput, setDateInput] = useState('');

    const handleAddSessionInfo = () => {
        if (opponentTeamInput.trim() !== '') {
            setOpponentTeam(opponentTeamInput);
        }
        if (startTimeInput.trim() !== '') {
            setStartTime(startTimeInput);
        }
        if (endTimeInput.trim() !== '') {
            setEndTime(endTimeInput);
        }
        if (dateInput.trim() !== '') {
            setDate(dateInput);
        }
    
        // Reset input fields
        setOpponentTeamInput('');
        setStartTimeInput('');
        setEndTimeInput('');
        setDateInput('');
    };
    
    

    return (
        <>
            {/*<div className='opp-team'>
                <h3 style={{ color: 'white' }}> Opponent Team </h3>
                <input type="text" value={opponentTeamInput} onChange={(e) => setOpponentTeamInput(e.target.value)} />
            </div>*/}

            <div className='start-time'>
                <h3 style={{ color: 'white' }}> Start Time </h3>
                <input type="time" value={startTimeInput} onChange={(e) => setStartTimeInput(e.target.value)} />
            </div>

            <div className='end-time'>
                <h3 style={{ color: 'white' }}> End Time </h3>
                <input type="time" value={endTimeInput} onChange={(e) => setEndTimeInput(e.target.value)} />
            </div>

            <div className='date'>
                <h3 style={{ color: 'white' }}> Date </h3>
                <input type="date" value={dateInput} onChange={(e) => setDateInput(e.target.value)} />
            </div>

            <div>
                <button className='add-button' onClick={handleAddSessionInfo}>Add Session Info</button>
            </div>
        </>
    );
};

export default SessionButtons;