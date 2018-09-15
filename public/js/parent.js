$("#buyMoon").on("click", function(){
    $("#buyMoon").css("display", "none");
    $("#boughtMoon").css("display", "block");
    var ISBN = this.value;
    console.log(ISBN)
    console.log(sessionStorage.kr_email)

    $.get("/api/getparentid/" + sessionStorage.kr_email, function(data) {
        var parentID = data.id;

        sessionStorage.parentId = parentID;
        $.post("/api/purchasebook/" + parentID + "/" + ISBN, function(data) {
        })
    });
});
$("#buyMouse").on("click", function(){
    $("#buyMouse").css("display", "none");
    $("#boughtMouse").css("display", "block");
    var ISBN = this.value;

    $.get("/api/getparentid/" + sessionStorage.kr_email, function(data) {
        var parentID = data.id;

        sessionStorage.parentId = parentID;
        $.post("/api/purchasebook/" + parentID + "/" + ISBN, function(data) {
        })
    });
});
$("#buyPigeon").on("click", function(){
    $("#buyPigeon").css("display", "none");
    $("#boughtPigeon").css("display", "block");
    var ISBN = this.value;

    $.get("/api/getparentid/" + sessionStorage.kr_email, function(data) {
        var parentID = data.id;

        sessionStorage.parentId = parentID;
        $.post("/api/purchasebook/" + parentID + "/" + ISBN, function(data) {
        })
    });
});
$("#buyGas").on("click", function(){
    $("#buyGas").css("display", "none");
    $("#boughtGas").css("display", "block");
    var ISBN = this.value;

    $.get("/api/getparentid/" + sessionStorage.kr_email, function(data) {
        var parentID = data.id;

        sessionStorage.parentId = parentID;
        $.post("/api/purchasebook/" + parentID + "/" + ISBN, function(data) {
        })
    });
});
$("#buyPooh").on("click", function(){
    $("#buyPooh").css("display", "none");
    $("#boughtPooh").css("display", "block");
    var ISBN = this.value;

    $.get("/api/getparentid/" + sessionStorage.kr_email, function(data) {
        var parentID = data.id;

        sessionStorage.parentId = parentID;
        $.post("/api/purchasebook/" + parentID + "/" + ISBN, function(data) {
        })
    });
});
$("#buyBears").on("click", function(){
    $("#buyBears").css("display", "none");
    $("#boughtBears").css("display", "block");
    var ISBN = this.value;

    $.get("/api/getparentid/" + sessionStorage.kr_email, function(data) {
        var parentID = data.id;

        sessionStorage.parentId = parentID;
        $.post("/api/purchasebook/" + parentID + "/" + ISBN, function(data) {
        })
    });
});

$("#submitButton").on("click", function(event) {
    event.preventDefault();

    var kidForm = $("form#form");
    var kidName = $("input#childName");
    var favAnimal = $("input#favAnimal");
    var profilePic = $("input#profilePic");
    var bDay = $("input#bday");
    var theme = $("#themes")

    var childData = {
    name: kidName.val().trim(),
    favAnimal: favAnimal.val().trim(),
    profilePic: profilePic.val().trim(),
    bday: bDay.val(),
    theme: theme.val()
    };

    $.post("/api/createchild/" + sessionStorage.parentId, childData, function(data) {
        console.log("successful post")
        $.post("/api/assignbooks/" + sessionStorage.parentId, childData, function(data) {
        });
    });

    form.reset();
    console.log("this is the user data" + JSON.stringify(childData));
});  
 