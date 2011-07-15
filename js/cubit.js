var BrowserDetect = {
        init: function () {
                this.browser = this.searchString(this.dataBrowser) || 'An unknown browser';
                this.version = this.searchVersion(navigator.userAgent)
                        || this.searchVersion(navigator.appVersion)
                        || 'an unknown version';
                this.OS = this.searchString(this.dataOS) || 'an unknown OS';
        },
        searchString: function (data) {
                for (var i=0;i<data.length;i++) {
                        var dataString = data[i].string;
                        var dataProp = data[i].prop;
                        this.versionSearchString = data[i].versionSearch || data[i].identity;
                        if (dataString) {
                                if (dataString.indexOf(data[i].subString) != -1)
                                        return data[i].identity;
                        }
                        else if (dataProp)
                                return data[i].identity;
                }
        },
        searchVersion: function (dataString) {
                var index = dataString.indexOf(this.versionSearchString);
                if (index == -1) return;
                return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
        },
        dataBrowser: [
                {       string: navigator.userAgent,
                        subString: 'OmniWeb',
                        versionSearch: 'OmniWeb/',
                        identity: 'OmniWeb'
                },
                {
                        string: navigator.vendor,
                        subString: 'Apple',
                        identity: 'Safari'
                },
                {
                        prop: window.opera,
                        identity: 'Opera'
                },
                {
                        string: navigator.vendor,
                        subString: 'iCab',
                        identity: 'iCab'
                },
                {
                        string: navigator.vendor,
                        subString: 'KDE',
                        identity: 'Konqueror'
                },
                {
                        string: navigator.userAgent,
                        subString: 'Firefox',
                        identity: 'Firefox'
                },
                {
                        string: navigator.vendor,
                        subString: 'Camino',
                        identity: 'Camino'
                },
                {               // for newer Netscapes (6+)
                        string: navigator.userAgent,
                        subString: 'Netscape',
                        identity: 'Netscape'
                },
                {
                        string: navigator.userAgent,
                        subString: 'MSIE',
                        identity: 'Explorer',
                        versionSearch: 'MSIE'
                },
                {
                        string: navigator.userAgent,
                        subString: 'Gecko',
                        identity: 'Mozilla',
                        versionSearch: 'rv'
                },
                {               // for older Netscapes (4-)
                        string: navigator.userAgent,
                        subString: 'Mozilla',
                        identity: 'Netscape',
                        versionSearch: 'Mozilla'
                }
        ],
        dataOS : [
                {
                        string: navigator.platform,
                        subString: 'Win',
                        identity: 'Windows'
                },
                {
                        string: navigator.platform,
                        subString: 'Mac',
                        identity: 'Mac'
                },
                {
                        string: navigator.platform,
                        subString: 'Linux',
                        identity: 'Linux'
                }
        ]

};
BrowserDetect.init();




function setDivStyleWinUtil(idDiv){
var obj=document.getElementById('U'+idDiv);
obj.style.borderWidth='3px 3px 0px 3px';
obj.style.backgroundColor='#FFFFFF';
obj.style.height='16px'
setDivVisib('divCuBit'+idDiv,1);
}

function setDivStyleWinInutil(idDiv){
var obj=document.getElementById(idDiv);
obj.style.borderWidth='1px 1px 1px 1px';
obj.style.backgroundColor='#E9F2FB';
obj.style.height='15px';
}

function setDivVisib(idDiv,vis){
if (vis==0)
document.getElementById(idDiv).style.visibility='hidden';
else document.getElementById(idDiv).style.visibility='visible';
}

function setActiveDivE(e){
var obj = (BrowserDetect.browser == 'Firefox')? e.target : event.srcElement;
setActiveDiv(obj);
}

function setActiveDiv(obj){
var id=obj.getAttribute('id');
var idDiv=id.substr(4);
var spanUtilCuBit=document.getElementById('listaUtilCuBit');
//alert(idDiv);
var listaDivInactiv=new Array();

var len=spanUtilCuBit.getElementsByTagName('div').length;
for (var i=0,j=0;i<len;i++,j++)
    {
    var elem=spanUtilCuBit.getElementsByTagName('div')[i];
    //alert(idDiv +' compar ' +id);
    id=elem.getAttribute('id').substr(1);
    
    //alert(idDiv +' compar ' +id);
    if(idDiv!=id) listaDivInactiv[j]=id;
    else {
        j--;
    //alert(j);
    }
    //alert('lista = ' + listaDivInactiv[j]);
    }
setDivStyleWinUtil(idDiv);
for (var j=0;j<listaDivInactiv.length;j++){
setDivStyleWinInutil('U'+listaDivInactiv[j]);
setDivVisib('divCuBit'+listaDivInactiv[j],0);

}
document.getElementById('textdetrimis'+idDiv).focus();
}

function deschideWinCuBit(obj){

id=obj.getAttribute('id');
var spanListaWinCuBit=document.getElementById('listaDivCuBit');

var divObjExist=document.getElementById('Util'+id);
if (divObjExist!=null) {setActiveDiv(divObjExist);
                        return;} 
/*
var div=document.createElement('div');
div.setAttribute('id','divCuBit'+id);
div.setAttribute('name','divCuBit'+id);
div.setAttribute('align','left');
div.className = 'divWinCuBit';

table=document.createElement('table');
table.setAttribute('width','618');
table.setAttribute('border','0');
table.setAttribute('cellspacing','0');
table.setAttribute('cellpadding','0');

var tr=document.createElement('tr');
var td=document.createElement('td');

td.setAttribute('height','37');
td.setAttribute('colspan','2');

var textarea=document.createElement('textarea');
textarea.setAttribute('id','textchat'+id);
textarea.setAttribute('name','textchat'+id);
textarea.setAttribute('cols','');
textarea.setAttribute('rows','');
textarea.setAttribute('readonly','readonly');
textarea.className = 'textChatCuBit';

td.appendChild(textarea);
tr.appendChild(td);
table.appendChild(tr);

var tr=document.createElement('tr');
var td=document.createElement('td');


td.setAttribute('width','546');
td.setAttribute('align','left');
td.setAttribute('valign','top');

var textarea=document.createElement('textarea');
textarea.setAttribute('id','textdetrimis'+id);
textarea.setAttribute('name','textdetrimis'+id);
textarea.setAttribute('cols','');
textarea.setAttribute('rows','1');
textarea.className = 'textDeTrimisCuBit';
td.appendChild(textarea);
tr.appendChild(td);

var td=document.createElement('td');
td.setAttribute('width','73');
td.setAttribute('align','center');

var input=document.createElement('input');
input.setAttribute('id','trimite'+id);
input.setAttribute('name','trimite'+id);
input.setAttribute('type','button');
input.setAttribute('value','Trimite');
input.setAttribute('align','right');
input.className='button';
td.appendChild(input);
tr.appendChild(td);
table.appendChild(tr);
div.appendChild(table);
spanListaWinCuBit.appendChild(div);

var spanUtilCuBit=document.getElementById('listaUtilCuBit');
var div=document.createElement('div');
div.setAttribute('id','U'+id);
div.setAttribute('name','U'+id);
div.setAttribute('align','center');
div.className = 'divUtilCuBit';
div.style.left=getPozUrmatDiv()+'px';

var table1=document.createElement('table');
table1.setAttribute('cellpadding','0');
table1.setAttribute('cellspacing','0');
table1.setAttribute('width','76');
table1.className='tabTbl';
table1.style.width='76px';
table1.style.tableLayout='fixed';

var tr1=document.createElement('tr');
var td1=document.createElement('td');

td1.className='tabLblCell';

var nobr1=document.createElement('nobr');
nobr1.setAttribute('unselectable','on');
nobr1.className='tabLbl';
nobr1.style.width='60px'

nobr1.setAttribute('name','textNoBR'); 

nobr1.setAttribute('id','Util'+id);
nobr1.onclick=setActiveDivE;
nobr1.innerHTML=document.getElementById(id).innerHTML;
var label=document.createElement('label');                                                         
label.innerHTML=\"test\";
td1.appendChild(label);
td1.appendChild(nobr1);
tr1.appendChild(td1);
var td2=document.createElement('td');
td2.setAttribute('align','right');
td2.setAttribute('width','16px');
td2.className='UtiX';

var nobr=document.createElement('nobr');
nobr.setAttribute('id','UtiX'+id);
nobr.setAttribute('name','UtiX'+id);
nobr.onclick=stergeWinCuBit;

nobr.innerHTML='&nbsp;&nbsp;&nbsp;&nbsp;';



td2.appendChild(nobr);
tr1.appendChild(td2);
table1.appendChild(tr1);

div.appendChild(table1);
spanUtilCuBit.appendChild(div);
*/
var div=document.createElement('div');
div.setAttribute('id','divCuBit'+id);
div.setAttribute('name','divCuBit'+id);
div.setAttribute('align','left');
div.className = 'divWinCuBit';

var htmlDivUtil=
//		'<div style=\"visibility: hidden;\" class=\"divWinCuBit\" '+
//		'name=\"divCuBit'+id+'\" id=\"divCuBit'+id+'\" '+
//		'align=\"left\">'+
		'<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"618\">'+
		'<tr>'+
		'<td colspan=\"2\" height=\"37\">'+
		'<textarea class=\"textChatCuBit\" readonly=\"readonly\" rows=\"\" cols=\"\" '+
		'name=\"textchat'+id+'\" id=\"textchat'+id+'\"></textarea>'+
		'</td>'+
		'</tr>'+
		'<tr>'+
		'<td align=\"left\" valign=\"top\" width=\"546\">'+
		'<textarea class=\"textDeTrimisCuBit\" rows=\"1\" cols=\"\" '+
		'name=\"textdetrimis'+id+'\" id=\"textdetrimis'+id+'\">'+
		'</textarea></td>'+
		'<td align=\"center\" width=\"73\">'+
		'<input class=\"button\" value=\"Trimite\" '+
		'name=\"trimite'+id+'\" id=\"trimite'+id+'\" align=\"right\" type=\"button\">'+
		'</td></tr></table>';
//		+'</div>';
div.innerHTML=htmlDivUtil;
spanListaWinCuBit.appendChild(div);

var htmlUtil=
//'<div style=\"border-width: 1px; left: 200px; background-color: rgb(233, 242, 251);'+
//		 'height: 15px;\" class=\"divUtilCuBit\" '+
//		 'name=\"Ucubit3\" id=\"Ucubit3\" align=\"center\">'+
		 '<table style=\"width: 76px; table-layout: fixed;\" class=\"tabTbl\" cellpadding=\"0\" cellspacing=\"0\" width=\"76\">'+
		 '<tr><td class=\"tabLblCell\">'+
		 '<nobr id=\"Util'+id+'\" name=\"textNoBR\" onClick=\"setActiveDiv(this);\" style=\"width: 60px;\" class=\"tabLbl\" unselectable=\"on\">'+document.getElementById(id).innerHTML+'</nobr></td>'+
		 '<td class=\"UtiX\" align=\"right\" width=\"16px\" '+
		 '<nobr name=\"UtiX'+id+'\" id=\"UtiX'+id+'\" onClick=\"stergeWinCuBit(this);\">&nbsp;&nbsp;&nbsp;&nbsp;</nobr>'+
		 '</td></tr></table>';
//		 +'</div>';
var spanUtilCuBit=document.getElementById('listaUtilCuBit');
var div=document.createElement('div');
div.setAttribute('id','U'+id);
div.setAttribute('name','U'+id);
div.setAttribute('align','center');
div.className = 'divUtilCuBit';
div.style.left=getPozUrmatDiv()+'px';
div.innerHTML=htmlUtil;
spanUtilCuBit.appendChild(div);
nobr1=document.createElement('nobr');
nobr1.setAttribute('id','Util'+id);
setActiveDiv(nobr1);
}

function stergeWinCuBit(obj){
//var obj = (BrowserDetect.browser == 'Firefox')? e.target : event.srcElement

var spanListaWinCuBit=document.getElementById('listaDivCuBit');

var idObj=obj.getAttribute('id');
id=idObj.substr(4);
var div=document.getElementById('divCuBit'+id);
spanListaWinCuBit.removeChild(div);
var spanUtilCuBit=document.getElementById('listaUtilCuBit');
var div1=document.getElementById('U'+id);
var pozDiv=div1.style.left;
var height=div1.style.height;
var isActive=false;
    if (height=='16px') isActive=true;
var isUltimulDiv=isUltimDiv(id);
spanUtilCuBit.removeChild(div1);

var ultimDiv=getUltimDiv();
if (ultimDiv!=null&&isActive){
str=ultimDiv.getAttribute('id');
setActiveDiv(document.getElementById('UtiX'+str.substr(1)));
}
repozDeLaPoz(pozDiv);
}

function repozDeLaPoz(pozDiv){
var nrPozDiv=Number(Number(pozDiv.substr(0,pozDiv.indexOf('px'))));

var spanUtilCuBit=document.getElementById('listaUtilCuBit');
var len=spanUtilCuBit.getElementsByTagName('div').length;
var nrRepoz=len-(nrPozDiv-200)/88;
for (var i=1;i<=nrRepoz;i++){
    setDivXPoz(spanUtilCuBit.getElementsByTagName('div')[len-i]);
    }
}

function isUltimDiv(id){
var spanUtilCuBit=document.getElementById('listaUtilCuBit');
if (spanUtilCuBit.lastChild.getAttribute('id').substr(1)==id) {
    return true;
}
else {
    return false;
}
}

function setDivXPoz(div){
str=div.style.left;
pos=Number(Number(str.substr(0,str.indexOf('px')))-88);
if (pos>=200) div.style.left=pos+'px';
}

function getUltimDiv(){
var spanUtilCuBit=document.getElementById('listaUtilCuBit');
var len=spanUtilCuBit.getElementsByTagName('div').length;
var elem;
if (len==0) return null;
else elem=spanUtilCuBit.getElementsByTagName('div')[len-1];
//alert(elem.style.left);
return elem;
}

function getPozUrmatDiv(){
elem=getUltimDiv();
//alert(elem.style.left);
var str='112px';
if (elem==null) str='112px';
else str=elem.style.left;

//alert(Number(Number(str.substr(0,str.indexOf('px')))+72));
return Number(Number(str.substr(0,str.indexOf('px')))+88);
}
