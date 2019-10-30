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

function detectIE() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf("MSIE ");
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
  }

  var trident = ua.indexOf("Trident/");
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf("rv:");
    return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
  }

  // var edge = ua.indexOf('Edge/');
  // if (edge > 0) {
  //     // Edge (IE 12+) => return version number
  //     return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  // }

  // other browser
  return false;
}

function setVideoHeight() {
  const videoRatio = 1920 / 1080;
  const minVideoWidth = 400 * videoRatio;
  let secWidth = 0,
    secHeight = 0;

  secWidth = videoSec.width();
  secHeight = videoSec.height();

  secHeight = secWidth / 2.13;

  if (secHeight > 600) {
    secHeight = 600;
  } else if (secHeight < 400) {
    secHeight = 400;
  }

  if (secWidth > minVideoWidth) {
    $("video").width(secWidth);
  } else {
    $("video").width(minVideoWidth);
  }

  videoSec.height(secHeight);
}

// Parallax function
// https://codepen.io/roborich/pen/wpAsm
var background_image_parallax = function($object, multiplier) {
  multiplier = typeof multiplier !== "undefined" ? multiplier : 0.5;
  multiplier = 1 - multiplier;
  var $doc = $(document);
  $object.css({ "background-attatchment": "fixed" });
  $(window).scroll(function() {
    var from_top = $doc.scrollTop(),
      bg_css = "center " + multiplier * from_top + "px";
    $object.css({ "background-position": bg_css });
  });
};

$(window).scroll(function() {
  if ($(this).scrollTop() > 50) {
    $(".scrolltop:hidden")
      .stop(true, true)
      .fadeIn();
  } else {
    $(".scrolltop")
      .stop(true, true)
      .fadeOut();
  }

  // Make sticky header
  if ($(this).scrollTop() > 158) {
    $(".tm-nav-section").addClass("sticky");
  } else {
    $(".tm-nav-section").removeClass("sticky");
  }
});

let videoSec;

$(function() {
  if (detectIE()) {
    alert(
      "Please use the latest version of Edge, Chrome, or Firefox for best browsing experience."
    );
  }

  const mainNav = $("#tmMainNav");
  mainNav.singlePageNav({
    filter: ":not(.external)",
    offset: $(".tm-nav-section").outerHeight(),
    updateHash: true,
    beforeStart: function() {
      mainNav.removeClass("show");
    }
  });

  videoSec = $("#tmVideoSection");

  // Adjust height of video when window is resized
  $(window).resize(function() {
    setVideoHeight();
  });

  setVideoHeight();

  $(window).on("load scroll resize", function() {
    var scrolled = $(this).scrollTop();
    var vidHeight = $("#hero-vid").height();
    var offset = vidHeight * 0.6;
    var scrollSpeed = 0.25;
    var windowWidth = window.innerWidth;

    if (windowWidth < 768) {
      scrollSpeed = 0.1;
      offset = vidHeight * 0.5;
    }

    $("#hero-vid").css(
      "transform",
      "translate3d(-50%, " + -(offset + scrolled * scrollSpeed) + "px, 0)"
    ); // parallax (25% scroll rate)
  });

  // Parallax image background
  background_image_parallax($(".tm-parallax"), 0.4);

  // Back to top
  $(".scroll").click(function() {
    $("html,body").animate(
      { scrollTop: $("#home").offset().top },
      "1000"
    );
    return false;
  });
});



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