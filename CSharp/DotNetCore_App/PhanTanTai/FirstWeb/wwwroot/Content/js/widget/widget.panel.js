$.widget("widget.panel", $.widget.base, {
    options: {
        name: null,
        box: null,
        width: null,
        height: null,
        items: [],
        elements: {}
    },
    _create: function () {
        var self = this;



        self.element.addClass(this.options.divClass || '');
        //is collapse panel
        if (this.element.hasClass('collapse')) {
            this.options.toggle = function () {
                $(self.element).collapse('toggle');
            };

        }

        //has parentid
        if (!(this.element.attr('data-parentid') === undefined || this.element.attr('data-parentid') === null))
            this.options.parentId = self.element.attr('data-parentid');

        //if (this.options.attr) {
        //    self.element.attr(this.options.attr.name, this.options.attr.value);
        //}
        for (var i = 0; i < this.options.items.length; i++) {
            var item = this.options.items[i];

            if (!item._type) {
                this.options.items[i] = item.end();
            }

            if (item.divClass)
                $(item.template).addClass(item.divClass);
            self.element.append(this.options.items[i].template);
        }

        this.addItem();



        this.element.css(this.options.css || {});
        this.element.css({
            width: this.options.width || null,
            height: this.options.height || null
        });

        this._super();

        this._saveData(this.options);
    },
    addItem: function () {
        var self = this;
        $.each(this.options.items, function (key, value) {
            if (self.options._pageId) {
                value.name = self.options._pageId + '_' + value.name;
                value._pageId = self.options._pageId;
            }
            if (value._type.startsWith('w2')) {

                var w2ui = $(value.template)[value._type](value);
                self.options.elements[value.name] = w2ui;
            } else {
                require([value._type], function () {
                    var myWidget = $(value.template)[value._type](value);
                    self.options.elements[value.name] = ($(myWidget).data('widget-' + value._type).options).__data;
                });
            }
            // binding events
            //var keys = Object.keys(value.events || {}) || [];

            //for (var i = 0, key; key = keys[i]; i++) {
            //    var handlers = value.events[key];
            //    if (!$.isArray(handlers)) {
            //        handlers = [handlers];
            //    }
            //    for (var j = 0, handler; handler = handlers[j]; j++) {
            //        if ($.isFunction(handler)) {
            //            value.template.on(key, handler);
            //        }
            //    }
            //}
        });
    },
    _setOptions: function () {
        this._superApply(arguments);
    },
    _setOption: function (key, value) {
        this._super(key, value);
    }
});