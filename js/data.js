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
  // console.log(parsedData);

  data = parsedData;
}
