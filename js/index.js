// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.

    var output = [];

    for (var i = 0, f; f = files[i]; i++) {
      output.push(escape(f.name), ' (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a');
    }

    var input = $(this).parents('.input-group').find(':text');
    input.val(output.join(''));

    var myFile = files[0];

    var reader = new FileReader();

    // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {

          console.log(e.target.result);

        };
      })(myFile);

    reader.readAsDataURL(myFile);

  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);