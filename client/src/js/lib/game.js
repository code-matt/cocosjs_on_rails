import { Timer } from './timer'
import { Ghost } from './ghost'

function Game ({options}) {
  const players = new Map()
  const serverGhosts = new Map()
  const localGhosts = new Map()
  let localPlayer = null
  let started = false
  let eventsFired = []
  const timer = new Timer()
  timer.start()

  function getTime () {
    return timer.getTime()
  }

  function addPlayer (player, playersController) {
    players.set(player.getId(), player)
    var player_cc_data = playersController.getPlayerById(player.getId())
    const { x, y } = player_cc_data.body.p
    const serverGhost = new Ghost({ id: player.getId(), x, y, width: 64, height: 64 })
    serverGhosts.set(player.getId(), serverGhost)
  }

  function removePlayer (playerId, playersController) {
    var player_cc_data = playersController.getPlayerById(playerId)
    var player = this.getPlayerById(playerId)
    player_cc_data.space.removeShape(player_cc_data.shape)
    player_cc_data.space.removeBody(player_cc_data.body)
    player_cc_data.sprite.removeFromParent()
    playersController.players.delete(playerId)
    serverGhosts.delete(playerId)
    players.delete(playerId)
  }

  function getPlayerById (playerId) {
    return players.get(playerId)
  }

  function getPlayers () {
    return players.values()
  }

  function isStarted () {
    return started
  }

  function start () {
    started = true
  }

  function setLocalPlayer (player) {
    localPlayer = player
  }

  function getLocalPlayer (player) {
    return localPlayer
  }

  function getGhosts () {
    return serverGhosts.values()
  }

  function getGhostById (playerId) {
    return serverGhosts.get(playerId)
  }

  return Object.freeze({
    isStarted,
    start,
    getPlayers,
    getLocalPlayer,
    setLocalPlayer,
    getGhosts,
    getGhostById,
    addPlayer,
    removePlayer,
    getTime,
    getPlayerById
  })
}

export { Game }

