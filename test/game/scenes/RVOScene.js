
export default `
RVOScene
  
Main Camera Camera
15, 0
8,8
CameraComponent
 backgroundColor=white
  
Spawner1 Rectangle
-40, 10
SpawnBehavior
   goalX=300
   color=yellow
RectangleComponent
  width=5
  height=25
  fill=yellow
  stroke=transparent
AABBCollider
 width=5
 height=25
  
Spawner2 Rectangle
90, 10
SpawnBehavior
 goalX=-100
 color=blue
RectangleComponent
 width=5
 height=25
 fill=blue
 stroke=transparent
AABBCollider
 width=5
 height=25

MainController Empty
BackToStartSceneBehavior

Controller RVOSimulator
0, 0

Agent RVOAgent
0, 10
RVOAgent
 destination={"x":300, "y":10}

Agent RVOAgent
50, 11
RVOAgent
 destination={"x":-100, "y":11}

Obstacle RVOObstacle
25, 0
30, 1

Obstacle RVOObstacle
25, 25
30, 1
`