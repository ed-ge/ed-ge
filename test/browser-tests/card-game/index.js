import Base from "../../../src/Base.js"
import TouchDelta from "./TouchDelta.js"
import MainController from "./MainController.js"
import DeckLogic from "./DeckLogic.js"
import CardComponent from "./CardComponent.js"
import DeckSizeText from "./DeckSizeText.js"

let Scenes = {
  startScene: "StartScene",
  allScenes: [
`
StartScene

P1Decks Empty
-400,200
<
P1Life DeckDown
-150,0
<
P1Life Text
0,-20
TextComponent
 text=P1

P1Life2 Text
0,20
TextComponent
 text=Life
DeckSizeText
>

P1Draw DeckDown
-60,0
<
P1Life Text
0,-20
TextComponent
 text=P1

P1Life2 Text
0,20
TextComponent
 text=Draw
DeckSizeText
>

P1Discard DeckUp
100,0
<
P1Life Text
0,-20
TextComponent
 text=P1

P1Life2 Text
0,20
TextComponent
 text=Discard
DeckSizeText
>
P1Hand Empty
250,-75
<
P1HandText Text
TextComponent
 text=P1 Hand
>
>

P2Decks Empty
-400,-200
<
P2Life DeckDown
-150,0
<
P2Life Text
0,-20
TextComponent
 text=P2

P2Life2 Text
0,20
TextComponent
 text=Life
DeckSizeText
>

P2Draw DeckDown
-60,0
<
P2Life Text
0,-20
TextComponent
 text=P2

P2Life2 Text
0,20
TextComponent
 text=Draw
DeckSizeText
>

P2Discard DeckUp
100,0
<
P2Life Text
0,-20
TextComponent
 text=P2

P2Life2 Text
0,20
TextComponent
 text=Discard
DeckSizeText
>
P2Hand Empty
250,-50
<
P2HandText Text
TextComponent
 text=P2 Hand
>
>





MainCamera Camera

MainController Empty
MainController
`
  ]
}

let GameBehaviors = {TouchDelta, MainController, DeckLogic, CardComponent, DeckSizeText}

let CardLike = 
`
CardLike Rectangle
0,0
.714,1
`;

let Card = `
Card CardLike
CardComponent
TouchDelta
TextComponent
`
let Deck =
`
Deck CardLike
DeckLogic
`
let DeckDown = `
DeckDown Deck
RectangleComponent
 fill=azure
 stroke=red
`

let DeckUp = `
DeckUp Deck
RectangleComponent
 fill=pink
 stroke=blue
`

let Prefabs = { CardLike,Card,Deck,DeckDown,DeckUp };
Base.Main = Base.main(Prefabs, GameBehaviors, Scenes);
