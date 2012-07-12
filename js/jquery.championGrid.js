(function( $ ){

    var ChampionGrid = function( element, options )
    {
        this.element = element;
        this.options = options;
        this.init();
    }
    
    ChampionGrid.prototype = {
        init : function()
        {},
        
        // Select all rows in <tbody>, which mathes rowsSelector
        _select : function( rowsSelector )
        {
            rowsSelector = rowsSelector || '';
            var row = this.element.find('tbody tr' + rowsSelector);
            
            row.toggleClass('selected');
        },
        
        selectOneToggle : function( rowNum )
        {
            this._select( ':eq(' + rowNum + ')' );
        },
        
        selectAllToggle : function()
        {
            var tableRows = this.element.find('tbody tr'),
                selectedRows = tableRows.filter('.selected');
            
            if( selectedRows.length )
            {
                this.element.find('.selected [type=checkbox]').click();
            }
            else
            {
                this.element.find('[type=checkbox]').click();
            }
        },
        
        removeSelectedRows : function()
        {
            this.element.find('tr.selected').remove();
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