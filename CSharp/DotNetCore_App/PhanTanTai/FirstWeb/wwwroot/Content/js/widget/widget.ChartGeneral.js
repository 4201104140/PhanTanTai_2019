/*
 * Tac gia: Nguyen Hoang Duy
 * Ngay: 2018.11.01
 */
$.widget('widget.ChartGeneral', $.widget.base, {
    options: {
        title: '',
        columnGroups: [],
        chartOptions: {
            dataProvider: []
        }
    },
    _create: function () {
        var self = this;
        //this.uid = framework.global.uuid();
        //this.element.attr( "id", this.uid );
        this.element.css({ 'width': '100%', 'height': '500px' });
        this._drawChart();

        this._super();
        this._saveData(this);
    },
    _createEvent: function () {
        var self = this;
    },
    _drawChart: function () {
        var self = this;
        this.element.css({ "height": this.options.Height });
        var chart = AmCharts.makeChart(this.element[0], this.options.chartOptions);
    },
    _destroy: function () {
        this.element.html('');
    },
    reDrawChart: function (option, dataProvider) {
        this.options.chartOptions = option;
        this.options.chartOptions.dataProvider = dataProvider;
        this._drawChart();
    }
});

AmCharts.addInitHandler(function (chart) {
    if (jQuery.isEmptyObject(chart.dataProvider)) {
        chart.dataProvider = [{}];
        // disable slice labels
        chart.labelsEnabled = false;

        // add label to let users know the chart is empty
        chart.addLabel("50%", "50%", "Không có dữ liệu", "middle", 20);
        chart.chartDiv.style.opacity = 0.5;
        //chart.validateNow();
    }
}, ["serial"]);