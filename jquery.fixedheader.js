/**
 * @title jQuery Fixed Header
 * @Author Jim Doyle
 * @version 0.1.0
 * @description jQuery plugin for fixed position header that can change position on scroll
 */

;(function ( $ ) {
    var pluginName = "fixedHeader";

    /**
     * TODO:
     * - Add styles as style tag, rather than inline, so they can be removed when 'destroy' is used
     * - Add support for older browsers (ie8 and below) by using the `top` property instead of `translateY`
     * - This may cause issues on iOS7 and below (need to test).
     */

    var utils = {
        // So we know what browser we're using and if it needs vendor prefixes for transform property
        getTransformName: function() {
            var st = window.getComputedStyle(document.body, null);

            var rtnObj = {
                css: null, js: null
            }
            
            if( st.getPropertyValue("transform") !== null ) {
                rtnObj.css = "transform";
                rtnObj.js = "transform";
                return rtnObj;
            }

            if( st.getPropertyValue("-webkit-transform") !== null ) {
                rtnObj.css = "-webkit-transform";
                rtnObj.js = "webkitTransform";
                return rtnObj;
            }

            if( st.getPropertyValue("-moz-transform") !== null )    {
                rtnObj.css = "-moz-transform";
                rtnObj.js = "MozTransform";
                return rtnObj;
            }
            
            if( st.getPropertyValue("-ms-transform") !== null ) {
                rtnObj.css = "-ms-transform";
                rtnObj.js = "msTransform";
                return rtnObj;
            }
            
            if( st.getPropertyValue("-o-transform") !== null ) {
                rtnObj.css = "-o-transform";
                rtnObj.js = "OTransform";
                return rtnObj;
            }
            
            return null;
        }
    }

    var transformName = utils.getTransformName() // stores varied CSS property names for transform, depending on browser (needed for setting inline styles)
        ,$win = $(window);

    var setFixedPos = function($el, offsetY, cb) {
        var scrollAmt = $win.scrollTop();

        console.log( offsetY )

        var posY = scrollAmt > offsetY ? 0 : offsetY - scrollAmt;
        $el.css( transformName.css, 'translateY('+posY+'px)' );

        if(cb) cb();
    }

    /**
     * Default options
     * @type {offsetY: number, onUpdate: function}
     */
    var defaultOptions = {
        offsetY: 80,
        allowConsoleOverride: true,
        onUpdate: null,
        destroy: false
    };

    /**
     * Creates the plugin instance
     */
    $.fn[pluginName] = function ( options ) {

        var options = options || defaultOptions;

        return this.each(function () {

            var $this = $(this);

            // Just incase console isn't present ie8/9, stops JS errors
            if( options.allowConsoleOverride && !window.console ) {
                console.log = function(){};
                console.warn = function(){};
                console.error = function(){};
            }

            if( $this.css('position') !== 'fixed' )
                console.warn('jQuery.'+pluginName, "Your target element doesn't have 'position:fixed' CSS property. Plugin won't work without it!" );


            var scrollHandler = function() {
                setFixedPos($this, options.offsetY, options.onUpdate);
            }

            if( options.destroy ) {
                $el.css( transformName.css, 'translateY(0)' );
                $win.off("scroll", scrollHandler);
                return;
            }

            setFixedPos($this, options.offsetY, options.onUpdate);

            // if already inited, just allow the options to be updated above
            if( !$this.data('inited') ) {

                // call the main function once first, then listen on scroll
                setFixedPos($this, options.offsetY, options.onUpdate);

                $win.on("scroll", scrollHandler);
            }
        });
    };

})( jQuery );