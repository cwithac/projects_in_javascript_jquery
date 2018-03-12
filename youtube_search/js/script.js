$( () => {

const $searchField = $('#query');
const $icon = $('#search-btn');

$searchField.on('focus', (e) => {
  $(e.currentTarget).animate({
    width: '100%'
  }, 400);
  $icon.animate({
    right: '10px'
  }, 400);
});

$searchField.on('blur', () => {
  if($searchField.val() == '') {
    $searchField.animate({
      width: '45%'
    }, 400);
    $icon.animate({
      right: '360px'
    }, 400);
  }
});

$('#searchForm').submit(function(e) {
  e.preventDefault();
});

}); //

let APIKEY = config.YT_API_KEY;
let $query = $('#query').val();
let btnoutput;
let $token;

function search() {
  $('#results').html('');
  $('#buttons').html('');

  $query = $('#query').val();
  $.get(
    'https://www.googleapis.com/youtube/v3/search',
    {
      part: 'snippet, id',
      q: $query,
      type: 'video',
      key: APIKEY
    },
    function(data) {
      const nextPageToken = data.nextPageToken;
      const prevPageToken = data.prevPageToken;
      // console.log(data);
      $.each(data.items, function(i, item) {
        const output = getOutput(item);
        $('#results').append(output);
      });
      const buttons = getButtons(prevPageToken, nextPageToken);
      $('#buttons').append(buttons);
    }
  );
};

function nextPage() {
  $query = $('#next-button').data('query');
  $token = $('#next-button').data('token');

  $('#results').html('');
  $('#buttons').html('');

  $query = $('#query').val();
  $.get(
    'https://www.googleapis.com/youtube/v3/search',
    {
      part: 'snippet, id',
      q: $query,
      pageToken: $token,
      type: 'video',
      key: APIKEY
    },
    function(data) {
      const nextPageToken = data.nextPageToken;
      const prevPageToken = data.prevPageToken;
      // console.log(data);
      $.each(data.items, function(i, item) {
        const output = getOutput(item);
        $('#results').append(output);
      });
      const buttons = getButtons(prevPageToken, nextPageToken);
      $('#buttons').append(buttons);
    }
  );
};

function prevPage() {
  $query = $('#prev-button').data('query');
  $token = $('#prev-button').data('token');

  $('#results').html('');
  $('#buttons').html('');

  $query = $('#query').val();
  $.get(
    'https://www.googleapis.com/youtube/v3/search',
    {
      part: 'snippet, id',
      q: $query,
      pageToken: $token,
      type: 'video',
      key: APIKEY
    },
    function(data) {
      const nextPageToken = data.nextPageToken;
      const prevPageToken = data.prevPageToken;
      // console.log(data);
      $.each(data.items, function(i, item) {
        const output = getOutput(item);
        $('#results').append(output);
      });
      const buttons = getButtons(prevPageToken, nextPageToken);
      $('#buttons').append(buttons);
    }
  );
};

function getOutput(item) {
  const videoId = item.id.videoId;
  const title = item.snippet.title;
  const description = item.snippet.description;
  const thumb = item.snippet.thumbnails.high.url;
  const channelTitle = item.snippet.channelTitle;
  const videoDate = item.snippet.publishedAt;

  const outputString = "<li>" +
                        "<div class='list-left'>" +
                        "<img src=" + thumb + ">" +
                        "</div>" +
                        "<div class='list-right'>" +
                        "<h3><a class='fancybox fancybox.iframe' href='http://www.youtube.com/embed/" + videoId + "'>" + title + "</a></h3>" +
                        "<small> by <span class='cTitle'>" + channelTitle + "</span> on " + videoDate + "</small>" +
                        "<p>" + description + "</p>" +
                        "</div>" +
                        "</li>" +
                        "<div class='clearfix'></div>" +
                        '';

  return outputString;
};

function getButtons(prevPageToken, nextPageToken) {
  if (!prevPageToken) {
    btnoutput = "<div class='button-container'>" +
                "<button id='next-button' class='paging-button' data-token=" + nextPageToken + " data-query=" + $query +
                " onclick='nextPage()'>Next Page</button>" +
                "</div>";
  } else {
    btnoutput = "<div class='button-container'>" +
                "<button id='prev-button' class='paging-button' data-token=" + prevPageToken + " data-query=" + $query +
                " onclick='prevPage()'>Previous Page</button>" +
                "<button id='next-button' class='paging-button' data-token=" + nextPageToken + " data-query=" + $query +
                " onclick='nextPage()'>Next Page</button>" +
                "</div>";
  }
  return btnoutput;
};
