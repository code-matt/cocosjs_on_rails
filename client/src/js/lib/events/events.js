'use strict'

import { JumpEventHandler } from '../../events/player/jump'
import { Observable } from 'rxjs/Rx'

export class EventManager {
  constructor (connection, playersController) {
    this.connection = connection
    this.plCont = playersController

    this.eventHandlers = new Map()

    this.eventQueue = []

    this.loadEventHandlers()
    this.timer = Observable.timer(0, 0.045)
    this.timer.subscribe(t => this.update())
  }

  update () {
    // pop events off the queue and pass them to the correct handler?
  }

  loadEventHandlers () {
    this.eventHandlers.set('jump', new JumpEventHandler(this))
  }

  receiveEvents (data) {
    // iterate through events that come in from server push them into the queue
    // events have and id,type and args which could be an empty array or not?
  }

  sendEvent (event, args) {
    this.connection.send(
      JSON.stringify({
        command: 'message',
        identifier: JSON.stringify({ channel: 'PlayersChannel', id: this.conn.randChannelId }),
        data: JSON.stringify({
          action: 'event',
          id: this.conn.randChannelId,
          event: event,
          args: args})
      }))
  }
}
