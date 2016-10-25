'use strict';

import { PlayerStatic } from './collision-templates/player-static'

export class CollisionManager{
  constructor(mainScene){
    this.mainScene = mainScene
    this.space = mainScene.space
    this.collisionTypes = []
    this.collisionTypes.push(new PlayerStatic(this.mainScene))
  }
}