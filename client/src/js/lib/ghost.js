'use strict';

function Ghost ({ id=0, x = 0, y = 0, width = 64, height = 64 }) {
    const position = { x, y };

    function setPosition (x, y) {
        position.x = x;
        position.y = y;
    }

    function getPosition () {
        return Object.assign({}, position);
    }

    function getWidth () {
        return width;
    }

    function getHeight () {
        return height;
    }

    function getId(){
      return id;
    }

    return Object.freeze({
        getPosition,
        getWidth,
        getHeight,
        setPosition,
        getId
    });
}

export { Ghost }
