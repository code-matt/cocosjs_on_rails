import {MainScene} from './main-scene'
import { g_resources } from './resources'

window.onload = function () {
    cc.game.onStart = function(){
        cc.view.setDesignResolutionSize(480, 320, cc.ResolutionPolicy.SHOW_ALL);
        cc.view.resizeWithBrowserSize(true);
        cc.LoaderScene.preload(g_resources, function () {
            cc.director.runScene(new MainScene());
        }, this);
    };
    cc.game.run("gameCanvas");
};
