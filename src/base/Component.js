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
 *      <...>
 *    ]
 * }
 * ```
 * The brief version of the syntax is as follows:
 * ```
 * "<type name of the componenent>|key|value<...>"
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
        this.gameObject = null;
    }

    get $go(){
      return this.gameObject;
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

export default Component;