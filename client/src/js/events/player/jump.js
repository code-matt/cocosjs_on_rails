'use strict'

export class JumpEventHandler {
  constructor (eventManager) {
    this.eventManager = eventManager
  }

  send () {

  }

  receive (data) {
    console.log('someone jumped')
    console.log(data)
  }
}
