(function(document) {

	var socket = io();

	socket.on("upload result", function(result) {
		console.log(result);
	});

	document.addEventListener("dragenter", function(e) {
		e.preventDefault();
		e.target.classList.add("active");
	});

	document.addEventListener("dragleave", function(e) {
		e.preventDefault();
		e.target.classList.remove("active");
	})

	document.addEventListener("dragover", function(e) {
		e.preventDefault();
	});

	document.addEventListener("drop", function(e) {

		e.preventDefault();
		e.target.classList.remove("active");

		for (var x=0; x<e.dataTransfer.files.length; x++) {

			var
				file = e.dataTransfer.files[x],
				fr = new FileReader();

			fr.addEventListener("loadend", function() {
				console.log("sending " + fr.result.byteLength + " bytes");
				socket.emit("upload file", fr.result);
			});

			fr.readAsArrayBuffer(file);
		}

	});

})(document);
