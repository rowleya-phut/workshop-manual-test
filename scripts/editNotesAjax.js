$( '#addedNote' ).on('click','.edit',function() {
    console.log( "ready to edit notes!" );
	
	/////////////////update record from ReadNotes.php data ajax call//////////////////////////
    

    var recordToEdit = $(this).attr('data-edit');
    var updatedTextArea = $('*[data-edittext="'+ recordToEdit +'"]');
    
    console.log(updatedTextArea.val());
    
    var updatedText = updatedTextArea.val(); //I was doing .text() and that got the old information!!!
    //var updatedText = "bad mans";

    $.ajax({
        method: "POST", 
        url: "/workshopManualBasic/php/editNotes.php",
        data: {recordId: recordToEdit, updatedTxt: updatedText },
    })
    .done(function(result){		
        console.log(result);//this is the echo from the PHP - part a of solution
        location.reload(); // then reload the page.(3)

    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log("Read Error: " + errorThrown);
    });

    ///////////////////////////////////////////////////////////
	
	
});