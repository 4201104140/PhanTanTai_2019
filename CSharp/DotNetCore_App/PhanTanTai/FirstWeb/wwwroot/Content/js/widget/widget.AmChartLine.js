$.widget('widget.AmChartLine', $.widget.base, {
    options: {
        name: 'AmChartLine',
        data: [],
        Height: '100%'
    },
    _create: function () {
        var self = this;
        this.element.css({ 'height': this.options.Height });
        this.uuid = framework.global.uuid();
        this.element.attr({ 'id': this.uuid });
        this._Draw();
        this._super();
        this._saveData(this);
    },
    _destroy: function () {
        this.element.html('');
    },
    _Draw: function(){
        var chart = AmCharts.makeChart(this.uuid, this.options.data);
    
    },
    reset: function (data) {
        this._destroy();
        this.options.data = data;
        this._create();
    }
});