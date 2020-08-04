import Component from "../base/Component.js"
import Agent from "../../lib/crowds/agent.js"
import KdTree from "../../lib/crowds/kdtree.js"
import { Vector2, Line, Obstacle, KeyValuePair, RVOMath } from "../../lib/crowds/common.js"
import Simulator from "../../lib/crowds/simulator.js"




class RVOSimulator extends Component {

    constructor() {
        super();
        this.simulator = Simulator.instance = new Simulator();
        this.simulator.setTimeStep(10);
        this.setup = false;

    }

    update() {
        if (this.setup) {
            //this.simulator.run();
        }
        else {
            this.setup = true;
            var velocity = new Vector2(1, 1);
            var radius = 10
            this.simulator.setAgentDefaults(
                400, // neighbor distance (min = radius * radius)
                30, // max neighbors
                600, // time horizon
                600, // time horizon obstacles
                radius, // agent radius
                10.0, // max speed
                velocity // default velocity
            );
            var NUM_AGENTS = 10;
            for (var i = 0; i < NUM_AGENTS; i++) {
                var angle = i * (2 * Math.PI) / NUM_AGENTS;
                var x = Math.cos(angle) * 200;
                var y = Math.sin(angle) * 200;
                this.simulator.addAgent(new Vector2(x, y));
                
            }

            // Create goals
			var goals = [];
			for (var i = 0; i < this.simulator.getNumAgents (); ++i) {
				goals.push(this.simulator.getAgentPosition(i).scale(-1));
			}
			this.simulator.addGoals(goals);
			
			// Add (polygonal) obstacle(s), specifying vertices in counterclockwise order.
			var vertices = [];

			this.simulator.addObstacle (vertices);
			
			// Process obstacles so that they are accounted for in the simulation.
            this.simulator.processObstacles();
            
            for (var i = 0; i < NUM_AGENTS; i++) {
                this.simulator.setAgentPrefVelocity(i, RVOMath.normalize (this.simulator.getGoal(i).minus(this.simulator.getAgentPosition(i))));
                
            }
        }

    }
}

export default RVOSimulator;