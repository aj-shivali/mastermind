import React from 'react';

function ConfirmationPopup({ message, onConfirm, onCancel }) {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <p>{message}</p>
                <div className="popup-buttons">
                    <button onClick={onConfirm}>Yes</button>
                    <button onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationPopup;