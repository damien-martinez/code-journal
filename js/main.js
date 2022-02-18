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
var $entries = document.querySelector('.entries');

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

  $entryForm.elements.title.value = '';
  $entryForm.elements.url.value = '';
  $entryForm.elements.notes.value = '';
  $imageEntry.setAttribute('src', 'images/placeholder-image-square.jpg');

  journalView = true;
  $containerNewEntry.className = 'container-new-entry hidden';
  $container.className = 'container';
  $containerEntries.className = 'container-entries';

  if (data.editing === null) {
    data.entries.unshift(formInfoObj);
    data.nextEntryId++;

    var returnedRenderHTML = renderHTML(formInfoObj);
    containerSelector.prepend(returnedRenderHTML);
  } else {

    var rowNodes = document.querySelectorAll('.row');

    for (var i = 0; i < rowNodes.length; i++) {

      if (rowNodes[i].attributes['data-entry-id'] === undefined) {
        continue;
      } else {
        if (parseInt(rowNodes[i].attributes['data-entry-id'].value) === data.editing.nextEntryId) {

          formInfoObj.nextEntryId = data.editing.nextEntryId;
          returnedRenderHTML = renderHTML(formInfoObj);
          rowNodes[i].replaceWith(returnedRenderHTML);
        }
      }
    }
  }

}

function renderHTML(entry) {

  var entriesClass = document.createElement('div');
  entriesClass.setAttribute('data-view', 'entries');
  entriesClass.setAttribute('class', 'row');
  entriesClass.setAttribute('data-entry-id', entry.nextEntryId);

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

  var headerDiv = document.createElement('div');
  headerDiv.setAttribute('class', 'icon-div');
  headerListItem.appendChild(headerDiv);

  var headerText = document.createElement('h1');
  headerText.textContent = entry.title;
  headerDiv.appendChild(headerText);

  var icon = document.createElement('i');
  icon.setAttribute('class', 'fa-solid fa-pencil icon');
  headerDiv.appendChild(icon);

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
    data.editing = null;
  }
}

function openJournalEntry(event) {
  if (journalView === true) {
    $containerNewEntry.className = 'container-new-entry';
    $container.className = 'container hidden';
    $containerEntries.className = 'container-entries hidden';
    journalView = false;
    $entryForm.elements.title.value = '';
    $entryForm.elements.url.value = '';
    $entryForm.elements.notes.value = '';

  }
}

function closeJournalEntry(event) {
  if (journalView === false) {
    journalView = true;
    $containerNewEntry.className = 'container-new-entry hidden';
    $container.className = 'container';
    $containerEntries.className = 'container-entries';
  }
}

function editEntry(event) {

  if (event.target.tagName === 'I') {
    openJournalEntry(event);
    var $parentDiv = event.target.closest('.row');
    var entryId = parseInt($parentDiv.getAttribute('data-entry-id'));

    for (var i = 0; i < data.entries.length; i++) {

      if (data.entries[i].nextEntryId === entryId) {
        data.editing = data.entries[i];
        break;
      }
    }
    $entryForm.elements.title.value = data.editing.title;
    $entryForm.elements.url.value = data.editing.url;
    $entryForm.elements.notes.value = data.editing.notes;

  }

}

$urlInput.addEventListener('input', addPhoto);
$entryForm.addEventListener('submit', submitInfo);
newLink.addEventListener('click', openJournalEntry);
window.addEventListener('DOMContentLoaded', loadDOMTree);
$entries.addEventListener('click', closeJournalEntry);
$container.addEventListener('click', editEntry);
