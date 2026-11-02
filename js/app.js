
(function () {
    'use strict';

    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');
    const errorMsg = document.getElementById('error-msg');
    const counter = document.getElementById('counter');

    const filterAll = document.getElementById('filter-all');
    const filterActive = document.getElementById('filter-active');
    const filterDone = document.getElementById('filter-done');

    let currentFilter = 'all';

    // Update the counter
    function updateCounter() {
        const items = list.querySelectorAll('li');
        let count = 0;

        items.forEach(function (item) {
            if (!item.classList.contains('completed')) {
                count++;
            }
        });

        counter.textContent = count + ' item(s) left';
    }

    // Apply the selected filter
    function applyFilter() {
        const items = list.querySelectorAll('li');

        items.forEach(function (item) {
            const completed = item.classList.contains('completed');

            if (currentFilter === 'all') {
                item.classList.remove('hidden');
            } else if (currentFilter === 'active') {
                item.classList.toggle('hidden', completed);
            } else if (currentFilter === 'done') {
                item.classList.toggle('hidden', !completed);
            }
        });
    }

    // Add a new todo item
    function addTodo(event) {
        event.preventDefault();

        const task = input.value.trim();

        if (task === '') {
            errorMsg.classList.remove('hidden');
            return;
        }

        errorMsg.classList.add('hidden');

        const li = document.createElement('li');

        const span = document.createElement('span');
        span.className = 'item-text';
        span.textContent = task;

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = 'Delete';

        li.appendChild(span);
        li.appendChild(deleteButton);

        list.appendChild(li);

        input.value = '';

        applyFilter();
        updateCounter();
    }

    // Add using the form (button or Enter)
    form.addEventListener('submit', addTodo);

    // Event delegation: one listener on the todo list
    list.addEventListener('click', function (event) {

        // Delete a todo item
        if (event.target.closest('.delete-btn')) {
            const li = event.target.closest('li');

            if (li && list.contains(li)) {
                li.remove();
                updateCounter();
            }

            return;
        }

        // Toggle completed status
        if (event.target.closest('.item-text')) {
            const li = event.target.closest('li');

            if (li && list.contains(li)) {
                li.classList.toggle('completed');
                applyFilter();
                updateCounter();
            }
        }
    });

    // Show all items
    filterAll.addEventListener('click', function () {
        currentFilter = 'all';
        applyFilter();
    });

    // Show active items
    filterActive.addEventListener('click', function () {
        currentFilter = 'active';
        applyFilter();
    });

    // Show completed items
    filterDone.addEventListener('click', function () {
        currentFilter = 'done';
        applyFilter();
    });

    // Initial setup
    errorMsg.classList.add('hidden');
    updateCounter();
    applyFilter();

})();
