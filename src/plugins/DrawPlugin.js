import Base from "../Base.js"
class DrawPlugin{
  constructor(){

  }
  
  draw(ctx, width, height) {
    if (arguments.length != 3 ||
      !(typeof ctx == 'object') ||
      !(typeof width == 'number') ||
      !(typeof height == 'number')) throw new Error("draw expects exactly three arguments of type object, number, and number")

    //Before we draw, see if we have a camera game object and use that
    ctx.save();
    let tx = 0, ty = 0, sx = 1, sy = 1, r = 0, hx = 0, hy = 0;
    let children = Base.$$.children;
    let cameras = children.filter(i => i.anyComponent("CameraComponent"))
    if (cameras.length == 0) {
      //You really should add a camera
      //console.log("You should add a camera to the scene. C'mon.")
      ctx.fillStyle = "cyan";
      ctx.fillRect(0, 0, width, height)
    }
    else {
      if (cameras.length > 1)
        console.log("More than 1 camera detected in the scene. You should only have exactly one root game object with a camera component attached.")
      let camera = cameras[0];
      let cameraComponent = camera.getComponent("CameraComponent")
      ctx.fillStyle = cameraComponent.backgroundColor;
      ctx.fillRect(0, 0, width, height);
      [tx, ty, sx, sy, r, hx, hy] = [camera.x, camera.y, camera.scaleX, camera.scaleY, camera.rotation, width / 2, height / 2];

    }

    ctx.translate(hx, hy)
    ctx.rotate(r)
    ctx.scale(sx, sy)
    ctx.translate(-tx, -ty)

    //Draw children that are not in screen space
    //Sort them by layer
    children.filter(i => i.draw && !i.anyComponent("CanvasComponent") && i.layer == "Background").forEach(i => i.draw(ctx));
    children.filter(i => i.draw && !i.anyComponent("CanvasComponent") && !i.layer).forEach(i => i.draw(ctx));
    children.filter(i => i.draw && !i.anyComponent("CanvasComponent") && i.layer == "default").forEach(i => i.draw(ctx));
    children.filter(i => i.draw && !i.anyComponent("CanvasComponent") && i.layer == "Foreground").forEach(i => i.draw(ctx));

    ctx.restore();

    //We're now back in screen space. It's time to draw any GUI components
    //if we have a gameObject with an attached CanvasComponent
    ctx.save();
    let canvases = children.filter(i => i.anyComponent("CanvasComponent"))
    if (canvases.length == 0) {
      //You really should have *something* in screen space
      //console.log("You don't have a canvas object. That means you can't draw anything in screen space.");
    }
    else {
      if (canvases.length > 1) {
        console.log("More than 1 canvas object found in the root of your scene graph. You should only have exactly one game object with a canvas component. The other object(s) and its children will not be rendered.")
      }
      let canvas = canvases[0];
      canvas.draw(ctx);
    }
    ctx.restore();

    Base.$$.lastCtx = ctx;
  }
}

export default DrawPlugin;