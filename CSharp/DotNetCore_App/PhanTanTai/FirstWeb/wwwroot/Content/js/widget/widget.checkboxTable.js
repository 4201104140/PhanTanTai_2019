//var options =
//{
//    columns: [
//        { name: 'c1', caption: 'Column 1' },
//        { name: 'c2', caption: 'Column 2' },
//        { name: 'c3', caption: 'Column 3' },
//    ],
//    rows: [
//        { name: 'r1', caption: 'Row 1' },
//        { name: 'r2', caption: 'Row 2' },
//        { name: 'r3', caption: 'Row 3' },
//    ],
//};
$.widget('widget.checkboxTable', $.widget.base, {
    options: {
        //rows: [],
        columns: [],
        rowHeaderCaption: 'caption'
    },
    _create: function () {
        var self = this;
        var checkboxTableHtml = this._generateCheckboxTable();
        //var initData = this._generateInitData();

        //this.options.data = initData;
        this.element.append(checkboxTableHtml);

        this.options.getData = function () {
            var rows = [];
            $.each($(this.tBody).find('tr'), function (key, val) {
                var data = $(this).data();
                $.each($(this).find('.dataInput'), function () {
                    var dataInput = $(this);
                    data[dataInput.attr('colName')] = self._getValueByType(dataInput.attr('colType'), dataInput);
                });
                rows.push($.extend(self.options.rows[key], data));
            });
            return rows;
        },

        this._super();
        this._saveData(this.options);
    },
    //_generateInitData: function () {
    //    var self = this;

    //    var data = {};

    //    $.each(this.options.rows, function (kRow, vRow) {
    //        data[vRow.name] = {};
    //        $.each(self.options.columns, function (kCol, vCol) {
    //            data[vRow.name][vCol.name] = false;
    //        });
    //    });
    //    console.log(data);
    //    return data;
    //},
    _generateTHead: function () {
        var thead = $('<thead>');
        var tr = $('<tr>').appendTo(thead);

        $.each(this.options.columns, function (k, v) {
            var th = $('<th>').html(v.caption);
            tr.append(th);
        });

        return thead;
    },
    _generateTBody: function () {
        var self = this;
        //var tBodyTemplate = "";
        var tBody = $('<tbody>');

        $.each(this.options.rows, function (kRow, vRow) {
            var tr = $('<tr>').appendTo(tBody);
            tr.data(vRow);
            //var th = $('<th>').html(vRow[self.options.rowHeaderCaption]).appendTo(tr);
            $.each(self.options.columns, function (kCol, vCol) {
                var td = $('<td>').css('text-align', 'center').appendTo(tr);
                var htmlType = self._getHtmlByOptions(vCol, vRow);
                htmlType.appendTo(td).attr('colName', vCol.name);
                //var input = $('<input>').addClass('dataInput').attr('type', 'checkbox');

            });
        });
        this.options.tBody = tBody;
        return tBody;
    },
    _generateCheckboxTable: function () {
        var table = $('<table>').addClass('table table-bordered table-condensed').append(this._generateTHead()).append(this._generateTBody());
        return table;
    },
    _getHtmlByOptions: function (colOptions, rowOptions) {
        var htmlType;
        if (colOptions.type == 'text') {
            htmlType = $('<div>')
                .html(rowOptions[colOptions.name])
            //.attr('rowValue', (rowOptions[colOptions.name] || ''));
        }
        else if (colOptions.type == 'boldtext') {
            htmlType = $('<b>')
                .html(rowOptions[colOptions.name])
            //.attr('rowValue', (rowOptions[colOptions.name] || ''));
        }
        else if (colOptions.type == 'checkbox') {
            htmlType = $('<input>')
                .attr('type', 'checkbox')
                .prop('checked', rowOptions[colOptions.name])
            //.attr('rowValue', (rowOptions[colOptions.name] || false))
            ;
        }
        htmlType.addClass('dataInput').attr('colType', colOptions.type);
        return htmlType;
    },
    _getValueByType: function (type, dataInputEl) {
        var value;
        if (type == 'checkbox') {
            value = $(dataInputEl).prop('checked');
        }
        else {
            value = $(dataInputEl).html();
        }
        return value;
    }
});