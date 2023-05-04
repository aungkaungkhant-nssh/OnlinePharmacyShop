
if($("#modalCondition")[0].value === "true" ){
    $('#userregister').modal('show');
}

let sweetAlertMessage = $("#sweetAlert")[0].value;
if(sweetAlertMessage){
    Swal.fire({
        icon: 'success',
        title: sweetAlertMessage,
        showConfirmButton: false,
        timer: 2500
    })
}
let errorMessage = $("#errorMessage")[0].value;
  if(errorMessage){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
    })
   
}
// $(".login-btn").click(function(){
//     $('#userregister').modal('hide');
// })
// $(".swal2-confirm").click(function(){
//     window.location.href = window.location.origin;
// })
// $(".swal2-backdrop-show").click(function(){
//     window.location.href = window.location.origin;
// })
// $(".modal .close").click(function(){
//     window.location.href = window.location.origin;
// })
// let hasError = $("#hasError")[0].value;
// $("#userregister").on("click",function(){
//      if(hasError == "true"){
//            window.location.href = window.location.origin;
//      }
// })
// $("#userlogin").on("click",function(){
//     if(hasError == "true"){
//         window.location.href = window.location.origin;
//     }
// })



// console.log($(".navbar-nav").html("<h1>h2ll</h1>"))

