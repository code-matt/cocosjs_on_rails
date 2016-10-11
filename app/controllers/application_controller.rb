require_relative '../POROS/ninja_tracker.rb'
class ApplicationController < ActionController::API
  include Knock::Authenticable
  NINJAS = NinjaTracker.new
end
