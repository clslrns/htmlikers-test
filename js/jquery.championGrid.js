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
            that.refreshFromFile.call( that );
            
            var interval = setInterval( function(){
                that.refreshFromFile.call( that )
            }, 30000 );
        },
        
        // Select all rows in <tbody>, which mathes rowsSelector
        _select : function( rowsSelector )
        {
            rowsSelector = rowsSelector || '';
            var row = this.element.find('tbody tr' + rowsSelector);
            
            row.toggleClass('selected');
        },
        
        _getEmailFromData : function( userData )
        {
            var email;
            for( var i in userData.contact )
            {
                if( userData.contact[i]['type'] == 'email' )
                {
                    email = userData.contact[i].data;
                }
            }
            return email;
        },
        
        addRow : function( userData )
        {
            var $template = $(this.options.rowTemplate),
                email = this._getEmailFromData( userData );
                        
            $template
                .find('.d-user-name').text(
                    userData.firstName + ' ' + userData.lastName
                ).end()
                .find('.d-email')
                .text(
                    email
                ).attr(
                    'href',
                    'mailto:' + email
                )
                .end()
                .find('label').attr(
                    'for',
                    'user-' + ( $('table tbody tr').length + 1 )
                ).end()
                .find('[type=checkbox]').attr(
                    'id',
                    'user-' + ( $('table tbody tr').length + 1 )
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
        
        editRow : function( userData )
        {
            var email = this._getEmailFromData( userData );
            
            if( email )
            {
                $('table tbody tr').each( function(){
                    if( $(this).find('.d-email').text() == email )
                    {
                        $(this)
                            .find('.d-user-name')
                            .text( userData.firstName + ' ' + userData.lastName );
                    }
                });
            }
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
            var that = this,
                d = new Date();
            $.ajax({
                url : '/htmlikers-test/base.json?' + d.valueOf(),
                dataType : 'text',
                context : that
            }).done( function( data ){
                var users = $.parseJSON( data ),
                    userEmails = [];
                
                for( var i in users )
                {
                    var email = this._getEmailFromData( users[i] );
                    
                    userEmails.push( email );
                    
                    if( $(".d-email[href='mailto:" + email + "']").length )
                    {
                        that.editRow( users[i] );
                    }
                    else
                    {
                        that.addRow( users[i] );
                    }
                }
                
                $('table tbody tr').each( function(){
                    var exists = false,
                        rowEmail = $(this).find('.d-email').text();
                        
                    for( var i in userEmails )
                    {
                        if( rowEmail == userEmails[i] )
                        {
                            console.log( 'exists' );
                            exists = true;
                        }
                    }
                    
                    if( !exists )
                    {
                        $(this).remove();
                    }
                });
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