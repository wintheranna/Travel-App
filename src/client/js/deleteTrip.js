// Function called by event listener, delete data
function performDelete(event) {
  document.getElementById('ourlocation').innerHTML = '';
  document.getElementById('country').innerHTML = '';
  document.getElementById('days').innerHTML = '';
  document.getElementById('prognosisHigh').innerHTML = '';
  document.getElementById('prognosisLow').innerHTML = '';
  document.getElementById('temperature').innerHTML = '';
  document.getElementById('photo').innerHTML = '';
}

export {performDelete}
