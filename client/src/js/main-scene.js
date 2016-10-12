import { WSClient } from './lib/client-connection'
import { PlayersController } from './cc-controllers/players-controller'
import { InputHandler } from './input/index'
import { Player } from './lib/player'
import { Game } from './lib/game'

var MainScene = cc.Scene.extend({
    space:null,
    conn:null,
    connected:false,
    ninjaLayer:null,
    inputSeq:0,
    game:null,
    playersController:null,
    onEnter:function () {
        this.conn = new WSClient
        this.conn.connect().subscribe( result => {
            if(!this.connected){
                this.sendJoin()
            }
            if(result["type"] != "ping" && result["message"] != undefined)
            {
                var channel = JSON.parse(result.identifier).channel
            }
            if (channel == "NinjasChannel") {
                var data = JSON.parse(result["message"])
                if(data.action == "state"){
                    if(this.game && this.game.isStarted())
                    {
                        for(let player in data.state.players){
                            //simulate a ping of 200 which I think is a decent limit
                            setTimeout(function(){
                                var player_state = data.state.players[player]
                                var ghost = this.game.getGhostById(player_state.id)
                                ghost.setPosition(player_state.position.x,player_state.position.y)}.bind(this,data),200)
                        }
                    }
                }
                if(data.action == "join" && data.id != this.conn.randChannelId){
                    var new_player = new Player({
                        sprite: this.playersController.addPlayer(data.id),
                        id: data.id,
                        name: "tommy",
                        x: 200,
                        y: 200
                    })
                    this.game.addPlayer(new_player,this.playersController)
                }
                if(data.action == "start"){
                    this.inputHandler = new InputHandler
                    this.game = new Game(this.space,{timerFrequency: (1000 / 250)})
                    var localP = new Player({
                        sprite: this.playersController.addPlayer(this.conn.randChannelId),
                        id: this.conn.randChannelId,
                        name: "tommy",
                        x: 200,
                        y: 200
                    })
                    this.game.setLocalPlayer(localP);
                    this.game.addPlayer(localP,this.playersController)
                    this.setInitialState(data.state.players)
                }
                if(data.action == "leave"){
                    this.game.removePlayer(data.id,this.playersController)
                }
            }
        })
        this._super();
        this.initPhysics();
        this.playersController = new PlayersController(this.space)
        this.ninjaLayer = this.playersController.ninjaLayer
        this.addChild(this.ninjaLayer);
    },
    initPhysics:function() {
        this.space = new cp.Space();
        this.space.iterations = 100
        this.space.gravity = cp.v(0, -350);

        var wallBottom = new cp.SegmentShape(this.space.staticBody,
            cp.v(0, 0),// start point
            cp.v(4000, 0),// MAX INT:4294967295
            0);// thickness of wall
        this.space.addStaticShape(wallBottom);
        return this.space
    },
    update:function (dt) {
        this.updateInput();
        var ghosts = this.game.getGhosts()
        for (const ghost of ghosts){
            var player_cc_data = this.playersController.getPlayerById(ghost.getId())
            var ghost_pos = ghost.getPosition ()
            var nextPos = this.interpolate({
                x:player_cc_data.body.p.x,
                y:player_cc_data.body.p.y
            },{
                x:ghost_pos.x,
                y:ghost_pos.y
            },dt)
            player_cc_data.body.p.x += nextPos.x
            player_cc_data.body.p.y += nextPos.y
            console.log("x" + nextPos.x + "| y" + nextPos.y)
        }
    },
    interpolate(pos1,pos2,dt){
        var differenceX = pos2.x - pos1.x
        var x = differenceX * dt * 20

        var differenceY = pos2.y - pos1.y
        var y = differenceY * dt * 20

        return {x:x,y:y}
    },
    updateInput:function () {
        var localPlayer = this.game.getLocalPlayer()
        if (this.inputHandler.getInput().length > 0 && localPlayer) {
            this.inputSeq += 1;
            localPlayer.pushInput({
                inputs: this.inputHandler.getInput(),
                time: this.game.getTime(),
                seq: this.inputSeq
            });

            if (this.connected) {
                this.sendUpdate(
                    this.inputHandler.getInput(),
                    this.game.getTime(),
                    this.inputSeq)
            }
        }
    },
    setInitialState:function (players){
        for(let player in players){
            var new_player = players[player]
            if (new_player.id != this.conn.randChannelId) {
                var p = new Player({
                    sprite: this.playersController.addPlayer(new_player.id),
                    id: new_player.id,
                    name: new_player.name,
                    x: new_player.position.x,
                    y: new_player.position.y
                })
                this.game.addPlayer(p,this.playersController)
            }
        }
        this.game.start();
        this.scheduleUpdate();
    },
    sendJoin(){
        this.connected = true
        this.conn.send(
            JSON.stringify({
                command: 'message',
                identifier: JSON.stringify({ channel: 'NinjasChannel', id: this.conn.randChannelId }),
                data: JSON.stringify({
                action: 'join',
                id: this.conn.randChannelId})
            })
        )
    },
    sendUpdate(input,time,seq){
        this.conn.send(
            JSON.stringify({
                command: 'message',
                identifier: JSON.stringify({ channel: 'NinjasChannel', id: this.conn.randChannelId }),
                data: JSON.stringify({
                action: 'inputUpdate',
                id: this.conn.randChannelId,
                input: input,
                clientTime: time,
                inputSeq: seq})
            })
        )
    }
});

export { MainScene }