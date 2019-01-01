$.widget('widget.timelineChart', $.widget.base, {
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
        var chart = new google.visualization.Timeline(this.element[0]);
        chart.draw(this.dataTable, this.options.chartOptions);

        this._super();
        this._saveData(this.options);
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
                tableRow.push(row[column.id]);
            });
            self.dataTable.addRow(tableRow);
        });
    }

});