/** Functions to set up the simulation, draw circles,axes, scales etc **/

/** 
	Set up the SVG box and the borders for the simulation. 
**/
function setup_svg(){
	svg = d3.select("svg");

	//Define a buffer to have around the borders of the svg element 
    border = {
		top: 20, 
		bottom: 60,
		left: 50, 
		right: 20
	}

    width = +svg.attr("width") - border.left - border.right;
    height = +svg.attr("height")- border.bottom - border.top;

    svg = svg.append("g")
	.attr("transform",   "translate(" + border.left + "," + border.top + ")");
}

/** 
	Creates slot machines
	Creates scales
	Draws axes and labels 
	Draws circles 
**/
function setup_simulation(){

    //if reset button has been pressed, we don't need to set up the axes and slot machines 
    // Create the slot machines, set up their properties 
    slot_machines = create_slot_machines(n);  

    // Set the x and y scales 
    setup_scales();

    // Use the x and y scales to draw axes and axes labels
    //must be called after create_slot_machines otherwise x-axis labels won't draw correctly 
    setup_axes();
  
	//Set the initial position of the circles
	//must be called after setup_scales otherwise the scales won't be defined 	
	setup_circle_position(); 

	//Draws the circles on the page 
	draw_circles()
}

/** 
	Initialises the x and y scales
**/
function setup_scales(){
	 // the domain is hardcoded for now
	 yScale = d3.scaleLinear()
		.domain([4,-4])
		.range([0,height]);
		
	//Use a point scale rather than a band scale because of the circles
	xScale = d3.scalePoint()
		.domain(slot_machines.map((d) => d.name))
		.range([0, width])
		.padding(0.5);	
}

/** 
	Draws the axes and the axis labels
**/
function setup_axes(){
	// set up the y axis 
	yAxis = d3.axisLeft(yScale);

	// add the y axis 
	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis);  
	
	//add label for y axis 
	svg.append("text")
        .attr("class", "y axis")
		.attr("transform", "rotate(-90)")
		.attr("x", 0 - height /2)
		.attr("y", 0 - border.left + 10)	
		.attr("dy", "1em")
		.style("text-anchor", "middle")   
		.text("Average Reward");
		
	
	//set up x axis 
    //add labels to ticks only if we have less than 30 slot machines 
    if(n > 30){
        xAxis = d3.axisBottom(xScale)
            .tickFormat("");
    } else {
        xAxis = d3.axisBottom(xScale);
    }
    
	//add x axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

	//add x axis title 
    svg.append("text")
        .attr("class", "x axis")
        .attr("y", height + (border.bottom - 20))
        .attr("x", width /2)
        .style("text-anchor", "middle")
        .text("Slot Machine");
}


/** 
	Sets the initial x/y position of the circles. 
	Sets the initial cx and the cy properties of the slot machines. 
	Relies on setup_scales() being called beforehand to define xScale and yScale. 
**/	
function setup_circle_position(){
	for(var i = 0; i < slot_machines.length; i++) {
		slot_machines[i].cx = xScale(slot_machines[i].name)
		slot_machines[i].cy = yScale(0)
	};	
} 


/** 
	Updates the axes to reflect a new amount of slot machines 
**/
function reset_axes(){
		yAxis = d3.axisLeft(yScale);
		
              //add labels to ticks only if we have less than 30 slot machines 
        if(n > 30){
            xAxis = d3.axisBottom(xScale)
                .tickFormat("");
        } else {
            xAxis = d3.axisBottom(xScale);
        }
        
		svg.selectAll("g.y.axis")
            .attr("class", "y axis")
			.call(yAxis);

		svg.selectAll("g.x.axis")
            .attr("class", "x axis")
			.call(xAxis);
}	

   
/** 
    Binds new slot_machines data to the average reward circles 
    Removes redundant circles 
    Adds new circles 
    Sets all circles to the origin 
**/
function reset_circles(){
  //   debugger;
    circles = svg.selectAll("circle.average_reward")
        .data(slot_machines);

    //drop old circles 
    circles.exit().remove(); 
    
    //change existing circles 
    svg.selectAll("circle.average_reward")
        .attr("cx", (d) => d.cx)
        .attr("cy", (d) => d.cy)
        .attr("r", radius);
        
    //add new ones 
    circles.enter()
        .append("circle")
            .attr("class","average_reward")
            .attr("cx", (d) => d.cx)
            .attr("cy", (d) => d.cy)
            .attr("r", radius);
            
    circles = svg.selectAll("circle.average_reward");
}    
    


/** 
	Draws circles for the average reward for slot machines
**/
function draw_circles(){
	// Initalise the circles
	circles = svg.selectAll("circle.average_reward")
		.data(slot_machines)
		.enter()
		.append("circle")
            .attr("class", "average_reward")
			.attr("cx", (d) => d.cx)
			.attr("cy", (d) => d.cy)
			.attr("r", radius);
}    

  
