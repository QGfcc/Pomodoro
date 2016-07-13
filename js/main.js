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
//  this.updateInitialValue = function (curValue) {
//    initialValue = curValue;
//  };
//  this.updateCounter = function (curValue) {
//    counter = Math.ceil((initialValue - curValue) / initialValue * 360);
//  };
  this.updateDegrees = function (curValue) {
    degrees = curValue;
    this.updateCSS();
  };
  this.updateCSS = function () {
    if (checkLevel < 0) {
      $("#marker").css("border-left-color", "transparent");
      $("#marker").css("border-bottom-color", "transparent");
      $("#marker").css("border-right-color", "transparent");
      $("#marker2").css("border-top-color", "transparent");
      checkLevel = 0;
    }
    if (checkLevel < 1 && degrees >= 90) {
      $("#marker").css("border-left-color", "black");//TODO change color
      checkLevel = 1;
    }
    if (checkLevel < 2 && degrees >= 180) {
      $("#marker").css("border-bottom-color", "black");
      checkLevel = 2;
    }
    if (checkLevel < 3 && degrees >= 270) {
      $("#marker").css("border-right-color", "black");
      $("#marker2").css("border-top-color", "black");
      checkLevel = 3;
    }
    if (degrees >= 360) {
//      clearInterval(clocker);
//      checkLevel = -1;
    }
    $("#marker").css("transform", "rotate(" + (degrees - 45) + "deg)");
    $("#marker2").css("transform", "rotate(" + (degrees - 45) + "deg)");
  };
  this.updateCountdown = function (str) {
    $("#countdown").text(str);
  };
  this.updateStopWatch = function (deg, str) {
    if (lastDeg >= deg) {
//      this.reset("");
      checkLevel = -1;
    }
    this.updateDegrees(deg);
    this.updateCountdown(str);
//    this.updateCountdown(Math.ceil(degrees / 360 * 100) + "%");
    lastDeg = deg;
  };
  this.reset = function (str) {
    checkLevel = -1;
    this.updateDegrees(0);
    this.updateCountdown(str);

  };
}
function SoundNotifier(divId) {
  var element = $("#" + divId);
  function playSound(filename) {
    document.getElementById("sound").innerHTML = '<audio autoplay="autoplay"><source src="' + filename + '.mp3" type="audio/mpeg" /><source src="' + filename + '.ogg" type="audio/ogg" /><embed hidden="true" autostart="true" loop="false" src="' + filename + '.mp3" /></audio>';
  }
  function playSoundWav(filename) {
    document.getElementById("sound").innerHTML = '<audio autoplay="autoplay"><source src="' + filename + '" type="audio/wav" ></audio>';
  }
  function playSoundMp3(filename) {
    document.getElementById("sound").innerHTML = '<audio autoplay="autoplay"><source src="' + filename + '" type="audio/mpeg" ></audio>';
  }
  this.play = function () {
    playSoundWav("sound/234524__foolboymedia__notification-up-1.wav");
  };
  this.stop = function () {
    element.text("");
  };
//  $("#play").click(playSound.bind(null, "MØ - Don't Wanna Dance (Darius Remix)"));
//  $("#play").click(playSoundMp3.bind(null, "MØ - Don't Wanna Dance (Darius Remix).mp3"));
//  $("#play").click(playSoundMp3.bind(null, "sound/MØ - Don't Wanna Dance (Darius Remix).mp3"));
//  $("#play").click(playSoundWav.bind(null, "sound/234524__foolboymedia__notification-up-1.wav"));
//  $("#play").click(playSoundWav.bind(null, "sound/234565__foolboymedia__announcement-begin.wav"));
//  $("#play").click(playSoundWav.bind(null, "sound/234566__foolboymedia__announcement-end.wav"));

//  $("#pause").click(function () {
//
//  });
//  playSound("MØ - Don't Wanna Dance (Darius Remix)");



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
  var notificationOn = true;
  var isWorking = true;
//  var isOn = false;
  var isOn = undefined;
  var workDuration = 4000;//TODO update from ui
  var breakDuration = 7000;//TODO update from ui
//  var timerCount = 0;
  var timerCount = workDuration;
  var intervalTime = 1000;
  var timer = undefined;
  var spawnNotification = function (theTitle, theBody, theIcon) {
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
    });//TODO make sound alert
  };
  this.display = function (str) {
    $("#displayer").text(str);
    var curDeg = this.convertDegrees();
//    if (lastDeg < curDeg) {
//      stopWatch.reset("");
//    }
    stopWatch.updateStopWatch(curDeg, str);
//    lastDeg = curDeg;
  };
  this.workEnding = function () {
//    alert("workEnding");
    this.display("workEnding");
    if (notificationOn) {
      spawnNotification("Pomodoro", "Work time is over, you deserve a break", null);
    }
    tabNotifier.restart("Break Time");
  };
  this.breakEnding = function () {
//    alert("breakEnding");
    this.display("breakEnding");
    if (notificationOn) {
      spawnNotification("Pomodoro", "Break time is over, you should get back to work", null);
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
    isWorking = !isWorking;
    this.updateTimer();
  };
  this.checkTimer = function () {
    if (timerCount <= 0) {
//      this.stop();
      this.ending();
      this.swapTimer();
      return false;
    }
    return true;
  };
  this.convertDegrees = function () {
    var dur = this.getCurDuration();
    return Math.ceil((dur - timerCount) / dur * 360);
  };
  this.routine = function () {
    timerCount -= intervalTime;
    this.display(timerCount);
    this.checkTimer();
  };
  this.updateDurations = function () {
    workDuration = 1000 * $("#workDuration").val();
    breakDuration = 1000 * $("#breakDuration").val();
    this.updateTimer();
  };
  this.start = function () {
    if (this.checkTimer()) {
      timer = window.setInterval(this.routine.bind(this), intervalTime);
      isOn = true;
    } else {
      isOn = false;
    }
  };
  this.restart = function () {
    this.updateDurations();
    if (this.checkTimer()) {
      this.stop();
      timer = window.setInterval(this.routine.bind(this), intervalTime);
      isOn = true;
    } else {
      isOn = false;
    }
  };
  this.stop = function () {
    if (timer !== undefined) {
      window.clearInterval(timer);
    }
    isOn = false;
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
}
$(document).ready(function () {
//  alert(new Date());

//  var notifier = new tabNotifier("On Break", 2000, 2);
//  notifier.start();
  var pomodoro = new Pomodoro();
//  $("#starter").click(function () {
//    alert("test");
//  });
  $("#starter").click(pomodoro.toggle.bind(pomodoro));
  $("#restarter").click(pomodoro.restart.bind(pomodoro));
//  pomodoro.test();
});