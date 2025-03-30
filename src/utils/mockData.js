export const generateMockResponse = (query) => {
  const queryLower = query.toLowerCase();
  let chartType = "bar";
  let title = "Data Analysis Results";
  let description = "Visualization based on your query";
  let insights = [];

  if (
    queryLower.includes("trend") ||
    queryLower.includes("over time") ||
    queryLower.includes("growth")
  ) {
    chartType = "line";
    title = "Trend Analysis";
    description = "Data trends over the selected time period";
    insights = [
      "Growth rate increased by 15% in the last period",
      "Seasonal patterns detected with peaks in Q4",
      "Trend suggests continued growth in upcoming months",
    ];
  } else if (
    queryLower.includes("compare") ||
    queryLower.includes("comparison")
  ) {
    chartType = "bar";
    title = "Comparative Analysis";
    description = "Comparison across different categories";
    insights = [
      "Category A outperforms others by 23%",
      "Category C shows the highest growth potential",
      "Consider reallocating resources from Category D",
    ];
  } else if (
    queryLower.includes("distribution") ||
    queryLower.includes("breakdown") ||
    queryLower.includes("composition")
  ) {
    chartType = "pie";
    title = "Distribution Analysis";
    description = "Breakdown of components by percentage";
    insights = [
      "Segment B represents the largest portion at 42%",
      "Smallest three segments combined are only 15% of total",
      "Distribution has shifted 8% toward Segment A since last quarter",
    ];
  }

  let chartData;

  if (chartType === "bar") {
    chartData = {
      labels: [
        "Category A",
        "Category B",
        "Category C",
        "Category D",
        "Category E",
      ],
      datasets: [
        {
          label: "Value",
          data: Array.from({ length: 5 }, () =>
            Math.floor(Math.random() * 100)
          ),
          backgroundColor: [
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 99, 132, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
          borderColor: [
            "rgba(54, 162, 235, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  } else if (chartType === "line") {
    chartData = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Value",
          data: Array.from({ length: 12 }, () =>
            Math.floor(Math.random() * 100)
          ),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
  } else if (chartType === "pie") {
    chartData = {
      labels: ["Segment A", "Segment B", "Segment C", "Segment D", "Segment E"],
      datasets: [
        {
          data: Array.from({ length: 5 }, () =>
            Math.floor(Math.random() * 100)
          ),
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  }

  return {
    id: Date.now().toString(),
    title,
    description,
    chartType,
    chartData,
    insights,
    query,
    generatedAt: new Date().toISOString(),
  };
};
