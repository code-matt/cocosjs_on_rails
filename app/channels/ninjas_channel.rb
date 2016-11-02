require_relative '../POROS/ninja_helper.rb'
require_relative '../POROS/ninja.rb'
require 'json'

class NinjasChannel < ApplicationCable::Channel
  def subscribed()
    if(params[:id])
      stream_from "ninjas_#{params["id"]}"
    else
      stream_from "ninjas"
    end
  end

  def inputUpdate(data)
    players = ApplicationController::NINJAS
    player = players.ninjas.select{ |ninja| ninja.id == params["id"]}[0]
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
    ninja_obj = ApplicationController::NINJAS
    ninja_obj.ninjas << Ninja.new(params["id"],ninja_obj)
    state = NinjaHelper.build_state(ninja_obj)
    ActionCable.server.broadcast("ninjas_#{params["id"]}", {
      action: "start",
      state: state}.to_json)
    ActionCable.server.broadcast("ninjas", {
      action: "join",
      id: params["id"]}.to_json)
  end

  def unsubscribed
    if params[:id] != nil
      NinjaHelper.cleanup_player(params[:id])
    end
  end
  
end