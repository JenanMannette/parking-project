$(document).ready(function() {

  $("#location-link").click(function(e) {
    $("html, body").animate({ scrollTop: $(this).offset().top-50}, 500);
    $(".location-div").toggle("500");
    $(".favorites-div").hide("fast");
  });

  $("#favorites-link").click(function(e) {
    $("html, body").animate({ scrollTop: $(this).offset().top-50}, 500);
    $(".favorites-div").toggle("500");
    $(".location-div").hide("fast");
  });
});
