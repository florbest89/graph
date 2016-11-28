var width = 960,
    height = 500

var svg = d3.select("#graph").append("svg")
    .attr("width", width)
    .attr("height", height);

var force = d3.layout.force()
    .charge(-500)
    .distance(100)
    .size([width, height]);


var json = {
  "nodes":[
    {"name":"Juan","type":1,"prefix":"s:"},
    {"name":"es un","type":2,"prefix":"p:"},
    {"name":"hombre","type":3,"prefix":"o:"}
  ],
  "links":[
    {"source":0,"target":1,"weight":1},
    {"source":1,"target":2,"weight":1}
  ]
};


  force
      .nodes(json.nodes)
      .links(json.links)
      .start();

  var link = svg.selectAll(".link")
      .data(json.links)
      .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.weight); });

  var node = svg.selectAll(".node")
      .data(json.nodes)
      .enter().append("g")
      .attr("class", "node")
      .call(force.drag);

  node.append("circle")
      .attr("r",function(node){ return node.type == 2? 5: 10; });

  node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(function(node) { return node.prefix + " " + node.name; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
});
