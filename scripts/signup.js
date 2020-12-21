$(document).ready(function(){

    //form handler
    $('#newUserForm').submit(function(event){
        event.preventDefault()
    // Get all the forms elements and their values in one step
        var values = $(this).serializeArray();
        var newFullName = values[0].value;
        //console.log(newFullName);
        var newUserName = values[1].value;
        var newPassword = values[2].value;
        var confirmPassword = values[3].value;
        var newUserNameMsg = "";
        var newPasswordMsg = "";
        if(newPassword != confirmPassword){
            newPasswordMsg = "Passwords do not match";
            $("#newPasswordMsg").css('color', 'red');
            $("#newPasswordMsg").html(newPasswordMsg);
        } 
        else if( newFullName!= "" && newUserName != "" && newPassword != "" ){
            $.ajax({
                url:'php/signUp.php',
                type:'post',
                dataType: 'json',
                data:{fullname:newFullName,username:newUserName,password:newPassword},
                success:function(response){
                    newUserNameMsg = "";
                    console.log("the response is : " + response);
                    if(response == 0){ //if user not already existing on the db
                        newUserNameMsg = "User already exists.";
                        console.log("RESPONSE IS 0");
                        $("#newUserNameMsg").css('color', 'red');
                        $("#newUserNameMsg").html(newUserNameMsg);
                        
                    }
                    else{ //if user does all already exist on the db
                        //window.location = "home.php";

                        currentUser = response;
                        currentUserName = currentUser[0];
                        currentUserId = currentUser[1];
                        console.log('A NEW USER HAS BEEN CREATED: ' + currentUserName + " " + currentUserId);
                        
                        localStorage.setItem("username", currentUserName);
                        localStorage.setItem("userId", currentUserId);
                        window.location.href = "/workshopManualBasic/index.html";
                        //location.reload();
                    }

                    //alert('hello');
                }
            });
        } else{
            var msg = "Please enter a full name, username and password";
            $("#newUserNameMsg").css('color', 'red');
            $("#newUserNameMsg").html(msg);
        }

    });


});