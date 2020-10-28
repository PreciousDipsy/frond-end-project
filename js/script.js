const listsContainer = document.quesry.Selector('[data-lists]')

let lists = ['name', 'todo']

function render() {
    <li class="list-name">Lightroom</li>
    clearElement(listsContainer)
    lists.forEach(list => {
        const listElement = document.createElement('li')
        listElement.classList.add("list-name")
        listElement.innerText = list
        listsContainer.appendChild(listElement)
    })
}

function clearElement(element){

}
render()