
$(() => {

  const action = 'click';
  const speed = '500';

  $('li.q').on(action, (e) => {
    $(e.currentTarget).next()
                      .slideToggle(speed)
                        .siblings('li.a')
                        .slideUp();
    const $img = $(e.currentTarget).children('img');
    $('img').not($img).removeClass('rotate');
    $img.toggleClass('rotate');
  });
});
