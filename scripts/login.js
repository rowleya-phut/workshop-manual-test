$( document ).ready(function() {
	//console.log( "login ready!" );

    var currentUser = "";
    
    //login
    $("#login_submit").click(function(){
        


        var username = $('#txt_uname').val().trim();
        var password = $('#txt_pwd').val().trim();
        // console.log(username);
        // console.log(password);

        if( username != "" && password != "" ){
            
            $.ajax({
                url:'php/checkUser.php',
                type:'post',
                dataType: 'json',
                data:{username:username,password:password},
                success:function(response){
                    var msg = "";
                    console.log("the response is : " + response);
                    if(response == 0){
                        //window.location = "home.php";
                        msg = "Invalid username and password!";
                        
                    }else{
                        currentUser = response;
                        currentUserName = currentUser[0];
                        currentUserId = currentUser[1];
                        console.log(currentUserName);
                        
                        localStorage.setItem("username", currentUserName);
                        localStorage.setItem("userId", currentUserId);
                        window.location.href = window.location.href;
                        //location.reload();
                    }
                    $("#message").css('color', 'red');
                    $("#message").html(msg);
                    //alert('hello');
                }
            });
        } else{
            var msg = "Please enter a username and password";
            $("#message").css('color', 'red');
            $("#message").html(msg);
        }
    });

    //logout
    $("#logout_submit").click(function(){
        localStorage.clear();
        window.location.href = window.location.href;
        //location.reload();
        //alert('goodbye');
    });
    
    	
});