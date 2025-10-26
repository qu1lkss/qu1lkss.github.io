"use strict";
$(function () {
    var imgs = [
        "images/1.jpg","images/2.jpg","images/3.jpg","images/4.jpg",
        "images/5.jpg","images/6.jpg","images/7.jpg","images/8.jpg"
    ];
    var $viewport = $(".viewport");
    var $track = $("#track");
    var $cur = $("#cur");
    var $all = $("#all");
    var $dots = $("#dots");
    var $prev = $("#prev");
    var $next = $("#next");
    var per = ($(window).width() <= 600) ? 1 : 3;
    var page = 0;
    var pages = Math.ceil(imgs.length / per);
    var itemW = 0;

    function mount() {
        var i;
        $track.empty();
        for (i = 0; i < imgs.length; i += 1) {
            $track.append('<div class="item"><img src="' + imgs[i] + '" alt="img"></div>');
        }
    }

    function buildDots() {
        var i;
        $dots.empty();
        for (i = 0; i < pages; i += 1) {
            $dots.append('<button type="button" data-i="' + i + '"></button>');
        }
    }

    function go(p) {
        page = Math.max(0, Math.min(pages - 1, p));
        var shift = page * itemW * per;
        $track.css("transform", "translateX(" + (-shift) + "px)");
        $cur.text(page + 1);
        $dots.find("button").removeClass("active").eq(page).addClass("active");
        $prev.prop("disabled", page === 0);
        $next.prop("disabled", page === pages - 1);
    }

    function layout() {
        var nper = ($(window).width() <= 600) ? 1 : 3;
        if (nper !== per) {
            per = nper;
            pages = Math.ceil(imgs.length / per);
            page = 0;
            buildDots();
        }
        itemW = Math.floor($viewport.width() / per);
        $track.children(".item").css("width", itemW + "px");
        $track.css("width", (itemW * imgs.length) + "px");
        $all.text(pages);
        go(page);
    }

    $("#next").on("click", function () { if (page < pages - 1) { go(page + 1); } });
    $("#prev").on("click", function () { if (page > 0) { go(page - 1); } });
    $dots.on("click", "button", function () { go(Number($(this).attr("data-i"))); });
    $(window).on("resize", layout);

    mount();
    buildDots();
    layout();
});
