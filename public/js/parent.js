$("#buyMoon").on("click", function(){
    $("#buyMoon").css("display", "none");
    $("#boughtMoon").css("display", "block");
});
$("#buyMouse").on("click", function(){
    $("#buyMouse").css("display", "none");
    $("#boughtMouse").css("display", "block");

});
$("#buyPigeon").on("click", function(){
    $("#buyPigeon").css("display", "none");
    $("#boughtPigeon").css("display", "block");

});
$("#buyGas").on("click", function(){
    $("#buyGas").css("display", "none");
    $("#boughtGas").css("display", "block");

});
$("#buyPooh").on("click", function(){
    $("#buyPooh").css("display", "none");
    $("#boughtPooh").css("display", "block");

});
$("#buyBears").on("click", function(){
    $("#buyBears").css("display", "none");
    $("#boughtBears").css("display", "block");

});


$(document).ready(function() {
    // Getting references to our form and inputs
    var kidForm = $("form#form");
    var kidName = $("input#childName");
    var favAnimal = $("input#favAnimal");
    var profilePic = $("input#profilePic");
    var bDay = $("input#bday");
    var theme = $("#themes")
  
    // When the form is submitted, we validate there's an email and password entered
    kidForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        name: kidName.val().trim(),
        favAnimal: favAnimal.val().trim(),
        profilePic: profilePic.val().trim(),
        bday: bDay.val(),
        theme: theme.val()
      };
      // If we have an email and password we run the loginUser function and clear the form
      form.reset();
      console.log("this is the user data" + JSON.stringify(userData));
    });
  
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function updateUser(email, password) {
      $.post("/api/login", {
        email: email,
        password: password
      }).then(function(data) {
        window.location.replace(data);
        // If there's an error, log the error
      }).catch(function(err) {
        console.log(err);
      });
    }
  
  });