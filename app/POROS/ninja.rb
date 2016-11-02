class Ninja
  attr_accessor :name, :key_state, :id, :body, :inputs, :last_input_seq, :shape, :body, :touching_ground
  INFINITY = 1.0/0
  BOX_SIZE = 32
  def initialize(id,ninja_obj,name="tommy")
    @touching_ground = false
    @name = name
    @id = id
    @key_state = {
      l: 0,
      r: 0,
      u: 0,
      s: 0
    }
    @inputs = [];
    @last_input_seq = 0;
    @body = CP::Body.new(30, INFINITY)
    @body.p = CP::Vec2.new(20, 150)
    @body.v = CP::Vec2.new(0,0)
    @shape_verts = [
                CP::Vec2.new(-BOX_SIZE/2, BOX_SIZE/2),
                CP::Vec2.new(BOX_SIZE/2, BOX_SIZE/2),
                CP::Vec2.new(BOX_SIZE/2, -BOX_SIZE/2),
                CP::Vec2.new(-BOX_SIZE/2, -BOX_SIZE/2),
                ]
    @shape = CP::Shape::Poly.new(@body,
                                 @shape_verts,
                                 CP::Vec2.new(0,0))
    @shape.e = 0.0
    @shape.u = 0.99
    @body.v_limit = 180
    ninja_obj.space.add_body(@body)
    ninja_obj.space.add_shape(@shape)
    return self
  end

  def process_inputs
    return if @inputs.length == 0
    @inputs.each do |input|
      if input[:inputSeq] > @last_input_seq
        input[:input].each do |key|
          case key
            when "r"
              @body.apply_impulse(CP::Vec2.new(500,0),CP::Vec2.new(0,0))
            when "l"
              @body.apply_impulse(CP::Vec2.new(-500,0),CP::Vec2.new(0,0))
            when "u"
              if @touching_ground
                @body.apply_impulse(CP::Vec2.new(0,8000),CP::Vec2.new(0,0))
              end
            when "d"
              @body.apply_impulse(CP::Vec2.new(0,0),CP::Vec2.new(0,0))
            when "f"
          end
        end
        @lastInputSeq = input[:inputSeq]
        clear_processed_inputs(input[:inputSeq])
        break
      end
    end
  end

  def clear_processed_inputs(before)
    @inputs = @inputs.select{ |input| input[:inputSeq] > before}
  end

  def update_keystate(keystate)
    @key_state = keystate
  end

  def touching_ground?(space)
    @touching_ground = false
    space.segment_query(@body.p, CP::Vec2.new(@body.p.x,(@body.p.y - 19))) do |shape, t, n|
      @touching_ground = true
    end
  end

end