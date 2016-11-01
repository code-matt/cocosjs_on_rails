class PlayerPhysicsThread
  include SuckerPunch::Job
  def perform(space)
    ninjas = ApplicationController::NINJAS
    space.add_post_step_callback(ninjas.tick.to_s){|space,key| NinjaHelper.cleanup_space(space) }
    30.times do |step|
      space.step(0.03/30)
    end
    PlayerPhysicsThread.perform_in(0.03,space)
  end
end