'use strict';

import { COLLISION_TYPES } from './config.js'

export class PlayerStatic {
  constructor(mainScene){
    this.space = mainScene.space
    this.space.addCollisionHandler(
      COLLISION_TYPES['player'],
      COLLISION_TYPES['static'],
      this.onCollide.bind(this),
      null,null,null)
  }

  onCollide(arbiter){
    return true
  }

} 
