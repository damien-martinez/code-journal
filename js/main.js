/* global data */
/* exported data */

var urlInput = document.querySelector('.url');
var imageEntry = document.querySelector('.image-entry');

function addPhoto(event) {
  // console.log(urlInput.value);
  imageEntry.setAttribute('src', urlInput.value);

}

urlInput.addEventListener('input', addPhoto);
