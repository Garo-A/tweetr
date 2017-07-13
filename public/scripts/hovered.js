//Responsible for adding hovered class to element that is moused over.
$(document).ready(function() {

  $("#allTweets").on("mouseenter", ".tweets", function() {
    $(this).addClass("hovered");
  })

  $("#allTweets").on("mouseleave", ".tweets", function() {
    $(this).removeClass("hovered");
  })
})