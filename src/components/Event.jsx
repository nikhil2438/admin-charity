import React, { useState, useEffect } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    image: "",
  });

  
  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      const addedEvent = await res.json();

      setEvents((prev) => [...prev, addedEvent]);
      setNewEvent({
        title: "",
        description: "",
        date: "",
        location: "",
        image: "",
      });
    } catch (error) {
      console.error("Failed to add event:", error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Upcoming Events</h2>

      <ul className="space-y-2 mb-6">
        {events.map((event) => (
          <li key={event._id} className="text-gray-600">
            📅 <strong>{event.title}</strong> —{" "}
            {new Date(event.date).toLocaleDateString()} <br />
            📍 {event.location} <br />
            📝 {event.description}
            {event.image && (
              <div className="mt-2">
                <img src={event.image} alt={event.title} className="h-40 w-auto rounded-md" />
              </div>
            )}
          </li>
        ))}
      </ul>

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
        <textarea
          name="description"
          placeholder="Event Description"
          value={newEvent.description}
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
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newEvent.location}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newEvent.image}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
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

export default Events;
