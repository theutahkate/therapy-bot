# Welcome to the Therapy Bot 3000&trade;

The Therapy Bot 3000&trade; meets all your mental health needs. No need to go to bad therapists when you've got the Therapy Bot 3000&trade;

## Therapy Bot 3000&trade; responds to patient input in a number of different ways:
* If a post contains the word "sad", Therapy Bot 3000&trade; responds with a gif of Billy Crystal offering a box of tissues.
* If a post contains the word "angry", Therapy Bot 3000&trade; responds with "So like...?" and a gif of Grumpy Cat blowing up a mansion.
* If a post is in all caps, Therapy Bot 3000&trade; randomly selects a text response from an array of responses to patient yelling.
* If a post meets none of those conditions, Therapy Bot 3000&trade; randomly selects a response from a different array. One of these responses is a function that posts "..."" once every second, then says "interesting".
* If the patient has made more than seven posts, the Therapy Bot 3000&trade; listens for keyup events, and after the tenth keyup, Therapy Bot 3000&trade; disables the form inputs and clears the chat container of everything but a box that says "I'm afraid that's all the time we have today."

## Goals in building Therapy Bot 3000&trade;:
* Fulfill a longstanding creative vision.
* Work with objects, avoid large/unwieldy if-else statements, use regular expressions, ternaries 4ever.

## Unsolved Problems
There are two:
1. On the eighth post, Therapy Bot 3000&trade; fails to respond. On the ninth, it cuts off the patient like it's supposed to. The issue is that the `countKeysAndBeRude` function doesn't get called until `messageCount > 7`, which is assessed on click of the submit button. `countKeysAndBeRude` needs to cut people off in the middle of typing, though, so there's a limbo place after the 7th post, where `responseObject[rude]` is not null (so `countKeysAndBeRude` is called), but there are no `keyup` events to listen to. I suspect I need to separate out the `countKeysAndBeRude` functionality into a separate function outside of the `responseObject`.

2. The `unnecessaryDiscomfort` function creates a new `<p>...</p>` element once a second for five seconds, then creates a `<p>Interesting</p>` element. This all works fine, but before any of this happens, a new `<p>undefined</p>` element is created and posted. I suspect this is something to do with the setInterval function itself, but I'm mystified about how that "undefined" ends up wrapped in a `<p>` tag. Is it something sneaking into the `postBuilder` function? How? Idk.