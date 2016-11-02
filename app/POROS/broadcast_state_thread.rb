require_relative './ninja_helper.rb'

# TODO: Think about not broadcasting to everyone and only
# sending state information to each client about things
# that are close enough to them to see or affect them.

class BroadcastStateThread
  include SuckerPunch::Job
  def perform(ninjas)
    if(ninjas.ninjas.length == 0)
      BroadcastStateThread.perform_in(0.045,ninjas)
      return
    end
    state = NinjaHelper.build_state(ninjas)
    ActionCable.server.broadcast("ninjas", {
      action: "state",
      state: state}.to_json)
    BroadcastStateThread.perform_in(0.045,ninjas)
  end
end