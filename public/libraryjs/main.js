
//***************************************************************/
$(window).ready(function () {
//***************************************************************/

    $('#readBook').turn({
        display: 'double',
        acceleration: true,
        gradients: !$.isTouch,
        elevation: 50,
        when: {
            turned: function (e, page) {
                /*console.log('Current view: ', $(this).turn('view'));*/
            }
        }
    });
});

//***************************************************************/
$(window).bind('keydown', function (e) {
//***************************************************************/

    if (e.keyCode == 37)
        $('#readBook').turn('previous');
    else if (e.keyCode == 39)
        $('#readBook').turn('next');
});

//***************************************************************/
$('#prev').click(function () {
//***************************************************************/

    $('#readBook').turn('previous');
});

//***************************************************************/
$('#nex').click(function () {
//***************************************************************/
    $('#readBook').turn('next');

})
$('#restart').click(function () {
//***************************************************************/

    $('#readBook').turn('page', 1);
})
//***************************************************************/
$("#read-button").on("click", function () {
//***************************************************************/

    music.play()
    $(".swiper-container").css("display", "none");
    $("#firstBook").css("display", "block");
    $("#read-button").css("display", "none");
});

//***************************************************************/
$("#closeBook").on("click", function () {
//***************************************************************/

    $("#read-button").css("display", "block");
    $(".swiper-container").css("display", "block");
    $("#firstBook").fadeOut("slow");
    music.pause();
})


var music = document.getElementById("music");
music.volume = 0.05;
var titleAudio = document.getElementById("titlePage");
var pg2 = document.getElementById("pga2");
var pg4 = document.getElementById("pga4");
var pg6 = document.getElementById("pga6");
var pg8 = document.getElementById("pga8");
var pg10 = document.getElementById("pga10");
pg10.volume = 1;
var pg12 = document.getElementById("pga12");
var pg14 = document.getElementById("pga14");
var pg16 = document.getElementById("pga16");
var pg18 = document.getElementById("pga18");
var pg20 = document.getElementById("pga20");
var pg22 = document.getElementById("pga22");
var pg24 = document.getElementById("pga24");
var pg26 = document.getElementById("pga26");
var pg28 = document.getElementById("pga28");
var pg30 = document.getElementById("pga30");
var pg32 = document.getElementById("pga32");
var pg34 = document.getElementById("pga34");
var pg36 = document.getElementById("pga36");
var pg38 = document.getElementById("pga38");
var pg40 = document.getElementById("pga40");
var pg42 = document.getElementById("pga42");
var pg44 = document.getElementById("pga44");
var pg46 = document.getElementById("pga46");

//***************************************************************/
$("#readBook").bind("turning", function (event, page) {
    //***************************************************************/

    if (page == 2) {
        titleAudio.play();
    }
    if (page == 4) {
        titleAudio.pause();
        pg2.play();
    }
    if (page == 6) {
        pg2.pause();
        pg4.play();
    }
    if (page == 8) {
        pg4.pause()
        pg6.play()
    }
    if (page == 10) {
        pg6.pause();
        pg8.play();
    }
    if (page == 12) {
        pg8.pause();
        pg10.play();
    }
    if (page == 14) {
        pg10.pause();
        pg12.play();
    }
    if (page == 16) {
        pg12.pause();
        pg14.play();
    }
    if (page == 18) {
        pg14.pause();
        pg16.play();
    }
    if (page == 20) {
        pg16.pause();
        pg18.play();
    }
    if (page == 22) {
        pg18.pause();
        pg20.play();
    }
    if (page == 24) {
        pg20.pause();
        pg22.play();
    }
    if (page == 26) {
        pg22.pause();
        pg24.play();
    }
    if (page == 28) {
        pg24.pause();
        pg26.play();
    }
    if (page == 30) {
        pg26.pause();
        pg28.play();
    }
    if (page == 32) {
        pg28.pause();
        pg30.play();
    }
    if (page == 34) {
        pg30.pause();
        pg32.play();
    }
    if (page == 36) {
        pg32.pause();
        pg34.play();
    }
    if (page == 38) {
        pg34.pause();
        pg36.play();
    }
    if (page == 40) {
        pg36.pause();
        pg38.play();
    }
    if (page == 42) {
        pg38.pause();
        pg40.play();
    }
    if (page == 44) {
        pg40.pause();
        pg42.play();
    }
    if (page == 46) {
        pg42.pause();
        pg44.play();
    }
    if (page == 48) {
        pg44.pause();
        pg46.play();
    }
    if (page == 49) {
        music.pause();
    }
});