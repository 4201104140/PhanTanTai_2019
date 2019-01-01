$.widget('widget.panelBox', {
	options: {
		data: {
			content: ''
		},
		contentName: 'content',
		classCol12: 'col-md-12',
		contentCss: {
		    'display': 'block',
		    'color': '#000000',
		}
	},
	_create: function () {
		var self = this;
		self.element.addClass(self.options.classCol12);
		//tạo thẻ div panelBox
		self.options.panelBox = $('<div>').addClass('panelBox').appendTo(self.element);

		//them content
		var panelBoxContent = $('<div>').addClass('panelBox-content')
            .appendTo(self.options.panelBox)
            .css(self.options.contentCss)
		;
		if (self.options.data[self.options.contentName]) {
			//nếu là đối tượng jQuery
		    if (self.options.data[self.options.contentName] instanceof jQuery)
				panelBoxContent.append(self.options.data[self.options.contentName]);
				//nếu là chuỗi html
			else
				panelBoxContent.html(self.options.data[self.options.contentName]);
		}
	},

	_destroy: function () {
		self.element.html('');
	}
});


