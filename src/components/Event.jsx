import React from 'react';

const events = [
  { title: "Pooja at City Hospital", date: "April 25, 2025" },
  { title: "School Yagna Ceremony", date: "April 30, 2025" },
];

const UpcomingEvents = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Upcoming Events</h2>
      <ul className="space-y-2">
        {events.map((event, index) => (
          <li key={index} className="text-gray-600">
            📅 {event.title} — <span className="font-medium">{event.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingEvents;
