require_relative './chipmunk_physics_thread.rb'
require_relative './broadcast_state_thread.rb'
require_relative './player_helper.rb'
require_relative './segment_shape.rb'
require_relative './tiled_map_reader'
class PlayerTracker
  attr_accessor :players, :space, :a, :b, :tick, :static_shapes

  SCREEN_WIDTH = 800
  SCREEN_HEIGHT = 600
  INFINITY = 1.0/0
  PADDING = 10
  def initialize
    @tick = 0
    @space = CP::Space.new
    @space.damping = 0.8
    @space.gravity = CP::Vec2.new(0, -550)
    @players = []
    @static_shapes = []
    MapReader.new(File.join(Rails.root, "public") + '/test.json',@space,self)
    PlayerPhysicsThread.perform_async(self.space)
    BroadcastStateThread.perform_async(self)
  end
end