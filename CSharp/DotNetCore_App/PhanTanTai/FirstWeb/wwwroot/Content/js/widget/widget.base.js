$.widget('widget.base', {
    options: {
        name: null,
        css: {},
        attr: {}
    },
    _create: function () {
        //this.options.attr.id = this.options.id;

        this.element.css(this.options.css);
        this.element.attr(this.options.attr);
        //this._register();
    },
    _saveData: function (data) {
        var self = this;
        $.extend(data, { $el: self.element });
        this.options.__data = data;
    },
    //getData1: function () {
    //    console.log(this.options.__data);
    //    if(this.options.__data)
    //        return this.options.__data;
    //}
});