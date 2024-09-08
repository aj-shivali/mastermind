import React from 'react';

function LandingScreen({ setDifficulty }) {
    return (
        <div className="landing-screen">
            <div className="background-decoration">
                {/* ... (keep existing circles) */}
            </div>
            <div className="content">
                <h1>Mastermind</h1>
                <p>Choose your difficulty:</p>
                <div className="difficulty-buttons">
                    <button onClick={() => setDifficulty('easy')}>Easy</button>
                    <button onClick={() => setDifficulty('medium')}>Medium</button>
                    <button onClick={() => setDifficulty('hard')}>Hard</button>
                </div>
            </div>
        </div>
    );
}

export default LandingScreen;