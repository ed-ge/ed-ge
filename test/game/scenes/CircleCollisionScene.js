
export default `
CircleCollisionScene

CollisionCircle CollisionCircle
50, 50
2, 1 

Rectangle Rectangle
150, 50
1, 1

TestCollisionCircle TestCollisionCircle
200, 200 

CollisionCircle CollisionCircle
150, 50
1, 2

Rectangle Rectangle
350, 50 

MainController Empty
100, 100
BackToStartSceneBehavior
`