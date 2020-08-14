import Component from "../base/Component.js"

class PeerClient extends Component {
  constructor() {
    super();
  }
  start() {
    console.log("Start client")
    this.peer = new Peer(null, {debug:2});
    var conn = this.peer.connect('aeuaeouaoeuaeu')
    conn.on('open', function () {
      conn.send("Bye, Harry")
    })
    this.peer.on('error', function(error){
      console.log(error);
    })
    conn.on('error', function(error){
      console.log(error);
    })
  }
  update() {
    // console.log("Peer client");
  }
}

export default PeerClient;