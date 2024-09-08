import React from 'react';

function GameBoard({ guesses, feedbacks, currentGuess, gameOver, codeLength, maxTurns, addColor }) {
    const emptyRows = maxTurns - guesses.length - (gameOver ? 0 : 1);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, index) => {
        e.preventDefault();
        const color = e.dataTransfer.getData('text');
        if (index < codeLength) {
            addColor(color, index);
        }
    };

    return (
        <div className="game-board">
            {guesses.map((guess, index) => (
                <div key={index} className="guess-row">
                    <div className="pegs">
                        {guess.map((color, i) => (
                            <div key={i} className={`peg ${color || 'empty'}`}></div>
                        ))}
                    </div>
                    <div className="feedback">
                        {Array(feedbacks[index].correct).fill(<div className="feedback-peg correct"></div>)}
                        {Array(feedbacks[index].misplaced).fill(<div className="feedback-peg misplaced"></div>)}
                    </div>
                </div>
            ))}
            {!gameOver && (
                <div className="guess-row current-guess">
                    {Array(codeLength).fill().map((_, index) => (
                        <div
                            key={index}
                            className={`peg ${currentGuess[index] || 'empty'}`}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                        ></div>
                    ))}
                </div>
            )}
            {Array(emptyRows).fill().map((_, index) => (
                <div key={`empty-${index}`} className="guess-row">
                    {Array(codeLength).fill(<div className="peg empty"></div>)}
                </div>
            ))}
        </div>
    );
}

export default GameBoard;