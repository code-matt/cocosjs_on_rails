'use strict';
import { NinjaLayerTemplate } from '../cc-templates/players-layer'
import { COLLISION_TYPES } from '../lib/collision-templates/config'
import { AnimationController } from '../lib/animation'

export class PlayersController{
    constructor(space){
        this.space = space
        this.ninjaLayer = new NinjaLayerTemplate(space)
        this.ninjas = new Map()
    }
    addPlayer(playerId){
        var spawnY = 200;
        var spawnX = 200;
        // var sprite = new cc.PhysicsSprite("img/box.png");
        cc.spriteFrameCache.addSpriteFrames("img/player_char.plist");
        var sprite = new cc.PhysicsSprite("#player_char_65.png");
        var contentSize = sprite.getContentSize();
        var body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        body.p = cc.p(spawnX, spawnY);
        this.space.addBody(body);
        var shape = new cp.BoxShape(body, contentSize.width, contentSize.height);
        shape.playerId = playerId
        this.space.addShape(shape);
        sprite.setBody(body);
        this.ninjaLayer.addChild(sprite);
        this.ninjas.set(playerId,{
            body: body,
            sprite: sprite,
            space: this.space,
            shape: shape
        })
        shape.setCollisionType(COLLISION_TYPES['player'])
        return sprite    
    }

    getPlayerById (playerId) {
        return this.ninjas.get(playerId);
    }
}