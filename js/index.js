nieuwsNS = {};
nieuwsNS.arr  = [];

$(function() {
  alert("Hier. . .");
  var activeItem, navBar;
  navBar = document.getElementById('navBarId');
	  
  $("#navBarId").load("menu.html", function() {
    activeItem = document.querySelector('[href="index.html"]');
	navBar.classList.add('ui-navpanel');
    activeItem.classList.add('ui-active');
  });
  
  var data = {
	type    : 'content'
  ,	txt     : 'Wie lang en gezond leven ambieert, trekt maar best regelmatig een sporttenue aan. Volgens...'
  ,	date    : '23-11-2018'
  , header	: 'Niet bewegen nog slechter voor gezondheid dan roken of diabetes' 
  ,	src     : 'media/outside table tennis.jpg'
  ,	alt     : 'Outside table tennis'
  ,	imgText : ''
  };
  nieuwsNS.arr.push(data);
  
  data = {
	type    : 'content'
  ,	txt     : 'Ongeveer vijftig taxi-chauffeurs die het wmo-vervoer in Midden-Groningen verzorgen, leggen aanstaande...'
  ,	date    : '30-11-2018'
  , header	: 'Wmo-chauffeurs gaan staken tegen vrijwillige chauffeurs'
  ,	src     : 'media/taxibus.jpg'
  ,	alt     : 'Taxibus'
  ,	imgText : ''
  };
  nieuwsNS.arr.push(data);
  
  data = {
	type    : 'iframe'
  ,	txt     : 'Wat betekent het als 37 procent van de werknemers aangeeft dat haar of zijn job volstrekt nutteloos is? David Graeber schreef...'
  ,	date    : '07-12-2018'
  , header	: 'Zonder bullshit jobs zouden we maar 15 uur per week moeten werken' 
  ,	src     : 'http://www.dewereldmorgen.be/artikel/2018/06/08/zonder-bullshit-jobs-zouden-we-maar-15-uur-per-week-moeten-werken#'
  ,	alt     : ''
  ,	imgText : ''
  };
  nieuwsNS.arr.push(data);
  
  data = {
  	type    : 'content'
  ,	txt     : 'De privacy van burgers loopt gevaar, sinds de nieuwe inlichtingenwet bestaat. „Kun je nagaan hoe mis het straks kan gaan...'
  ,	date    : '03-01-2019'
  , header	: 'Trage implementatie inlichtingenwet voedt wantrouwen'
  ,	src     : 'media/exterieur aivd.jpg'
  ,	alt     : 'Exterieur AIVD'
  ,	imgText : 'ZOETERMEER - Exterieur AIVD'
  };
  nieuwsNS.arr.push(data);

  for (var i=0;i < nieuwsNS.arr.length;i++) {
	var type = nieuwsNS.arr[i].type;
	
	setContentList(i);
	
	if (type == 'content')
	  setMainContent(i);
    else
	  setMainIframe(i);
  }
});
	
function myFunction(p_msg) {
    alert("Message: " + p_msg);
  };
	
function processContent(p_index) {
  var btn = document.getElementById('btn' + p_index);
  var txt = nieuwsNS.arr[p_index].txt;
  
  switch(btn.innerHTML) {
    case 'Read more':
      btn.innerHTML = 'Read less';
	  $("#content" + p_index).load("articles/article-" + p_index + ".html");
      break;
	case 'Read less':
	  btn.innerHTML = 'Read more';
      $("#content" + p_index).text(txt);
      location.href = "#header" + p_index;
      break;
	case 'To article':
	  btn.innerHTML = 'Back';
      $("#content" + p_index).text(txt);
	  location.href = "#iframe" + p_index;
      break;
	case 'Back':
	  btn.innerHTML = 'To article';
      $("#content" + p_index).text(txt);
      location.href = "#header" + p_index;
      break;
    default:
      btn.innerHTML = 'Read more';
  }  
}	

function setContentList(p_index) {
    var tr      = document.createElement('tr');
	var td1     = document.createElement('td');
	var td2     = document.createElement('td');
	var span    = document.createElement('span');
	var a       = document.createElement('a');
	var date    = nieuwsNS.arr[p_index].date;
	var header  = nieuwsNS.arr[p_index].header + ' [..]';
	var rightId = document.getElementById('table-rightId');

	td1.classList.add('td-1');
	span.classList.add('ui-date');
	span.innerHTML  = date;

	td2.classList.add('td-2');
	a.classList.add('ui-a');
	a.href = '#header' + p_index;
	a.innerHTML = header;

	td1.appendChild(span);
	td2.appendChild(a);
	tr.appendChild(td1);
	tr.appendChild(td2);
 	
	rightId.insertBefore(tr, rightId.childNodes[0]);
}
		
function setMainContent(p_index) {
    var div   = document.createElement('div');
	var div2  = document.createElement('div');
	var div3  = document.createElement('div');
	var h4    = document.createElement('h4');
	var span  = document.createElement('span');
	var span2 = document.createElement('span');
	var img   = document.createElement('img');
	var src   = nieuwsNS.arr[p_index].src;
	var btn   = document.createElement('button');
	var main  = document.getElementById('mainId');
	
	var txt     = nieuwsNS.arr[p_index].txt;
	var date    = nieuwsNS.arr[p_index].date;
	var header  = ' ' + nieuwsNS.arr[p_index].header;
    var alt     = nieuwsNS.arr[p_index].alt;
	var imgText = nieuwsNS.arr[p_index].imgText;

	h4.setAttribute('id', 'header' + p_index);

	span.classList.add('ui-date');
	span.innerHTML  = date;
	span2.innerHTML = header;
	h4.setAttribute('id', 'header' + p_index);
	h4.appendChild(span);
	h4.appendChild(span2);

    img.classList.add('img');
	img.src    = src;
	img.alt    = alt;
	img.height = '400';
	div2.style.paddingTop    = '15px';
    div2.style.paddingBottom = '5px';
 	div2.setAttribute('id', 'content' + p_index);
	div2.innerHTML = txt;

	btn.classList.add('ui-btn-small');
	btn.setAttribute('id', 'btn' + p_index);
    btn.innerHTML = 'Read more';
	btn.addEventListener("click", function() {
      processContent(p_index)
    });
	
    div.classList.add('item');
	div.appendChild(h4);
    div.appendChild(img);
    if (imgText != '') {
	  var imgTextContainer = document.createElement('div');
	  imgTextContainer.innerHTML = imgText;
	  div.appendChild(imgTextContainer);
	}
	
	div.appendChild(div2);
	div.appendChild(btn);
 	
    div3.style.paddingTop = '55px';
	main.insertBefore(div3, main.childNodes[0]);
	main.insertBefore(div, main.childNodes[0]);
}

function setMainIframe(p_index) {
    var div    = document.createElement('div');
	var div2   = document.createElement('div');
	var div3   = document.createElement('div');
	var div4   = document.createElement('div');
	var h4     = document.createElement('h4');
	var span   = document.createElement('span');
	var span2  = document.createElement('span');
	var iframe = document.createElement('iframe');
	var btn    = document.createElement('button');
	var main   = document.getElementById('mainId');
	
	var src    = nieuwsNS.arr[p_index].src;
	var txt    = nieuwsNS.arr[p_index].txt;
	var date   = nieuwsNS.arr[p_index].date;
	var header = ' ' + nieuwsNS.arr[p_index].header;

	h4.setAttribute('id', 'header' + p_index);

	span.classList.add('ui-date');
	span.innerHTML  = date;
	span2.innerHTML = header;
	h4.setAttribute('id', 'header' + p_index);
	h4.appendChild(span);
	h4.appendChild(span2);

	div2.setAttribute('id', 'content' + p_index);
	div2.innerHTML = txt;
	
    div3.setAttribute('id', 'iframe' + p_index);
	div3.classList.add('iframe-section');
	div3.classList.add('embed-responsive');
	div3.classList.add('embed-responsive-4by3');

	iframe.classList.add('embed-responsive-item');
	iframe.src    = src;

    div3.appendChild(iframe);

	btn.classList.add('ui-btn-small');
	btn.setAttribute('id', 'btn' + p_index);
    btn.innerHTML = 'To article';
	btn.addEventListener("click", function() {
      processContent(p_index)
    });
	
    div.classList.add('item');
	div.appendChild(h4);
    div.appendChild(div2);
	div.appendChild(div3);
    div.appendChild(btn);
	
    div4.style.paddingTop = '55px';
	main.insertBefore(div4, main.childNodes[0]);
	main.insertBefore(div, main.childNodes[0]);
}
