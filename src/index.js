import Typed from 'typed.js';
import { $, jQuery } from 'jquery';
// import {resume} from '../assets/resume.pdf';

(() => {
	let root;
	let event;
	let ip;

	const ipURL = 'https://ipinfo.io/json?token=0e89c36e1a483d';
	const param = {
		headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
		method: 'GET',
		mode: 'cors'
	}

	window.onload = () => {
		fetch(ipURL, param)
			.then((response) => { return response.json() })
			.then((data) => {
				ip = data.ip;
				root = ip + '@abhijitchatterjee ~ $ ';
				document.querySelector('#user').innerHTML = root;
			})
			.catch((err) => {
				console.log(err.message);
			});

		let typedParam = {
			strings: [
				'Hello Visitor...',
				'To Navigate, type the commands',
				'type <span class=\"commandlist\">help</span> for a list of commands'
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

	let terminalElem = document.querySelector('#terminal');
	window.$ = $;
	window.jQuery = jQuery;

	terminalElem.addEventListener('keyup', (e) => {
		if (e.keyCode === 13) {
			terminal(e);
		}
	});

	let terminal = (event) => {
		let elem = event.target;
		let result = '';
		let val = elem.value.toLowerCase();

		root = root + val;

		switch (val) {
			case 'help':
				result = result + '\
					&nbsp <br>\
					&nbsp <br>\
					<span class=\"commandlist\">help</span> &nbsp&nbsp&nbsp&nbsp&nbsp List of available commands<br>\
					&nbsp <br>\
					<span class=\"commandlist\">contact</span> &nbsp&nbsp&nbsp&nbsp&nbsp Contact Information<br>\
					&nbsp <br>\
					<span class=\"commandlist\">info</span> &nbsp&nbsp&nbsp&nbsp&nbsp Info & Resume<br>\
					&nbsp <br>\
					<span class=\"commandlist\">about</span> &nbsp&nbsp&nbsp&nbsp&nbsp Social Media Presence<br>\
					&nbsp <br>\
					<span class=\"commandlist\">clear</span> &nbsp&nbsp&nbsp&nbsp&nbsp Clear the console<br>\
					&nbsp <br>\
					<span class=\"commandlist\">quit</span> &nbsp&nbsp&nbsp&nbsp&nbsp Close the current terminal session<br>\
					&nbsp <br>\
					';

				break;

			case 'contact':
				result = result + '\
					<br> 210 Lansdowne Gate, Long Mile Road, Drimnagh, Dublin 12 <br>\
					Contact: &nbsp&nbsp&nbsp +353899891135 <br>\
					Mail: <a href="mailto: info@abhijitchatterjee.com">&nbsp&nbsp&nbspinfo@abhijitchatterjee.com</a><br>';

				break;

			case 'info':
				let bday = new Date('12/July/1989');
				result = result + '\
				<br> Name:&nbsp&nbsp&nbsp Abhijit Chatterjee \
				<br> Nationality:&nbsp&nbsp&nbsp Indian \
				<br> Date of Birth:&nbsp&nbsp&nbsp ' + bday + '\
				<br> Resume: <a href = "../assets/resume.pdf">&nbsp&nbsp&nbsp Abhijit Chatterjee (PDF)</a><br>';

				break;

			case 'about':
				result = result + '\
				<br>I\'m a Web User Interface and an App developer. \
				<br>I dabble in the dark arts of Javascript Technology, living in Dublin, Ireland. \
				<br>I have worked with various companies and clients like Amdocs - India, Sears Holdings India, Ericsson - Athlone and currently working for AIB, Ireland deployed under Hays Ltd.\
				<br>Web Technology is not just a job for me, it\'s a passion.\
				<br><br>This website is made with &hearts; by me\
				<br>Big Shout out to Mattboldt for typed.js\
				<br>typed.js - <a href="http://www.mattboldt.com/demos/types-js/" target="_blank">Mattboldt</a><br>';
				
				break;

			case 'clear':
				result = '<br>';
				break;

			case 'quit':
				window.open('', '_self');
				break;

			default:
				result = result + '\
				<br> -bash: ' + val + ' is not recognized as an internal or external command.\
				<br> It might be also blocked by <' + ip + '>\
				<br><br> Please type <span class=\"commandlist\">help</span> to get the list of commands <br>';

				break;
		}

		result = result + '<br>';
		let consoleOutputElem = document.querySelector('.console-output');
		consoleOutputElem.innerHTML = result;

		// $('html, body').animate({
		// 	scrollTop: $('#terminal').offsetTop
		// },1);
	}
})();
