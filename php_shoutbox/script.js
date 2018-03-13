$(() => {
  $('#submit').on('click', (e) => {
    e.preventDefault();
    $('#message').text('');
    const name = $('#name').val();
    const shout = $('#shout').val();
    const date = getDate();
    const dataString = 'name=' + name + '&shout=' + shout + '&date=' + date;

    if(name == '' || shout == '') {
      $('#message').text('Please complete all fields.');
    } else {
      $.ajax({
        type: 'POST',
        url: 'shoutbox.php',
        data: dataString,
        cache: false,
        success: (html) => {
          $('#shouts ul').prepend(html);
        }
      });
    }
  });
});

const getDate = () => {
  let date;
  date = new Date;
  date = date.getUTCFullYear() + '-' +
                                ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
                                ('00' + date.getUTCDate()).slice(-2) + ' ' +
                                ('00' + date.getUTCHours()).slice(-2) + ':' +
                                ('00' + date.getUTCMinutes()).slice(-2) + ':' +
                                ('00' + date.getUTCSeconds()).slice(-2);
  return date;
};
