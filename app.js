const $numberPerPage = 10;
let $pageSelected = 1;
const $studentItem = $('.student-item');

function showPage(pageNumber, studentItems) {
  $studentItem.hide();

  for (let i = 0; i < $studentItem.length; i++) {
    if (i < (pageNumber * 10) && i >= ((pageNumber - 1) * 10)) {
      $(studentItems[i]).show();
    } else {
      $(studentItems[i]).hide();
    }
  }

  $('.no-results-container').remove();
}

showPage($pageSelected,$studentItem);

function appendPageLinks(studentList) {
  const $totalPages = Math.ceil(studentList.length / $numberPerPage);
  let $pageLink = `
    <div class="pagination">
      <ul>  `;
  let $studentLinkNumber = 1;

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
appendPageLinks($studentItem);

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
    let studentsFound = false;

    for (let i = 0; i < $studentNames.length; i++) {
      if ($studentNames[i].innerHTML.includes($studentSearch.val())) {
        $($studentNames[i]).parent().parent().show();
        $('.no-results-container').remove();
        studentsFound = true;
      } else {
        $($studentNames[i]).parent().parent().hide();
      }
    }

    $studentSearch.val('');
    if (!studentsFound) {
      displayNoResults();
    }
  });
}
searchFilter();

function displayNoResults() {
  const $noResultsHTML = `
    <div class="no-results-container">
      <p>No results found</p>
    <div>`;

  $('.page-header').append($noResultsHTML);
}