"use client";

import { useState } from "react";
import "./globals.css"; // Your Tailwind CSS

export default function Home() {
  const [tone, setTone] = useState("Funny");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerate = async () => {
    if (!input.trim()) {
      setOutput("Type something first, mawa. I can’t cook from thin air!");
      return;
    }

    setOutput(`(${tone} Rizz) Cooking your message...🔥`);

    try {
      const response = await fetch("/api/rizz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, tone }),
      });

      const data = await response.json();

      if (response.ok) {
        setOutput(data.output);
      } else {
        setOutput("Bruh, AI didn’t respond well. Try again.");
      }
    } catch (error) {
      setOutput("Connection error. Is your WiFi ghosting you?");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-pink-600 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-xl">
        W Rizz.ai
      </h1>
      <p className="mb-8 text-lg md:text-xl max-w-xl text-center">
        Your personal AI wingman. Drop a line, pick a vibe, and win the convo.
      </p>

      <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-2xl w-full max-w-lg space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message or the situation..."
          className="w-full p-4 rounded-lg bg-white bg-opacity-20 placeholder-gray-300 text-white focus:outline-none"
          rows={4}
        />

        <div className="flex items-center justify-between">
          <label className="font-semibold">Tone:</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="bg-purple-700 text-white px-3 py-2 rounded-lg focus:outline-none"
          >
            <option>Funny</option>
            <option>Romantic</option>
            <option>Savage</option>
            <option>Poetic</option>
            <option>Simp Mode</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full bg-white text-purple-700 font-bold py-3 rounded-xl hover:bg-opacity-80 transition-all"
        >
          Generate Rizz
        </button>

        {output && (
          <div className="mt-4 p-4 bg-white bg-opacity-20 rounded-lg border border-white border-opacity-30">
            <p>{output}</p>
          </div>
        )}
      </div>
    </div>
  );
}
