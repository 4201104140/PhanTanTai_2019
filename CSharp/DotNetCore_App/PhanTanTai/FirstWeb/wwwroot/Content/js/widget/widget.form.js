/* This widget contains only fields */
$.widget('widget.form', $.widget.base, {
    template: [
        "<table>",
            "{0}",
        "</table>"
    ].join(),
    options: {
        name: null,
        fieldPerRow: 2,
        fields: [],
        actions: [],
        boderSpacing: 0,
        labelWidth: 150,
        dateFormat: ''
    },
    _create: function () {
        var self = this;
        this.element.empty();
        this.element.append(this._createFormElement());
        this.options.record && this._formatRecordByType(this.options.record);
        var form = this.element.w2form(this.options);

        $.extend(form, {
            findElement: function (element) {
                var el = $(form.$el).find(element);
                if (el.length > 0) {
                    return el;
                }
                if (element && element[0] && element[0].match(/[a-zA-Z]/g)) {
                    element = '#' + element;
                }
                return $(form.$el).find(element);
            },
            getRecord: function () {
                var selfForm = this;
                $.each(self.options.fields, function (k, v) {
                    if (v.type.startsWith('multipopup')) {
                        var data = form.fields[k].$el.data('w2field');
                        if (data.fieldData != null) {
                            form.record[v.field + 'Data'] = data.fieldData;
                            form.record[v.field] = data.toMulticodeString();
                        }
                        else {
                            form.record[v.field + 'Data'] = null;
                            form.record[v.field] = null;
                        }
                    }
                    else if (v.type == 'checkbox') {
                        if (form.record[v.field]) {
                            form.record[v.field] = form.record[v.field] == 1;
                        }
                        else {
                            form.record[v.field] = false;
                        }
                    }
                });
                return form.record;
            },
        });

        this._super();
        this._saveData(form);

    },
    _formatRecordByType: function (record) {
        $.each(this.options.fields, function (k, v) {
            if (v.type == 'date' && record[v.field] != null) {
                record[v.field] = moment(record[v.field], moment.ISO_8601).format('YYYY-MM-DD');
            }
            else if (v.type == 'datetime' && record[v.field] != null) {
                record[v.field] = moment(record[v.field], moment.ISO_8601).format('YYYY-MM-DD HH:mm');
            }
        });
    },
    _createFormElement: function () {
        var table = $('<table>')
                        .addClass('table-form') // this class needs to be added in order to styling correctly
                        .css('border-spacing', this.options.boderSpacing)
                        .css('width', '100%')
                        .css('margin', '0px 0px')
        ;

        var tr = $('<tr>');//.css('border', '1px solid');

        for (var i = 0, v = 0, field; (field = this.options.fields[i]) ; i++) {
            var fieldElement = this._createInputElement(field);
            var td = $('<td>').append(fieldElement).attr('colspan', field.span);

            if (!fieldElement) {
                if (field.span && field.span >= this.options.fieldPerRow) {
                    // add a seperator if the row is null
                    td.append($('<hr>').addClass('separator'));
                }
            }

            var span = field.span || 1;

            if (span > this.options.fieldPerRow) {
                throw new Error("span > fieldPerRow");
            }
            var nextV = v + span;

            if (nextV >= this.options.fieldPerRow) {
                if (nextV > this.options.fieldPerRow) {
                    table.append(tr);
                    i--;
                } else {
                    table.append(tr.append(td));
                }

                tr = $('<tr>');
                v = 0;
                continue;
            } else {
                tr.append(td);
            }

            if (i + 1 == this.options.fields.length) {
                table.append(tr.append(td));
                break;
            }

            v += span;
        }

        return $('<div>')
            .append(table)
			.css({
			    'width': '100%',
			    'padding': '5px'
			});
    },
    _createInputElement: function (fieldOption) {
        if (fieldOption.type == 'empty') {
            return null;
        }
        var inputDiv = $('<div>').addClass('w2ui-field');
        var label = $('<label>').css({ 'width': (this.options.labelWidth + 'px'), 'text-align': 'left', 'margin-left': '2px' });
        var input = fieldOption.type !== "radio" ? this._getInputByOption(fieldOption).attr('name', fieldOption.field) : this._getInputByOption(fieldOption);

        if (fieldOption.html) {
            label.text(fieldOption.html.caption || (fieldOption.caption || fieldOption.field));
            if (fieldOption.html.attr)
                input.attr(fieldOption.html.attr);
        }
        else {
            label.text(fieldOption.caption || fieldOption.field);
        }

        var inputBox = $('<div>').append(fieldOption.type !== "radio" ? input : input[0].innerHTML).css('margin-left', (this.options.labelWidth + 1) + 'px')
        input.css({
            border: 0
        });

        switch (fieldOption.type) {
            case 'list':
            case 'select':
                inputBox.css({
                    padding: '1px'
                });
                break;
            case 'enum':
                inputBox.css({
                    border: '0',
                    backgroundColor: 'transparent',
                    padding: 0
                });
                input.css({ display: 'none' });
                break;
            default:
                break;
        }
        return inputDiv.append(label).append(inputBox);
    },
    _getInputByOption: function (fieldOption) {
        var self = this;
        var tmp = null;
        switch (fieldOption.type) {
            case 'textarea':
                tmp = $('<textarea>').css('resize', 'vertical');
                break;
            case 'select':
                tmp = $('<select>');
                break;
            case 'checkbox':
                tmp = $('<input>').attr({
                    'type': 'checkbox',
                });
                break;
            case 'radio':
                tmp = $('<div>');
                for (var i = 0; i < fieldOption.options.items.length; i++) {
                    var radioButton = '<label style="margin-left: 5px;"><input name="' + fieldOption.field + '" class="w2ui-input" type = "radio" '
                        + 'style="vertical-align: middle; margin-top: 3px;"' + ' value="' + fieldOption.options.items[i].id + '"/>'
                        + '&#160;' + fieldOption.options.items[i].text + '</label>';
                    if (i % 2 == 1) {
                        radioButton += '<br>';
                    }
                    $(radioButton).appendTo(tmp);
                }
                break;
            case 'pass':
            case 'password':
                tmp = $('<input>').attr('type', 'password');
                break;
            default:
                tmp = $('<input>').attr('type', 'text');
                break;
        }
        if (tmp) {
            tmp.css('width', '100%');
        }
        return tmp;
    },
});