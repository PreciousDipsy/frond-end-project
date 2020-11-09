//Getting ul element so that we can append to it
const listsContainer = document.querySelector('[data-lists]');
// Accessing the form so that we can stop the current behaviour of page refresh
const newListForm =document.querySelector('[data-new-list-form]');
// Getting input Information
const newListInput =document.querySelector('[data-new-list-input]');

const deleteListbutton=document.querySelector('[data-delete-list-button]');

const listDisplaycontainer=document.querySelector('[data-list-display-container]');



const listTitleElement=document.querySelector('[data-list-title]');
const listCountElement=document.querySelector('[data-list-count]');
const taskContainer=document.querySelector('[data-tasks]');

const taskTemplate=document.getElementById("task-template");
const newTaskForm=document.querySelector('[data-new-task-form]');
const newTaskInput=document.querySelector('[data-new-task-input]');

// Always copy and paste the written data element from html

const clearCompleteTaskButton = document.querySelector('[data-clear-complete-task-button]');

// Saving into local storage so users can see what is saved permanentaly 
const LOCAL_STORAGE_LIST_KEY='task.lists';
// Creating list element
let lists=JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
//Saving into local storage

// SelectedList
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY ='task.selectedListId';
let selectedListId= localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);


listsContainer.addEventListener('click', e=> {
	if(e.target.tagName.toLowerCase() === 'li'){
		selectedListId = e.target.dataset.listId;
		saveAndRender();
	}
});


taskContainer.addEventListener('click',e=>{
	if(e.target.tagName.toLowerCase() === 'input'){
		const selectedList=lists.find(list=> list.id===selectedListId)
		const selectedTask = selectedList.tasks.find(task=> task.id===e.target.id)
		selectedTask.complete=e.target.checked
		save()
		renderTaskCount(selectedList)
	}
})

clearCompleteTaskButton.addEventListener('click' , e=> {

	const selectedList=lists.find(list=>list.id===selectedListId);

	selectedList.tasks=selectedList.tasks.filter(task=>!task.complete);
	saveAndRender();
});

// Checking submit event of form 
newListForm.addEventListener('submit',e=>{
	e.preventDefault();
	// Preventing the default submit behaviour
	const listName= newListInput.value;
	// Checking if the value is empty.
	if(listName == null || listName === "") 
		{
			return
		}
	// creating a new element list.
	const list = createList(listName);

	// Emptying the value of form input
	newListInput.value=null;


	// Pushing it to the list 
	lists.push(list)
	saveAndRender()
});
deleteListbutton.addEventListener('click',e=>{

	lists =lists.filter(list=> list.id !== selectedListId);
	selectedListId=null;
	saveAndRender();
});

// Creating new list element and returning it.
function createList(listName){

	let obj={

		id:""+Date.now(),
		name:listName,
		tasks:[],
	}
	return obj;
}



function saveAndRender(){
	save();
	render();
}

// saving to local storage
function save(){
	localStorage.setItem(LOCAL_STORAGE_LIST_KEY,JSON.stringify(lists));
	localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY,selectedListId);

}



function render(){
	//clearing elements
	clearElement(listsContainer);
	// Clearing elements

	renderLists();

	const selectedList=lists.find(list=>list.id===selectedListId)

	if (selectedListId==null) {
		listDisplaycontainer.style.display="none";
	}
		else{
			listDisplaycontainer.style.display='';
			listTitleElement.innerText=selectedList.name;
			renderTaskCount(selectedList);
			clearElement(taskContainer);
			renderTasks(selectedList);
		}


}
function renderTasks(selectedList){
	selectedList.tasks.forEach(task=>{
		const taskElement = document.importNode(taskTemplate.content,true);
		const checkbox=taskElement.querySelector('input');
		checkbox.id=task.id;
		checkbox.checked=task.complete;
		const label=taskElement.querySelector('label');
		label.htmlFor=task.id;
		label.append(task.name);
		taskContainer.appendChild(taskElement);
	})
}

function renderTaskCount(selectedList){

	const incompleteTaskCount= selectedList.tasks.filter(task=>!task.complete).length;
	const taskString = incompleteTaskCount===1?"task":"tasks";
	listCountElement.innerText=`${incompleteTaskCount} ${taskString} remaining`;
}

function renderLists(){

		lists.forEach(list=>{

		const listElement=document.createElement('li');
		
		listElement.dataset.listId=list.id;

		listElement.classList.add("list-name");
		listElement.innerText= list.name;

		if(list.id===selectedListId)
		{ 
			listElement.classList.add("active-list");
		}

		listsContainer.appendChild(listElement);

	});

}


// Removing all elements from list
function clearElement(element){

	while(element.firstChild){
		element.removeChild(element.firstChild);
	}
}


newTaskForm.addEventListener('submit',e=>{
	e.preventDefault();
	// Preventing the default submit behaviour
	const taskName= newTaskInput.value;
	// Checking if the value is empty.
	if(taskName == null || taskName === "") 
		{
			return
		}
	// creating a new element list.
	const task = createTask(taskName);

	// Emptying the value of form input
	newTaskInput.value=null;


	// Pushing it to the list 
	const selectedList=lists.find(list=>list.id===selectedListId);
	selectedList.tasks.push(task);

	saveAndRender()
});


function createTask(name){

	let obj={

		id:""+Date.now(),
		name:name,
		complete:false,
	}
	return obj;
}

render();