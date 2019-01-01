(window.MSReady = window.MSReady || []).push(function ($) {

    "use strict";
    var masterslider_8353 = new MasterSlider();

    // slider controls
    masterslider_8353.control('arrows', {
        autohide: true,
        overVideo: true
    });
    masterslider_8353.control('bullets', {
        autohide: false,
        overVideo: true,
        dir: 'h',
        align: 'bottom',
        space: 8,
        margin: 25
    });
    // slider setup
    masterslider_8353.setup("MS5af444ba18353", {
        width: 1140,
        height: 780,
        minHeight: 0,
        space: 0,
        start: 1,
        grabCursor: true,
        swipe: false,
        mouse: true,
        keyboard: false,
        layout: "fullwidth",
        wheel: false,
        autoplay: true,
        instantStartLayers: false,
        mobileBGVideo: false,
        loop: true,
        shuffle: false,
        preload: 0,
        heightLimit: true,
        autoHeight: false,
        smoothHeight: true,
        endPause: false,
        overPause: true,
        fillMode: "fill",
        centerControls: true,
        startOnAppear: false,
        layersMode: "center",
        autofillTarget: "",
        hideLayers: false,
        fullscreenMargin: 0,
        speed: 20,
        dir: "h",
        parallaxMode: 'swipe',
        view: "fadeFlow"
    });

    MSScrollParallax.setup(masterslider_8353, 30, 50, true);
    $("head").append("<link rel='stylesheet' id='ms-fonts'  href='//fonts.googleapis.com/css?family=Open+Sans:300,700|Merriweather:regular' type='text/css' media='all' />");

    window.masterslider_instances = window.masterslider_instances || [];
    window.masterslider_instances.push(masterslider_8353);
});