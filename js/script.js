const listsContainer = document.query.Selector('[data-lists]')
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')

let lists = [{
    id: 1,
    name: 'name'
}, {
    id: 2,
    name: 'todo'
}]

newListForm.addEventListener('submit', e => {
e.preventDefault()
const listName = newListInput.value
if (listName == null || listName === '') return
const list = createList(listName)
newListInput.value = null
lists.push(list)
render()
})

function createList(name) {
    return { id: Date.now().toString(), name: name, tasks: [] }
}

function render() {
    <li class="list-name">Lightroom</li>
    clearElement(listsContainer)
    lists.forEach(list => {
        const listElement = document.createElement('li')
        listElement.dataset.listId = listId
        listElement.classList.add("list-name")
        listElement.innerText = list.name
        listsContainer.appendChild(listElement)
    })
}

function clearElement(element){
    while (element.firstChild) {
        element.removeChild(elemnt.firstChild)
    }

}
render()