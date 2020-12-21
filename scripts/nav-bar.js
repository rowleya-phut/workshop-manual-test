/* function testNav(){
	console.log("nav_bar.js is running");
} */

function createNavBar(){
	
	//console.log("navbar: "+PASObject);
	
	var navBar = "";
	navBar += "<div class='container-fluid'>";
	navBar += "<div class='navbar-header'>"
	navBar +="<button type='button' class='navbar-toggle' data-toggle='collapse' data-target='#myNavbar'>";
	navBar +="<span class='icon-bar'></span>";
	navBar +="<span class='icon-bar'></span>";
	navBar +="<span class='icon-bar'></span>";
	navBar +="</button>";
	navBar +="<a class='navbar-brand' href='index.html'>Training</a>";
	navBar +="</div>";
	navBar +="<div class='collapse navbar-collapse' id='myNavbar'>";
	navBar +="<ul class='nav navbar-nav'>";
	//navBar +="<li class='active'><a href='index.html'>Home</a></li>";
	
	
	
	/////////PAS dropdown/////////
	navBar +="<li class='dropdown'>";
	navBar += "<a class='dropdown-toggle' data-toggle='dropdown' href='#'>PAS<span class='caret'></span></a>";
	navBar += "<ul class='dropdown-menu'>";

	for (var key in PASObject) {
		navBar += "<li";
		navBar += " id='";
		navBar += PASObject[key].title;
		navBar += "'> ";
		navBar += "<a href='";
		navBar += PASObject[key].page;
		navBar += "'>";
		navBar += PASObject[key].title;
		navBar += "</a>"
		navBar += "</li>";
	}
	
	navBar +="</ul>";
	navBar +="</li>";
	
	/////////Clinical dropdown/////////
	navBar +="<li class='dropdown'>";
	navBar += "<a class='dropdown-toggle' data-toggle='dropdown' href='#'>Clinical<span class='caret'></span></a>";
	navBar += "<ul class='dropdown-menu'>";

	for (var key in ClinicalObject) {
		navBar += "<li";
		navBar += " id='";
		navBar += ClinicalObject[key].title;
		navBar += "'> ";
		navBar += "<a href='";
		navBar += ClinicalObject[key].page;
		navBar += "'>";
		navBar += ClinicalObject[key].title;
		navBar += "</a>"
		navBar += "</li>";
	}
	
	navBar +="</ul>";
	navBar +="</li>";
	
	/////////Desktop dropdown/////////
	navBar +="<li class='dropdown'>";
	navBar += "<a class='dropdown-toggle' data-toggle='dropdown' href='#'>Desktop<span class='caret'></span></a>";
	navBar += "<ul class='dropdown-menu'>";

	for (var key in DesktopObject) {
		navBar += "<li";
		navBar += " id='";
		navBar += DesktopObject[key].title;
		navBar += "'> ";
		navBar += "<a href='";
		navBar += DesktopObject[key].page;
		navBar += "'>";
		navBar += DesktopObject[key].title;
		navBar += "</a>"
		navBar += "</li>";
	}
	
	navBar +="</ul>";
	navBar +="</li>";
	
	

	/////////Misc dropdown/////////
	navBar +="<li class='dropdown'>";
	navBar += "<a class='dropdown-toggle' data-toggle='dropdown' href='#'>Misc<span class='caret'></span></a>";
	navBar += "<ul class='dropdown-menu'>";

	for (var key in MiscObject) {
		navBar += "<li";
		navBar += " id='";
		navBar += MiscObject[key].title;
		navBar += "'> ";
		navBar += "<a href='";
		navBar += MiscObject[key].page;
		navBar += "'>";
		navBar += MiscObject[key].title;
		navBar += "</a>"
		navBar += "</li>";
	}
	
	navBar +="</ul>";
	navBar +="</li>";
	
	/////////PatientCentre dropdown////////////
	navBar +="<li class='dropdown'>";
	navBar += "<a class='dropdown-toggle' data-toggle='dropdown' href='#'>PatientCentre<span class='caret'></span></a>";
	navBar += "<ul class='dropdown-menu'>";

	for (var key in PatientCentreObject) {
		navBar += "<li";
		navBar += " id='";
		navBar += PatientCentreObject[key].title;
		navBar += "'> ";
		navBar += "<a href='";
		navBar += PatientCentreObject[key].page;
		navBar += "'>";
		navBar += PatientCentreObject[key].title;
		navBar += "</a>"
		navBar += "</li>";
	}
	
	navBar +="</ul>";
	navBar +="</li>";
	
	
	/////////////Teaching Notes dropdown////////////////////////
	navBar +="<li class='dropdown'>";
	navBar += "<a class='dropdown-toggle' data-toggle='dropdown' href='#'>Teaching Notes<span class='caret'></span></a>";
	navBar += "<ul class='dropdown-menu'>";

	for (var key in TeachingObject) {
		navBar += "<li";
		navBar += " id='";
		navBar += TeachingObject[key].title;
		navBar += "'> ";
		navBar += "<a href='";
		navBar += TeachingObject[key].page;
		navBar += "'>";
		navBar += TeachingObject[key].title;
		navBar += "</a>"
		navBar += "</li>";
	}
	
	navBar +="</ul>";
	navBar +="</li>";
	navBar +="</ul>";
	
	
	/////////////////////////////////////
	
	
	//removed to add sign in section
	// navBar +="</ul>";
	// navBar +="<ul class='nav navbar-nav navbar-right'>";
	// navBar +="<div id='searchFormDiv'><form id='searchForm' action='index.html' class='form-group'><input type='text' name='searchPage' id='searchPage' class='form-control'></form></div>"
	// navBar +="</ul>";
	//navBar +="</div>";



	//sign in

	navBar +="<ul class='nav navbar-nav navbar-right'>";
	//TODO fix the css - make the same as id searchFormDiv
	navBar += "<div id='message'></div>";
	navBar +="<div id='div_login' class='form-group flex-container'>";


	//console.log("LOCAL STORAGE IS STORING " + localStorage.userId);
	if(localStorage.getItem("userId") === null){
		navBar +="<div>";
		navBar +="<input type='text' class='textbox form-control' id='txt_uname' name='txt_uname' placeholder='Username' />";
		navBar +="</div>";
		navBar +="<div>";
		navBar +="<input type='password' class='textbox form-control' id='txt_pwd' name='txt_pwd' placeholder='Password'/>";
		navBar +="</div>";
		navBar +="<div>";
		navBar +="<input class='btn btn-warning' type='button' value='Log in' name='login_submit' id='login_submit' />";
		navBar +="</div>";
		navBar +="<div>";
		navBar +="<input class='btn btn-info' type='button' value='Sign Up' name='signup_submit' id='signup_submit' />";
	} else{
		navBar +="<div>";
		navBar +="<button class='btn btn-warning disabled'>Hi " + localStorage.username +"</button>";
		navBar +="</div>";
		navBar +="<input class='btn btn-danger' type='button' value='Log out' name='logout_submit' id='logout_submit' />";

	}
	
	navBar +="</div>";

	navBar +="</div>";
	navBar +="</ul>";
	navBar +="</div>";

	$('nav').html(navBar);
}

createNavBar();

$('#searchForm').submit(function(event){
	localStorage.searchPage = $('#searchPage').val();
	event.preventDefault()
	window.location.href = localStorage.searchPage + ".html";
	//window.location.replace(".html");
});

//navigate to signup.html
$('#signup_submit').on('click', function(){
	window.location.href = 'signup.html';
});



	

