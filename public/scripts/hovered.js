$(document).ready(function() {

  $("#allTweets").on("mouseenter", ".tweets", function() {
    $(this).addClass("hovered");
  })

  $("#allTweets").on("mouseleave", ".tweets", function() {
    $(this).removeClass("hovered");
  })
})