$( document ).ready(function() {
	console.log( "ready to read notes!" );
	
	//convert note id into something readable by a human
    function convertUnix(unixTime){
        var string = "";
        var dateCompleted = new Date(unixTime*1000);
        var minute = dateCompleted.getMinutes();
        var hour = dateCompleted.getHours();
        
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        var day = weekday[dateCompleted.getDay()];
        var date = dateCompleted.getDate();
        
        var monthNames = new Array(12)
        monthNames[0] = "Jan";
        monthNames[1] = "Feb";
        monthNames[2] = "Mar";
        monthNames[3] = "Apr";
        monthNames[4] = "May";
        monthNames[5] = "June";
        monthNames[6] = "July";
        monthNames[7] = "Aug";
        monthNames[8] = "Sept";
        monthNames[9] = "Oct";
        monthNames[10] = "Nov";
        monthNames[11] = "Dec";
        var month = monthNames[dateCompleted.getMonth()];

        var year = dateCompleted.getFullYear();
		string += day + " "+ date + " " + month + "  " + year;
		//string += day + " "+ date + " " + month + "  " + year + ": " + hour + ":" + minute;
        return string;
    }


	
	/////////////////read  notes from ReadNotes.php data ajax call//////////////////////////
    //
    $.ajax({method: "POST", url: "/workshopManualBasic/PHP/ReadNotes.php", })
    .done(function(returnedData){
		//console.log(returnedData);
		
		var result = $.parseJSON(returnedData);
        //TODO - PROBLEMS - ALL USER DATA IS BEING RETURNED - FIXED
        console.log(result);

        //append the pageId as this use to be in the dropdown form but is no longer
        //pageIds are now all UPPER CASE - no spaces or hyphens and 11 chars long max
        function mutatePageId(pageId){
            var pageIdMutated = (document.title).toUpperCase();
            pageIdMutated = pageIdMutated.replace(/-/g,'');
            pageIdMutated = pageIdMutated.replace(/ /g,'');
            pageIdMutated = pageIdMutated.replace(/\//g,'');
            if(pageIdMutated.length >= 11){
                pageIdMutated = pageIdMutated.substring(0, 11);
            }
            //console.log("page title is now: "+ pageIdMutated);
            return pageIdMutated;
        }
		
		$.each(result, function(i, item) {

            //only add note if the note is for this page
            if(item.PageId === mutatePageId(document.title) || item.PageTitle === mutatePageId(document.title)){
                //console.log("ITS THE SAME!!!");
                // console.log(convertUnix(item.NotesId));
                var htmlNoteDiv = "<div class='panel panel-warning'>";
                htmlNoteDiv += "<div class='panel-heading'><span class='glyphicon glyphicon-info-sign'></span> Trainer note</div>";
                htmlNoteDiv += "<div class='panel-body'>";
                // htmlNoteDiv += item.NotesId + "; ";
                htmlNoteDiv += "Note created on: " + convertUnix(item.NotesId) + "; ";
                // htmlNoteDiv += item.TrainerId + "; ";
                htmlNoteDiv += "Note creator: " + item.TrainerName;
                // htmlNoteDiv += item.PageId + "; ";
                htmlNoteDiv +="<br><textArea class=form-control data-editText="+ item.NotesId +">";
                htmlNoteDiv += item.NoteText + " ";
                htmlNoteDiv +="</textArea>";
                //This needs to come from a separate query on a separate JS file
                // if(item.Comment){
                //     htmlNoteDiv +="<br><textArea class=form-control data-editText="+ item.NotesId +">";
                //     htmlNoteDiv += item.Comment + " ";
                //     htmlNoteDiv +="</textArea>";
                // }
                htmlNoteDiv += "</div>";
                
                if(localStorage.userId == item.TrainerId){
                    htmlNoteDiv += "<button data-edit="+ item.NotesId +" class='btn btn-warning edit'>Edit</button>";
                    htmlNoteDiv += "<button data-delete="+ item.NotesId +" class='btn btn-danger delete'>Delete</button>";
                }
                // htmlNoteDiv += "<button data-comment="+ item.NotesId +" class='btn btn-info comment'>Add Comment</button>";
                // htmlNoteDiv += "<button data-confirm="+ item.NotesId +" class='btn btn-success confirm'>Confim</button>";
                
                htmlNoteDiv += "</div>";
            }
			
			
		$('#addedNote').append(htmlNoteDiv);
		});
		
		console.log("Done!");
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log("Read Error: " + errorThrown);
    });

    ///////////////////////////////////////////////////////////
	
	
});