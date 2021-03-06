$(document).ready(function() {
  $("#AddYourMeme").on("submit", handleMemeSubmit);
  $(".like").on("click", handleMemeLike);
  $(".save").on("click", handleMemeSave);
  $(".delete").on("click", handleMemeDelete);
  $("#FormCategory1").on("click", handleMemeSearch);
  $("#search-btn").on("click", function (event) {
    event.preventDefault();
    console.log("button-test");
    var memeSearched = $("#meme-search")
      .val()
      .trim();
    //Make an AJAX get request to our api
    $.get("/api/memes/search/" + memeSearched, function() {
      console.log("posting?");
    }).then(function(data) {
      console.log(JSON.stringify(data));
      //don't need reload
      // location.reload();
      window.location = "/api/memes/search/" + memeSearched;
    });
  });
});

//the functions that make everything above work live here

//Submit a new meme

function handleMemeSubmit(event) {
  console.log("Meme submitted!");
  event.preventDefault();
  var memeName = $("#FormName");
  var memeUrl = $("#FormURL");
  var memeCat = $("#FormCategory");
  var memeDesc = $("#FormDesc");
  if (!memeUrl.val().trim() && !memeName.val().trim()) {
    return;
  }
  var newMeme = {
    title: memeName.val().trim(),
    imageUrl: memeUrl.val().trim(),
    category: memeCat.val().trim(),
    about: memeDesc.val().trim()
  };
  submitMeme(newMeme);
}

function submitMeme(Meme) {
  $.post("/api/memes/", Meme, function () {
    console.log("posting?");
  }).then(function (data) {
    console.log("test" + data);
    //don't need reload
    location.reload();
    window.location.href = "/AllMemes";
  });
}

// DELETE Stuff
function handleMemeDelete() {
  console.log("Delete hit!");
  var currentMeme = $(this)
    .parent()
    .data("meme");
  console.log(currentMeme);
  deleteMeme(currentMeme);
}

function deleteMeme(id) {
  $.ajax({
    method: "DELETE",
    url: "/api/memes/" + id
  }).then(function() {
    location.reload();
    console.log("delete hit");
  });
}

//Like Stuff
function handleMemeLike() {
  console.log("Meme liked!");
  var id = $(this)
    .parent()
    .data("meme");
  var currentLike = $(this).data("likes");
  if (currentLike === "") {
    console.log("in here!");
    currentLike = 0;
    //console.log(currentLike);
  } //else {
  console.log(currentLike);
  likeMeme(currentLike, id);
}

function likeMeme(like, id) {
  like++;
  var newLike = like;
  var data = { "importance": newLike };
  console.log(id);
  console.log(data);
  $.ajax({
    type: "PUT",
    data: data,
    url: "/api/memes/" + id
  }).then(function() {
    location.reload();
  });
}

//Save Stuff
function handleMemeSave() {
  console.log("Meme Saved!");
  var currentMeme = $(this)
    .parent()
    .data("meme");
  console.log(currentMeme);
}

//

function handleMemeSearch(event) {
  event.preventDefault();
  var whatCat = $("#categorySelect").val();
  console.log("\nWhatCat?: " + whatCat);
  window.location.href = "/categories/" + whatCat;
}

//TEST AREA
