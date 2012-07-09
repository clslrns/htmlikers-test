(function( $ ){

    var ChampionGrid = function( element, options )
    {
        this.element = element;
        this.options = options;
        this.init();
    }
    
    ChampionGrid.prototype = {
        init : function()
        {
        },
        selectAllToggle : function()
        {
            var tableRows = this.element.find('tbody tr');

            if( tableRows.filter('.selected').length )
            {
                tableRows
                    .removeClass('selected')
                        .find('input[type=checkbox]')
                        .click();
            }
            else
            {
                tableRows
                    .addClass('selected')
                        .find('input[type=checkbox]')
                        .click();
            }
        }
    }

    $.fn.championGrid = function( options )
    {
        var defaults = {
            confirmClass : 'champion-confirm',
            formClass : 'champion-form'
        };
        
        $.extend( defaults, options );
        
        $(this).each( function(){
            $(this).data(
                'myChampionGrid',
                new ChampionGrid( $(this), defaults )
            );
        });
        
        return this;
    }

})( jQuery );