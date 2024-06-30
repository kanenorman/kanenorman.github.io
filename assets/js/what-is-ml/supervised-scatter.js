const colorMap = {
  blue: "#1f77b4",
  orange: "#ff7f0e",
  green: "#2ca02c",
  red: "#d62728",
  purple: "#9467bd",
  brown: "#8c564b",
  pink: "#e377c2",
  gray: "#7f7f7f",
  olive: "#bcbd22",
  cyan: "#17becf",
};

const linearData = [
  { x: 12.802550579465922, y: 28.73691807710801 },
  { x: 5.3111184481145735, y: 17.56546444779754 },
  { x: 10.997233078416322, y: 31.299131897232215 },
  { x: 10.731318722032052, y: 22.005343244942285 },
  { x: 3.0779670909774364, y: 9.761448110648239 },
  { x: 11.460127759021395, y: 25.866304987911832 },
  { x: 12.611367787536759, y: 30.54514250832326 },
  { x: 12.028449347658515, y: 27.147976736320445 },
  { x: 9.438449768751614, y: 22.96365482530355 },
  { x: 9.28202651420667, y: 25.763299682478266 },
  { x: 11.322540398426398, y: 29.184483299641563 },
  { x: 9.998296474826684, y: 21.988691503163164 },
  { x: 3.896716656992452, y: 14.150775371208843 },
  { x: 12.005399573656032, y: 29.466804810233235 },
  { x: 6.387439956898525, y: 16.7085205955645 },
  { x: 4.309329128422617, y: 16.48388671183746 },
  { x: 10.004110485847242, y: 23.77569728240544 },
  { x: 4.798395308733549, y: 16.09537595908203 },
  { x: 3.68010181120707, y: 13.411912858025563 },
  { x: 11.01655700992139, y: 26.887649337748066 },
  { x: 5.3362539025285445, y: 17.047426164744643 },
  { x: 3.8802335446552023, y: 10.12522045904096 },
  { x: 5.766920887029762, y: 20.364362308793158 },
  { x: 4.914683374978009, y: 12.491877717305728 },
  { x: 11.737458396724092, y: 24.66184480547062 },
  { x: 9.703242689342755, y: 28.05690224998152 },
  { x: 10.179961223704277, y: 27.05080014133128 },
  { x: 11.263940850281372, y: 30.85136523396442 },
  { x: 3.1242492514918316, y: 7.31437850480311 },
  { x: 6.422204997531415, y: 21.34682882450831 },
  { x: 5.784512092392795, y: 15.97969562842103 },
  { x: 5.424920609316938, y: 18.908030942605684 },
  { x: 7.193557545910186, y: 15.384622389811588 },
  { x: 10.400515184551585, y: 21.985024601576264 },
  { x: 12.143567014166333, y: 33.123286010741545 },
  { x: 12.430711708962162, y: 26.228005829030373 },
  { x: 8.274687261908937, y: 18.213859752200367 },
  { x: 12.758384717469838, y: 34.243508728216106 },
  { x: 7.077465989832398, y: 18.285589928877023 },
  { x: 6.636051431181513, y: 16.555101821619093 },
  { x: 12.503276323468976, y: 29.259463648228575 },
  { x: 7.427798636094414, y: 19.777973915619718 },
  { x: 6.202467598481147, y: 13.911413466084502 },
  { x: 5.63249864185082, y: 19.710076546533386 },
  { x: 10.035879653721064, y: 24.971225018276932 },
  { x: 7.177230958371725, y: 16.441478386094396 },
  { x: 3.789140762545737, y: 11.146584883597187 },
  { x: 3.177092822853676, y: 12.57938299650754 },
  { x: 6.753618527939318, y: 18.861392163374802 },
  { x: 10.319189485811332, y: 29.499669891171393 },
];

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
      .attr("fill", colorMap["orange"])
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
      .attr("fill", colorMap["orange"])
      .attr("stroke", "#f47534")
      .attr("opacity", 0.7);
  },

  multipleRegressionFits(svg, dataset, xScale, yScale) {
    const colors = d3.schemeTableau10;

    function generateRandomLineParams() {
      const m = Math.random() * 1 + 1.5; // Random slope between 1.5 and 2.5
      const b = Math.random() * 2 + 4; // Random intercept between 4 and 6
      return { m, b };
    }

    function addRandomLine() {
      const params = generateRandomLineParams();
      const { m, b } = params;
      const line = d3
        .line()
        .x((d) => xScale(d.x))
        .y((d) => yScale(m * d.x + b));

      const color = colors[Math.floor(Math.random() * colors.length)];

      const linePath = svg
        .append("path")
        .datum(dataset)
        .attr("d", line)
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("fill", "none")
        .style("opacity", 0);

      const textLabel = svg
        .append("text")
        .attr("class", "equation-text")
        .attr("x", 10)
        .attr("y", 40)
        .attr("fill", color)
        .attr("font-weight", "bold")
        .attr("font-style", "italic")
        .text(`weight ≈ ${b.toFixed(2)} + ${m.toFixed(2)} x height`)
        .style("opacity", 0);

      // Fade in
      linePath.transition().duration(1000).style("opacity", 1);
      textLabel.transition().duration(1000).style("opacity", 1);

      // Fade out and remove after 3 seconds
      setTimeout(() => {
        linePath
          .transition()
          .duration(1000)
          .style("opacity", 0)
          .on("end", function () {
            d3.select(this).remove();
          });

        textLabel
          .transition()
          .duration(1000)
          .style("opacity", 0)
          .on("end", function () {
            d3.select(this).remove();
          });
      }, 3000);
    }

    function continuouslyAddLines() {
      addRandomLine();
      setInterval(addRandomLine, 4000); // Add a new line every 4 seconds
    }

    continuouslyAddLines();
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
      .attr("stroke", colorMap["blue"])
      .attr("stroke-width", 2)
      .attr("fill", "none");
  },
};
const HeightWeightScatter = {
  data: linearData,
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
      const { svg, width, height } = PlotSetup.getCommonSetup(
        "scatter-plot-multiple-fits",
      );
      const { x, y } = PlotSetup.createAxes(svg, this.data, width, height);
      PlotSetup.scatterPoints(svg, this.data, x, y, width);
      PlotSetup.multipleRegressionFits(svg, this.data, x, y);

      this.initialized = true;
    }
  },
};

const LinearRegressionPlot = {
  initialized: false,
  m: -10.0, // Slope of the regression line
  b: -10.0, // Intercept of the regression line
  epoch: 0,
  learningRate: 0.01, // Low learning rate so visualization isn't too fast
  maxEpochs: 10000, // High iterations to account for low learning rate
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

  updateRegressionPlot: function (svg, x, y, width, height, epoch) {
    // Clear previous content
    svg.selectAll("#equation-text").remove();
    svg.selectAll("#mse-text").remove();
    svg.selectAll("#iteration-text").remove();

    // Update regression line
    PlotSetup.updateRegressionLine(svg, this.data, x, y, this.m, this.b);

    // Add equation annotation on the left
    svg
      .append("text")
      .attr("id", "equation-text")
      .attr("x", 10)
      .attr("y", 30)
      .text(`weight ≈  ${this.b.toFixed(2)} + ${this.m.toFixed(2)} x height`)
      .attr("fill", colorMap["blue"])
      .attr("font-weight", "bold");

    // Add MSE annotation on the right
    svg
      .append("text")
      .attr("id", "mse-text")
      .attr("x", width - 10)
      .attr("y", 30)
      .attr("text-anchor", "end")
      .text(`Error: ${this.computeError().toFixed(4)}`)
      .attr("fill", colorMap["red"])
      .attr("font-weight", "bold");

    svg
      .append("text")
      .attr("id", "iteration-text")
      .attr("x", width - 10)
      .attr("y", height - 10)
      .attr("text-anchor", "end")
      .text(`Iteration: ${epoch.toLocaleString()}`)
      .attr("fill", colorMap["green"])
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

      let previousError = 0;
      let timeouts = []; // Array to store timeout IDs

      const runGradientDescent = () => {
        for (let i = 0; i < this.maxEpochs; i++) {
          const timeoutId = setTimeout(() => {
            this.gradientDescent();
            this.updateRegressionPlot(svg, x, y, width, height, i);

            const currentError = this.computeError();
            if (Math.abs(previousError - currentError) < 0.000000001) {
              // Clear remaining timeouts
              for (let j = i + 1; j < this.maxEpochs; j++) {
                clearTimeout(timeouts[j]);
              }
              return;
            }

            previousError = currentError; // Update the previous error for the next iteration
          }, i * 10);

          timeouts.push(timeoutId); // Store the timeout ID
        }
      };

      runGradientDescent();
    }
  },
};

const PredictionPlot = {
  data: HeightWeightScatter.data,
  initialized: false,
  plot: function () {
    if (!this.initialized) {
      this.initialized = true;
      const { svg, width, height } =
        PlotSetup.getCommonSetup("prediction-plot");
      const { x, y } = PlotSetup.createAxes(svg, this.data, width, height);
      PlotSetup.scatterPoints(svg, this.data, x, y, width);

      // Calculate regression
      const regression = d3
        .regressionLinear()
        .x((d) => d.x)
        .y((d) => d.y)(this.data);

      // Draw regression line
      svg
        .append("line")
        .attr("x1", x(regression[0][0]))
        .attr("y1", y(regression[0][1]))
        .attr("x2", x(regression[1][0]))
        .attr("y2", y(regression[1][1]))
        .style("stroke", colorMap["blue"])
        .style("stroke-width", 2);

      // Calculate the min and max x values
      const minX = d3.min(this.data, (d) => d.x);
      const maxX = d3.max(this.data, (d) => d.x);
      const midX = (minX + maxX) / 2;

      // Add slider
      const slider = d3
        .select("#prediction-slider")
        .append("input")
        .attr("type", "range")
        .attr("min", minX)
        .attr("max", maxX)
        .attr("value", midX) // Set initial value to the midpoint
        .attr("step", 0.1)
        .style("width", "80%");

      // Add prediction point and label
      const predictionPoint = svg
        .append("circle")
        .attr("r", 5)
        .style("fill", "green");

      const predictionLabel = svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", -10);

      // Select span elements for predicted height and weight
      const optimalW0 = d3.select("#optimal-w0");
      const optimalW1 = d3.select("#optimal-w1");
      const bias = d3.select("#bias");
      const weight = d3.select("#weight");
      const predictedWeightSpan = d3.select("#predicted-weight");
      const inputValueSpan = d3.select("#input-value");

      // Prediction function
      const predict = (x) => regression.b + regression.a * x;

      // Update prediction on slider change
      const updatePrediction = function () {
        const selectedX = +slider.property("value");
        const predictedY = predict(selectedX);

        predictionPoint.attr("cx", x(selectedX)).attr("cy", y(predictedY));

        predictionLabel
          .attr("x", x(selectedX))
          .attr("y", y(predictedY))
          .text(`(${selectedX.toFixed(1)}, ${predictedY.toFixed(1)})`);

        // Update predicted height and weight spans
        inputValueSpan.text(`${selectedX.toFixed(1)} cm`);
        predictedWeightSpan.text(`${predictedY.toFixed(1)} kg`);
        optimalW0.text(regression.b.toFixed(2));
        optimalW1.text(regression.a.toFixed(2));
        bias.text(regression.b.toFixed(2));
        weight.text(regression.a.toFixed(2));
      };

      // Set initial prediction based on the midpoint value
      updatePrediction();

      // Attach update function to slider input event
      slider.on("input", updatePrediction);
    }
  },
};
