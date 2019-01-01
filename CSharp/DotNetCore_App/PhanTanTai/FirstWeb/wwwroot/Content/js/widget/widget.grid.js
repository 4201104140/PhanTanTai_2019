$.widget('widget.grid', $.widget.base, {
    options: {
        name: null
    },
    _create: function () {
        var self = this;
        this._setDefaultValue();

        if (this.options.paginateOptions) {
            var pagiName = 'pagination' + '_' + this.options.name + this.options.paginateOptions.name || '';
            this.options.toolbar.items.push({ type: 'spacer' });
            this.options.toolbar.items.push({
                type: 'html',
                id: pagiName + '_id',
                html: '<div class="pagination pull-right" style="width: 330px; margin-right:-5px;"><ul id="' + pagiName + '" class="pull-right "></ul></div>'
            });
        };
        var recidArr = this.options.recid;
        if ($.isArray(recidArr)) {
            self.addRecid(this.options.data, recidArr);
            this.options.recid = null;
        }

        this._handleRenderType(this.options.columns);
        
        //onCellClick
        if (self.options.onCellClick) {
            //backup onClick
            var onClickBackup = this.options.onClick;
            this.options.onClick = function (e) {
                if (e.column != null) {
                    var renderType = self.options.columns[e.column].RenderType;
                    var record = this.get(e.recid);
                    $.extend(e, {
                        columnOptions: self.options.columns[e.column],
                        srcElement: e.originalEvent.srcElement,
                        srcElementAttributes: self._readAllAttribute(e.originalEvent.srcElement),
                        record: record,
                        RenderTypeResult: (renderType && $.isFunction(renderType)) ? renderType(record) : undefined,
                    });

                    self.options.onCellClick[e.columnOptions.field] && self.options.onCellClick[e.columnOptions.field].call(self, e);
                    //goi ham onClick da backup
                    onClickBackup && onClickBackup.call(self, e);
                }
            }
            
        }
        //========================CONTEXT-MENU==============================
        this.options.add = function (record, first) {
            // METHOD W2GRID.ADD
            if (!$.isArray(record)) record = [record];
            var added = 0;
            for (var i = 0; i < record.length; i++) {
                var rec = record[i];
                if (rec.recid == null && rec[this.recid] == null) {
                    console.log('ERROR: Cannot add record without recid. (obj: ' + this.name + ')');
                    continue;
                }
                if (rec.w2ui && rec.w2ui.summary === true) {
                    if (first) this.summary.unshift(rec); else this.summary.push(rec);
                } else {
                    if (first) this.records.unshift(rec); else this.records.push(rec);
                }
                added++;
            }
            var url = (typeof this.url != 'object' ? this.url : this.url.get);
            
            //ADD CONTEXT MENU
            if (this.MenuItem) {
                for (var i = 0; i < record.length; i++) { // set menu for all record in grid
                    var el = $.parseHTML(grid.getRecordHTML(i, 0)[1]);
                    $.contextMenu({
                        selector: "#" + el[0].id,
                        callback: function (key, options) {
                            self.options.MenuItem.callback(key, grid.get(grid.getSelection()[0]));
                            // key là id của item trong menu
                        },
                        items: self.options.MenuItem.items,
                        events: {
                            show: function (options) {
                                self.options.menuEvent && self.options.menuEvent['show'](options, grid.get(grid.getSelection()[0]));
                            }
                        }
                    });
                }
                $(".context-menu-list li").css({ "text-align": "left" }); // css for ContextMenu

            }
            if (!url) {
                this.total = this.records.length;
                this.localSort(false, true);
                this.localSearch();
                // do not call this.refresh(), this is unnecessary, heavy, and messes with the toolbar.
                this.refreshBody();
                this.resizeRecords();
                return added;
            }
            this.refresh(); // ??  should it be reload?
            return added;
        }
        //========================END-CONTEXT-MENU==============================
        
        var grid = this.element.w2grid(this.options);
        
        this.options.data && grid.add(this.options.data);
        
        if ($.isArray(recidArr)) {
            //proxy 
            var gridAdd = grid.add.bind(grid);
            $.extend(grid, {
                add: function (records) {
                    self.addRecid(records, recidArr);
                    gridAdd(records);
                }
            });
        }

        if (this.options.paginateOptions) {
            var pagi = this.element.find('#' + pagiName).pagination(this.options.paginateOptions);
            var pagiData = pagi.data("widget-pagination").options.__data;
            $.extend(grid, { pagination: pagiData });
        }

        grid.getLastRecord = function () {
            if (grid.records == null || grid.records.length == 0) {
                return null;
            }
            else if (grid.records.length == 1) {
                return grid.records[0];
            }
            else {
                var records = $.extend([], grid.records)
                records.sort(function (a, b) { return a.recid - b.recid });
                return records[records.length - 1];
            }
        }

        // tạo biến tạm để thực hiện get-set trên biến đó
        grid.backupColumns = grid.columns;
        Object.defineProperty(grid, 'columns', {
            set: function (x) {
                self._handleRenderType(x);
                grid.backupColumns = x;
            },
            get: function () {
                return this.backupColumns;
            },
        });

        grid.getChoosedRecord = function (e, allowMultiRecord) {
            var selection = grid.getSelection();
            //on row click
            if (e && e.recid) {
                return e.record || grid.get(selection[0]);
            }
            //on btn grid click
            else {
                if (selection.length == 0) {
                    framework.common.noti('Vui lòng chọn');
                    return;
                }
                return allowMultiRecord == true ? grid.get(selection) : grid.get(selection[0]);
            }
        }

        this.options.onRenderCompleted && this.options.onRenderCompleted(grid);

        this._super();
        this._saveData(grid);
    },
    _readAllAttribute: function ($el) {
        var attrObject = {};
        $.each($el.attributes, function (k, v) {
            attrObject[v.name] = v.value;
        });
        return attrObject;
    },
    _setDefaultValue: function () {
        var self = this;

        //resizable = false
        $.each(this.options.columns, function (k, col) {
            if (!col.resizable) {
                col.resizable = false;
            }
        });
    },
    _handleRenderType: function (columns) {
        var self = this;
        $.each(columns, function (k, col) {
            if (col.RenderType != null) {
                col.options = col.options || {};

                if (!$.isFunction(col.RenderType)) {
                    col.render = self._getRenderFunctionByRenderType(col.RenderType, col);
                }
                    // render type depend on row data
                else {
                    col.render = function (record) {
                        if (col.RenderType(record))
                            return self._getRenderFunctionByRenderType(col.RenderType(record), col)(record);
                        else
                            return col.options.setText ? col.options.setText(record) : record[col.field];
                    }
                }
            }
        });
    },

    _getRenderFunctionByRenderType: function (renderType, col) {
        if (renderType.includes("-")) {
            var renderType = renderType.split('-')[0];
        }
        return widget.grid.rendertype[renderType].bind(col);
    },
    addRecid: function (records, recidArr) {
        if (!$.isArray(records)) {
            records = [records];
        }

        $.each(records || [], function (keyData, valData) {
            var recid = [];
            $.each(recidArr || [], function (key, val) {
                recid.push(valData[val]);
            });
            $.extend(valData, { recid: recid.join('_') });
        });
    }
});