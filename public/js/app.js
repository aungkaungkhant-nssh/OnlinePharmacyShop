$(".show-sidebar").click(function(){
    $(".sidebar").animate({marginLeft:"0px"});
})
$(".hide-sidebar").click(function(){
    $(".sidebar").animate({marginLeft:"-500px"});
})
$(document).ready(function () {
    $('#example').DataTable();
});

let sweetAlertMessage = $("#sweetAlert")[0].value;
let errorMessage = $("#errorMessage")[0].value;
  if(errorMessage){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
        footer: '<a href="/admin/login">Try Agaiin</a>'
      })
}
if(sweetAlertMessage){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
    icon: 'success',
    title: sweetAlertMessage
    })
}


