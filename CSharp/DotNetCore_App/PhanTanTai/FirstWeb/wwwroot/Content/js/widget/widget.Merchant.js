/* 
 * Tac gia: Nguyen Hoang Duy
 * Ngay: 2018.08.10
 */
$.widget('widget.Merchant', $.widget.base, {
    options: {
        name: 'Merchant',
        data: []
    },
    _create: function () {
        var self = this;
        this.element.append(self._draw());
        this._super();
        this._saveData(this);
    },
    _draw: function () {
        var self = this;
        var box = $("<div>").css({ "padding-bottom": "25px", "padding-top": "20px" }).addClass("text-center");
        var img =
            $("<div>")
                .css({ "display": "inline-block", "vertical-align": "top", "margin-right": "20px" })
                .append($("<img>").css({ "width": "100px", "height": "auto" })
                    .attr({ "src": "/Content/Images/CommingSoon.gif" }))
                .appendTo(box);
        $("<div>").css({ "display": "inline-block", "vertical-align": "top" })
            .append(
                $("<h1>")
                    .html(self.options.data.Name)
                    .css({ "font-size": "25px", "text-transform": "uppercase", "font-weight": "bold", "color": "blue" })
            )
            .append(
                $("<h5>").html(self.options.data.Address)
            )
            .append(
                $("<h5>").html("Tel: " + self.options.data.Phone)
            )
            .append(
                $("<h5>").html("Email: " + self.options.data.Email)
            )
            .appendTo(box);
        return box;
    },
    _destroy: function () {
        this.element.html('');
    },
    reset: function (data) {
        this._destroy();
        this.options.data = data;
        this._create();
    }
});