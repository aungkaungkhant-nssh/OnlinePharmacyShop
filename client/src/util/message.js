import Swal from 'sweetalert2'

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-primary',
  },
  buttonsStyling: false
})
 
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



export const errorMessage = (msg)=>{
 Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: msg,
    footer: '<a href="">Why do I have this issue?</a>'
  })
}
export const successMessage = (msg)=>{
  Toast.fire({
  icon: 'success',
  title:msg
})
}
export const warningMessage = (msg)=>{
    swalWithBootstrapButtons.fire({
      title: 'No More',
      text:msg,
      icon: 'warning',
      confirmButtonText: 'Back',
      reverseButtons: true
    })
}