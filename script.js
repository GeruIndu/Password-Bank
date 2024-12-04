let container = document.querySelector('.setData');

// Function to add a card
function addCard(websiteName, userName, password) {
    let div = document.createElement('div');
    div.setAttribute('class', 'card');

    div.innerHTML = `   <div class="website">${websiteName}</div>
                        <div class="userData">
                            <div class="user">${userName}</div>
                            <input type="text" value="${userName}" class="input edit-user">
                        </div>
                        <div class="password">
                            <div class="pass">${password}</div>
                            <input type="text" value="${password}" class="input edit-pass">
                        </div>
                        <div class="btns">
                            <button class="del" data-key="${websiteName}">Delete</button>
                            <button class="edit" data-key="${websiteName}">Edit</button>
                            <button class="edit-save" data-key="${websiteName}">Save</button>
                        </div>`;
    container.append(div);
}

// Function to delete an item from local storage and update the UI
function deleteItem(key) {
    localStorage.removeItem(key);
    location.reload();
}

function checkPresent(key) {
    for (let i = 0; i < localStorage.length; i++) {
        let id = localStorage.key(i);
        if (id == key)
            return true;
    }
    return false;
}

// Form submission to save data in local storage
let form = document.querySelector(".form");
form.addEventListener('submit', (e) => {
    let web_name = document.querySelector('.web-name');
    let user_name = document.querySelector('.user-name');
    let password = document.querySelector('.password');
    let error = document.querySelector(".Error");

    e.preventDefault();

    let data = {
        user: user_name.value.trim(),
        pass: password.value.trim()
    };

    if (checkPresent(web_name.value))
        error.style.display = "block";
    else {
        localStorage.setItem(`${web_name.value.trim()}`, JSON.stringify(data))
        location.reload();
    }

});

// Event Delegation for Delete Buttons
container.addEventListener('click', (e) => {
    // console.log(e.target.classList);
    if (e.target.classList.contains('del')) {
        const key = e.target.getAttribute('data-key');
        deleteItem(key);
    } 

    // when click on edit button
    if(e.target.classList.contains('edit')) {
        const key = e.target.getAttribute('data-key');
        const card = e.target.closest('.card');

        card.querySelector('.user').style.display = 'none';
        card.querySelector('.pass').style.display = 'none';
        card.querySelector(".edit").style.display = 'none';
        card.querySelector('.edit-user').style.display = 'inline-block';
        card.querySelector('.edit-pass').style.display = 'inline-block';
        card.querySelector(".edit-save").style.display = 'inline-block';
    }

    // now save the edit
    if(e.target.classList.contains('edit-save'))
    {
        let key = e.target.getAttribute('data-key');;
        const card = e.target.closest('.card');
        let update_user = card.querySelector('.edit-user').value.trim();
        let update_pass = card.querySelector('.edit-pass').value.trim();

        let data = {
            user: update_user,
            pass: update_pass
        };

        localStorage.setItem(key, JSON.stringify(data));
        location.reload();
    }
});

// Load cards on page load
window.addEventListener('load', () => {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);32
        let data = JSON.parse(localStorage.getItem(key));
        addCard(key, data.user, data.pass);
    }
});