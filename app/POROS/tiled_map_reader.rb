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
    objects = map_hash["layers"][1]["objects"]

    objects.each do |object|
      if object["properties"]["static_shape"] == true
        tracker.static_shapes << SegmentShape.new(
          space,
          CP::Vec2.new(object["x"],(height - object["y"]) - (map_hash["tilewidth"]/2)),
          CP::Vec2.new(object["x"]+object["width"],(height - object["y"]) - (map_hash["tilewidth"]/2)),
          object["height"])
      end
    end
  end
end