var dropMenu = document.getElementById('drop-menu');
var dropMenuTwo = document.getElementById('drop-menu-2'); 
dropMenuTwo.addEventListener('change', calculateActiveStudents);

function openDropMenu(drop1, drop2){
    
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

function calculateActiveStudents(){
    var headOffice = dropMenu.value;
var headOfficeClasses = dropMenuTwo.value;
    var activeStudents=[];
    var inactiveStudents=[];
    var printDropOut = document.getElementById('drop-out');
    var printActiveStudents = document.getElementById('enrolment');
for (i in data[headOffice][headOfficeClasses]['students']){
    var teamActivity = data[headOffice][headOfficeClasses]['students'][i]['active'];    
    var activeTeam;
            var inactiveTeam;
            if (teamActivity === true){
                activeStudents.push(teamActivity);
                activeTeam = activeStudents.length;                
            }else{
                inactiveStudents.push(teamActivity);
                inactiveTeam = inactiveStudents.length;
            }
            var total = inactiveTeam + activeTeam;            
            var dropOut = (inactiveTeam * 100)/total;           
            printDropOut.innerHTML=dropOut.toFixed(1) + '% <br> Porcentagem de alunas inativas';
            printActiveStudents.innerHTML=activeTeam + '<br> Número de alunas ativas';
    
}

calculateJediMedia();
calculateTeacherMedia();
caculateNetPromoterScore();
satisfied();
AboveGradeStudents();
}
 
function calculateJediMedia(){
    var headOffice = dropMenu.value;
    var headOfficeClasses = dropMenuTwo.value;
    var jediMediaArray = [];
    var showJediMedia = document.getElementById('jedi-media');
    
    
    for (i in data[headOffice][headOfficeClasses]['ratings']){
        var jedinote = data[headOffice][headOfficeClasses]['ratings'][i]['jedi'];
            jediMediaArray.push(jedinote);
            console.log(jediMediaArray)          
            var sum =0;
            for(var k=0; k<jediMediaArray.length; k++){
                sum += jediMediaArray[k];
                console.log(sum)
                var note = sum /jediMediaArray.length;
                console.log(note)
            }
            
        }
         showJediMedia.innerHTML = note.toFixed(1) + '<br> Media dos Jedis';
            
        }

function calculateTeacherMedia(){
    var headOffice = dropMenu.value;
    var headOfficeClasses = dropMenuTwo.value;
    var teacherMediaArray = [];
    var showMentorMedia = document.getElementById('mentors-media');
    for (i in data[headOffice][headOfficeClasses]['ratings']){
        var teacherNote = data[headOffice][headOfficeClasses]['ratings'][i]['teacher'];
            teacherMediaArray.push(teacherNote);
            console.log(teacherMediaArray)          
            var sum =0;
            for(var k=0; k<teacherMediaArray.length; k++){
                sum += teacherMediaArray[k];
                console.log(sum)
                var note = sum /teacherMediaArray.length;
                console.log(note)
            }
            showMentorMedia.innerHTML = note.toFixed(1) + '<br> Media dos Mentores';
            
        }

}

function caculateNetPromoterScore(){
   var total = [];
    var promoters = 0;
    var detractors = 0;
    var headOffice = dropMenu.value;
    var headOfficeClasses = dropMenuTwo.value;
    

    for (i in data[headOffice][headOfficeClasses]['ratings']){
        promoters += data[headOffice][headOfficeClasses]['ratings'][i]['nps']['promoters'];
        detractors += data[headOffice][headOfficeClasses]['ratings'][i]['nps']['detractors'];
        total.push(data[headOffice][headOfficeClasses]['ratings'][i]['nps']['promoters'])
        
        var nps = (promoters - detractors)/total.length;   
        
        
document.getElementById('nps').innerHTML = nps.toFixed(1) + '% <br> alunas indicam a Laboratória';
        
            
        }

}


function satisfied(){
    var headOffice = dropMenu.value;
   var headOfficeClasses = dropMenuTwo.value;
   var ratingsStudent;
    var ratingsStudentArray = [];
    var cumple = 0;
    var supera = 0;
    var totalSatisfied;
    for (i in data[headOffice][headOfficeClasses]['ratings']){
      ratingsStudent =    data[headOffice][headOfficeClasses]["ratings"][i]["student"];
     ratingsStudentArray.push(ratingsStudent);
    console.log(ratingsStudentArray.length);    
      cumple += ratingsStudent.cumple;
      supera += ratingsStudent.supera;
     totalSatisfied = (cumple + supera)/ratingsStudentArray.length;
     
document.getElementById('supera').innerHTML = totalSatisfied.toFixed(1) + '% <br> das alunas estão satisfeitas com a Laboratória';
     
    }    
}

function AboveGradeStudents(){
    var headOffice = dropMenu.value;
    var headOfficeClasses = dropMenuTwo.value;
    var sprints;
    var tech;
    var hse;
    var numberOfAboveGrade = 0;
    var percentOfAboveGrade =0;
    var name = [];
    for (student of data[headOffice][headOfficeClasses]["students"]){
      sprints = student.sprints;
       name.push(student.name);
       console.log(name.length);
       var aboveGradeArray = 0;
       for (j in sprints){
         tech = sprints[j].score.tech;
        hse = sprints[j].score.hse;      
         if (tech > 1260 && hse > 840){
           aboveGradeArray += 1;
         }
       } if (aboveGradeArray === sprints.length){
           numberOfAboveGrade += 1;
              
         } var totalPercent = (numberOfAboveGrade*100)/name.length;
    }
          document.getElementById('above-grade').innerHTML = numberOfAboveGrade + '<br> aluna(s) atingiram mais de 70% da média em todos sprints';
          document.getElementById('above-grade-percentual').innerHTML = totalPercent.toFixed(1) + '% <br> das alunas atingiram mais de 70% da média em todos sprints';
    // console.log("quantas passaram", numberOfAboveGrade);
    //        console.log(totalPercent);
           
   }
