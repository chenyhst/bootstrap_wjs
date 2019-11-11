$(function () {
    // 初始化工具提示
    $('[data-toggle="tooltip"]').tooltip();

    // 导航条active切换
    var allA = $(".wjs_nav .navbar-nav > li a");
    allA.each(function (i, value) {
        $(value).on("click", function () {
            // 清除active类
            allA.each(function (i, v) {
                $(v).parent().removeClass("active");
            });
            // 添加
            $(this).parent().toggleClass("active");
        });
    });

    var items = $(".carousel-inner .item");
    // 监听屏幕大小变化
    $(window).on("resize", function () {
        var width = $(window).width();
        if (width >= 768) {
            $(items).each(function (index, value) {
                var item = $(this);
                var imgSrc = item.data('largeImage');
                item.html($('<a href="javascript:;" class="pcImg"></a>').css("backgroundImage", "url('" + imgSrc + "')"));
            });
        } else {
            $(items).each(function (index, value) {
                var item = $(this);
                var imgSrc = item.data('smallImage');
                item.html('<a href="javascript:;" class="mobileImg"><img src="' + imgSrc + '"></a>');
            });
        }
    }).trigger("resize");;
    // 移动端滑动
    var startX, endX;
    var carousel_inner = $('.carousel-inner')[0];
    var carousel = $('.carousel');
    carousel.carousel({
        interval: 2500
    });
    carousel_inner.addEventListener("touchstart", function (e) {
        startX = e.targetTouches[0].clientX;
    });
    carousel_inner.addEventListener("touchend", function (e) {
        endX = e.changedTouches[0].clientX;
        if (endX - startX > 0) {
            carousel.carousel('prev');
        }
        else if (endX - startX < 0) {
            carousel.carousel('next');
        }
    });

    /* 计算产品块导航项的原始宽度 */
    var ul = $(".wjs_product .nav-tabs");
    var lis = ul.find("li");
    var totalWidth = 0;// 总宽度
    lis.each(function (index, value) {
        totalWidth = totalWidth + $(value).innerWidth();
        // console.log($(value).innerWidth());
        /*获取宽度的方法的说明：
        * width():它只能得到当前元素的内容的宽度
        * innerWidth():它能获取当前元素的内容的宽度+padding
        * outerWidth():获取当前元素的内容的宽度+padding+border
        * outerWidth(true):获取元素的内容的宽度+padding+border+margin*/
    });
    // console.log(totalWidth);

    ul.width(totalWidth + 6);
    /* 使用插件实现导航条的滑动操作 */
    var myScroll = new IScroll('.tabs_parent', {
        scrollX: true,
        scrollY: false,
        click: true
    });
});