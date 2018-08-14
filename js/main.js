const therapist = document.querySelector('.therapist__pane'),
	patient = document.querySelector('.patient__pane'),
	patientInput = document.getElementById('chatInput'),
	patientSubmit = document.getElementById('chatSubmit');
var messageCount = 0;
var keyStrokes = 0;

(function greeting() {
	therapist.innerHTML = '<p>Good Afternoon. How do you feel today?';
})();

function preParse(message) {
	messageCount++;
	messageCount >= 7 ? patientInput.addEventListener('keyup', countKeysAndBeRude) : therapistResponse();
}

function countKeysAndBeRude() {
	if (keyStrokes > 20) {
		postBuilder(therapist, "I'm afraid that's all the time we have for today.");
		patientInput.setAttribute("disabled", "true")
	} else {
		keyStrokes++;
	}
}

function postBuilder(speaker, post) {
	var pg = document.createElement('p');
	pg.innerText = `${post}`;
	speaker.appendChild(pg);
}

function unnecessaryDiscomfort() {
	var ellipses = 0;
	myVar = setInterval(function(){
		postBuilder(therapist, "... ");
		ellipses++;
		if (ellipses >= 5) {
			window.clearInterval(myVar);
			postBuilder(therapist, 'Interesting.');
	  }
	}, 1000);
}

function therapistResponse() {
	setTimeout(function() {
		let responses = [
			"How does that make you feel?",
			`What I hear you saying is "${patientInput.value}"`,
			"I'm not sure that's healthy",
			"Have you considered just not feeling that way?",
			unnecessaryDiscomfort
		];
		let i = Math.floor(Math.random()*responses.length)
		console.log(i)

		if (i == 4) {
			var randResponse = responses[4]()
		} else {
			var randResponse = `${responses[i]}`
		}
		postBuilder(therapist, randResponse);
	}, 1000);
}

patientSubmit.addEventListener('click', function() {
	event.preventDefault();
	postBuilder(patient, patientInput.value)
	preParse(patientInput.value);
})
