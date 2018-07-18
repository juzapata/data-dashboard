var dropMenu = document.getElementById('drop-menu');
var dropMenuTwo = document.getElementById('drop-menu-2'); 
dropMenuTwo.addEventListener('change', students);

function openDropMenu(drop1, drop2) {
  var drop1 = document.getElementById(drop1);
  var drop2 = document.getElementById(drop2);
  drop2.innerHTML = '';
  var blankSpace = document.createElement('option');
  blankSpace.innerHTML = 'SELECIONE A TURMA';
  drop2.appendChild(blankSpace);
  for(option in data[drop1.value]){
    var newOption = document.createElement('option');
    newOption.value = option;
    newOption.innerHTML = option;
    drop2.appendChild(newOption); 
  }  
}

function students() {
    var headOffice = dropMenu.value;
    var headOfficeClasses = dropMenuTwo.value;
    var name = '';
    var active = '';
    var div = document.getElementById('students-profile');
    
    
  
    for (student of data[headOffice][headOfficeClasses]["students"]){
    name = student.name;
    var newDiv = document.createElement('div');
    var newDiv2 = document.createElement('div');
    var h1 = document.createElement('h1');
    var img = document.createElement('img');
    h1.innerHTML = name;
    img.src = 'assets/images/laboratoria.png'
    newDiv.appendChild(img);
    div.appendChild(newDiv);
    newDiv2.appendChild(h1);
    
    console.log("Nome: " + name);
      active = student.active;
       if (active === true){
        var isActive = document.createElement('p');
        isActive.style.backgroundColor = '#56f89a';
        isActive.innerHTML = "Aluna Ativa"
        newDiv2.appendChild(isActive)
        newDiv.appendChild(newDiv2); 
         console.log("Ativa");    
       } else if (active === false){
        var isInactive = document.createElement('p');
        isInactive.innerHTML = "Aluna Inativa";
        isInactive.style.backgroundColor = '#FF009E';
        newDiv2.appendChild(isInactive);
        newDiv.appendChild(newDiv2);
         console.log("Inativa");
       }
       
    }
     
     
   }

 


