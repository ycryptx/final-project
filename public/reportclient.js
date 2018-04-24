document.addEventListener('onload', main);
var form = document.getElementById('form');
function main() {

  document.getElementById('addBtn').addEventListener('click', function(evt) {
    evt.preventDefault();
    submit();
  })
}

function submit() {
  let location = document.getElementById('location').value;
  let chemical = document.getElementById('chemical').value;
  let amount = document.getElementById('amount').value;

  const req = new XMLHttpRequest();
  req.open('POST', '/report/submit', true);
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400){
      //TODO: hide form

      // data = JSON.parse(req.responseText);
      // if(data.error != undefined) {
      //   console.log(data.error);
      // }
      // else {
      // }
    }
  });
  req.send({'location':location,'chemical':chemical,'amount':amount});
}
