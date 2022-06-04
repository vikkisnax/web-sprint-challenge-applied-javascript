  // TASK 1
  // ---------------------
  // Implement this function taking `title`, `date` and `temp` as its 3 args and returning the markup below.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  //
  //  <div class="header">
  //    <span class="date">{ date }</span>
  //    <h1>{ title }</h1>
  //    <span class="temp">{ temp }</span>
  //  </div>
  //

const Header = (title, date, temp) => {
  //create elements
  const headerDiv = document.createElement('div');   //parent
  const dateSpan = document.createElement('span');
  const titleH = document.createElement('h1');
  const tempSpan = document.createElement('span');

  //content - check
  dateSpan.textContent = date;
  titleH.textContent = title;
  tempSpan.textContent = temp;

  //appendChild
  headerDiv.appendChild(dateSpan);
  headerDiv.appendChild(titleH);
  headerDiv.appendChild(tempSpan);

  //classes
  headerDiv.classList.add('header');
  dateSpan.classList.add('date');
  tempSpan.classList.add('temp');

  //click event -- none so far

  return headerDiv;  //aka parent holding all elements. will most likely append header to a html element that we grab later
}





// TASK 2
// ---------------------
// Implement this function taking a css selector as its only argument.
// It should create a header using the Header component above, passing arguments of your choosing.
// It should append the header to the element in the DOM that matches the given selector.
//
const headerAppender = (selector) => {
  const selectorDate = document.querySelector(selector);
  selectorDate.appendChild(Header(
    'Lambda Times', 'January 6, 2021', '26°F'
  ))
}


//self: leave this alone
export { Header, headerAppender }
