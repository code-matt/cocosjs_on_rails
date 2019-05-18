require_relative '../POROS/player_tracker.rb'
class ApplicationController < ActionController::API
  PLAYERS = PlayerTracker.new
end
