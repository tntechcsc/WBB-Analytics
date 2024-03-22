import React, { useState, useEffect } from 'react';
import StoredSessions from '../../data/sessionData';
<<<<<<< HEAD:wbb-analytics/src/pages/CreateSession/CreateSessionPage.js
import './CreateSessionPage.css';
=======
import DrillModal from './DrillModal';
import SessionInfoModal from './SessionInfoModal';
import './Session.css';
>>>>>>> 05796df4db5a58df7ab0b4d8bf43aa3dcf3c4027:src/pages/SessionPage/Session.js
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { useNavigate } from 'react-router-dom';
import TabButton from '../../components/TabButton';
import DrillButtons from './components/DrillButtons';
import Players from './components/Players';
import SessionButtons from './components/SessionButtons';

const CreateSessionsPage = () => {
    
    const navigate = useNavigate();
    const [sessionName, setSessionName] = useState('');
    const [savedSessions, setSavedSessions] = useState([]);
    const [seasID, setSeasID] = useState('');
    const [activeTab, setActiveTab] = useState('Drills');
    const [SeasonData, setSeasonData] = useState([]);
    const [drills, setDrills] = useState([]);
    const [opponentTeam, setOpponentTeam] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [date, setDate] = useState('');

    const x = StoredSessions;

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
        FindSeason(seasID);
        console.log(seasID);

        // Handle successful response
        navigate('/tempo');
    };

    const FindSeason = () => {
        const date = new Date().toLocaleDateString();
        const splitDate = date.split("/");
        console.log(splitDate);
        const year = splitDate[2];
        console.log(year);
        console.log(SeasonData);
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
                    console.log('submitting Season', data);
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

    const postSession = (sesData, opponentTeam, startTime, endTime, date) => {
        const sessionData = {
            season_id: sesData,
            opponentTeam: opponentTeam,
            startTime: startTime,
            endTime: endTime,
            date: date,
        };
    
<<<<<<< HEAD:wbb-analytics/src/pages/CreateSession/CreateSessionPage.js
        // Send POST request to save session data
        const respons = fetch('http://localhost:3001/api/sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sessionData),
        })
=======
    const FetchData = async () => {
      try {
        const playerResponse = await fetch('http://localhost:3001/api/players');
        const playerData = await playerResponse.json();
        const formattedPlayer = playerData.map(player => {
          const Pname = player.name;
          return {
            name: Pname,
          }
        });
        setPlayerData(formattedPlayer);
      }
      catch (error) {
        console.error('Failed to fetch players:', error);
      }
      try {
        const seasonResponse = await fetch('http://localhost:3001/api/seasons');
        const seasonData = await seasonResponse.json();
        const formattedSeasons = seasonData.map(season => {
          const seasonID = season._id.toString();
          const year = season.year;
          return {
            year: year,
            ID: season._id.toString(),
          }
        });
        setSeasonData(formattedSeasons);
      }
      catch (error) {
        console.error('Failed to fetch seasons:', error);
      }
    };
    FetchData();
    const defaultListA = Array.from({ length: 5 }, (_, index) => ({
      playerName: playerArray[index],
    }));
    // Populate default selections for List B
    const defaultListB = Array.from({ length: 5 }, (_, index) => ({
      playerName: playerArray[5 + index],   
    }));
    if(id1 !== -1)
    {
      setListA(StoredSessions[id1].Team_A);
      setListB(StoredSessions[id1].Team_B);
      setDrills(StoredSessions[id1].Drills);
    }
    else
    {
    setListA(defaultListA);
    setListB(defaultListB);
    };
  },[playerArray]);

  const handlePlayerChange = (team, index, event) => {
    const { value } = event.target;
    if (team === 'A') {
      const updatedListA = [...listA];
      updatedListA[index].playerName = value;
      setListA(updatedListA);
    }
    else if (team === 'B') {
      const updatedListB = [...listB];
      updatedListB[index].playerName = value;
      setListB(updatedListB);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    parent: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-around",
    },
  });

  const handleAddDropdownA = () => {
    setListA([...listA, { playerName: `New Player ${listA.length + 1}` }]);
  };

  const handleAddDropdownB = () => {
    setListB([...listB, { playerName: `New Player ${listB.length + 1}` }]);
  };
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
  
  const generateMongoID = () => {
    // Generate a UUID (version 4)
    const timestamp = Math.floor(new Date().getTime() / 1000).toString(16); // Timestamp in hexadecimal
    const machineId = generateRandomHexString(6); // 6-character random hexadecimal string
    const processId = generateRandomHexString(4); // 4-character random hexadecimal string
    const counter = generateRandomHexString(6); // 6-character random hexadecimal string

    // Concatenate all parts to form the MongoDB ObjectID
    const mongoId = timestamp + machineId + processId + counter;

    return mongoId;
  }
  const generateRandomHexString = (length) => {
    const characters = 'abcdef0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
  }
  const handleSaveSession = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString(); // You can customize the format as needed
    const customId = generateMongoID();

    FindSeason(seasID);
    console.log(seasID);

    // Handle successful response
    navigate('/drill');
  };
  const FindSeason = () => {
>>>>>>> 05796df4db5a58df7ab0b4d8bf43aa3dcf3c4027:src/pages/SessionPage/Session.js
    
        .then(response => response.json())
        .then(data => {
            console.log('Session submitted:', data);
            handleSaveDrill(data._id);
        })
    
        .catch(error => console.error('Error submitting Session:', error));
    
        // Handle successful response
        navigate('/tempo');
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

<<<<<<< HEAD:wbb-analytics/src/pages/CreateSession/CreateSessionPage.js
                    <div className="drill-buttons">
                        {activeTab === 'Drills' && (
                            <>
                                <h2>Drills</h2>
                                <DrillButtons drills={drills} setDrills={setDrills}/>
                            </>
                        )}
                    </div>
=======
    // Handle successful response
    navigate('/drill');
  };
>>>>>>> 05796df4db5a58df7ab0b4d8bf43aa3dcf3c4027:src/pages/SessionPage/Session.js

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
                                    {/*<h3 style={{ color: 'white' }}> Opponent Team: {opponentTeam}</h3>*/}
                                    <h3 style={{ color: 'white' }}> Start Time: {startTime}</h3>
                                    <h3 style={{ color: 'white' }}> End Time: {endTime}</h3>
                                    <h3 style={{ color: 'white' }}> Date: {date}</h3>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="lists-column">
                    <Players/>
                </div>
            </div>
            <button className="create-session-button" onClick={handleSaveSession}>
                Create Session
            </button>
        </>
    );
};

export default CreateSessionsPage;