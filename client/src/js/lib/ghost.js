'use strict'

function Ghost ({ id = 0, x = 0, y = 0, vx = 0, vy = 0, width = 64, height = 64 }) {
  const position = { x, y }

  const serverVelocity = { vx, vy }

  function setPosition (x, y) {
    position.x = x
    position.y = y
  }

  function getPosition () {
    return Object.assign({}, position)
  }

  function storeVelocity (vx, vy) {
    serverVelocity.vx = vx
    serverVelocity.vy = vy
  }

  function getServerVelocity () {
    return Object.assign({}, serverVelocity)
  }

  function getWidth () {
    return width
  }

  function getHeight () {
    return height
  }

  function getId () {
    return id
  }

  return Object.freeze({
    getServerVelocity,
    storeVelocity,
    getPosition,
    getWidth,
    getHeight,
    setPosition,
    getId
  })
}

export { Ghost }
