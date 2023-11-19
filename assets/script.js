// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

document.addEventListener('DOMContentLoaded', function () {
  // DONE
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  //DONE
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // DONE
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // DONE
  // TODO: Add code to display the current date in the header of the page.


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
    checkTime();
  }

  function checkTime() {
    var currentHour = dayjs().hour();
    // var currentHour = dayjs().set('hour', 12).hour();

    blocks.forEach(function (hourBlock) {
      var blockHour = parseInt(hourBlock.id.split('-')[1]);

      hourBlock.classList.remove('past', 'present', 'future');

      if (blockHour < currentHour) {
        hourBlock.classList.add('past');
      } else if (blockHour === currentHour) {
        hourBlock.classList.add('present');
      } else {
        hourBlock.classList.add('future');
      }
    });
  }

  setInterval(function () {
    checkTime.call(this);
  }, 60000);

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

    if (fieldInput) {
      var description = localStorage.getItem(blockID);
      fieldInput.textContent = description
    }
  }

  // Day.js to get the current time and set as a variable to check against

  var today = dayjs();
  var element = document.getElementById('currentDay');
  element.textContent = today.format('dddd, MMMM DD');
});