/* global data */
/* exported data */

var $urlInput = document.querySelector('.url');
var $imageEntry = document.querySelector('.image-entry');
var $entryForm = document.querySelector('#journal-entry-form');

function addPhoto(event) {
  $imageEntry.setAttribute('src', $urlInput.value);

}

$urlInput.addEventListener('input', addPhoto);

function submitInfo(event) {
  event.preventDefault();
  var formInfoObj = {};

  formInfoObj.title = $entryForm.elements.title.value;
  formInfoObj.url = $entryForm.elements.url.value;
  formInfoObj.notes = $entryForm.elements.notes.value;
  formInfoObj.nextEntryId = data.nextEntryId;

  data.entries.unshift(formInfoObj);
  data.nextEntryId++;

  $entryForm.elements.title.value = '';
  $entryForm.elements.url.value = '';
  $entryForm.elements.notes.value = '';
  $imageEntry.setAttribute('src', 'images/placeholder-image-square.jpg');

}

$entryForm.addEventListener('submit', submitInfo);
