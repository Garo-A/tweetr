//Responsible for toggling compose button on top right corner, as well adding hovered class.
 $(document).ready(function(){

  $("#nav-bar").on("click", ".compose-btn", function(){
      $(".new-tweet").toggle("slow");
      $("textarea").focus();
  })

  $("#nav-bar").on("mouseenter", ".compose-btn", function(){
    $(this).addClass("hoveredOn");
  })

  $("#nav-bar").on("mouseleave", ".compose-btn", function(){
    $(this).removeClass("hoveredOn");
  })

})