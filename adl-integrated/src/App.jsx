
import React from 'react';
import './App.css'; // Make sure to import the CSS file

function App() {
    return (
        <div className="container">
            <img src="../public/streamsphere-logo.png" width="350" height="280" alt="StreamSphere Logo"></img>
            <h1>Welcome to StreamSphere!</h1>
            <div className="button-container">
                <a href="https://movie-frontend-9cf4.onrender.com/" className="button" target="_blank">🎞️ Movies</a>
                <a href="http://localhost:3000" className="button" target="_blank">🎷 Music</a>
                <a href="http://localhost:5175" className="button" target="_blank">📰 News</a>
                
            </div>
        </div>
    );
}

export default App;
