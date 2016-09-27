var w = 800,
    h = 800,
    node,
    link,
    root;

var faultyVM = new Array();

var win = window,
    doc = document,
    e = doc.documentElement,
    g = doc.getElementsByTagName('body')[0],
    x = win.innerWidth || e.clientWidth || g.clientWidth,
    y = win.innerHeight|| e.clientHeight|| g.clientHeight;


var force = d3.layout.force()
    .on("tick", tick)
    .charge(function(d) {
        return d._children ? -d.size / 100 : -13;
    })
    .linkDistance(function(d) {
        return d.target._children ? 80 : 50;
    })
    .size([w, y]);

var svg = d3.select("body").append("svg:svg")
    .attr("width", 800)
    .attr("height", 700)
    .attr("class", "graphContainer")
    .append('g');
   
var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
        
        return d.name;
    });
    
svg.call(tip);

d3.json("../htmlDocs/html/topo.json", function(json) {
    console.log(json);
    root = json;
    root.fixed = true;
    root.x = w / 2;
    root.y = h / 2 ;
    update();
});


  
function update() {
    var nodes = flatten(root),             //understand;
        links = d3.layout.tree().links(nodes);

    // Restart the force layout.
    force
        .nodes(nodes)
        .links(links)
        .start();

    // Update the links…
    link = svg.selectAll("line.link")
        .data(links, function(d) {
            return d.target.id;
        });

    // Enter any new links.
    link.enter().insert("svg:line", ".node")
        .attr("class", "link")
        .attr("x1", function(d) {
            return d.source.x;
        })
        .attr("y1", function(d) {
            return d.source.y;
        })
        .attr("x2", function(d) {
            return d.target.x;
        })
        .attr("y2", function(d) {
            return d.target.y;
        })
        .attr("stroke","#3182bd")
        .attr("stroke-width",0.5);

    // Exit any old links.
    link.exit().remove();

    // Update the nodes…
    node = svg.selectAll("circle.node")
        .data(nodes, function(d) {
            return d.id;
        })
        .style("fill", color)
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);
        
    //circle.node('click',getElementById("fish").innerHTML("heyfishie"));

    node.transition()
        .attr("r", function(d) {
            return d.children ? 4.5 : Math.sqrt(d.size) / 10;
        });

    // Enter any new nodes.
    node.enter().append("svg:circle")
        .attr("class", "node")
        .attr("cx", function(d) {
            return d.x;
        })
        .attr("cy", function(d) {
            return d.y;
        })
        .attr("r", function(d) {
            return d.children ? 4.5 : Math.sqrt(d.size) / 10;
        })
        .attr('class', function(d) {
               if (d.status == 'ok')
                    return 'okayNode';
               else if (d.status == 'error')
                    return 'errorNode';
               return 'warnNode';
        })
        .style("fill", color)
        .style("stroke", strokeColor)
        .style("stroke-width", 1.5)
        .on("click", click)
        .call(force.drag);

    // Exit any old nodes.
    node.exit().remove();
    
    
}

function tick() {
    link.attr("x1", function(d) {
            return d.source.x;
        })
        .attr("y1", function(d) {
            return d.source.y;
        })
        .attr("x2", function(d) {
            return d.target.x;
        })
        .attr("y2", function(d) {
            return d.target.y;
        });

    node.attr("cx", function(d) {
            return d.x;
        })
        .attr("cy", function(d) {
            return d.y;
        });
}

function color(d) {
    if (d.status == 'ok')
        return 'rgba(207,255,221,0.8)';
    else if (d.status == 'error')
    {
        if(!d.children)
            faultyVM.push(d);
        return 'rgba(255,0,91,0.7)';
    }
    return '#e57373';
}

function strokeColor(d) {
    if (d.status == 'ok')
        return '#7F9CA0';
    else if (d.status == 'error')
        return '#EB0A44';
    return '#e57373';
}



// Toggle children on click.
function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
    tip.hide;
    d3.select('td.cellName').text(d.name);
    d3.select('td.cellStatus').text(d.status);
    d3.select('td.vmState').text(d.data.vm_state);
    d3.select('td.taskState').text(d.data.task_state);
    d3.select('td.userID').text(d.data.user_id);
    d3.select('td.uuID').text(d.data.uuid);
    d3.select('td.availablityZone').text(d.data.cell_name);
    d3.select('td.cellName').text(d.data.cell_name);
    d3.select('td.accessIPv4').text(d.data.access_ip_v4);
    d3.select('td.host').text(d.data.host);
    d3.select('td.memory').text(d.data.memory_mb);
    d3.select('td.vcpus').text(d.data.vcpus);
    d3.select('td.imageRef').text(d.data.image_ref);
    d3.select('td.powerState').text(d.data.power_state);
    d3.select('td.displayName').text(d.data.display_name);
    d3.select('td.projectID').text(d.data.project_id);
    d3.select('td.accessIPv6').text(d.data.access_ip_v6);
    update();
}

// Returns a list of all nodes under the root.
function flatten(root) {
    var nodes = [],
        i = 0;

    function recurse(node) {
        if (node.children) {
            node.size = node.children.reduce(function(p, v) {
                return p + recurse(v);
            }, 0);
	}
	else if (!node._children)
            node.size = node.data.vcpus + node.data.memory_mb;
        if (!node.id)
	    node.id = ++i;
        nodes.push(node);
        return node.size;
    }

    root.size = recurse(root);
    return nodes;
}

d3.select('div.zoomTransition')
  .on('click',
function fun()
             {
                    var vm1 = faultyVM[0],
                        vm2 = faultyVM[1];
                    
                    p0 = [vm1.x, vm1.y, 200];
                    p1 = [vm2.x, vm2.y, 200];
                    var svg = d3.select('svg > g')
                                .call(transition,p0,p1);
                                
                    function transition(svg,start,end)
                    {
                        var center = [w/2, h/2],
                            i = d3.interpolateZoom(start, end);
                            
                        svg.attr("transform", transform(start))
                           .transition()
                           .delay(250)
                           .duration(i.duration * 2)
                           .attrTween("transform", function() { return function(t) { return transform(i(t)); }; })
                           .each("end", function() { d3.select(this).call(transition, end, start); });
                        
                        function transform(p)
                        {
                            var k = h / p[2];
                            return "translate(" + (center[0] - p[0] * k) + "," + (center[1] - p[1] * k) + ")scale(" + k + ")";
                        }
                    }
                              
                    
             });