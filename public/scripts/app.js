$(document).ready(function() {

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
    $("<img>").attr("src", "http://www.iconsdb.com/icons/preview/guacamole-green/flag-3-xxl.png").appendTo(footer);
    $("<img>").attr("src", "http://www.freeiconspng.com/uploads/retweet-icon-1.png").appendTo(footer);
    $("<img>").attr("src", "https://pbs.twimg.com/profile_images/2365327617/a24p3jrjacf6anumc4rl_400x400.png").appendTo(footer);

    //Configuring Tweet Content
    $(content.text(data.content.text));

    //Constructing the element by bringing everything together.
    $(header).appendTo(element);
    $(content).appendTo(element);
    $(footer).appendTo(element);

    return element;
  }

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
        location.reload(true);
        console.log("Page has been reloaded")
      }
    })

  })

})















