// Sets the page to only show the 10 first students on startup.
$(document).ready(() => {
    $('.student-list > li:gt(9)').hide();
    $($('.pagination a')[0]).toggleClass('active', true);
});

// Adds the pagination unordered list to the DOM.
$('.page').append('<div class="pagination"><ul></ul></div>');

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

// When one of the pagination buttons are click the students
// associated with that button are displayed on the page.
$('.pagination a').on('click', (e) => {
    e.preventDefault();
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
