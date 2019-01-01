$.widget('widget.RoomOrderCalendar', $.widget.base, {
    options: {
        name: null,
        height: '0px',
        rooms: [],
        items: [],
        // Get current week by get start date of week
        currentWeek: moment(new Date()),
        clickItem: function (e) { },
        clickOnCell: function (e) { }
    },
    _create: function () {
        var self = this;
        self.element.addClass('stackblitz-container material');
        var div = $("<div>").addClass("col-lg-12 control-section").appendTo(self.element);
        var wrapper = $('<div>').addClass("content-wrapper").appendTo(div);
        var content = $('<div id="Schedule">').appendTo(div);

        var js = $('<script id="resource-template" type="text/x-template">').appendTo(document.body);//document.createElement("script");
        var contentJs = $('<div class="template-wrap">').appendTo(js);
        $('<div class="room-name">').html('${getRoomName(data)}').appendTo(contentJs);
        $('<div class="room-type">').html('${getRoomType(data)}').appendTo(contentJs);
        $('<div class="room-capacity">').html('${getRoomCapacity(data)}').appendTo(contentJs);

        ej.base.enableRipple(true);

        var isReadOnly = function (endDate) {
            return (endDate < new Date(2018, 6, 31, 0, 0));
        };
        window.getRoomName = function (value) {
            return value.resourceData[value.resource.textField];
        };
        window.getRoomType = function (value) {
            return value.resourceData.type || '';
        };
        window.getRoomCapacity = function (value) {
            return value.resourceData.capacity || '';
        };

        debugger;
        var dataManager = new ej.data.DataManager({
            url: '/RoomOrder/RoomOrderCalendarExecuteSearch',//'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
            adaptor: new ej.data.UrlAdaptor(),
            //crossDomain: true
        });

        //var data = new ej.base.extend([], self.options.items, null, true); //window.readonlyEventsData, window.roomData
        var scheduleObj = new ej.schedule.Schedule({
            width: '100%',
            height: '650px',
            readonly: false,
            //selectedDate: new Date(2018, 11, 18), //default is system date
            currentView: 'TimelineWeek',
            showQuickInfo: true,
            //locale: 'vi-VN',
            //dateFormat: "dd/MM/yyyy",
            firstDayOfWeek: 1, //Monday
            //timeFormat: "h:mm a",
            workHours: {
                start: '08:00',
                end: '18:00'
            },
            timeScale: {
                slotCount: 1, // 2: 9h 9h30
                interval: 1440
            },
            allowDragAndDrop: true,
            allowResizing: true,
            showHeaderBar: true,
            views: [
                //{ option: 'Day' }, //timeScale: {enable: true, slotCount: 5},  interval: 2
                //{ option: 'Week' }, //startHour: '10:00', endHour: '18:00'
                //{ option: 'Month' }, //showWeekend: false, showWeekNumber: true
                //{ option: 'TimelineDay' },
                { option: 'TimelineWeek' },
                //{ option: 'Agenda' },
                //{ option: 'MonthAgenda' }
            ],
            resourceHeaderTemplate: '#resource-template',
            group: {
                enableCompactView: false,
                resources: ['HotelRoom']
            },
            resources: [{
                field: 'RoomId', title: 'Room Type',
                name: 'HotelRoom', allowMultiple: true,
                dataSource: self.options.rooms,
                textField: 'RoomName', idField: 'RoomId', colorField: 'color'
            }],
            eventSettings: {
                dataSource: self.options.items, //self.options.items,
                //query: new ej.data.Query().addParams('ej2schedule', 'true'),
                enableTooltip: true,
                fields: {
                    id: 'RoomOrderId',
                    subject: { title: 'Summary', name: 'StringCustomerName', default: 'Add Title' },
                    location: { title: 'Location', name: 'Location' },
                    isAllDay: { name: 'IsAllDay' },
                    description: { title: 'Comments', name: 'Remarks' },
                    startTime: { title: 'From', name: 'StartTime' },
                    endTime: { title: 'To', name: 'EndTime' }
                }
            },
            //popupOpen: function (args) {
            //    var data = args.data;
            //    if (args.type === 'QuickInfo' || args.type === 'Editor' || args.type === 'RecurrenceAlert' || args.type === 'DeleteAlert') {
            //        var target = (args.type === 'RecurrenceAlert' ||
            //            args.type === 'DeleteAlert') ? data.element[0] : args.target;
            //        if (!ej.base.isNullOrUndefined(target) && target.classList.contains('e-work-cells')) {
            //            if ((target.classList.contains('e-read-only-cells')) ||
            //                (!scheduleObj.isSlotAvailable(data.endTime, data.endTime, data.groupIndex))) {
            //                args.cancel = true;
            //            }
            //        }
            //        else if (!ej.base.isNullOrUndefined(target) && target.classList.contains('e-appointment') &&
            //            (isReadOnly(data.EndTime))) {
            //            args.cancel = true;
            //        }
            //    }
            //},
            //renderCell: function (args) {
            //    if (args.element.classList.contains('e-work-cells')) {
            //        if (args.date < new Date(2018, 6, 31, 0, 0)) {
            //            args.element.setAttribute('aria-readonly', 'true');
            //            args.element.classList.add('e-read-only-cells');
            //        }
            //    }
            //    if (args.elementType === 'emptyCells' && args.element.classList.contains('e-resource-left-td')) {
            //        var target = args.element.querySelector('.e-resource-text');
            //        target.innerHTML = '<div class="name">Phòng</div><div class="type">Loại</div><div class="capacity">Sức chứa</div>';
            //    }
            //},
            //eventRendered: function (args) {
            //    var data = args.data;
            //    if (isReadOnly(data.EndTime)) {
            //        args.element.setAttribute('aria-readonly', 'true');
            //        args.element.classList.add('e-read-only');
            //    }
            //},
            //actionBegin: function (args) {
            //    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
            //        var data = void 0;
            //        if (args.requestType === 'eventCreate') {
            //            data = args.data[0];
            //        }
            //        else if (args.requestType === 'eventChange') {
            //            data = args.data;
            //        }
            //        var groupIndex = scheduleObj.eventBase.getGroupIndexFromEvent(data);
            //        if (!scheduleObj.isSlotAvailable(data.StartTime, data.EndTime, groupIndex)) {
            //            //args.cancel = true;
            //        }
            //    }
            //},
            //actionFailure: function() {
            //    var span = document.createElement('span');
            //    scheduleObj.element.parentNode.insertBefore(span, scheduleObj.element);
            //    span.style.color = '#FF0000'
            //    span.innerHTML = 'Server exception: 404 Not found';
            //},
            //dragStart: function (args) {
            //    //args.cancel = true;
            //    //args.excludeSelectors = 'e-header-cells'; prevent the drag action on particular target, by passing the target to be excluded in the excludeSelectors option
            //},
            //cellClick: function (args) {
            //    debugger;
            //    self.options.clickOnCell(args);
            //},
            //cellDoubleClick: function (args) {
            //    debugger;
            //    //args.cancel = true;
            //},
            //resizing: function (args) {
            //    //args.cancel = true;
            //},
            //navigating: function (args) {
            //    debugger;
            //},
        });
        scheduleObj.appendTo('#Schedule');

        this._super();
        this._addPublicFunction();
        this._saveData(this.options);
    },
    _addPublicFunction: function () {
        var self = this;
        this.options.refreshData = function (items) {
            self._destroy();
            self.options.items = items;
            self._create();
        };
    },
    _destroy: function () {
        this.element.html('');
    }
});