$(document).ready(function() {

// Creates HTML template for individual tweets and appends correct data to each.
  function createTweetElement(data) {

    let element = $('<article></article>').addClass("tweets"); //THIS IS WHATS GOING TO BE RETURNED
    let content = $('<div></div>').addClass("content");
    let header = $('<header></header>');
    let footer = $('<footer></footer');

    //Configuring Header
    $("<img>").attr("src", data.user.avatars.small).appendTo(header);
    $("<span></span>").addClass("user").text(data.user.name).appendTo(header);
    $("<span></span>").addClass("handle").text(data.user.handle).appendTo(header);

    //Configuring Footer
    $(footer).text(time(data.created_at));
    $("<i></i>").addClass("fa fa-heart").attr("aria-hidden", "true").appendTo(footer);
    $("<i></i>").addClass("fa fa-retweet").attr("aria-hidden","true").appendTo(footer);
    $("<i></i>").addClass("fa fa-flag").attr("aria-hidden", "true").appendTo(footer);

    //Configuring Tweet Content
    $(content.text(data.content.text));

    //Constructing the element by bringing everything together.
    $(header).appendTo(element);
    $(content).appendTo(element);
    $(footer).appendTo(element);

    return element;
  }

//Used to calcualte timestamp. Could not import "moment" so created my own function do to it.
  function time(msec) {

    let now = (new Date()).getTime();
    let diff = now - msec;

    let seconds = Math.floor(diff/1000);
    if (seconds < 60){
      return (`Posted ${seconds} seconds ago.`)
    }

    let minutes = Math.floor(seconds/60);
    if (minutes < 60){
      return (`Posted ${minutes} minutes ago.`)
    }

    let hours = Math.floor(minutes/60);
    if (hours < 24) {
      return (`Posted ${hours} hours ago.`)
    }

    let days = Math.floor(hours/24);
    if (days < 365) {
      return (`Poster ${days} days ago.`)
    }

    let months = Math.floor(days/30);
    if (months < 12) {
      return (`Posted ${months} months ago`)
    }

    let years = Math.floor(months/12);
      return (`Posted ${years} years ago`)
  }

  function renderTweets(data) {
    for(let i = (data.length)-1 ; i >= 0; i--){
        $("#allTweets").append(createTweetElement(data[i]));
    }
  }

//Sends AJAX requrest to load tweets.
  function loadTweets() {
    $.ajax({
      url:"/tweets",
      type: "GET",
      success: function(data) {
        renderTweets(data);
      }
    })
  }


  loadTweets();


// Responsible for submitting new tweet. Will also verify that input is not empty or too long.
  $(".new-tweet form").on("submit", function(event) {
    event.preventDefault();

    let input = ($("textarea").val());

    if ((input === null) || (input === "")){
      alert("Cannot submit empty tweet!")
      return;
    }

    if (input.length > 140) {
      alert("Tweet too long!")
      return;
    }

    $.ajax({
      url:"/tweets",
      type: "POST",
      data: $(this).serialize(),
      success: function() {
        $("#allTweets").empty();
        $("textarea").val("");
        $(".counter").text("140");
        loadTweets();
      }
    })

  })

})















