$.widget('widget.pieChart', $.widget.base, {
    options: {
        dataTableOptions: {
            columns: [],
            rows: [],
        }
    },
    _create: function () {
        this._initDataTable();
        this.addDataTableRows(this.options.dataTableOptions.rows);

        console.log(this.element)
        this.chart = new google.visualization.PieChart(this.element[0]);
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
        this.chart.draw(this.dataTable, this.options.chartOptions)
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