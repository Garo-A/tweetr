// $(document).ready(function(){

//   $(".new-tweet form").on("submit", function(event) {
//     event.preventDefault();

//     let input = ($("textarea").val());

//     if ((input === null) || (input === "")){
//       alert("Cannot submit empty tweet!")
//       return;
//     }

//     if (input.length > 140) {
//       alert("Tweet too long!")
//       return;
//     }

//     $.ajax({
//       url:"/tweets",
//       type: "POST",
//       data: $(this).serialize()
//     })

//     $.ajax({
//       url:"/tweets",
//       type: "GET"
//     })

//   })
// })