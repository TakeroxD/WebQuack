updateEvents();
let newItem = document.getElementById("newItem");
newItem.addEventListener("keyup", function() {
  if (event.keyCode === 13) {
  	console.log("enter");
    event.preventDefault();
   	let newList = document.createElement("li");
   	let newBox = document.createElement("input");
   	newBox.type = "checkbox";
   	newBox.name = "todo";
   	newBox.value = document.getElementById("lista").childElementCount + 1;
   	let newSpan = document.createElement("span");
   	newSpan.classList.add('chores');
   	newSpan.textContent = newItem.value;
   	newList.appendChild(newBox);
   	newList.appendChild(newSpan);
   	document.getElementById("lista").appendChild(newList);
  	newItem.value = "";
  	updateEvents();
  }
});

function updateEvents(){
let checkboxes = document.getElementsByName("todo");
for (let x=0;x<checkboxes.length;x++)
	checkboxes[x].addEventListener("change", function() {
	for(i=0;i<document.getElementById('lista').childElementCount;i++){
		if(checkboxes[i].checked){
			document.getElementsByClassName('chores')[i].classList.add('done');
		}else{
			document.getElementsByClassName('chores')[i].classList.remove('done');
		}
	}
});
}