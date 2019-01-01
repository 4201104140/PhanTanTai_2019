/* 
 * Tac gia: Nguyen Hoang Duy
 * Ngay: 2018.08.10
 */
$.widget('widget.tableHTML', $.widget.base, {
    options: {
        name: 'printTableHTML',
        title: '',
        columns: [],
        data: [],
        columnGroups:[],
        mainContentCss: {
            'height': 'auto'
        }
    },
    _create: function () {
        var self = this;
        self.options.data = this._mapData(self.options.data);
        this._drawTable(self.options).appendTo(this.element);
        this._super();
        this._saveData(this);
    },
    _createEvent: function () {
        var self = this;
        
        
    },
    _drawTable: function (options) {
        var self = this;
        var box = $("<div>").css({ "padding": "1px" })
            .append(
            $("<h2>")
                .html(options.titleName)
                .addClass("text-center")
                .css({
                    "font-weight":"bold"
                })
            );
        var table = $("<table>").addClass("table").addClass("table-bordered").appendTo(box);
        var colG = $("<tr>").appendTo(table);
        for (var key = 0; key < options.columnGroups.length; key++) {
            $("<th>")
                .attr({ "colspan": options.columnGroups[key].span })
                .html(options.columnGroups[key].caption)
                .addClass("text-center")
                .appendTo(colG)
                ;
        }
        var col = $("<tr>").appendTo(table);
        for (var key = 0; key < options.columns.length; key++) {
            $("<th>")
                .html(options.columns[key].caption)
                .addClass("text-center")
                //.css({"width":options.columns[key].size})
                .appendTo(col)
                ;
        }
        for (var key = 0; key < options.data.length; key++) {
            var tr = $("<tr>").appendTo(table);
            for (var i = 0; i < options.columns.length; i++) {
                var html = options.data[key][options.columns[i].field];
                var td = $("<td>");
                if (options.columns[i].RenderType == "money") {
                    html = self._renderMoney(html);
                    td.addClass("text-right");
                }
                if (options.columns[i].field == "RoomName") {
                    td
                        .css({ "text-transform": "uppercase", "font-weight": "bold" })
                        .addClass("text-center")
                        ;
                }
                td
                    .html(html)
                    .appendTo(tr)
                    ;
            }
        }
        return box;
    },
    _mapData: function (data) {
        return data.map(function (x) {
            $.each(x, function (v) {
                if (x[v] == null)
                    x[v] = 0;
            });
            return x;
        });
    },
    _renderMoney(data) {
        var val = data || 0;
        if (w2utils.isMoney(val)) {
            val = w2utils.formatNumber(val, w2utils.settings.currencyPrecision, w2utils.settings.groupSymbol);
            val = w2utils.settings.currencyPrefix + val + w2utils.settings.currencySuffix;
        }
        return val;
    },
    _destroy: function () {
        this.element.html('');
    },
    reset: function (data) {
        this._destroy();
        this.options.data = data;
        this._create();
    }
});