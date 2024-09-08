import React, { useState } from 'react';

function Rules() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="rules-container">
            <button className="rules-toggle" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? 'Hide Rules' : 'Show Rules'}
            </button>
            {isOpen && (
                <div className="rules-content">
                    <h3>How to Play Mastermind</h3>
                    <ol>
                        <li>The computer generates a secret code of colored pegs.</li>
                        <li>Your goal is to guess the exact colors and positions of the code.</li>
                        <li>After each guess, you'll receive feedback:</li>
                        <ul>
                            <li>Green peg: Correct color in the correct position</li>
                            <li>Yellow peg: Correct color in the wrong position</li>
                        </ul>
                        <li>Use the feedback to refine your next guess.</li>
                        <li>You have 10 attempts to crack the code.</li>
                        <li>Win by guessing the exact code within the given attempts!</li>
                    </ol>
                </div>
            )}
        </div>
    );
}

export default Rules;