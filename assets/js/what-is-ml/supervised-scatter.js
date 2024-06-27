function scatterPlot() {
const data = [
  { height: 168.73, weight: 88.06 },
  { height: 197.54, weight: 99.62 },
  { height: 186.6, weight: 92.72 },
  { height: 179.93, weight: 88.46 },
  { height: 157.8, weight: 71.51 },
  { height: 157.8, weight: 75.3 },
  { height: 152.9, weight: 74.15 },
  { height: 193.31, weight: 101.94 },
  { height: 180.06, weight: 91.75 },
  { height: 185.4, weight: 83.89 },
  { height: 151.03, weight: 77.14 },
  { height: 198.5, weight: 97.32 },
  { height: 191.62, weight: 92.43 },
  { height: 160.62, weight: 83.37 },
  { height: 159.09, weight: 84.7 },
  { height: 159.17, weight: 84.24 },
  { height: 165.21, weight: 78.41 },
  { height: 176.24, weight: 86.57 },
  { height: 171.6, weight: 87.45 },
  { height: 164.56, weight: 87.16 },
  { height: 180.59, weight: 87.9 },
  { height: 156.97, weight: 77.56 },
  { height: 164.61, weight: 76.77 },
  { height: 168.32, weight: 78.18 },
  { height: 172.8, weight: 90.46 },
  { height: 189.26, weight: 101.41 },
  { height: 159.98, weight: 79.63 },
  { height: 175.71, weight: 92.87 },
  { height: 179.62, weight: 91.62 },
  { height: 152.32, weight: 72.94 },
  { height: 180.38, weight: 92.0 },
  { height: 158.53, weight: 86.95 },
  { height: 153.25, weight: 76.45 },
  { height: 197.44, weight: 106.55 },
  { height: 198.28, weight: 86.04 },
  { height: 190.42, weight: 99.32 },
  { height: 165.23, weight: 83.05 },
  { height: 154.88, weight: 75.95 },
  { height: 184.21, weight: 92.56 },
  { height: 172.01, weight: 76.07 },
  { height: 156.1, weight: 76.95 },
  { height: 174.76, weight: 89.16 },
  { height: 151.72, weight: 83.25 },
  { height: 195.47, weight: 95.14 },
  { height: 162.94, weight: 77.43 },
  { height: 183.13, weight: 89.05 },
  { height: 165.59, weight: 87.37 },
  { height: 176.0, weight: 89.65 },
  { height: 177.34, weight: 86.02 },
  { height: 159.24, weight: 82.19 },
];

// Set up the dimensions and margins of the graph
const margin = { top: 20, right: 30, bottom: 50, left: 60 },
  width = 600 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// Append the SVG object to the div with id "scatter-plot"
const svg = d3
  .select("#scatter-plot")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Find min and max for height and weight
const heightExtent = d3.extent(data, (d) => d.height);
const weightExtent = d3.extent(data, (d) => d.weight);

// Add X axis
const x = d3
  .scaleLinear()
  .domain([heightExtent[0] - 10, heightExtent[1] + 10]) // Adding some padding
  .range([0, width]);

svg
  .append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(x))
  .selectAll("text")
  .style("text-anchor", "middle");
  
// Add Y axis
const y = d3
  .scaleLinear()
  .domain([weightExtent[0] - 10, weightExtent[1] + 10]) // Adding some padding
  .range([height, 0]);

svg
  .append("g")
  .call(d3.axisLeft(y))
  .selectAll("text")
  .style("text-anchor", "middle");

// Add dots
svg
  .append("g")
  .selectAll("dot")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", (d) => x(d.height))
  .attr("cy", (d) => y(d.weight))
  .attr("r", 5)
  .attr("class", "dot")
  .attr("fill", "#4B9CD3")
  .attr("opacity", 0.7);


// Add X axis label
svg
  .append("text")
  .attr("class", "axis-label")
  .attr("text-anchor", "middle")
  .attr("x", width / 2)
  .attr("y", height + margin.bottom - 10)
  .text("Height (cm)");

// Add Y axis label
svg
  .append("text")
  .attr("class", "axis-label")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .attr("y", -margin.left + 15)
  .attr("x", -height / 2)
  .text("Weight (kg)");

  // Strokes on dots
  svg.selectAll(".dot")
  .style("stroke", "#007FAE")
  .style("stroke-width", "1.5px");
};


scatterPlot();