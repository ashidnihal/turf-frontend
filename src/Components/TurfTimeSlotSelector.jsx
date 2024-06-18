import React, { useState } from 'react';

function TurfTimeSlotSelector({ selectedSlots, onSelectedTimeSlotsChange }) {
  // Function to generate time slots from 12:00am to 11:00pm in 12-hour clock format
  const generateTimeSlots = () => {
    const timeSlots = [];
    for (let hour = 0; hour < 24; hour++) {
      const ampm = hour < 12 ? 'AM' : 'PM';
      const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const startHour = hour12.toString().padStart(2, '0');
      const endHour = ((hour + 1) % 12 === 0 ? 12 : (hour + 1) % 12).toString().padStart(2, '0');
      timeSlots.push(`${startHour}:00${ampm}-${endHour}:00${ampm}`);
    }
    return timeSlots;
  };

  // Function to handle time slot selection
  const handleTimeSlotClick = (slot) => {
    // Check if the slot is already selected
    const updatedSlots = selectedSlots.includes(slot)
      ? selectedSlots.filter((selectedSlot) => selectedSlot !== slot)
      : [...selectedSlots, slot];
    // Invoke the callback function to update the selected time slots in the parent component
    onSelectedTimeSlotsChange(updatedSlots);
  };

  return (
    <div>
      <h5 className='mt-3'>Select Available Time Slots for Your Turf</h5>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {generateTimeSlots().map((slot, index) => (
          <button
            key={index}
            className="btn"
            style={{
              backgroundColor: selectedSlots.includes(slot) ? '#28a745' : 'transparent',
              color: selectedSlots.includes(slot) ? '#fff' : '#28a745',
              border: selectedSlots.includes(slot) ? 'none' : '1px solid #28a745',
              padding: '10px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => handleTimeSlotClick(slot)}
          >
            {slot}
          </button>
        ))}
      </div>
      <div>
        <h6 className='mt-3'>Selected Time Slots:</h6>
        <ul>
          {selectedSlots.map((slot, index) => (
            <li key={index}>{slot}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TurfTimeSlotSelector;
