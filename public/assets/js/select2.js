function select2(id, setChange) {

    var select2 = $('#'+id).select2({
        minimumResultsForSearch: Infinity,
        width: '100%'
    });
    
    // Select2 by showing the search
    $('.select2-show-search').select2({
        minimumResultsForSearch: '',
        width: '100%'
    });

    // select2-search__field
    $('#'+id).on('click', () => {
        let selectField = document.querySelectorAll('.select2-search__field')
        selectField.forEach((element, index) => {
            element.focus();
        })
    });

    select2.on('select2:select', (e) => {
        if (setChange) {
            setChange(e.params.data.text, 'add');
        }
    });
    select2.on('select2:unselect', (e) => {
        if (setChange) {
            setChange(e.params.data.text, 'remove');
        }
    });
}
