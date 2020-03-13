/**
 * Parent interface for scenes and game objects
 */

class NameableParent {
    children = [];
    name = "";
    constructor(name) {
        this.name = name;
    }

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
}

export default NameableParent;