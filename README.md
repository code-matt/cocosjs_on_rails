#cocosjs_on_rails
<img align="right" src="http://i.imgur.com/KA3OaVG.png" />
##Rails websocket html5 multiplayer boilerplate. Rails is an authortative server running chipmunk physics in one thread. Regular updates about state are delivered on another.
### extreme WIP

[![video][2]][1]

  [1]: https://drive.google.com/file/d/0B30Vmzi9uv6keXFfTC11aHBtS2s/view?usp=sharing
  [2]: http://i.imgur.com/jcXdik2.jpg (hover text)

# ^ click to watch video

###installation
```
bundle install
rails db:create
cd client
npm install
npm run build
cd ..
rails s
```

###Todo:
* Events
* Client side prediction
* Stress test with [Thor](https://github.com/observing/thor)
* Investigate communicating with binary instead of utf-8

###Thanks
* https://github.com/beoran/chipmunk
* http://buildnewgames.com/real-time-multiplayer/
