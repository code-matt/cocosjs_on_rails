'use strict'

export const PlayerAnimations = {
  type: 'player',
  plist: 'img/player_char.plist',
  sequences: [],
  anims: {
    running_r: {
      start_frame: 1,
      end_frame: 7,
      speed: 0.1,
      loop: true
    },
    standing: {
      start_frame: 65,
      end_frame: 65,
      speed: 1,
      loop: true
    },
    jump: {
      start_frame: 31,
      end_frame: 32,
      speed: 0.3,
      loop: false
    }
  }
}
