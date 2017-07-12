$(document).ready(function () {

  $(".new-tweet textarea").on("keyup", function (){
    let textLength = $(this).val().length;
    let newTweet = $(this).closest(".new-tweet");
    newTweet.find(".counter").text(140 - textLength);
    if ((140 - textLength) < 0) {
      newTweet.find("span").addClass("negative");
    }
    if ((140 - textLength >= 0)) {
      newTweet.find('span').removeClass("negative");
    }
  })
})