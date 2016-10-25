'use strict'

export class EventManager{
  constructor(mainScene){
    this.mainScene = mainScene
    this.game = mainScene.game
    this.conn = mainScene.conn
    this.plContr = mainscene.playersController
    this.events = new Map()
  }
  processNetworkEvents(events){
    //
  }
}
//double jump event to test

//map holds events,every event should have a uniqueId and a event-template object

//local-events-networked
  //When fired, get sent to 'event' channel with whatever arguments they need for the server
  //to figure out the outcome and broadcast networkevent to all clients


//network events
  //Go through events included with each state update. queue the next batch if 
  //the first is not done processing yet.

//events could have their own update loop every 5ms. If there are any to be itterated over
//waiting in the Map object, their 'fire' event is called.

//if there is a duration, deal with timing.

