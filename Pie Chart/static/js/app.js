// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Create a function that builds the metadata panel:
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function buildMetadata(sample) {

  // Use `d3.json` to fetch the metadata for a sample
  d3.json(`/metadata/${sample}`).then(function(selection) {
    console.log(selection);

    // Use d3 to select the panel with id of `#sample-metadata`
    var metadata = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    metadata.html("");    

    // Use `Object.entries` to add each key and value pair to the panel
    Object.entries(selection).forEach(([key, value]) => {
      metadata.append("h6").text(`${key}: ${value}`);
    });
 });
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Create a function that builds the plots:
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function buildPie(sample) {

  // Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then(function(selection) {
    console.log(selection);

    const key = selection.key;
    const sampleValues = selection.sample_values;
    const stock = selection.stock;

    // Build a Pie Chart
    var pieData = [{
      values: sampleValues.slice(0, 11),
      labels: stock.slice(0, 11),
      hoverinfo: stock,
      type: "pie"
    }];

    var pieLayout = {
      margin: {t: 0, 1: 0}
    };
  
    Plotly.plot("pie", pieData, pieLayout);
  });
}

// function buildGraph(sample) {

// //   // Use `d3.json` to fetch the sample data for the plots
//   d3.json(`/performance/${sample}`).then(function(selection) {
//     console.log(selection);

//     const date = selection.date;
//     const sampleValues2 = selection.sample_values2;
//     const russ= selection.RUS2000;
//     const sp5 = selection.SP5;


//   //   // Build a Bubble Chart using the sample data
//     var model = {
//       x: date,
//       y: sampleValues2,
//       type: "scatter"
//     };
    
//     // Create our second trace
//     var russ2000 = {
//       x: date,
//       y: russ,
//       type: "scatter"
//     };
//     var sp500= {
//       x: date,
//       y: sp5,
//       type: "scatter"
//     };
    
//     // The data array consists of both traces
//     var data = [model, russ2000, sp500];
    
//     // Note that we omitted the layout object this time
//     // This will use default parameters for the layout
//     Plotly.newPlot("bubble", data);
//   });
// }

// function othername() {
//   var input = document.getElementById("userInput").value;
//   alert(input);
// }

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildPie(firstSample);
    // buildGraph(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildPie(newSample);
  // buildGraph(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();