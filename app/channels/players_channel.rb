require_relative '../POROS/player_helper.rb'
require_relative '../POROS/player.rb'
require 'json'

class PlayersChannel < ApplicationCable::Channel
  def subscribed()
    if(params[:id])
      stream_from "players_#{params["id"]}"
    else
      stream_from "players"
    end
  end

  def inputUpdate(data)
    players = ApplicationController::PLAYERS
    player = players.players.select{ |player| player.id == params["id"]}[0]
    player.inputs << {
      input: data["input"],
      clientTime: data["clientTime"],
      inputSeq: data["inputSeq"]
    }
    player.process_inputs
  end

  def event
    byebug
  end

  def join(id)
    player_obj = ApplicationController::PLAYERS
    player_obj.players << Player.new(params["id"],player_obj)
    state = PlayerHelper.build_state(player_obj)
    ActionCable.server.broadcast("players_#{params["id"]}", {
      action: "start",
      state: state}.to_json)
    ActionCable.server.broadcast("players", {
      action: "join",
      id: params["id"]}.to_json)
  end

  def unsubscribed
    if params[:id] != nil
      PlayerHelper.cleanup_player(params[:id])
    end
  end
  
end