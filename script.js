const input = document.getElementById('taskInput');
const addBouton = document.getElementById('addBtn');

const btnTout = document.querySelector('#allTask');
const btnEnCours = document.querySelector('#enCours');
const btnDone = document.querySelector('#doneTask');

const taskList = document.getElementById('taskList');

//fonction f0 vérification si input vide
function isInputVide(){
	if(!input.value.trim()){
		return true;
	} else {
		return false;
	}
}
//fonction f0' blockage bouton ajout si input vide
function blockAddBtn(){
	if(isInputVide()){
		addBouton.disabled = true;
	} else {
		addBouton.disabled = false;
	}
}
blockAddBtn();
input.addEventListener('input',blockAddBtn);

//initialisation task vide
let tasks = [];

//fonction rattaché au bouton Ajouter qui modifie tasks
//après an'le push() no tokony misy fonction saveTasks
addBouton.addEventListener('click',()=>{
	const inputText = input.value.trim();
	const date = new Date().toLocaleString();
	tasks.push({
		text: inputText,
		date: date,
		completed: false,
	});
	saveTasks();
	renderTasks(tasks);
	console.log(tasks);
	input.value = "";
	blockAddBtn();
	btnTout.classList.add('active');
	btnEnCours.classList.remove('active');
	btnDone.classList.remove('active');
});

//fonction save tasks
function saveTasks(){
	localStorage.setItem('tasks',JSON.stringify(tasks));
}

//fonction pour lire les taches une fois que la page s'actualise ou réouverte
function loadTasks(){
	const savedTasks = localStorage.getItem('tasks');
	if (savedTasks){
		tasks = JSON.parse(savedTasks);
		}
	renderTasks(tasks);
}
//fonction pour afficher les tâches sur le DOM + bouton suppression
function renderTasks(array){
	taskList.textContent = "";
	array.forEach((el,index)=>{
		const li = document.createElement('li');
		const spanText = document.createElement('span');
		const spanDate = document.createElement('span');
		const supprBtn = document.createElement('button');
		supprBtn.addEventListener('click',()=>{
			event.stopPropagation();
			array.splice(index,1);
			renderTasks(array);
			saveTasks();
		});
		li.addEventListener('click',()=>{
			array[index].completed = !array[index].completed;
			saveTasks();
			renderTasks(array);
		});
		if(el.completed){
			li.classList.add('done');
		}
		spanText.textContent = el.text;
		spanDate.textContent = el.date;
		supprBtn.textContent = 'x';
		li.appendChild(spanText);
		li.appendChild(spanDate);
		li.appendChild(supprBtn);
		taskList.appendChild(li);
	});
}

//filtre tout 
btnTout.addEventListener('click',()=>{
	renderTasks(tasks);
	btnTout.classList.add('active');
	btnEnCours.classList.remove('active');
	btnDone.classList.remove('active');
});

//filtre En cours
btnEnCours.addEventListener('click',()=>{
	const enCoursTasks = tasks.filter(el => el.completed === false);
	renderTasks(enCoursTasks);
	btnTout.classList.remove('active');
	btnEnCours.classList.add('active');
	btnDone.classList.remove('active');
});
// filtre Terminé
btnDone.addEventListener('click',()=>{
	const taskDone = tasks.filter(el=>el.completed === true);
	renderTasks(taskDone);
	btnDone.classList.add('active');
	btnTout.classList.remove('active');
	btnEnCours.classList.remove('active');
})

loadTasks();