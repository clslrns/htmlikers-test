$(document).ready( function(){

    function actualizeSelectAllButtonState()
    {
        var text = $('table').find('tr.selected').length ?
            'Deselect all' : 'Select all';
        $('.cg-select-all .btn-caption').text( text );
    }

    $('input[type=checkbox]').customCheckbox({
        onCheck : function(){
            var parentRowNum = $(this).parents('tr').index('tr') - 1;
            
            $(this)
                .parents('table')
                .data('myChampionGrid')
                .selectOneToggle( parentRowNum );
                
            actualizeSelectAllButtonState();
        }
    });

    $('.champion-grid').championGrid({
        onRowSelectToggle : actualizeSelectAllButtonState
    });
        
    $('.cg-select-all').click(
        function( event ){
            event.preventDefault();
            $('.champion-grid')
                .data('myChampionGrid').selectAllToggle();
        }
    );
    
    $('.cg-remove-selected').click(
        function( event ){
            event.preventDefault();
            $('.champion-grid')
                .data('myChampionGrid').removeSelectedRowsConfirm();
        }
    );
    
    $('.delete-confirm-dialog .cancel-delete').click(
        function( event ){
            event.preventDefault();
            $('.champion-grid')
                .data('myChampionGrid').removeSelectedRowsConfirmHide();
        }
    );
    $('.delete-confirm-dialog .delete').click(
        function( event ){
            event.preventDefault();
            $('.champion-grid')
                .data('myChampionGrid').removeSelectedRows();
        }
    );
    
    $('.cg-add').click( function( event ){
        event.preventDefault();
        $('.create-user-form').show();
    });

    $('.cg-cancel-addition').click( function( event ){
        event.preventDefault();
        $('.create-user-form').hide();
    });
    
    $('.cg-submit-form').click( function( event ){
    
        if( $('.champion-form').valid() )
        {
            var userData = {};
            event.preventDefault();
            
            userData.lastName = $('#last').val();
            userData.firstName = $('#first').val();
            userData.age = $('#age').val();
            userData.contact = [
                {
                    'type' : 'email',
                    'data' : $('#email').val()
                },
                {
                    'type' : 'phone',
                    'data' : $('#phone').val()
                }
            ];
            userData.address = {
                streetAddress : $('#street').val(),
                city : $('#city').val(),
                postalCode : $('#zip').val()
            };
            
            $('table').data('myChampionGrid').addRow( userData );
            $('.create-user-form').hide();
            document.forms.useraddform.reset();
        }
    });
    
    var rules = {},
        messages = {};
        
    $('.champion-form input[type=text], .champion-form select').each( function(){
        rules[$(this).attr('name')] = {
            'required' : true
        };
        messages[$(this).attr('name')] = '';
    });
    
    rules.email.email = true;
    
    $('.champion-form').validate({
        rules : rules,
        messages : messages
    });
    
});