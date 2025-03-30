import React from "react";
import QueryInput from "./components/QueryInput";
import QueryHistory from "./components/QueryHistory";
import ResultsDisplay from "./components/ResultsDisplay";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import { useSelector } from "react-redux";
import "./App.css";

function App() {
  const { status, error } = useSelector((state) => state.query);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-dark">
            Gen AI Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Ask questions about your data using natural language
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 query-section">
            <div className="card mb-6">
              <QueryInput />
            </div>

            {status === "loading" && <LoadingState />}
            {status === "failed" && <ErrorState message={error} />}
            {status === "succeeded" && <ResultsDisplay />}
          </div>

          <div className="lg:col-span-1">
            <div className="card history-section">
              <h2 className="text-xl font-semibold mb-4">Query History</h2>
              <QueryHistory />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
