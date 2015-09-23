(function(document) {

	var socket = io(), statusLog;

	socket.on("upload result", function(result) {
		statusLog.innerText += result + "\n";
	});

	document.addEventListener("DOMContentLoaded", function() {

		statusLog = document.getElementById("status-log");
		statusLog.innerText += "\n";

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
				statusLog.innerText += "sending " + fr.result.byteLength + " bytes\n";
				socket.emit("upload file", fr.result);
			});

			fr.readAsArrayBuffer(file);
		}

	});

})(document);
