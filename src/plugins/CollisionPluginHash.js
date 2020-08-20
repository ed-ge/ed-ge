import Base from "../Base.js"
import Point from "../base/Point.js";

class CollisionPluginHash {
  constructor() {
    this.frameCollisionOver = [];
    this.hashTable = [];
  }
  addToHash(a) {
    let boundingRectangle = {};
    boundingRectangle.x = a.gameObject.worldLocation.x;
    boundingRectangle.y = a.gameObject.worldLocation.y;
    if (a.collider.type == "AABBCollider") {
      boundingRectangle.width = a.collider.width * a.gameObject.worldScale.x;
      boundingRectangle.height = a.collider.height * a.gameObject.worldScale.y;
    }
    else if (a.collider.type == "CircleCollider") {
      boundingRectangle.width = a.collider.radius * 2 * a.gameObject.worldScale.x;
      boundingRectangle.height = a.collider.radius * 2 * a.gameObject.worldScale.y;

    }
    else {
      console.error("Unknown collider type in hash function")

    }


    let gridWidth = 10;

    let left = boundingRectangle.x - boundingRectangle.width / 2;
    let right = boundingRectangle.x + boundingRectangle.width / 2;
    let top = boundingRectangle.y - boundingRectangle.height / 2;
    let bottom = boundingRectangle.y + boundingRectangle.height / 2;

    left = Math.floor(left / gridWidth) * gridWidth;
    right = Math.floor(right / gridWidth) * gridWidth;
    top = Math.floor(top / gridWidth) * gridWidth;
    bottom = Math.ceil(bottom / gridWidth) * gridWidth;
    a.hashEntries = new Set();
    for (let x = left; x <= right; x += gridWidth) {
      for (let y = top; y <= bottom; y += gridWidth) {
        let toAdd = new Point(x, y);
        let h = this.hash(toAdd);
        a.hashEntries.add(h);
      }
    }
    a.hashEntries = [...a.hashEntries];

  }
  hash(point) {
    return Math.abs(Math.floor(point.x) + Math.floor(point.y));
  }
  update() {
    //
    //First we do collisions
    //

    let collidableType = Base.Serializer.components.Collider;
    let collisionHelper = Base.Serializer.components.CollisionHelper;

    //Add collision behavior
    // let collidableChildren = Base.$$.allWithComponent(collidableType).map(x=>{return{collider:x.component, gameObject:x.gameObject}});

    let collidableChildren = Base.$$.allWithComponent(collidableType).map((x, i) => { return { collider: x.component, gameObject: x.gameObject, index: i } });
    this.hashTable = [];
    collidableChildren = collidableChildren.filter(x => !x.gameObject.anyComponent(Base.Serializer.components.GUIOnlyCollider));
    // collidableChildren.forEach(x => this.addToHash(x));
    for (let i = 0; i < collidableChildren.length; i++) {
      this.addToHash(collidableChildren[i])
    }


    let UUIDs = collidableChildren.sort((a, b) => a.index - b.index);

    for (let k = 0; k < UUIDs.length; k++) {
      let collidableOne = UUIDs[k];
      //for (let i = 0; i < collidables.length; i++) {
      //let collidableOne = collidables[i];
      let gameObjectOne = collidableOne.gameObject;


      //Find potential matches based on uuid and hashes
      let potentialMatches = UUIDs.filter(x => x.index > collidableOne.index);
      potentialMatches = potentialMatches.filter(x => _.intersection(x.hashEntries, collidableOne.hashEntries).length > 0);

      //let isInScreenSpaceOne = gameObjectOne.hasParentWithComponent(Base.Components.CanvasComponent);
      for (let j = 0; j < potentialMatches.length; j++) {
        let collidableTwo = potentialMatches[j];
        let gameObjectTwo = collidableTwo.gameObject;
        //let isInScreenSpaceTwo = gameObjectTwo.hasParentWithComponent(Base.Components.CanvasComponent);
        //if (isInScreenSpaceOne != isInScreenSpaceTwo) break;
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

export default CollisionPluginHash;