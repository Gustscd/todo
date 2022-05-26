const addForm = document.querySelector('.add')
const list = document.querySelector('.todos')
const deleteBtn = document.querySelectorAll('.delete');
const search = document.querySelector('.search input');

function save()
{
    var list = document.querySelector('.todos');
    localStorage.setItem('todoList', list.innerHTML);
}

function get() {
    var storedValue = localStorage.getItem('todoList');
    if(storedValue) {
        list.innerHTML = storedValue;
    }
}

get();

const generateTemplate = todo =>{
    if (todo.length)
    {
        const html = `<li class="list-group-item d-flex justify-content-between align-items-center"><span>${todo}</span><i class="far fa-trash-alt delete"></i></li>`
        list.innerHTML += html;
        addForm.reset();
    }
}

addForm.addEventListener('submit', e => {
    e.preventDefault();
    const todo = addForm.add.value.trim();
    generateTemplate(todo);
    save();
})

list.addEventListener('click', e => {
    if (e.target.classList.contains('delete'))
    {
        e.target.parentElement.remove();
        save();
    }
});

const filterTodos = (term) => {
    Array.from(list.children)
        .filter(todo => !todo.textContent.includes(term))
        .forEach(todo => todo.classList.add('filtered'));
    
    Array.from(list.children)
        .filter(todo => todo.textContent.includes(term))
        .forEach(todo => todo.classList.remove('filtered'));
}


search.addEventListener('keyup', e => {
    const term = search.value.trim();
    filterTodos(term);
})