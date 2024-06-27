const PlotSetup = {
  getCommonSetup(containerId) {
    const container = document.getElementById(containerId);
    const container_width = container.clientWidth;
    const container_height = container.clientHeight;

    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const width = container_width - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(`#${containerId}`)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    return { svg, margin, width, height };
  },

  createAxes(svg, data, width, height) {
    const heightExtent = d3.extent(data, (d) => d.height);
    const weightExtent = d3.extent(data, (d) => d.weight);

    const x = d3
      .scaleLinear()
      .domain([heightExtent[0] - 10, heightExtent[1] + 10])
      .range([0, width]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    const y = d3
      .scaleLinear()
      .domain([weightExtent[0] - 10, weightExtent[1] + 10])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    svg
      .append("text")
      .attr("class", "axis-label")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + 40)
      .text("Height (cm)");

    svg
      .append("text")
      .attr("class", "axis-label")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("y", -50)
      .attr("x", -height / 2)
      .text("Weight (kg)");

    return { x, y };
  },

  scatterPointsWithTransition(svg, data, x, y, width) {
    svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", width / 2)
      .attr("cy", -10)
      .attr("r", 5)
      .attr("class", "dot")
      .attr("fill", "#4B9CD3")
      .attr("opacity", 0.7)
      .transition()
      .delay((d, i) => Math.floor(i / 10) * 100) // Delay each batch of 10 dots based on index
      .duration(1000)
      .attr("cx", (d) => x(d.height))
      .attr("cy", (d) => y(d.weight));
  },
  scatterPoints(svg, data, x, y) {
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
  },
};

const HeightWeightScatter = {
  data: [
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
  ],
  initialized: false,

  plot: function () {
    if (!this.initialized) {
      const { svg, width, height } = PlotSetup.getCommonSetup("scatter-plot");
      const { x, y } = PlotSetup.createAxes(svg, this.data, width, height);
      PlotSetup.scatterPointsWithTransition(svg, this.data, x, y, width);
      this.initialized = true;
    }
  },
};

const LinearRegressionPlot = {
  initialized: false,
  plot: function () {
    if (!this.initialized) {
      const { svg, width, height } = PlotSetup.getCommonSetup(
        "linear-regression-plot"
      );
      const { x, y } = PlotSetup.createAxes(
        svg,
        HeightWeightScatter.data,
        width,
        height
      );

      PlotSetup.scatterPoints(svg, HeightWeightScatter.data, x, y);

      // Add linear regression line (example, you can customize as needed)
      const regression = ss.linearRegression(
        HeightWeightScatter.data.map((d) => [d.height, d.weight])
      );
      const regressionLine = ss.linearRegressionLine(regression);
      const xVals = d3.extent(HeightWeightScatter.data, (d) => d.height);
      const yVals = xVals.map((x) => regressionLine(x));

      svg
        .append("line")
        .attr("x1", x(xVals[0]))
        .attr("y1", y(yVals[0]))
        .attr("x2", x(xVals[1]))
        .attr("y2", y(yVals[1]))
        .attr("stroke", "red")
        .attr("stroke-width", 2);
      this.initialized = true;
    }
  },
};
