$.widget('widget.titleToolbar', $.widget.base, {
    options: {
        boxClass: 'box-blue',
        boxCss: {},
        textColor: 'black',
        titleIcon: 'fa-list',
        titleText: '',
        leftItem: [],
        rightItem: [],
        centerTitle: false,
    },
    _create: function () {
        var self = this;

        this._super();
        this._saveData(this.options);
    },
    _init: function () {
        this.element
            .addClass('box')
            .addClass(this.options.boxClass)
            .css('margin-bottom', '1px')
            .css(this.options.boxCss);
        this.options.boxTitle = $("<div>").addClass('box-title').appendTo(this.element);
        var icon = $("<i class='fa " + this.options.titleIcon + "' style='margin-right: 0px;'>");
        if (this.options.centerTitle) {
            this.options.boxTitle.css({
                display: 'flex',
                justifyContent: 'space-around'
            });
            icon.css({
                position: 'absolute',
                left: '12px',
                top: '12px',
            })
        }
        var titleHtml = "<h3>" + icon[0].outerHTML + ' ' + this.options.titleText + " <span style='opacity: 0.6;'></span></h3>";
        $(titleHtml).css({
            color: this.options.textColor
        }).appendTo(this.options.boxTitle);
        if (this.options.leftItem != null && this.options.leftItem.length != 0) {
            var leftBoxToolHtml = "<div class='box-tool' style='right:unset; margin-left:15px;'>";
            this.options.leftBoxTool = $(leftBoxToolHtml).appendTo(this.options.boxTitle);
        }

        if (this.options.rightItem != null && this.options.rightItem.length != 0) {
            var rightBoxToolHtml = "<div class='box-tool'>";
            this.options.rightBoxTool = $(rightBoxToolHtml).appendTo(this.options.boxTitle);
        }

        this._createItem();
        this._addPublicFunction();
    },

    _createItem: function () {
        var self = this;
        if (this.options.leftBoxTool) {
            $.each(this.options.leftItem, function (k, option) {
                var itemEl = self._getItemEl(option);
                self.options.leftBoxTool.append(itemEl);
            });
        }
        if (this.options.rightBoxTool) {
            $.each(this.options.rightItem, function (k, option) {
                option.icon = option.icon || 'glyphicon-refresh';
                option.class = option.class || 'form-control';
                option.placeholder = option.placeholer || 'Search...'

                var itemEl = self._createItemEl(option);
                self.options.rightBoxTool.append(itemEl);
            });
        }
    },
    _createItemEl: function (itemOptions) {
        var self = this;
        var itemEl = $("<div class='btn-group'>").css({
            'z-index': 3,
            'margin-top': '-2px'
        });
        if (itemOptions.type != 'buttonGroup') {
            if (itemOptions.type == 'text') {
                itemEl = $("<div class='btn-group has-feedback'>").css({
                    'z-index': 10,
                    'margin-top': '-6px'
                });
            }
            else if (itemOptions.type == 'daterangepicker') {
                itemEl = $("<div>").addClass('btn-group').css({
                    'margin-top': '-6px',
                    'padding-right': '5px'
                });
            }
            else if (itemOptions.type == 'radiobutton') {
                itemEl = $("<div>").addClass('btn-group').css({
                    'margin-top': '-6px',
                    'padding-right': '5px'
                });
            }
            else if (itemOptions.type == 'togglebutton') {
                itemEl = $("<div>").addClass('btn-group').css({
                    'margin-top': '-6px',
                    'padding-right': '5px'
                });
            }
            itemEl.append(this._getItemEl(itemOptions));

            if (itemOptions.type == 'text' && itemOptions.icon) {
                var iconEl = $('<span style="top: 0px;width: 30px;height: 30px;line-height: 30px;" class="form-control-feedback glyphicon ' + itemOptions.icon + '"></span>');
                if (itemOptions.onClick) {
                    iconEl.click(itemOptions.onClick);
                }
                itemEl.append(iconEl);
            }
        } else if (itemOptions.type == 'buttonGroup') {
            $.each(itemOptions.items, function (k, option) {
                var tmp = self._getItemEl(option);
                if (tmp.is('div')) {
                    $.each(tmp.children(), function (k, v) {
                        itemEl.append(v);
                    });
                } else {
                    itemEl.append(tmp);
                }
            });
        } else if (itemOptions.type == 'break') {
            itemEl = $('<a style="color:white; font-size: 13px; cursor:default;">|</a>');
        }
        return itemEl;
    },
    _getItemEl: function (groupItemOption) {
        var groupItemEl;
        if (groupItemOption.type == 'button') {
            groupItemEl = $('<a href="#" style="font-size:13px;" class="btn ' + (groupItemOption.btnClass || 'btn-success ') + '"><i class="fa ' + groupItemOption.icon + '"></i> ' + groupItemOption.caption + '</a>');
            if (groupItemOption.onClick) {
                groupItemEl.click(groupItemOption.onClick);
            }
        } else if (groupItemOption.type == 'dropdown') {
            groupItemEl = $('<div>');
            $('<a href="#" style="font-size:13px;" data-toggle="dropdown" class="btn ' + (groupItemOption.btnClass || 'btn-success') + ' dropdown-toggle"><i class="fa ' + groupItemOption.icon + '"></i> ' + groupItemOption.caption + '</a>').appendTo(groupItemEl);
            if (groupItemOption.dropdownItems != null && groupItemOption.dropdownItems.length != 0) {
                var dropdownContainer = $('<ul class="dropdown-menu pull-right">').appendTo(groupItemEl);

                $.each(groupItemOption.dropdownItems, function (k, ddOption) {
                    var ddItem = $('<li><a href="#"><i class="fa ' + ddOption.icon + '"></i>' + ddOption.caption + '</a></li>').appendTo(dropdownContainer);
                    if (ddOption.onClick) {
                        ddItem.click(ddOption.onClick);
                    }
                });
            }
        } else if (groupItemOption.type == 'text') {
            groupItemEl = $('<input type="text" id="textQuickSearch" style="width: 164px; height: 30px;" placeholder="' + (groupItemOption.placeholder || '') + '">');
            groupItemOption.class && groupItemEl.addClass(groupItemOption.class);
            if (groupItemOption.onKeyDown) {
                groupItemEl.keydown(groupItemOption.onKeyDown);
            }
        } else if (groupItemOption.type == 'daterangepicker') {
            groupItemEl = $('<span class="m-subheader__daterange" id="my_daterange-picker" style="cursor: pointer; background: #fff; padding: 2px; display: inline-block; border-radius: 2rem; cursor: pointer; background: #fff; line-height: 1.5; box-sizing: inherit;">' +
                '<span class="m-subheader__daterange-label" style="padding: 5px 8px 7.4px 12px; box-sizing: inherit; cursor: pointer;">' +
                '<span class="my_daterange-title" style="color: #aaaeb8; cursor: pointer; vertical-align: middle; margin-bottom: 1px; /*margin-right: 3px;*/"></span>' +
                '<span class="my_daterange-date m--font-brand" style="display: inline-block; font-weight: 700; color: #716aca !important; box-sizing: inherit; cursor: pointer; vertical-align: middle; /*margin-bottom: 1px;*/"></span>' +
                '</span>' +
                '<a href="#" class="btn btn-sm" style="width: 26px !important; height: 26px !important; border-radius: 50% !important; color: #fff; background-color: #716aca; cursor: pointer; transition: all 0.15s ease-in-out; position: relative; padding: 0 !important; margin-top: 0px;">' +
                '<i class="fa fa-angle-down" style="transform: translate(-50%, -50%); position: absolute; top: 50%; left: 50%;"></i>' +
                '</a>' +
                '</span>');
            if (groupItemOption.onSelect) {
                groupItemEl.on('apply.daterangepicker', groupItemOption.onSelect);
            }
        }
        else if (groupItemOption.type == 'radiobutton') {
            groupItemEl = $("<div>").css({ "border-radius": "5px" });
            groupItemOption.items.forEach(function (value) {
                var span = $("<span>")
                    .attr({
                        "data-toggle": "estadotwo",
                        "data-value": value.id,
                        "id": value.id,
                        "name": value.id
                    })
                    .html(value.caption)
                    .click(value.onClick)
                    .on("click", function () {
                        var sel = $(this).data('value');
                        var tog = $(this).data('toggle');
                        $('#' + tog).val(sel);
                        // You can change these lines to change classes (Ex. btn-default to btn-danger)
                        $('span[data-toggle="' + tog + '"]').not('[data-value="' + sel + '"]').removeClass('active btn-primary').addClass('notActive btn-default');
                        $('span[data-toggle="' + tog + '"][data-value="' + sel + '"]').removeClass('notActive btn-default').addClass('active btn-primary').css({ 'padding': '5px 10px' });;
                    })
                ;
                if (value.active) {
                    span.addClass("btn btn-primary btn-md active").css({ 'padding': '5px 10px' });
                }
                else {
                    span.addClass("btn btn-default btn-md noActive").css({ 'padding': '5px 10px' });
                }
                span.appendTo(groupItemEl);
            });
        }
        return groupItemEl;
    },
    _addPublicFunction: function () {
        var self = this;
        this.options.clearQuickSearch = function () {
            self.element.find('#textQuickSearch').val('');
            self.element.find('#textQuickSearch').focus();
        }
        this.options.daterangepickerInit = function (dateNow, fromDate, toDate) {
            // default use params dateNow
            self._daterangepickerInit(dateNow, fromDate, toDate);
        }
    },
    _destroy: function () {
        this.element.html('');
    },
    _daterangepickerInit: function (dateNow, fromDate, toDate) {
        var picker = this.element.find('#my_daterange-picker');
        var start = (fromDate ? moment(fromDate) : moment(dateNow).subtract(29, 'days'))
            .format('DD/MM/YYYY');
        var end = moment(toDate || dateNow).format('DD/MM/YYYY');

        function cb(start, end, label) {
            var title = '';
            var range = '';
            if (label == 'Hôm nay' || label == 'Hôm qua' || label == 'Toàn thời gian') {
                title = label + ':';
                range = start.format('DD/MM/YYYY');
            } else {
                range = start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY');
            }

            picker.find('.my_daterange-date').html(label == 'Toàn thời gian' ? '' : range);
            picker.find('.my_daterange-title').html(title);
        }

        picker.daterangepicker({
            startDate: start,
            endDate: end,
            opens: 'left',
            alwaysShowCalendars: true,
            locale: {
                customRangeLabel: 'Tùy chỉnh',
                format: 'DD/MM/YYYY',
                daysOfWeek: [
                    "CN",
                    "T2",
                    "T3",
                    "T4",
                    "T5",
                    "T6",
                    "T7",
                ],
                monthNames: [
                    "Tháng 1",
                    "Tháng 2",
                    "Tháng 3",
                    "Tháng 4",
                    "Tháng 5",
                    "Tháng 6",
                    "Tháng 7",
                    "Tháng 8",
                    "Tháng 9",
                    "Tháng 10",
                    "Tháng 11",
                    "Tháng 12"
                ],
                firstDay: 1
            },
            ranges: {
                'Hôm nay': [moment(dateNow), moment(dateNow)],
                'Hôm qua': [moment(dateNow).subtract(1, 'days'), moment(dateNow).subtract(1, 'days')],
                '7 ngày qua': [moment(dateNow).subtract(6, 'days'), moment(dateNow)],
                '30 ngày qua': [moment(dateNow).subtract(29, 'days'), moment(dateNow)],
                'Tháng này': [moment(dateNow).startOf('month'), moment(dateNow).endOf('month')],
                'Tháng trước': [moment(dateNow).subtract(1, 'month').startOf('month'), moment(dateNow).subtract(1, 'month').endOf('month')],
                'Quý này': [moment(dateNow).startOf('quarter'), moment(dateNow).endOf('quarter')],
                'Quý trước': [moment(dateNow).subtract(1, 'quarter').startOf('quarter'), moment(dateNow).subtract(1, 'quarter').endOf('quarter')],
                'Năm này': [moment(dateNow).startOf('year'), moment(dateNow).endOf('year')],
                'Năm trước': [moment(dateNow).subtract(1, 'year').startOf('year'), moment(dateNow).subtract(1, 'year').endOf('year')],
                //'Toàn thời gian': [moment(dateNow), 0],
            }
        }, cb);

        cb(start, end, '');
    }
});