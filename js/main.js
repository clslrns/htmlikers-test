function actualizeSelectAllButtonState()
{
    var text = $('table').find('tr.selected').length ?
        'Deselect all' : 'Select all';
    $('.cg-select-all .btn-caption').text( text );
}

$(document).ready( function(){

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

    $('.champion-grid').championGrid();
        
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
        var userData = {};
        event.preventDefault();
        
        userData.lastName = $('#last').val();
        userData.firstName = $('#first').val();
        userData.contact = [
            {
                'type' : 'email',
                'data' : $('#email').val()
            }
        ];
        
        $('table').data('myChampionGrid').addRow( userData );
        $('.create-user-form').hide();
        document.forms.useraddform.reset();
    });
    
});