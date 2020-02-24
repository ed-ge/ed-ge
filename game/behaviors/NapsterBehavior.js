import Base from "../../engine/Base.js"
import TileBehavior from "./TileBehavior.js";

export default class NapsterBehavior extends Base.Behavior {
    peons = []
    start() {

    }
    update() {

    }
    select(x, y) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let tile = this.peons[i][j];
                let behavior = tile.getComponent(TileBehavior);
                if (i != x || j != y)
                    behavior.selected = false;
                else
                    behavior.selected = true;
            }
        }
    }
}