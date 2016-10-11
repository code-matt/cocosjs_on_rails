require_relative './chipmunk_physics_thread.rb'
require_relative './broadcast_state_thread.rb'
require_relative './ninja_helper.rb'
class NinjaTracker
  attr_accessor :ninjas, :space, :a, :b, :tick

  SCREEN_WIDTH = 800
  SCREEN_HEIGHT = 600
  INFINITY = 1.0/0
  PADDING = 10
  def initialize
    @tick = 0
    @space = CP::Space.new
    @space.damping = 0.8
    @space.gravity = CP::Vec2.new(0, -550)
    @a = CP::Vec2.new(0,0)
    @b = CP::Vec2.new(4000, 0)
    @body = CP::Body.new(INFINITY, INFINITY)
    @body.p = CP::Vec2.new(0, 0)
    @body.v = CP::Vec2.new(0, 0)
    @shape = CP::Shape::Segment.new(@body,
                                    @a,
                                    @b,
                                    0)
    @shape.e = 0.01
    @shape.u = 0.99
    @space.add_static_shape(@shape)
    @ninjas = []
    PlayerPhysicsThread.perform_async(self.space)
    BroadcastStateThread.perform_async(self)
  end
end