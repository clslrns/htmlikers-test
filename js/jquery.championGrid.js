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
            var that = this;
            var interval = setInterval( function(){
                that.refreshFromFile.call( that )
            }, 5000 );
        },
        
        // Select all rows in <tbody>, which mathes rowsSelector
        _select : function( rowsSelector )
        {
            rowsSelector = rowsSelector || '';
            var row = this.element.find('tbody tr' + rowsSelector);
            
            row.toggleClass('selected');
        },
        
        addRow : function( userData )
        {
            var $template = $(this.options.rowTemplate);
            
            $template.find('.d-user-name').text(
                userData.firstName + ' ' + userData.lastName
            );
                        
            $template.find('input[type=checkbox]').customCheckbox({
                onCheck : function(){
                    var parentRowNum = $(this).parents('tr').index('tr') - 1;
                    
                    $(this)
                        .parents('table')
                        .data('myChampionGrid')
                        .selectOneToggle( parentRowNum );
                        
                    actualizeSelectAllButtonState();
                }
            });
            
            this.element.append( $template );
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
        
        refreshFromFile : function()
        {
            var that = this;
            $.ajax({
                url : '/htmlikers-test/base.json?2',
                dataType : 'text',
                context : that
            }).done( function( data ){
                var users = $.parseJSON( data );
                
                for( i in users )
                {
                    this.addRow( users[i] );
                }
            });
        },

        
        removeSelectedRowsConfirm : function()
        {
            $('.delete-confirm-dialog').slideDown();
        },
        
        removeSelectedRowsConfirmHide : function()
        {
            $('.delete-confirm-dialog').slideUp();
        },
        
        removeSelectedRows : function()
        {
            $('.delete-confirm-dialog').hide();
            this.element.find('tr.selected').remove();
        }
    }

    $.fn.championGrid = function( options )
    {
        var defaults = {
            confirmClass : 'champion-confirm',
            formClass : 'champion-form',
            rowTemplate : '<tr>'
				+ '<td><input id="x2" name="user" value="" type="checkbox" /></td>'
				+ '<td><label for="x2" class="d-user-name"></label></td>'
				+ '<td class="d-age"></td>'
				+ '<td class="d-address"></td>'
				+ '<td>'
				    + 'Phone: <span class="d-phone"></span><br />'
				 	+  'Email: <a class="d-email"></a>'
				+ '</td>'
			+ '</tr>'
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