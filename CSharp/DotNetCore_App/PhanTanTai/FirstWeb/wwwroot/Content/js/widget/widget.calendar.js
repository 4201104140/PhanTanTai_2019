$.widget('widget.calendar', $.widget.base, {
	options: {
		name: null,
		height: '0px',
		days: [
			{ index: 1, text: 'Thứ 2' },
			{ index: 2, text: 'Thứ 3' },
			{ index: 3, text: 'Thứ 4' },
			{ index: 4, text: 'Thứ 5' },
			{ index: 5, text: 'Thứ 6' },
			{ index: 6, text: 'Thứ 7' },
			{ index: 0, text: 'Chủ Nhật' }
		],
		times: ['6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
		owner: {},
		items: [],
		// Get current week by get start date of week
		currentWeek: moment(new Date()),
		formatDate: 'YYYY-MM-DD',
		clickItem: function () { },
		clickOnCell: function () { },
		clickPreviousWeek: function () { },
		clickCurrentWeek: function () { },
		clickNextWeek: function () { }
	},
	_create: function () {
		var self = this;
		self.element.addClass('calendar').css({ 'height': self.options.height });

		var toolBar = $('<div>').addClass('schedule-toolbar');
		var Name ='Không Tồn Tại'
		if (self.options.owner)
		{
		    if(self.options.owner.Name)
		        Name = self.options.owner.Name
		    else
		        Name = self.options.owner.StudentName
		}
		var scheduleOwner = $('<div>').addClass('schedule-owner').html('Tên: ' + Name);
		var actionButton = $('<div>').addClass('btn-group calendar-toolbar');

		var btnNextWeek = $('<button>').addClass('btn').html('Tiếp').click(function (e) {
			self._btnNextWeek(e, self.options.currentWeek);
			self.options.clickNextWeek(e, {
				FromDate: self._getStartDateOfWeek(self.options.currentWeek, this.options.formatDate),
				ToDate: self._getEndDateOfWeek(self.options.currentWeek, this.options.formatDate)
			});
		}.bind(self));
		var btnCurrentWeek = $('<button>').addClass('btn').html('Hiện Tại').click(function (e) {
			self._btnCurrentWeek(e);
			self.options.clickCurrentWeek(e, {
				FromDate: self._getStartDateOfWeek(self.options.currentWeek, this.options.formatDate),
				ToDate: self._getEndDateOfWeek(self.options.currentWeek, this.options.formatDate)
			});
		}.bind(self));
		var btnPreviousWeek = $('<button>').addClass('btn').html('Lùi').click(function (e) {
			self._btnPreviousWeek(e, self.options.currentWeek);
			self.options.clickPreviousWeek(e, {
				FromDate: self._getStartDateOfWeek(self.options.currentWeek, this.options.formatDate),
				ToDate: self._getEndDateOfWeek(self.options.currentWeek, this.options.formatDate)
			});
		}.bind(self));

		actionButton.append([btnPreviousWeek, btnCurrentWeek, btnNextWeek]);
		toolBar.append(scheduleOwner, actionButton);
		toolBar.appendTo(self.element);

		self.options.scheduleContainer = $('<table>')
			.addClass('schedule-container table table-bordered')
			.appendTo(self.element);

		if (self.options.items && self.options.days && self.options.times)
			self._renderData(self.options.items, self.options.days, self.options.times);

		this._super();
		this._addPublicFunction();
		this._saveData(this.options);
	},
	_addPublicFunction: function () {
		var self = this;
		this.options.refreshData = function (items,owner) {
		    self._destroy();
		    self.options.owner=owner
			self.options.items = items;
			self._create();
		};
	},
	_renderData: function (items, days, times, week) {
		var self = this;

		if (days && times) {
			var dayRow = $('<tr>').addClass('day-row');
			var dayCol = $('<th>').addClass('day-col title').html('Giờ').appendTo(dayRow);
			var startDateOfWeek = self.options.currentWeek.startOf('isoWeek');

			for (var index = 0; index < days.length; index++) {
				var isCurrentDate = startDateOfWeek.format(self.options.formatDate) === moment(new Date()).format(self.options.formatDate);
				var title = $('<div>').addClass('title-date').html(days[index].text);
				var subTitle = $('<span>').addClass('sub__title-date').html(startDateOfWeek.format('DD/MM/YYYY'));
				var dateLine = $('<th>').addClass('day-col').append(title, subTitle);

				isCurrentDate && dateLine.addClass('active');

				$.extend(days[index], { value: startDateOfWeek.format(self.options.formatDate) });
				dayRow.append(dateLine);
				startDateOfWeek = startDateOfWeek.clone().add(1, 'd');
			}

			self.options.scheduleContainer.append(dayRow);

			$.each(times, function (key, time) {
				var timeRow = $('<tr>').addClass('time-row');
				var timeCol = $('<td>').addClass('time-col').html(time).appendTo(timeRow);

				$.each(days, function (key, day) {
					var timeLine = $('<td>').addClass('time-line').css('border', '1px solid #ddd');

					if (items) {
						$.each(items, function (itemKey, item) {

							if (
								self._getDateInWeek(item.FromDate) === day.index &&
								self._isTimeLine(item.FromTime, time) &&
								self._isDateInCurrentWeek(item.FromDate, self.options.currentWeek)
							) {
								var schedule = $('<div>').addClass('schedule');
								var certificate = $('<div>').addClass('schedule-certificate').html('Môn: ' + item.CertificateName);
								var room = $('<div>').addClass('schedule-room').html('Phòng: ' + item.RoomName);
								var fromToDate = $('<div>').addClass('schedule-timeline').html('Giờ: ' + item.FromTime + ' - ' + item.ToTime);

								schedule.append(certificate);
								schedule.append(room);
								schedule.append(fromToDate);
								schedule.appendTo(timeLine);

								schedule.click(function (e) {
									$('.calendar .schedule').removeClass('active');
									schedule.addClass('active');
									self.options.clickItem(e, {
										value: item,
										key: itemKey
									});
								}.bind(self));
							}
						});
					}

					var btnCreateRoomSchedule = $('<div>').addClass('schedule create-schedule');
					var btnCreateRoomScheduleIcon = $('<i>').addClass('fa fa-plus').css('padding-right', '5px');
					btnCreateRoomSchedule.append(btnCreateRoomScheduleIcon).append('Tạo Kế Hoạch');

					btnCreateRoomSchedule.click(function (e) {
						self.options.clickOnCell(e, {
							FromDate: day.value,
							FromTime: time
						});
					}.bind(self));
					timeLine[0].childNodes &&
					timeLine[0].childNodes.length === 0 &&
					btnCreateRoomSchedule.appendTo(timeLine);

					timeRow.append(timeLine);
				});

				self.options.scheduleContainer.append(timeRow);
			});
		}
	},
	_getDateInWeek: function (date) {
		var formattedDate = moment(date).format(this.options.formatDate);

		// Return date in week
		return moment(formattedDate).day();
	},
	_isTimeLine: function (time, timeLine) {
		var hourTime = time.split(':');
		var hourTimeLine = timeLine.split(':');

		return hourTime[0] === hourTimeLine[0];
	},
	_isDateInCurrentWeek: function (date, currentWeek) {
		var formattedDate = moment(new Date(date)).format(this.options.formatDate);
		var startOfWeek = moment(new Date(currentWeek)).startOf('isoWeek');
		var endOfWeek = moment(new Date(currentWeek)).endOf('isoWeek');
		var day = startOfWeek;

		while (day <= endOfWeek) {
			if (formattedDate === day.format(this.options.formatDate))
				return true;
			else
				day = day.clone().add(1, 'd');
		}

		return false;
	},
	_btnNextWeek: function (event, currentDate) {
		var nextWeek = moment(new Date(currentDate)).startOf('isoWeek').add(1, 'weeks').startOf('isoWeek');

		this._refresh(nextWeek);
	},
	_btnCurrentWeek: function (event, currentDate) {
		var currentWeek = moment(new Date()).startOf('isoWeek');

		this._refresh(currentWeek);
	},
	_btnPreviousWeek: function (event, currentDate) {
		var prevWeek = moment(new Date(currentDate)).startOf('isoWeek').subtract(1, 'weeks').startOf('isoWeek');

		this._refresh(prevWeek);
	},
	_getStartDateOfWeek: function (week, formatDate) {
		return moment(new Date(week)).startOf('isoWeek').format(formatDate);
	},
	_getEndDateOfWeek: function (week, formatDate) {
		return moment(new Date(week)).endOf('isoWeek').format(formatDate);
	},
	_refresh: function (week) {
		var self = this;

		self._destroy();
		self.options.currentWeek = week;
		self._create();
	},
	_destroy: function () {
		this.element.html('');
	}
});