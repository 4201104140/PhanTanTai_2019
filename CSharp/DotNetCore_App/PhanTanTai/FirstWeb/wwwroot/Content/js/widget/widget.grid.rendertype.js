window.widget = widget || {};
window.widget.grid = window.widget.grid || {};
window.widget.grid.rendertype = {
    checkbox: function (record) {
        if (!record[this.field])
            return '';
        return '<div style="text-align:center;"><i class="fa-check-square"></i></div>'
    },
    icon: function (record) {
        if (record == null)
            return '';
        if (this.options.setIconName) {
            var a = $("<a id='" + this.field + '_' + record.recid + "' >");
            a.attr({
                'href': '#',
                'title': this.options.title,
                "renderType": 'icon',
            });
            if (this.options.color) {
                a.css({
                    'color': this.options.color,
                    "font-size": '17px'
                });
            }
            a.append('<i renderType="icon" class="' + this.options.setIconName(record) + '"></i>');
            return a[0].outerHTML;
        } else return '';
    },
    hyperlink: function (record) {
        if (record == null)
            return '';
        var a = $("<a id='" + this.field + '_' + record.recid + "' >");
        a.attr('href', '#');
        a.css({
            'text-decoration': 'none',
            'color': 'blue',
        });
        var text = this.options.setText && this.options.setText.call(self, record);
        // render hyperlink hardcode format
        if (['money', 'int', 'Dịch vụ'].includes(text)) {
            if (text == 'money') {
                var val = record[this.field] || 0;
                if (w2utils.isMoney(val)) {
                    text = window.framework.common.formatNumber(val, 'money');
                }
                record[this.options.totalColumn] = record[this.options.totalColumn] == 1 ? record[this.options.totalColumn] - 1 : record[this.options.totalColumn];
            }
            else if (text == 'int') {
                var val = record[this.field] || 0;
                if (w2utils.isMoney(val)) {
                    text = window.framework.common.formatNumber(val, 'int');
                }
                record[this.options.totalColumn] = record[this.options.totalColumn] == 1 ? record[this.options.totalColumn] - 1 : record[this.options.totalColumn];
            }
            else if (text == 'Dịch vụ') {
                return 'Dịch vụ';
            }
            text = typeof this.customRenderContent === 'function' ? this.customRenderContent.call(self, record, text) : text;
        }
        a.attr("renderType", 'hyperlink')
        if (text !== false) {
            a.html(text || record[this.field]);
            // render total item
            var textTotal = record[this.options.totalColumn];
            if (!!textTotal) { //if ( textTotal != null && != '' && != 0)
                var container = $('<div>');
                text = $('<span class="badge badge-info"></span>')
                    .css({
                        'padding': '2px',
                        'border-radius': '3px',
                        'font-size': '10px',
                        'display': 'inline-flex'
                    })
                    .html(textTotal);
                container.append(a).append('&nbsp;&nbsp;').append(text);
                return container.html();
            }
            return a[0].outerHTML;
        } else
            return '';
    },
    buttonIcon: function (record) {
        var div = $('<div>').css({
            'display': 'flex',
            'justify-content': 'space-between',
            'font-size': '17px'
        });
        var html = "";
        var ar = this.options.setIconList[record.recid];
        for (var i = 0; i < ar.length; i++) {
            switch (ar[i]) {
                case "fa fa-eye":
                    this.options.title = "Xem";
                    this.options.color = "#428bca";
                    break;
                case "fa fa-pencil":
                    this.options.title = "Cập nhật";
                    this.options.color = "#428bca";
                    break;
                case "fa fa-remove":
                    this.options.title = "Xóa";
                    this.options.color = "#e47885";
                    break;
                case "fa fa-check":
                    this.options.title = "Xác nhận";
                    this.options.color = "#15b74e";
                    break;
                case "fa fa-money":
                    this.options.title = "Phiếu thu";
                    this.options.color = "#15b74e";
                    break;
                case "fa-pencil-square-o":
                    this.options.title = "Phiếu nợ";
                    this.options.color = "#15b74e";
                    break;
                default:
                    break;
            }
            this.options.setIconName = function () {
                return ar[i];
            }
            var icon = window.widget.grid.rendertype.icon.call(this, record);
            html += icon;
        }
        div.html(html);
        return div[0].outerHTML;
    },
    dateTimeWithHyperlink: function (record) {
        var icon = window.widget.grid.rendertype.icon.call(this, record);
        var datetime = window.widget.grid.rendertype.dateTime.call(this, record);
        var badge = !(this.options.shouldShowBadge && this.options.shouldShowBadge(record)) ? '' : window.widget.grid.rendertype.badge.call(this, record);
        var div = $('<div>').css({
            'display': 'flex',
            'justify-content': 'space-between'
        });
        if (badge !== '')
            badge = $(badge).css({
                marginLeft: 'auto',
                marginRight: '8px',
            })[0].outerHTML;

        div.html(datetime + badge + icon);
        return div[0].outerHTML;
    },
    labelText: function (record) {
        var recordValue = record[this.field];
        var label = window.widget.grid.rendertype.labelTextCoreRender.call(this, record);
        return label + recordValue;
    },
    labelLinkText: function (record) {
        var recordValue = window.widget.grid.rendertype.hyperlink.call(this, record);
        var label = window.widget.grid.rendertype.labelTextCoreRender.call(this, record);
        return label + recordValue;
    },
    badge: function (record) {
        var css = this.options.cssStatus ? window.widget.grid.rendertype.getCssStatus(this.options.cssStatus.call(this, record)) : {
            'padding': '3px 2px 2px',
            'font-size': '11px',
            'border-radius': '3px',
            'background-color': ('#' + (this.options.badgeColorColumn ? record[this.options.badgeColorColumn] : this.options.badgeColor)) || 'black',
            'white-space': 'pre',
            'display': 'inline-flex'
        };
        var badge = $('<span>')
            .addClass('badge')
            .css(css)
            .html(!this.options.staticText ? record[this.options.badgeTextColumn || this.field] : this.options.badgeText);
        return badge[0].outerHTML;
    },
    getCssStatus: function (text) {
        var css = {
            //'font-weight': 'bold', default
            'padding': '2px 8px',
            'text-transform': 'uppercase',
            'border': '1px solid',
            'font-size': '11px',
            'background': 'transparent',
            'border-color': '#9A9A9A',
            'color': '#9A9A9A',
            'border-radius': '3px',
            'white-space': 'pre',
            'display': 'inline-flex'
        };
        if (text == 'success') {
            css['border-color'] = '#22af46';
            css['color'] = '#22af46';
        }
        else if (text == 'warning') {
            css['border-color'] = '#f3ad06';
            css['color'] = '#f3ad06';
        }
        else if (text == 'info') {
            css['border-color'] = '#3C89DA';
            css['color'] = '#3C89DA';
        }
        else if (text == 'danger') {
            css['border-color'] = '#de4848';
            css['color'] = '#de4848';
        }
        return css;
    },
    labelTextCoreRender: function (record) {
        var labelDataString = record[this.options.labelColumn];
        if (labelDataString == null || labelDataString == '') {
            return '';
        }
        var eachLabelString = labelDataString.split('∬');
        var labelArrObject = $.map(eachLabelString, function (labelString) {
            var data = labelString.split('∫')
            return {
                text: data[0],
                color: data[1]
            }
        });
        var container = $('<div>');
        $.each(labelArrObject, function (k, label) {
            if (label.text == null || label.text == '')
                return;
            var css = {
                'padding': '2px 2px',
                'border-radius': '3px',
                'font-size': '10px',
                'background-color': ('#' + label.color) || 'black',
                'display': 'inline-flex'
            };
            var badge = $('<span>')
                .addClass('badge')
                .css(css)
                .html(label.text);
            container.append(badge).append('&nbsp;');
        });

        return container.html();
    },
    int: function (record) {
        if (record == null)
            return '';
        var a = $("<span id='" + this.field + '_' + record.recid + "'>");
        var text = this.options.setText && this.options.setText.call(self, record);
        a.html(text || '<div>' + window.framework.common.formatNumber(record[this.field], 'int') + '</div>');
        a.attr("renderType", 'int');

        if (text != false)
            return a[0].outerHTML;
        else
            return '';
    },
    money: function (record) {
        if (record == null)
            return '';
        var a = $("<span id='" + this.field + '_' + record.recid + "'>");
        var text = this.options.setText && this.options.setText.call(self, record);

        var val = record[this.field] || 0;
        if (w2utils.isMoney(val)) {
            val = window.framework.common.formatNumber(val, 'money');
            val = typeof this.customRenderContent === 'function' ? this.customRenderContent.call(self, record, val) : val;
            a.html(text || '<div>' + val + '</div>');
            a.attr("renderType", 'money');
        }
        if (text != false)
            return a[0].outerHTML;
        else
            return '';
    },
    image: function (record) {
        if (record == null)
            return '';
        ///UIFileMgt/File/FileDownload?CommandAction.FileName=ab0cfa14-c656-4372-ac1a-038ef72fd129
        var a = $("<span id='" + this.field + '_' + record.recid + "'>");
        var text = this.options.setText && this.options.setText.call(self, record);
        var val = record[this.field] || 0;
        var isImage = record["IsImage"]; //không tồn tại vẫn có thể chạy bình thường
        var show = $("<img>")
            .attr({ "src": val })
            .css({ "width": "100%" })
            ;
        if (typeof isImage !== "undefined" && isImage == false) {
            show = $("<span>")
                .html("Không thể hiển thị hình ảnh")
                .css({"color":"red","font-weight":"bold"})
                ;
        }
        a.html(text || show[0].outerHTML);
        a.attr("renderType", 'image');
        if (text != false)
            return a[0].outerHTML;
        else
            return '';
    },
    date: function (record) {
        if (record == null)
            return '';
        var a = $("<span id='" + this.field + '_' + record.recid + "'>");
        var text = this.options.setText && this.options.setText.call(self, record);
        a.html(text || '<div>' + ((record[this.field] && moment(record[this.field]).format("DD/MM/YYYY")) || "") + '</div>');
        a.attr("renderType", 'date');

        if (text != false)
            return a[0].outerHTML;
        else
            return '';
    },
    dateTime: function (record) {
        if (record == null)
            return '';
        var a = $("<span id='" + this.field + '_' + record.recid + "'>");
        var formatString = this.FormatString || "DD/MM/YYYY HH:mm";
        a.html('<div>' + ((record[this.field] && moment(record[this.field]).format(formatString)) || "") + '</div>');
        a.attr("renderType", 'dateTime');
        return a[0].outerHTML;
    },
    actionDowload: function (record) {
        if (record == null)
            return '';
        var a = $("<a id='" + this.field + '_' + record.recid + "'>");
        a.attr('href', '#');
        a.css({
            'color': '#4286f4',
        });

        const captionButton = record[this.field] ?
            '<i type="click" class="fa fa-download" style="margin-right: 5px;"></i>Tải Đề' :
            '<i type="click" class="fa fa-print" style="margin-right: 5px;"></i>Tạo File';

        a.html(captionButton);
        a.attr("renderType", 'actionDowload');

        return a[0].outerHTML;
    },
    questionImportType: function (record) {
        if (record == null)
            return '';
        var typeRender = $("<span>");
        switch (record.TypeContent) {
            case 1:
                typeRender.css({
                    'color': 'red'
                }).html('Không Xác Định');
                break;
            case 2:
                typeRender.html("Câu Hỏi");
                break;
            case 3:
                typeRender.html("Câu Trả Lời");
                break;
            case 4:
                typeRender.html("Đoạn Văn");
                break;
        }
        return typeRender[0].outerHTML;
    },
    time: function (record) {
        if (record == null)
            return '';
        var a = $("<span id='" + this.field + '_' + record.recid + "'>");
        var text = this.options.setText && this.options.setText.call(self, record);
        a.html(text || '<div>' + moment(record[this.field]).format("HH:mm") + '</div>');
        a.attr("renderType", 'time');

        if (text != false)
            return a[0].outerHTML;
        else
            return '';
    },
    answeredQuestion: function (record) {
        if (record == null)
            return '';
        var i = '<i class="fa fa-check" style="margin-right: 5px;"></i>Đã Chọn';
        var a = $('<a>').html(i);

        if (record[this.field])
            return a[0].outerHTML;
        else
            return '';
    },
    getStyleOfQuantity: function (quantity) {
        if (quantity == null) {
            return '';
        }
        else if (quantity > 0) {
            var div = $('<div>').addClass('text-success').html('<b>+' + quantity + ' (Dư)</b>');
            return div[0].outerHTML;
        }
        else if (quantity < 0) {
            var div = $('<div>').addClass('text-danger').html('<b>' + quantity + ' (Thiếu)</b>');
            return div[0].outerHTML;
        }
        return quantity;
    }
};