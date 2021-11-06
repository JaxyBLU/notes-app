
const allNotes = JSON.parse(localStorage.getItem('notes'));

if(allNotes.length > 0){
	allNotes.forEach((notenow)=>{
		addNewNote(notenow);
	});
} else {
	addNewNote("");
}



/*=========================  Function for adding new empty note =============================*/
function addNewNote(text = ""){
	const newNote = document.createElement('div');
	newNote.classList.add('note');

	newNote.innerHTML = `
		<div class="tools">
			<button id="addnote" class="addnote"><i class="fas fa-plus"></i></button>
			<button id="editnote"><i class="fas fa-pencil-alt"></i></i></button>
			<button id="deletenote"><i class="far fa-trash-alt"></i></button>
		</div>
		
		<div class="textplace ${text? "" : "hidden"}"></div>
		<textarea class="${text? "hidden" : ""}"></textarea>
	`;

	document.body.appendChild(newNote);

	const addnewBtn = newNote.children[0].children[0];
	const deleteNoteBtn = newNote.children[0].children[2];
	const editBtn = newNote.children[0].children[1];
	const textDiv = newNote.children[1];
	const textArea = newNote.children[2];

	textArea.value = text;
	textDiv.innerHTML = text;

	addnewBtn.addEventListener('click', ()=>{
		addNewNote();
	})

	deleteNoteBtn.addEventListener('click', ()=>{
		newNote.remove();
		updateStorage();
	})

	editBtn.addEventListener('click', ()=>{
		textDiv.classList.toggle('hidden');
		textArea.classList.toggle('hidden');
	})

	textArea.addEventListener('input', (e)=>{
		const {value} = e.target;

		textDiv.innerHTML = marked(value);

		updateStorage();
	})
}

/* ======================== Function for updating Local Storage in case of any changes ===========*/

function updateStorage(){
	const notesText = document.querySelectorAll('textarea');

	const notes = [];

	notesText.forEach((note)=>{
		notes.push(note.value);
	});

	localStorage.setItem('notes', JSON.stringify(notes));
}