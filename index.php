<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">


    <link
      rel="stylesheet"
      type="text/css"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
      />
    <script
      src="https://code.jquery.com/jquery-2.2.4.min.js"
      integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous">
    </script>
    <script
      src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" >
    </script>


    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
      >

    <title>
      Pomodoro
    </title>


    <!--custom pages-->
    <script src="js/main.js" type="text/javascript"></script>
    <link href="css/main.css" rel="stylesheet" type="text/css"/>
    <!--<link href="css/stopwatch.css" rel="stylesheet" type="text/css"/>-->

    <!--END custom pages-->

  </head>
  <body>
    <!--<div class="container">-->
    <div class="">
      <!--//sound alert container-->
      <div id="sound"></div>
      <!--//TODO not really centered-->
      <div class="mainDiv ">
        <!--<div class="subDiv">-->
        <!--      <div class="inputWrapper workDiv">
                <span class="glyphicon glyphicon-plus"></span>
                <br>
                <label class="">
                  Work Duration
                  <br>
                  <input type="number" id="workDuration" class="noControl" value="25" placeholder="work">
                </label>
                <br>
                <span class="glyphicon glyphicon-minus"></span>
              </div>
              <div class="inputWrapper breakDiv">
                <span class="glyphicon glyphicon-plus"></span>
                <br>

                <label class="">
                  Break Duration
                  <br>
                  <input type="number" id="breakDuration" class="noControl" value="5" placeholder="break">
                </label>
                <br>
                <span class="glyphicon glyphicon-minus"></span>

              </div>-->
        <div id="stopWatch" class="stopWatch" >
          <div id="marker" class="marker"></div>
          <div id="hidder" class="hidder"></div>
          <div id="marker2" class="marker2"></div>
          <!--        <div class="countdown">
                    <div class="inputWrapper workDiv">
                      <span class="glyphicon glyphicon-plus"></span>
                      <br>
                      <label class="">
                        Work Duration
                        <br>
                        <input type="number" id="workDuration" class="noControl" value="25" placeholder="work">
                      </label>
                      <br>
                      <span class="glyphicon glyphicon-minus"></span>
                    </div>
                    <span id="countdown">

                    </span>
                    <div class="inputWrapper breakDiv">
                      <span class="glyphicon glyphicon-plus"></span>
                      <br>

                      <label class="">
                        Break Duration
                        <br>
                        <input type="number" id="breakDuration" class="noControl" value="5" placeholder="break">
                      </label>
                      <br>
                      <span class="glyphicon glyphicon-minus"></span>

                    </div>
                  </div>-->
          <div id="controls" class="controls">

            <div>
        <!--<span id="restarter" class="glyphicon glyphicon-repeat"></span>-->
              <span id="restart" class="glyphicon glyphicon-step-backward"></span>
              <span id="playPause" class="glyphicon glyphicon-play"></span>
              <span id="next" class="glyphicon glyphicon-step-forward"></span>
            </div>
            <div>
              <!--<br>-->
              <div class="inputWrapper workDiv">
                <div>
                  <span class="glyphicon glyphicon-plus" id="workDurationPlus" ></span>
                </div>
                <!--<br>-->
                <!--<label class="">-->
                <!--Work Duration-->
                <!--<br>-->
                <div>
                  <input type="number" id="workDuration" class="noControl" value="25" placeholder="work">
                </div>
                <!--</label>-->
                <!--<br>-->
                <div>
                  <span class="glyphicon glyphicon-minus" id="workDurationMinus"></span>
                </div>
              </div>
              <span id="countdown">

              </span>
              <div class="inputWrapper breakDiv">
                <div>
                  <span class="glyphicon glyphicon-plus" id="breakDurationPlus"></span>
                </div>
                <!--<br>-->

                <!--<label class="">-->
                <!--Break Duration-->
                <!--<br>-->
                <div>
                  <input type="number" id="breakDuration" class="noControl" value="5" placeholder="break">
                </div>
                <!--</label>-->
                <!--<br>-->
                <div>
                  <span class="glyphicon glyphicon-minus" id="breakDurationMinus"></span>
                </div>
              </div>
            </div>
            <!--<br>-->
            <div>
              <span id="mute" class="glyphicon glyphicon-volume-up"></span>
              <!--<span id="notification" class="glyphicon glyphicon-bell"></span>-->
              <!--<i id="notification" class="material-icons">notifications</i>-->
              <i id="notification" class="material-icons">notifications</i>
            </div>
          </div>
        </div>
        <!--</div>-->
      </div>
    </div>
  </body>
</html>
