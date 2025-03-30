import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitQuery } from "../redux/slices/querySlice";

const AI_SUGGESTIONS = [
  "Show me sales trends for the last quarter",
  "Compare user engagement across different platforms",
  "What are the top performing products this month?",
  "Analyze customer sentiment from recent feedback",
  "Show conversion rates by marketing channel",
];

const QueryInput = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.query);
  const isLoading = status === "loading";

  useEffect(() => {
    if (query.length > 2) {
      // Filter suggestions based on input
      const filtered = AI_SUGGESTIONS.filter((suggestion) =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      dispatch(submitQuery(query.trim()));
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Ask a question about your data..."
            disabled={isLoading}
          />
          <button
            type="submit"
            className="btn btn-primary rounded-l-none"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Analyze"}
          </button>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-3">
        <p className="text-sm text-gray-500">Suggested queries:</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {AI_SUGGESTIONS.slice(0, 3).map((suggestion, index) => (
            <button
              key={index}
              type="button"
              className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full"
              onClick={() => setQuery(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QueryInput;
