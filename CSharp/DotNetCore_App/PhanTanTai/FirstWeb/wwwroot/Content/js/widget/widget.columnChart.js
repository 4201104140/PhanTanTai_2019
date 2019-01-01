$.widget('widget.columnChart', $.widget.base, {
    options: {
        dataTableOptions: {
            columns: [],
            rows: [],
        },
        divClass: 'col-sm-12',
        element: null
    },
    _create: function () {
        this.element.css({
            'margin-right': '0px',
            'margin-left': '0px'
        });
        var div = $('<div>').addClass(this.options.divClass).appendTo(this.element);
        var divBox = $('<div>').addClass('box box-black').appendTo(div);
        var divContent = $('<div>').addClass('box-content').css('padding', '0px').appendTo(divBox);
        var contentChart = $('<div style="width: 100%; text-align: center">').appendTo(divContent);

        if (this.options.arrayDataTable) {
            this.dataTable = new google.visualization.arrayToDataTable(this.options.arrayDataTable);
        }
        else {
            this._initDataTable();
            this.addDataTableRows(this.options.dataTableOptions.rows);
        }

        if (this.options.chartOptions.flag == 1) {
            this.chart = new google.charts.Bar(contentChart[0]); //dom Jquery <> object Jquery
        }
        else if (this.options.chartOptions.flag == 2) {
            this.chart = new google.visualization.BarChart(contentChart[0]);
        }
        else {
            this.chart = new google.visualization.ColumnChart(contentChart[0]);
        }
        this._drawChart();
        this.addPublicFunction();
        this._super();
        this._saveData(this.options);
    },
    addPublicFunction: function () {
        var self = this;
        this.options.reDraw = function () {
            self._drawChart();
        };
        this.options.clear = function () {
            self._initDataTable();
        };
        this.options.addRows = function (rows) {
            self.addDataTableRows(rows);
        };
    },
    _drawChart() {
        if (this.options.chartOptions.flag == 1) {
            var formatter = new google.visualization.NumberFormat({
                decimalSymbol: '.',
                groupingSymbol: ',',
                negativeColor: 'red',
                negativeParens: false,
                prefix: '',
                suffix: ' ₫',
                fractionDigits: 0
            });
            formatter.format(this.dataTable, 1);
            formatter.format(this.dataTable, 2);
            formatter.format(this.dataTable, 3);
            this.chart.draw(this.dataTable, google.charts.Bar.convertOptions(this.options.chartOptions));
        }
        this.chart.draw(this.dataTable, this.options.chartOptions);
    },
    _initDataTable: function () {
        var self = this;
        this.dataTable = new google.visualization.DataTable();
        //add columns
        $.each(this.options.dataTableOptions.columns, function (k, v) {
            self.dataTable.addColumn(v);
        });
    },
    addDataTableRows: function (rows) {
        var self = this;
        //add rows
        $.each(rows, function (k, row) {
            var tableRow = [];
            $.each(self.options.dataTableOptions.columns, function (k, column) {
                tableRow.push(!column.render ? row[column.id] : column.render(row));
            });
            self.dataTable.addRow(tableRow);
        });
    }
});