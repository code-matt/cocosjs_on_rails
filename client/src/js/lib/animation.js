'use strict'

import {PlayerAnimations} from '../animations/player.js'

export class AnimationManager {
  constructor () {
    this.animationTypes = new Map()
    this.loadedActions = new Map()
    this.animationTypes.set('PlayerAnimations', PlayerAnimations)
    this.loadAnimations()
  }

  loadAnimations () {
    var loadedActions = this.loadedActions
    this.animationTypes.forEach(function (data, type) {
      cc.spriteFrameCache.addSpriteFrames(data.plist)
      for (let animation in data['anims']) {
        var a = data['anims'][animation]
        var animFrames = []
        for (i = a['start_frame']; i <= a['end_frame']; i++) {
          var str = 'player_char_' + (i < 10 ? ('0' + i) : i) + '.png'
          var frame = cc.spriteFrameCache.getSpriteFrame(str)
          animFrames.push(frame)
        }
        var ccAnim = new cc.Animation(animFrames, a['speed'])
        cc.animationCache.addAnimation(ccAnim, animation)
        if (data.looping) {
          var action = cc.RepeatForever.create(new cc.Animate(ccAnim))
          loadedActions.set(animation, action)
        } else {
          var action = cc.Repeat.create(new cc.Animate(ccAnim), 1)
          loadedActions.set(animation, action)
        }
      }
    })
  }
  addPlayer (playerId) {
    var sprite = new cc.PhysicsSprite('#player_char_65.png')
    sprite.animationManager = this
    return sprite
  }
}
