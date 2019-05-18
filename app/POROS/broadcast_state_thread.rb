require_relative './player_helper.rb'

# TODO: Think about not broadcasting to everyone and only
# sending state information to each client about things
# that are close enough to them to see or affect them.

class BroadcastStateThread
  include SuckerPunch::Job
  def perform(players)
    if(players.players.length == 0)
      BroadcastStateThread.perform_in(0.045,players)
      return
    end
    state = PlayerHelper.build_state(players)
    ActionCable.server.broadcast("players", {
      action: "state",
      state: state}.to_json)
    BroadcastStateThread.perform_in(0.045,players)
  end
end