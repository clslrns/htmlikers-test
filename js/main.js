$(document).ready( function(){
    $('input[type=checkbox]').customCheckbox();

    $('.champion-grid')
        .championGrid();
        
    $('.cg-select-all').click(
        function( event ){
            event.preventDefault();
            $('.champion-grid').data('myChampionGrid').selectAllToggle();
        }
    );
});