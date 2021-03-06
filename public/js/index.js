// Get references to page elements
console.log("INDEX.JS");
var $userName = $("#name");
var $userChore = $("#choreChoice");
var $userDay = $("#dayOfTheWeek");
var $submitBtn = $("#submitText");
var $exampleList = $("#example-list");
// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(name) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/name",
      data: JSON.stringify(name)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/name",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/chore/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list. "examples" defines our handlebars chore output.
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    console.log(data);
    var $examples = data.map(function(example) {
      console.log(example);
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);
      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id,
          "data-day": example.day
        })
        .append($a);
      var $button = $("<button>")
        .addClass("btn btn-primary float-right delete")
        .text("DEL");
      $li.append($button);
      return $li;
    });
    $exampleList.empty();
    $exampleList.append($examples);
  });
};
// handleFormSubmit is called whenever we submit a new name
// Save the new name to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  var name = {
    name: $userName.val().trim(),
    ChoreId: $userChore.val().trim(),
    day: $userDay.val().trim()
  };

  if (!(name.name && name.ChoreId)) {
    alert(
      "You must enter a name, select a chore, and pick a day to do your chore!"
    );
    return;
  }
  API.saveExample(name).then(function() {
    refreshExamples();
    location.reload();
  });
  $userName.val("");
  $userChore.val("");
};
// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");
  console.log(idToDelete);
  API.deleteExample(idToDelete).then(function() {
    // refreshExamples();
    location.reload();
  });
};

// Array where descriptions will be displayed. Currently unused.
var descriptions = [];

$(function() {
  $("#choreChoice").change(function() {
    $("#descriptionText").html(
      "<li>" + descriptions[$("#choreChoice :selected")[0].index - 1] + "</li>"
    );
    console.log(choreChoice.value);
  });
});

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$(document).ready(function() {
  $(".delete").on("click");
  console.log("ready!");

  console.log(descriptions);
  // Targets chore-dropdown to display /api/chore-data
  $.get("/api/chore").then(function(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      var id = data[i].id;
      var chore = data[i].chore;
      var newOption = $("<option>");
      newOption.attr("value", id);
      newOption.text(chore);
      $("#choreChoice").append(newOption);
      descriptions.push(data[i].description);
    }
  });

  // If-Then statement targets user-day and appends input to targeted day-ID
  $(".list-group-item").each(function() {
    if ($(this).data("day") === 1) {
      $("#sundayChore").append($(this));
    } else if ($(this).data("day") === 2) {
      $("#mondayChore").append($(this));
    } else if ($(this).data("day") === 3) {
      $("#tuesdayChore").append($(this));
    } else if ($(this).data("day") === 4) {
      $("#wednesdayChore").append($(this));
    } else if ($(this).data("day") === 5) {
      $("#thursdayChore").append($(this));
    } else if ($(this).data("day") === 6) {
      $("#fridayChore").append($(this));
    } else if ($(this).data("day") === 7) {
      $("#saturdayChore").append($(this));
    }
  });

  // Create chore
  $("#addChoreButton").on("click", function() {
    // Variable stores chore-input
    var choreData = {
      chore: $("#choreName").val(),
      description: $("#newChoreDesc").val()
    };
    console.log(choreData);

    $.post("/api/chore", choreData);
  });
});
