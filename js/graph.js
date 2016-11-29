function draw(triples, sub_obs, nodes, id){


  console.log("#Triples : " + triples.length);
  console.log("Id: " + id);

  var links = [];

   for(i = 0 ; i < triples.length ; i++){

    var triple = triples[i];

    var node = {"name": triple.predicate , "type": 2};
    nodes.push(node);

    var link_sp = {"source": sub_obs[triple.subject], "target": id, "weight": 1};
    links.push(link_sp);

    var link_po = {"source": id, "target": sub_obs[triple.object], "weight": 1};
    links.push(link_po);

    id += 1;

  }

var width = 1200,
    height = 1200;

var svg = d3.select("#graph").append("svg")
    .attr("width", width)
    .attr("height", height);

var force = d3.layout.force()
    .charge(-500)
    .distance(100)
    .size([width, height]);


var json = {
  "nodes": nodes,
  "links": links
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
      .text(function(node) { return node.name; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
});

}


