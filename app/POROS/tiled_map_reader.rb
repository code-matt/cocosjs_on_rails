require 'json'
require_relative 'segment_shape.rb'

class MapReader
  def initialize(tiled_map_file,space,tracker)
    file = File.read(tiled_map_file)
    map_hash = JSON.parse(file)
    create_statics(map_hash,space,tracker)
  end

  def create_statics(map_hash,space,tracker)
    height = map_hash["height"] * map_hash["tilewidth"]
    poly_objects = map_hash["layers"].select{ |layer| layer["name"] == "poly_shapes"}[0]["objects"]

    poly_objects.each do |object|
      origin = [object["x"],object["y"]]
      polyline = object["polyline"]
      tracker.static_shapes << SegmentShape.new(
        space,
        CP::Vec2.new(origin[0] + polyline[0]["x"],(height - (origin[1] + polyline[0]["y"]))),
        CP::Vec2.new(origin[0] + polyline[1]["x"],(height - (origin[1] + polyline[1]["y"]))),
        0,
        0)
    end
  end
end