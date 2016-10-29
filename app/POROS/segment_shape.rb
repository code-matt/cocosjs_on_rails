class SegmentShape
  attr_reader :shape,:body
  INFINITY = 1.0/0
  def initialize(space,start_point,end_point,thickness)
    @body = CP::Body.new(INFINITY, INFINITY)
    @body.p = CP::Vec2.new(0, 0)
    @body.v = CP::Vec2.new(0, 0)
    @shape = CP::Shape::Segment.new(@body,
                                    start_point,
                                    end_point,
                                    thickness)
    @shape.e = 0.01
    @shape.u = 0.99
    space.add_static_shape(@shape)
  end
end