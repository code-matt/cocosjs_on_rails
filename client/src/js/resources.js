var res = {
    box_png : "img/box.png",
    map_png: "map/tiles.png",
    map2_png: "map/cavern_tiles.png",
    map00_tmx: "map/test.tmx",
    player_char_png  : "img/player_char.png",
    player_char_plist : "img/player_char.plist"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

export { g_resources }