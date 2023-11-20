document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('itemForm');
    const input = document.getElementById('itemName');
    const list = document.getElementById('itemList');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = input.value.trim();
        if (name) {
            addItem(name);
            input.value = '';
        }
    });

    function addItem(name) {
        fetch('/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name })
        })
            .then(response => response.json())
            .then(item => {
                displayItem(item);
            })
            .catch(error => console.error('Error adding item:', error));
    }

    function displayItem(item) {
        const li = document.createElement('li');
        li.id = `item-${item.id}`;

        const itemName = document.createElement('span');
        itemName.textContent = item.name;
        itemName.className = 'item-name';

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit-btn';
        editBtn.onclick = () => editItem(item.id, item.name);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => deleteItem(item.id);

        li.appendChild(itemName);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    }

    function editItem(itemId, currentName) {
        const newName = prompt("Enter new name", currentName);
        if (newName && newName !== currentName) {
            fetch(`/items/${itemId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName })
            })
                .then(response => response.json())
                .then(updatedItem => {
                    const itemElement = document.getElementById(`item-${itemId}`);
                    itemElement.querySelector('.item-name').textContent = updatedItem.name;
                })
                .catch(error => console.error('Error updating item:', error));
        }
    }

    function deleteItem(itemId) {
        fetch(`/items/${itemId}`, {
            method: 'DELETE'
        })
            .then(() => {
                const itemElement = document.getElementById(`item-${itemId}`);
                list.removeChild(itemElement);
            })
            .catch(error => console.error('Error deleting item:', error));
    }

    function loadItems() {
        fetch('/items')
            .then(response => response.json())
            .then(items => {
                items.forEach(item => displayItem(item));
            })
            .catch(error => console.error('Error loading items:', error));
    }

    loadItems();
});
