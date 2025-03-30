import React from "react";
import { useDispatch } from "react-redux";
import { resetStatus } from "../redux/slices/querySlice";

const ErrorState = ({
  message = "An error occurred while processing your query.",
}) => {
  const dispatch = useDispatch();

  return (
    <div className="card border-l-4 border-red-500">
      <div className="flex items-center">
        <div className="mr-4">
          <svg
            className="h-8 w-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-medium text-red-800">
            Query Processing Error
          </h3>
          <p className="text-red-600 mt-1">{message}</p>
          <button
            onClick={() => dispatch(resetStatus())}
            className="mt-3 text-sm bg-red-50 hover:bg-red-100 text-red-700 py-1 px-3 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
