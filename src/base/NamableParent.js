
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
                    child.onDestroy()
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

    addChild(child){
        if(!child || child.parent === undefined) throw  new Error("addChild requires one argument that have a parent member variable");
        if(this.children.includes(child)) return console.log("Warning: This parent already has that child. Child not added");
        this.children.push(child);
        child.parent = this;
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

export default NameableParent;