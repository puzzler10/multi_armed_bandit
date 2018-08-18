/** Functions from clicking radio buttons and buttons **/

  
/** 
    Called when the Start button is pressed 
    
    Pulls values of t and n from sliders 
    If reset button has not been pressed before, sets up the simulation and runs it 
    Else simply runs the simulation 
**/
function start(){
    
    //pull value from sliders
    n = +document.getElementById("n_slot_machines").value;
    t = +document.getElementById("t").value;
    //Case 1: reset button hasn't been pressed
    //Case 2: reset button has been pressed 
    //set reset flag to false to enable the simulation to run and the reset button to work
    
    if(resetFlag === true){
        resetFlag = false; 
        run_simulation();
    } else { 
        //first time 
        setup_simulation();
        run_simulation();
    }
}



/** 
    Called when the Reset button is pressed 
    
    Pulls values of t and n from sliders 
    Sets score to 0
    Resets the slot machines, scales, axes and circle positions 
    Shows ghosts if the "Yes" radio box is ticked for true means 
**/
function reset(){

    //pull value from sliders
    n = +document.getElementById("n_slot_machines").value;
    t = +document.getElementById("t").value;
    
    //reset the score 
	score = 0;
    avg_score = 0; 
    document.getElementById("score_display").innerHTML = 0; 
    
    
    //setting to true kills the simulation if it's running 
	resetFlag = true; 
	
	//reset slot machines 
	slot_machines = create_slot_machines(n);
    
	//reset the scales 
	setup_scales();
    
	//reset axes 
	//probably don't have to reset x axis but i'll do it anyway 
	reset_axes();
    
    //bring all circles back to 0, change the amount if n has changed 
	setup_circle_position(); 
	reset_circles(); 
    
    //if true means radiobox checked, call it 
    if(document.getElementById("ghosts_yes").checked === true){ 
        show_ghosts();
    } 
}

  
 /** 
	Display the true means of each circle
    Triggered by the Yes radio button for true means
**/
function show_ghosts(){
    ghostFlag = true;
    ghost_circles =  svg.selectAll("circle.true_mean")
        .data(slot_machines);
        
    //drop old circles
    ghost_circles
        .exit()
        .remove(); 
    
    //change existing circles 
    svg.selectAll("circle.true_mean")
        .attr("class", "true_mean")
        .attr("r", radius)
        .attr("cx", (d)=> d.cx)
        .attr("cy", (d)=> yScale(d.true_mean))
        .style("fill", "#F66A00");
  
    //add new circles 
    ghost_circles
        .enter()
        .append("circle")
            .attr("class", "true_mean")
            .attr("r", radius)
            .attr("cx", (d)=> d.cx)
            .attr("cy", (d)=> yScale(d.true_mean))
            .style("fill", "#F66A00");
}

/** 
	Hide the true means of each circle
    Triggered when No radio button for true means is checked
**/
function hide_ghosts(){
    ghostFlag = false;
    ghost_circles  = svg.selectAll("circle.true_mean")
        .remove();
}


/** 
	Slider Functions:
	A collection of functions that update variables when the sliders are moved   
**/

//Speed of simulation - time between ticks 
function set_time_between_ticks(){
	//pull the slider value
	interval = +document.getElementById("speed").value;
	//update the label with display 
	document.getElementById('speed_display').innerHTML = interval;
} 


// Number of slot machines
function set_n_slot_machines(){
    // problems with changing n mid run 
	 // n = +document.getElementById("n_slot_machines").value;
	//update HTML display 
    n_temp = +document.getElementById("n_slot_machines").value;
	document.getElementById('n_slot_machine_display').innerHTML = n_temp;
}


// Epsilon
function set_epsilon(){
	epsilon = +document.getElementById("epsilon").value;
	//update HTML display 
	document.getElementById('epsilon_display').innerHTML = epsilon;
}


// Number of ticks t 
function set_t(){
	t_temp = +document.getElementById("t").value;
	//update HTML display 
	document.getElementById('t_display').innerHTML = t_temp;
}

