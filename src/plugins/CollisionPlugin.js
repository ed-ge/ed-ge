import Base from "../Base.js"
class CollisionPlugin {
  constructor() {
    this.frameCollisionOver = [];

  }
  update() {
    //
    //First we do collisions
    //

    let collidableType = Base.Components.Collider;
    let collisionHelper = Base.Components.CollisionHelper;

    //Add collision behavior
    // let collidableChildren = Base.$$.allWithComponent(collidableType).map(x=>{return{collider:x.component, gameObject:x.gameObject}});

    let collidableChildren = Base.$$.allWithComponent(collidableType).map(x => { return { collider: x.component, gameObject: x.gameObject } });
    collidableChildren = collidableChildren.filter(x => !x.gameObject.anyComponent(Base.Components.GUIOnlyCollider));

    for (let i = 0; i < collidableChildren.length; i++) {
      let collidableOne = collidableChildren[i];
      let gameObjectOne = collidableOne.gameObject;
      // let isInScreenSpaceOne = this.isInScreenSpace(gameObjectOne);
      let isInScreenSpaceOne = gameObjectOne.hasParentWithComponent(Base.Components.CanvasComponent);
      for (let j = i + 1; j < collidableChildren.length; j++) {
        let collidableTwo = collidableChildren[j];
        let gameObjectTwo = collidableTwo.gameObject;
        let isInScreenSpaceTwo = gameObjectTwo.hasParentWithComponent(Base.Components.CanvasComponent);
        if (isInScreenSpaceOne != isInScreenSpaceTwo) break;
        let collisionPair = { one: collidableOne, two: collidableTwo };
        if (collisionHelper.inCollision(collidableOne, collidableTwo)) {
          gameObjectOne.components.forEach(x => {
            if (x.onCollisionStay)
              x.onCollisionStay(collidableTwo)
          })
          gameObjectTwo.components.forEach(x => {
            if (x.onCollisionStay)
              x.onCollisionStay(collidableOne)

          })
          if (this.frameCollisionOver.findIndex(x => this.collisionPairMatch(x, collisionPair)) == -1) {
            this.frameCollisionOver.push(collisionPair);
            gameObjectOne.components.filter(x => x.onCollisionEnter).forEach(x => {
              x.onCollisionEnter(collidableTwo)
            })
            gameObjectTwo.components.filter(x => x.onCollisionEnter).forEach(x => {
              x.onCollisionEnter(collidableOne)
            })
          }
        }
        else {
          let index = this.frameCollisionOver.findIndex(x => this.collisionPairMatch(x, collisionPair))
          if (index != -1) {
            this.frameCollisionOver.splice(index, 1);
            gameObjectOne.components.filter(x => x.onCollisionExit).forEach(x => {
              x.onCollisionExit(collidableTwo)
            })
            gameObjectTwo.components.filter(x => x.onCollisionExit).forEach(x => {
              x.onCollisionExit(collidableOne)
            })
          }
        }
      }
    }
  }
  collisionPairMatch(one, two) {
    return (one.one.gameObject.uuid == two.one.gameObject.uuid &&
      one.two.gameObject.uuid == two.two.gameObject.uuid) ||
      (one.one.collider.uuid == two.one.collider.uuid &&
        one.two.collider.uuid == two.two.collider.uuid);
  }
}

export default CollisionPlugin;