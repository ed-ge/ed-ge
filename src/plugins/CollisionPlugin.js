import Base from "../Base.js"
class CollisionPlugin{
  constructor(){
    this.frameCollisionOver = [];

  }
  update(){
    //
    //First we do collisions
    //

    let collidableType = Base.Serializer.components.Collider;
    let collisionHelper = Base.Serializer.components.CollisionHelper;

    //Add collision behavior
    let collidableChildren = [];
    this.getCollidable(Base.$$, collidableChildren, collidableType);

    for (let i = 0; i < collidableChildren.length; i++) {
      let gameObjectOne = collidableChildren[i].gameObject;
      let isInScreenSpaceOne = this.isInScreenSpace(gameObjectOne);
      for (let j = i + 1; j < collidableChildren.length; j++) {
        let gameObjectTwo = collidableChildren[j].gameObject;
        let isInScreenSpaceTwo = this.isInScreenSpace(gameObjectTwo);
        if (isInScreenSpaceOne != isInScreenSpaceTwo) break;
        let collisionPair = { one: collidableChildren[i], two: collidableChildren[j] };
        if (collisionHelper.inCollision(collidableChildren[i], collidableChildren[j])) {
          gameObjectOne.components.forEach(x => {
            if (x.onCollisionStay)
              x.onCollisionStay(collidableChildren[j])
          })
          gameObjectTwo.components.forEach(x => {
            if (x.onCollisionStay)
              x.onCollisionStay(collidableChildren[i])

          })
          if (this.frameCollisionOver.findIndex(x=>this.collisionPairMatch(x,collisionPair))==-1) {
            this.frameCollisionOver.push(collisionPair);
            gameObjectOne.components.filter(x=>x.onCollisionEnter).forEach(x => {
              x.onCollisionEnter(collidableChildren[j])
            })
            gameObjectTwo.components.filter(x=>x.onCollisionEnter).forEach(x => {
              x.onCollisionEnter(collidableChildren[i])
            })
          }
        }
        else{
          if(this.frameCollisionOver.findIndex(x=>this.collisionPairMatch(x,collisionPair))!=-1)
          {
            this.frameCollisionOver = this.frameCollisionOver.filter(x=>!this.collisionPairMatch(x, collisionPair));
            gameObjectOne.components.filter(x=>x.onCollisionExit).forEach(x => {
              x.onCollisionExit(collidableChildren[j])
            })
            gameObjectTwo.components.filter(x=>x.onCollisionExit).forEach(x => {
              x.onCollisionExit(collidableChildren[i])
            })
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
  collisionPairMatch(one, two){
    return one.one.gameObject == two.one.gameObject &&
      one.two.gameObject == two.two.gameObject &&
      one.one.collider == two.one.collider &&
      one.two.collider == two.two.collider;
  }
}

export default CollisionPlugin;