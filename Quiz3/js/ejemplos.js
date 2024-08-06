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

function editButtonHandler(element) {
	editUser();
}