'use client';

import { useState } from "react";
import preview_data from "./existing_data";
import generateNextRound from "./pairing_algorithm";

export default function Overview() {
  const [participants, setParticipants] = useState<string>("");
  const [rounds, setRounds] = useState<string[]>([]);

  const addNewRound = () => {
    setRounds([...rounds, ""]);
  }

  const addRound = (round: string[][]) => {
    const newRound = round.map((pair) => pair.join(", ")).join("\n")
    setRounds([...rounds, newRound]);
  };

  const updateRound = (index: number, value: string) => {
    const updatedRounds = [...rounds];
    updatedRounds[index] = value;
    setRounds(updatedRounds);
  };

  const removeRound = (index: number) => {
    const updatedRounds = rounds.filter((_, i) => i !== index);
    setRounds(updatedRounds);
  };

  const loadExistingRounds = () => {
    const data = preview_data();
    setParticipants(data.participants.join("\n"));
    setRounds(
      data.previousRounds.map((round) =>
        round.map((pair) => pair.join(", ")).join("\n")
      )
    );
  };

  const handleSubmit = async () => {
    const _participants = participants.split("\n").filter((name) => name.trim() !== "");
    const _previousRounds = rounds.map((round) =>
      round
        .split("\n")
        .filter((pair) => pair.trim() !== "")
        .map((pair) => pair.split(",").map((name) => name.trim()))
    );
    const nextRound: string[][] = generateNextRound(_participants, _previousRounds);

    addRound(nextRound)
  };

  function add(round: string[][]) {
    round.map((pair) => pair.join(", ")).join("\n")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white dark:bg-gray-900">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">Feedback-Paar-Generator</h1>

        {/* Teilnehmer */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-black dark:text-white">Teilnehmer:</h2>
          <p className="my-4 text-black dark:text-white">Namen aller Teilnehmer (ein Name je Zeile)</p>
          <textarea
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            rows={6}
            placeholder={`Name_1\nName_2\nName_3\nName_4`}
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
          />
        </div>

        {/* Feedback-Partner */}
        {rounds.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2 text-black dark:text-white">Feedback Paare je Runde:</h2>
            {rounds.map((round, index) => (
              <div key={index} className="mb-2">
                <h3 className="text-md font-semibold text-black dark:text-white">Runde {index + 1}</h3>
                <p className="my-4 text-black dark:text-white">Feedback Paare aus Runde {index + 1} der Form 'Name1, Name2' (ein Paar je Zeile)</p>
                <div className="flex items-start gap-2">
                  <textarea
                    className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    rows={7}
                    placeholder={'Name_1, Name_4\nName_2, Name_3'}
                    value={round}
                    onChange={(e) => updateRound(index, e.target.value)}
                  />
                  <button
                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                    onClick={() => removeRound(index)}
                  >
                    Löschen
                  </button>
                </div>
              </div>
            ))}
          </div>)}

        {/* Aktionen */}
        <div className="flex flex-col content-center mb-4">
          <h2 className="text-lg font-semibold mb-2 text-black dark:text-white">Aktionen:</h2>
          {/* Feedback-Paare anlegen */}
          <button
            className="mb-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
            onClick={addNewRound}
          >
            Feedback-Paare (nächste Runde) anlegen
          </button>
          {/* Feedback-Paare würfeln */}
          <button
            className="mb-4 bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600"
            onClick={handleSubmit}
          >
            Feedback-Paare (nächste Runde) würfeln
          </button>
        </div>

        {/* Bestehende Daten */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2 text-black dark:text-white">Bestehende Daten:</h2>
          <p className="mb-4 text-black dark:text-white">Nachfolgend können die bestehenden Feedback-Paare aus Runde 1-4 geladen werden:</p>
          <div className="mb-4 text-center">
            <button
              className="w-full bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
              onClick={loadExistingRounds}
            >
              Lade Feedback-Paare aus Runde 1-4
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}