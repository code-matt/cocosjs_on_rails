require_relative './ninja_helper.rb'

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