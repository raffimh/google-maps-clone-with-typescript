import type { Place } from "../api/Place";
import { useState } from "react";
import { Search } from "../api/Search";

interface LocationSearchProps {
  onSelect: (place: Place) => void;
}

export default function LocationSearch({ onSelect }: LocationSearchProps) {
  const [term, setTerm] = useState<string>("");
  const [places, setPlaces] = useState<Place[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await Search(term);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="font-bold" htmlFor="term">
          Search
        </label>
        <input
          className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 px-4 py-2 w-full"
          id="term"
          value={term}
          onChange={e => setTerm(e.target.value)}
        />
      </form>
    </div>
  );
}
