(function () {
    $.extend(true, w2utils.settings, {
        "locale": "en-us",
        "dateFormat": "yyyy-mm-dd",
        "timeFormat": "h24",
        "dateDisplay": "Mon d, yyyy",
        "currencyPrefix": "",
        "currencySuffix": "",
        "currencyPrecision": 0, // VND không có dấu phẩy
        "groupSymbol": ",",
        "decimalSymbol": ".",
        "shortmonths": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        "fullmonths": ["January", "February", "March", "April", "May", "June", "July", "August",
                             "September", "October", "November", "December"],
        "shortdays": ["M", "T", "W", "T", "F", "S", "S"],
        "fulldays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "weekStarts": "M",        // can be "M" for Monday or "S" for Sunday

        "phrases": {
            "Yesterday": "Hôm qua",
            "Loading...": "Đang tải...",
            "All Fields": "Tất cả các trường",
            "Are you sure you want to delete selected records?": "Bạn có muốn xóa tất cả các dòng đã chọn?",
            "Show/hide columns": "Ẩn/Hiện các cột",
            "Search...": "Tìm kiếm...",
            "Add New": "Thêm",
            "Edit": "Sửa",
            "Delete": "Xóa",
            "Save": "Lưu",
            "Sorting took": "Sắp xếp trong",
            "sec": "giây",
            "Search took": "Tìm kiếm trong",
            "Line #": "Dòng #",
            "Skip": "Bỏ qua",
            "Clear Search": "Xóa tìm kiếm",
            "Reset": "Khôi phục",
            "Search": "Tìm",
            "Column": "Cột",
            "Notification": "Thông báo",
            "Confirmation": "Xác nhận",
            "Hide": "Ẩn",
            "Show": "Hiện",
            "Attach files by dragging and dropping or Click to Select": "Thêm file bằng cách kéo và thả hoặc click vào để chọn",
            "Remove": "Xóa",
            "Name": "Tên file",
            "Size": "Kích thước",
            "Type": "Kiểu file",
            "Modified": "Đã chỉnh sửa",
            "No matches": "Không trùng khớp",
            "Type to search....": "Nhập từ tìm kiếm...",
            "Not an integer": "Không phải là một số",
            "Not a float": "Không phải là một số thập phân",
            "Not in money format": "Không đúng định dạng tiền tệ",
            "Not a hex number": "Không phải là một số HEX",
            "Not a valid email": "Không phải là email hợp lệ",
            "Not a valid date": "Không phải là ngày hợp lệ",
            "Required field": "Trường bắt buộc",
            "Field should be equal to": "Trường này phải bằng với",
        }
    });
    //w2utils.formatNumber = function (val, groupSymbol) {
    //    debugger;
    //    var ret = '';
    //    if (groupSymbol == null || groupSymbol == 0) groupSymbol = w2utils.settings.groupSymbol || ',';
    //    // check if this is a number
    //    if (w2utils.isFloat(val) || w2utils.isInt(val) || w2utils.isMoney(val)) {
    //        tmp = String(val).split('.');
    //        ret = String(tmp[0]).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + groupSymbol);
    //        if (tmp[1] != null) ret += w2utils.settings.decimalSymbol + tmp[1];
    //    }
    //    return ret;
    //    console.log(ret);
    //}
    w2utils.isMoney = function (val) {
        var se = w2utils.settings;
        var re = new RegExp('^' + (se.currencyPrefix ? '\\' + se.currencyPrefix + '?' : '') + '[-+]?[0-9]*[\\' + w2utils.settings.decimalSymbol + ']?[0-9]+' + (se.currencySuffix ? '\\' + se.currencySuffix + '?' : '') + '$', 'i');
        if (typeof val === 'string') {
            val = val.replace(new RegExp(se.groupSymbol, 'g'), '');
        }
        if (typeof val === 'object' || val === '') return false;
        //
        if (Intl.NumberFormat('en-US').format(val) != 'NaN') {
            return true;
        }
        return re.test(val);
    };
})();
