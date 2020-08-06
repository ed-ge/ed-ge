import Base from "../Base.js"
import Input from "../base/Input.js"
import GameObject from "../base/GameObject.js"
import PointCollider from "../components/PointCollider.js"
class TouchCollisionPlugin {
  constructor() {

  }
  update(ctx) {
    let collidableType = Base.Serializer.components.Collider;
    let collisionHelper = Base.Serializer.components.CollisionHelper;
    let children = Base.$$.children;

    //Add collision behavior
    let collidableChildren = [];
    this.getCollidable(Base.$$, collidableChildren, collidableType);
    let cameras = children.filter(i => i.anyComponent("CameraComponent"))

    //
    //Now go through and see if the point represented by the touch point collides with any of the colliders
    //
    //First get the world space position of the touch
    let touches = Input.getTouches();
    if (touches && touches.length > 0) {
      //let cameras = this.children.filter(i => i.anyComponent("CameraComponent"))
      let point = { x: 0, y: 0 };
      point.x = parseInt(touches[0].x);
      point.y = parseInt(touches[0].y);
      let screenPoint = { x: point.x, y: point.y };
      if (cameras.length > 0) {

        let camera = cameras[0];

        let [tx, ty, sx, sy, r, hx, hy] = [camera.x, camera.y, camera.scaleX, camera.scaleY, camera.rotation, ctx.canvas.width / 2, ctx.canvas.height / 2];

        point.x = (point.x - hx) / sx + tx;
        point.y = (point.y - hy) / sy + ty;

      }

      let colliderObjectWorld = {};
      colliderObjectWorld.gameObject = new GameObject();
      colliderObjectWorld.collider = new PointCollider();

      let colliderObjectScreen = {};
      colliderObjectScreen.gameObject = new GameObject();
      colliderObjectScreen.collider = new PointCollider();
  
      let colliderObject;
      [colliderObjectWorld.gameObject.x, colliderObjectWorld.gameObject.y] = [point.x, point.y];
      [colliderObjectScreen.gameObject.x, colliderObjectScreen.gameObject.y] = [screenPoint.x, screenPoint.y];
      for (let i = 0; i < collidableChildren.length; i++) {
        let collidableChild = collidableChildren[i];
        if (!this.isInScreenSpace(collidableChild.gameObject))
          colliderObject = colliderObjectWorld;
        else
          colliderObject = colliderObjectScreen;

        if (collisionHelper.inCollision(collidableChild, colliderObject)) {
          let gameObjectOne = collidableChild.gameObject;

          //Now loop over all the behaviors too see if any are listening for collision events
          gameObjectOne.components.filter(x => x.onTouchOver).forEach(x => x.onTouchOver());
          if (Input.getTouchesStart() && Input.getTouchesStart().length > 0)
            gameObjectOne.components.filter(x => x.onTouchStart).forEach(x => x.onTouchStart());
          if (Input.getTouchesEnd() && Input.getTouchesEnd().length > 0)
            gameObjectOne.components.filter(x => x.onTouchEnd).forEach(x => x.onTouchEnd());
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

export default TouchCollisionPlugin;