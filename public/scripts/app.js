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
    $(footer).text(data.created_at);
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
      success: function(all) {
        $("#allTweets").empty();
        loadTweets()
      }
    })

  })

})















