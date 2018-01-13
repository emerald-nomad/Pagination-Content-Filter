// Sets the page to only show the 10 first students on startup.
$(document).ready(() => {
    $('.student-list > li:gt(9)').hide();
    $($('.pagination a')[0]).toggleClass('active', true);
});

// Adds the search form to the page
$('.page-header').append(`
    <form class='student-search' id='searchForm'>
        <input id='search' type="search" placeholder='Search for students...'>
        <button type='submit' form='searchForm'>Search</button>
    </form>
`);

// Adds the pagination unordered list to the page.
$('.page').append('<div class="pagination"><ul></ul></div>');

$('.pagination ul').prepend('<h1 class="no-results">Sorry no results were found!</h2>');
$('.no-results').hide();

// Will calculate how many buttons are needed and add them
// to the pagination unordered list, if there are more than
// 10 students.
if ($('.student-list > li').length > 10) {
    for (let i = 0; i < Math.ceil($('.student-list > li').length / 10); i++) {
        $('.pagination ul').append(` 
                        <li>
                            <a href='#'>${i+1}</a>
                        </li>
        `);
    }
}


$('.student-search').submit((e) => {
    e.preventDefault();
    // Makes sure no-results message is hidden.
    $('.no-results').hide();

    // Hides all students.
    $('.student-list > li').hide();

    // If search query is empty then show no-results message.
    if ($('#search').val() === '') {
        $('.no-results').show();
        return
    }

    // Stores search query as a regex.
    let query = new RegExp($('#search').val());

    let shown = 0;
    
    // All students name that match the query will be shown.
    $('.student-list > li > .student-details > h3').each((index,name) => {
        let str = $(name).text();
        if (str.match(query)) {
            $($('.student-list > li')[index]).show();
            shown++;
        }
    });

    // All students email that match the query will be shown.
    $('.email').each((index, email) => {
        let str = $(email).text();
        if (str.match(query)) {
            $($('.student-list > li')[index]).show();
            shown++;
        }
    });

    // If no results are found show no-results message.
    if (shown === 0){
        $('.no-results').show();
    }
    $('#search').val('');
})

// When one of the pagination buttons are click the students
// associated with that button are displayed on the page.
$('.pagination a').on('click', (e) => {
    e.preventDefault();
    // Makes sure no-results message is hidden.
    $('.no-results').hide();

    // Gives the original value of the button.
    btnValue = e.target.text - 1;

    // Makes all pagination buttons inactive.
    $('.pagination a').toggleClass('active', false);
    //Makes pagination button that was pressed active.
    $($('.pagination a')[btnValue]).toggleClass('active', true);

    // Determines the starting point for the selection of 
    // students to display.
    const startPoint = btnValue * 10;
    // Determines the end point for the selection of 
    // students to display.
    const endPoint = startPoint + 10;
    
    // Hides all the students
    $('.student-list > li').hide();

    // Displays the students that corresponds with the 
    // button that was pressed.
    for (let i = startPoint; i < endPoint; i++) {
        $($('.student-list > li')[i]).show();
    }

});
