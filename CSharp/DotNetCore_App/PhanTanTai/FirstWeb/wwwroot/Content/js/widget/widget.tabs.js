$.widget('widget.tabs', $.widget.base, {
    options: {
        name: null
    },
    _create: function () {
        var self = this;

        var tabs = this.element.w2tabs(this.options);
        this.options.data && grid.add(this.options.data);
        //this.element.attr({
        //    'padding-bottom': '5px !important'
        //});
        this.element.attr('style','padding-bottom : 5px !important;')
        this._super();
        this._saveData(tabs);
    },
});