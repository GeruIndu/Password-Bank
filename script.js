let container = document.querySelector('.setData');

// Function to add a card
function addCard(websiteName, userName, password) {
    let div = document.createElement('div');
    div.setAttribute('class', 'card');

    div.innerHTML = `<div class="website">${websiteName}</div>
                     <div class="user">${userName}</div>
                     <div class="pass">${password}</div>
                     <button class="del" data-key="${websiteName}">Delete</button>`;
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
    console.log(web_name.value == null);
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
    console.log(e.target.classList);
    if (e.target.classList.contains('del')) {
        const key = e.target.getAttribute('data-key');
        deleteItem(key);
    }
});

// Load cards on page load
window.addEventListener('load', () => {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let data = JSON.parse(localStorage.getItem(key));
        addCard(key, data.user, data.pass);
    }
});