var hide  = true;

function reDo() { 
 window.location.reload(); 
 } 

window.onresize = reDo;

//Define global variables
var timerID = null;
var timerOn = false;
var timecount = 1000;
// Change this to the time delay that you desire

function showObj(obj)
{
	var x = document.getElementById(obj);
//	generateMenuContent('Testing');
//	hide = !hide;
//	if (sh=='show') hide=false;
//		else hide=true;
//	x.style.visibility = (hide) ? 'hidden' : 'visible';
	x.style.visibility='visible';
}
function hideObj(obj)
{
	document.getElementById(obj).style.visibility = 'hidden';
}

function hideAll() { 
 hideObj('tara'); 
 hideObj('regiune');
 hideObj('subregiune');
 hideObj('localitate'); 
 } 

function startTimer() { 
 if (timerOn == false) { 
 timerID=setTimeout( "hideAll()" , timecount); 
 timerOn = true; 
 } 
 } 

function stopTimer() { 
 if (timerOn) { 
 clearTimeout(timerID); 
 timerID = null; 
 timerOn = false; 
 } 
 }

function setLyr(obj,lyr)
{
	var coors = findPos(obj);
//	if (lyr == 'testP') coors[1] -= 50;
	var x = document.getElementById(lyr);
	x.style.top = coors[1] + 'px';
	x.style.left = coors[0] + 'px';
}

function findPos(obj)
{
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft  
 		curtop = obj.offsetTop
		curleft +=obj.offsetWidth
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	return [curleft,curtop];
}

