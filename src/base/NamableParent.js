
/**
 * Parent interface for scenes and game objects.
 * 
 * The Scene class and the GameObject class both descend from this class.
 */

import Base from "../Base.js";


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
        if (arguments.length != 1 || !(gameObject instanceof NameableParent)) throw new Error("destroy takes exactly one argument of type NameableParent")
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

    addChild(child, scene) {
        //if(arguments.length != 1 || !(child instanceof NameableParent)) throw new Error("addChild requires exactly one argument of type NameableParent")
        //if(!child || child.parent === undefined) throw  new Error("addChild requires one argument that have a parent member variable");
        if (this.children.includes(child)) return console.log("Warning: This parent already has that child. Child not added");
        this.children.push(child);
        child.parent = this;
        //Find the terminal parent
        let highestParent = child.parent;
        while (highestParent.parent != null) {
            highestParent = highestParent.parent;
        }
        Base.Plugins.filter(plugin => plugin.OnNewChild).forEach(plugin => plugin.OnNewChild(child, highestParent));
        if (this.newChildEvent)
            this.newChildEvent(child);
    }

    isADescendant(descendant) {
        if (arguments.length != 1 || !(descendant instanceof NameableParent)) throw new Error("isADescendant expects exactly one argument of type NameableParent")
        if (this == descendant) return true;
        for (let child of this.children) {
            let result = child.isADescendant(descendant);
            if (result) return true;
        }
        return false;
    }
    $(name) {
        return this.findByName(name);
    }

    recurseFindAllWithComponent(type) {
        let toReturn = [];
        if (this.getComponent) {
            try {
                let component = this.getComponent(type);
                if (component) {
                    toReturn.push({ component, gameObject:this });
                }
            } catch (e) {
                //no-op
            }
        }

        for (let i = 0; i < this.children.length; i++) {
            let child = this.children[i];

            let childResults = child.recurseFindAllWithComponent(type);
            toReturn.push(...childResults);
        }
        return toReturn;
    }

    findByName(name) {
        if (arguments.length != 1 || !(typeof name == 'string' || name instanceof String)) throw new Error("findByName expects exactly one string argument.")
        if (this.name == name)
            return this;
        for (let child of this.children) {
            let result = child.findByName(name);
            if (result != null) return result;
        }
        //We didn't find anything
        return null;
    }

    /** Find a NameableParent by UUID */
    findByUUID(uuid) {
        if (arguments.length != 1 || !(typeof uuid == 'string' || uuid instanceof String)) throw new Error("findByUUID expects exactly one string argument.")

        if (this.uuid == uuid)
            return this;
        for (let child of this.children) {
            let result = child.findByUUID(uuid);
            if (result != null) return result;
        }
        //We didn't find anything
        return null;
    }

    /**Generate a uuid
     * From https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
     */
    uuidv4() {
        if (arguments.length != 0) throw new Error("uuidv4 takes no arguments.")

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }


}

export default NameableParent;