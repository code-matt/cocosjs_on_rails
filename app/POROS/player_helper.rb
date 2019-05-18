class PlayerHelper
  attr_accessor :things_to_clean
  @@things_to_clean = []

  def self.get_player_by_id(id)
    players = ApplicationController::PLAYERS.players
    player = players.select{ |player| player.id == id}[0]
  end
  
  def self.cleanup_player(player_id)
    players = ApplicationController::PLAYERS.players
    player = self.get_player_by_id(player_id)
    @@things_to_clean << player
  end

  def self.cleanup_space(space)
    players = ApplicationController::PLAYERS.players
    players.each do |player|
      player.body.reset_forces
      player.touching_ground?(space)
    end
    @@things_to_clean.each do |thing|
      space.remove_body(thing.body)
      space.remove_shape(thing.shape)
      ApplicationController::PLAYERS.players = ApplicationController::PLAYERS.players - [thing]
      ActionCable.server.broadcast('players',{
        action: "leave",
        id: thing.id
      }.to_json)
      @@things_to_clean = @@things_to_clean - [thing]
    end
    ApplicationController::PLAYERS.tick += 1
  end

  def self.build_state(players)
    players_state_arr = []
    players.players.each do |player|
      players_state_arr << {
        id: player.id,
        name: "tommy",
        lastInputSeq: player.last_input_seq,
        position: {x: player.body.p.x,y: player.body.p.y,vx:player.body.v.x,vy:player.body.v.y}
      }
    end
    {
      serverTime: 0,
      players: players_state_arr
    }
  end
end