export default `
UpdatePlugin
DrawPlugin

SceneTwo

counter Text
10, 80
TextComponent
-text=A

timer Timer
10, 40
CountDownTimer
-toSceneText=SceneTwoB

MainController Empty
100, 100
BackToStartSceneBehavior
`