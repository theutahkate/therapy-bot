const therapist = document.querySelector('.therapist__pane'),
	patient = document.querySelector('.patient__pane'),
	patientSubmit = document.getElementById('chatSubmit'),
	patientInput = document.getElementById('chatInput');
var messageCount = 0,
	keyStrokes = 0;

(function greeting() {
	therapist.innerHTML = '<p>Good Afternoon. How do you feel today?</p>';
})();

function countKeysAndBeRude() {
	patientInput.addEventListener('keyup', function() {
		if (keyStrokes > 3) {
			postBuilder(therapist, "I'm afraid that's all the time we have for today.");
			patientInput.setAttribute("disabled", "true");
			patientSubmit.setAttribute("disabled", "true");
		} else {
			keyStrokes++;
		}
	})
}

function angerParser() {
	console.log(patientInput.value)
	let angerResponses = [
		"You seem angry.",
		"Please calm down.",
		"I can see that you're upset."
	]
	postBuilder(therapist, angerResponses[Math.floor(Math.random()*angerResponses.length)]);
}

function postBuilder(speaker, post) {
	var pg = document.createElement('p');
	pg.innerText = `${post}`;
	speaker.appendChild(pg);
}

function unnecessaryDiscomfort() {
	var ellipses = 0;
	var ellipsesFunc = setInterval(function(){
		postBuilder(therapist, "...");
		ellipses++;
		if (ellipses >= 5) {
			window.clearInterval(ellipsesFunc);
			postBuilder(therapist, 'Interesting.');
	  }
	}, 1000);
}

function generalResponse() {
	let responses = [
			"How does that make you feel?",
			`What I hear you saying is "${patientInput.value}"`,
			"I'm not sure that's healthy",
			"Have you considered just not feeling that way?",
			unnecessaryDiscomfort
		];
	let i = Math.floor(Math.random()*responses.length);
	var response = (i === 4)? responses[4]() : responses[i];
	postBuilder(therapist, response);
}

function responserator() {
	var responseObject = {
		rude: messageCount > 7 ? countKeysAndBeRude : null,
		anger: patientInput.value === patientInput.value.toUpperCase() ? angerParser : null,
		randResponse: generalResponse
	};
	for (var key of Object.keys(responseObject)) {
		if (responseObject[key] !== null) {
			responseObject[key]();
			patientInput.value = "";
			break;
		}
	}
}

patientSubmit.addEventListener('click', function() {
	event.preventDefault();
	postBuilder(patient, patientInput.value);
	messageCount++;
	setTimeout(function() {
		responserator()
	}, 1000);
})
