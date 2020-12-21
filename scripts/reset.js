$(document).ready(function(){

    //form handler
    $('#resetUserForm').submit(function(event){
        event.preventDefault()
    // Get all the forms elements and their values in one step
        var values = $(this).serializeArray();
        // console.log('THE VALUES ARE ' + values[0].value + ' '+ values[1].value + ' '+ values[2].value)
        var userName = values[0].value;
        var oldPassword = values[1].value;
        var newPassword = values[2].value;
        var confirmPassword = values[3].value;
        var newUserNameMsg = "";
        var newPasswordMsg = "";
        
        if(newPassword != confirmPassword){
            newPasswordMsg = "Passwords do not match";
            $("#newPasswordResetMsg").css('color', 'red');
            $("#newPasswordResetMsg").html(newPasswordMsg);
        } 
        else if( userName != "" && oldPassword != "" ){
            $.ajax({
                url:'php/reset.php',
                type:'post',
                dataType: 'json',
                data:{username:userName,password:oldPassword,newPassword:newPassword},
                success:function(response){
                    newUserNameMsg = "";
                    console.log("the response is : " + response);
                    if(response == 0){ 
                        newUserNameMsg = "User name or password incorrect";
                        console.log("RESPONSE IS 0");
                        $("#resetPassword").css('color', 'red');
                        $("#resetPassword").html(newUserNameMsg);
                        
                    }
                    else{ 
                        alert("Your password has been reset!");
                        currentUser = response;
                        currentUserName = currentUser[0];
                        currentUserId = currentUser[1];
                        console.log('NEW PASSWORD HAS BEEN CREATED FOR: ' + currentUserName + " " + currentUserId);
                        
                        localStorage.setItem("username", currentUserName);
                        localStorage.setItem("userId", currentUserId);
                        window.location.href = "/workshopManualBasic/index.html";
                        //location.reload();
                    }

                    //alert('hello');
                }
            });
        } else{
            var msg = "Please enter a username and password";
            $("#resetPassword").css('color', 'red');
            $("#resetPassword").html(msg);
        }

    });


});