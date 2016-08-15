/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//function StopWatch(initVal) {
function StopWatch() {
//  var initialValue = initVal;
  var degrees = 0;
  var checkLevel = -1;
  var lastDeg = 0;

  var stopWatchEl = $("#stopWatch");
  var marker = $("#marker");
  var marker2 = $("#marker2");
  var hidder = $("#hidder");
  var countdown = $("#countdown");
  var playPause = $("#playPause");
  this.updateDegrees = function (curValue) {
    degrees = curValue;
    this.updateWatchHand();
  };
  this.updatePlayButton = function (isOn) {
    if (isOn) {
      playPause.removeClass("glyphicon-play");
      playPause.addClass("glyphicon-pause");
    } else {
      playPause.removeClass("glyphicon-pause");
      playPause.addClass("glyphicon-play");
    }
  };
  this.updateWatchHand = function () {
    if (checkLevel < 1) {
      marker.removeClass("mark-top");
      marker.removeClass("mark-left");
      marker.removeClass("mark-bottom");
      marker.removeClass("mark-right");
      marker2.removeClass("mark-top");
      hidder.removeClass("mark-top");
      checkLevel = 1;
    }
    if (checkLevel < 2 && degrees > 0) {
      marker.addClass("mark-top");
      checkLevel = 2;
    }
    if (checkLevel < 3 && degrees > 90) {
      marker.addClass("mark-left");
      checkLevel = 3;
    }
    if (checkLevel < 4 && degrees > 180) {
      marker.addClass("mark-bottom");
      checkLevel = 4;
    }
    if (checkLevel < 5 && degrees > 270) {
      marker.addClass("mark-right");
      marker2.addClass("mark-top");
      checkLevel = 5;
    }
    if (degrees >= 360) {
      hidder.addClass("mark-top");
    }
    marker.css("transform", "rotate(" + (degrees - 45) + "deg)");
    marker2.css("transform", "rotate(" + (degrees - 45) + "deg)");
  };
  this.swapColors = function (isWorking) {
    if (isWorking) {
      stopWatchEl.removeClass("breakBorderColor");
    } else {
      stopWatchEl.addClass("breakBorderColor");
    }
  };
  this.updateCountdown = function (str) {
    countdown.text(str);
  };
  this.updateStopWatch = function (deg, str) {
    if (lastDeg >= deg) {
//      this.reset("");
      checkLevel = 0;
    }
    this.updateDegrees(deg);
    this.updateCountdown(str);
//    this.updateCountdown(Math.ceil(degrees / 360 * 100) + "%");
    lastDeg = deg;
  };
  this.reset = function (str) {
    checkLevel = 0;
    this.updateDegrees(0);
    this.updateCountdown(str);
  };
}


function SoundNotifier(divId) {
  var soundEl = document.getElementById("sound");
//  var soundEl = $("#" + divId);
  function playSound(filename) {
    soundEl.innerHTML = '<audio autoplay="autoplay"><source src="' + filename + '.mp3" type="audio/mpeg" /><source src="' + filename + '.ogg" type="audio/ogg" /><embed hidden="true" autostart="true" loop="false" src="' + filename + '.mp3" /></audio>';
  }
  function playSoundWav(filename) {
    soundEl.innerHTML = '<audio autoplay="autoplay"><source src="' + filename + '" type="audio/wav" ></audio>';
  }
  function playSoundMp3(filename) {
    soundEl.innerHTML = '<audio autoplay="autoplay"><source src="' + filename + '" type="audio/mpeg" ></audio>';
  }
//  function playSound(filename) {
//    soundEl.text(
//        '<audio autoplay="autoplay"><source src="' + filename + '.mp3" type="audio/mpeg" /><source src="' + filename + '.ogg" type="audio/ogg" /><embed hidden="true" autostart="true" loop="false" src="' + filename + '.mp3" /></audio>'
//        );
//  }
//  function playSoundWav(filename) {
//    soundEl.text(
//        '<audio autoplay="autoplay"><source src="' + filename + '" type="audio/wav" ></audio>'
//        );
//  }
//  function playSoundMp3(filename) {
//    soundEl.text(
//        '<audio autoplay="autoplay"><source src="' + filename + '" type="audio/mpeg" ></audio>'
//        );
//  }
  this.play = function () {
    playSoundWav("sound/234524__foolboymedia__notification-up-1.wav");
  };
  this.stop = function () {
    element.text("");
  };
}
function TabNotifier(str, interval, times) {
  var message = str;
  var timer = undefined;
  var counter = times;
  var blinkOn = false;
  var original = document.title;
  function blink() {
    if (counter <= 0) {
      this.stop();
    } else {
      if (blinkOn) {
        document.title = original;
      }
      else {
        document.title = message;
      }
      blinkOn = !blinkOn;
    }
    counter--;
  }
  this.setString = function (newMessage) {
    message = newMessage;
  };
  this.setTimes = function (newTimes) {
    counter = newTimes;
  };
  this.stop = function () {
    if (timer !== undefined) {
      window.clearInterval(timer);
    }
  };
  this.start = function () {
    blink();
    timer = window.setInterval(blink.bind(this), interval);
  };
  this.restart = function (mes) {
    blinkOn = false;
    this.setString(mes);
    this.setTimes(times);
    this.stop();
    this.start();
  };
}

function Pomodoro() {
  var tabNotifier = new TabNotifier("On a break", 1000, 1);
  var soundNotifier = new SoundNotifier("sound");
  var stopWatch = new StopWatch();
//  var lastDeg = 0;
  var soundOn = true;
//  var notificationOn = true;
  var notificationOn = false;
  var isWorking = true;
//  var isOn = false;
  var isSwapping = false;
  var isOn = undefined;
  var workDuration = 4000; //Overwritten on load with inputs
  var breakDuration = 7000; //Overwritten on load with inputs
//  var timerCount = 0;
  var timerCount = workDuration;
  var intervalTime = 1000;
  var timer = undefined;

  var workDurationEl = $("#workDuration");
  var workDurationPlusEl = $("#workDurationPlus");
  var workDurationMinusEl = $("#workDurationMinus");
  var breakDurationEl = $("#breakDuration");
  var breakDurationPlusEl = $("#breakDurationPlus");
  var breakDurationMinusEl = $("#breakDurationMinus");


  var notifyDesktop = function (theTitle, theBody, theIcon) {
    Notification.requestPermission().then(function (result) {
      if (result === "granted") {
        if (theIcon === null) {
          var options = {
            body: theBody,
            icon: theIcon
          };
        } else {
          var options = {
            body: theBody
          };
        }
        new Notification(theTitle, options);
      } else {
        console.log("Notification permission is not granted");
      }
    });
  };
//  this.convertToMinutes = function (seconds) {
//    var sec = seconds % 60;
//    var min = (seconds - sec) / 60;
//  };
  this.updateSoundIcon = function () {
    if (soundOn) {
      $("#mute").removeClass("glyphicon-volume-off");
      $("#mute").addClass("glyphicon-volume-up");
    } else {
      $("#mute").removeClass("glyphicon-volume-up");
      $("#mute").addClass("glyphicon-volume-off");
    }
  };
  this.toggleSound = function () {
    soundOn = !soundOn;
    this.updateSoundIcon();
    if (soundOn) {
      soundNotifier.play();
    }
  };
  this.updateNotificationIcon = function () {
    if (notificationOn) {
      $("#notification").text("notifications");
    } else {
      $("#notification").text("notifications_off");
    }
  };
  this.toggleNotification = function () {
    notificationOn = !notificationOn;
    this.updateNotificationIcon();
    if (notificationOn) {
      notifyDesktop("Pomodoro", "Desktop notifications enabled", null);
    }
  };
  this.convertToMinutesFromMili = function (miliseconds) {
    var mili = miliseconds % 1000;
    miliseconds = (miliseconds - mili) / 1000;
    var sec = miliseconds % 60;
    miliseconds = ((miliseconds - sec) / 60);
    var min = miliseconds;
    if (mili < 10) {
      miliStr = "00" + mili;
    } else if (mili < 100) {
      miliStr = "0" + mili;
    }
    var secStr = sec < 10 ? "0" + sec : sec;
    var minStr = min < 10 ? "0" + min : min;
    return minStr + " : " + secStr;
//    return minStr + " : " + secStr + " : " + miliStr;
  };
  this.convertToDegrees = function () {
    var dur = this.getCurDuration();
    return Math.ceil((dur - timerCount) / dur * 360);
  };
  this.displayTimerCount = function () {
//    $("#displayer").text(str);
    curDeg = this.convertToDegrees();
//    if (lastDeg < curDeg) {
//      stopWatch.reset("");
//    }
    var timeFormated = this.convertToMinutesFromMili(timerCount);
    stopWatch.updateStopWatch(curDeg, timeFormated);
//    lastDeg = curDeg;
  };
  this.workEnding = function () {
//    alert("workEnding");
//    this.display("workEnding");
    if (notificationOn) {
      notifyDesktop("Pomodoro", "Work time is over, you deserve a break", null);
    }
    tabNotifier.restart("Break Time");
  };
  this.breakEnding = function () {
//    alert("breakEnding");
//    this.display("breakEnding");
    if (notificationOn) {
      notifyDesktop("Pomodoro", "Break time is over, you should get back to work", null);
    }
    tabNotifier.restart("Work Time");
  };
  this.ending = function () {
    if (isWorking) {
      this.workEnding();
    } else {
      this.breakEnding();
    }
    if (soundOn) {
      soundNotifier.play();
    }
  };
  this.getCurDuration = function () {
    if (isWorking) {
      return workDuration;
    } else {
      return breakDuration;
    }
  };
  this.updateTimer = function () {
    timerCount = this.getCurDuration();
  };
  this.swapTimer = function () {
    this.updateDurations();
    isWorking = !isWorking;
    this.updateTimer();
    isSwapping = true;
  };
  this.checkTimer = function () {
    if (timerCount <= 0) {
      this.ending();
      this.swapTimer();
      return false;
    }
    return true;
  };
  this.routine = function () {
    timerCount -= intervalTime;
    if (isSwapping) {
      isSwapping = false;
      stopWatch.swapColors(isWorking);
      timerCount += intervalTime;
    }
    this.displayTimerCount();
    this.checkTimer();
  };
  this.inputDurationIncrement = function (targetEl) {
    targetEl.val(targetEl.val() - 0 + 1);// -0 convert to int
  };
  this.inputDurationDecrement = function (targetEl) {
    targetEl.val(targetEl.val() - 1);
  };
  this.updateDurationsFromMili = function () {
    workDuration = workDurationEl.val();
    breakDuration = breakDurationEl.val();
    this.updateTimer();
  };
  this.updateDurationsFromSec = function () {
    workDuration = 1000 * workDurationEl.val();
    breakDuration = 1000 * breakDurationEl.val();
    this.updateTimer();
  };
  this.updateDurationsFromMin = function () {
    workDuration = 1000 * 60 * workDurationEl.val();
    breakDuration = 1000 * 60 * breakDurationEl.val();
    this.updateTimer();
  };
  this.updateDurations = function () {
//    this.updateDurationsFromMili();
//    this.updateDurationsFromSec();
    this.updateDurationsFromMin();
//    this.updateTimer();
  };
  this.start = function () {
    isOn = true;
    this.displayTimerCount();
    this.stopTimer();
    timer = window.setInterval(this.routine.bind(this), intervalTime);
    stopWatch.updatePlayButton(isOn);
  };
  this.restart = function () {
    this.updateDurations();
    if (isOn === undefined) {
      this.start();
    } else if (isOn) {
      this.start();
    } else {
      this.displayTimerCount();
    }
  };
  this.stopTimer = function () {
    if (timer !== undefined) {
      window.clearInterval(timer);
    }
  };
  this.stop = function () {
    isOn = false;
    this.stopTimer();
    stopWatch.updatePlayButton(isOn);
  };
  this.toggle = function () {
    if (isOn === undefined) {
      this.restart();
    } else if (isOn) {
      this.stop();
    } else {
      this.start();
    }
  };

  this.updateUI = function () {
    this.updateDurations();
    this.displayTimerCount();
    this.updateNotificationIcon();
    this.updateSoundIcon();
  };
  this.updateUI();// display updated timer on load

}
$(document).ready(function () {
  var pomodoro = new Pomodoro();
  $("#playPause").click(pomodoro.toggle.bind(pomodoro));
  $("#restart").click(pomodoro.restart.bind(pomodoro));
  $("#next").click(pomodoro.swapTimer.bind(pomodoro));
  $("#mute").click(pomodoro.toggleSound.bind(pomodoro));
  $("#notification").click(pomodoro.toggleNotification.bind(pomodoro));
  $("#workDurationPlus").click(pomodoro.inputDurationIncrement.bind(pomodoro, $("#workDuration")));
  $("#workDurationMinus").click(pomodoro.inputDurationDecrement.bind(pomodoro, $("#workDuration")));
  $("#breakDurationPlus").click(pomodoro.inputDurationIncrement.bind(pomodoro, $("#breakDuration")));
  $("#breakDurationMinus").click(pomodoro.inputDurationDecrement.bind(pomodoro, $("#breakDuration")));
});