import Point from "./Point.js"

class Matrix3 {
    get m11() { return this.m[0][0] };
    get m12() { return this.m[0][1] };
    get m13() { return this.m[0][2] };

    get m21() { return this.m[1][0] };
    get m22() { return this.m[1][1] };
    get m23() { return this.m[1][2] };

    get m31() { return this.m[2][0] };
    get m32() { return this.m[2][1] };
    get m33() { return this.m[2][2] };

    get translation(){
        return new Point(this.at(2,0), this.at(2,1));
    }
    set translation(point){
        if(!point instanceof Point) throw new Error("You must set translation to be of type Point");
        this.set(2,0,point.x);
        this.set(2,1,point.y);

    }
    get scale(){
        let a = this.at(0,0);
        let b = this.at(1,0);
        let d = this.at(0,1);
        let e = this.at(1,1);
        let scaleX = Math.sqrt(a*a+d*d);
        let scaleY = Math.sqrt(b*b+e*e);

        return new Point(scaleX, scaleY);

    }
    set scale(point){
        if(!point instanceof Point) throw new Error("You must set scale to be of type Point");
        //We first have to get the scale we currently have and reinsert the new one
        let t = this.translation;
        let r = this.rotation;
        this.from(t.x, t.y, point.x, point.y, r);

    }
    get rotation(){
        let a = this.at(0,0);
        let d = this.at(0,1);
        let scaleX = Math.sqrt(a*a+d*d);
        let r = Math.acos(a/scaleX);
        return r;
    }
    set rotation(r){
        if(isNaN(r)) throw new Error("You must set rotation to be a number");
        let t = this.translation;
        let s = this.scale;
        this.from(t.x, t.y, s.x, s.y, r);
    }

    constructor() {
        this.m = [];
        for (let y = 0; y < 3; y++) {
            let row = [];
            this.m.push(row)
            for (let x = 0; x < 3; x++) {
                row.push(y == x ? 1 : 0);
            }
        }
    }
    at(r, c) {
        if (arguments.length != 2 ||
            isNaN(r) ||
            isNaN(c) ||
            r < 0 || r > 2 ||
            c < 0 || c > 2)
            throw new Error("at requires two arguments which are both [0,2].")

        return this.m[r][c];
    }
    set(r, c, value) {
        if (arguments.length != 3 ||
            isNaN(r) ||
            isNaN(c) ||
            isNaN(value) ||
            r < 0 || r > 2 ||
            c < 0 || c > 2)
            throw new Error("at requires three arguments, the first two are both [0,2] and the third is a number.")

        this.m[r][c] = value;
    }
    from(x,y,scaleX, scaleY, r){
        if(arguments.length != 5 || isNaN(x) || isNaN(y) || isNaN(scaleX) || isNaN(scaleY) || isNaN(r)) throw new Error("from requires five numeric arguments");

        this.set(2,0,x);
        this.set(2,1,y);

        this.set(0,0, Math.cos(r));
        this.set(1,1, Math.cos(r));
        this.set(1,0, -Math.sin(r));
        this.set(0,1, Math.sin(r));

        this.set(0,0, this.at(0,0) * scaleX);
        this.set(0,1, this.at(0,1) * scaleX);
        this.set(1,0, this.at(1,0) * scaleY);
        this.set(1,1, this.at(1,1) * scaleY);


    }
    mult(value) {
        if (value instanceof Point && arguments.length == 1) {
            return this.multPoint(value);
        }
        else if (value instanceof Matrix3 && arguments.length == 1) {
            return this.multMatrix3(value);
        }
        throw new Error("mult requires 1 argument that is either a Point or a Matrix3.")
    }
    multPoint(point) {
        if (!point instanceof Point || arguments.length != 1) {
            throw new Error("multPoint takes exactly one argument of type Point.")
        }

        let matrix = [point.x, point.y, 1];

        let done = [];
        for(let y= 0; y < 3; y++){
            let sum = 0;
            for(let i = 0; i < 3; i++){
                let a = this.at(i,y);
                let b = matrix[i];
                let product = a*b;
                sum += product;
            }
            done.push(sum);
        }

        //Handle the w value if it's not 1
        done[0]/=done[2];
        done[1]/=done[2];

        let toReturn = new Point(done[0], done[1]);
        return toReturn;

    }
    multMatrix3(matrix) {
        if (!matrix instanceof Matrix3 || arguments.length != 1) {
            throw new Error("multMatrix takes exactly one argument of type Matrix3.")
        }

        let toReturn = new Matrix3();

        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                let newValue = 0;
                for(let i = 0; i < 3; i++){
                    let a = this.at(i,y);
                    let b = matrix.at(x,i);
                    let product = a*b;
                    newValue += product;
                }
                toReturn.set(x,y,newValue)
            }
        }

        return toReturn;
    }
    equals(matrix) {
        if (!matrix instanceof Matrix3 || arguments.length != 1) {
            throw new Error("equals takes exactly one argument of type Matrix3.")
        }

        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                if (matrix.at(x, y) != this.at(x, y))
                    return false;
            }
        }
        return true;
    }
}

export default Matrix3;