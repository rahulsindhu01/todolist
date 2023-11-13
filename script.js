const InputBox = document.getElementById("input-box");

const ListContainer = document.getElementById("listContainer");


function addTask(){
    if(InputBox.value === ''){
        alert("You must write something");
    }
    else{
        let li = document.createElement("li")
        li.innerHTML = InputBox.value;
        ListContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"
        li.appendChild(span)
    }
    InputBox.value = "";
    saveData();
}

ListContainer.addEventListener("click", function(e){
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);



function saveData(){
    localStorage.setItem("data", ListContainer.innerHTML)

}

function showTask(){
    ListContainer.innerHTML = localStorage.getItem("data");
}
showTask();