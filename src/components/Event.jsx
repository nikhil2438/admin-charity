import React, { useState } from "react";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([
    { title: "Pooja at City Hospital", date: "April 25, 2025" },
    { title: "School Yagna Ceremony", date: "April 30, 2025" },
  ]);

  const [newEvent, setNewEvent] = useState({ title: "", date: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (newEvent.title && newEvent.date) {
      setEvents((prev) => [...prev, newEvent]);
      setNewEvent({ title: "", date: "" });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Upcoming Events</h2>

      {/* Event List */}
      <ul className="space-y-2 mb-6">
        {events.map((event, index) => (
          <li key={index} className="text-gray-600">
            📅 {event.title} — <span className="font-medium">{event.date}</span>
          </li>
        ))}
      </ul>

      {/* Add Event Form */}
      <form onSubmit={handleAddEvent} className="space-y-2">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="date"
          name="date"
          value={newEvent.date}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default UpcomingEvents;
 
