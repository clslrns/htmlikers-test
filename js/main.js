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
                .data('myChampionGrid').removeSelectedRows();
        }
    );
});