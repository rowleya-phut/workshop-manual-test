$( '#addedNote' ).on('click','.delete',function() {
    console.log( "ready to delete notes!" );
	
	/////////////////delete record from ReadNotes.php data ajax call//////////////////////////
    
    //var db = $('#deleteRecordBtn');
    
    //PROBLEM - JQUERY CANNOT FIND THE DYNAMICALLY CREATED DELETE BUTTONS ON EACH NOTE RECORD
    //see answers
    //https://stackoverflow.com/questions/203198/event-binding-on-dynamically-created-elements?noredirect=1&lq=1
    //PROBLEM - CASCADE DELETE ISSUE WITH CONFIRMATION TABLE
    //PROBLEM - ALSO AN ISSUE IF THERE ARE COMMENTS! -- fixed -> allow cascade delete on comments_tbl.notesID
    //HOWEVER will this mean that deleting a comment deletes the note?
    //console.log($(this).attr('data-delete'));

    var recordToDelete = $(this).attr('data-delete');

    $.ajax({
        method: "POST", 
        url: "php/DeleteNotes.php",
        data: {recordId: recordToDelete },
    })
    .done(function(result){		
      //PROBLEM COULD NOT FIRE OFF THE PHP QUERY AT ALL or nothing happens when php is run
      //JL helped me get the PHP to work by loading the page directly in the browser
        console.log(result);//this is the echo from the PHP - part a of solution
        //it didn't work because of the data had come from a form before and i hadn't needed to specify
        //the key value pair in the data field of the ajax query!
        location.reload(); // then reload the page.(3)
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log("Read Error: " + errorThrown);
    });

    ///////////////////////////////////////////////////////////
	
	
});