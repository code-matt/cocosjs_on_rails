require_relative '../POROS/ninja_tracker.rb'
class ApplicationController < ActionController::API
  NINJAS = NinjaTracker.new
end
