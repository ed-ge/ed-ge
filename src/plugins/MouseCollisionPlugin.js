import Base from "../Base.js"
import Input from "../base/Input.js"
import GameObject from "../base/GameObject.js"
import PointCollider from "../components/PointCollider.js"
class MouseCollisionPlugin{
  constructor(){
    this.frameMouseOver = [];
  }
  update(ctx){
    let collidableType = Base.Serializer.components.Collider;
    let collisionHelper = Base.Serializer.components.CollisionHelper;
    let children = Base.$$.children;
    //Add collision behavior
    let collidableChildren = [];
    this.getCollidable(Base.$$, collidableChildren, collidableType);

    //
    //Now go through and see if the point represented by the mouse collides with any of the colliders
    //
    //First get the world space position of the mouse
    let cameras = children.filter(i => i.anyComponent("CameraComponent"))
    let point = { x: 0, y: 0 };
    point.x = parseInt(Input.mousePosition.x);
    point.y = parseInt(Input.mousePosition.y);
    let screenPoint = { x: point.x, y: point.y };
    if (cameras.length > 0) {

      let camera = cameras[0];
      //let cameraComponent = camera.getComponent("CameraComponent")
      let [tx, ty, sx, sy, r, hx, hy] = [camera.x, camera.y, camera.scaleX, camera.scaleY, camera.rotation, ctx.canvas.width / 2, ctx.canvas.height / 2];



      point.x = (point.x - hx) / sx + tx;
      point.y = (point.y - hy) / sy + ty;
    }

    //Put the mouse in world space
    let colliderObjectWorld = {};
    colliderObjectWorld.gameObject = new GameObject();
    colliderObjectWorld.gameObject.x = point.x;
    colliderObjectWorld.gameObject.y = point.y;
    colliderObjectWorld.collider = new PointCollider();

    let colliderObjectScreen = {};
    colliderObjectScreen.gameObject = new GameObject();
    colliderObjectScreen.gameObject.x = screenPoint.x;
    colliderObjectScreen.gameObject.y = screenPoint.y;
    colliderObjectScreen.collider = new PointCollider();

    let colliderObject;

    for (let i = 0; i < collidableChildren.length; i++) {
      let collidableChild = collidableChildren[i];

      if (!this.isInScreenSpace(collidableChild.gameObject))
        colliderObject = colliderObjectWorld;
      else
        colliderObject = colliderObjectScreen;

      if (collisionHelper.inCollision(collidableChild, colliderObject)) {
        let gameObjectOne = collidableChild.gameObject;

        //Now loop over all the behaviors too see if any are listening for collision events\
        if (Input.getMouseButtonDown(0))
          gameObjectOne.components.filter(x => x.onMouseDown).forEach(x => x.onMouseDown())
        if (Input.getMouseButtonUp(0))
          gameObjectOne.components.filter(x => x.onMouseUp).forEach(x => x.onMouseUp())
        for (let i = 0; i < gameObjectOne.components.length; i++) {
          let component = gameObjectOne.components[i];
          if (component.onMouseOver) {
            component.onMouseOver();
          }
          if (!this.frameMouseOver.includes(component)) {
            if (component.onMouseEnter) {
              component.onMouseEnter()
            }
            this.frameMouseOver.push(component);
          }



        }
      } else {
        let gameObjectOne = collidableChild.gameObject;
        for (let i = 0; i < gameObjectOne.components.length; i++) {
          let component = gameObjectOne.components[i];

          if (this.frameMouseOver.includes(component)) {
            _.pull(this.frameMouseOver, component);
            if (component.onMouseExit) {
              component.onMouseExit();
            }
          }
        }
      }
    }

  }
  /**
   * Get a flat list of all the collidable components in the scene
   * @param {*} gameObject The root game object in the tree we are searching
   * @param {*} collidableChildren The list we are modifying
   * @param {*} type The type a game object needs in order to be considered collidable
   */
  getCollidable(gameObject, collidableChildren, type) {
    if (arguments.length != 3 ||
      !(typeof gameObject == 'object') ||
      !(Array.isArray(collidableChildren)) ||
      !(typeof type == 'function')) throw new Error("getCollidable expects exactly three arguments of type GameObject, array, and type")


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
  isInScreenSpace(gameObject) {
    if (arguments.length != 1 || !(gameObject instanceof Base.GameObject)) throw new Error("isInScreenSpace expects exactly one argument of type GameObject")

    let canvases = Base.$$.children.filter(i => i.anyComponent("CanvasComponent"));
    if (canvases.length == 0) return false; // We don't have screen space
    for (let canvas of canvases) {
      if (canvas.isADescendant(gameObject)) {
        return true;
      }
    }
    return false;
  }
}

export default MouseCollisionPlugin;