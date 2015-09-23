(function(window, document) {

	var socket;

	document.addEventListener("DOMContentLoaded", function() {

		socket = new WebSocket("ws://localhost:8081");
		socket.addEventListener("open", function() {
			console.log("connection open");
		});

		socket.addEventListener("message", function(msg) {
			console.log(msg.data);
		});

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
				socket.send(fr.result);
			});

			fr.readAsArrayBuffer(file);
		}

	});

})(window, document);
