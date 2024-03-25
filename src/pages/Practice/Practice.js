import React, { useState, useEffect } from 'react';
// import StoredSessions from '../../data/sessionData';
import './Practice.css';
import { View } from "react-native";
import { useNavigate } from 'react-router-dom';
import TabButton from '../../components/TabButton';
import DrillButtons from './components/DrillButtons';
import Players from './components/Players';
import SessionButtons from './components/SessionButtons';
import { type } from '@testing-library/user-event/dist/type';

const Practice = () => {
    
    const navigate = useNavigate();
    const [seasID, setSeasID] = useState('');
    const [activeTab, setActiveTab] = useState('Drills');
    const [SeasonData, setSeasonData] = useState([]);
    const [drills, setDrills] = useState([]);
    const [opponentTeam, setOpponentTeam] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [date, setDate] = useState('');
    const [listA, setListA] = useState([]);
    const [listB, setListB] = useState([]);
    const [playerData, setPlayerData] = useState([]);

    const handleSaveDrill = (customId) => {
        console.log(drills);
        console.log(customId);

        for (let i = 0; i < drills.length; i++) {
            const drillData = {
                practice_id: customId,
                name: drills[i].name,
                tempo_events: [],
                shot_events: [],
            };

            console.log(drillData);
            fetch('http://localhost:3001/api/drills', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(drillData),
            })
                .then(response => response.json())
                .then(data => console.log('Drill submitted:', data))
                .catch(error => console.error('Error submitting drill:', error));
        }
    };

    const handleSaveSession = async () => {
        FindSeason(date);
        //console.log(date);

        // Handle successful response
        navigate('/drill');
    };

    const FindSeason = (date) => {

        if (!date) {
            const currentDate = new Date();
            date = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
        }
        
        const splitDate = date.split("-");
        const year = splitDate[0];
        const x = SeasonData.find(season => season.year === year)

        if (!x) {
            const seasonData = {
                year: year,
                players: [],
            };

            const respons = fetch('http://localhost:3001/api/seasons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(seasonData),
            })

                .then(response => response.json())
                .then(data => {
                    console.log('Submitting Season', data);
                    postSession(data._id);
                })

                .catch(error => console.error('Error Submitting Season:', error));
        }
        
        else {
            const season = SeasonData.find(season => season.year === year);
            console.log(season);
            postSession(season.ID);
        }
    }

    const postSession = (sesData, startTime, endTime, date) => {
        const sessionData = {
            season_id: sesData,
            startTime: startTime,
            endTime: endTime,
            date: date,
            team_purple: listA,
            team_gold: listB
        };
    
        // Send POST request to save session data
        const respons = fetch('http://localhost:3001/api/practices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sessionData),
        })
    
        .then(response => response.json())
        .then(data => {
            console.log('Session Submitted:', data);
            handleSaveDrill(data._id);
        })
    
        .catch(error => console.error('Error submitting Session:', error));
    
        // Handle successful response
        navigate('/drill');
    };
    

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        console.log(`Switched to ${tab} tab`);
    };
  
    return (
        <> 
            <div className="create-sessions-container">
                <div className="drills-column">
                    <View style={{ flexDirection: 'row' }}>
                        <TabButton text={"Drills"} onPress={() => handleTabClick('Drills')} active={activeTab === 'Drills'} />
                        <TabButton text={"Session Information"} onPress={() => handleTabClick('Session Information')} active={activeTab === "Session Information"} />
                    </View>

                    <div className="drill-buttons">
                        {activeTab === 'Drills' && (
                            <>
                                <h2>Drills</h2>
                                <DrillButtons drills={drills} setDrills={setDrills}/>
                            </>
                        )}
                    </div>

                    <div className="session-information">
                        {activeTab === 'Session Information' && (
                            <>
                                <h2>Session Information</h2>
                                <SessionButtons 
                                    setOpponentTeam={setOpponentTeam}
                                    setStartTime={setStartTime}
                                    setEndTime={setEndTime}
                                    setDate={setDate}
                                />
                                <div className='session-inputs'>
                                    {/*<h3> Opponent Team: {opponentTeam}</h3>*/}
                                    <h3> Start Time: {startTime}</h3>
                                    <h3> End Time: {endTime}</h3>
                                    <h3> Date: {date}</h3>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="lists-column">
                    <Players listA={listA} setListA={setListA} listB={listB} setListB={setListB} playerData={playerData} setPlayerData={setPlayerData} />
                </div>

            </div>
            <button className="create-session-button" onClick={handleSaveSession}>
                Create Session
            </button>
        </>
    );
};

export default Practice;