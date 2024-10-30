import React, { useState, useEffect } from 'react';
import './App.css';
import TrackerColumn from './Components/TrackerColumn';

function App() {
 
  
  return (
    <div className="App">
      <TrackerColumn name="Aarvi"></TrackerColumn>
      <TrackerColumn name="Advik"></TrackerColumn>
      
    </div>
  );
}

export default App;
