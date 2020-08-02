export default `
MouseScene

MainCamera Camera
300, 300
CameraComponent
-backgroundColor=white
CameraMover

Canvas Canvas
{
Text Text
150, 150
MouseText

Rectangle Rectangle
0, 0
ClickBehavior
}

Rectangle Rectangle
300, 300
ClickBehavior

Rectangle Rectangle
200, 200
ClickBehavior

Rectangle Rectangle
200, 300
ClickBehavior

Rectangle Rectangle
300, 200
ClickBehavior

MainController Empty
100, 100
BackToStartSceneBehavior
`