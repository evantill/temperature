var thermometerImage = new Image();
var thermometerImageUrl="images/thermometer.png"
var outsideThermometer = undefined

function initThermometer(){
	alert(initThermometer)
	outsideThermometer=new Thermometer('outsideThermometerCanvas');		
	thermometerImage.onload= function() {
		outsideThermometer.draw();
	}
	thermometerImage.src=thermometerImageUrl;
}

var Thermometer = function(canvasId) {
	this.canvas=document.getElementById(canvasId);
	this.temperature=undefined
}

Thermometer.prototype.draw = function() {
	var ctx = this.canvas.getContext('2d');
	this.drawImage(ctx);
	if(this.temperature){
		this.drawFluid(ctx);
	}
}

Thermometer.prototype.drawImage = function(context) {
	context.drawImage(thermometerImage, 0, 0);
}

Thermometer.prototype.drawFluid = function(context) {
	var temp = this.temperature;
	var ratio = this.getRatio(temp);
	var yTemp = this.convertTempToScreenCoord(ratio, temp);

	/* Draw red rectangle to represent the fluid in the glass tube
	 * Coordinates you Y and are fixed!
	 * TODO: Calculare Y coord base on image X,Y
	 */

	var iX_POS = 111,
		iY_POS = 7,
		iY_OFFSET = 686,
		iWIDTH = 35;

	context.fillStyle = "rgb(200,0,0)";

	// Draw rectangle from -30 to yTemp
	context.fillRect(iX_POS, yTemp, iY_POS, iY_OFFSET - yTemp);

	// Draw rectangle from botton to -30
	context.fillRect(iX_POS, iY_OFFSET, iY_POS, iWIDTH);

	context.stroke();
}

Thermometer.prototype.setTemperature = function(value) {	
	if (value > 50) {
		this.temperature = 50;
	} else if (value < -30) {
		this.temperature = -30;
	} else {
		this.temperature = value;
	}	
	this.draw();
}

Thermometer.prototype.getRatio=function(iTemp) {
	/* The image is not in proportion this the gauge to pixel 
	 * ratio need slight adjustment
	 */

	var iRatio;

	if (iTemp > 0) {
		iRatio = 7.1;
	} else if (iTemp <= 0) {
		iRatio = 6.9;
	} else if (iTemp < -20) {
		iRatio = 6.77;
	}

	return iRatio;
}

Thermometer.prototype.convertTempToScreenCoord= function(iRatio, iTemp) {
	/* Algorithm to convert the temperature to the correct x screen coord.
	 * Odd, but works!
	 */
	var iMAX_TEMP = 50,
		iSTART_Y_POS = 147;

	return iSTART_Y_POS + (iRatio * (iMAX_TEMP - iTemp));
}

//Function called when user clicks the draw button
Thermometer.prototype.setTempAndDraw = function(temp,slider) {	
	if (temp !== null && slider !== null) {
		temp.value = slider.value;
		this.draw();
	}
}
