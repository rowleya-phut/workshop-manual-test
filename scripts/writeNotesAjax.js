$( document ).ready(function() {
    console.log( "ready to write notes!" );

    //append the trainer - which is localstorage.userId to form 
    //because the dropdown for selecting the user on the form is now gone
    var addedNoteTrainerId = $("<input>")
    .attr("type", "hidden")
    .attr("name", "addedNoteTrainerId").val(localStorage.userId);
    $('#addNotesForm').append(addedNoteTrainerId);

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
    

    var addedNoteTrainerId = $("<input>")
    .attr("type", "hidden")
    .attr("name", "addedNotePageId").val(mutatePageId(document.title));
    $('#addNotesForm').append(addedNoteTrainerId);
    console.log( $('#addNotesForm'));
	
	$("#addNotesForm").submit(function(e) {
            e.preventDefault(); // avoid to execute the actual submit of the form.
       
            //disable radio buttons if none-of-above is selected

            var form = $(this);
			//console.log(form);
            var url = "PHP/WriteNotes.php";


            //isFormValid = $("#addNotesForm").valid();  

			isFormValid = true; //FOR TESTING
			
            if(isFormValid == true){

                $.ajax({
                    type: "POST",
                    url: url,
                    data: form.serialize(), // serializes the form's elements.
                    datatype: 'json',
                    })
                    .done(function (data) { 
                        console.log('Submission successful');
                        console.log(data);
						location.reload(); // then reload the page.(3)
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        console.log("Error" + errorThrown);
                    });
                
            } else {
                console.log("Objectives not answered");
            };
           
        });
	
	
});