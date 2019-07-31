// Get references to page elements
var $userName = $("#name");
var $userChore = $("#choreChoice");
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
            url: "api/examples",
            type: "GET"
        });
    },
    deleteExample: function(id) {
        return $.ajax({
            url: "api/examples/" + id,
            type: "DELETE"
        });
    }
};
// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
    API.getExamples().then(function(data) {
        var $examples = data.map(function(example) {
            var $a = $("<a>")
                .text(example.text)
                .attr("href", "/example/" + example.id);
            var $li = $("<li>")
                .attr({
                    class: "list-group-item",
                    "data-id": example.id
                })
                .append($a);
            var $button = $("<button>")
                .addClass("btn btn-danger float-right delete")
                .text("ｘ");
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
        chore: $userChore.val().trim()
    };
    if (!(name.name && name.chore)) {
        alert("You must enter an name text and description!");
        return;
    }
    API.saveExample(name).then(function() {
        refreshExamples();
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
    API.deleteExample(idToDelete).then(function() {
        refreshExamples();
    });
};
var descriptions = [
    "Clean the sink. <li>Empty and load dishwasher. <li>Mop floor. <li> Empty fridge of old food. <li>Clean counter tops.",
    "Vacuum, then mop floors. <li>Clean couch. <li>Dust coffee table. <li>Organize TV area. <li>Dust ceiling fan.",
    "Clean toilet. <li>Scrub and clean shower. <li>Clean counter tops. <li>Wash towels.",
    "Wash bed sheets. <li>Vacuum floor. <li>Wash dirty clothes. <li>Organize clean clothes. <li>Dust window area.",
    "Wash bed sheets. <li>Vacuum floor. <li>Wash dirty clothes. <li>Organize clean clothes. <li>Dust window area.",
    "Wash bed sheets. <li>Vacuum floor. <li>Wash dirty clothes. <li>Organize clean clothes. <li>Dust window area.",
    "Organize shoes. <li>Vacuum, then mop floors. <li>Dust window area."
];
$(function() {
    $("#choreChoice").change(function() {
        $("#descriptionText").html(
            "<li>" + descriptions[$("#choreChoice :selected")[0].index - 1] + "</li>"
        );
        console.log(choreChoice.value);
        console.log($("#choreChoice :selected"));
    });
});
// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);