/** Functions related to creation of slot machines and simulating **/ 

/**
 Make an array of objects that represent slot machines. Each object has: 
 - a name
 - true mean
 - a function to allow drawing (normal dist with mean true mean and sd 1 ) 
 - number of times chosen 
 - total reward 
 - average reward 
**/  
function create_slot_machines(n_slot_machines) {
	slot_machines = Array(n_slot_machines);
	standard = gaussian(0,1);
	
    //create true means - normally distributed around 0,1 
	//instalise the number of times each slot machine is chosen as 0 at the start
	//the total reward is 0 and the average reward is 0 
	for(var i = 0; i < n_slot_machines; i++){
		slot_machines[i] = {};
		slot_machines[i].name = "#" + (i+1);
		slot_machines[i].true_mean = standard();
		slot_machines[i].pull_lever = gaussian(slot_machines[i].true_mean, 1);
		slot_machines[i].n_chosen = 0;
		slot_machines[i].total_reward = 0;
		slot_machines[i].average_reward = 0;	
	}
	return(slot_machines);
}




/**
	Returns an integer denoting which slot machine to pick by the epsilon-greedy method. 
	Inputs:
		- epsilon: the chance of choosing randomly
		- n: the number of slot machines:  
		- average_rewards: the average reward of each slot machine
**/
function choose_slot_machine(epsilon, n, average_rewards){
	//simulate a random number - if this number is below epsilon choose randomly 
	//else choose whichever slot machine has the highest probability 
	x = Math.random() 
	if(x <= epsilon){
		//choose randomly 
		return Math.floor(Math.random()* n); 
	}  else {
		//greedy choice 
		 original = average_rewards;
		 max_reward = average_rewards.slice(0).sort( (x,y) => y-x)[0]
		 index = original.indexOf(max_reward)
		return index;
	}	
}


/** 
	Runs the simulation. 
	Performs one iteration of the simulation every "interval" seconds. 
	Checks to see if the reset button is triggered at any point
		If it is, stop the simulation
**/
function run_simulation(){
	// used for loop termination 
	var count = 0; 
    
	//run the function every interval miliseconds 
	var interval_fn = setInterval(function () {
		count = count + 1;
        
        //Stop after we have reached t iterations
		//Also stop after the reset button is clicked
		if (count > t | resetFlag === true) {
			count = 0; 
			clearInterval(interval_fn);
            return; 
		}
        
		//extract the average rewards from the slot machines
		var average_rewards = slot_machines.map((d) => d.average_reward)

		//choose slot machine
		var choice = choose_slot_machine(epsilon, n, average_rewards)

		//generate reward
		var reward = slot_machines[choice].pull_lever()

		//update slot machine parameters
		slot_machines[choice].n_chosen += 1;
		slot_machines[choice].total_reward += reward;
		slot_machines[choice].average_reward = slot_machines[choice].total_reward / slot_machines[choice].n_chosen;

		//update circle location
		slot_machines[choice].cy = yScale(slot_machines[choice].average_reward)

		//update circle position on the canvas
		circles.attr("cx", (d) => d.cx)
		circles.attr("cy", (d) => d.cy)

		//update circle size to an area proportional to number chosen plus some constant (so you can see the small circles )
		circles.attr("r", (d) =>  radius + Math.sqrt(d.n_chosen / Math.PI))
	
		//update score
		score += reward;
		avg_score = score / count
		document.getElementById("score_display").innerHTML = avg_score;
	}, interval)
}


