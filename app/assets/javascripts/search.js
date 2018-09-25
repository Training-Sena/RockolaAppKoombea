var app = app || {};
app.Rockola = app.Rockola || {};

function onClientLoad() {
  gapi.client.load('youtube', 'v3', app.Rockola.onYouTubeApiLoad);
  $('#onSearchButton').on('click', app.Rockola.search);
  $('#navbarTogglerDemo01 > form').on('submit', function(e){ e.preventDefault(); });
}

app.Rockola.onYouTubeApiLoad = function() {
  gapi.client.setApiKey('AIzaSyAWhX3xLCfnJ-U0HEPo7R0Zc-5J9jCJoXc');
}

app.Rockola.search = function() {
  var query = $('#query').val();
  var request = gapi.client.youtube.search.list({
    part: 'snippet',
    type: 'video',
    maxResults: '10',
    q:query
  });
  request.execute(app.Rockola.onSearchResponse);
}

app.Rockola.onSearchResponse = function(response) {
  $("#response").html('');
  response.items.forEach(function(e){
    $("#response").append('<img data-toggle="modal" data-target="#videoModal" class="video" rel="https://www.youtube.com/embed/'+ e.id.videoId +
                          '"src="'+ e.snippet.thumbnails.medium.url +
                          '" value="' + e.snippet.title + 
                          '"><br></br>');
  });
}
  $(function(){
    $('#videoModal').on('shown.bs.modal', function (e) {
      var videoSRC = $(e.relatedTarget).attr("rel")
      $('#videoModal iframe').attr('src', videoSRC + "?rel=0&autoplay=1&showinfo=0&controls=0");
      var valVideo = $(e.relatedTarget).attr("value");
      $('.modal-title').append('<h4>' + valVideo + '</h4>');
      $("#song_title").val(valVideo);
      $("#song_videoId").val(videoSRC)
    })

    $('#videoModal').on('hidden.bs.modal',function(e) {
      $('#videoModal iframe').attr('src', "");
      $('.modal-title').empty('value');
      $("#message_result_modal").hide();
      $("#song_title").val("");
    })

    $('.playlist_created').on('change', function(){
      $.ajax({
        url: 'playlists/' + $(this).val(),
        type: 'GET',
        success: function(result){
        $("#js-playlist-content").html(result)
        }
      })
    })

  })
