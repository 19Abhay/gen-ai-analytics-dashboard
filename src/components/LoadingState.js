import React from "react";

const LoadingState = () => {
  return (
    <div className="card flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
      <h3 className="text-lg font-medium text-gray-700">
        Processing your query...
      </h3>
      <p className="text-gray-500 mt-2 text-center max-w-md">
        Our AI is analyzing your request and preparing insights. This usually
        takes a few seconds.
      </p>

      <div className="w-full max-w-md mt-6">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary animate-pulse"
            style={{ width: "70%" }}
          ></div>
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>Analyzing data</span>
          <span>Generating visualization</span>
          <span>Finalizing</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
