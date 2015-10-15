var Timer = {

  //variables used to keep track of current time
  
  time: {
    sessionMins: 25,
    sessionSecs: 0,
    breakMins: 5,
    breakSecs: 0
  },
  
  //starts the timer

  start: function() {
    $("#clock").css("background-color", "#333");
    $('#start').attr('disabled', true);
    interval1 = setInterval(function() {
      if (Timer.time.sessionMins === 0 && Timer.time.sessionSecs === 0) {
        Timer.break();
        Timer.time.sessionMins += +$('#session').text();
        clearInterval(interval1);
      };
      if (Timer.time.sessionSecs < 10) {
        $("#clock").html(Timer.time.sessionMins + ":0" + Timer.time.sessionSecs);
      } else {
        $("#clock").html(Timer.time.sessionMins + ":" + Timer.time.sessionSecs);
      };
      Timer.time.sessionSecs--;
      if (Timer.time.sessionSecs < 0) {
        Timer.time.sessionSecs += 60;
        Timer.time.sessionMins--;
      };
    }, 1000);
  },
  
  //break mode for timer

  break: function() {
    ringer();
    $('#start').attr('disabled', true);
    $("#clock").css("background-color", "green").fadeOut(100).fadeIn(100);
    interval2 = setInterval(function() {
      if (Timer.time.breakMins === 0 && Timer.time.breakSecs === 0) {
        Timer.start();
        ringer();
        Timer.time.breakMins += +$('#break').text();
        clearInterval(interval2);
      };
      if (Timer.time.breakSecs < 10) {
        $("#clock").html(Timer.time.breakMins + ":0" + Timer.time.breakSecs + "</br>Break!");
      } else {
        $("#clock").html(Timer.time.breakMins + ":" + Timer.time.breakSecs + "</br>Break!");
      };
      Timer.time.breakSecs--;
      if (Timer.time.breakSecs < 0) {
        Timer.time.breakSecs += 60;
        Timer.time.breakMins--;
      };
    }, 1000);
  },
  
  //stops the current timer

  stop: function() {
    $('#start').removeAttr('disabled');
    $("#clock").css("background-color", "#222");
    clearInterval(interval1);
    clearInterval(interval2);
  },
  
  //resets time to current #session value

  reset: function() {
    $('#start').removeAttr('disabled');
    $("#clock").css("background-color", "#222");
    Timer.time.sessionMins = +$('#session').text();
    Timer.time.sessionSecs = 0;
    if (Timer.time.sessionSecs < 10) {
      $("#clock").html(Timer.time.sessionMins + ":0" + Timer.time.sessionSecs);
    } else {
      $("#clock").html(Timer.time.sessionMins + ":" + Timer.time.sessionSecs);
    };
    clearInterval(interval1);
    clearInterval(interval2);
  }
};

//alarm for alerting user when timer goes from break to session or vice versa

var ringer = function() {
  var $$ = $("#clock");
  $$.parent().addClass("start");

  var $audio = $('<audio />', {
    autoPlay: 'autoplay'
  });

  $('<source>', {
    src: 'http://myinstants.com/media/sounds/correct.swf.mp3'
  }).appendTo($audio);

  $("body").append($audio);

  setTimeout(function($audio) {
    $audio.remove();
  }, 4000, $audio);

  setTimeout(function() {
   $$.parent().removeClass("start");
  }, 200);

};

//Fills #clock, #session, and #break with values on load

$("#clock").html(Timer.time.sessionMins + ":0" + Timer.time.sessionSecs);
$("#session").html(Timer.time.sessionMins);
$('#break').html(Timer.time.breakMins);

//Session and break + and - buttons .click functions

$("#minusSession").on('click', function() {
  if(Timer.time.sessionMins == 1) {
    $('#minusSession').attr('disabled', true);
  } else {
    Timer.time.sessionMins--;
    $("#session").html(Timer.time.sessionMins);
  };
});

$("#addSession").on('click', function() {
  $('#minusSession').removeAttr('disabled');
  Timer.time.sessionMins++;
  $("#session").html(Timer.time.sessionMins);
});

$("#minusBreak").on('click', function() {
  if(Timer.time.breakMins == 1) {
    $('#minusBreak').attr('disabled', true);
  } else {
    Timer.time.breakMins--;
    $('#break').html(Timer.time.breakMins);
  };
});

$("#addBreak").on('click', function() {
  $("#minusBreak").removeAttr('disabled');
  Timer.time.breakMins++;
  $('#break').html(Timer.time.breakMins);
});

//Start, stop, reset buttons for timer
$("button").on('click', function() {
  $(this).css("cssText", "background-color: #333 !important;").delay(100);
  $(this).css("cssText", "background-color: #222 !important;").delay(100);
});

$("#start").on('click', function() {
  Timer.start();
});

$("#stop").on('click', function() {
  Timer.stop();
});

$("#reset").on('click', function() {
  Timer.reset();
});