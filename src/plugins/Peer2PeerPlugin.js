import Base from "../Base.js"
import Component from "../base/Component.js"
// import * as Peer from "../../lib/peerjs/peerjs.min.js"
class Peer2PeerPlugin{
  constructor(){
    this.firstUpdate = false;
    
  }
  update(){
    if(!this.firstUpdate){
      this.firstUpdate = false;
     
    }
    
  }
  getServer(){
    return new Peer();
  }
  getClient(){
    return null;
  }
}

export default Peer2PeerPlugin;