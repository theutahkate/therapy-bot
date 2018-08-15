const therapist = document.querySelector('.therapist__pane'),
	patient = document.querySelector('.patient__pane'),
	patientSubmit = document.getElementById('chatSubmit'),
	patientInput = document.getElementById('chatInput');
var messageCount = 0,
	keyStrokes = 0;

function countKeysAndBeRude() {
	if (keyStrokes > 10) {
		document.querySelector('.chat__container').innerHTML = "<p>I'm afraid that's all the time we have for today.</p>";
		document.querySelector('.chat__container').setAttribute("class", "game-over");
		patientInput.setAttribute("disabled", "true");
		patientSubmit.setAttribute("disabled", "true");
	} else {
		keyStrokes++;
	}
}

function sadParser() {
	imgBuilder('https://media1.tenor.com/images/3ea03e2ba19c1dcd5d5cff888501f442/tenor.gif?itemid=10268918', 'gif of Billy Crystal offering a box of tissue')
}

function angryParser() {
	postBuilder(therapist, "So like...?");
	imgBuilder('http://gifimage.net/wp-content/uploads/2017/09/annoyed-cat-gif-6.gif', 'gif of a grumpy cat blowing up a mansion');
}

function yellParser() {
	let yellResponses = [
		"You seem angry.",
		"Please calm down.",
		"I can see that you're upset."
	]
	postBuilder(therapist, yellResponses[Math.floor(Math.random()*yellResponses.length)]);
}

function postBuilder(speaker, post) {
	var pg = document.createElement('p');
	pg.innerText = `${post}`;
	speaker.appendChild(pg);
}

function imgBuilder(url, altText) {
	var img = document.createElement('img');
	img.setAttribute('src', url);
	img.setAttribute('alt', altText);
	therapist.appendChild(img);
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
	return '...'
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
		sad: new RegExp('sad').test(patientInput.value) ? sadParser : null,
		anger: patientInput.value.indexOf('angry') !== -1 ? angryParser : null,
		yelling: patientInput.value === patientInput.value.toUpperCase() ? yellParser : null,
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

patientInput.addEventListener('keyup', function() {
	if (messageCount >= 7) {
		countKeysAndBeRude()
	}
})

patientSubmit.addEventListener('click', function() {
	event.preventDefault();
	postBuilder(patient, patientInput.value);
	messageCount++;
	setTimeout(function() {
		responserator()
	}, 1000);
})
