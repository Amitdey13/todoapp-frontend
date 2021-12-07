import React from 'react';
import './App.css';

// custom components
import {Home} from "./components"

// importing bootstrap files
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
