import Base from "../../../src/Base.js"
import TouchDelta from "./TouchDelta.js"
import MainController from "./MainController.js"
import DeckLogic from "./DeckLogic.js"
import CardComponent from "./CardComponent.js"
import DeckSizeText from "./DeckSizeText.js"
import SelectableCard from "./SelectableCard.js"
import GhostCard from "./GhostCard.js"
import DeckDownComponent from "./DeckDown.js"
import DeckUpComponent from "./DeckUp.js"

let Scenes = {
  startScene: "StartScene",
  allScenes: [
`
StartScene

P1Decks Empty
-100,200
<
P1Life DeckDown
-220,0
<
P1Life Text
-40,-55
TextComponent
 text=P1

P1Life2 Text
-10,-55
TextComponent
 text=Life
DeckSizeText
>

P1Draw DeckDown
-60,0
<
P1Life Text
-40,-55
TextComponent
 text=P1

P1Life2 Text
-10,-55
TextComponent
 text=Draw
DeckSizeText
>

P1Discard DeckUp
100,0
<
P1Life Text
-40,-55
TextComponent
 text=P1

P1Life2 Text
-10,-55
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
-100,-200
<
P2Life DeckDown
-220,0
<
P2Life Text
-40,-55
TextComponent
 text=P2

P2Life2 Text
-10,-55
TextComponent
 text=Life
DeckSizeText
>

P2Draw DeckDown
-60,0
<
P2Life Text
-40,-55
TextComponent
 text=P2

P2Life2 Text
-10,-55
TextComponent
 text=Draw
DeckSizeText
>

P2Discard DeckUp
100,0
DeckLogic
<
P2Life Text
-40,-55
TextComponent
 text=P2

P2Life2 Text
-10,-55
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

let GameBehaviors = {
  TouchDelta, 
  MainController, 
  DeckLogic, 
  DeckDownComponent,
  DeckUpComponent,
  CardComponent,
  DeckSizeText, 
  SelectableCard, 
  GhostCard}

let CardLike = 
`
CardLike Rectangle
0,0
.714,1
`;

let Card = `
Card CardLike
CardComponent
SelectableCard
TouchDelta
TextComponent
  font=20pt Times
`
let Deck =
`
Deck CardLike
`
let DeckDown = `
DeckDown Deck
DeckDownComponent
DeckLogic
RectangleComponent
 fill=azure
 stroke=red
`

let DeckUp = `
DeckUp Deck
DeckUpComponent
DeckLogic
RectangleComponent
 fill=pink
 stroke=blue
`

let Prefabs = { CardLike,Card,Deck,DeckDown,DeckUp };
Base.Main = Base.main(Prefabs, GameBehaviors, Scenes);
