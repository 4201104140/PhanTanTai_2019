$.widget('widget.pagination', $.widget.base, {
    options: {
        name: null,
        totalPages: 1,
        startPage: 1,
        position: 'left',
        first: "&laquo;",
        prev: "&lsaquo;",
        next: "&rsaquo;",
        last: "&raquo;",
    },
    _create: function () {
        this.pagi = $('<ul>')
                    .addClass('pagination')
                    .addClass('pagination-sm')
                    //.addClass('pull-right')
                    .css('padding', '3px 3px 0 0')
        ;
        this.element.addClass('text-' + this.options.position).append(this.pagi);

        var pagination = this.pagi.twbsPagination(this.options);

        this._super();

        var self = this;
        $.extend(pagination, {
            reset: function (page, total) {
                self.reset(page, total);
            }
        });
        //console.log(pagination);
        this._saveData(pagination);
        

    },
    reset: function (page, total) {
        if (this.pagi.data("twbs-pagination")) {
            //console.log('destroy');
            this.pagi.twbsPagination('destroy');
        }
        this.options.totalPages = total > 0 ? total : 1;
        this.options.startPage = page;
        //console.log(this.options);
        this.pagi.twbsPagination(this.options);
    }
});