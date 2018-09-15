
//***************************************************************/
$("#read-button").on("click", function(){
//***************************************************************/

    // Our initial books array
    var booksetup = [],
        ISBN = this.value;

      console.log(ISBN)
  
    // Getting book setup from database when page loads
    getBookSetup();
  
    // This function grabs booksetups from the database and updates the view
    function getBookSetup() {
        $.get("/api/booksetup/" + ISBN, function(data) {
          booksetup = data;
          initializeBook();
        });
    }

    function initializeBook() {
      var pages = booksetup,
          fontColor,
          fontSize,
          pgCounter = 1,
          tagText = '',
          tagStyle,
          element,
          page,
          arrWords = [];

      pages.forEach(function (item, id) {
          if (id > 0) {
            tagStyle = '<div style="background-image: url(' + "'images/pg" + pgCounter.toString() + ".JPG')" + '" />';
            element = $(tagStyle);
            $("#readBook").turn("addPage", element, pgCounter + 3)

            tagText = "";
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
    }
});

//***************************************************************/
$(document).on('click', 'a', function (e) {
//***************************************************************/
  
    e.preventDefault();

    var word = $(this).attr("text");

    callPolly = function (url, cb) {
      $.get(url + word, function(data) {
        cb(data)
      });
    }

    callPolly('/api/callpolly/', function (data) {
      var snd = new Audio("data:audio/mp3;base64," + data);
      snd.play();
    });

    return false;
});
