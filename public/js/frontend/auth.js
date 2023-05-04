$("#loading").hide();
function validationMessage(field,error,component){
    $(`#${field}`).addClass("validations");
    if(error.param ===  field){
        $(`.${component}-invalid-msg`).addClass("mt-2")
        $(`.${component}-invalid-msg`).html(`<span class='text-danger'>${error.msg}</span>`).insertAfter(`#${field}`)
    }
}
///login feature
$(".login-btn").click(async function(e){
    e.preventDefault();
    $(".login-text").hide();
    $("#loading").show();
    let phone = $("#phone").val();
    let password = $("#password").val();
    let formData = new FormData();
    formData.append("phone",phone);
    formData.append("password",password);
    let res = await fetch("/login",{
       method:"POST",
       body:formData
   })
   let data =await res.json();
   $("#loading").hide();
   $(".login-text").show();
   if(data.status === "invalid"){
        let error = data.data.error;
        if(data.data.validationsErrors.find((v)=>v.param === "phone")){
           validationMessage("phone",error,"login");
        }
        if(data.data.validationsErrors.find((v)=>v.param === "password")){
            validationMessage("password",error,"login")
        }
   }
   if(data.status === "fail"){
       $('#userlogin').modal('hide');
       Swal.fire({
           icon: 'error',
           title: 'Oops...',
           text: data.message
       })
   }

   if(data.status === "success"){
       $("#userlogin").modal("hide");
       $(".login").hide();
       $(".register").hide();
       $(".bar-nyar").html(`
           <div class="dropdown nav-item ml-xl-3">
           <button class="btn btn-light  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               <img src="/${data.user.image}" alt="<%= ${data.user.name} %>" class="user_image">  ${data.user.name}
           </button>
           <div class="dropdown-menu" aria-labelledby="dropdownMenuButton ">
           <a href="/admin/profile" class="dropdown-item d-flex justify-content-between align-items-center" style="cursor: pointer;">
               Profile
               <i class="fa-solid fa-angle-right"></i>
           </a>
           
           <div class="dropdown-divider"></div>
           <div class="dropdown-item d-flex justify-content-between align-items-center" style="cursor: pointer;">
                <button class="btn btn-white logout-btn p-0">
                    Logout
                </button>
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
           </div>
           
           </div> 
       </div>
       `)
       $(".bar-nyar .nav-item .logout-btn").click(logout);
       Swal.fire({
           icon: 'success',
           title: data.message,
           showConfirmButton: false,
           timer: 2500
       })
   }
})
//logout feature
$(".bar-nyar .nav-item .logout-btn").click(logout);
    async function logout(e){
        e.preventDefault();
        let res = await fetch("/logout",{
                method:"POST"
        });
        let data = await res.json();
     
        if(data.status==="success"){
            $(".bar-nyar").html(`
            <li class="nav-item login" style="display:inline-block;">
                 <a class="nav-link <%= currentRoute == '/login' && 'text-primary'%>" href="#" data-toggle="modal" data-target="#userlogin">Login</a>
             </li>
            <li class="nav-item register" style="display:inline-block;">
                <a class="nav-link <%= currentRoute == '/register' && 'text-primary'%>" href="/register" data-toggle="modal" data-target="#userregister">Register</a>
            </li>
            `)
            Swal.fire({
                icon: 'success',
                title: data.message,
                showConfirmButton: false,
                timer: 2500
            })
        }
}
$(".register-btn").click(async function(e){
    e.preventDefault();
    let name = $("#name").val();
    let email = $("#email").val();
    let phone = $("#rphone").val();
    let password = $("#rpassword").val();
    let confirmPassword = $("#confirmPassword").val();

    let formData = new FormData();
    formData.append("name",name);
    formData.append("email",email);
    formData.append("phone",phone);
    formData.append("password",password);
    formData.append("confirmPassword",confirmPassword);
    formData.append("userimage",$("#userimage").prop('files')[0])
    let res= await fetch("/register",{
        method:"POST",
        body:formData,
        enctype:'multipart/form-data',
        headers:{
            contentType:false,
        }
    })
    let data = await res.json();
    if(data.status === "invalid"){
        let error = data.data.error;
        if(data.data.validationsErrors.find((v)=>v.param === "name")){
            validationMessage("name",error,"register");
         }
         if(data.data.validationsErrors.find((v)=>v.param === "email")){
             validationMessage("email",error,"register")
         }
         if(data.data.validationsErrors.find((v)=>v.param === "phone")){
            validationMessage("rphone",error,"register")
        }
        if(data.data.validationsErrors.find((v)=>v.param === "password")){
            validationMessage("rpassword",error,"register")
        }
        if(data.data.validationsErrors.find((v)=>v.param === "password")){
            validationMessage("confirmPassword",error,"register")
        }
   }
    if(data.status === "success"){
        $("#userregister").modal("hide");
        $(".login").hide();
        $(".register").hide();
        $(".bar-nyar").html(`
            <div class="dropdown nav-item ml-xl-3">
            <button class="btn btn-light  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src="/${data.user.image}" alt="<%= ${data.user.name} %>" class="user_image">  ${data.user.name}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton ">
            <a href="/admin/profile" class="dropdown-item d-flex justify-content-between align-items-center" style="cursor: pointer;">
                Profile
                <i class="fa-solid fa-angle-right"></i>
            </a>
            
            <div class="dropdown-divider"></div>
            <div class="dropdown-item d-flex justify-content-between align-items-center" style="cursor: pointer;">
                 <button class="btn btn-white logout-btn p-0">
                     Logout
                 </button>
                 <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </div>
            
            </div> 
        </div>
        `)
        $(".bar-nyar .nav-item .logout-btn").click(logout);
        Swal.fire({
            icon: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 2500
        })
    }
    if(data.status === "fail"){
        $('#userregister').modal('hide');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.message
        })
    }

})