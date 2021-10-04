let getID = id => <any>document.getElementById(id);

const TBODY = <any>getID('tbody');
const dataArray = [];
let loginregExp = /^[A-Za-z]{4,16}$/;
let passwordregExp = /^[A-Za-z_-]{4,16}$/;
let emailregExp = /^[\w_#&-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

getID('login').oninput = function () {
    let testlogin = loginregExp.test(this.value);
    if (testlogin) {
        this.style.border = '2px solid green';
    } else {
        this.style.borderColor = 'red'
    }
}
getID('password').oninput = function () {
    let testpassword = passwordregExp.test(this.value);
    if (testpassword) {
        this.style.border = '2px solid green';
    } else {
        this.style.borderColor = 'red'
    }
}
getID('email').oninput = function () {
    let testemail = emailregExp.test(this.value);
    if (testemail) {
        this.style.border = '2px solid green';

    } else {
        this.style.borderColor = 'red';
    }
}

const addUser = (ev) => {
    ev.preventDefault();

    //Validation form

    let testlogin = loginregExp.test(getID('login').value);
    let testpassword = passwordregExp.test(getID('password').value);
    let testemail = emailregExp.test(getID('email').value);
    if (testlogin && testpassword && testemail) {
      
        let data = {
            number: dataArray.length + 1,
            login: getID("login").value,
            password: getID("password").value,
            email: getID("email").value
        }

        dataArray.push(data);
        document.querySelector("form").reset();
        render();
    }
}

//ADDUSER BUTTON

getID("btn1").addEventListener("click", addUser)

const render = () => {
    TBODY.innerHTML = '';
    dataArray.forEach((value, index) => {
        let newUser = `
             <tr data-id="${index}">
                <td>${index+1}</td>
                <td id="login2">${value.login}</td>
                <td id="parol2">${value.password}</td>
                <td id="email2">${value.email}</td>
                <td><button id="edt" data-name="edt" data-id="${index}" onclick="editUser1()" >edit</button></td>
                <td><button id="delete" data-name="delete" data-id="${index}" onclick="delUser()">delete </button></td>
                             </tr>    `
        TBODY.insertAdjacentHTML('beforeend', newUser)
    })
}

// DELETE BUTTON
function delUser() {
    if ((<HTMLInputElement>event.target).dataset.name == 'delete') {

        dataArray.splice(+(<HTMLInputElement>event.target).dataset.id, 1);
        TBODY.removeChild((<HTMLInputElement>event.target).closest('tr'));
        render();
    }
}

console.log(getID('tbl'))

//EDIT BUTTON

function editUser1() {

    if ((<HTMLInputElement>event.target).dataset.name == 'edt') {

        getID('btn1').style.visibility = "hidden";
        getID('btn2').style.visibility = "visible";

        getID("login").value = dataArray[(<HTMLInputElement>event.target).dataset.id].login;
        getID("password").value = dataArray[(<HTMLInputElement>event.target).dataset.id].password;
        getID("email").value = dataArray[(<HTMLInputElement>event.target).dataset.id].email;

        let userIndex = +(<HTMLInputElement>event.target).dataset.id;

        event.preventDefault();

        // EDITUSER BUTTON

        getID("btn2").addEventListener("click", function () {

            dataArray[userIndex].login = getID("login").value;
            dataArray[userIndex].password = getID("password").value;
            dataArray[userIndex].email = getID("email").value;

            render();

            document.querySelector("form").reset();
            event.preventDefault();

            getID('btn1').style.visibility = "visible";
            getID('btn2').style.visibility = "hidden";

        })
    }
}
// THE END