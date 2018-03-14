$(document).one('pageinit', function(){
  showRuns();
  $('#submitAdd').on('tap', addRun);
  $('#submitEdit').on('tap', editRun);
  $('#stats').on('tap', '#deleteLink', deleteRun);
  $('#stats').on('tap', '#editLink', setCurrent);
  $('#clearRuns').on('tap', clearRuns);

  function addRun() {
    var miles = $('#addMiles').val();
    var date = $('#addDate').val();
    var run = {
      date: date,
      miles: parseFloat(miles)
    };
    var runs = getRunsObject()
    runs.push(run);
    localStorage.setItem('runs', JSON.stringify(runs));
    window.location.href="index.html";
    return false;
  }

  function editRun() {
    currentMiles = localStorage.getItem('currentMiles');
    currentDate = localStorage.getItem('currentDate');

    var runs = getRunsObject()

    for (var i = 0; i < runs.length; i++) {
      if(runs[i].miles == currentMiles && runs[i].date == currentDate) {
        runs.splice(i, 1);
      }
      localStorage.setItem('runs', JSON.stringify(runs));
    }

    var miles = $('#editMiles').val();
    var date = $('#editDate').val();
    var updateRun = {
      date: date,
      miles: parseFloat(miles)
    };

    runs.push(updateRun);
    localStorage.setItem('runs', JSON.stringify(runs));
    window.location.href="index.html";
    return false;
  }

  function deleteRun() {
    localStorage.setItem('currentMiles', $(this).data('miles'));
    localStorage.setItem('currentDate', $(this).data('date'));

    currentMiles = localStorage.getItem('currentMiles');
    currentDate = localStorage.getItem('currentDate');

    var runs = getRunsObject()

    for (var i = 0; i < runs.length; i++) {
      if(runs[i].miles == currentMiles && runs[i].date == currentDate) {
        runs.splice(i, 1);
      }
      localStorage.setItem('runs', JSON.stringify(runs));
    }

    window.location.href="index.html";
    return false;
  }

  function clearRuns() {
    localStorage.removeItem('runs');
    $('#stats').html('<p>You have no logged runs.</p>')
  }

  function setCurrent() {
    localStorage.setItem('currentMiles', $(this).data('miles'));
    localStorage.setItem('currentDate', $(this).data('date'));
    $('#editMiles').val(localStorage.getItem('currentMiles'))
    $('#editDate').val(localStorage.getItem('currentDate'))
  }

  function getRunsObject() {
    var runs = [];
    var currentRuns = localStorage.getItem('runs');

    if(currentRuns != null) {
      var runs = JSON.parse(currentRuns);
    }
    return runs.sort(function(a, b){ return new Date(b.date) - new Date(a.date) });
  }

  function showRuns() {
    var runs = getRunsObject();
    if(runs != '' && runs != null) {
      for (var i = 0; i < runs.length; i++) {
        $('#stats').append('<li class="ui-body-inherit ui-li-static"><strong>Date: </strong>'+runs[i]["date"]+
				' <br><strong>Distance: </strong>'+runs[i]["miles"]+' miles<div class="controls">' +
				'<a href="#edit" id="editLink" data-miles="'+runs[i]["miles"]+'" data-date="'+runs[i]["date"]+'">Edit</a> | <a href="#" id="deleteLink" data-miles="'+runs[i]["miles"]+'" data-date="'+runs[i]["date"]+'" onclick="return confirm(\'Are You Sure?\')">Delete</a></li>');
      }
      $('#home').bind('pageinit', function(){
        $('#stats').listview('refresh');
      })
    } else {
      $('#stats').html('<p>You have no logged runs.</p>')
    }
  }
});
