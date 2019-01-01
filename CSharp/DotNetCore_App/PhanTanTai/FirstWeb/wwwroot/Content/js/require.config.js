require.config({
    baseUrl: '/Content/js',
    paths: {
        framework: 'framework',
        common: 'framework.common',
        global: 'framework.global',
        inputpage: 'framework.layout.inputpage',
        listpage: 'framework.layout.listpage',
        widget: 'widget.setting',
        layout: 'layout.setting',
        domReady: '../plugins/requirejs/domReady',

        // widgets
        assignment: 'widget/widget.assignment',
        base: 'widget/widget.base',
        button: 'widget/widget.button',
        calendar: 'widget/widget.calendar',
        form: 'widget/widget.form',
        pagination: 'widget/widget.pagination',
        panel: 'widget/widget.panel',
        grid: 'widget/widget.grid',
        texteditor: 'widget/widget.texteditor',
        gallery: 'widget/widget.gallery',
        uploader: 'widget/widget.uploader',
        tabs: 'widget/widget.tabs',
        boxcontent: 'widget/widget.boxcontent',
        roomMap: 'widget/widget.roomMap',
        checkboxTable: 'widget/widget.checkboxTable',
        pluploadCustom: 'widget/widget.pluploadCustom',
        roomCalendar: 'widget/widget.roomCalendar',
        titleToolbar: 'widget/widget.titleToolbar',
        gridRenderType: 'widget/widget.grid.rendertype',
        chatConversation: 'widget/widget.chatConversation',
        chatUserList: 'widget/widget.chatUserList',
        panelBox:'widget/widget.panelBox',
        userCurrent: 'widget/widget.userCurrent',
        googlePicker: 'widget/widget.googlePicker',

        //w2ui settings
        //w2uiSetting: 'w2ui.setting',

        //w2ui custom field type
        popupField: 'w2uiCustomFieldType/widgetConfigField',
        multicodeField: 'w2uiCustomFieldType/widgetConfigMulticodeField',
        linkTextField: 'w2uiCustomFieldType/linktextField',

        //plugin
        ckeditor: '../plugins/ckeditor-492-math/ckeditor',
        pluploadcore: '../plugins/plupload-2.1.9/js/plupload.full.min',
        pluploadui: '../plugins/plupload-2.1.9/js/jquery.ui.plupload/jquery.ui.plupload.min',
        stringJs: '../plugins/stringJs/String',
        linkGoogleAPI: 'https://apis.google.com/js/api', //.js?
        contextMenu: '../plugins/Jquery-ContextMenu/contextMenu',
    },
    shim: {
        framework: ['widget', 'global', 'common'],

        // widget
        assignment: ['base'],
        button: ['base'],
        calendar: ['base'],
        form: ['base', 'popupField', 'multicodeField', 'linkTextField'],
        pagination: ['base'],
        panel: ['base'],
        grid: ['base', 'pagination', 'gridRenderType'],
        texteditor: ['base', 'ckeditor'],
        gallery: ['base'],
        //uploader: ['base', 'pluploadcore', 'pluploadui'],
        tabs: ['base'],
        boxcontent: ['base'],
        checkboxTable: ['base', 'stringJs'],
        pluploadCustom: ['base', 'pluploadcore', 'pluploadui'],
        roomCalendar: ['base'],
        chatConversation: ['base'],
        chatUserList: ['base'],
        userCurrent: ['base'],
        googlePicker: ['base', 'linkGoogleAPI'],
        roomMap: ['base', 'contextMenu'],
        // layouts
        inputpage: ['framework', 'widget'],
        listpage: ['framework', 'widget', 'panel'],

        layout: ['global', 'widget'],

        //plugins
        pluploadui: ['pluploadcore']
    },
});