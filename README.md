### The problem ###

This is a simulation of the [multi-armed bandit](https://en.wikipedia.org/wiki/Multi-armed_bandit) problem. Given a number of options to choose between, this multi-armed bandit problem describes how to choose the best option when you don't know much about any of them. 

You are faced repeatedly with *n* choices, of which you must choose one. After your choice, you are again faced with *n* choices of which you must choose one, and so on. 

After each choice, you receive a numerical reward chosen from a normally-distributed probability distribution that corresponds to your choice. You don't know what the probability distribution is for that choice before choosing it, but after you have picked it a few times you will start to get an idea of its underlying probability distribution.  

The aim is to maximise your total reward over a given number of selections. 

One analogy for this problem is this: you are placed in a room with a number of slot machines, and each slot machine when played will spit out a reward sampled from its probability distribution. Your aim is to maximise your total reward.

### The simulation ###

In keeping with the slot machine analogy, each "choice" in this simulation is labelled as a slot machine, and your knowledge about each slot machine is represented by a circle. The vertical position of the circle is the average reward you have received from the slot machine. The size of the circle is representative of how many times you have chosen that particular slot machine. 

Inherent to this problem is a trade-off between exploration and reward maximisation. You would like to sample from each slot machine a few times so you can find the best one, but at the same time you would also like to maximise your total reward. Spend too much time on exploration and you choose the non-optimal slot machines too many times. Spend too much time on reward maximisation and you might not find the best slot machine. 

One way to solve this problem is to choose from the slot machine you think is best a set percentage of the time (defaults at 0.9), which is called a *greedy* selection. The rest of the time you randomly select from the other slot machines. The chance of not making a greedy selection is referred to by the Greek letter ε (epsilon), and the method of optimising the multi-armed bandit problem like this is called the *ε-greedy* method.      

You have the option to control the number of slot machines *n* by a slider, where the default is 10. You can also control the chance of choosing randomly *ε* by a slider, and you can change this while the simulation is running. There's a slider for *t*, the number of "choice selections" the simulation runs for, and which defaults at 2000.  There is also a slider for controlling the speed of the simulation, although this cannot be changed while the simulation is running. 

You also have the option to display the true mean of the probability distribution that corresponds to each slot machine. This will not affect the simulation and is purely for your own interest. 
