
$(".profile-image div").hover(function(){
    $(".change-profile-icon").css("display","block")
},function(){
    $(".change-profile-icon").css("display","none")
})

$("#change-input").change(function(){
    $(".update-profile").submit();
})