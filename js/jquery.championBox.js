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
            var that = this;
            this.element
                .hide()
                .wrap('<span class="' + this.options.customClass + '" />');
            
            this.element.parent().click( this.toggle );

            $('label[for=' + this.element.attr( 'id' ) + ']')
                .click( function( event ){
                    
                    event.preventDefault();
                    
                    var el = $(this).find( '.' + that.options.customClass );
                    if( el.length )
                    {
                        that.toggle.apply(
                            el.find('.' + that.options.customClass),
                            arguments
                        );
                    }
                    else
                    {
                        el = $( '#' + $(this).attr('for') );
                        if( el.length )
                        {
                            that.toggle.apply(
                                el.parent(), arguments
                            );
                        }
                    }
                });
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
            ob.options.onCheck.call( $(this), $(this) );
        }
    }

    $.fn.customCheckbox = function( options )
    {
        var defaults = {
            customClass : 'champion-box',
            // This function will be called after checkbox toggle
            // Have custom span in first argument and 
            onCheck : function(){}
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