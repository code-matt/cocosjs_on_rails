function Player ({ sprite, id, name, x = 0, y = 0, width = 64, height = 64, speed = 50, onEvent }) {
  const position = { x, y }
  const previousState = {
    position: { x, y }
  }
  let spriteObj = sprite
  let inputs = []
  let lastInputSeq = 0

  function getLastInputSeq () {
    return lastInputSeq
  }

  function setLastInputSeq (value) {
    lastInputSeq = value
  }

  function getSprite () {
    return spriteObj
  }

  function getId () {
    return id
  }

  function getName () {
    return name
  }

  function setPosition (x, y) {
    spriteObj.body.p.x = x
    spriteObj.body.p.y = y
  }

  function getPosition () {
    return Object.assign({}, spriteObj.body.p)
  }
  function pushInput (input) {
    inputs.push(input)
  }

  function getInputs () {
    return inputs
  }

  function getSpeed () {
    return speed
  }

  function getWidth () {
    return width
  }

  function getHeight () {
    return height
  }

  function clearInputs (numberToClear) {
    if (typeof numberToClear === 'undefined') {
      inputs = []
    } else {
      inputs.splice(0, numberToClear)
    }
  }
  function setPreviousState (state) {
    Object.assign(previousState, state)
  }

  function getPreviousState () {
    return Object.assign({}, previousState)
  }

  function getLatestInputs () {
    return inputs.filter(input => {
      return input.seq > lastInputSeq
    })
  }
  return Object.freeze({
    getId,
    getName,
    getSprite,
    getPosition,
    pushInput,
    getInputs,
    getLatestInputs,
    getWidth,
    getHeight,
    setLastInputSeq,
    getLastInputSeq,
    getPreviousState,
    setPosition,
    setPreviousState,
    clearInputs
  })
}

export { Player }
