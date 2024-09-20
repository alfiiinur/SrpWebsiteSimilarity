// src/Card.js
import React from 'react';

function CardSteps({ heading, description }) {
    return (
        <div className="bg-white border-2 border-black rounded-lg shadow-md m-3 p-4">
            <h2 className="text-xl font-semibold mb-2">{heading}</h2>
            <p className="text-justify text-gray-700">{description}</p>
        </div>
    );
}

export default CardSteps;

