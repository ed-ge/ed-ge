/**
 * Parent interface for scenes and game objects.
 * 
 * The Scene class and the GameObject class both descend from this class.
 */

class NameableParent {

    /**
     * An array of children this instance has
     */
    //children = [];

    /**
     * The name of this instance
     */
    //name = "";

    /**
     * 
     * @param {String} Name of this instance
     */
    constructor(name) {
        this.children = [];
        this.name = name;
        this.parent = null;
        this.uuid = this.uuidv4();
    }

    /**
     * Remove a game object from the scene tree.
     * 
     * This is done recursively since the game object would be the descendant of
     * any depth in the scene tree.
     * 
     * @param {GameObject} gameObject Remove this game object from the Scene tree
     */

    destroy(gameObject) {
        let found = false;
        for (let i = 0; i < this.children.length && !found; i++) {
            let child = this.children[i];
            if (child == gameObject) {
                found = true;
                if (child.onDestroy) {
                    child.onDestroy();
                }
            }
        }
        if (found) {
            this.children = this.children.filter(i => i != gameObject);
            return true;
        } else {
            //Loop again and destroy recursively
            for (let i = 0; i < this.children.length && !found; i++) {
                let child = this.children[i];
                let result = child.destroy(gameObject);
                if (result) return true;
            }
            //If we get here we didn't find anything
            return false;
        }


    }

    findByName(name){
        if(this.name == name)
            return this;
        for(let child of this.children){
            let result = child.findByName(name);
            if(result != null) return result;        
        }
        //We didn't find anything
        return null;
    }

    /** Find a NameableParent by UUID */
    findByUUID(uuid){
      if(this.uuid == uuid)
            return this;
        for(let child of this.children){
            let result = child.findByUUID(uuid);
            if(result != null) return result;        
        }
        //We didn't find anything
        return null;
    }

    /**Generate a uuid
     * From https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
     */
    uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    
}

/**
 * 2D Point class
 */

class Point {
    /**
     * 
     * @param {Number} x The x location of the point
     * @param {Number} y The y location of the point
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * Calculate the Euclidian distance between this point and another point.
     * 
     * @param {Point} otherPoint The point to which we are calculating a distance
     */
    distance(otherPoint = new Point(0, 0)) {

        return Math.sqrt(this.distanceSquared(otherPoint));
    }

    /**
     * Since finding the Euclidean distance requires an expensive square root
     * calculation, we have the option of calculating the squared distance to go
     * quicker.
     * 
     * @param {Point} otherPoint The point to which we are calculating the
     * squared distance
     */
    distanceSquared(otherPoint = new Point(0, 0)) {
        let xDiff = (this.x - otherPoint.x);
        let yDiff = (this.y - otherPoint.y);
        return xDiff * xDiff + yDiff * yDiff;
    }

    /**
     * Find the pairwise difference to another point.
     * 
     * @param {Point} otherPoint The point from which we are doing a pairwise
     * difference. 
     */
    diff(otherPoint) {
        return new Point(this.x - otherPoint.x, this.y - otherPoint.y);
    }

    /** Duplicate the point */
    clone(){
      return new Point(this.x, this.y);
    }
}

/**
 * Components are attached to game objects.
 * 
 * Examples of components are behaviors, renderers, and colliders.
 * Components cannot have children.
 * 
 * In the declarative syntax of scenes and game objects, components are defined
 * as follows:
 * ```
 * {
 *  type:"<type name of component>",
 *    values:[
 *       {
 *          key:"<name of component member variable>",
 *          value:"<the desired value>"
 *        }
 *    ]
 * }
 * ```
 */

class Component {

    /**
     * Reference to the parent game object.
     * 
     * In order to connect this game object member variable to the parent game
     * object, compoments must be added to game objects using the addComponent()
     * method. If instead you simple say gameObect.components.push(component),
     * you will invariably run into bugs.
     */
    constructor() {
        this.uuid = this.uuidv4();
        this.type = this.constructor.name;
        this.gameObject;
    }

    /**Generate a uuid
     * From https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
     */
    uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }


}

/**
 * A game object represents a "thing" in a game.
 * a gameOject instance can be a character, part of the background
 * or an invisible container for logic
 */
class GameObject extends NameableParent {
    /**
     * The x position of the game object relative to its parent
     */
    //x;

    /**
     * The y position of the game object relative to its parent
     */
    //y;

    /**
     * The scale of the game object in x relative to its parent
     */
    //scaleX;

    /**
     * The scale of the game object in y relative to its parent
     */
    //scaleY;

    /**
     * The rotation of the game object relative to its parent
     */
    //rotation;

    /**
     * Array of components this game object has. Note, components should only be
     * added to this array used GameObject.addComponent() to components.push().
     * Otherwise the components won't have their parent game object member
     * variable method populated.
     */
    //components = [];


    /**
     * Returns the location of the game object as a Point object rather than two
     * variables x and y.
     * 
     */
    get location() {
        return new Point(this.x, this.y);
    }

    /**
     * Returns the world space location of the game object.
     * This takes into account the transforms of the chain of parents
     */
    get worldLocation(){
        if(!this.parent)
            return this.location;
        let parentTransform = parent.getTransform();

    }

    getTransform(){
        return 1;
    }

    /**
     * 
     * @param {Number} x The x position of the game object relative to its parent. Defaults to 0
     * @param {Number} y The y positon of the game object relative to its
     * parent. Defaults to 0
     * @param {Number} scaleX The scale of the objet in x relative to its
     * parent. Defaults to 1.
     * @param {Number} scaleY The scale of the object in y relative to its
     * parent. Scales to 1.
     * @param {Number} rotation The scale of the object relative to its parent.
     */
    constructor(x = 0, y = 0, scaleX = 1, scaleY = 1, rotation = 0, prefabName = "") {
        super();
        this.components = [];
        [this.x, this.y, this.scaleX, this.scaleY, this.rotation, this.prefabName] = [x, y, scaleX, scaleY, rotation, prefabName];
    }
    /**
     * 
     * @param {Component} component The component to be added to this game
     * object's list of components
     * 
     * Call this method instead of GameObject.components.push() to add
     * components so that components will have their gameObject parent member
     * variable populated.
     */
    addComponent(component) {
        this.components.push(component);
        component.gameObject = this;
    }

    /**
     * 
     * Render this game object to a canvas by calling the draw method on all its
     * components and then recursively calling draw on its child components.
     * 
     * @param {Canvas_2D_Context} ctx The canvas context  to draw to. This may a
     * literal reference to a canvas on the DOM or a background image for
     * deferred rendering.
     */
    draw(ctx) {
        ctx.save();

        /** We first need to figure out if we are rendering in screen space or world space
         * We know by checking for the presence of a RectTransform.        
        */

        if (this.anyComponent("RectTransform")) {
            //We first need to move relative to the screen bounding box
            let rectTransform = this.getComponent("RectTransform");
            let width = ctx.canvas.width;
            let height = ctx.canvas.height;
            let tx = 0; //Default to anchor left
            let ty = 0; //Default to anchor top

            if(rectTransform.anchorHorizontal == "center")
                tx = width/2;
            else if(rectTransform.anchorHorizontal == "right")
                tx = width;
            if(rectTransform.anchorVertical == "middle")
                ty = height/2;
            else if(rectTransform.anchorVertical == "bottom")
                ty = height;

            ctx.translate(tx, ty);
            
        }

        //Otherwise we are in world space
        ctx.translate(this.x, this.y);
        ctx.scale(this.scaleX, this.scaleY);
        ctx.rotate(this.rotation);


        this.components.filter(i => i.draw).forEach(i => i.draw(ctx));

        //Now draw all the children
        this.children.filter(i => i.draw).forEach(i => i.draw(ctx));

        ctx.restore();
    }
    update() {
        this.components.filter(i => i.update).forEach(i => i.update());

        //Now update all the children
        this.children.forEach(i => i.update());
    }
    getComponent(type) {
        if (typeof (type) === 'string' || type instanceof String) {
            //The user passed us a string, not a type
            //https://stackoverflow.com/a/7772724/10047920
            let component = this.components.find(i => i.constructor.name === type);
            if (component) return component;
            throw "Error, couldn't find type " + type;
        } else {
          let component;
          try{
             component = this.components.find(i => i instanceof type);
          }catch (e){
            console.log(e);
          }
            if (component) return component;
            throw "Error, couldn't find type " + type;
        }
    }
    /**
     * Returns true if there is at least one component of the given
     * type attached to this GameObject.
     * 
     * @param {The type of the componet to search for. May be a string or object type} type 
     */
    anyComponent(type) {
        if (typeof (type) === 'string' || type instanceof String) {
            //The user passed us a string, not a type
            //https://stackoverflow.com/a/7772724/10047920
            let component = this.components.find(i => i.constructor.name === type);
            if (component) return true;
            return false;
        } else {
            let component = this.components.find(i => i instanceof type);
            if (component) return true;
            return false;
        }
    }
    
    recursiveCall(functionName) {
        for (let i = 0; i < this.components.length; i++) {
            let component = this.components[i];
            if (component[functionName]) {
                component[functionName]();
            }
        }
        //Now call the function on the children
        for (let i = 0; i < this.children.length; i++) {
            let child = this.children[i];
            child.recursiveCall(functionName);
        }
    }
}

class Collider extends Component {
    constructor() {
        super();
    }



}

class PointCollider extends Collider {
    constructor() {
        super();
    }

}

/**
 * Static holder for the state of the input
 */

const Input = {

  //---------------------------------------------------
  //Key handling members
  //---------------------------------------------------
  keys: [], //What is the current state of each key?

  down: [], //Did the key go down this frame?
  up: [], //Did the key do up this frame?

  //When we start an update(), we shift to these arrays so we don't have mutating arrays mid-update
  frameDown: [],
  frameUp: [],


  //---------------------------------------------------
  //Mouse handling members
  //---------------------------------------------------


  mouseButtons: [], //What is the current State of the each button?

  mouseButtonsDown: [], //Did the mouse button go down this frame?
  mouseButtonsUp: [], //Did the mouse button go up this frame?

  //When we start an update(), we shift these arrays so we don't have mutating arrays mid-update
  frameMouseButtonsDown: [],
  frameMouseButtonsUp: [],

  //The location of the mouse in screen coordinates
  mousePosition: new Point(),
  frameMousePosition: new Point(),
  lastFrameMousePosition: new Point(),

  //Handle the wheel state
  mouseScrollDelta: 0,
  frameScrollDelta: 0,


  //-------------------------------------------------
  // Touch handling members
  //-------------------------------------------------

  touches: [],

  touchesStart: [],
  touchesEnd: [],
  touchPositions: [],
  frameTouchesStart: [],
  frameTouchesEnd: [],
  frameTouchPositions: [],
  lastFrameTouchPositions:[],


  swapUpDownArrays() {
    this.frameDown = this.down;
    this.frameUp = this.up;
    this.down = [];
    this.up = [];

    this.lastFrameMousePosition = this.frameMousePosition.clone();
    this.frameMousePosition = this.mousePosition.clone();

    this.frameMouseButtonsDown = this.mouseButtonsDown;
    this.frameMouseButtonsUp = this.mouseButtonsUp;
    this.frameScrollDelta = this.mouseScrollDelta;
    this.mouseScrollDelta = 0;
    this.mouseButtonsDown = [];
    this.mouseButtonsUp = [];


    this.frameTouchesStart = this.touchesStart;
    this.frameTouchesEnd = this.touchesEnd;
    this.lastFrameTouchPositions = this.frameTouchPositions;
    this.frameTouchPositions = this.touches;
    this.touchesStart = [];
    this.touchesEnd = [];
    this.touchPositions = [];

    // if(this.frameTouchesEnd.length != 0){
    //   console.log("Restart")
    //   this.touches = [];
    //   this.lastFrameTouchPositions = [];
    //   this.frameTouchPositions = [];
    // }


  },

  //---------------------------------------------------
  //Key handling functions
  //---------------------------------------------------

  //Did the key come up this frame?
  getKeyUp(key) {
    return this.frameUp[key];
  },

  //Did the key go down the frame? [Remember, the OS may make it look like key repeated when they did not]
  getKeyDown(key) {
    return this.frameDown[key];
  },

  //Is the key pressed? Down (true) Up (false)
  getKey(key) {
    return this.keys[key];
  },

  //---------------------------------------------------
  //Mouse handling functions
  //---------------------------------------------------


  //Did the mouse button come up this frame?
  getMouseButtonUp(button) {
    return this.frameMouseButtonsUp[button];
  },

  //Did the mouse button go down this frame?
  getMouseButtonDown(button) {
    return this.frameMouseButtonsDown[button];
  },

  //Is the mouse button pressed? Down (true) Up (false)
  getMouseButton(button) {
    return this.mouseButtons[button];
  },

  //What is the current state of the scroll wheel?
  getMouseScrollWheel() {
    return this.frameScrollDelta;
  },

  //What is the mouse position?
  //We return the previous frame's position for consistency
  getMousePosition() {
    return this.frameMousePosition;
  },
  getMousePositionDelta() {
    return new Point(this.frameMousePosition.x - this.lastFrameMousePosition.x, this.frameMousePosition.y - this.lastFrameMousePosition.y);
  },

  //Touch API----------------------------------
  //
  getTouchesStartFull() {
    return this.frameTouchesStart;
  },
  getTouchesStart() {
    return this.frameTouchesStart.map(i => { return { x: i.clientX, y: i.clientY } });
  },
  getTouchesEndFull() {
    return this.frameTouchesEnd;
  },
  getTouchesEnd() {
    if(this.frameTouchesEnd.length == 0) return [];
    return this.frameTouchesEnd.map(i => { return { x: i.clientX, y: i.clientY } });
  },
  getTouchesFull() {
    return this.touches;
  },
  getTouches() {
    //If we have ending touches, merge those in here
    let toReturn = this.touches.map(i => { return { x: i.clientX, y: i.clientY } });
    toReturn.push(...this.frameTouchesEnd.map(i=>{return {x:i.clientX,y:i.clientY}}));
    return toReturn;
  },  
  // getTouchPositions() {
  //   return this.frameTouchPositions.map(i => { return { x: i.clientX, y: i.clientY } });
  // },
  getTouchMove(){    
    if(this.frameTouchPositions.length == 0 || this.lastFrameTouchPositions.length == 0) return [{x:0,y:0}];
    let frames = this.frameTouchPositions.map(i => { return { x: i.clientX, y: i.clientY } });
    let currents = this.lastFrameTouchPositions.map(i => { return { x: i.clientX, y: i.clientY } });
    let toReturn = [];
    for(let i=0; i < Math.min(frames.length, currents.length); i++){
      let frame = frames[i];
      let current = currents[i];
      toReturn.push(new Point(frame.x - current.x, frame.y - current.y));
    }
    return toReturn;
  }




};

function Vector2(x, y) {
    this.x = x;
    this.y = y;

    this.plus = function(vector) {
    	return new Vector2(x + vector.x, y + vector.y);
    };
    
    this.minus = function(vector) {
    	return new Vector2(x - vector.x, y - vector.y);
    };
    
    this.multiply = function(vector) {
    	return x * vector.x + y * vector.y;
    };
    
    this.scale = function(k) {
        return new Vector2(x*k, y*k);
    };
}

function Line() {
	/*
	this.point; // Vector2
	this.direction; // Vector2
	*/
}

function Obstacle() {
	/*
	this.point; // Vector2
	this.unitDir; // Vector2;
	this.isConvex; // boolean
	this.id; // int
	this.prevObstacle; // Obstacle
	this.nextObstacle; // Obstacle
	*/
}

function KeyValuePair(key, value) {
	this.key = key;
	this.value = value;
}

let RVOMath = {};

RVOMath.RVO_EPSILON = 0.01;

RVOMath.absSq = function(v) {
    return v.multiply(v);
};

RVOMath.normalize = function(v) {
	return v.scale(1 / RVOMath.abs(v)); // v / abs(v)
};

RVOMath.distSqPointLineSegment = function(a, b, c) {
	var aux1 = c.minus(a);
	var aux2 = b.minus(a);
	
	// r = ((c - a) * (b - a)) / absSq(b - a);
	var r = aux1.multiply(aux2) / RVOMath.absSq(aux2);
	
	if (r < 0) {
		return RVOMath.absSq(aux1); // absSq(c - a)
	} else if (r > 1) {
		return RVOMath.absSq(aux2); // absSq(c - b)
	} else {
		return RVOMath.absSq( c.minus(a.plus(aux2.scale(r))) ); // absSq(c - (a + r * (b - a)));
	}
};

RVOMath.sqr = function(p) {
	return p * p;
};

RVOMath.det = function(v1, v2) {
	return v1.x * v2.y - v1.y* v2.x;
};

RVOMath.abs = function(v) {
	return Math.sqrt(RVOMath.absSq(v));
};

RVOMath.leftOf = function(a, b, c) {
	return RVOMath.det(a.minus(c), b.minus(a));
};

///From https://github.com/palmerabollo/rvo2-js/tree/master/lib


function KdTree() {
	var MAXLEAF_SIZE = 100;
	
	function FloatPair(a, b) {
		this.a = a;
		this.b = b;
		
		this.mt = function(rhs) {
			return this.a < rhs.a || !(rhs.a < this.a) && this.b < rhs.b;
		};
		
		this.met = function(rhs) {
			return (this.a == rhs.a && this.b == rhs.b) || this.mt(rhs); 
		};
		
		this.gt = function(rhs) {
			return !this.met(rhs);
		};
		
		this.get = function(rhs) {
			return !this.mt(rhs);
		};
	}
	
	function AgentTreeNode() {
		/**
        int begin;
        int end;
        int left;
        float maxX;
        float maxY;
        float minX;
        float minY;
        int right;
        */
	}
	
	function ObstacleTreeNode() {
		/**
		ObstacleTreeNode left;
        Obstacle obstacle;
        ObstacleTreeNode right;
		*/
	}
	
	var agents = []; // Agent[]
	var agentTree = []; // AgentTreeNode[]
	var obstacleTree = {}; // ObstacleTreeNode
	
	this.buildAgentTree = function(simulator) {
		if (agents.length != simulator.getNumAgents()) {
			agents = simulator.agents;
			
			for (var i=0; i<2*agents.length; i++) {
				agentTree.push(new AgentTreeNode());
			}
		}
		
		if (agents.length > 0) {
			buildAgentTreeRecursive(0, agents.length, 0);
		}
	};
	
	var buildAgentTreeRecursive = function(begin, end, node) {
		agentTree[node].begin = begin;
		agentTree[node].end = end;
		agentTree[node].minX = agentTree[node].maxX = agents[begin].position.x;
		agentTree[node].minY = agentTree[node].maxY = agents[begin].position.y;
		
		for (var i = begin+1; i<end; ++i) {
			agentTree[node].maxX = Math.max(agentTree[node].maxX, agents[i].position.x);
			agentTree[node].minX = Math.max(agentTree[node].minX, agents[i].position.x);
			agentTree[node].maxY = Math.max(agentTree[node].maxX, agents[i].position.y);
			agentTree[node].minY = Math.max(agentTree[node].minY, agents[i].position.y);
		}
		
		if (end - begin > MAXLEAF_SIZE) {
			// no leaf node
			var isVertical = agentTree[node].maxX - agentTree[node].minX > agentTree[node].maxY - agentTree[node].minY;
			var splitValue = isVertical ? 0.5 * (agentTree[node].maxX + agentTree[node].minX) : 0.5 * (agentTree[node].maxY + agentTree[node].minY);
			
			var left = begin;
			var right = end;
			
			while (left < right) {
				while (left < right && (isVertical ? agents[left].position.x : agents[left].position.y) < splitValue)
                {
                    ++left;
                }

                while (right > left && (isVertical ? agents[right - 1].position.x : agents[right - 1].position.y) >= splitValue)
                {
                    --right;
                }

                if (left < right)
                {
                    var tmp = agents[left];
                    agents[left] = agents[right - 1];
                    agents[right - 1] = tmp;
                    ++left;
                    --right;
                }
			}
			
			var leftSize = left - begin;
			if (leftSize == 0) {
				++leftSize;
				++left;
				++right;
			}
			
			agentTree[node].left = node + 1;
            agentTree[node].right = node + 1 + (2 * leftSize - 1);

            buildAgentTreeRecursive(begin, left, agentTree[node].left);
            buildAgentTreeRecursive(left, end, agentTree[node].right);
		}
	};
	
	this.buildObstacleTree = function(simulator) {
		var obstacles = simulator.obstacles;
		obstacleTree = buildObstacleTreeRecursive(obstacles);
	};
	
	var buildObstacleTreeRecursive = function(obstacles, simulator) {
		if (obstacles.length == 0) {
			return null;
		} else {
			var node = new ObstacleTreeNode();
			var optimalSplit = 0;
            let minLeft = obstacles.length;
            let minRight = obstacles.length;
			
			for (var i=0; i<obstacles.length; ++i) {
				let leftSize = 0;
				let rightSize = 0;
				
				let obstacleI1 = obstacles[i];
				let obstacleI2 = obstacleI1.nextObstacle;
				
				for (var j=0; j<obstacles.length; j++) {
					if (i == j) {
						continue;
					}
					
					let obstacleJ1 = obstacles[j];
					let obstacleJ2 = obstacleJ1.nextObstacle;
					
					let j1LeftOfI = RVOMath.leftOf(obstacleI1.point, obstacleI2.point, obstacleJ1.point);
                    let j2LeftOfI = RVOMath.leftOf(obstacleI1.point, obstacleI2.point, obstacleJ2.point);
					
                    if (j1LeftOfI >= -RVOMath.RVO_EPSILON && j2LeftOfI >= -RVOMath.RVO_EPSILON)
                    {
                        ++leftSize;
                    }
                    else if (j1LeftOfI <= RVOMath.RVO_EPSILON && j2LeftOfI <= RVOMath.RVO_EPSILON)
                    {
                        ++rightSize;
                    }
                    else
                    {
                        ++leftSize;
                        ++rightSize;
                    }
                    
                    var fp1 = new FloatPair(Math.max(leftSize, rightSize), Math.min(leftSize, rightSize));
                    var fp2 = new FloatPair(Math.max(minLeft, minRight), Math.min(minLeft, minRight));
                    
                    if (fp1.get(fp2)) {
                    	break;
                    }
				}
				
				var fp1 = new FloatPair(Math.max(leftSize, rightSize), Math.min(leftSize, rightSize));
				var fp2 = new FloatPair(Math.max(minLeft, minRight), Math.min(minLeft, minRight));
				
				if (fp1.mt(fp2)) {
					minLeft = leftSize;
					minRight = rightSize;
					optimalSplit = i;
				}
			}
			
			{
                /* Build split node. */
				let leftObstacles = [];
                for (var n = 0; n < minLeft; ++n) leftObstacles.push(null);
                
                let rightObstacles = [];
                for (var n = 0; n < minRight; ++n) rightObstacles.push(null);

                let leftCounter = 0;
                let rightCounter = 0;
                let i = optimalSplit;

                let obstacleI1 = obstacles[i];
                let obstacleI2 = obstacleI1.nextObstacle;

                for (var j = 0; j < obstacles.length; ++j)
                {
                    if (i == j)
                    {
                        continue;
                    }

                    let obstacleJ1 = obstacles[j];
                    let obstacleJ2 = obstacleJ1.nextObstacle;

                    let j1LeftOfI = RVOMath.leftOf(obstacleI1.point, obstacleI2.point, obstacleJ1.point);
                    let j2LeftOfI = RVOMath.leftOf(obstacleI1.point, obstacleI2.point, obstacleJ2.point);

                    if (j1LeftOfI >= -RVOMath.RVO_EPSILON && j2LeftOfI >= -RVOMath.RVO_EPSILON)
                    {
                        leftObstacles[leftCounter++] = obstacles[j];
                    }
                    else if (j1LeftOfI <= RVOMath.RVO_EPSILON && j2LeftOfI <= RVOMath.RVO_EPSILON)
                    {
                        rightObstacles[rightCounter++] = obstacles[j];
                    }
                    else
                    {
                        /* Split obstacle j. */
                        t = RVOMath.det(obstacleI2.point.minus(obstacleI1.point), obstacleJ1.point.minus(obstacleI1.point)) / 
                        	RVOMath.det(obstacleI2.point.minus(obstacleI1.point), obstacleJ1.point.minus(obstacleJ2.point));

                        var splitpoint = obstacleJ1.point.plus( (obstacleJ2.point.minus(obstacleJ1.point)).scale(t) );

                        var newObstacle = new Obstacle();
                        newObstacle.point = splitpoint;
                        newObstacle.prevObstacle = obstacleJ1;
                        newObstacle.nextObstacle = obstacleJ2;
                        newObstacle.isConvex = true;
                        newObstacle.unitDir = obstacleJ1.unitDir;

                        newObstacle.id = simulator.obstacles.length;

                        simulator.obstacles.push(newObstacle);

                        obstacleJ1.nextObstacle = newObstacle;
                        obstacleJ2.prevObstacle = newObstacle;

                        if (j1LeftOfI > 0.0)
                        {
                            leftObstacles[leftCounter++] = obstacleJ1;
                            rightObstacles[rightCounter++] = newObstacle;
                        }
                        else
                        {
                            rightObstacles[rightCounter++] = obstacleJ1;
                            leftObstacles[leftCounter++] = newObstacle;
                        }
                    }
                }

                node.obstacle = obstacleI1;
                node.left = buildObstacleTreeRecursive(leftObstacles);
                node.right = buildObstacleTreeRecursive(rightObstacles);
                return node;
            }
		}
	};
	
	this.computeAgentNeighbors = function(agent, rangeSq) {
		queryAgentTreeRecursive(agent, rangeSq, 0);
	};
	
	this.computeObstacleNeighbors = function(agent, rangeSq) {
		queryObstacleTreeRecursive(agent, rangeSq, obstacleTree);
	};
	
	var queryAgentTreeRecursive = function(agent, rangeSq, node) {
		if (agentTree[node].end - agentTree[node].begin <= MAXLEAF_SIZE)
        {
            for (var i = agentTree[node].begin; i < agentTree[node].end; ++i)
            {
                agent.insertAgentNeighbor(agents[i], rangeSq);
            }
        }
        else
        {
            distSqLeft = RVOMath.sqr(Math.max(0, agentTree[agentTree[node].left].minX - agent.position.x)) + 
	            RVOMath.sqr(Math.max(0, agent.position.x - agentTree[agentTree[node].left].maxX)) + 
	            RVOMath.sqr(Math.max(0, agentTree[agentTree[node].left].minY - agent.position.y)) + 
	            RVOMath.sqr(Math.max(0, agent.position.y - agentTree[agentTree[node].left].maxY));

            distSqRight = RVOMath.sqr(Math.max(0, agentTree[agentTree[node].right].minX - agent.position.x)) +
	            RVOMath.sqr(Math.max(0, agent.position.x - agentTree[agentTree[node].right].maxX)) +
	            RVOMath.sqr(Math.max(0, agentTree[agentTree[node].right].minY - agent.position.y)) +
	            RVOMath.sqr(Math.max(0, agent.position.y - agentTree[agentTree[node].right].maxY));

            if (distSqLeft < distSqRight)
            {
                if (distSqLeft < rangeSq)
                {
                    queryAgentTreeRecursive(agent, rangeSq, agentTree[node].left);

                    if (distSqRight < rangeSq)
                    {
                        queryAgentTreeRecursive(agent, rangeSq, agentTree[node].right);
                    }
                }
            }
            else
            {
                if (distSqRight < rangeSq)
                {
                    queryAgentTreeRecursive(agent, rangeSq, agentTree[node].right);

                    if (distSqLeft < rangeSq)
                    {
                        queryAgentTreeRecursive(agent, rangeSq, agentTree[node].left);
                    }
                }
            }

        }
	};
	
	// pass ref range
	var queryObstacleTreeRecursive = function(/** Agent */ agent, rangeSq, /** ObstacleTreeNode */ node) {
        if (node == null)
        {
            return;
        }
        else
        {
            let obstacle1 = node.obstacle;
            let obstacle2 = obstacle1.nextObstacle;

            let agentLeftOfLine = RVOMath.leftOf(obstacle1.point, obstacle2.point, agent.position);

            queryObstacleTreeRecursive(agent, rangeSq, (agentLeftOfLine >= 0 ? node.left : node.right));

            let distSqLine = RVOMath.sqr(agentLeftOfLine) / RVOMath.absSq(obstacle2.point.minus(obstacle1.point));

            if (distSqLine < rangeSq)
            {
                if (agentLeftOfLine < 0)
                {
                    /*
                     * Try obstacle at this node only if is on right side of
                     * obstacle (and can see obstacle).
                     */
                    agent.insertObstacleNeighbor(node.obstacle, rangeSq);
                }

                /* Try other side of line. */
                queryObstacleTreeRecursive(agent, rangeSq, (agentLeftOfLine >= 0 ? node.right : node.left));
            }
        }
    };

    this.queryVisibility = function (/** Vector2 */ q1, /** Vector2 */ q2, radius)
    {
        return queryVisibilityRecursive(q1, q2, radius, obstacleTree);
    };

    var queryVisibilityRecursive = function(/** Vector2 */ q1, /** Vector2 */ q2, radius, /** ObstacleTreeNode */ node)
    {
        if (node == null)
        {
            return true;
        }
        else
        {
            var obstacle1 = node.obstacle;
            var obstacle2 = obstacle1.nextObstacle;

            var q1LeftOfI = RVOMath.leftOf(obstacle1.point, obstacle2.point, q1);
            var q2LeftOfI = RVOMath.leftOf(obstacle1.point, obstacle2.point, q2);
            var invLengthI = 1.0 / RVOMath.absSq(obstacle2.point.minus(obstacle1.point));

            if (q1LeftOfI >= 0 && q2LeftOfI >= 0)
            {
                return queryVisibilityRecursive(q1, q2, radius, node.left) && ((RVOMath.sqr(q1LeftOfI) * invLengthI >= RVOMath.sqr(radius) && RVOMath.sqr(q2LeftOfI) * invLengthI >= RVOMath.sqr(radius)) || queryVisibilityRecursive(q1, q2, radius, node.right));
            }
            else if (q1LeftOfI <= 0 && q2LeftOfI <= 0)
            {
                return queryVisibilityRecursive(q1, q2, radius, node.right) && ((RVOMath.sqr(q1LeftOfI) * invLengthI >= RVOMath.sqr(radius) && RVOMath.sqr(q2LeftOfI) * invLengthI >= RVOMath.sqr(radius)) || queryVisibilityRecursive(q1, q2, radius, node.left));
            }
            else if (q1LeftOfI >= 0 && q2LeftOfI <= 0)
            {
                /* One can see through obstacle from left to right. */
                return queryVisibilityRecursive(q1, q2, radius, node.left) && queryVisibilityRecursive(q1, q2, radius, node.right);
            }
            else
            {
                var point1LeftOfQ = RVOMath.leftOf(q1, q2, obstacle1.point);
                var point2LeftOfQ = RVOMath.leftOf(q1, q2, obstacle2.point);
                var invLengthQ = 1.0 / RVOMath.absSq(q2.minus(q1));

                return (point1LeftOfQ * point2LeftOfQ >= 0 && RVOMath.sqr(point1LeftOfQ) * invLengthQ > RVOMath.sqr(radius) && RVOMath.sqr(point2LeftOfQ) * invLengthQ > RVOMath.sqr(radius) && queryVisibilityRecursive(q1, q2, radius, node.left) && queryVisibilityRecursive(q1, q2, radius, node.right));
            }
        }
    };
}

function Agent() {
    this.agentNeighbors = []; //  new List<KeyValuePair<float, Agent>>();
    this.maxNeighbors = 0;
    this.maxSpeed = 0.0;
    this.neighborDist = 0.0;
    this.newVelocity; // Vector 2
    this.obstaclNeighbors = []; // new List<KeyValuePair<float, Obstacle>>();
    this.orcaLines = []; // new List<Line>();
    this.position; // Vector2

    this.prefVelocity; // Vector2

    this.radius = 0.0;
    this.timeHorizon = 0.0;
    this.timeHorizonObst = 0.0;
    this.velocity; // Vector2
    this.id = 0;

    /** My addition */
    this.gameObject = null; //Which gameObject are we simulating?

    this.computeNeighbors = function (simulator) {
        this.obstaclNeighbors = [];
        var rangeSq = RVOMath.sqr(this.timeHorizonObst * this.maxSpeed + this.radius);
        simulator.kdTree.computeObstacleNeighbors(this, rangeSq);

        this.agentNeighbors = [];
        if (this.maxNeighbors > 0) {
            rangeSq = RVOMath.sqr(this.neighborDist);
            simulator.kdTree.computeAgentNeighbors(this, rangeSq);
        }
    };

    /* Search for the best new velocity. */
    this.computeNewVelocity = function (simulator) {
        let orcaLines = [];

        let invTimeHorizonObst = 1.0 / this.timeHorizonObst;

        /* Create obstacle ORCA lines. */
        for (var i = 0; i < this.obstaclNeighbors.length; ++i) {
            let obstacle1 = this.obstaclNeighbors[i].value;
            let obstacle2 = obstacle1.nextObstacle;

            let relativePosition1 = obstacle1.point.minus(this.position);
            let relativePosition2 = obstacle2.point.minus(this.position);

            /* 
             * Check if velocity obstacle of obstacle is already taken care of by
             * previously constructed obstacle ORCA lines.
             */
            let alreadyCovered = false;

            for (var j = 0; j < orcaLines.length; ++j) {
                if (RVOMath.det(relativePosition1.scale(invTimeHorizonObst).minus(orcaLines[j].point), orcaLines[j].direction) - invTimeHorizonObst * this.radius >= -RVOMath.RVOEPSILON && RVOMath.det(relativePosition2.scale(invTimeHorizonObst).minus(orcaLines[j].point), orcaLines[j].direction) - invTimeHorizonObst * this.radius >= -RVOMath.RVOEPSILON) {
                    alreadyCovered = true;
                    break;
                }
            }

            if (alreadyCovered) {
                continue;
            }

            /* Not yet covered. Check for collisions. */

            let distSq1 = RVOMath.absSq(relativePosition1);
            let distSq2 = RVOMath.absSq(relativePosition2);

            let radiusSq = RVOMath.sqr(this.radius);

            let obstacleVector = obstacle2.point.minus(obstacle1.point);
            let s = relativePosition1.scale(-1).multiply(obstacleVector) / RVOMath.absSq(obstacleVector); //  (-relativePosition1 * obstacleVector) / RVOMath.absSq(obstacleVector);
            let distSqLine = RVOMath.absSq(relativePosition1.scale(-1).minus(obstacleVector.scale(s))); // RVOMath.absSq(-relativePosition1 - s * obstacleVector);

            var line = new Line();

            if (s < 0 && distSq1 <= radiusSq) {
                /* Collision with left vertex. Ignore if non-convex. */
                if (obstacle1.isConvex) {
                    line.point = new Vector2(0, 0);
                    line.direction = RVOMath.normalize(new Vector2(-relativePosition1.y, relativePosition1.x));
                    orcaLines.push(line);
                }
                continue;
            }
            else if (s > 1 && distSq2 <= radiusSq) {
                /* Collision with right vertex. Ignore if non-convex 
                 * or if it will be taken care of by neighoring obstace */
                if (obstacle2.isConvex && RVOMath.det(relativePosition2, obstacle2.unitDir) >= 0) {
                    line.point = new Vector2(0, 0);
                    line.direction = RVOMath.normalize(new Vector2(-relativePosition2.y, relativePosition2.x));
                    orcaLines.push(line);
                }
                continue;
            }
            else if (s >= 0 && s < 1 && distSqLine <= radiusSq) {
                /* Collision with obstacle segment. */
                line.point = new Vector2(0, 0);
                line.direction = obstacle1.unitDir.scale(-1);
                orcaLines.push(line);
                continue;
            }

            /* 
             * No collision.  
             * Compute legs. When obliquely viewed, both legs can come from a single
             * vertex. Legs extend cut-off line when nonconvex vertex.
             */

            var leftLegDirection, rightLegDirection, leg1, leg2;

            if (s < 0 && distSqLine <= radiusSq) {
                /*
                 * Obstacle viewed obliquely so that left vertex
                 * defines velocity obstacle.
                 */
                if (!obstacle1.isConvex) {
                    /* Ignore obstacle. */
                    continue;
                }

                obstacle2 = obstacle1;

                leg1 = Math.sqrt(distSq1 - radiusSq);
                leftLegDirection = (new Vector2(relativePosition1.x * leg1 - relativePosition1.y * this.radius, relativePosition1.x * this.radius + relativePosition1.y * leg1)).scale(1 / distSq1);
                rightLegDirection = (new Vector2(relativePosition1.x * leg1 + relativePosition1.y * this.radius, -relativePosition1.x * this.radius + relativePosition1.y * leg1)).scale(1 / distSq1);
            }
            else if (s > 1 && distSqLine <= radiusSq) {
                /*
                 * Obstacle viewed obliquely so that
                 * right vertex defines velocity obstacle.
                 */
                if (!obstacle2.isConvex) {
                    /* Ignore obstacle. */
                    continue;
                }

                obstacle1 = obstacle2;

                leg2 = Math.sqrt(distSq2 - radiusSq);
                leftLegDirection = (new Vector2(relativePosition2.x * leg2 - relativePosition2.y * this.radius, relativePosition2.x * this.radius + relativePosition2.y * leg2)).scale(1 / distSq2);
                rightLegDirection = (new Vector2(relativePosition2.x * leg2 + relativePosition2.y * this.radius, -relativePosition2.x * this.radius + relativePosition2.y * leg2)).scale(1 / distSq2);
            }
            else {
                /* Usual situation. */
                if (obstacle1.isConvex) {
                    leg1 = Math.sqrt(distSq1 - radiusSq);
                    leftLegDirection = (new Vector2(relativePosition1.x * leg1 - relativePosition1.y * this.radius, relativePosition1.x * this.radius + relativePosition1.y * leg1)).scale(1 / distSq1);
                }
                else {
                    /* Left vertex non-convex; left leg extends cut-off line. */
                    leftLegDirection = obstacle1.unitDir.scale(-1);
                }

                if (obstacle2.isConvex) {
                    leg2 = Math.sqrt(distSq2 - radiusSq);
                    rightLegDirection = (new Vector2(relativePosition2.x * leg2 + relativePosition2.y * this.radius, -relativePosition2.x * this.radius + relativePosition2.y * leg2)).scale(1 / distSq2);
                }
                else {
                    /* Right vertex non-convex; right leg extends cut-off line. */
                    rightLegDirection = obstacle1.unitDir;
                }
            }

            /* 
             * Legs can never point into neighboring edge when convex vertex,
             * take cutoff-line of neighboring edge instead. If velocity projected on
             * "foreign" leg, no constraint is added. 
             */

            let leftNeighbor = obstacle1.prevObstacle;

            let isLeftLegForeign = false;
            let isRightLegForeign = false;

            if (obstacle1.isConvex && RVOMath.det(leftLegDirection, leftNeighbor.unitDir.scale(-1)) >= 0.0) {
                /* Left leg points into obstacle. */
                leftLegDirection = leftNeighbor.unitDir.scale(-1);
                isLeftLegForeign = true;
            }

            if (obstacle2.isConvex && RVOMath.det(rightLegDirection, obstacle2.unitDir) <= 0.0) {
                /* Right leg points into obstacle. */
                rightLegDirection = obstacle2.unitDir;
                isRightLegForeign = true;
            }

            /* Compute cut-off centers. */
            let leftCutoff = obstacle1.point.minus(this.position).scale(invTimeHorizonObst);
            let rightCutoff = obstacle2.point.minus(this.position).scale(invTimeHorizonObst);
            let cutoffVec = rightCutoff.minus(leftCutoff);

            /* Project current velocity on velocity obstacle. */

            /* Check if current velocity is projected on cutoff circles. */
            let t = obstacle1 == obstacle2 ? 0.5 : this.velocity.minus(leftCutoff).multiply(cutoffVec) / RVOMath.absSq(cutoffVec);
            let tLeft = this.velocity.minus(leftCutoff).multiply(leftLegDirection);
            let tRight = this.velocity.minus(rightCutoff).multiply(rightLegDirection);

            if ((t < 0.0 && tLeft < 0.0) || (obstacle1 == obstacle2 && tLeft < 0.0 && tRight < 0.0)) {
                /* Project on left cut-off circle. */
                var unitW = RVOMath.normalize(this.velocity.minus(leftCutoff));

                line.direction = new Vector2(unitW.y, -unitW.x);
                line.point = leftCutoff.plus(unitW.scale(this.radius * invTimeHorizonObst));
                orcaLines.push(line);
                continue;
            }
            else if (t > 1.0 && tRight < 0.0) {
                /* Project on right cut-off circle. */
                var unitW = RVOMath.normalize(this.velocity.minus(rightCutoff));

                line.direction = new Vector2(unitW.y, -unitW.x);
                line.point = rightCutoff.plus(unitW.scale(this.radius * invTimeHorizonObst));
                orcaLines.push(line);
                continue;
            }

            /* 
             * Project on left leg, right leg, or cut-off line, whichever is closest
             * to velocity.
             */
            let distSqCutoff = ((t < 0.0 || t > 1.0 || obstacle1 == obstacle2) ? Infinity : RVOMath.absSq(this.velocity.minus(cutoffVec.scale(t).plus(leftCutoff))));
            let distSqLeft = ((tLeft < 0.0) ? Infinity : RVOMath.absSq(this.velocity.minus(leftLegDirection.scale(tLeft).plus(leftCutoff))));
            let distSqRight = ((tRight < 0.0) ? Infinity : RVOMath.absSq(this.velocity.minus(rightLegDirection.scale(tRight).plus(rightCutoff))));

            if (distSqCutoff <= distSqLeft && distSqCutoff <= distSqRight) {
                /* Project on cut-off line. */
                line.direction = obstacle1.unitDir.scale(-1);
                var aux = new Vector2(-line.direction.y, line.direction.x);
                line.point = aux.scale(this.radius * invTimeHorizonObst).plus(leftCutoff);
                orcaLines.push(line);
                continue;
            }
            else if (distSqLeft <= distSqRight) {
                /* Project on left leg. */
                if (isLeftLegForeign) {
                    continue;
                }

                line.direction = leftLegDirection;
                var aux = new Vector2(-line.direction.y, line.direction.x);
                line.point = aux.scale(this.radius * invTimeHorizonObst).plus(leftCutoff);
                orcaLines.push(line);
                continue;
            }
            else {
                /* Project on right leg. */
                if (isRightLegForeign) {
                    continue;
                }

                line.direction = rightLegDirection.scale(-1);
                var aux = new Vector2(-line.direction.y, line.direction.x);
                line.point = aux.scale(this.radius * invTimeHorizonObst).plus(leftCutoff);
                orcaLines.push(line);
                continue;
            }
        }

        var numObstLines = orcaLines.length;

        var invTimeHorizon = 1.0 / this.timeHorizon;

        /* Create agent ORCA lines. */
        for (var i = 0; i < this.agentNeighbors.length; ++i) {
            var other = this.agentNeighbors[i].value;

            let relativePosition = other.position.minus(this.position);
            let relativeVelocity = this.velocity.minus(other.velocity);
            let distSq = RVOMath.absSq(relativePosition);
            let combinedRadius = this.radius + other.radius;
            let combinedRadiusSq = RVOMath.sqr(combinedRadius);

            var line = new Line(); // Line
            var u; // Vector2

            if (distSq > combinedRadiusSq) {
                /* No collision. */
                let w = relativeVelocity.minus(relativePosition.scale(invTimeHorizon));                /* Vector from cutoff center to relative velocity. */
                let wLengthSq = RVOMath.absSq(w);

                let dotProduct1 = w.multiply(relativePosition);

                if (dotProduct1 < 0.0 && RVOMath.sqr(dotProduct1) > combinedRadiusSq * wLengthSq) {
                    /* Project on cut-off circle. */
                    var wLength = Math.sqrt(wLengthSq);
                    var unitW = w.scale(1 / wLength);

                    line.direction = new Vector2(unitW.y, -unitW.x);
                    u = unitW.scale(combinedRadius * invTimeHorizon - wLength);
                }
                else {
                    /* Project on legs. */
                    let leg = Math.sqrt(distSq - combinedRadiusSq);

                    if (RVOMath.det(relativePosition, w) > 0.0) {
                        /* Project on left leg. */
                        var aux = new Vector2(relativePosition.x * leg - relativePosition.y * combinedRadius, relativePosition.x * combinedRadius + relativePosition.y * leg);
                        line.direction = aux.scale(1 / distSq);
                    }
                    else {
                        /* Project on right leg. */
                        var aux = new Vector2(relativePosition.x * leg + relativePosition.y * combinedRadius, -relativePosition.x * combinedRadius + relativePosition.y * leg);
                        line.direction = aux.scale(-1 / distSq);
                    }

                    let dotProduct2 = relativeVelocity.multiply(line.direction);

                    u = line.direction.scale(dotProduct2).minus(relativeVelocity);
                }
            }
            else {
                /* Collision. Project on cut-off circle of time timeStep. */
                let invTimeStep = 1.0 / simulator.timeStep;

                /* Vector from cutoff center to relative velocity. */
                let w = relativeVelocity.minus(relativePosition.scale(invTimeStep));

                let wLength = Math.abs(w);
                let unitW = w.scale(1 / wLength);

                line.direction = new Vector2(unitW.y, -unitW.x);
                u = unitW.scale(combinedRadius * invTimeStep - wLength);
            }

            line.point = u.scale(0.5).plus(this.velocity);
            orcaLines.push(line);
        }

        let lineFail = this.linearProgram2(orcaLines, this.maxSpeed, this.prefVelocity, false);

        if (lineFail < orcaLines.length) {
            this.linearProgram3(orcaLines, numObstLines, lineFail, this.maxSpeed);
        }
    };

    this.insertAgentNeighbor = function (agent, rangeSq) {
        if (this != agent) {
            var distSq = RVOMath.absSq(this.position.minus(agent.position));

            if (distSq < rangeSq) {
                if (this.agentNeighbors.length < this.maxNeighbors) {
                    this.agentNeighbors.push(new KeyValuePair(distSq, agent));
                }
                var i = this.agentNeighbors.length - 1;
                while (i != 0 && distSq < this.agentNeighbors[i - 1].key) {
                    this.agentNeighbors[i] = this.agentNeighbors[i - 1];
                    --i;
                }
                this.agentNeighbors[i] = new KeyValuePair(distSq, agent);

                if (this.agentNeighbors.length == this.maxNeighbors) {
                    rangeSq = this.agentNeighbors[this.agentNeighbors.length - 1].key;
                }
            }
        }
    };

    this.insertObstacleNeighbor = function (/** Obstacle */ obstacle, rangeSq) {
        let nextObstacle = obstacle.nextObstacle;

        let distSq = RVOMath.distSqPointLineSegment(obstacle.point, nextObstacle.point, this.position);

        if (distSq < rangeSq) {
            this.obstaclNeighbors.push(new KeyValuePair(distSq, obstacle));

            let i = this.obstaclNeighbors.length - 1;
            while (i != 0 && distSq < this.obstaclNeighbors[i - 1].key) {
                this.obstaclNeighbors[i] = this.obstaclNeighbors[i - 1];
                --i;
            }
            this.obstaclNeighbors[i] = new KeyValuePair(distSq, obstacle);
        }
    };

    this.update = function (simulator) {
        var rnd = new Vector2(0, 0); //Math.random() * 0.1 - 0.05, Math.random() * 0.1 - 0.05);
        this.velocity = this.newVelocity.plus(rnd);
        this.position = this.position.plus(this.newVelocity.scale(simulator.timeStep));
    };

    this.linearProgram1 = function (/** Array */ lines, /** int */ lineNo, /** float */ radius, /** Vector2 */ optVelocity, /** bool */ directionOpt) {
        var dotProduct = lines[lineNo].point.multiply(lines[lineNo].direction);
        var discriminant = RVOMath.sqr(dotProduct) + RVOMath.sqr(radius) - RVOMath.absSq(lines[lineNo].point);

        if (discriminant < 0.0) {
            /* Max speed circle fully invalidates line lineNo. */
            return false;
        }

        var sqrtDiscriminant = Math.sqrt(discriminant);
        var tLeft = -dotProduct - sqrtDiscriminant;
        var tRight = -dotProduct + sqrtDiscriminant;

        for (var i = 0; i < lineNo; ++i) {
            var denominator = RVOMath.det(lines[lineNo].direction, lines[i].direction);
            var numerator = RVOMath.det(lines[i].direction, lines[lineNo].point.minus(lines[i].point));

            if (Math.abs(denominator) <= RVOMath.RVOEPSILON) {
                /* Lines lineNo and i are (almost) parallel. */
                if (numerator < 0.0) {
                    return false;
                }
                else {
                    continue;
                }
            }

            var t = numerator / denominator;

            if (denominator >= 0.0) {
                /* Line i bounds line lineNo on the right. */
                tRight = Math.min(tRight, t);
            }
            else {
                /* Line i bounds line lineNo on the left. */
                tLeft = Math.max(tLeft, t);
            }

            if (tLeft > tRight) {
                return false;
            }
        }

        if (directionOpt) {
            if (optVelocity.multiply(lines[lineNo].direction) > 0.0) {
                // Take right extreme
                this.newVelocity = lines[lineNo].direction.scale(tRight).plus(lines[lineNo].point);
            }
            else {
                // Take left extreme.
                this.newVelocity = lines[lineNo].direction.scale(tLeft).plus(lines[lineNo].point);
            }
        }
        else {
            // Optimize closest point
            t = lines[lineNo].direction.multiply(optVelocity.minus(lines[lineNo].point));

            if (t < tLeft) {
                this.newVelocity = lines[lineNo].direction.scale(tLeft).plus(lines[lineNo].point);
            }
            else if (t > tRight) {
                this.newVelocity = lines[lineNo].direction.scale(tRight).plus(lines[lineNo].point);
            }
            else {
                this.newVelocity = lines[lineNo].direction.scale(t).plus(lines[lineNo].point);
            }
        }

        // TODO ugly hack by palmerabollo
        if (isNaN(this.newVelocity.x) || isNaN(this.newVelocity.y)) {
            return false;
        }

        return true;
    };

    this.linearProgram2 = function (/** Array */ lines, /** float */ radius, /** Vector2 */ optVelocity, /** bool */ directionOpt) {
        if (directionOpt) {
            /* 
             * Optimize direction. Note that the optimization velocity is of unit
             * length in this case.
             */
            this.newVelocity = optVelocity.scale(radius);
        }
        else if (RVOMath.absSq(optVelocity) > RVOMath.sqr(radius)) {
            /* Optimize closest point and outside circle. */
            this.newVelocity = RVOMath.normalize(optVelocity).scale(radius);
        }
        else {
            /* Optimize closest point and inside circle. */
            this.newVelocity = optVelocity;
        }

        for (var i = 0; i < lines.length; ++i) {
            if (RVOMath.det(lines[i].direction, lines[i].point.minus(this.newVelocity)) > 0.0) {
                /* Result does not satisfy constraint i. Compute new optimal result. */
                var tempResult = this.newVelocity;
                if (!this.linearProgram1(lines, i, this.radius, optVelocity, directionOpt)) {
                    this.newVelocity = tempResult;
                    return i;
                }
            }
        }

        return lines.length;
    };

    this.linearProgram3 = function (/** Array */ lines, /** int */ numObstLines, /** int */ beginLine, /** float */ radius) {
        var distance = 0.0;

        for (var i = beginLine; i < lines.length; ++i) {
            if (RVOMath.det(lines[i].direction, lines[i].point.minus(this.newVelocity)) > distance) {
                /* Result does not satisfy constraint of line i. */
                //std::vector<Line> projLines(lines.begin(), lines.begin() + numObstLines);
                let projLines = []; // new List<Line>();
                for (var ii = 0; ii < numObstLines; ++ii) {
                    projLines.push(lines[ii]);
                }

                for (var j = numObstLines; j < i; ++j) {
                    var line = new Line();

                    let determinant = RVOMath.det(lines[i].direction, lines[j].direction);

                    if (Math.abs(determinant) <= RVOMath.RVOEPSILON) {
                        /* Line i and line j are parallel. */
                        if (lines[i].direction.multiply(lines[j].direction) > 0.0) {
                            /* Line i and line j point in the same direction. */
                            continue;
                        }
                        else {
                            /* Line i and line j point in opposite direction. */
                            line.point = lines[i].point.plus(lines[j].point).scale(0.5);
                        }
                    }
                    else {
                        var aux = lines[i].direction.scale(RVOMath.det(lines[j].direction, lines[i].point.minus(lines[j].point)) / determinant);
                        line.point = lines[i].point.plus(aux);
                    }

                    line.direction = RVOMath.normalize(lines[j].direction.minus(lines[i].direction));
                    projLines.push(line);
                }

                var tempResult = this.newVelocity;
                if (this.linearProgram2(projLines, radius, new Vector2(-lines[i].direction.y, lines[i].direction.x), true) < projLines.length) {
                    /* This should in principle not happen.  The result is by definition
                     * already in the feasible region of this linear program. If it fails,
                     * it is due to small floating point error, and the current result is
                     * kept.
                     */
                    this.newVelocity = tempResult;
                }

                distance = RVOMath.det(lines[i].direction, lines[i].point.minus(this.newVelocity));
            }
        }
    };
}

function Simulator() {
  this.agents = []; // Agent[]
  this.obstacles = []; // Obstacle[]
  this.goals = []; // Vector2
  this.kdTree = new KdTree();

  this.timeStep = 0.25;

  this.defaultAgent; // Agent
  this.time = 0.0;

  this.getGlobalTime = function () {
    return this.time;
  };

  this.getNumAgents = function () {
    return this.agents.length;
  };

  this.getTimeStep = function () {
    return this.timeStep;
  };

  this.setAgentPrefVelocity = function (i, velocity) {
    this.agents[i].prefVelocity = velocity;
  };

  this.setTimeStep = function (timeStep) {
    this.timeStep = timeStep;
  };

  this.getAgentPosition = function (i) {
    return this.agents[i].position;
  };

  /**
   * My additon to allow coupling to game objects
   */
  this.getAgentGameObject = function(i){
    return this.agents[i].gameObject;
  };

  /** My addition */
  this.removeRVOAgent = function(i){
    this.agents.splice(i,1);
    this.goals.splice(i,1);
    console.log(this.agents.length);
  };

  this.getAgentPrefVelocity = function (i) {
    return this.agents[i].prefVelocity;
  };

  this.getAgentVelocity = function (i) {
    return this.agents[i].velocity;
  };

  this.getAgentRadius = function (i) {
    return this.agents[i].radius;
  };

  this.getAgentOrcaLines = function (i) {
    return this.agents[i].orcaLines;
  };

  this.addAgent = function (position, gameObject) {
    if (!this.defaultAgent) {
      throw new Error("no default agent");
    }

    var agent = new Agent();

    agent.position = position;
    agent.maxNeighbors = this.defaultAgent.maxNeighbors;
    agent.maxSpeed = this.defaultAgent.maxSpeed;
    agent.neighborDist = this.defaultAgent.neighborDist;
    agent.radius = this.defaultAgent.radius;
    agent.timeHorizon = this.defaultAgent.timeHorizon;
    agent.timeHorizonObst = this.defaultAgent.timeHorizonObst;
    agent.velocity = this.defaultAgent.velocity;
    agent.gameObject = gameObject;

    agent.id = this.agents.length;
    this.agents.push(agent);

    return this.agents.length - 1;
  };

  //  /** float */ neighborDist, /** int */ maxNeighbors, /** float */ timeHorizon, /** float */ timeHorizonObst, /** float */ radius, /** float*/ maxSpeed, /** Vector2 */ velocity)
  this.setAgentDefaults = function (neighborDist, maxNeighbors, timeHorizon, timeHorizonObst, radius, maxSpeed, velocity) {
    if (!this.defaultAgent) {
      this.defaultAgent = new Agent();
    }

    this.defaultAgent.maxNeighbors = maxNeighbors;
    this.defaultAgent.maxSpeed = maxSpeed;
    this.defaultAgent.neighborDist = neighborDist;
    this.defaultAgent.radius = radius;
    this.defaultAgent.timeHorizon = timeHorizon;
    this.defaultAgent.timeHorizonObst = timeHorizonObst;
    this.defaultAgent.velocity = velocity;
  };

  this.run = function () {
    this.kdTree.buildAgentTree(this);

    for (var i = 0; i < this.getNumAgents(); i++) {
      this.agents[i].computeNeighbors(this);
      this.agents[i].computeNewVelocity(this);
      this.agents[i].update(this);
    }

    this.time += this.timeStep;
  };

  this.reachedGoal = function () {
    for (var i = 0; i < this.getNumAgents(); ++i) {
      if (RVOMath.absSq(this.goals[i].minus(this.getAgentPosition(i))) > RVOMath.RVO_EPSILON) {
        return false;
      }    }
    return true;
  };

  this.addGoals = function (goals) {
    this.goals = goals;
  };

  /**My addition */
  this.addGoal = function(goal){
    this.goals.push(goal);
  };

  /** My addition */
  this.setGoal = function(goal, i){
    this.goals[i] = goal;
  };

  this.getGoal = function (goalNo) {
    return this.goals[goalNo];
  };

  this.addObstacle = function ( /** IList<Vector2> */ vertices) {
    if (vertices.length < 2) {
      return -1;
    }

    var obstacleNo = this.obstacles.length;

    for (var i = 0; i < vertices.length; ++i) {
      let obstacle = new Obstacle();
      obstacle.point = vertices[i];
      if (i != 0) {
        obstacle.prevObstacle = this.obstacles[this.obstacles.length - 1];
        obstacle.prevObstacle.nextObstacle = obstacle;
      }
      if (i == vertices.length - 1) {
        obstacle.nextObstacle = this.obstacles[obstacleNo];
        obstacle.nextObstacle.prevObstacle = obstacle;
      }
      obstacle.unitDir = RVOMath.normalize(vertices[(i == vertices.length - 1 ? 0 : i + 1)].minus(vertices[i]));

      if (vertices.length == 2) {
        obstacle.isConvex = true;
      } else {
        obstacle.isConvex = (RVOMath.leftOf(vertices[(i == 0 ? vertices.length - 1 : i - 1)], vertices[i], vertices[(i == vertices.length - 1 ? 0 : i + 1)]) >= 0);
      }

      obstacle.id = this.obstacles.length;

      this.obstacles.push(obstacle);
    }

    return obstacleNo;
  };

  this.processObstacles = function () {
    this.kdTree.buildObstacleTree(this);
  };

  this.getObstacles = function () {
    return this.obstacles;
  };
}

// import Globals from "./Globals.js"

/**
 * A scene represents a level in a game.
 */
class Scene extends NameableParent {

  /**
   * Scene constructor. Assigns the scene a name and starts it.
   * 
   * @param {String} name Name of this scene
   */
  constructor(definition, prefabs, behaviors, components) {
    super(definition.name);
    this.children = [];
    this.objects = definition.objects;
    //Inflate all the definitions


    this.prefabs = prefabs;
    this.behaviors = behaviors;
    this.components = components;


  }


  /**
   * Load the scene from its declarative syntax
   * 
   */
  boot() {
    // Setup up the simulations within the scene
    this.simulator = new Simulator();

    this.simulator.setAgentDefaults(
      30, // neighbor distance (min = radius * radius)
      30, // max neighbors
      100, // time horizon
      10, // time horizon obstacles
      1.5, // agent radius
      1.0, // max speed
      new Vector2(1, 1) // default velocity
    );
    this.simulator.setTimeStep(.25);

    // var NUM_AGENTS = 10;
    // for (var i = 0; i < NUM_AGENTS; i++) {
    //   var angle = i * (2 * Math.PI) / NUM_AGENTS;
    //   var x = Math.cos(angle) * 200;
    //   var y = Math.sin(angle) * 200;
    //   this.simulator.addAgent(new Vector2(x, y));

    // }

    // Create goals
    // var goals = [];
    // for (var i = 0; i < this.simulator.getNumAgents(); ++i) {
    //   goals.push(this.simulator.getAgentPosition(i).scale(-1));
    // }
    // this.simulator.addGoals(goals);

    // Add (polygonal) obstacle(s), specifying vertices in counterclockwise order.
    var vertices = [];

    this.simulator.addObstacle(vertices);

    // Process obstacles so that they are accounted for in the simulation.
    this.simulator.processObstacles();

    // for (var i = 0; i < NUM_AGENTS; i++) {
    //   this.simulator.setAgentPrefVelocity(i, RVOMath.normalize(this.simulator.getGoal(i).minus(this.simulator.getAgentPosition(i))));

    // }


    this.children = [];//Clear the children in case the scene has been built before

    if (this.objects)
      this.objects.forEach(obj => {
        this.buildChild(obj, this);
      });


  }




  /**
   * 
   * @param {String} obj The string giving the declarative syntax
   * @param {NameableParent} parent The parent of the object in the scene tree
   */
  buildChild(obj, parent) {

    if (obj.def) {
      obj.location = { x: 0, y: 0 };
      obj.scale = { x: 1, y: 1 };
      let split = obj.def.split(",").map(i => i.trim());
      switch (split.length) {
        case 1:
          obj.type = split[0];
          obj.name = obj.type;
          break;
        case 2:
          [obj.name, obj.type] = split;
          break;
        case 3:
          throw "There is no shorthand object definition with 3 values.";
        case 4:
          [obj.name, obj.location.x, obj.location.y, obj.type] = split;
          break;
        case 5:
          [obj.name, obj.location.x, obj.location.y, obj.scale.x, obj.type] = split;
          obj.scale.y = obj.scale.x;
          break;
        case 6:
          [obj.name, obj.location.x, obj.location.y, obj.scale.x, obj.scale.y, obj.type] = split;
          break;
        case 7:
          [obj.name, obj.location.x, obj.location.y, obj.scale.x, obj.scale.y, obj.rotation, obj.type] = split;
          break;
        default:
          throw "There is not a shorthand object definition with " + split.length + " arguments.";
      }
    }

    let gameObjectType = this.prefabs["" + obj.type];
    if (gameObjectType == null) throw "Could now find game object of type " + obj.type;

    obj.location = obj.location || { x: 0, y: 0 };
    obj.scale = obj.scale || { x: 1, y: 1 };
    obj.rotation = obj.rotation || 0;

    obj.location.x = +obj.location.x;
    obj.location.y = +obj.location.y;
    obj.scale.x = +obj.scale.x;
    obj.scale.y = +obj.scale.y;
    obj.rotation = +obj.rotation;

    let gameObject = this.instantiate(gameObjectType, new Point(obj.location.x, obj.location.y), new Point(obj.scale.x, obj.scale.y), obj.rotation, parent, obj);

    //gameObject.name = obj.name;
    //this.buildIt(obj, gameObject);
  }

  buildIt(obj, gameObject) {
    //Recursively build children
    if (obj.children) {
      obj.children.forEach(i => this.buildChild(i, gameObject));
    }

    //Set the key-pair values on components already on prefabs
    if (obj.componentValues) {
      obj.componentValues.forEach(j => {
        let split = j.split("|").map(i => i.trim());
        let component = gameObject.getComponent(split[0]);
        let value = split[2];
        try {
          value = JSON.parse(split[2]);
        } catch (e) {
          //Looks like it wasn't JSON after all..
        }
        component[split[1]] = value;
      });
    }

    //Add new components
    if (obj.components) {
      obj.components.forEach(i => {
        if (!i.split) {
          console.log("error");
        }
        let split = i.split("|").map(i => i.trim());
        let type = split.shift();
        //See if we have a component or behavior with that name
        let componentType = this.components[type] || this.behaviors[type];
        if (componentType == null) throw "Could not find component " + i.type;

        let component = new componentType();
        gameObject.addComponent(component);

        while (split.length >= 2) {
          let key = split.shift();
          let value = split.shift();
          component[key] = value;
        }

        // if (i.values) {
        //   //Now set the key-value pairs on the new component we just made
        //   i.values.forEach(v => {
        //     component[v.key] = v.value;
        //   })
        // }
        if (component.start)
          component.start();
      });
    }
  }

  draw(ctx, width, height) {
    //Before we draw, see if we have a camera game object and use that
    ctx.save();
    let tx, ty, sx, sy, r, hx, hy;
    let cameras = this.children.filter(i => i.anyComponent("CameraComponent"));
    if (cameras.length == 0) {
      //You really should add a camera
      //console.log("You should add a camera to the scene. C'mon.")
      ctx.fillStyle = "cyan";
      ctx.fillRect(0, 0, width, height);
      tx = 0;
      ty = 0;
      sx = 1;
      sy = 1;
      r = 0;
      hx = 0;
      hy = 0;
    }
    else {
      if (cameras.length > 1)
        console.log("More than 1 camera detected in the scene. You should only have exactly one root game object with a camera component attached.");
      let camera = cameras[0];
      let cameraComponent = camera.getComponent("CameraComponent");
      ctx.fillStyle = cameraComponent.backgroundColor;
      ctx.fillRect(0, 0, width, height);
      tx = camera.x;
      ty = camera.y;
      sx = camera.scaleX;
      sy = camera.scaleY;
      r = camera.rotation;
      hx = width / 2;
      hy = height / 2;
    }

    ctx.translate(hx, hy);
    ctx.rotate(r);
    ctx.scale(sx, sy);
    ctx.translate(-tx, -ty);

    //Draw children that are not in screen space
    this.children.filter(i => i.draw && !i.anyComponent("CanvasComponent")).forEach(i => i.draw(ctx));

    ctx.restore();

    //We're now back in screen space. It's time to draw any GUI components
    //if we have a gameObject with an attached CanvasComponent
    ctx.save();
    let canvases = this.children.filter(i => i.anyComponent("CanvasComponent"));
    if (canvases.length == 0) ;
    else {
      if (canvases.length > 1) {
        console.log("More than 1 canvas object found in the root of your scene graph. You should only have exactly one game object with a canvas component. The other object(s) and its children will not be rendered.");
      }
      let canvas = canvases[0];
      canvas.draw(ctx);
    }
    ctx.restore();


  }
  update(ctx, collidableType, collisionHelper) {
    //Update all the objects
    this.children.filter(i => i.update).forEach(i => i.update());

    /**
     * Now run the simulators
     */

    //
    //First we do collisions
    //

    //Add collision behavior
    let collidableChildren = [];
    this.getCollidable(this, collidableChildren, collidableType);

    for (let i = 0; i < collidableChildren.length; i++) {
      for (let j = i + 1; j < collidableChildren.length; j++) {
        if (collisionHelper.inCollision(collidableChildren[i], collidableChildren[j])) {
          let gameObjectOne = collidableChildren[i].gameObject;
          let gameObjectTwo = collidableChildren[j].gameObject;

          //Now loop over all the behaviors too see if any are listening for collision events
          for (let i = 0; i < gameObjectOne.components.length; i++) {
            let component = gameObjectOne.components[i];
            if (component.onCollisionStay)
              component.onCollisionStay(collidableChildren[j]);
          }
          for (let j = 0; j < gameObjectTwo.components.length; j++) {
            let component = gameObjectTwo.components[j];
            if (component.onCollisionStay)
              component.onCollisionStay(collidableChildren[i]);
          }

        }
      }
    }

    //
    //Now go through and see if the point represented by the mouse collides with any of the colliders
    //
    //First get the world space position of the mouse
    let cameras = this.children.filter(i => i.anyComponent("CameraComponent"));
    let point = { x: 0, y: 0 };
    point.x = parseInt(Input.mousePosition.x);
    point.y = parseInt(Input.mousePosition.y);
    if (cameras.length == 0) ;
    else {
      /* point = Input.mousePosition;*/
      //Put in transform code here
      let camera = cameras[0];
      let cameraComponent = camera.getComponent("CameraComponent");

      let tx = camera.x;
      let ty = camera.y;
      let sx = camera.scaleX;
      let sy = camera.scaleY;
      let r = camera.rotation;
      let hx = ctx.canvas.width / 2;
      let hy = ctx.canvas.height / 2;

      let x = point.x;
      let y = point.y;
      x -= hx;
      y -= hy;
      x /= sx;
      y /= sy;
      x += tx;
      y += ty;

      point.x = x;
      point.y = y;




    }

    let colliderObject = {};
    colliderObject.gameObject = new GameObject();
    colliderObject.gameObject.x = point.x;
    colliderObject.gameObject.y = point.y;
    colliderObject.collider = new PointCollider();

    for (let i = 0; i < collidableChildren.length; i++) {
      if (collisionHelper.inCollision(collidableChildren[i], colliderObject)) {
        let gameObjectOne = collidableChildren[i].gameObject;

        //Now loop over all the behaviors too see if any are listening for collision events
        for (let i = 0; i < gameObjectOne.components.length; i++) {
          let component = gameObjectOne.components[i];
          if (component.onMouseOver)
            component.onMouseOver();
          if (component.onMouseDown) {
            if (Input.getMouseButtonDown(0))
              component.onMouseDown();
          }
        }
      }
    }

    //
    //Now go through and see if the point represented by the touch point collides with any of the colliders
    //
    //First get the world space position of the touch
    let touches = Input.getTouches();
    if (touches && touches.length > 0) {
      let cameras = this.children.filter(i => i.anyComponent("CameraComponent"));
      let point = { x: 0, y: 0 };
      point.x = parseInt(touches[0].x);
      point.y = parseInt(touches[0].y);
      if (cameras.length == 0) ;
      else {
        /* point = Input.mousePosition;*/
        //Put in transform code here
        let camera = cameras[0];

        let tx = camera.x;
        let ty = camera.y;
        let sx = camera.scaleX;
        let sy = camera.scaleY;
        let r = camera.rotation;
        let hx = ctx.canvas.width / 2;
        let hy = ctx.canvas.height / 2;

        let x = point.x;
        let y = point.y;
        x -= hx;
        y -= hy;
        x /= sx;
        y /= sy;
        x += tx;
        y += ty;

        point.x = x;
        point.y = y;
      }

      let colliderObject = {};
      colliderObject.gameObject = new GameObject();
      colliderObject.gameObject.x = point.x;
      colliderObject.gameObject.y = point.y;
      colliderObject.collider = new PointCollider();

      for (let i = 0; i < collidableChildren.length; i++) {
        if (collisionHelper.inCollision(collidableChildren[i], colliderObject)) {
          let gameObjectOne = collidableChildren[i].gameObject;

          //Now loop over all the behaviors too see if any are listening for collision events
          for (let i = 0; i < gameObjectOne.components.length; i++) {
            let component = gameObjectOne.components[i];
            if (component.onMouseOver)
              component.onTouchOver();
            if (component.onTouchStart) {
              if (Input.getTouchesStart() && Input.getTouchesStart().length > 0)
                component.onTouchStart();
            }
            if (component.onTouchEnd) {
              if (Input.getTouchesEnd() && Input.getTouchesEnd().length > 0)
                component.onTouchEnd();
            }
          }
        }
      }
    }

    //
    // Now we simulate the crowds
    //
    this.simulator.run();

    // Go back and update the gameObjects represented by the agents
    let numAgents = this.simulator.getNumAgents();
    for (let i = 0; i < numAgents; i++) {
      let gameObject = this.simulator.getAgentGameObject(i);
      let position = this.simulator.getAgentPosition(i);
      gameObject.x = position.x;
      gameObject.y = position.y;
      if (RVOMath.absSq(this.simulator.getGoal(i).minus(this.simulator.getAgentPosition(i))) < 10) {
        // Agent is within one radius of its goal, set preferred velocity to zero
        this.simulator.setAgentPrefVelocity(i, new Vector2(0.0, 0.0));
      } else {
        // Agent is far away from its goal, set preferred velocity as unit vector towards agent's goal.
        this.simulator.setAgentPrefVelocity(i, RVOMath.normalize(this.simulator.getGoal(i).minus(this.simulator.getAgentPosition(i))));
      }
    }
  }
  getCollidable(gameObject, collidableChildren, type) {

    if (gameObject.getComponent) {
      try {
        let collidableComponent = gameObject.getComponent(type);
        if (collidableComponent) {
          collidableChildren.push({ collider: collidableComponent, gameObject });
        }
      } catch (e) {
        //no-op
      }
    }

    for (let i = 0; i < gameObject.children.length; i++) {
      let child = gameObject.children[i];

      this.getCollidable(child, collidableChildren, type);
    }
  }

  /**
   * 
   * @param {*} location Proposed entry point for the game object
   * @param {*} collider Collider for the proposed game object
   */
  canEnterSafely(location, collider, component) {
    let collidableChildren = [];
    this.getCollidable(this, collidableChildren, this.components.Collider);
    let proposed = new GameObject();
    proposed.x = location.x;
    proposed.y = location.y;

    for (let i = 0; i < collidableChildren.length; i++) {
      if (collidableChildren[i].gameObject.anyComponent(component))
        if (this.components.CollisionHelper.inCollision(collidableChildren[i], { collider, gameObject: proposed })) {
          return false;
        }
    }
    return true;
  }



  instantiate(gameObjectType, location, scale = new Point(1, 1), rotation = 0, parent = this, obj = null) {
    let gameObject = new GameObject(location.x, location.y, scale.x, scale.y, rotation, gameObjectType.name);
    parent.children.push(gameObject);
    if (parent instanceof GameObject)
      gameObject.parent = parent; //Only set the parent if it's not a scene.
    let prefab = this.prefabs[gameObjectType.name];
    this.buildIt(prefab, gameObject);
    if (obj)
      gameObject.name = obj.name;
    else
      gameObject.name = prefab.name;
    gameObject.prefabName = gameObjectType.name;
    if (obj) {
      this.buildIt(obj, gameObject);
    }
    gameObject.recursiveCall("start");

    /**
     * See if the game object needs to be added to any of our simulators
     */

    if (gameObject.anyComponent("RVOAgent")) {
      this.simulator.addAgent(new Vector2(gameObject.x, gameObject.y), gameObject);
      let RVOAgent = gameObject.getComponent("RVOAgent");
      let destination = RVOAgent.destination;
      let goal = new Vector2(destination.x, destination.y);
      this.simulator.addGoal(goal);
      let i = this.simulator.getNumAgents() - 1;
      RVOAgent._id = i;
      this.updateRVOAgent(gameObject);

    }
    if (gameObject.anyComponent("RVOObstacle")) {
      let rectangleComponent = gameObject.getComponent("RectangleComponent");
      let width = +(rectangleComponent.width * gameObject.scaleX);
      let height = +(rectangleComponent.height * gameObject.scaleY);
      let rx = gameObject.x - width / 2;
      let ry = gameObject.y - height / 2;

      let a = new Vector2(rx, ry);
      let b = new Vector2(rx, ry + height);
      let c = new Vector2(rx + width, ry + height);
      let d = new Vector2(rx + width, ry);

      this.simulator.addObstacle([a, b]);
      this.simulator.addObstacle([b, c]);
      this.simulator.addObstacle([c, d]);
      this.simulator.addObstacle([d, a]);

      this.simulator.processObstacles();
    }
    return gameObject;

  }
  updateRVOAgent(gameObject) {
    let RVOAgent = gameObject.getComponent("RVOAgent");
    let i = RVOAgent._id;
    let destination = RVOAgent.destination;
    let goal = new Vector2(destination.x, destination.y);
    this.simulator.setGoal(goal, i);
    this.simulator.setAgentPrefVelocity(i, RVOMath.normalize(goal.minus(this.simulator.getAgentPosition(i))));
  }
  removeRVOAgent(gameObject) {
    let RVOAgent = gameObject.getComponent("RVOAgent");
    let i = RVOAgent._id;
    this.simulator.removeRVOAgent(i);
    for (let i = 0; i < this.simulator.getNumAgents(); i++) {
      let gameObject = this.simulator.getAgentGameObject(i);
      let component = gameObject.getComponent("RVOAgent");
      component._id = i;
    }

  }




}

/**
 * Main function for the game.
 * This functon takes in game-specific game objects, behaviors, and scenes
 * and starts the game loop.
 * 
 * It also accepts an optional "options" parameter which can override the default behavior.
 * 
 * The options object can have the following key value pairs
 * - startScene:{String} overrive the start scene provided in the scenes object
 * - runUpdate:{bool} if true, prevents update from being called. The Engine wil only render the initial state.
 * 
 * @param {Array} gameObjects An array of game objects that can be in the game
 * @param {Array} gameBehaviors An array of behaviors that can be in the game
 * @param {Object} scenes An object specifying the start scenes and scene definitions
 * @param {Object} options An object with options that override the defaults
 */
function main(gameObjects, gameBehaviors, scenes, options = {}) {
  //From https://flaviocopes.com/how-to-merge-objects-javascript/
  this.Prefabs = { ...gameObjects, ...this.Prefabs };
  this.Behaviors = gameBehaviors;
  let canv, ctx;

  this.SceneManager.clearScenes();
  scenes.allScenes
    .forEach(i => this.SceneManager.addScene(new Scene(i, this.Prefabs, gameBehaviors, this.Components)));

  this.SceneManager.currentScene = options.startScene || scenes.startScene;
  canv = document.querySelector("#canv");
  ctx = canv.getContext('2d');

  let that = this;

  function gameLoop() {

    let shouldUpdate = true;
    if(typeof options.runUpdate !== 'undefined' || options.runUpdate === false)
      shouldUpdate = false;
    Input.swapUpDownArrays();
    if (shouldUpdate)
      update();
    draw(ctx);
  }

  function update() {
    that.SceneManager.currentScene.update(ctx, that.Components.Collider, that.Components.CollisionHelper);
  }

  function draw(ctx) {
    that.SceneManager.currentScene.draw(ctx, canv.width, canv.height);
  }

  //Setup event handling
  document.body.addEventListener('keydown', keydown);
  document.body.addEventListener('keyup', keyup);
  document.body.addEventListener('keypress', keypress);
  document.body.addEventListener('mousedown', mousedown);
  document.body.addEventListener('mouseup', mouseup);
  document.body.addEventListener('mousemove', mousemove);
  document.body.addEventListener('wheel', wheelevent);
  document.body.addEventListener('contextmenu', contextmenu);
  document.body.addEventListener("touchstart", touchstart, false);
  document.body.addEventListener("touchend", touchend, false);
  document.body.addEventListener("touchcancel", touchcancel, false);
  document.body.addEventListener("touchmove", touchmove, false);



  function keydown(event) {
    if (Input.keys[event.key] != true)
      Input.down[event.key] = true;
    Input.keys[event.key] = true;
  }

  function keyup(event) {
    if (Input.keys[event.key] != false)
      Input.up[event.key] = true;
    Input.keys[event.key] = false;
  }

  function mousedown(event) {
    if (Input.mouseButtons[event.button] != true)
      Input.mouseButtonsDown[event.button] = true;
    Input.mouseButtons[event.button] = true;
  }

  function mouseup(event) {
    if (Input.mouseButtons[event.button] != false)
      Input.mouseButtonsUp[event.button] = true;
    Input.mouseButtons[event.button] = false;
  }

  function mousemove(event) {
    [Input.mousePosition.x, Input.mousePosition.y] = [event.clientX, event.clientY];
    
  }

  function wheelevent(event) {
    if (event.deltaY != 0)
      Input.mouseScrollDelta = event.deltaY;
  }

  function keypress(event) {
    //console.log(`Modifier keys: Control: ${event.ctrlKey}, Alt: ${event.altKey}, Shift: ${event.shiftKey}, Meta Key: ${event.metaKey}`);
  }

  function touchstart(event){
    //event.preventDefault();//Don't treat this as a mouse event
    Input.touches = copyTouches(event.changedTouches);
    Input.touchesStart = copyTouches(event.changedTouches); //Simple deep copy
  }

  function touchend(event){
    //event.preventDefault();//Don't treat this as a mouse event
    Input.touches = [];//copyTouches(event.changedTouches);
    Input.touchesEnd = copyTouches(event.changedTouches); //Simple deep copy
  }

  function touchcancel(event){
    //event.preventDefault();//Don't treat this as a mouse event
    console.log("Touch Cancel");
  }

  function touchmove(event){
    Input.touches = copyTouches(event.changedTouches);
    
  }

  function copyTouches(touches){
    let toReturn = [];
    for(let i = 0; i < touches.length; i++){
      let touch = touches[i];
      let toAdd = {};
      for(let j in touch){
        toAdd[j] = touch[j];
      }

      toReturn.push(toAdd);
    }
    return toReturn;
  }

  // Based on https://stackoverflow.com/questions/381795/how-to-disable-right-click-context-menu-in-javascript
  // Kills the right mouse context menu
  function contextmenu(event) {
    if (event.preventDefault != undefined)
      event.preventDefault();
    if (event.stopPropagation != undefined)
      event.stopPropagation();
    return false;
  }

  //Keep our canvas full screen
  //from https://blog.codepen.io/2013/07/29/full-screen-canvas/

  var can = document.getElementById("canv");

  function resizeCanvas() {
    let parent = can.parentNode;
    if (parent == document.body) {
      parent = window;
      can.style.width = parent.innerWidth + "px";

      can.width = parent.innerWidth;
      can.height = parent.innerHeight;
    }
    else {
      //Take the canvas out of the parent div sive calculation momentarily
      can.style.height = "0px";
      can.style.width = "0px";
      can.width = 0;
      can.height = 0;
      //Then on the next tick put it back in.
      setTimeout(function () {
        let width = parent.clientWidth;
        let height = parent.clientHeight;
        can.style.width = width + "px";
        can.style.height = height + "px";
        can.width = width;
        can.height = height;
        //console.log(`${parent.clientWidth}-${parent.innerWidth}-${parent.offsetWidth}`)
        console.log(`${can.style.height} ${can.height}`);
      }, 0);

    }
  }
  // Webkit/Blink will fire this on load, but Gecko doesn't.
  window.onresize = resizeCanvas;

  // So we fire it manually...
  resizeCanvas();
  setInterval(gameLoop, 33);
}

export default main;
