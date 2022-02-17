/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousData = localStorage.getItem('localData');

if (previousData !== null) {
  var parsedData = JSON.parse(previousData);

  data = parsedData;
}

function stringifyData(event) {

  var stringifyObj = JSON.stringify(data);
  localStorage.setItem('localData', stringifyObj);
  event.preventDefault();
}

window.addEventListener('beforeunload', stringifyData);
