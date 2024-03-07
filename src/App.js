// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import PlayersPage from './pages/Stats/PlayersPage';
import TeamStats from './pages/TeamStats/TeamStats';
import CreateSessionsPage from './pages/CreateSession/CreateSessionPage';
import Drill from './pages/DrillPage/Drill';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/drill" element={<Drill />} />
        <Route path="/players" element={<PlayersPage />} />
        <Route path="/teamstats" element={<TeamStats />} />
        <Route path="/createsession" element={<CreateSessionsPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
