// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// build hour blocks in a for loop, setting a variable for the block array, the first hour, and the length of the array as hours. Also writes a variable and checks for AM or PM 
var blockBody = document.getElementById('hourContainer');
var blocks = [];
var firstHour = 9;
var hours = 9;

// for loop to generate the hour blocks and the elements inside them, giving them the class name "hour- '(value of) currentHour'", and pushing them to the block array
for (var i = 0; i < hours; i++) {
  var currentHour = firstHour + i;
  var amPM = currentHour < 12 ? 'AM' : 'PM';

  var hourBlock = document.createElement('div');
  hourBlock.id = 'hour-' + currentHour;
  hourBlock.classList.add('row', 'time-block');

  var blockTitle = document.createElement('div');
  blockTitle.classList.add('col-2', 'col-md-1', 'hour', 'text-center', 'py-3');
  blockTitle.textContent = (currentHour % 12 || 12) + amPM;

  var textarea = document.createElement('textarea');
  textarea.classList.add('col-8', 'col-md-10');
  textarea.id = 'description-hour-' + currentHour;
  textarea.rows = 3;

  var saveBtn = document.createElement('button');
  saveBtn.classList.add('btn', 'saveBtn', 'col-2', 'col-md-1');
  saveBtn.setAttribute('aria-label', 'save');

  var saveIcon = document.createElement('i');
  saveIcon.classList.add('fas', 'fa-save');
  saveIcon.setAttribute('aria-hidden', 'true');

  saveBtn.appendChild(saveIcon);
  hourBlock.appendChild(blockTitle);
  hourBlock.appendChild(textarea);
  hourBlock.appendChild(saveBtn);

  blockBody.appendChild(hourBlock);

  saveBtn.addEventListener("click", saveText);

  blocks.push(hourBlock);

  blocks.forEach(function (block) {
    var blockID = block.id;
    displayText(blockID);
  })
}

function saveText() {
  var description = this.parentNode.querySelector('textarea').value;

  var blockID = this.parentNode.id;
  localStorage.setItem(blockID, description);
  document.getElementById('update').textContent = "Saved to localStorage";

  textarea.value = "";

  displayText(blockID);
}

function displayText(blockID) {
  var fieldInput = document.getElementById('description-' + blockID);

  // Check if the element exists before trying to set textContent
  if (fieldInput) {
    var description = localStorage.getItem(blockID);
    fieldInput.textContent = description 
}
}

// function displayText(blockID) {
//   var fieldInput = document.getElementById('description-' + blockID);
//   var description = localStorage.getItem(blockID);

//   fieldInput.textContent = description;
// }
// blocks.forEach(function (block) {
//   blockBody.appendChild(block);
// });

document.addEventListener('DOMContentLoaded', function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // DONE
  // TODO: Add code to display the current date in the header of the page.


  // var fieldInput = document.querySelector('#description');
  // var saveBtn = document.querySelector('.saveBtn');

  // saveBtn.addEventListener("click", saveText);

  // timeBlock = [{hour: }]

  // displayText();

  // function saveText() {

  //   var description = fieldInput.value;

  //   localStorage.setItem("description", description);
  //   document.getElementById('update').textContent = "Saved to localStorage";
  //   displayText();
  // }

  // function displayText() {
  //   var description = localStorage.getItem("description");

  //   fieldInput.textContent = description;
  // }

  //button only works for 9am
  //button needs to be able to distinguish between time zones
  //make an array that can save information for any time, plug and play
  //use index somehow
  //add text to let user know the save button "saved to localStorage"
  //data tracked by hour (ex "hour-9") and text

  //this is listening on a whole class
});
// Day.js to get the current time and set as a variable to check against

var today = dayjs();
var element = document.getElementById('currentDay');
element.textContent = today.format('dddd, MMM DD');