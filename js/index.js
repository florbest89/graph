// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}

//var RDF = Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
//var RDFS = Namespace("http://www.w3.org/2000/01/rdf-schema#");
//var FOAF = Namespace("http://xmlns.com/foaf/0.1/");
//var XSD = Namespace("http://www.w3.org/2001/XMLSchema#");

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

          var parser = N3.Parser();
          parser.parse(e.target.result,function(error,triple,prefixes){
            debugger
            if (triple)
                 console.log(triple.subject, triple.predicate, triple.object, '.');
               else
                 console.log("# That's all, folks!", prefixes);
          });

        };
      })(myFile);

    reader.readAsText(myFile);

  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);