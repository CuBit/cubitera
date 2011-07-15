var xmlDataRes;
var regObj;
var subregObj;
var tdpos;
var divselectat="selecteaza";
var maxnrcam=40;

function ReadXmlObj(file) {
  var xmlObj;
  if(window.XMLHttpRequest){
      xmlObj = new XMLHttpRequest();
  } else if(window.ActiveXObject){
      xmlObj = new ActiveXObject("Microsoft.XMLHTTP");
  } else {
      return;
  }
  
    xmlObj.open ('GET', file , true);
	xmlObj.onreadystatechange = function(){
		
	    if(xmlObj.readyState == 4){
	       if (xmlObj.status==200){
	       			xmlDataRes=xmlObj.responseXML;
//	       			updateObj('tdtrimite',txttradus());
	       } 
	     	else
      			{
      			alert("Error loading page\n"+ xmlHttpRequest.status +":"+ xmlHttpRequest.statusText);
  			    }
 			      // end of the request, change the status zone
			  document.getElementById("stare").innerHTML = ""
		  	}
			else
				{
		      // Indicates that the client is *busy*
		      document.getElementById("stare").innerHTML = "<b style='color:gray' >Loading...</b>"
				}
	}  
  xmlObj.send ('');
}



function updateObj(obj,html)
{
	document.getElementById(obj).innerHTML=html;
}

function getTableTDNumber(obj){
	var tabletds=obj.parentNode.parentNode.getElementsByTagName('td');
	var x=0;	
	for (x=0;x<tabletds.length;x++){
		if (obj.childNodes[0].firstChild.nodeValue==tabletds[x].childNodes[0].firstChild.nodeValue) break;
	}
	tdpos=x; 
}
function getSelectValue(obj){
	var selobj=document.getElementById(obj);
	return selobj.options[selobj.selectedIndex].value;
}


function updateDivs(divObj) {
	var htmldata='<table border="0" cellspacing="0" cellpadding="0">';
	var stopdiv='</table>';
	var data = null;
	if (xmlDataRes!=null)
	{	
		data=xmlDataRes.getElementsByTagName('tara');
	
	if (divObj=='tara'){
		for(var tr=0;tr<data.length;tr++) {
		htmldata+='<tr><td onmouseover="getTableTDNumber(this); updateDivs(\'regiune\'); hideObj(\'subregiune\'); hideObj(\'localitate\'); showObj(\'regiune\'); setLyr(this,\'regiune\'); stopTimer();" onmouseout="startTimer();" onmouseout="startTimer();"><a href="?pag=00003&loc='+data[tr].attributes.getNamedItem("loc").text+'&activ='+getSelectValue("activitati")+'">'+data[tr].attributes.getNamedItem("nume").text+'&gt;&gt;</a></td></tr>' ;
		}
		htmldata+=stopdiv;
		updateObj('tara',unescape(htmldata));
	}
	if (divObj=='regiune'){
		for (var i=0;i<data[tdpos].childNodes.length;i++){
		regObj=data[tdpos].childNodes;
		htmldata+='<tr><td onmouseover="getTableTDNumber(this); updateDivs(\'subregiune\'); hideObj(\'localitate\'); showObj(\'subregiune\'); setLyr(this,\'subregiune\'); stopTimer();" onmouseout="startTimer();"><a href="?pag=00003&loc='+regObj[i].attributes.getNamedItem("loc").text+'&activ='+getSelectValue("activitati")+'">'+regObj[i].attributes.getNamedItem("nume").text+'&gt;&gt;</a></td></tr>' ;
		}
		htmldata+=stopdiv;
		updateObj('regiune',unescape(htmldata));
	}
	if (divObj=='subregiune'){
		for (var j=0;j<regObj[tdpos].childNodes.length;j++)
		{
		subregObj=regObj[tdpos].childNodes;
		htmldata+='<tr><td onmouseover="getTableTDNumber(this); updateDivs(\'localitate\'); showObj(\'localitate\'); setLyr(this,\'localitate\'); stopTimer();" onmouseout="startTimer();"><a href="?pag=00003&loc='+subregObj[j].attributes.getNamedItem("loc").text+'&activ='+getSelectValue("activitati")+'">'+subregObj[j].attributes.getNamedItem("nume").text+'&gt;&gt;</a></td></tr>' ;
		}
		htmldata+=stopdiv;
		updateObj('subregiune',unescape(htmldata));
	}
	if (divObj=='localitate'){
		for (var k=0;k<subregObj[tdpos].childNodes.length;k++){
		htmldata+='<tr><td onmouseover="stopTimer();" onmouseout="startTimer();"><a href="?pag=00003&loc='+subregObj[tdpos].childNodes[k].attributes.getNamedItem("loc").text+'&activ='+getSelectValue("activitati")+'">'+subregObj[tdpos].childNodes[k].firstChild.nodeValue+'</a></td></tr>' ;
	//				document.write(nodesubreg.childNodes[k].firstChild.nodeValue);
	//				document.getElementById(obj).options[nropt] = new Option(nodesubreg.childNodes[k].firstChild.nodeValue,nodesubreg.childNodes[k].firstChild.nodeValue);	
		}
		htmldata+=stopdiv;
		updateObj('localitate',unescape(htmldata));
	}
	}		
}

function ChangeURL(elem) {
	document.location.href=elem.options[elem.selectedIndex].value;
	return;
}

function preloadImages(imgs) {	
	this.aImages = new Array;
	for (var i=0;i<imgs.length ; i++)
			this.preload(imgs[i]);
}

function preload(image)
{
	var img =new Image;
	this.aImages.push(img);
	img.src=image;
}

function changeImg(imgID,data){
document.getElementById(imgID).src = data;
}

function txttradus(){
	var txt="Nu este text";
	var data=null;

	if (xmlDataRes!=null) {
		data=xmlDataRes.getElementsByTagName('nod');
//		alert(data.length);
//		alert(data);
//		txt=data[0].attributes.getNamedItem("txt").text;
		txt=data[0].firstChild.nodeValue;
//		alert(data[0].firstChild.nodeValue);
	} else alert("null");	
	return txt;
}


function updateCamLibere(obj,objnrcam)
{
	var data=null;
//	tdpos=0; // folosim pentru numarul total vechi de camere libere;
	var totnrcam=0;
	if (xmlDataRes!=null)
	{	
		data=xmlDataRes.getElementsByTagName('rezult');
		
	} else alert("xmldata null");
	var htmldata="&nbsp";
	for(var tr=0;tr<data.length;tr++) {
//	htmldata+="<input id='tipcam"+data[tr].attributes.getNamedItem("idtip").text+"' name='tipcam"+data[tr].attributes.getNamedItem("idtip").text+"' type='hidden' value='"+data[tr].attributes.getNamedItem("nr").text+"'>";
	htmldata+=data[tr].attributes.getNamedItem("tip").text;
	htmldata+="-";	
	htmldata+="<span id='idtipcam"+data[tr].attributes.getNamedItem("idtip").text+"' name='"+data[tr].attributes.getNamedItem("tip").text+"'>"+data[tr].attributes.getNamedItem("nr").text+"</span>";
	htmldata+="&nbsp&nbsp";
	totnrcam+=parseInt(data[tr].attributes.getNamedItem("nr").text);
	}
	
	updateObj(obj,unescape(htmldata));

	var sel=document.getElementById(objnrcam);
	var oldselindex=sel.selectedIndex;
//	alert(oldselindex);
	if (sel.options.length-1>totnrcam) modifTabel("rezervTab",totnrcam,'loc');

	sel.options.length=0;
	for (i=0;i<=totnrcam;i++){
		sel.options[i] = new Option(i,i);
	}
	if (oldselindex>totnrcam) sel.selectedIndex=totnrcam; else sel.selectedIndex=oldselindex;
}

/*
function genereazaEveniment()
	{
		var fireOnThis = document.getElementById('someID');
		if( document.createEvent ) {
		  var evObj = document.createEvent('MouseEvents');
	 	 evObj.initEvent( 'mousemove', true, false );
	 	 fireOnThis.dispatchEvent(evObj);
		} else if( document.createEventObject ) {
	  	fireOnThis.fireEvent('onmousemove');
	}
	
}
*/
 
function ReadCamLibere(file,obj,objnrcam) {
  var xmlObj;
  if(window.XMLHttpRequest){
      xmlObj = new XMLHttpRequest();
  } else if(window.ActiveXObject){
      xmlObj = new ActiveXObject("Microsoft.XMLHTTP");
  } else {
      return;
  }
  
    xmlObj.open ('GET', file , true);
	xmlObj.onreadystatechange = function(){
		
	    if(xmlObj.readyState == 4){
	       if (xmlObj.status==200){
	       			xmlDataRes=xmlObj.responseXML;
					updateCamLibere(obj,objnrcam);
					
	       } 
	     	else
      			{
      			alert("Error loading page\n"+ xmlObj.status +":"+ xmlObj.statusText);
  			    }
 			      // end of the request, change the status zone
			  document.getElementById("stare").innerHTML = ""
		  	}
			else
				{
		      // Indicates that the client is *busy*
		      document.getElementById("stare").innerHTML = "<b style='color:gray' >Loading...</b>"
				}
	}  
  xmlObj.send ('');
}

function ReadCalcul(file) {
  var xmlObj;
  if(window.XMLHttpRequest){
      xmlObj = new XMLHttpRequest();
  } else if(window.ActiveXObject){
      xmlObj = new ActiveXObject("Microsoft.XMLHTTP");
  } else {
      return;
  }
  
    xmlObj.open ('POST', file , true);
	xmlObj.onreadystatechange = function(){
		
	    if(xmlObj.readyState == 4){
	       if (xmlObj.status==200){
	       			xmlDataRes=xmlObj.responseXML;
					updateTabelCalcul();
					
	       } 
	     	else
      			{
      			alert("Error loading page\n"+ xmlObj.status +":"+ xmlObj.statusText);
  			    }
 			      // end of the request, change the status zone
			  document.getElementById("stare").innerHTML = ""
		  	}
			else
				{
		      // Indicates that the client is *busy*
		      document.getElementById("stare").innerHTML = "<b style='color:gray' >Loading...</b>"
				}
	}  
  xmlObj.send ('');
}

function ReadTxtTradus(file,obj) {
  var xmlObj;
  if(window.XMLHttpRequest){
      xmlObj = new XMLHttpRequest();
  } else if(window.ActiveXObject){
      xmlObj = new ActiveXObject("Microsoft.XMLHTTP");
  } else {
      return;
  }
  
    xmlObj.open ('GET', file , true);
	xmlObj.onreadystatechange = function(){
		
	    if(xmlObj.readyState == 4){
	       if (xmlObj.status==200){
	       			xmlDataRes=xmlObj.responseXML;
	       			updateObj(obj,unescape(txttradus()));
	       } 
	     	else
      			{
      			alert("Error loading page\n"+ xmlHttpRequest.status +":"+ xmlHttpRequest.statusText);
  			    }
 			      // end of the request, change the status zone
			  document.getElementById("stare").innerHTML = ""
		  	}
			else
				{
		      // Indicates that the client is *busy*
		      document.getElementById("stare").innerHTML = "<b style='color:gray' >Loading...</b>"
				}
	}  
  xmlObj.send ('');
}

function nrZileLuna(anluna) {
	var an=anluna.charAt(0)+anluna.charAt(1)+anluna.charAt(2)+anluna.charAt(3);
	var luna='0';
	if (anluna.charAt(5)==0) luna=anluna.charAt(6); else luna=anluna.charAt(5)+anluna.charAt(6);
	var maxzile=new Array();
	maxzile[0]='31';
	if ((an-2000)%4==0) maxzile[1]='29';
	else maxzile[1]='28';
	maxzile[2]='31';
	maxzile[3]='30';
	maxzile[4]='31';
	maxzile[5]='30';
	maxzile[6]='31';
	maxzile[7]='31';
	maxzile[8]='30';
	maxzile[9]='31';
	maxzile[10]='30';
	maxzile[11]='31';
	var lunaansel=document.getElementById("lunaanintrare");
	var maxzi=document.getElementById("maxzi");
	if (lunaansel.length-1==lunaansel.selectedIndex) return maxzi.value; 
	else  return maxzile[luna-1];
}

function nrMaxZile(){
	var lunaanselobj=document.getElementById("lunaanintrare");
	var nrmaxzile=0;
	var selvalue=getSelectValue("ziintrare");
	var nrzileselvalue=parseInt((selvalue.charAt(0)=='0')?selvalue.charAt(1):selvalue);
//	alert(nrzileselvalue);
//	if (lunaanselobj.length==1) nrmaxzile+=document.getElementById("maxzi").value-getSelectValue("ziintrare")+1;
//		else nrmaxzile+=nrZileLuna(lunaanselobj.options[lunaanselobj.selectedIndex].value)-getSelectValue("ziintrare")+1;
	if (lunaanselobj.selectedIndex==lunaanselobj.length-1){ nrmaxzile=parseInt(nrZileLuna(lunaanselobj.options[lunaanselobj.selectedIndex].value))-nrzileselvalue+1;
//	alert ("= "+nrmaxzile);
	}
	else 
	for (var i=lunaanselobj.selectedIndex;i<lunaanselobj.length;i++)
	{
		if (i==lunaanselobj.length-1) nrmaxzile+=parseInt(document.getElementById("maxzi").value);
		else if (i==lunaanselobj.selectedIndex) nrmaxzile+=parseInt(nrZileLuna(lunaanselobj.options[i].value))-nrzileselvalue+1;
		else nrmaxzile+=parseInt(nrZileLuna(lunaanselobj.options[i].value));
	}
//	if (lunaanselobj.length>1) 
//	alert(nrmaxzile);
	return nrmaxzile;
}

function setNrZile()
{
	var nrzileobj=document.getElementById("nrzile");
	nrzileobj.length=0;
	nrmaxzile=nrMaxZile();
	for (var p=0;p<=nrmaxzile;p++){
		nrzileobj.options[p] = new Option(p,p);
	}
	nrzileobj.selectedIndex=0;
}

function setSelectValues(obj,anluna){
	var sel=document.getElementById(obj);
	sel.options.length=0;
	var data=new Date();
	var zianacum=data.getFullYear()+"-";
	zianacum+=parseInt((data.getMonth()))<9?("0"+(data.getMonth()+1)):(data.getMonth()+1);

	var nrzi=0;
	
	if(zianacum==anluna) {
		nrzi=parseInt(data.getDate())-1; 
	}
	for (i=nrzi,j=0;i<nrZileLuna(anluna);i++,j++){
		sel.options[j] = new Option(i<9?'0'+(i+1):(i+1),i<9?'0'+(i+1):(i+1));
	}
	sel.selectedIndex=0;
}
function setSelectIndex()
{
	var obj = (navigator.appName == 'Netscape')? e.target : event.srcElement
	selectIndex=obj.selectedIndex;
}

function maxseltipcam(){
	var obj = (navigator.appName == 'Netscape')? e.target : event.srcElement
	var initSelectIndex=obj.selectedIndex;

	var initTipCam=obj.options[obj.selectedIndex].value;
	var numeTipCam=obj.options[obj.selectedIndex].innerHTML;
	var nrmaxdetip=parseInt(document.getElementById("idtipcam"+initTipCam).innerHTML);
	var selectdetip=0;
	var maximatins=false;
	for (var i=1;i<=maxnrcam;i++){
		if ((document.getElementById(i+"tipcamera")!=null)&&(document.getElementById(i+"tipcamera").selectedIndex==initSelectIndex)) selectdetip++;
	}
	if (selectdetip>nrmaxdetip)
	{ 
	  maximatins=true;
	  obj.selectedIndex=selectIndex;
	  alert(numeTipCam+": max "+nrmaxdetip);
	}
	return maximatins;	
}

function modifTabel(obj,nrtrsel,tiploc){
	var tbl=document.getElementById(obj);
	var tipcamobj;
	var nrtr=0;
	var totnrcam=0;
	var selectIndex=0;
	
	var maxNrTipCam=new Array();
	for (var i=1,selop=0;i<15;i++){
		tipcamobj=document.getElementById("idtipcam"+i);
		if (tipcamobj) {
					maxNrTipCam[selop++]=i;
					totnrcam+=parseInt(tipcamobj.innerHTML);
					}
	}

	for(x=1;x<=maxnrcam;x++){
		if (document.getElementById(x+"tr")) nrtr++; else break;
	}
	
	var nrtipcamobj=document.getElementById(nrtr+"tipcamera");
	if (nrtipcamobj) selectIndex=nrtipcamobj.selectedIndex;
	
	var ctrl=null;
	
	var nrtrselint=parseInt(nrtrsel);
//	if (nrtrselint>=0)
	if (nrtrselint<nrtr){
	for(i=nrtr;i>nrtrselint;i--){
		ctrl=document.getElementById(i+"tr");
		ctrl.parentNode.removeChild(ctrl);
		}
	}
	else {
		for (j=nrtr+1;j<=nrtrselint;j++)
		{
		tr = document.createElement("tr");
		tr.setAttribute("id",j+"tr");
		
		td = document.createElement("td");
		td.setAttribute("width","122");
		td.setAttribute("align","center");

//		width="122" align="center"
		txt = document.createTextNode("#"+j+" ");
	    td.appendChild(txt);
		
		sel=document.createElement("select");
//		alert("aici");
		sel.setAttribute("name",j+"tipcamera");
		sel.setAttribute("id",j+"tipcamera");
		sel.setAttribute("size","1");
		sel.onclick=setSelectIndex;
		sel.onchange=maxseltipcam;
		sel.className = "select";

		sel.options.length=0;
					
		for (i=0;i<maxNrTipCam.length;i++){
			tipcamobj=document.getElementById("idtipcam"+maxNrTipCam[i]);
					sel.options[i] = new Option(tipcamobj.getAttribute("name"),maxNrTipCam[i]);
		}
		var sumnrcam=0;
			
		for (var i=0;i<=selectIndex;i++)
		{
			tipcamobj=document.getElementById("idtipcam"+maxNrTipCam[i]);
			sumnrcam+=parseInt(tipcamobj.innerHTML);
			if ((j-1)==sumnrcam) selectIndex++; 
		}
   		sel.selectedIndex=selectIndex%maxNrTipCam.length;
			
		td.appendChild(sel);
		tr.appendChild(td);	

		
		td = document.createElement("td");
		td.setAttribute("width","41");
		td.setAttribute("align","center");
		
		sel=document.createElement("select");
		sel.setAttribute("name",j+"nradulti");
		sel.setAttribute("id",j+"nradulti");
		sel.setAttribute("size","1");
		sel.className = "select";

		sel.options.length=0;
					
		for (selop=0;selop<3;){
				sel.options[selop] = new Option(selop+1,selop+1);
				selop++;
		}
		sel.selectedIndex=0;
		td.appendChild(sel);
		tr.appendChild(td);	

		
		td = document.createElement("td");
		td.setAttribute("width","41");
		td.setAttribute("align","center");
		
		sel=document.createElement("select");
		
		sel.setAttribute("id",j+"nrcopii");
		sel.setAttribute("name",j+"nrcopii");
		sel.setAttribute("size","1");
		sel.className = "select";
		sel.onchange = showdnc;

		sel.options.length=0;
					
		for (selop=0;selop<4;){
				sel.options[selop] = new Option(selop,selop);
				selop++;
		}
		sel.selectedIndex=0;
		td.appendChild(sel);
		tr.appendChild(td);	

		
		td = document.createElement("td");
		td.setAttribute("width","242");
		td.setAttribute("align","center");
		
		span = document.createElement("span");
		span.setAttribute("id",j+"dnc");
		span.setAttribute("value","numar copii");
		

		td.appendChild(span);
		
		tr.appendChild(td);	
		tbl.appendChild(tr);
		
		}
	 }
}
function clickFirst(e) {
	var obj = (navigator.appName == 'Netscape')? e.target : event.srcElement

//	ctrl = document.getElementById(obj.Description);
	if (obj.value == 'zz-ll-aaaa')
		obj.value = '';
}
/*
function showdnc(){
	var obj = (navigator.appName == 'Netscape')? e.target : event.srcElement

//	ctrl = document.getElementById(obj.Description);
	var str=obj.getAttribute('id');
	str=str.substr(0,str.indexOf('nr'));


	for (nr=1;nr<4;nr++) { 
		hideObj(str+'dnc'+nr);
	}
	for (nr=1;nr<=obj.selectedIndex;nr++) { 
		showObj(str+'dnc'+nr);
	}
}
*/
function showdnc(){
	var obj = (navigator.appName == 'Netscape')? e.target : event.srcElement

			var idtr=obj.getAttribute('id');
			idtr=idtr.substr(0,idtr.indexOf('nr'));
			document.getElementById(idtr+"dnc").innerHTML="";
			
		for (dnc=0;dnc<obj.options[obj.selectedIndex].value;dnc++)
		{
			input=document.createElement("input");
			input.setAttribute("name",idtr+"dnc"+(dnc+1));
			input.setAttribute("id",idtr+"dnc"+(dnc+1));
			input.setAttribute("type","text");
			input.setAttribute("value","zz-ll-aaaa");
			input.setAttribute("size","12");
			input.setAttribute("maxlength","10");
//			input.style.visibility='hidden';
			input.className = "input";
			input.onclick = clickFirst;
			var spanobj=document.getElementById(idtr+"dnc")
			spanobj.appendChild(input);
			var spatiu = document.createTextNode(" ");
	 	  	 spanobj.appendChild(spatiu);
		}
}

function setDivPos(divobj){
	var obj=document.getElementById("tabsel");
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft  
 		curtop = obj.offsetTop
 		curtop += obj.offsetHeight;
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	var div = document.getElementById(divobj);
	div.style.top = curtop + 'px';
	div.style.left = curleft + 'px';
}

function selectDiv(obj){
	var objar= new Array();
	objar[0]="selecteaza";
	objar[1]="calculeaza";
	objar[2]="trimite";
	

	for(var i=0;i<objar.length;i++){
		hideObj(objar[i]);
		
		if (obj==objar[i]) {
				var tdid=divselectat.substr(0,4);
				var objtd=document.getElementById(tdid);
				objtd.setAttribute("bgColor","#FFFFFF");
				divselectat=obj;
				setDivPos(objar[i]); 
			 	showObj(objar[i]);
			 }
	}
}

function  returnFormURI(){
	var uritxt="?";
	for (var i=0;i<document.forms[0].elements.length;i++){ 
	uritxt += document.forms[0].elements[i].name+'='+document.forms[0].elements[i].value;
	if(i!=document.forms[0].elements.length-1) uritxt += '&';
	}
//	alert(uritxt);
	return uritxt;
}
function updateTabelCalcul()
{
var data;
if (xmlDataRes!=null) {
		data=xmlDataRes.getElementsByTagName('valoare');
	} else alert("null");	
var html="<table id=\"calculeazatabel\"  width=\"453\" border=\"1\" cellspacing=\"0\" cellpadding=\"0\" style=\"color:white;\">";
	for(var i=0;i<data.length-1;i++){
			 html+="<tr>"+
						"<td width=\"333\" align=\"right\">"+data[i].attributes.getNamedItem("calcul").text+" </td>"+
						"<td width=\"120\" align=\"center\">"+data[i].attributes.getNamedItem("total").text+" "+data[i].attributes.getNamedItem("valuta").text+" </td>"+
				   "</tr>"
	}
				html+="<tr>"+
						"<td>&nbsp;</td>"+
						"<td align=\"center\">"+data[data.length-1].attributes.getNamedItem("total").text+" "+data[data.length-1].attributes.getNamedItem("valuta").text+"</td>"+
					  "</tr>"+
			"</table>"	
updateObj('tabelcalcul',unescape(html));
}

/*
function showObjDNCopil(nr){
	for(var i=1;i<=nr;i++){
		showObj('dncopil'+i);	
	}
}

function hideObjDNCopil(){
	hideObj('dncopil1');
	hideObj('dncopil2');
	hideObj('dncopil3');
	hideObj('dncopil4');
}
*/