// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import TeamStats from './pages/TeamStats/TeamStats';
import Practice from './pages/Practice/Practice';
import Drill from './pages/DrillPage/Drill';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/drill" element={<Drill />} />
        <Route path="/teamstats" element={<TeamStats />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
