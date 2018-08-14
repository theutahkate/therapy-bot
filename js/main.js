const therapist = document.querySelector('.therapist__pane'),
	patient = document.querySelector('.patient__pane'),
	patientInput = document.getElementById('chatInput'),
	patientSubmit = document.getElementById('chatSubmit');

(function greeting() {
	therapist.innerHTML = '<p>Good Afternoon. How do you feel today?';
	patient.innerHTML = '<p></p>';
})();

function therapistResponse() {
	let responses = ["Mm. Uh-huh. And how does that make you feel?", "What I hear you saying is exactly what you just said", "I'm not sure that's healthy"]
	setTimeout(function() {
		let responses = ["Mm. Uh-huh. And how does that make you feel?", `What I hear you saying is "${patientInput.value}"`, "I'm not sure that's healthy"];
		let p = document.createElement('p');
		p.innerText = `${responses[Math.floor(Math.random()*3)]}`;
		therapist.appendChild(p);
	}, 1000);
}

patientSubmit.addEventListener('click', function() {
	event.preventDefault();
	let p = document.createElement('p');
	p.innerText = `${patientInput.value}`;
	patient.appendChild(p);
	therapistResponse();
})
