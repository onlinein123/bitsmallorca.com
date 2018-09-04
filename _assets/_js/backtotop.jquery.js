/*************************************************
Back to Top button (Requires jQuery)
    Author  : Gaspare Sganga
    Version : 1.1.0
    License : MIT
*************************************************/
;var BackToTop = (function($, window, undefined){
    // Default settings
    var _defaults = {
        speed           : 500,
        threshold       : 10,
        visibleClass    : "visible"
    };
    
    // Globals
    var _button;
    var _settings;
    
    
    // Public methods
    return {
        init    : init,
        destroy : destroy
    };
    
    function init(button, options){
        _button     = $(button);
        _settings   = $.extend(true, {}, _defaults, options);
        
        _button.on("click", function(event){
            $("html, body").animate({
                scrollTop   : 0
            }, _settings.speed);
        });
        $(window).on("scroll", _checkOffset).trigger("scroll");
    }
    
    function destroy(options){
        _button.removeClass(_settings.visibleClass);
        $(window).off("scroll", _checkOffset);
    }
    
    
    // Private methods
    function _checkOffset(){
        _button.toggleClass(_settings.visibleClass, ($(window).scrollTop() > _settings.threshold));
    }
    
})(jQuery, window);
