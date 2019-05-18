# cocosjs_on_rails

<img align="right" src="http://i.imgur.com/KA3OaVG.png" />

#### Rails is an authoritative server running chipmunk physics in one thread. Regular updates about state are delivered on another. SuckerPunch gem used for background processing of the physics.

# extreme WIP

[![video][2]][1]

  [1]: https://drive.google.com/file/d/0B30Vmzi9uv6keXFfTC11aHBtS2s/view?usp=sharing
  [2]: http://i.imgur.com/jcXdik2.jpg (hover text)

# ^ click to watch video

## Installation
```
bundle install
rails db:create
cd client
npm install
npm run build
cd ..
rails s
```

## High level overview
#### Backend
There are 3 threads going on
+ Regular rails handling players joining and leaving and delivering the front end assets. Also Rails ActionCable(fancy name for websockets) with five messages currently:
    * subscribed (the client has successfully websocket handshaked)
    * join (now that they are subscribed, the client wishes to join the game)
    * unsubscribed ( the client closed their connection, remove them from the game )
    * inputUpdate ( the client changed their inputs )
    * event (**wip** the client initiated an event )
&nbsp;
+ SuckerPunch job running every 0.045 seconds updating the client over the websocket connection about the state of themselves and all other players
**Think about not broadcasting to everyone and only sending state information to each client about things that are close enough to them to see or affect them.**
&nbsp;
+ SuckerPunch job running every 0.03 seconds stepping the Chipmunk Space simulation forward the same amount of time.

Players input state is sent through the socket, causing their representation on the server to have the same input state. Thread number three above constantly looking at the state of their server representation's inputs which equates to some force(impulse) being applied to them in the next simulation step. Thread two constantly just sending out the latest simulation state for each player.
*{position, id, lastInputState} right now*

#### Frontend
Each player has both a Ghost and Player representation on the frontend. (Players are what is drawn) Ghosts are updated to the absolute position of what the server says their new position is, given the last inputs they sent. The Player object interpolates to the Ghost to smooth things out over a very short period.

#### Maps
TODO: ( There are [Tiled](https://www.mapeditor.org/) maps loaded onto both the front and backend with collision zones for the backend to use in the simulation )

#### Player In Depth
TODO: ( Cover player animations to start )

# Todo:
+ Events - **In Progress** (will allow effects and sounds and stuff and users doing 'actions' like drinking a potion)
&nbsp;
+ **Client side prediction**
The Ghost/Player interpolation now is nice to smooth out time and network randomness between socket updates but ideally the player should begin moving (or whatever) the instant the input is pressed and when the server responds, rectify the difference with the player's Ghost smoothly, over time. The other players Ghost's should continue moving according to their last known inputs and rectify in the same way. This requires running (very nearly) the same physics simulation on both the frontend and backend, which I am not sure how to do.
&nbsp;

+ Stress test with [Thor](https://github.com/observing/thor)
+ Investigate communicating with binary instead of utf-8
+ Come up with a name for this

# Thanks
* https://github.com/beoran/chipmunk
* http://buildnewgames.com/real-time-multiplayer/
