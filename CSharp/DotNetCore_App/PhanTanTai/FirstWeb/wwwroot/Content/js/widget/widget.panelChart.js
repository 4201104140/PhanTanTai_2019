$.widget('widget.panelChart', $.widget.base, {
	options: {
		divClass: 'col-sm-12',
		title: null,
		icon: 'fa fa-money',
		items: []
	},
	_create: function () {
		var self = this;

		if (this.options.title) {
            var boxTitle = $('<div>').addClass('box-title').appendTo(this.element);
            boxTitle.append($('<h3><i class="' + this.options.icon + '"></i>' + this.options.title + '</h3>'));
		}
		this.boxContent = $('<div>').addClass('box-content').appendTo(this.element);

		if (this.options.items)
			this._renderContent(this.options.items);
		this.addPublicFunction();
		this._super();
		this._saveData(this.options);
	},
	addPublicFunction: function () {
		var self = this;
		this.options.reDraw = function () {
		    self._renderContent(self.options.items);
		};
		this.options.addContent = function (content) {
			self._renderContent(content);
		};
	},
	_renderContent: function (items) {
	    var self = this;
		if (items) {
			$.each(items, function (key, value) {
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
			            var chart = ($(myWidget).data('widget-' + value._type).options).$el;
			            self.boxContent.append(chart);
			        });
			    }
				
			});
		}
	},
});