
(() => {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        const input = document.getElementById('todo-input');
        const addButton = document.getElementById('add-btn');
        const todoList = document.getElementById('todo-list');
        const errorMsg = document.getElementById('error-msg');
        const counter = document.getElementById('counter');

        const filterAll = document.getElementById('filter-all');
        const filterActive = document.getElementById('filter-active');
        const filterDone = document.getElementById('filter-done');

        let currentFilter = 'all';

        // Update the remaining-items counter.
        function updateCounter() {
            const items = todoList.querySelectorAll('li');
            const remaining = Array.from(items).filter(
                item => !item.classList.contains('completed')
            ).length;

            counter.textContent = `${remaining} item(s) left`;
        }

        // Apply the currently selected filter.
        function applyFilter() {
            const items = todoList.querySelectorAll('li');

            items.forEach(item => {
                const isCompleted = item.classList.contains('completed');

                if (currentFilter === 'active') {
                    item.hidden = isCompleted;
                } else if (currentFilter === 'done') {
                    item.hidden = !isCompleted;
                } else {
                    item.hidden = false;
                }
            });
        }

        // Add a new todo item.
        function addTodo() {
            const text = input.value.trim();

            if (text === '') {
                errorMsg.hidden = false;
                return;
            }

            errorMsg.hidden = true;

            const li = document.createElement('li');
            li.textContent = text;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.type = 'button';

            li.appendChild(deleteButton);
            todoList.appendChild(li);

            input.value = '';

            applyFilter();
            updateCounter();
        }

        // Add using the button.
        addButton.addEventListener('click', addTodo);

        // Add using Enter.
        input.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                addTodo();
            }
        });

        // Event delegation: one listener for all todo items.
        todoList.addEventListener('click', event => {
            const deleteButton = event.target.closest('.delete-btn');

            if (deleteButton && todoList.contains(deleteButton)) {
                deleteButton.closest('li').remove();
                updateCounter();
                return;
            }

            const li = event.target.closest('li');

            if (li && todoList.contains(li)) {
                li.classList.toggle('completed');
                applyFilter();
                updateCounter();
            }
        });

        // Filter buttons.
        filterAll.addEventListener('click', () => {
            currentFilter = 'all';
            applyFilter();
        });

        filterActive.addEventListener('click', () => {
            currentFilter = 'active';
            applyFilter();
        });

        filterDone.addEventListener('click', () => {
            currentFilter = 'done';
            applyFilter();
        });

        // Initial state.
        errorMsg.hidden = true;
        updateCounter();
        applyFilter();
    });
})();
