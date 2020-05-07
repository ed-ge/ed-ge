
![Unit Test](https://github.com/ed-ge/ed-ge/workflows/Unit%20Test/badge.svg)
![JSDoc](https://github.com/ed-ge/ed-ge/workflows/JSDoc/badge.svg?branch=master)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![codebeat badge](https://codebeat.co/badges/4d653397-8b7c-42ea-8e3b-bbd537810ed4)](https://codebeat.co/projects/github-com-ed-ge-ed-ge-master)
https://img.shields.io/github/repo-size/ed-ge/ed-ge
# ed-ge

## The EDucational Game Engine

This game engine is designed to prepare students to use a commerical game engine (e.g. Unity). This began as lecture content for a section of Introduction to Game Programming at the University of Nebraska at Omaha, Spring 2020. The state of the code at the end of that semester can be found on the course website [here](https://github.com/CS2510/Spring2020/blob/9199e8ac636461a5a59acff09f5dee9c91b3ddf5/ed-ge-master.zip).

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
