import Typed from 'typed.js';

(() => {
	let root;

	const ipURL = 'https://ipinfo.io/json?token=0e89c36e1a483d';
	// const ipURL = 'https://jsonplaceholder.typicode.com/todos';
	const param = {
		headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
		method: 'GET',
		mode: 'cors'
	}

	window.onload = () => {
		let event;

		fetch(ipURL, param)
			.then((response) => { return response.json() })
			.then((data) => {
				const ip = data.ip;
				root = ip + '@raspberry ~ $ ';
				document.querySelector('#user').innerHTML = root;
			})
			.catch((err) => {
				console.log(err.message);
			});

		let typedParam = {
			strings: [
				'Hello Visitor...',
				'To Navigate, type the commands',
				'type <span class=\"help\">help</span> for a command list'
			],
			startDelay: 1000,
			typeSpeed: 60,
			backDelay: 1500,
			showCursor: false,
			callback: () => {
				const terminalElem = document.querySelector('#terminal');
				event = new Event('keyup');
				terminalElem.dispatchEvent(event);
				terminalElem.focus();
			}
		}

		let typed = new Typed('.info', typedParam);
	}

	document.querySelector('#terminal').addEventListener('keyup', (e) => {
		let elem = e.target;
		if (e.keyCode === 13) {
			let val = elem.value.toLowerCase();
			root = root + val;
		}
	});
})();
