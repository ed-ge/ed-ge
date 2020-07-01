
export default `
TouchScene

Main Camera Camera
300, 300
CameraComponent
 backgroundColor=lightgray

Canvas Canvas
+Text Text
150, 150
 TouchText
+Text ScreenText
0, 0
RectTransform
 anchorHorizontal=center 
 anchorVertical=middle

Rectangle Rectangle
300, 300
TouchDelta

Rectangle Rectangle
400, 400
TouchStart

Rectangle Rectangle
500, 500
TouchEnd

Main Controller Empty
BackToStartSceneBehavior
`