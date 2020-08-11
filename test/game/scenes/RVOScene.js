
export default `
RVOScene

MainCamera Camera
15, 0
8,8
CameraComponent
-backgroundColor=white

Spawner1 Rectangle
-40, 10
SpawnBehavior
-goalX=300
-color=yellow
RectangleComponent
-width=5
-height=25
-fill=yellow
-stroke=transparent
AABBCollider
-width=5
-height=25

Spawner2 Rectangle
90, 10
SpawnBehavior
-goalX=-100
-color=blue
RectangleComponent
-width=5
-height=25
-fill=blue
-stroke=transparent
AABBCollider
-width=5
-height=25

MainController Empty
BackToStartSceneBehavior

Controller RVOSimulator
0, 0

Agent RVOAgent
0, 10
RVOAgent
-destination={"x":300, "y":10}

Agent RVOAgent
50, 11
RVOAgent
-destination={"x":-100, "y":11}

Wall RVOObstacle
25, 0
30, 1

Wall RVOObstacle
25, 25
30, 1

Obstacle Rectangle
25, 12
AABBCollider
-width=1
-height=1
RectangleComponent
-width=1
-height=1
`