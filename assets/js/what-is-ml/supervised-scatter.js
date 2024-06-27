const PlotSetup = {
  getCommonSetup(containerId) {
    const container = document.getElementById(containerId);
    const container_width = container.clientWidth;
    const container_height = 400;

    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const width = container_width - margin.left - margin.right;
    const height = container_height - margin.top - margin.bottom;

    const svg = d3
      .select(`#${containerId}`)
      .append("svg")
      .attr("width", container_width)
      .attr("height", container_height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    return { svg, width, height };
  },

  createAxes(svg, data, width, height) {
    const xExtent = d3.extent(data, (d) => d.x);
    const yExtent = d3.extent(data, (d) => d.y);

    const x = d3
      .scaleLinear()
      .domain([xExtent[0] - 3, xExtent[1] + 3])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([yExtent[0] - 10, yExtent[1] + 10])
      .range([height, 0]);

    // Add X axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(10));

    // Add Y axis
    svg.append("g").call(d3.axisLeft(y).ticks(10));

    // Add X gridlines
    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(10).tickSize(-height).tickFormat(""));

    // Add Y gridlines
    svg
      .append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(y).ticks(10).tickSize(-width).tickFormat(""));

    // X axis label
    svg
      .append("text")
      .attr("class", "axis-label")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + 40)
      .text("Height (cm)")
      .attr("font-weight", "bold");

    // Y axis label
    svg
      .append("text")
      .attr("class", "axis-label")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("y", -35)
      .attr("x", -height / 2)
      .text("Weight (kg)")
      .attr("font-weight", "bold");

    svg
      .append("text")
      .attr("class", "plot-title")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", -5)
      .text("Height vs Weight")
      .attr("font-weight", "bold");

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
      .attr("cy", 10)
      .attr("r", 5)
      .attr("class", "dot")
      .attr("fill", "#f4b334")
      .attr("stroke", "#f47534")
      .attr("opacity", 0.7)
      .transition()
      .delay((d, i) => Math.floor(i / 10) * 100) // Delay each batch of 10 dots based on index
      .duration(1500)
      .attr("cx", (d) => x(d.x))
      .attr("cy", (d) => y(d.y));
  },

  scatterPoints(svg, data, x, y, width) {
    svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.x))
      .attr("cy", (d) => y(d.y))
      .attr("r", 5)
      .attr("class", "dot")
      .attr("fill", "#f4b334")
      .attr("stroke", "#f47534")
      .attr("opacity", 0.7);
  },

  multipleRegressionFits(svg, dataset, xScale, yScale) {
    // Define different slopes and intercepts similar to 2x + 5
    const linesParams = [
      { m: 2, b: 5},
      { m: 1, b: 12},
      { m: 3, b: -1 },
    ];

    // Colors for different lines
    const colors = d3.schemeCategory10;

    // Loop through each set of parameters
    linesParams.forEach((params, index) => {
      const { m, b } = params;

      // Create Regression Line
      const line = d3.line()
        .x((d) => xScale(d.x))
        .y((d) => yScale(m * d.x + b));

      // Append regression line to SVG with a delay
      setTimeout(() => {
        svg.append("path")
          .datum(dataset)
          .attr("d", line)
          .attr("stroke", colors[index % colors.length])
          .attr("stroke-width", 2)
          .attr("fill", "none")
          .style("opacity", 0) // Initially hide the line
          .transition()
          .duration(1000) // Adjust the duration as needed
          .style("opacity", 1); // Fade in the line

        // Add equation annotation for each line
        svg.append("text")
          .attr("class", "equation-text")
          .attr("x", 10)
          .attr("y", 30 + index * 20) // Adjust vertical spacing
          .text(`y = ${b.toFixed(0)} + ${m.toFixed(0)}x`)
          .attr("fill", colors[index % colors.length])
          .attr("font-weight", "bold")
          .style("opacity", 0) // Initially hide the text
          .transition()
          .duration(1000) // Same duration as line animation
          .style("opacity", 1); // Fade in the text
      }, index * 1500); // Adjust the delay between lines (in milliseconds)
    });
  },


  updateRegressionLine(svg, dataset, xScale, yScale, m, b) {
    // Clear previous regression line
    svg.select(".line-regression").remove();

    // Create line function for regression line
    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(m * d.x + b));

    // Update regression line
    svg
      .append("path")
      .datum(dataset)
      .attr("class", "line-regression")
      .attr("d", line)
      .attr("stroke", "#1f77b4")
      .attr("stroke-width", 2)
      .attr("fill", "none");
  },
};
const HeightWeightScatter = {
  data: Array.from({ length: 50 }, () => {
    const slope = 2; // True slope of the relationship
    const intercept = 5; // True intercept of the relationship
    const noise = 9; // Amount of noise to add
    const x = 3 + Math.random() * 10;
    const y = slope * x + intercept + (Math.random() - 0.5) * noise;
    return { x, y };
  }),

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

const HeightWeightScatterMultipleFits = {
  data: HeightWeightScatter.data,
  initialized: false,

  plot: function () {
    if (!this.initialized) {
      const { svg, width, height } = PlotSetup.getCommonSetup("scatter-plot-multiple-fits");
      const { x, y } = PlotSetup.createAxes(svg, this.data, width, height);
      PlotSetup.scatterPoints(svg, this.data, x, y, width);
      PlotSetup.multipleRegressionFits(svg, this.data, x, y)



      this.initialized = true;
    }
  },
};

const LinearRegressionPlot = {
  initialized: false,
  m: 1.0, // Slope of the regression line
  b: 0.0, // Intercept of the regression line
  epoch: 0,
  learningRate: 0.00001, // Low learning rate so visualization isn't too fast
  maxEpochs: 3000, // High iterations to account for low learning rate
  data: HeightWeightScatter.data,
  n: HeightWeightScatter.data.length,

  // MSE Loss
  computeError() {
    let totalError = 0;
    this.data.forEach((d) => {
      const yPred = this.predict(d.x);
      totalError += (d.y - yPred) ** 2;
    });
    return totalError / this.n;
  },

  predict: function (x) {
    return this.m * x + this.b;
  },

  gradientDescent: function () {
    let mGradient = 0;
    let bGradient = 0;
    this.data.forEach((d) => {
      const yPred = this.predict(d.x);
      const error = d.y - yPred;
      mGradient += -(2 / this.n) * d.x * error;
      bGradient += -(2 / this.n) * error;
    });
    // Update m and b after calculating gradients for all data points
    this.m -= this.learningRate * mGradient;
    this.b -= this.learningRate * bGradient;
  },

  updateRegressionPlot: function (svg, x, y, width, height) {
    // Clear previous content
    svg.selectAll("#equation-text").remove();
    svg.selectAll("#mse-text").remove();

    // Update regression line
    PlotSetup.updateRegressionLine(svg, this.data, x, y, this.m, this.b);

    // Add equation annotation on the left
    svg
      .append("text")
      .attr("id", "equation-text")
      .attr("x", 10)
      .attr("y", 30)
      .text(`y = ${this.b.toFixed(2)} + ${this.m.toFixed(2)}x`)
      .attr("fill", "#1f77b4")
      .attr("font-weight", "bold");

    // Add MSE annotation on the right
    svg
      .append("text")
      .attr("id", "mse-text")
      .attr("x", width - 10)
      .attr("y", 30)
      .attr("text-anchor", "end")
      .text(`Error: ${this.computeError().toFixed(2)}`)
      .attr("fill", "#FF0000")
      .attr("font-weight", "bold");
  },

  plot: function () {
    if (!this.initialized) {
      this.initialized = true;
      const { svg, width, height } = PlotSetup.getCommonSetup(
        "linear-regression-plot",
      );
      const { x, y } = PlotSetup.createAxes(svg, this.data, width, height);
      PlotSetup.scatterPoints(svg, HeightWeightScatter.data, x, y);

      const runGradientDescent = () => {
        for (let i = 0; i < this.maxEpochs; i++) {
          setTimeout(() => {
            this.gradientDescent();

            console.log(
              "Epoch: ",
              i,
              "Max: ",
              this.maxEpochs,
              "m: ",
              this.m,
              "b: ",
              this.b,
            );

            this.updateRegressionPlot(svg, x, y, width, height);
          }, i * 10);
        }
      };

      runGradientDescent();
    }
  },
};
