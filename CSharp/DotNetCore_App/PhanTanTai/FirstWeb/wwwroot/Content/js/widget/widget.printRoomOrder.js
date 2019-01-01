/*
 * Tac gia: Nguyen Hoang Duy
 * Ngay: 2018.08.10
 */
$.widget('widget.printRoomOrder', $.widget.base, {
    options: {
        name: null,
        data: []
    },
    _create: function () {
        var self = this;
        this._drawTable(self.options).css({ "padding-bottom": "100px" }).appendTo(this.element);
        this._super();
        this._saveData(this);
    },
    _createEvent: function () {
        var self = this;
    },
    _drawTable: function (options) {
        var self = this;
        var box = $("<div>");
        //create title
        var data = self.options.data.RoomOrder;
        $("<div>").append($("<h1>").html("Hóa đơn #" + data.RoomOrderId).addClass("text-center").css({ "color": "red", "font-size": "20px", "font-weight": "bold" })).appendTo(box);
        $("<hr>").css({ "color": "rgb(71, 157, 156)" }).appendTo(box);
        $("<h5>").html("<b>CheckIn</b>: " + moment(data.FromDate).format("DD/MM/YYYY") + " " + data.FromTime)
            .addClass("text-left")
            .css({ "padding-left": "3%", "display": "inline-block" })
            .appendTo(box);
        $("<h5>").html("<b>CheckOut</b>: " + moment(data.ToDate).format("DD/MM/YYYY") + " " + data.ToTime)
            .addClass("text-right")
            .css({ "padding-right": "3%", "display": "inline-block", "float": "right" })
            .appendTo(box);
        $("<div>")
            .append($("<span>").html("Chi tiết dịch vụ")
            .css({ "font-weight": "bold", "font-size": "15px" }))
            .append(self._CreateTableService())
            .append($("<span>").html("Chi tiết hóa đơn")
            .css({ "font-weight": "bold", "font-size": "15px" }))
            .append(self._createTableInvoice())
            .append(self._createFooter())
            .appendTo(box);
        return box;
    },
    _createHeader: function () {
        var self = this;
        var box = $("<div>").css({ "padding-bottom": "25px", "padding-top": "20px" })
            .addClass("text-center");

        var img = $("<div>").css({ "display": "inline-block", "vertical-align": "top", "margin-right": "20px" })
            .append($("<img>").css({ "width": "100px", "height": "auto" })
            .attr({ "src": "/Content/Images/CommingSoon.gif" }))
            .appendTo(box);

        $("<div>").css({ "display": "inline-block", "vertical-align": "top" })
            .append($("<h1>")
            .html(self.options.data.Merchant.Name)
            .css({ "font-size": "25px", "text-transform": "uppercase", "font-weight": "bold", "color": "rgb(71, 157, 156)" }))
            .append($("<h5>").html(self.options.data.Merchant.Address))
            .append($("<h5>").html("Tel: " + self.options.data.Merchant.Phone))
            .append($("<h5>").html("Email: " + self.options.data.Merchant.Email))
            .appendTo(box);
        return box;
    },
    _CreateTableService: function () {
        var self = this;
        var box = $("<table>").addClass("table table-bordered");
        var thead = $("<thead>").appendTo(box);
        var tr = $("<tr>").appendTo(thead);

        var column = ["STT", "Tên dịch vụ", "SL", "ĐVT", "Đơn giá", "Thành tiền"];
        column.forEach(function (value) {
            tr.append(
                $("<th>").html(value).css({
                    "background-color": "rgb(71, 157, 156)",
                    "font-size": "13px",
                    "font-weight": "bold",
                    "color": "white"
                }).addClass("text-center"));
        });
        var tbody = $("<tbody>").appendTo(box);
        this.options.data.SaleItems = this.options.data.SaleItems || [];
        if (this.options.data.SaleItems.length == 0) {
            var tr = $("<tr>")
                .append($("<td>").css({ padding: '3px' }).addClass("text-center").html("0"))
                .append($("<td>").css({ padding: '3px' }))
                .append($("<td>").css({ padding: '3px' }))
                .append($("<td>").css({ padding: '3px' }))
                .append($("<td>").css({ padding: '3px' }))
                .append($("<td>").css({ padding: '3px' }))
                .appendTo(tbody);
        }
        this.options.data.SaleItems.forEach(function (value, key) {
            var tr = $("<tr>")
                .append($("<td>").css({ padding: '3px' }).addClass("text-center").html(key + 1))
                .append($("<td>").css({ padding: '3px' }).html(value.ProductName))
                .append($("<td>").css({ padding: '3px' }).addClass("text-center").html(value.Qty))
                .append($("<td>").css({ padding: '3px' }).addClass("text-center").html(value.CalcUnit))
                .append($("<td>").css({ padding: '3px' }).addClass("text-right").html(self._renderMoney(value.Price)))
                .append($("<td>").css({ padding: '3px' }).addClass("text-right").html(self._renderMoney(value.Price * value.Qty)))
                .appendTo(tbody);
        });
        //var tfoot = $("<tfoot>").appendTo(box);
        $("<tr>").css({ "background-color": "white" })
            .append($("<td>")
            .addClass("text-right").attr({ "colspan": 5 })
            .html("Tổng cộng").css({ "font-weight": "bold", "font-size": "120%" }))
            .append($("<td>")
            .addClass("text-right")
            .css({ "font-weight": "bold", "font-size": "15px" })
            .html(this._renderMoney(self.options.data.RoomOrder.TotalPriceSale)))
            .appendTo(box);
        return box;
    },
    _createTableInvoice: function () {
        var self = this;
        var box = $("<table>").addClass("table table-bordered");
        var thead = $("<thead>").appendTo(box);
        var tr = $("<tr>").appendTo(thead);
        tr.append(
            $("<th>").html("Ghi chú")
            .css({
                "background-color": "white",
                "font-size": "13px",
                "font-weight": "bold",
            })
            .addClass("text-center"))
            .append($("<th>").html("Số tiền")
            .css({
                "background-color": "white",
                "font-size": "13px",
                "width": "30%"
            })
            .addClass("text-center"));

        var tbody = $("<tbody>").appendTo(box);
        var row = [
            { "Id": "TotalPriceRoom", "Name": "Tiền phòng", },
            { "Id": "TotalPriceSale", "Name": "Tiền dịch vụ", },
            { "Id": "TotalPriceCashReceive", "Name": "Đã thanh toán" },
        ];

        var data = self.options.data.RoomOrder;
        var flag = false;
        row.forEach(function (value) {
            var tr = $("<tr>");
            if (!flag) {
                tr.append($("<td>").attr({ "rowspan": 3 })
                    .addClass("text-center").css({ "vertical-align": "middle", "font-size": "120%" })
                    .html(data.Remarks));
                flag = true;
            }
            tr.append(
                $("<td>").css({ "background-color": "white", padding: '3px' })
                    .append($("<h5>").css({ "float": "left" })
                    .html(value.Name).css({ "font-size": "13px" })
                    .addClass("text-left"))
                    .append($("<h5>").css({ "float": "right" })
                    .css({ "font-size": "13px" })
                    .html(self._renderMoney(data[value.Id]))
                    .addClass("text-right"))
            )
            .appendTo(tbody);
        });
        tbody.append(
            $("<tr>").css({ "background-color": "white" }).append(
                $("<td>")
                    .html("Tổng còn lại phải thanh toán")
                    .css({ "font-size": "120%", "font-weight": "bold" })
                    .addClass("text-right"))
            .append(
                $("<td>")
                    .css({ "font-size": "120%", "font-weight": "bold" })
                    .addClass("text-right")
                    .html(self._renderMoney(data.Total + data.TotalPriceSale - data.TotalPriceCashReceive))
                )
        );
        return box;
    },
    _createFooter: function () {
        var box = $("<div>");
        $("<div>").css({ "float": "left", "padding-left": "15%" }).addClass("text-center")
            .append($("<h5>").html("Khách hàng").css({ "font-size": "15px" }))
            .append($("<h5>").html("<i>Ký, ghi rõ họ tên</i>").css({ "font-size": "10px" }))
            .appendTo(box);
        $("<div>").css({ "float": "right", "padding-right": "15%" }).addClass("text-center")
            .append($("<h5>").html("Người lập hóa đơn").css({ "font-size": "15px" }))
            .append($("<h5>").html("<i>Ký, ghi rõ họ tên</i>").css({ "font-size": "10px" }))
            .appendTo(box);
        return box;
    },
    _renderMoney(data) {
        var val = data;
        if (w2utils.isMoney(val)) {
            val = w2utils.formatNumber(val, w2utils.settings.currencyPrecision, w2utils.settings.groupSymbol);
            val = w2utils.settings.currencyPrefix + val + w2utils.settings.currencySuffix;
        }
        return val;
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