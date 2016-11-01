'use strict'
import { NinjaLayerTemplate } from '../cc-templates/players-layer'
import { COLLISION_TYPES } from '../lib/collision-templates/config'
import { AnimationManager } from '../lib/animation'

export class PlayersController {
  constructor (space) {
    this.space = space
    this.ninjaLayer = new NinjaLayerTemplate(space)
    this.animationManager = new AnimationManager()
    this.ninjas = new Map()
  }
  addPlayer (playerId) {
    var spawnY = 200
    var spawnX = 200
    var sprite = this.animationManager.addPlayer(playerId)
    var contentSize = sprite.getContentSize()
    var body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height))
    body.p = cc.p(spawnX, spawnY)
    this.space.addBody(body)
    var shape = new cp.BoxShape(body, contentSize.width, contentSize.height)
    shape.playerId = playerId
    this.space.addShape(shape)
    sprite.setBody(body)
    this.ninjaLayer.addChild(sprite)
    this.ninjas.set(playerId, {
      body: body,
      sprite: sprite,
      space: this.space,
      shape: shape,
      animation_action: null,
      animation_action_name: null
    })
    shape.setCollisionType(COLLISION_TYPES['player'])
    return sprite
  }

  getPlayerById (playerId) {
    return this.ninjas.get(playerId)
  }

  setAnimation (player, animName) {
    var action = player.sprite.animationManager.loadedActions.get(animName)
    player.sprite.runAction(action)
    player.animation_action = action
    player.animation_action_name = animName
  }

  stopAnimation (player) {
    player.sprite.stopAction(player.animation_action)
  }

  calcAnimationState (velocity) {
    if (velocity.vx > 1) {
      return 'running_r'
    } else {
      return 'standing'
    }
  }
  setAnimationState (velocity, player) {
    var nextAnim = this.calcAnimationState(velocity)
    if (player.animation_action_name !== nextAnim) {
      this.stopAnimation(player)
      this.setAnimation(player, nextAnim)
    }
  }
}
