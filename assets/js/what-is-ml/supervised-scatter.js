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
      .domain([xExtent[0] - 3 , xExtent[1] + 3])
      .range([0, width]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    const y = d3
      .scaleLinear()
      .domain([yExtent[0] - 10, yExtent[1] + 10])
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
      .attr("fill", "#f4b334")
      .attr("stroke", "#f47534")
      .attr("opacity", 0.7)
      .transition()
      .delay((d, i) => Math.floor(i / 10) * 100) // Delay each batch of 10 dots based on index
      .duration(1000)
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
      .attr("d", line);
  },
};

const HeightWeightScatter = {
  data: Array.from({ length: 50 }, () => {
    const slope = 2; // True slope of the relationship
    const intercept = 5; // True intercept of the relationship
    const noise = 9; // Amount of noise to add
    const x =  3 + Math.random() * 10;
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

const LinearRegressionPlot = {
  initialized: false,
  m: 0.0, // Slope of the regression line
  b: 0.0, // Intercept of the regression line
  epoch: 0,
  learningRate: 0.0001,
  maxEpochs: 100,
  data: HeightWeightScatter.data,
  n: HeightWeightScatter.data.length,

  // MSE Loss
  computeError() {
    let totalError = 0;
    this.data.forEach(d => {
      const yPred = this.predict(d.x);
      totalError += (d.y - yPred) ** 2;
    });
    return totalError / this.n
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
    console.log("mGradient: ", mGradient, "bGradient: ", bGradient);
    // Update m and b after calculating gradients for all data points
    this.m -= this.learningRate * mGradient;
    this.b -= this.learningRate * bGradient;
  },

  updateRegressionPlot: function (svg, x, y, width, height) {
    // Clear previous content
    svg.selectAll("*").remove();

    // Plot scatter points
    PlotSetup.scatterPoints(svg, this.data, x, y, width);

    // Update regression line
    PlotSetup.updateRegressionLine(svg, this.data, x, y, this.m, this.b);

    // Add equation annotation
    svg
      .append("text")
      .attr("class", "equation-text")
      .attr("x", 10)
      .attr("y", 30)
      .text(`y = ${this.m.toFixed(2)}x + ${this.b.toFixed(2)}`);

    // Add x-axis
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Add y-axis
    svg.append("g").attr("class", "y-axis").call(d3.axisLeft(y));

    // Add x-axis label
    svg
      .append("text")
      .attr("class", "x-axis-label")
      .attr("x", width / 2)
      .attr("y", height + 40)
      .attr("text-anchor", "middle")
      .text("Height (cm)");

    // Add y-axis label
    svg
      .append("text")
      .attr("class", "y-axis-label")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -60 + 15)
      .attr("text-anchor", "middle")
      .text("Weight (kg)");
  },

  plot: function () {
    if (!this.initialized) {
      this.initialized = true;
      const { svg, width, height } = PlotSetup.getCommonSetup(
        "linear-regression-plot",
      );
      const { x, y } = PlotSetup.createAxes(svg, this.data, width, height);

      const runGradientDescent = () => {

        for (let i = 0; i < this.maxEpochs; i++) {

          setTimeout(() => {

            this.gradientDescent()
            console.log("m", this.m, "b", this.b, "mse", this.computeError())

            this.updateRegressionPlot(svg, x, y, width, height)


          }, i * 10


          );
        }

      };

      runGradientDescent();
    }
  },
};


console.log(
  "Epoch: ",
  this.epoch,
  "Max: ",
  this.maxEpochs,
  "m: ",
  this.m,
  "b: ",
  this.b,
);