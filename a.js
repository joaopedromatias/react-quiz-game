fetch('https://opentdb.com/api.php?amount=3', { method: 'OPTIONS' })
  .then((resp) => {
    resp.headers.forEach((a, k) => {
      console.log(k, ':', a);
    });
    return resp.json();
  })
  .then((b) => console.log(b));
