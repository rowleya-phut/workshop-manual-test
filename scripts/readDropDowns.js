$( document ).ready(function() {
    console.log( "ready!" );
    /////////////////trainers dropdown ajax call//////////////////////////
    $.ajax({method: "POST", url: "php/readTrainers.php"})
    .done(function(returnedData){
      var result = $.parseJSON(returnedData);
        var string = "";
        $.each(result, function(index, value){
            //build an option element string for each object in the returned JSON
            string += "<option value='"+value['TrainerId']+"'>" + value['TrainerName'] + "</option>";
            //console.log("FROM TRAINER TABLE" + string)
        });
        //attach the built string to the element on the html      
        $(string).appendTo('#trainerDropDown');
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log("Read Error: " + errorThrown);
    });

    ///////////////////////////////////////////////////////////

    /////////////////page dropdown ajax call//////////////////////////
    $.ajax({method: "POST", url: "php/readPages.php"})
    .done(function(returnedData){
      var result = $.parseJSON(returnedData);
        var string = "";
        $.each(result, function(index, value){
            //build an option element string for each object in the returned JSON
            string += "<option value='"+value['PageId']+"'>" + value['PageTitle'] + "</option>";
            //console.log("FROM TRAINER TABLE" + string)
        });
        //attach the built string to the element on the html      
        $(string).appendTo('#pageDropDown');
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log("Read Error: " + errorThrown);
    });

    ///////////////////////////////////////////////////////////

});