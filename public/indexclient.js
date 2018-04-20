document.addEventListener('onload', main);
var form = document.getElementById('form');
function main() {

  document.getElementById('submit').addEventListener('click', function(evt) {
    evt.preventDefault();
    submit();
  })
}

function submit() {
  let input = document.getElementById('input_address').value;
  const req = new XMLHttpRequest();
  req.open('POST', '/address/add', true);
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
  req.send(input);
}
