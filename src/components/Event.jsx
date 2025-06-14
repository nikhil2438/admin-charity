
import React, { useState, useEffect } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetch("https://charity-backend-uj5e.onrender.com/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", newEvent.title);
      formData.append("description", newEvent.description);
      formData.append("date", newEvent.date);
      formData.append("location", newEvent.location);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch(
        "https://charity-backend-uj5e.onrender.com/api/events",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add event");
      }

      const addedEvent = await res.json();

      setEvents((prev) => [...prev, addedEvent]);

      setNewEvent({ title: "", description: "", date: "", location: "" });
      setImageFile(null);
    } catch (error) {
      console.error("Failed to add event:", error);
    }
  };

  return (
    <div className=" rounded-2xl shadow-md p-4 mb-6 ">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Upcoming Events
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6 ">
        {events.map((event) => (
          <div
            key={event._id}
            className="flex flex-col md:flex-row items-center md:items-start gap-6 border border-gray-200 p-4 rounded-xl shadow hover:shadow-md transition duration-300"
          >
            {event.image && (
              <img
                src={event.image}
                alt={event.title}
                className="w-full md:w-48 h-36 object-cover rounded-lg"
              />
            )}
            <div className="text-left flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                {event.title}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                📅 <span className="font-medium">Date:</span>{" "}
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                📍 <span className="font-medium">Location:</span>{" "}
                {event.location}
              </p>
              <p className="text-sm text-gray-600">
                📝 <span className="font-medium">Description:</span>{" "}
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleAddEvent}
        className="space-y-4 bg-blue-50 p-6 rounded-xl shadow-md max-w-xl mx-auto"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Add New Event
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <textarea
          name="description"
          placeholder="Event Description"
          value={newEvent.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="date"
          name="date"
          value={newEvent.date}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newEvent.location}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default Events;
