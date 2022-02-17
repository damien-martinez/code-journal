/* global data */
/* exported data */

var $urlInput = document.querySelector('.url');
var $imageEntry = document.querySelector('.image-entry');
var $entryForm = document.querySelector('#journal-entry-form');

var newLink = document.querySelector('.new-link');
var journalView = true;
var $containerNewEntry = document.querySelector('.container-new-entry');
var $container = document.querySelector('.container');
var containerSelector = document.querySelector('.container');
var $containerEntries = document.querySelector('.container-entries');

function addPhoto(event) {
  $imageEntry.setAttribute('src', $urlInput.value);

}

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

  journalView = true;
  $containerNewEntry.className = 'container-new-entry hidden';
  $container.className = 'container';
  $containerEntries.className = 'container-entries';

  var returnedRenderHTML = renderHTML(formInfoObj);
  containerSelector.prepend(returnedRenderHTML);

}

function renderHTML(entry) {

  var entriesClass = document.createElement('div');
  entriesClass.setAttribute('data-view', 'entries');
  entriesClass.setAttribute('class', 'row');

  var imageColumn = document.createElement('div');
  imageColumn.setAttribute('class', 'column-full column-half');
  entriesClass.appendChild(imageColumn);

  var imageUnorderedList = document.createElement('ul');
  imageColumn.appendChild(imageUnorderedList);

  var imageListItem = document.createElement('li');
  imageUnorderedList.appendChild(imageListItem);

  var imageElement = document.createElement('img');
  imageElement.setAttribute('class', 'image-entry');
  imageElement.setAttribute('src', entry.url);
  imageElement.setAttribute('alt', '');
  imageListItem.appendChild(imageElement);

  var textColumn = document.createElement('div');
  textColumn.setAttribute('class', 'column-full column-half');
  entriesClass.appendChild(textColumn);

  var textUnorderedList = document.createElement('ul');
  textColumn.appendChild(textUnorderedList);

  var headerListItem = document.createElement('li');
  textUnorderedList.appendChild(headerListItem);

  var headerText = document.createElement('h1');
  headerText.textContent = entry.title;
  headerListItem.appendChild(headerText);

  var paragraphListItem = document.createElement('li');
  textUnorderedList.appendChild(paragraphListItem);

  var pContent = document.createElement('p');
  pContent.textContent = entry.notes;
  paragraphListItem.appendChild(pContent);

  return entriesClass;

}

function loadDOMTree(event) {
  var localStorageData = localStorage.getItem('localData');

  var parsedLocalStorageData = JSON.parse(localStorageData);

  var entries = parsedLocalStorageData.entries;

  for (var i = 0; i < entries.length; i++) {
    var renderHTMLReturn = renderHTML(entries[i]);
    containerSelector.appendChild(renderHTMLReturn);
  }
}

function openJournalEntry(event) {
  if (journalView === true) {
    $containerNewEntry.className = 'container-new-entry';
    $container.className = 'container hidden';
    $containerEntries.className = 'container-entries hidden';
    journalView = false;

  }
}

$urlInput.addEventListener('input', addPhoto);
$entryForm.addEventListener('submit', submitInfo);
newLink.addEventListener('click', openJournalEntry);
window.addEventListener('DOMContentLoaded', loadDOMTree);
