$('[lang]').hide(); // hide all lang attributes on start.
$('[lang="en"]').show(); // show just English text 
$('#lang-switch').change(function () { // put onchange event when user select option from select
    var lang = $(this).val(); // decide which language to display using switch case. The rest is obvious (i think)
    switch (lang) {
        case 'en':
            $('[lang]').hide();
            $('[lang="en"]').show();
        break;
        case 'jp':
            $('[lang]').hide();
            $('[lang="jp"]').show();
        break;
        default:
            $('[lang]').hide();
            $('[lang="jp"]').show();
        }
});