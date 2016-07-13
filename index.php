<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
    <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" ></script>

    <title>
      Pomodoro
    </title>


    <!--custom pages-->
    <script src="js/main.js" type="text/javascript"></script>
    <link href="css/main.css" rel="stylesheet" type="text/css"/>
    <link href="css/stopwatch.css" rel="stylesheet" type="text/css"/>

    <!--END custom pages-->

  </head>
  <body>
    <div id="sound"></div>//sound alert container
    <div class="mainDiv">
      <!--//TODO add external + - buttons, add label-->
      <input type="number" id="workDuration" value="4" placeholder="work duration(s)">
      <!--//TODO add external + - buttons, add label-->
      <input type="number" id="breakDuration" value="4" placeholder="break duration(s)">
      <!--//TODO move into stopwatch center with icons-->
      <button id="starter"> Start </button>
      <!--//TODO turn into icon-->
      <button id="restarter"> Restart </button>

      <!--//TODO delete-->
      <div class="" id="displayer"></div>

      <div id="stopWatch">
        <div id="marker"></div>
        <div id="hidder"></div>
        <div id="marker2"></div>
        <div id="countdown"></div>
      </div>
    </div>
  </body>
</html>
