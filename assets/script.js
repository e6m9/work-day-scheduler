// code set inside a function to tell it wait until everything is loaded into the DOM before doing anything else
document.addEventListener('DOMContentLoaded', function () {

  // grabs the hourContainer div, sets up an array, and sets the parameters for creating the hour blocks 
  var blockBody = document.getElementById('hourContainer');
  var blocks = [];
  var firstHour = 9;
  var hours = 9;

  // for loop to generate the hour blocks and the elements inside them, giving them the class name "hour-'(value of) currentHour'", and pushing them to the blocks array
  for (var i = 0; i < hours; i++) {
    var currentHour = firstHour + i;

    // if the current hour is less than 12, amPM is AM, otherwise, it's PM
    var amPM = currentHour < 12 ? 'AM' : 'PM';

    // creates the hourblock div and gives it an id based on the index and adds the Bootstrap classes
    var hourBlock = document.createElement('div');
    hourBlock.id = 'hour-' + currentHour;
    hourBlock.classList.add('row', 'time-block');

    // creates the blockTitle element which displays the time with an argument that converts hours greater than 12 into their 12 hour equivalent appended with amPM
    var blockTitle = document.createElement('div');
    blockTitle.classList.add('col-2', 'col-md-1', 'hour', 'text-center', 'py-3');
    blockTitle.textContent = (currentHour % 12 || 12) + amPM;

    // adds a unique textarea id to each hour block
    var textarea = document.createElement('textarea');
    textarea.classList.add('col-8', 'col-md-10');
    textarea.id = 'description-hour-' + currentHour;
    textarea.rows = 3;

    // creates save button and save button icon
    var saveBtn = document.createElement('button');
    saveBtn.classList.add('btn', 'saveBtn', 'col-2', 'col-md-1');
    saveBtn.setAttribute('aria-label', 'save');

    var saveIcon = document.createElement('i');
    saveIcon.classList.add('fas', 'fa-save');
    saveIcon.setAttribute('aria-hidden', 'true');

    // adds all the created elements to the hourBlock div and the save icon to the save button
    saveBtn.appendChild(saveIcon);
    hourBlock.appendChild(blockTitle);
    hourBlock.appendChild(textarea);
    hourBlock.appendChild(saveBtn);

    // adds the full hourBlock div to the blockBody div
    blockBody.appendChild(hourBlock);

    // adds a call to the saveText function to the save button
    saveBtn.addEventListener("click", saveText);

    // pushes the completed hourBlock elements into the blocks array
    blocks.push(hourBlock);

    // grabs the id from each element in the blocks array to appy the displayText function to each id accordingly
    blocks.forEach(function (block) {
      var blockID = block.id;
      displayText(blockID);
    })
    
    // runs the checkTime function after generating the elements so that they can get their past, present, or future class upon page load
    checkTime();
  }

  // checks the realtime against each blockId
  function checkTime() {
    var currentHour = dayjs().hour();
    // code to test functionality of the function outside of planner hours
    // var currentHour = dayjs().set('hour', 12).hour();

    // parses out the number of the blockIds
    blocks.forEach(function (hourBlock) {
      var blockHour = parseInt(hourBlock.id.split('-')[1]);

      // clears any past, present, or future class before determining where the blockHour currently is and what class it should receive
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

  // the checkTime function is called every minute
  setInterval(function () {
    checkTime.call(this);
  }, 60000);

  // grabs the value of the textarea based on which save button is clicked, labels and saves that value with an appropriate id and adds a message to tell the user it has saved to local storage, then it clears the text area and runs displayText
  function saveText() {
    var description = this.parentNode.querySelector('textarea').value;
    var blockID = this.parentNode.id;

    localStorage.setItem(blockID, description);
    document.getElementById('update').textContent = "Saved to localStorage";

    textarea.value = "";
    displayText(blockID);
  }

  // tied to the specific blockId based on the save button pressed and adds the appropriate text content from local storage to the appropriate text field
  function displayText(blockID) {
    var fieldInput = document.getElementById('description-' + blockID);

    if (fieldInput) {
      var description = localStorage.getItem(blockID);
      fieldInput.textContent = description
    }
  }

  // finds and displays the current date in the header id 'currentDay'
  var today = dayjs();
  var element = document.getElementById('currentDay');
  element.textContent = today.format('dddd, MMMM DD');
});