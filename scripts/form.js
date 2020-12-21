//I DONT THIN FORM.JS DOES ANYTHING...

if (typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
	console.log("Local storage running....")
	
	
} else {
    // Sorry! No Web Storage support..
	console.log("There is no local storage!")
}

//form handler
$('#wshopform').submit(function(event){
 	var firstName = $('#firstname').val();
	localStorage.firstName = firstName;
	var lastName = $('#lastname').val();
	localStorage.lastName = lastName;
	var gender = $("form input[type='radio']:checked").val();
	localStorage.gender = gender;
	//event.preventDefault(); 
	localStorage.displayName = firstName + " " + lastName;
	//console.log(firstName + " " + lastName + " " + gender)
	
	if(firstName == "PMI0"){
		localStorage.searchPage = firstName;
		console.log(localStorage.searchPage);
		event.preventDefault()
		window.location.replace("PMI0.html");
		//window.location.replace("file://nasphthomes/rowleya/!UV/Desktop/week%2001%20080118/HTML/workshopManual/PMI0.html");
		//event.preventDefault();
	}

});	

$('#searchForm').submit(function(event){
	localStorage.searchPage = $('#searchPage').val();
	event.preventDefault()
	window.location.href = localStorage.searchPage + ".html";
	//window.location.replace(".html");
});

//search terms form handler
//doesn't include all objects - only PAS object!
// $('#searchTermsForm').submit(function(event){
// 	//alert("Searching...");
// 	$('#searchResults').empty();
// 	localStorage.searchTerm1 = $('#searchTerm1').val();
// 	event.preventDefault()
	
// 	 for (var key in PASObject) {
// 		var content = PASObject[key].contentA
// 		if(content != undefined && content != ""){

// 			var contentRegExp = new RegExp(localStorage.searchTerm1, 'i');
// 			//console.log(contentRegExp.test(content));
// 			if(contentRegExp.test(content)){
// 				console.log(PASObject[key].page);
				
// 				$('#searchResults').append('<a href='+PASObject[key].page+'>'+PASObject[key].page+'</a> <br> <h5>Course Objectives</h5> '+content+' <br><br>')
// 			} 
			
// 		}
// 	} 	
// });

