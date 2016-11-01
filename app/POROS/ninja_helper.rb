class NinjaHelper
  attr_accessor :things_to_clean
  @@things_to_clean = []

  def self.get_player_by_id(id)
    players = ApplicationController::NINJAS.ninjas
    player = players.select{ |ninja| ninja.id == id}[0]
  end
  
  def self.cleanup_player(player_id)
    players = ApplicationController::NINJAS.ninjas
    player = self.get_player_by_id(player_id)
    @@things_to_clean << player
  end

  def self.cleanup_space(space)
    ninjas = ApplicationController::NINJAS.ninjas
    ninjas.each do |ninja|
      ninja.body.reset_forces
      ninja.touching_ground?(space)
    end
    @@things_to_clean.each do |thing|
      space.remove_body(thing.body)
      space.remove_shape(thing.shape)
      ApplicationController::NINJAS.ninjas = ApplicationController::NINJAS.ninjas - [thing]
      ActionCable.server.broadcast('ninjas',{
        action: "leave",
        id: thing.id
      }.to_json)
      @@things_to_clean = @@things_to_clean - [thing]
    end
    ApplicationController::NINJAS.tick += 1
  end

  def self.build_state(ninjas)
    players_state_arr = []
    ninjas.ninjas.each do |ninja|
      players_state_arr << {
        id: ninja.id,
        name: "tommy",
        lastInputSeq: ninja.last_input_seq,
        position: {x: ninja.body.p.x,y: ninja.body.p.y,vx:ninja.body.v.x,vy:ninja.body.v.y}
      }
    end
    {
      serverTime: 0,
      players: players_state_arr
    }
  end
end