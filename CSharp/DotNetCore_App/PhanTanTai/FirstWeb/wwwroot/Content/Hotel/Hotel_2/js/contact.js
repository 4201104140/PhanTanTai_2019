
    jQuery(document).ready(function($) {
            var map1 = $("#map1").maps({
        "map_options": {
        "center_lat": "51.5073509",
    "center_lng": "-0.12775829999998223",
    "zoom": 14,
    "map_type_id": "ROADMAP",
    "draggable": true,
    "scroll_wheel": false,
    "display_45_imagery": "",
    "marker_default_icon": null,
    "infowindow_setting": "",
    "infowindow_bounce_animation": null,
    "infowindow_drop_animation": false,
    "close_infowindow_on_map_click": false,
    "default_infowindow_open": false,
    "infowindow_open_event": "click",
    "full_screen_control": true,
    "search_control": true,
    "zoom_control": true,
    "map_type_control": true,
    "street_view_control": true,
    "full_screen_control_position": null,
    "search_control_position": null,
    "zoom_control_position": null,
    "map_type_control_position": null,
    "map_type_control_style": null,
    "street_view_control_position": null,
    "map_control": true,
    "map_control_settings": null,
    "width": "",
    "height": "450"
},
                "places": [{
        "id": "1",
    "title": "London",
    "address": "london",
    "source": "manual",
    "content": "London",
                    "location": {
        "icon": null,
    "lat": "51.5073509",
    "lng": "-0.12775829999998223",
    "city": null,
    "state": null,
    "country": null,
    "onclick_action": "marker",
    "redirect_custom_link": null,
    "marker_image": null,
    "open_new_tab": null,
    "postal_code": null,
    "draggable": false,
    "infowindow_default_open": false,
    "animation": null,
    "infowindow_disable": true,
    "zoom": 5,
    "extra_fields": null
},
"categories": [],
"custom_filters": null
}],
"street_view": null,
                "map_property": {
        "map_id": "1"
}
}).data("wpgmp_maps");
});
