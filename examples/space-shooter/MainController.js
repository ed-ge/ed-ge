
export default class UFOBulletController extends Base.Behavior {
  start() {
    this.speed = 1;
    this.elapsedTime = 0;
  }

  update() {
    this.elapsedTime += Base.Time.deltaTime;
    let baseX = 0;
    let baseY = -500
    if (this.elapsedTime > this.speed) {
      this.elapsedTime = 0;


      let x = ((Math.random() - .5) * 2) * 400 + baseX;
      let y = ((Math.random() - .5) * 2) * 100 + baseY;
      let UFO = Base.Serializer.instantiate(Base.SceneManager.Prefabs.UFO, Base.$$, new Point(x, y));

      //Create a random star field

    }
    if (Math.random() < .99) {
      let star1 = Base.SceneManager.Prefabs.Star1;
      let star2 = Base.SceneManager.Prefabs.Star2;
      this.stars = [star1, star2];

      let x = ((Math.random() - .5) * 2) * 400 + baseX;
      let y = ((Math.random() - .5) * 2) * 100 + baseY;
      let starIndex = Math.floor(Math.random() * this.stars.length);
      let starChosen = this.stars[starIndex];

      let star = Base.Serializer.instantiate(starChosen, Base.$$, new Point(x, y));
    }
  }
}

