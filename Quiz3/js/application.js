function getFromLocalStorage(key) {
	return JSON.parse(localStorage.getItem(key)) || [];
}

function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
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

	const users = getFromLocalStorage('users');
	let userIndex = users.findIndex((user) => user.username === username);

	if (userIndex !== -1) {
		// Actualizar usuario existente
		users[userIndex].firstname = firstname;
		users[userIndex].password = password;
	} else {
		// Añadir nuevo usuario
		users.push({
			username,
			firstname,
			password,
			"type": "user"
		});
	}

	saveToLocalStorage('users', users);

	alert('User saved');
	document.location.href = "./dashboard.html";
}

function deleteUser(username) {
	const users = getFromLocalStorage('users');
	const updatedUsers = users.filter(user => user.username !== username);

	saveToLocalStorage('users', updatedUsers);

	alert('User deleted');
	loadUser(); //recarga la tabla de usuarios
}

function editUser() {
	const username = document.getElementById('username').value;
	const firstname = document.getElementById('firstname').value;
	const password = document.getElementById('password').value;

	let users = JSON.parse(localStorage.getItem('users')) || [];
	const existingUserIndex = users.findIndex(user => user.username === username);
	if (existingUserIndex !== -1) {
		users[existingUserIndex] = { username, firstname, password, "type": "user" };
		localStorage.setItem('users', JSON.stringify(users));
		alert('User updated');
		document.location.href = "./dashboard.html";
	} else {
		alert('User not found');
	}
}

function bindEvents() {
	if(document.getElementById('register-button')) {
		document.getElementById('register-button').addEventListener('click', registerButtonHandler);
	}
	if(document.getElementById('edit-button')) {
		document.getElementById('edit-button').addEventListener('click', editButtonHandler);
	}
}

function registerButtonHandler() {
	editUser();
}

bindEvents();
loadUser();
