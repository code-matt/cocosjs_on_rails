import { Observable } from 'rxjs/Rx'

class WSClient {
  constructor () {
    this.conn = null
    var N = 16
    this.randChannelId = (Math.random().toString(36) + '00000000000000000').slice(2, N + 2)
  }

  connect () {
    this.conn = new WebSocket('ws://localhost:3000/cable')
    var obj = this
    this.conn.onopen = (evt) => {
      this.conn.send(JSON.stringify({ command: 'subscribe', identifier: JSON.stringify({ channel: 'PlayersChannel', id: obj.randChannelId }), type: 'confirm_subscription' }))
      this.conn.send(JSON.stringify({ command: 'subscribe', identifier: JSON.stringify({ channel: 'PlayersChannel'}), type: 'confirm_subscription' }))
    }
    return Observable.create(observer => {
      this.conn.onmessage = (evt) => {
        observer.next(evt)
      }
    })
    .map(res => JSON.parse(res.data))
    .share()
  }
  send (msg) {
    return this.conn.send(msg)
  }
}

export { WSClient }
