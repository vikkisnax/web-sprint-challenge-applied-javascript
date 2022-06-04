// TASK 5
// ---------------------
// Implement this function, which should return the markup you see below.
// It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
// The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
// The text inside elements will be set using their `textContent` property (NOT `innerText`).
// Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.

import axios from "axios";

// <div class="card">
//   <div class="headline">{ headline }</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={ authorPhoto }>
//     </div>
//     <span>By { authorName }</span>
//   </div>
// </div>
//


const Card = (article) => {
  //create element - try doing everything for one element in chunks
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');

  const headlineDiv = document.createElement('div');
  headlineDiv.classList.add('headline');
  headlineDiv.textContent = article.headline;       

  const authorDiv = document.createElement('div');
  authorDiv.classList.add('author');

  const imageDiv = document.createElement('div');
  imageDiv.classList.add('img-container');
  
  const authorImg = document.createElement('img');
  authorImg.src = article.authorPhoto;

  const authorNameSpan = document.createElement('span');
  authorNameSpan.textContent = article.authorName;     
  

  //appendChild
  cardDiv.appendChild(headlineDiv);
  cardDiv.appendChild(authorDiv);
  authorDiv.appendChild(imageDiv);
  imageDiv.appendChild(authorImg);
  authorDiv.appendChild(authorNameSpan);

  //eventListener
  cardDiv.addEventListener('click', (event) => {
    console.log(headlineDiv.textContent);                   
  });

  return cardDiv;
}






// TASK 6
// ---------------------
// Implement this function that takes a css selector as its only argument.
// It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
// However, the articles do not come organized in a single, neat array. Inspect the response closely!
// Create a card from each and every article object in the response, using the Card component.
// Append each card to the element in the DOM that matches the selector passed to the function.
//
const cardAppender = (selector) => {
  // it returns .cards-container element that was passed into cardAppender's arg - in a different file 
  console.log(selector);
  
  //we want to access the data here
  axios.get(`http://localhost:5001/api/articles`)
  //if there's a successful Promise. 'response' is the data from that link
  .then((response) => {

    // 1. get the string that matches the 'selector' argument (aka the string that's passed into cardAppender when this function is called- they found and grabbed a class here bc that's what they passed into cardAppender(.cards-container) -- it's called in a diff doc tho). *Selctor is a string that is used to find and grab an element and then that string is assigned to a variable, cardContainer
    const cardContainer = document.querySelector(selector);
    console.log('success two', response.data.articles);


    // // EXAMPLE AND NOTE ON OBJECTS AND ACCESSING ITS PROPERTY'S VALUES 
    // all of these return the same thing -- the value of the object's properties. since this is an object, the properties are strings, like bootstrap. the first way refers to the property specifically
    // console.log(response.data.articles.javascript)
    // // bracket notation - good for what we did in this assignment (to loop over an object)
    // console.log(response.data.articles['javascript'])
    // // putting the object's property into a variable and then getting the variable's/property's value
    // const prop = 'javascript'
    // console.log(response.data.articles[prop])

    /* Note:
      use for...in to loop over each of the object's keys (bootstrap, etc.), this allows us the use the key to access the value of that key in the object when we use [] after accessing the key

      property                         - is the object's key 
      response.data.articles           - is the object
      response.data.articles[property] - is the value in the object for the key/since 'property' is in []s, we're accessing the value of the key. 

      remember, objects have keys as STRINGS (not indexes/numbers like with arrays). the object is specified after 'in'.
    */

    for(const property in response.data.articles){
      // we want to see the key, such as bootstrap, and its value. 'property' is the key. 
      // response.data.articles[property] accesses the key's values (which are objects) 
      console.log(property, response.data.articles[property]);

      //make a variable that'll get the property's value (like bootstrap's article)
      const articleArray = response.data.articles[property]

      //still inside the for...in. Make a forEach loop to loop through articleArray above. note: the 'article' arg in here is like 'item' (it's each line - here each object in the array - that's holding the objects). for each object that we took out and can now access individually, it'll apply to the Card function above and append to the html element that's passed into this function, cardAppender (which is .cards-container)
      articleArray.forEach((article) => {

        //make a varible holding the Card function with the article arg. remember, article here is each object/line in the array here (remember this is an array of objects and we want the objects values so we took out each object, now we want to loop through each and get the values, which will apply to the Card function
        const cardElement = Card(article);

        //append cardElement to cardContainer (which is passing in a string -- which they passed in an html element here -- from above). this means that all the info in each Card will be put under the string (html element here) that was passed into cardAppender
        cardContainer.appendChild(cardElement);
      })
    }
  });
}

export { Card, cardAppender }
