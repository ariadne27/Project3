(function() {
    var margin = {top: 80, right: 0, bottom: 0, left: 0},
        width = 1900,
        height = 675 - margin.top - margin.bottom,
        formatNumber = d3.format(",d"),
        transitioning;
    
    var x = d3.scale.linear()
        .domain([0, width])
        .range([0, width]);


        var svg = d3.select("body").append("svg")
        .attr("width", 500)
        .attr("height", 300);


      var svg = d3.select("#heatmap").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.bottom + margin.top)
        .style("margin-left", -margin.left + "px")
        .style("margin.right", -margin.right + "px")
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("shape-rendering", "crispEdges");

 var gradient0 = svg.append("linearGradient")
        .attr("id", "gradient0")
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "0%")
        .attr("y2", "100%")
        .attr("spreadMethod", "pad");
        
        gradient0.append("stop")
        .attr('class', 'start')
        .attr("offset", "0%")
        .attr("stop-color", "black")
        .attr("stop-opacity", 1);
        
        gradient0.append("stop")
        .attr('class', 'end')
        .attr("offset", "100%")
        .attr("stop-color", "black")
        .attr("stop-opacity", 1);
        

var gradient1 = svg.append("linearGradient")
.attr("id", "gradient1")
.attr("x1", "0%")
.attr("x2", "100%")
.attr("y1", "0%")
.attr("y2", "100%")
.attr("spreadMethod", "pad");

gradient1.append("stop")
.attr('class', 'start')
.attr("offset", "0%")
.attr("stop-color", "rgb(0,54,58)")
.attr("stop-opacity", 1);

gradient1.append("stop")
.attr('class', 'end')
.attr("offset", "100%")
.attr("stop-color", "black")
.attr("stop-opacity", 1);

var gradient2 = svg.append("linearGradient")
.attr("id", "gradient2")
.attr("x1", "0%")
.attr("x2", "100%")
.attr("y1", "0%")
.attr("y2", "100%")
.attr("spreadMethod", "pad");

gradient2.append("stop")
.attr('class', 'start')
.attr("offset", "0%")
.attr("stop-color", "rgb(0,149,160)")
.attr("stop-opacity", 1);

gradient2.append("stop")
.attr('class', 'end')
.attr("offset", "100%")
.attr("stop-color", "black")
.attr("stop-opacity", 1);

var gradient3 = svg.append("linearGradient")
.attr("id", "gradient3")
.attr("x1", "0%")
.attr("x2", "100%")
.attr("y1", "0%")
.attr("y2", "100%")
.attr("spreadMethod", "pad");

gradient3.append("stop")
.attr('class', 'start')
.attr("offset", "0%")
.attr("stop-color", "white")
.attr("stop-opacity", 1);

gradient3.append("stop")
.attr('class', 'end')
.attr("offset", "100%")
.attr("stop-color", "rgb(0,54,58)")
.attr("stop-opacity", .75);

var gradient4 = svg.append("linearGradient")
.attr("id", "gradient4")
.attr("x1", "0%")
.attr("x2", "100%")
.attr("y1", "0%")
.attr("y2", "100%")
.attr("spreadMethod", "pad");

gradient4.append("stop")
.attr('class', 'start')
.attr("offset", "0%")
.attr("stop-color", "white")
.attr("stop-opacity", 1);

gradient4.append("stop")
.attr('class', 'end')
.attr("offset", "100%")
.attr("stop-color", "gray")
.attr("stop-opacity", .75);

var gradient5 = svg.append("linearGradient")
.attr("id", "gradient5")
.attr("x1", "0%")
.attr("x2", "100%")
.attr("y1", "0%")
.attr("y2", "100%")
.attr("spreadMethod", "pad");

gradient5.append("stop")
.attr('class', 'start')
.attr("offset", "0%")
.attr("stop-color", "whitesmoke")
.attr("stop-opacity", 1);

gradient5.append("stop")
.attr('class', 'end')
.attr("offset", "100%")
.attr("stop-color", "rgb(0,54,58)")
.attr("stop-opacity",.05);

var gradient6 = svg.append("linearGradient")
.attr("id", "gradient6")
.attr("x1", "0%")
.attr("x2", "100%")
.attr("y1", "0%")
.attr("y2", "100%")
.attr("spreadMethod", "pad");

gradient6.append("stop")
.attr('class', 'start')
.attr("offset", "0%")
.attr("stop-color", "white")
.attr("stop-opacity", 1);

gradient6.append("stop")
.attr('class', 'end')
.attr("offset", "100%")
.attr("stop-color", "whitesmoke")
.attr("stop-opacity", .5);


      
    
    var y = d3.scale.linear()
        .domain([0, height])
        .range([0, height]);
    
    var color = d3.scale.threshold()
        .domain([11,14,21,28,35,42])
        .range(["url(#gradient0)","url(#gradient1)","url(#gradient2)","url(#gradient3)","url(#gradient4)","url(#gradient5)","url(#gradient6)"]);
    
    var treemap = d3.layout.treemap()
        .children(function(d, depth) { return depth ? null : d._children; })
        .sort(function(a, b) { return a.value - b.value; })
        .ratio(height / width * 0.5 * (1 + Math.sqrt(5)))
        .round(false);
    
   
    
    
    var grandparent = svg.append("g")
        .attr("class", "grandparent");
    
    grandparent.append("rect")
        .attr("y", -margin.top)
        .attr("width", width)
        .attr("height", margin.top);
    
    grandparent.append("text")
        .attr("x", 30)
        .attr("y", 30 - margin.top)
        .attr("dy", ".75em");
    
        d3.queue()
            .defer(d3.json, "data3.json")
            .await(function(error, root) {
                if (error) throw error;
                initialize(root);
                accumulate(root);
                layout(root);
                display(root);
    
                function initialize(root) {
                  root.x = root.y = 0;
                  root.dx = width;
                  root.dy = height;
                  root.depth = 0;
                }
    
                function accumulate(d) {
                  return (d._children = d.children)
                      ? d.value = d.children.reduce(function(p, v) { return p + accumulate(v); }, 0)
                      : d.value;
                }
    
                function layout(d) {
                  if (d._children) {
                    treemap.nodes({_children: d._children});
                    d._children.forEach(function(c) {
                      c.x = d.x + c.x * d.dx;
                      c.y = d.y + c.y * d.dy;
                      c.dx *= d.dx;
                      c.dy *= d.dy;
                      c.parent = d;
                      layout(c);
                    });
                  }
                }
    
                function getContrast50(hexcolor) {
                    return (parseInt(hexcolor.replace('#', ''), 16) > 0xffffff/3) ? 'black':'white';
                }
    
                function display(d) {
                  grandparent
                      .datum(d.parent)
                      .on("click", transition)
                    .select("text")
                      .text(name(d));
    
                  grandparent
                      .datum(d.parent)
                    .select("rect")
                      .attr("fill", function(){return color(d['rate'])})
    
                  var g1 = svg.insert("g", ".grandparent")
                      .datum(d)
                      .attr("class", "depth");
    
                  var g = g1.selectAll("g")
                      .data(d._children)
                    .enter().append("g");
    
                  g.filter(function(d) { return d._children; })
                      .classed("children", true)
                      .on("click", transition);
    
                  g.selectAll(".child")
                      .data(function(d) { return d._children || [d]; })
                    .enter().append("rect")
                      .attr("class", "child")
                      .call(rect);
    
                  d3.select("#heatmap").select("#tooltip").remove();
                  var div = d3.select("#heatmap").append("div")
                              .attr("id", "tooltip")
                              .style("opacity", 0);
    
    
                  g.append("svg:a")
                      .attr("xlink:href", function(d) {
                          if(!d._children){
                              var url = "#";
                              return url; 
                          }
                      })
                    .append("rect")
                      .attr("class", "parent")
                      .call(rect)
                      .on("mouseover", function(d) {
                             if (d.parent.name != "MARKET") {
                                 d3.select("#tooltip").transition()
                                    .duration(200)
                                    .style("opacity", 1);
                                 d3.select("#tooltip").html("<h3>"+d.name+"</h3><table>"+
                                          "<tr><td> Return:"+d.value+"</td><td>(Rank:"+d.rate+")</td></tr>"+
                                          "</table>")
                                    .style("left", (d3.event.pageX-document.getElementById('heatmap').offsetLeft + 20) + "px")
                                    .style("top", (d3.event.pageY-document.getElementById('heatmap').offsetTop - 60) + "px");
                             }
                      })
                      .on("mouseout", function(d) {
                             d3.select("#tooltip").transition()
                                .duration(500)
                                .style("opacity", 0);
                      })

                    
                    .append("title")
                      .text(function(d) { return formatNumber(d.value); });
    
    
                  g.append("text")
                      .attr("dy", ".75em")
                      .text(function(d) { return d.name; })
                      .call(text);
    
                  function transition(d) {
                    if (transitioning || !d) return;
                    transitioning = true;
    
                    var g2 = display(d),
                        t1 = g1.transition().duration(750),
                        t2 = g2.transition().duration(750);
    
                    x.domain([d.x, d.x + d.dx]);
                    y.domain([d.y, d.y + d.dy]);
    
                    svg.style("shape-rendering", null);
    
                    svg.selectAll(".depth").sort(function(a, b) { return a.depth - b.depth; });
    
                    g2.selectAll("text").style("fill-opacity", 0);
    
                    t1.selectAll("text").call(text).style("fill-opacity", 0);
                    t2.selectAll("text").call(text).style("fill-opacity", 1);
                    t1.selectAll("rect").call(rect);
                    t2.selectAll("rect").call(rect);
    
                    t1.remove().each("end", function() {
                      svg.style("shape-rendering", "crispEdges");
                      transitioning = false;
                    });
                  }
    
                  return g;
                }
    
                function text(text) {
                  text.attr("x", function(d) { return x(d.x) + (x(d.x + d.dx) - x(d.x))/2; })
                      .attr("y", function(d) { return y(d.y) + (y(d.y + d.dy) - y(d.y))/1.9; })
                      .attr("dy", 0)
                      .attr("font-size", function(d) { var w=x(d.x + d.dx) - x(d.x),
                                                           h=y(d.y + d.dy) - y(d.y),
                                                           t=(d.name).length/1.3;
                                                       var tf=Math.min(Math.floor(w/t),h/3);
                                                       return (tf>=5)?Math.min(tf, 30):0; })
                      .attr("fill", "white")
                      .attr("text-anchor", "middle");
                }
    
                function rect(rect) {
                  rect.attr("x", function(d) { return x(d.x); })
                      .attr("y", function(d) { return y(d.y); })
                      .attr("width", function(d) { return x(d.x + d.dx) - x(d.x); })
                      .attr("height", function(d) { return y(d.y + d.dy) - y(d.y); })
                      .attr("fill", function(d){return color(parseFloat(d.rate));});
                }
    
                function name(d) {
                  return d.parent
                      ? "SECTOR : "+d.name+" (Back to Overall Market)"
                      : "OVERALL "+d.name;
                }
    });
    }());
    