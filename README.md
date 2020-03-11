# ed-ge

## The EDucational Game Engine

This game engine is designed to prepare students to use a commerical game engine (e.g. Unity).

There are two .html files. index.html uses the production folder that has been transpiled by babel. This should run on most browsers, but the code is difficult to debug and is not fulfill its educational purpose. dev.html on the other hand has not been transpiled but runs only on Chrome or the Firefox nightly build. The code is much easier to debug and fufills the educational goals of this project.

## Educational Game Engine Goals

Below are the goals for this project. Note that not all of them are complete yet.

* Use a Scene/Game Object/Component/Behavior system that mirrors Unity
* Handle keyboard and mouse events in a way that matches Unity
* Only allow code in Behaviors
* Allow Scenes to have both prefabs and game objects defined on the fly
* Clearly show the game loop
* Clearly show the scene graph
* Use a collision system that mirrors Unity
    * Use collider components
    * Include both a collision event and collision polling system
* Include a basic discrete physics system
* Clearly document the code
