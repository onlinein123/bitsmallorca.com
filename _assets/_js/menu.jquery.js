/*************************************************
MenuToggler (Requires jQuery)
    Author  : Gaspare Sganga
    Version : 1.1.0
    License : MIT
*************************************************
USAGE :
    // Init
    MenuToggler.init({
        toggler     : undefined,
        wrapper     : undefined,
        menu        : undefined,
        options     : {
            speed       : 400   // Integer  - Sliding speed in milliseconds
        },
        callbacks   : {
            beforeshow  : undefined,
            aftershow   : undefined,
            beforehide  : undefined,
            afterhide   : undefined
        }
    });
    
    // Destroy
    MenuToggler.destroy();
    
    // Show
    MenuToggler.show([speed]);
    
    // Hide
    MenuToggler.hide([speed]);
*************************************************/

;var MenuToggler = (function($, window, undefined){
    "use strict";
    
    // Default settings
    var _defaults = {
        toggler : undefined,
        wrapper : undefined,
        menu    : undefined,
        options : {
            speed   : 400
        }
    };
    
    // Globals
    var _settings;
    
    // Flags
    var _fOpen   = false;
    var _fMoving = false;
    
    // Private vars
    var $window     = $(window);
    var $document   = $(window.document);
    
    
    // Public methods
    return {
        init    : init,
        destroy : destroy,
        show    : show,
        hide    : hide
    };
    
    function init(settings){
        _settings = $.extend(true, {}, _defaults, settings);
        _settings.toggler = $(_settings.toggler);
        _settings.wrapper = $(_settings.wrapper);
        _settings.menu    = $(_settings.menu);
        _ToggleVisibility();
        _settings.toggler.on("click", function(event){
            if (!_fOpen) {
                show();
            } else {
                hide();
            }
        });
        $window.on("resize", _ToggleVisibility);
    }
    
    function destroy(){
        $window.off("resize", _ToggleVisibility);
    }
    
    function show(speed){
        if (speed === undefined) speed = _settings.options.speed;
        if (_fMoving || _fOpen) return false;
        _fMoving = true;
        if (typeof _settings.callbacks.beforeshow === "function") _settings.callbacks.beforeshow();
        _settings.wrapper.show();
        _settings.menu.slideDown(speed, function(){
            _fOpen   = true;
            _fMoving = false;
            if (typeof _settings.callbacks.aftershow === "function") _settings.callbacks.aftershow();
        });
    }
    
    function hide(speed){
        if (speed === undefined) speed = _settings.options.speed;
        if (_fMoving || !_fOpen) return false;
        _fMoving = true;
        if (typeof _settings.callbacks.beforehide === "function") _settings.callbacks.beforehide();
        _settings.menu.slideUp(speed, function(){
            _settings.wrapper.hide();
            _fOpen   = false;
            _fMoving = false;
            if (typeof _settings.callbacks.afterhide === "function") _settings.callbacks.afterhide();
        });
    }
    
    
    // Private methods
    function _ToggleVisibility(){
        if (_settings.toggler.is(":visible")) {
            if (_fOpen) return false;
            _settings.wrapper.hide();
            _settings.menu.hide();
        } else {
            _settings.wrapper.show();
            _settings.menu.show();
        }
    }
    
})(jQuery, window);