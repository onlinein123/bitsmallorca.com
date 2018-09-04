//= require node_modules/jquery/dist/jquery.min.js
//= require node_modules/slick-carousel/slick/slick.min.js

//= require _js/backtotop.jquery.js
//= require _js/menu.jquery.js


$(function(){
    /******************************
        BACK TO TOP
    ******************************/
    BackToTop.init("#backtotop");
    
    
    
    /******************************
        COOKIE INFO
    ******************************/
    $(window).on("scroll", ToggleCookieInfo);
    
    function ToggleCookieInfo(){
        if ($(window).scrollTop() > 50) {
            $("#cookie_info").remove();
            $(window).off("scroll", ToggleCookieInfo);
        }
    }
    
    
    
    /******************************
        MENU
    ******************************/
    var menuToggler = $("#header_content_top_flags_toggler");
    MenuToggler.init({
        toggler     : menuToggler,
        wrapper     : "#header_content_top_flags_outer",
        menu        : "#header_content_top_flags_inner",
        options     : {
            speed       : 200
        },
        callbacks   : {
            beforeshow  : function(){
                menuToggler.hide();
            },
            afterhide  : function(){
                menuToggler.show();
            }
        }
    });
    $(document).on("click", function(event){
        if (!$(event.target).closest(menuToggler).length) MenuToggler.hide();
    });
    
    
    
    /******************************
        SLICK
    ******************************/
    $(document).on("afterChange", ".slick-slider", function(event){
        $(window).trigger("resize");
    });
    
    $("#about_gallery_slick").slick({
        dots            : true,
        infinite        : true,
        mobileFirst     : true,
        slidesToShow    : 1,
        slidesToScroll  : 1,
        swipeToSlide    : true,
        accessibility   : false,
        prevArrow       : "#about_gallery_prev",
        nextArrow       : "#about_gallery_next",
        appendDots      : "#about_gallery_dots_container"
    });
    
    
    
    /******************************
        SCROLLING
    ******************************/
    // Scroll when a link is Clicked
    $("#header_content_menu").on("click", "a", function(event){
        if (location.pathname.replace(/^\//, "") !== this.pathname.replace(/^\//, "") || location.hostname !== this.hostname) return;
        ScrollToHash(this.hash);
    });
    
    // Animate the first scroll if landing page is a Hash
    if (location.hash) {
        $("html, body").scrollTop(0);
        ScrollToHash(location.hash);
    }
    
    function ScrollToHash(hash){
        hash = $(hash);
        if (hash.length) {
            $("html, body").animate({
                scrollTop : hash.offset().top - 40
            }, 600);
        }
    }
});