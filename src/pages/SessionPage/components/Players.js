import './Players.css';
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const Players = () => {
    const [listA, setListA] = useState([]);
    const [listB, setListB] = useState([]);
    const [playerData, setPlayerData] = useState([]);
    const [SeasonData, setSeasonData] = useState([]);
    
    const handleAddDropdownA = () => {
        const newPlayer = playerData.length > listA.length ? playerData[listA.length].name : `New Player ${listA.length + 1}`;
        setListA([...listA, { playerName: newPlayer }]);
    };
    
    const handleAddDropdownB = () => {
        const newPlayer = playerData.length > listB.length ? playerData[listB.length].name : `New Player ${listB.length + 1}`;
        setListB([...listB, { playerName: newPlayer }]);
    };
    

    const handlePlayerChange = (team, index, event) => {
        const { value } = event.target;
    
        if (team === 'A') {
            const updatedListA = [...listA];
            updatedListA[index].playerName = value;
            setListA(updatedListA);
        }
        
        else if (team === 'B') {
            const adjustedIndex = index; // No need to adjust index for listB

            if (adjustedIndex >= 0 && adjustedIndex < listB.length) {
                const updatedListB = [...listB];
                updatedListB[adjustedIndex].playerName = value;
                setListB(updatedListB);
            }
        }
    };
    
    const handleRemovePlayer = (team, index) => {
        if (team === 'A') {
            const updatedListA = [...listA];
            updatedListA.splice(index, 1);
            setListA(updatedListA);
            console.log(`Removed player from Team A at index ${index}`);

        }
        
        else if (team === 'B') {
            const updatedListB = [...listB];
            updatedListB.splice(index, 1);
            setListB(updatedListB);
            console.log(`Removed player from Team B at index ${index}`);
        }
    };

    const navigate = useNavigate();
    let id1 = -1; //Defualt value so CreateSession can run normally if not directed from OpenSession
    const location = useLocation();

    if (location.pathname === '/CreateSession') {
        id1 = location.state.ID;
    } // send the session ID to make paramenters for sessionData

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/players');
                const data = await response.json();
    
                setPlayerData(data);
                
                // Auto-populate the first 5 players for Team A and Team B
                const defaultListA = data.slice(0, 5).map(player => ({ playerName: player.name }));
                const defaultListB = data.slice(5, 10).map(player => ({ playerName: player.name }));
    
                setListA(defaultListA);
                setListB(defaultListB);
            } catch (error) {
                console.error('Failed to fetch players:', error);
            }
        };
    
        fetchData();
    }, []);
    
    

    return (
        <>
        <div className="list">
            <h2>Team A</h2>
            <ul>
            {listA.map((player, index) => (
                <li key={index}>
                    <select
                        className='dropdown'
                        value={player.playerName}
                        onChange={(e) => handlePlayerChange('A', index, e)}
                    >
                        {playerData.map((player, playerIndex) => (
                            <option key={playerIndex} value={player.name}>
                                {player.name}
                            </option>
                        ))}
                    </select>

                    <button className="remove-player-button" onClick={() => handleRemovePlayer('A', index)}>
                        Remove Player
                    </button>
                </li>
            ))}
                <li>
                    <button className="add-dropdown-button" onClick={handleAddDropdownA}>
                        Add Player  
                    </button>
                </li>
            </ul>
        </div>

        <div className="list">
            <h2>Team B</h2>    
            <ul>
            {listB.map((player, index) => (
                <li key={index}>
                    <select
                        className='dropdown'
                        value={player.playerName}
                        onChange={(e) => handlePlayerChange('B', index, e)}
                    >
                        {playerData.map((player, playerIndex) => (
                            <option key={playerIndex} value={player.name}>
                                {player.name}
                            </option>
                        ))}
                    </select>

                    <button className="remove-player-button" onClick={() => handleRemovePlayer('B', index)}>
                        Remove Player
                    </button>
                </li>
            ))}
                <li>
                    <button className="add-dropdown-button" onClick={handleAddDropdownB}>
                        Add Player
                    </button>
                </li>
            </ul>
        </div>
        </>
    )
}

export default Players;