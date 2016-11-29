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

          var triples = [];
          var sub_obs = {};
          var nodes = [];
          var id = 0;

          var parser = N3.Parser();
          
          parser.parse(e.target.result,function(error, triple, prefixes){
            
            if (triple) { 

              triples.push(triple);

              if( sub_obs[triple.subject] == undefined){
              		var node = {"name": triple.subject, "type": 1};
              		sub_obs[triple.subject] = id;
              		id += 1;
              		nodes.push(node);
              }

              if (sub_obs[triple.object] == undefined){
              		var node = {"name": triple.object, "type": 1};
              		sub_obs[triple.object] = id;
              		id += 1;
              		nodes.push(node);
              }

              console.log(triple.subject, triple.predicate, triple.object, '.');
            }else{

              if(triples.length > 0){
              	draw(triples,sub_obs,nodes,id);
              }

              console.log("# That's all, folks!", prefixes || '');
              
              if (error)
                console.log("#", error);
            }

          });

        };
      })(myFile);

    reader.readAsText(myFile);


  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);