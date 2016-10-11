var NinjaLayerTemplate = cc.Layer.extend({
        ctor:function (space) {
            this._super();
            this.space = space;
            this.init();
        },
        init:function () {
            this._super();
        },
    })
export { NinjaLayerTemplate }