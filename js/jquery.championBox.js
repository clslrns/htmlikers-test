(function( $ ){

    var CustomCheckbox = function( element, options )
    {
        this.element = element;
        this.options = options;
        this.checked = !!this.element.attr('checked');
        this.init();
    }
    
    CustomCheckbox.prototype = {
        init : function()
        {
            this.element
                .hide()
                .wrap('<span class="' + this.options.customClass + '" />');
            
            this.element.parent().click( this.toggle );
        },
        toggle : function()
        {
            var ob = $(this).find('input').data('myCustomCheckbox');
            ob.checked = !ob.checked;
            ob.element
                .parent().toggleClass('cb-checked').end();
                
            if( ob.checked )
            {
                ob.element.attr( 'checked', 'checked' );
            }
            else
            {
                ob.element.removeAttr( 'checked' );
            }
        }
    }

    $.fn.customCheckbox = function( options )
    {
        var defaults = {
            customClass : 'champion-box'
        };
        
        $.extend( defaults, options );
        
        $(this).each( function(){
            $(this).data(
                'myCustomCheckbox',
                new CustomCheckbox( $(this), defaults )
            );
        });
        
        return this;
    }

})( jQuery );