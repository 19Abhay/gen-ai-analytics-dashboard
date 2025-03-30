import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { submitQuery, clearHistory } from "../redux/slices/querySlice";

const QueryHistory = () => {
  const { history } = useSelector((state) => state.query);
  const dispatch = useDispatch();

  const handleRerunQuery = (query) => {
    dispatch(submitQuery(query));
  };

  if (history.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
        No queries yet. Try asking a question!
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">{history.length} queries</span>
        {history.length > 0 && (
          <button
            onClick={() => dispatch(clearHistory())}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Clear history
          </button>
        )}
      </div>

      <ul className="space-y-3">
        {history.map((item, index) => (
          <li
            key={index}
            className="border-b border-gray-100 pb-3 last:border-0"
          >
            <div className="flex justify-between items-start">
              <p className="text-sm font-medium">{item.query}</p>
              <button
                onClick={() => handleRerunQuery(item.query)}
                className="text-xs text-primary hover:text-blue-700 ml-2"
              >
                Rerun
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(item.timestamp).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QueryHistory;
