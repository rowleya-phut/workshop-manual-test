//dependency is nav-bar.js - MUST COME FIRST

//document.addEventListener('contextmenu', event => event.preventDefault()); //prevent the normal right click menu

//attempt to save myself loading alternate jquery by adding script element manually to each page! 
/* function TestIE(){
	if (window.attachEvent && !window.addEventListener ){
		var p = document.createElement("p");
		p.innerHTML = "<br><br><br><br><br><br><br><br>test1";
		document.body.insertBefore(p, document.body.firstChild);
		
		function require(file,callback){
		var head=document.getElementsByTagName("head")[0];
		var script=document.createElement('script');
		script.src="http://code.jquery.com/jquery-1.12.4.js";
		script.type='text/javascript';
		//real browsers
		script.onload=callback;
		//Internet explorer
		script.onreadystatechange = function() {
			if (this.readyState == 'complete') {
				callback();
			}
    }
    head.appendChild(script);
}
require()

	} else {
		var p = document.createElement("p");
		p.innerHTML = "<br><br><br><br><br><br><br><br>test2";
		document.body.insertBefore(p, document.body.firstChild);
	}
}  

TestIE(); */

$(document).ready(function(){

	//put a button on each page to toggle the hidden fields
	//containing information which the user generally doesn't need
	if (document.title != "PAS-decision-tree"){
		var buttons = "";
		buttons += '<button id="hideExtra" class="btn btn-info">Show Extra</button>';
	}	
	$('#btns').html(buttons);	

	$('#hideExtra').on('click', function(){
		var button = this;
		$( "tr:contains('Student Number')" ).toggle().css("backgroundColor", "#FFFFE0");
		$( "tr:contains('Explain')" ).toggle().css("backgroundColor", "#FFFFE0");	
		$( "tr:contains('Open the')" ).toggle().css("backgroundColor", "#FFFFE0");
		$( "tr:contains('Student completion')" ).toggle().css("backgroundColor", "#FFFFE0");
		$( "tr:contains('Update details')" ).toggle().css("backgroundColor", "#FFFFE0");
		$( "tr:contains('Have ready for ')" ).toggle().css("backgroundColor", "#FFFFE0");
		$( "#extraInfo" ).toggle().css("backgroundColor", "#FFFFE0");
		if($('#hideExtra').text() == "Show Extra"){
			$('#hideExtra').text("Show Less");
		}else{
			$('#hideExtra').text("Show Extra");
		}
	});
	
	//make the navbar fixed to top
	$('.navbar').addClass('navbar-fixed-top');
	$('.navbar').removeClass('navbar-inverse');
	$('.navbar').addClass('navbar-default');
	
	//expand or collapse the images on the PMI0 page
	$('.accordion').on('click', function(){
		//var panel = this.next();
		if ($(this).next().css("display") == "none"){
			//console.log($(this).next().css("display"));
			$(this).next().css("display", "block");
		}else{
			$(this).next().css("display", "none");
		}
	});

	//attach notes form
	console.log("this page is: " + document.title);

	var addNoteString = "";
	addNoteString+='<div style="margin-left: 20px; margin-right: 20px;">';
	addNoteString+='<!--Notes-->';
	addNoteString+='<div id="addedNote">';

	addNoteString+='</div>';
	//only add note if trainer logged in
	if(localStorage.userId)
	{
		addNoteString+='<div class="panel panel-info">';
		addNoteString+='<div class="panel-heading"><span class="glyphicon glyphicon-info-sign"></span> Add Note</div>';
		addNoteString+='<div class="panel-body">';
		addNoteString+='<!-- <div id="form-wrapper">  -->';
						
		addNoteString+='<form id="addNotesForm" action="Form.html" class="form-group" method="post">';
	
		addNoteString+='<br/>Note:<br/>';
		addNoteString+='<input type="text" name="addedNoteNote" id="addedNote1" class="form-control">';
					
		addNoteString+='<br>';
		addNoteString+='<button type="submit" class="btn btn-primary">Submit</button>';
		addNoteString+='</form>';
		addNoteString+='<!-- </div> -->';
		addNoteString+='</div>';
		addNoteString+='</div>';
	}
	
	
	addNoteString+='</div>';
	$('body').append(addNoteString);


	//attach all relevant scripts to all pages
	var scriptsString = "";
	
	scriptsString +='<script src="scripts/login.js"></script>';
	// scriptsString +='<script src="scripts/form.js"></script>';
	scriptsString +='<script src="scripts/readDropDowns.js"></script>';
	scriptsString +='<script src="scripts/writeNotesAjax.js"></script>';
	scriptsString +='<script src="scripts/readNotesAjax.js"></script>';
	scriptsString +='<script src="scripts/deleteNotesAjax.js"></script>';
	scriptsString +='<script src="scripts/editNotesAjax.js"></script>';

	$('body').append(scriptsString);

	//search all objects - won't work on IE if attempting to access through the file system - blocks localstorage
$('#searchTermsForm').submit(function(event){
	//alert("Searching");

	console.log()
	
	$('#searchResults').empty();
	localStorage.searchTerm1 = $('#searchTerm1').val();

	var searchTerm = $('#searchTerm1').val();

	//alert($('#searchTerm1').val())
	event.preventDefault()
	
	//put all objects in one search object
	SearchObject = {
		PAS : PASObject,
		Clinical : ClinicalObject,
		Desktop : DesktopObject,
		Misc : MiscObject,
		PatientCentre : PatientCentreObject,
	}
	//console.log(SearchObject);
	//console.log(SearchObject.Clinical.page1.page);

	//search ALL objects
	for (var object in SearchObject){
		//console.log(SearchObject[object])
		for (var key in SearchObject[object]) {
		var content = SearchObject[object][key].contentA + " " + SearchObject[object][key].page; //searches on content and page name
		if(content != undefined && content != ""){
			//var contentRegExp = new RegExp(localStorage.searchTerm1, 'i');
			var contentRegExp = new RegExp(searchTerm, 'i');
			if(contentRegExp.test(content)){
				//console.log(SearchObject[object][key].page);
				content = content.substring(0, 200) + '...';
				$('#searchResults').append('<div id="searchReturn"> <a href='+SearchObject[object][key].page+'>'+SearchObject[object][key].page+'</a> <br> <h5>Course Objectives</h5> '+content+' </div><br><br>');

				} 
			}
		}
	}
});
	
});


//set the currentPageObject by the title (in the metadata) of the loaded page
//currentPageObject is then used for other functions - see below
function ifTitleThen(){
	//console.log("workshop manual: "+PASObject);
	for (var key in PASObject) {
		//console.log(PASObject[key].title + ": "+ document.title);
		if (PASObject[key].title == document.title){
			currentPageObject = PASObject[key];
		} 
	for (var key in ClinicalObject) {
		if (ClinicalObject[key].title == document.title){
			currentPageObject = ClinicalObject[key];
		} 
	}
	for (var key in DesktopObject) {
		if (DesktopObject[key].title == document.title){
			currentPageObject = DesktopObject[key];
		} 
	}
	for (var key in MiscObject) {
		if (MiscObject[key].title == document.title){
			currentPageObject = MiscObject[key];
		} 
	}
	for (var key in PatientCentreObject) {
		if (PatientCentreObject[key].title == document.title){
			currentPageObject = PatientCentreObject[key];
		} 
	}
	for (var key in TeachingObject) {
		if (TeachingObject[key].title == document.title){
			currentPageObject = TeachingObject[key];
		} 
	}
	
	}
	//console.log(currentPageObject.title);
}
ifTitleThen();

// function clearPage(){
// 	$('#firstPara').html();
// }

//make use of the contentA attribute of the PAS object - display this information on the page
//if it doesn't have any contentA - then ignore it.
function createFirstPara(){
	if(currentPageObject.contentA != "" && currentPageObject.contentA != undefined){
		var $div = $('<div />').appendTo('body');
		$div.attr('id', 'firstPara');
		//$('#firstPara').html(currentPageObject.contentA);
		$('#firstPara').html('<div class="panel panel-info">'
		+ '<div class="panel-heading"><span class="glyphicon glyphicon-info-sign">'
		+ '</span> Course Content (this is searcheable from the Training home screen)</div><div class="panel-body searchContent">' 
		+ currentPageObject.contentA 
		+ '</div></div>');
	}	
}
createFirstPara();

//create the header below the nav bar on each page
//the header is currently taken from the currentPageObject's title - which is the same title used in the metadata
function createH1(){
	var $heading = $('<h1/>').insertAfter('nav');
	$heading.attr('id', 'heading');	
	//training home - the 'index' page doesn't have a title - detect this and display appropriately
	if (currentPageObject.title != null){
		$('#heading').html('<br>' + currentPageObject.title);
	}else{
		$('#heading').html('<br>' + 'Training Home');
	}	
}
createH1();

//just a little helper to highlight the login username and password in the information
//to make it a little easier to read quickly amongst all the info
function PASLoginHighlight(){
	$( "li:contains('PAS Username')" ).css( "color", "blue" );
	$( "li:contains('PAS Username')" ).next().css( "color", "blue" );
	
}
PASLoginHighlight();

//set the elements of the page you want to hide by default as hidden
function autoHideDetails(){
	$( "tr:contains('Student Number')" ).hide();
		$( "tr:contains('Explain')" ).hide();
		$( "tr:contains('Open the')" ).hide();
		$( "tr:contains('Student completion')" ).hide();
		$( "tr:contains('Update details')" ).hide();
		$( "tr:contains('Have ready for ')" ).hide();
		$( "#extraInfo" ).toggle().css("backgroundColor", "#FFFFE0");
}

autoHideDetails();













