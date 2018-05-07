const $numberPerPage = 10;
let $pageSelected = 1;
let $studentLinkNumber = 1;
const $studentItem = $('.student-item');

/**
 * Compares the page number and max amount of students allowed on page.
 * Decides which student items should be displayed.
 * @param {int} pageNumber
 * @param {Array} studentItems
 */
function showPage(pageNumber, studentItems) {
  for (let i = 0; i < $studentItem.length; i++) {
    if (i < (pageNumber * 10) && i >= ((pageNumber - 1) * 10)) {
      $(studentItems[i]).show();
    } else {
      $(studentItems[i]).hide();
    }
  }

  //Removes no results container if a page is clicked and students are displayed.
  $('.no-results-container').remove();
}


/**
 * Calculates the number of pages that should be displayed on the page.
 * Creates the correct amount of page links depending on the amount of student items.
 * @param {Array} studentList
 */
function appendPageLinks(studentList) {
  const $totalPages = Math.ceil(studentList.length / $numberPerPage);
  let $pageLink = `
    <div class="pagination">
      <ul>`;

  for (let i = 0; i < $totalPages; i++) {
    $pageLink += `
      <li>
        <a href="#">${$studentLinkNumber}</a>
      </li>`;
    $studentLinkNumber += 1;
  }

  $pageLink += `
      </ul>
    </div>`;

  $('.page').append($pageLink);

  $('.pagination').on('click', (e) => {
    if (e.target.tagName === 'A') {
      $('a').removeClass('active');
      $pageSelected = $(e.target).text();
      showPage($pageSelected, $studentItem);
      $(e.target).addClass('active');
    }
  });
}

/**
 * Dynamically filters users and renders that student list item.
 */
function searchFilter() {
  let searchInput = `
    <div class="student-search">
      <input placeholder="Search for students...">
      <button class="student-search-btn">Search</button>
    </div>`;

  $('.page-header').append(searchInput);

  const $studentNames = $('.student-details h3');
  const $studentSearch = $('.student-search input');

  $('.student-search button').on('click', () => {
    let $studentsFound = false;
    let $results = [];
    let $studentContainer;

    for (let i = 0; i < $studentNames.length; i++) {
      $studentContainer = $($studentNames[i]).parent().parent();
      //Conditional to check if search value is included in the studentNames array.
      if ($studentNames[i].innerHTML.includes($studentSearch.val())) {
        $('.no-results-container').remove();
        $studentsFound = true;
        //Results array to be passed into showPage and appendPageLinks function
        $results.push($($studentNames[i]).parent().parent());
        $studentContainer.show();
      } else {
        $studentContainer.hide();
      }
    }

    //If no results are found then display message for no results and then remove pagination links.
    $studentSearch.val('');
    if (!$studentsFound) {
      displayNoResults();
      $('.pagination').remove();
    }

    /*Removes the old pagination links and resets the number of links.
    **Calls the showPage and appendPageLinks functions so only the
    **correct amount of links and students are shown.*/
    if ($studentsFound) {
      $('.pagination').remove();
      $studentLinkNumber = 1;
      showPage(1, $results);
      appendPageLinks($results);
    }
  });
}

/**
 * Creates no results message and appends to the DOM.
 */
function displayNoResults() {
  const $noResultsHTML = `
    <div class="no-results-container">
      <p>No results found</p>
    <div>`;

  $('.page-header').append($noResultsHTML);
}

//Function calls
showPage($pageSelected, $studentItem);
appendPageLinks($studentItem);
searchFilter();