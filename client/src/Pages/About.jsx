import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="px-24 py-12">
      <h1 className="text-5xl font-bold italic py-4">About Us</h1>
      <p className="text-xl font-semibold text-gray-800 text-justify">
        Inventcolabs is known for driving innovation in the space of IT
        services. With 8+ years of business-critical exposure serving over 200
        businesses across the globe, we have left a significant mark in the
        domain creating transformative change across industry timelines and
        trends. Location, location, location. Its paramount in real estate—and
        real estate marketing. Remember, when people are looking to partner with
        an agent, they are looking for someone who is knowledgeable in real
        estate broadly but also in the specific area. Making this clear on your
        website could help you land some clients. It can also help with your
        local SEO.
      </p>
      <Link to={"/"}>
        <button className="px-4 py-2 my-6 rounded-lg bg-blue-600 text-white hover:bg-blue-700 trans-eff">
          Go to Home
        </button>
      </Link>
    </div>
  );
};

export default About;
