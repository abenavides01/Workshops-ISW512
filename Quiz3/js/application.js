function getFromLocalStorage(key) {
	return JSON.parse(localStorage.getItem(key)) || [];
}

function saveToLocalStorage(key, data) {
	const existingData = getFromLocalStorage(key);
	existingData.push(data);
	localStorage.setItem(key, JSON.stringify(existingData));
	return true;
}

function loadUser() {
	// Obtén el nombre de usuario de la query string
	const urlParams = new URLSearchParams(window.location.search);
	const username = urlParams.get('u');
	if (username) {
		// Recupera los usuarios del almacenamiento local
		const users = getFromLocalStorage('users');
		let matchedUser = null;

		// Encuentra el usuario que coincida con el nombre de usuario
		users.forEach((user) => {
			if (user.username === username) {
				matchedUser = user;
				return;
			}
		});

		// Si se encuentra el usuario, rellena el formulario con sus datos
		if (matchedUser) {
			document.getElementById('username').value = matchedUser.username;
			document.getElementById('firstname').value = matchedUser.firstname;
			document.getElementById('password').value = matchedUser.password;
		}
	}
}

function loadUsers() {
	// Recupera los usuarios del almacenamiento local
	const users = getFromLocalStorage('users');
	users.forEach((user, index) => {
		// Añade cada usuario a la tabla existente
		const table = document.getElementById("user-table-rows");
		table.innerHTML += `<tr><th scope="row">${index}</th><td>${user.firstname}</td><td>${user.username}</td><td>${user.type}</td><td><a href="./edit_user.html?u=${user.username}">Edit</a> | <a href="#">Delete</a></td></tr>`;
	});
}

function saveUser() {
	const username = document.getElementById('username').value;
	const firstname = document.getElementById('firstname').value;
	const password = document.getElementById('password').value;

	const user = {
		username,
		firstname,
		password,
		"type": "user"
	};

	if (saveToLocalStorage('users', user)) {
		alert('User saved');
		document.location.href = "./dashboard.html";
	} else {
		alert('There was an error registering the user');
	}
}

function bindEvents() {
	// Vincula los eventos a los elementos de la página
	if (document.getElementById('register-button')) {
		document.getElementById('register-button').addEventListener('click', registerButtonHandler);
	}
}

function registerButtonHandler() {
	saveUser();
}

bindEvents();
loadUser();
