'use strict';

import {PlayerAnimations} from '../animations/player.js'

export class AnimationManager{
  constructor(){
    this.animationTypes = new Map();
    this.animationTypes.set("PlayerAnimations", PlayerAnimations);
    this.loadAnimations()
  }

  getAnimByName(){

  }

  loadAnimations(){
    // debugger
    // var types = this.animationTypes.keys();
    // for (let type in types){
    //   var animations = this.animationTypes.get(type).keys()
    //   for (let animation in animations){
    //     var data = this.animationTypes[type][animation]
    //     console.log(data)
    //   }
    // }
    this.animationTypes.forEach(function (data, type) {
      cc.spriteFrameCache.addSpriteFrames(data.plist);
      // this.spriteSheet = new cc.SpriteBatchNode(res.runner_png);
    })
  }
  loadPlayer(){
    
  }
}