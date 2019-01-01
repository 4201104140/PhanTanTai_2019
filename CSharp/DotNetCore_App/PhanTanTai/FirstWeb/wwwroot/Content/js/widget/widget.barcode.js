$.widget('widget.barcode', $.widget.base, {
    options: {
        name: 'barcode',
        data: [],
        contentName: 'content',
        titleName: 'title',
        divClass: 'col-md-12',
        contentCss: {
            'display': 'block',
            'background-color': '#FFF'
        },
        icon: null,
        color: '#5ab4da',
        buttons: [], //mang de chua cac button
        isMainContent: true, // if true => add mainContentCss
        mainContentCss: {
            'height': 'auto'
        }
    },
    _create: function () {
        var self = this;

        var html = '';
        html +=
            '<div class="row d-print-none">';
        $.each(self.options.data, function (k, v) {
            html +='<div class="col-md-4 col-lg-4 col-sm-4 col-xs-6 text-center"> <table class="table table-bordered"> <thead> <tr> <th hidden="true"></th> <th hidden="true"></th> </tr></thead> <tbody> <tr> <td style="width:162px;"><h5><b>'+v.Name+'</b></h5><p>'+v.Description+'</p></td><td><svg id="'+v.ProductId+'"></svg></td></tr></tbody> </table> </div>';
        })
        html +=
            '</div>';
        debugger;
        document.body.innerHTML = html;
        $.each(self.options.data, function (k, v) {
            $("#" + v.ProductId).JsBarcode(v.Barcode, { format: v.TypeBarcode,witdh: 1,height:100 });

        });
        window.print();
        window.location.reload();
        
        this._super();
        this._saveData(this);
    },
    _destroy: function () {
        this.element.html('');
    },
    reset: function (data) {
        this._destroy();
        this.options.data = data;
        this._create();
    },
    barcode: function (format) {
        var self = this;
        var type = format.currentTarget.attributes.format.value;
        var html = '';
        html +=
            '<div class="container-fluid">' +
            '<div class="row">';
        $.each(self.options.data, function (k, v) {
            html +=
                '<div class="col-md-3 text-center">' +
                '<svg id="'+v.ProductId+'"'+
                    '></svg > ' +
                '</div>';
        })
        html +=
            '</div>' +
            '</div>';
        debugger;
        document.body.innerHTML = html;
        $.each(self.options.data, function (k, v) {
            $("#" + v.ProductId).JsBarcode(v.Barcode, { format: type });

        });

        window.print();
        window.location.reload();
    }
});