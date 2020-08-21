export default `
UpdatePlugin
DrawPlugin
CollisionPlugin
MouseCollisionPlugin
TouchCollisionPlugin

SceneTwoB

counter Text
10, 80
TextComponent
-text=B

timer Timer
10, 40
CountDownTimer
-toSceneText=SceneTwo

MainController Empty
100, 100
BackToStartSceneBehavior
`