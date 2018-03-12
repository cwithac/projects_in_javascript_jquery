function submitAnswers() {
  let total = 5;
  let score = 0;

  let q1 = document.forms['quizForm']['q1'].value;
  let q2 = document.forms['quizForm']['q2'].value;
  let q3 = document.forms['quizForm']['q3'].value;
  let q4 = document.forms['quizForm']['q4'].value;
  let q5 = document.forms['quizForm']['q5'].value;
  event.preventDefault();

  for (let i = 1; i <= total; i++) {
    document.getElementById('q' + i + 'm').style.display = 'none';
    if (eval('q' + i) == null || eval('q' + i) == '') {
      document.getElementById('q' + i + 'm').style.display = 'block';
      return false;
    }
  }

  let answers = ['a', 'a', 'd', 'b', 'd'];

  for (let i = 1; i <= total; i++) {
    if (eval('q' + i) == answers[i - 1]) {
      score++;
    }
  }

  const results = document.getElementById('results');
  const submitBtn = document.getElementById('btnsubmit');
  const retryBtn = document.getElementById('btnretry');
  results.innerHTML = '<h3>You scored <span>' + score + '</span> out of <span>' + total + '!</span></h3>';
  submitBtn.style.display = 'none';
  retryBtn.style.display = 'block';
}

function reloadPage() {
  location.reload();
}
