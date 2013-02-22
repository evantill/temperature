temperature
===========

stage alexandre



workflow :
mkdir xxx && cd xxx
npm install generator-angular generator-testacular 
yo angular 
npm install && bower install  
bower install angular-ui
grunt server

probleme grunt build
npm install --save-dev grunt-google-cdn

probleme icones pour bootstrap:
mkdir app/images
cp ./node_modules/generator-angular/app/templates/images/glyphicons-halflings* app/images

connect > livereload > options > hostname: '0.0.0.0' pour connection remote depuis iPad


find WOEID of Reherrey :
http://isithackday.com/geoplanet-explorer/index.php?woeid=619043
WOEID=619043

http://developer.yahoo.com/geo/geoplanet/

http://developer.yahoo.com/weather/

http://www.wunderground.com/weather/api

http://commons.wikimedia.org/wiki/File:Thermometer1.svg

usage typeface.js
http://typeface.neocracy.org/usage.html

<html>
  <head>
    <!-- load any external stylesheets first -->
    <link rel="stylesheet" type="text/css" href="/style.css">

    <!-- then load the typeface.js library and typeface.js fonts -->
    <script src="typeface-0.14.js"></script>
    <script src="helvetiker_regular.typeface.js"></script>
  </head>

  <body>
    <!-- go ahead and specify typeface.js fonts with CSS -->
    <div class="typeface-js" style="font-family: Helvetiker">
      Text here in Helvetiker font...
    </div>
  </body>
</html>

