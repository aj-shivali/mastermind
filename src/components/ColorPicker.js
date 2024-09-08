import React from 'react';

function ColorPicker({ colors, addColor, removeColor, currentGuess, codeLength }) {
    const handleDragStart = (e, color) => {
        e.dataTransfer.setData('text/plain', color);
    };

    const handleColorClick = (color) => {
        if (currentGuess.includes(color)) {
            removeColor(color);
        } else {
            addColor(color);
        }
    };

    const isColorUsed = (color) => currentGuess.includes(color);
    const isGuessFull = currentGuess.filter(c => c !== null).length >= codeLength;

    return (
        <div className="color-picker">
            {colors.map(color => (
                <button
                    key={color}
                    className={`color-btn ${color} ${isColorUsed(color) ? 'selected' : ''}`}
                    onClick={() => handleColorClick(color)}
                    draggable
                    onDragStart={(e) => handleDragStart(e, color)}
                    disabled={isGuessFull && !isColorUsed(color)}
                >
                </button>
            ))}
        </div>
    );
}

export default ColorPicker;