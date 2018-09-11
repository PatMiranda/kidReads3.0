$(document).ready(function() {
  
    // Our initial books array
    var booksetup = [];
  
    // Getting book setup from database when page loads
    getBookSetup();
  
    // This function grabs booksetups from the database and updates the view
    function getBookSetup() {
        $.get("/api/booksetup", function(data) {
          booksetup = data;
          initializeBook();
        });
    }

    // This function resets the todos displayed with new todos from the database
    function initializeRows() {
      $todoContainer.empty();
      var rowsToAdd = [];
      for (var i = 0; i < todos.length; i++) {
        rowsToAdd.push(createNewRow(todos[i]));
      }
      $todoContainer.prepend(rowsToAdd);
    }

    // This function deletes a todo when the user clicks the delete button
    function deleteTodo(event) {
      event.stopPropagation();
      var id = $(this).data("id");
      $.ajax({
        method: "DELETE",
        url: "/api/todos/" + id
      }).then(getTodos);
    }
  
    // This function handles showing the input box for a user to edit a todo
    function editTodo() {
      var currentTodo = $(this).data("todo");
      $(this).children().hide();
      $(this).children("input.edit").val(currentTodo.text);
      $(this).children("input.edit").show();
      $(this).children("input.edit").focus();
    }
  
    // Toggles complete status
    function toggleComplete(event) {
      event.stopPropagation();
      var todo = $(this).parent().data("todo");
      todo.complete = !todo.complete;
      updateTodo(todo);
    }
  
    // This function starts updating a todo in the database if a user hits the "Enter Key"
    // While in edit mode
    function finishEdit(event) {
      var updatedTodo = $(this).data("todo");
      if (event.which === 13) {
        updatedTodo.text = $(this).children("input").val().trim();
        $(this).blur();
        updateTodo(updatedTodo);
      }
    }
  
    // This function updates a todo in our database
    function updateTodo(todo) {
      $.ajax({
        method: "PUT",
        url: "/api/todos",
        data: todo
      }).then(getTodos);
    }
  
    // This function is called whenever a todo item is in edit mode and loses focus
    // This cancels any edits being made
    function cancelEdit() {
      var currentTodo = $(this).data("todo");
      if (currentTodo) {
        $(this).children().hide();
        $(this).children("input.edit").val(currentTodo.text);
        $(this).children("span").show();
        $(this).children("button").show();
      }
    }
  
    // This function constructs a todo-item row
    function createNewRow(todo) {
      var $newInputRow = $(
        [
          "<li class='list-group-item todo-item'>",
          "<span>",
          todo.text,
          "</span>",
          "<input type='text' class='edit' style='display: none;'>",
          "<button class='delete btn btn-danger'>x</button>",
          "<button class='complete btn btn-primary'>✓</button>",
          "</li>"
        ].join("")
      );
  
      $newInputRow.find("button.delete").data("id", todo.id);
      $newInputRow.find("input.edit").css("display", "none");
      $newInputRow.data("todo", todo);
      if (todo.complete) {
        $newInputRow.find("span").css("text-decoration", "line-through");
      }
      return $newInputRow;
    }
  
    // This function inserts a new todo into our database and then updates the view
    function insertTodo(event) {
      event.preventDefault();
      var todo = {
        text: $newItemInput.val().trim(),
        complete: false
      };
  
      $.post("/api/todos", todo, getTodos);
      $newItemInput.val("");
    }

    function initializeBook() {
        var arrWords = [];
    
        //TheLibrary.InitializeFirestore();
        //var db = TheLibrary.database,
            //docRef = db.collection("Library").doc("g0uw83YLJsQcMegopfVy");
    
        // docRef.get().then(function (doc) {
        //     if (doc.exists) {
    
                var pages = booksetup,
                    fontColor,
                    fontSize,
                    pgCounter = 1,
                    tagText = '',
                    tagStyle,
                    element,
                    page;
    
                pages.forEach(function (item, id) {
                    if (id > 0) {
                        tagStyle = '<div style="background-image: url(' + "'images/pg" + pgCounter.toString() + ".JPG')" + '" />';
                        element = $(tagStyle);
                        $("#readBook").turn("addPage", element, pgCounter + 3)
    
                        tagText = '';
                        page = (id * 2)
                        fontColor = item.PageFontColor;
                        fontSize = item.PageFontSize;
    
                        tagText += '<p style="font-size:24px !important;padding:15px;text-align:center;">Page ' + page.toString() + '</p><p>'
    
                        arrWords = (item.PageText).split(' ');
    
                        arrWords.forEach(function (word) {
                            tagText += '<a style="color:' + fontColor + ';font-size:' + fontSize + 'px; !important;padding:15px;" href="#" class="wordLink" text="' + word + '">';
                            tagText += word + '</a> '
                        });
    
                        tagText += '</p>'
                        pgCounter += 2;
                    }
                    element = $('<div class="text-center"/>').html(tagText);
                    $("#readBook").turn("addPage", element, page + 3)
                })
        //     } else {
        //         // doc.data() will be undefined in this case
        //     }
        // }).catch(function (error) {
        //     console.log("Error getting document:", error);
        // });
    }
});

//***************************************************************/
$(document).on('click', 'a', function (e) {
//***************************************************************/

    e.preventDefault();

    var word = $(this).attr("text");
    // var keys = require("./keys");
    // var polly = new Polly(keys.polly);

    // console.log(polly);

    // var request = require("request");

    // request(process.env.POLLY_REGION, function(error, response, body) {
    //   console.log(body);
    // });

    $.get("/api/callpolly/" + word, function(data) {
        console.log("returned");
        var buf = data.AudioStream.toString('base64');
        var snd = new Audio("data:audio/mp3;base64," + buf);
        snd.play();
    });

    // AWS.config.region = "us-west-1"
    // // AWS.config.accessKeyId = AWS_ACCESS_KEY_ID
    // // AWS.config.secretAccessKey = AWS_SECRET_ACCESS_KEY

    // var polly = new AWS.Polly({
    //     apiVersion: '2.311.0'
    // });
    // var params = {
    //     OutputFormat: 'mp3',
    //     Text: word,
    //     VoiceId: 'Kendra',
    //     SampleRate: '22050',
    //     TextType: 'text'
    // };

    // polly.synthesizeSpeech(params, function (err, data) {

    //     if (err)
    //         console.log(err, err.stack); // an error occurred
    //     else {
    //         var buf = data.AudioStream.toString('base64');
    //         var snd = new Audio("data:audio/mp3;base64," + buf);
    //         snd.play();
    //     }
    // });

    return false;
});
    
