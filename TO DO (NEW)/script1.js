/**
 * @param {Event} e
 */


//constructor function of arr obj
function card(task) {
    this.task_name =  task,
    this.array =  []
}

function item (obj_name) {
     this.name = obj_name,
     this.type = "unchecked"
}


// arr(storage purpose)
let arr = [
    {
        task_name: "demo task 1",
        array: [
            {
                name: "demo list 1",
                type: "unchecked"
            },
            {
                name: "demo list 2",
                type: "unchecked"
            }
        ]
    },
    {
        task_name: "demo task 2",
        array: [
            {
                name: "demo list 1",
                type: "unchecked"
            },
            {
                name: "demo list 2",
                type: "unchecked"
            }
        ]
    },
    {
        task_name: "demo task 3",
        array: [
            {
                name: "demo list 1",
                type: "unchecked"
            },
            {
                name: "demo list 2",
                type: "unchecked"
            }
        ]
    }
];

const saved = localStorage.getItem('taskList');


if(saved){
    arr = JSON.parse(saved);
}

// saving html dom 

if(arr.length > 0){
    for (x of arr ) {
        create_todo_list(x.task_name);
    }
}


// list used in todo_list
function create_todo_list(task_name) {
    
    const list =document.querySelector("#todo_list");

    const li = document.createElement("li");
    li.addEventListener('click',function(e){

            if (e.target.tagName == 'LI'){
            create_card(e.target.textContent)}
    });
   
    const text = document.createTextNode(task_name);
    
    const dlt = document.createElement('i');
    dlt.className = "bi bi-x"; 
    dlt.addEventListener("click", remove);

    const edt = document.createElement('i');
    edt.className = "bi bi-pencil-fill"; 
    edt.addEventListener("click",edit);

    
    li.append(text,edt,dlt);
    list.prepend(li);

    create_card(task_name);

   
    
}

// create todo_list items
function todo_list(e) {
    const input = document.getElementById("todo");
    let input_value = input.value;

    for (x of arr) {
        if (input_value == x.task_name) {
            input_value = null;
            document.querySelector("#repeat").style.display="block";
            setTimeout(repeat,3000);
            break;
        }
    }

   if (input_value){
        create_todo_list(input_value);
        const arr_obj = new card(input_value);

        arr.push(arr_obj);
        
    }
     
    input.value = null;
    e.preventDefault();
    
}

//list used in todo_card
function create_sub_list (items) {
    
    const card = document.querySelector("#card");
    const li = document.createElement("li");

    const checkbox = document.createElement("i");
    checkbox.className="bi-circle";
    checkbox.addEventListener('click',done);

    const text = document.createTextNode(items);

    const edt = document.createElement('i');
    edt.className = "bi bi-pencil-fill"; 
    edt.addEventListener("click",edit);

    li.append(checkbox,text,edt);
    card.appendChild(li);

   
    
}


//for creating card
function create_card(task_name) {
    
    const card = document.querySelector("#card");
    card.textContent="";

    const header = document.createElement("div");
    header.id="header";
    
    const heading = document.createElement("h2");
    heading.textContent = task_name;

    const dlt = document.createElement('i');
    dlt.className = "bi bi-trash";
    dlt.addEventListener("click", remove_sublist);


    const form = document.createElement("form");
    form.addEventListener("submit",sub_list);

    const input = document.createElement("input");
    input.type="text"; input.placeholder="add items";
    input.id =  "sub_list_items"; input.maxLength="100";
    input.pattern="[A-Za-z0-9]+.*";
    const submit = document.createElement("input");
    submit.type="submit"; submit.value="add";
    
    header.append(heading,dlt);
    form.append(input,submit);
    card.append(header,form);
   
     for(x of arr){
        if(x.task_name == task_name){

            for(y of x.array) {
                
                create_sub_list(y.name);

                if (y.type == "checked") {
                   card.lastChild.className="li-c";
                    card.lastChild.firstChild.className= "bi-check-circle"; 
                }
            } 
        }
    }
    highlight();
   
}


// create sub list items
function sub_list(e) {
   
    const input = document.getElementById("sub_list_items");
    let input_value = input.value;
    const task_name = document.querySelector('h2').textContent;

    for (x of arr) {
        if (task_name == x.task_name) {
            for (y of x.array) {
                if (input_value == y.name){
                    input_value=null;
                    document.querySelector("#repeat").style.display="block";
                    setTimeout(repeat,3000);
                    break;
                }
            }
            
        }
    }
    if (input_value){

        create_sub_list(input_value);

        const array_obj = new item(input_value);

        const task_name = e.target.parentNode.firstChild.textContent;
        for(x of arr) {
            if (x.task_name == task_name) {

                x.array.push(array_obj);
                break;
                
            }
        }
   
    }
        
    input.value = null;
    e.preventDefault();
}

//checkbox 
function done(e) {
    
    const name = e.target.parentNode.textContent;
    const task_name = document.querySelector('h2').textContent;
    
    for ( x of arr) {

        if (x.task_name == task_name) { 

            for (y of x.array) {

                if (y.name == name && y.type== "unchecked") {

                    y.type = "checked";
                   
                    e.target.parentNode.className = "li-c";
                    e.target.className = "bi-check-circle";
                    break;
                }
                else if (y.name == name && y.type== "checked"){
                    y.type = "unchecked";
                   
                    e.target.parentNode.className = "";
                    e.target.className = "bi-circle";
                }
            }
        }
    }
}
 
//deleting task
function remove(e) {

    const task_name = e.target.parentNode.textContent;
    const card_heading =  document.querySelector('h2').textContent;
    for (x of arr){
        if (x.task_name == task_name) {
                const i = arr.indexOf(x);
                arr.splice(i,1);
                break;
         }
    }
    
    if ( arr.length == 0) {
        document.querySelector("#card").textContent="";
    }
    else if (card_heading == task_name ){
        create_card(arr[0].task_name);
    }
    e.target.parentNode.remove();
}


// deleting sublist
function remove_sublist(){
    const task_name = document.querySelector('h2').textContent;
    for (x of arr) {
        if (x.task_name == task_name) {
            x.array = [];
           create_card(task_name);
           break;
        }
    }
    
}

// edit task  
function edit(e) {
    const heading = document.querySelector("h2").textContent;
    const icon = e.target;
    icon.style.display = "none";

   const list=  e.target.parentNode;
   const task_name = list.textContent;
   
    const form = document.createElement("form");
    const input = document.createElement("input");
    input.type="text"; input.value=task_name;
    input.maxLength="100"; input.pattern="[A-Za-z0-9]+.*";
    const button = document.createElement("input");
    button.type="submit"; button.value="save";

    form.append( input, button );
    list.append( form );

    form.addEventListener("submit",function(e){
        if (list.parentNode.tagName == "UL") {
            
            for (x of arr) {
                if (x.task_name == input.value){
                    document.querySelector("#repeat").style.display="block";
                    setTimeout(repeat,3000);
                    break;
                }
                else if (x.task_name == task_name) {
                    list.childNodes[0].nodeValue= input.value;
                    x.task_name = input.value;
                    if (task_name == heading){
                        document.querySelector("h2").textContent = input.value;
                    }
                }
            }
        }

        else {
           
            for (x of arr) {
                
                if (x.task_name == heading) {
                    for( y of x.array) {
                        if (y.name == input.value) {
                            document.querySelector("#repeat").style.display="block";
                            setTimeout(repeat,3000);
                            break;
                        }
                        else if (y.name == task_name){
                            list.childNodes[1].nodeValue = input.value;
                            y.name = input.value;
                        }
                    }
                }
            }
        }
        list.removeChild(form);
        icon.style.display = "inline-block";
        e.preventDefault();
    })
   
}

// highlighting ul item 
function highlight () {
    const heading = document.querySelector("h2").textContent;
    const active = document.querySelector("ul").childNodes;
    for (x of active){
        if (x.textContent == heading ){
            x.className="active";
        }
        else {
            x.className="";
        }
    }
}


//alert msg
function repeat() {
    document.querySelector("#repeat").style.display="none";
}

//event listeners

const form1 = document.querySelector('#form1');
form1.addEventListener('submit', todo_list);


window.addEventListener("unload",function () {
    const arr_string = JSON.stringify(arr);
    localStorage.setItem("taskList", arr_string);
});
