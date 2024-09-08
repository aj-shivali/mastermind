import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import ColorPicker from './components/ColorPicker';
import Timer from './components/Timer';
import LandingScreen from './components/LandingScreen';
import ConfirmationPopup from './components/ConfirmationPopup';
import Rules from './components/Rules';  // Add this import

const COLORS = ['R', 'G', 'B', 'Y', 'P', 'O'];
const DIFFICULTIES = {
    easy: { codeLength: 3, maxTurns: 10 },
    medium: { codeLength: 4, maxTurns: 10 },
    hard: { codeLength: 5, maxTurns: 10 }
};

function App() {
    const [difficulty, setDifficulty] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [code, setCode] = useState([]);
    const [guesses, setGuesses] = useState([]);
    const [currentGuess, setCurrentGuess] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [resetTimer, setResetTimer] = useState(false);
    const [showExitConfirmation, setShowExitConfirmation] = useState(false);

    const generateCode = useCallback((codeLength) => {
        const shuffled = COLORS.slice().sort(() => 0.5 - Math.random());
        return shuffled.slice(0, codeLength);
    }, []);

    const newGame = useCallback(() => {
        const { codeLength } = DIFFICULTIES[difficulty];
        setCode(generateCode(codeLength));
        setGuesses([]);
        setCurrentGuess([]);
        setFeedbacks([]);
        setGameOver(false);
        setWin(false);
        setIsRunning(true);
        setResetTimer(true);
        setTimeout(() => setResetTimer(false), 0);
    }, [difficulty, generateCode]);

    useEffect(() => {
        if (difficulty) {
            newGame();
            setGameStarted(true);
        }
    }, [difficulty, newGame]);

    const startNewGame = (selectedDifficulty) => {
        setDifficulty(selectedDifficulty);
    };

    const exitGame = () => {
        setGameStarted(false);
        setDifficulty(null);
        setIsRunning(false);
        setResetTimer(true);
        setTimeout(() => setResetTimer(false), 0);
    };

    const handleExitClick = () => {
        setShowExitConfirmation(true);
    };

    const handleExitConfirm = () => {
        setShowExitConfirmation(false);
        exitGame();
    };

    const handleExitCancel = () => {
        setShowExitConfirmation(false);
    };

    if (!gameStarted) {
        return <LandingScreen setDifficulty={startNewGame} />;
    }

    const { codeLength, maxTurns } = DIFFICULTIES[difficulty];

    const addColor = (color, index) => {
        const newGuess = [...currentGuess];
        if (index !== undefined) {
            // If an index is provided (drag and drop)
            if (newGuess[index] === color) {
                // If the color is already there, remove it
                newGuess[index] = null;
            } else {
                newGuess[index] = color;
            }
        } else {
            // If no index is provided (clicking)
            const emptyIndex = newGuess.indexOf(null);
            if (emptyIndex !== -1) {
                newGuess[emptyIndex] = color;
            } else if (newGuess.length < codeLength) {
                newGuess.push(color);
            }
        }
        setCurrentGuess(newGuess);
    };

    const removeColor = (color) => {
        const index = currentGuess.indexOf(color);
        if (index !== -1) {
            const newGuess = [...currentGuess];
            newGuess[index] = null;
            setCurrentGuess(newGuess);
        }
    };

    const removeLastColor = () => {
        const lastColorIndex = currentGuess.reduce((acc, color, index) => color !== null ? index : acc, -1);
        if (lastColorIndex !== -1) {
            const newGuess = [...currentGuess];
            newGuess[lastColorIndex] = null;
            setCurrentGuess(newGuess);
        }
    };

    const submitGuess = () => {
        if (currentGuess.filter(color => color !== null).length === codeLength) {
            const feedback = checkGuess(currentGuess.filter(color => color !== null), code);
            setGuesses([...guesses, currentGuess]);
            setFeedbacks([...feedbacks, feedback]);
            setCurrentGuess(Array(codeLength).fill(null));

            if (feedback.correct === codeLength) {
                setWin(true);
                setGameOver(true);
                setIsRunning(false);
                setResetTimer(true);
                setTimeout(() => setResetTimer(false), 0);
            } else if (guesses.length + 1 === maxTurns) {
                setGameOver(true);
                setIsRunning(false);
                setResetTimer(true);
                setTimeout(() => setResetTimer(false), 0);
            }
        }
    };

    const checkGuess = (guess, code) => {
        let correct = 0;
        let misplaced = 0;
        const codeCopy = [...code];
        const guessCopy = [...guess];

        for (let i = 0; i < codeLength; i++) {
            if (guessCopy[i] === codeCopy[i]) {
                correct++;
                codeCopy[i] = guessCopy[i] = null;
            }
        }

        for (let i = 0; i < codeLength; i++) {
            if (guessCopy[i] !== null) {
                const index = codeCopy.indexOf(guessCopy[i]);
                if (index !== -1) {
                    misplaced++;
                    codeCopy[index] = null;
                }
            }
        }

        return { correct, misplaced };
    };

    return (
        <div className="App">
            <div className="game-container">
                <header>
                    <h1>Mastermind</h1>
                    <Timer isRunning={isRunning} reset={resetTimer} />
                    <button className="exit-btn" onClick={handleExitClick}>Exit</button>
                </header>
                <Rules />  {/* Add this line to include the Rules component */}
                <div className="game-content">
                    <GameBoard
                        guesses={guesses}
                        feedbacks={feedbacks}
                        currentGuess={currentGuess}
                        gameOver={gameOver}
                        codeLength={codeLength}
                        maxTurns={maxTurns}
                        addColor={addColor}
                    />
                    <div className="controls">
                        <ColorPicker
                            colors={COLORS}
                            addColor={addColor}
                            removeColor={removeColor}
                            currentGuess={currentGuess}
                            codeLength={codeLength}
                        />
                        <div className="action-buttons">
                            <button className="undo-btn" onClick={removeLastColor}>Undo</button>
                            <button className="submit-btn" onClick={submitGuess}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            {gameOver && (
                <div className="game-over">
                    <h2>{win ? 'You Win!' : 'Game Over'}</h2>
                    <p>The code was:</p>
                    <div className="code-reveal">
                        {code.map((color, index) => (
                            <div key={index} className={`peg ${color}`}></div>
                        ))}
                    </div>
                    <button className="new-game-btn" onClick={() => setGameStarted(false)}>New Game</button>
                </div>
            )}
            {showExitConfirmation && (
                <ConfirmationPopup
                    message="Are you sure you want to exit the game?"
                    onConfirm={handleExitConfirm}
                    onCancel={handleExitCancel}
                />
            )}
        </div>
    );
}

export default App;