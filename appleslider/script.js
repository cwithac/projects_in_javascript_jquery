$(() => {
  let totalWidth = 0;
  let positions = [];

  $('#slides .slide').each(function(i) {
      positions[i] = totalWidth;
      totalWidth += $(this).width();
      if(!$(this)) {
        console.log('Please add width to images');
        return false
      }
  });

  $('#slides').width(totalWidth);

  $('#menu ul li a').on('click', (e, keepScroll) => {
    $('li.product').removeClass('active').addClass('inactive');
    $(e.currentTarget).parent().addClass('active');

    const pos = $(e.currentTarget).parent().prevAll('.product').length;
    $('#slides').stop().animate({
      marginLeft:-positions[pos] + 'px'
    });
    e.preventDefault();
    if(!autoScroll) clearInterval(itvl);
  });

  $('#menu ul li.product:first').addClass('active').siblings().addClass('inactive');

  let current = 1;
  const autoScroll = () => {
    if (current == -1) {
      return false
    }
    $('#menu ul li a').eq(current%$('#menu ul li a').length).trigger('click', [true]);
    current++;
  }
  let duration = 5;
  const itvl = setInterval(() => {
    autoScroll();
  }, duration * 1000);
});
