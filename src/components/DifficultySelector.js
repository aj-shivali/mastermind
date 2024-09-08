import React from 'react';

function DifficultySelector({ setDifficulty }) {
    return (
        <div className="difficulty-selector">
            <button onClick={() => setDifficulty('easy')}>Easy</button>
            <button onClick={() => setDifficulty('medium')}>Medium</button>
            <button onClick={() => setDifficulty('hard')}>Hard</button>
        </div>
    );
}

export default DifficultySelector;