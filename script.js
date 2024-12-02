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

// Form submission to save data in local storage
document.querySelector(".form").addEventListener('submit', (e) => {
    let web_name = document.querySelector('.web-name');
    let user_name = document.querySelector('.user-name');
    let password = document.querySelector('.password');
    e.preventDefault();

    let data = {
        user: user_name.value.trim(),
        pass: password.value.trim()
    };

    localStorage.setItem(`${web_name.value.trim()}`, JSON.stringify(data));
    location.reload();
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
