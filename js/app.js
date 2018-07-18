var dropMenu = document.getElementById('drop-menu');
var dropMenuTwo = document.getElementById('drop-menu-2'); 
dropMenuTwo.addEventListener('change', calculateActiveStudents);

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
function calculateActiveStudents() {
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
        if (teamActivity === true) {
          activeStudents.push(teamActivity);
          activeTeam = activeStudents.length;                
        } else {
            inactiveStudents.push(teamActivity);
            inactiveTeam = inactiveStudents.length;
          }
      var total = inactiveTeam + activeTeam;            
      var dropOut = (inactiveTeam * 100)/total;           
      printDropOut.innerHTML=dropOut.toFixed(1) + '% <br> Alunas inativas';
      printActiveStudents.innerHTML=activeTeam + '<br> Alunas ativas';       
      Highcharts.chart('container', {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: 'Percentual de Alunas Ativas e Inativas'
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: false
              },
              showInLegend: true
            }
          },
          colors: ['#FF009E','#56f89a'],
          series: [{
            name: 'Porcentagem',
            colorByPoint: true,
            data: [{
              name: 'Ativas',
              y: (100 - dropOut),
              sliced: true,
              selected: true
            }, {
              name: 'Inativas',
              y: dropOut
            }]
          }]
        });   
    }
  calculateJediMedia();
  calculateTeacherMedia();
  caculateNetPromoterScore();
  satisfied();
  aboveGradeStudents();
  aboveGradeHse();
  aboveGradeTech();
} 
function calculateJediMedia() {
  var headOffice = dropMenu.value;
  var headOfficeClasses = dropMenuTwo.value;
  var jediMediaArray = [];
  var showJediMedia = document.getElementById('jedi-media');
  for (i in data[headOffice][headOfficeClasses]['ratings']){
    var jedinote = data[headOffice][headOfficeClasses]['ratings'][i]['jedi'];
    jediMediaArray.push(jedinote);                 
    var sum =0;
    for(var k=0; k<jediMediaArray.length; k++){
      sum += jediMediaArray[k];                
      var note = sum /jediMediaArray.length;                
    }            
  }
  showJediMedia.innerHTML = note.toFixed(1) + '<br> Media dos Jedis';       
  Highcharts.chart('container-4', {
    title: {
      text: 'Media Jedi Master'
    },
    yAxis: {
      title: {
        text: 'Media'
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 1
      }
    },
    colors: ['#FF009E'],
  
    series: [{
      name: 'Media',
      data: jediMediaArray
    } 
    ],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  });
}
function calculateTeacherMedia() {
  var headOffice = dropMenu.value;
  var headOfficeClasses = dropMenuTwo.value;
  var teacherMediaArray = [];
  var showMentorMedia = document.getElementById('mentors-media');
  for (i in data[headOffice][headOfficeClasses]['ratings']){
    var teacherNote = data[headOffice][headOfficeClasses]['ratings'][i]['teacher'];
    teacherMediaArray.push(teacherNote);         
    var sum =0;
    for(var k=0; k<teacherMediaArray.length; k++){
      sum += teacherMediaArray[k];
      var note = sum /teacherMediaArray.length;
    }
  showMentorMedia.innerHTML = note.toFixed(1) + '<br> Media dos Mentores';        
  }
  Highcharts.chart('container-3', {
    title: {
      text: 'Media Mentores'
    },
    yAxis: {
      title: {
        text: 'Media'
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 1
      }
    },
    colors: ['#56f89a'],
    series: [{
      name: 'Media',
      data: teacherMediaArray
    }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  });
}
function caculateNetPromoterScore() {
  var total = [];
  var promoters = 0;
  var detractors = 0;
  var headOffice = dropMenu.value;
  var headOfficeClasses = dropMenuTwo.value;
  for (i in data[headOffice][headOfficeClasses]['ratings']){
    promoters += data[headOffice][headOfficeClasses]['ratings'][i]['nps']['promoters'];
    detractors += data[headOffice][headOfficeClasses]['ratings'][i]['nps']['detractors'];
    total.push(data[headOffice][headOfficeClasses]['ratings'][i]['nps']['promoters']);
    var nps = (promoters - detractors)/total.length;   
    document.getElementById('nps').innerHTML = nps.toFixed(1) + '% <br> Alunas que indicam a Laboratória';
  }
  Highcharts.chart('container-8', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'NET PROMOTERS SCORE'
    },
    colors:['#FF009E','#56f89a'],
    xAxis: {
      categories: [
        '',
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Notas (%)'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Alunas que indicam a Laboratória',
      data: [nps]
  
    }, {
      name: 'Alunas que indicam a Laboratória',
      data: [(100-nps)]
    }]
  });
}
function satisfied() {
  var headOffice = dropMenu.value;
  var headOfficeClasses = dropMenuTwo.value;
  var ratingsStudent;
  var ratingsStudentArray = [];
  var cumple = 0;
  var supera = 0;
  var totalSatisfied;
  for(i in data[headOffice][headOfficeClasses]['ratings']){
    ratingsStudent =    data[headOffice][headOfficeClasses]["ratings"][i]["student"];
    ratingsStudentArray.push(ratingsStudent);   
    cumple += ratingsStudent.cumple;
    supera += ratingsStudent.supera;
    totalSatisfied = (cumple + supera)/ratingsStudentArray.length;
    document.getElementById('supera').innerHTML = totalSatisfied.toFixed(1) + '% <br> Alunas satisfeitas com a Laboratória';     
  } 
  Highcharts.chart('container-5', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Taxa de Satisfação'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      colors: ['#FF009E','#56f89a'],
      series: [{
        name: 'Porcentagem',
        colorByPoint: true,
        data: [{
          name: 'Satisfeitas',
          y:totalSatisfied ,
          sliced: true,
          selected: true
        }, {
          name: 'Insatisfeitas',
          y: (100-totalSatisfied)
        }]
      }]
    });   
}
function aboveGradeStudents() {
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
    var aboveGradeArray = 0;
    for (j in sprints){
      tech = sprints[j].score.tech;
      hse = sprints[j].score.hse;      
      if (tech > 1260 && hse > 840){
        aboveGradeArray += 1;
      }
    } 
    if (aboveGradeArray === sprints.length) {
      numberOfAboveGrade += 1;
    } 
    var totalPercent = (numberOfAboveGrade*100)/name.length;
  }
  document.getElementById('above-grade').innerHTML = numberOfAboveGrade + '<br> Alunas que atingiram a média';
  document.getElementById('above-grade-percentual').innerHTML = totalPercent.toFixed(1) + '% <br> Alunas atingiram a média';
    
  Highcharts.chart('container-2', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Percentual de Alunas que Atigiram a Média'
    },
    xAxis: {
      categories: [
        ''
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Porcentagem(%)'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    colors: ['#FF009E','#56f89a'],
    series: [{
      name: 'Alunas Acima da Média',
      data: [(100 - totalPercent)]
    }, {
      name: 'Alunas Abaixo da Média',
      data: [totalPercent]
    }]
  });          
}
function aboveGradeTech() {
  var headOffice = dropMenu.value;
  var headOfficeClasses = dropMenuTwo.value;
  var sprints;
  var tech;
  var name = [];
  var techMinArray = 0;
  var numberOfMinTech = 0;
  var totalPercentTech;
  for (student of data[headOffice][headOfficeClasses]["students"]) {
    sprints = student.sprints;
    name.push(student.name);
    for (i in sprints){
      tech = sprints[i].score.tech;
      if (tech > 1260){
        techMinArray += 1;      
      }
      if (techMinArray === sprints.length){
        numberOfMinTech += 1;
      }          
    }
  } 
  totalPercentTech = (numberOfMinTech*100)/name.length;
  document.getElementById('above-tech').innerHTML = totalPercentTech.toFixed(1) + '% <br> Alunas que excedem a média Tech' ;  
  document.getElementById('above-tech-1').innerHTML = numberOfMinTech + '<br> Quantidade de Alunas que excedem a média Tech' ;
  Highcharts.chart('container-6', {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Alunas acima da média(HSE)'
  },
  colors:['#FF009E','#56f89a'],
  xAxis: {
    categories: [
      '',
    ],
    crosshair: true
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Notas (%)'
    }
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0
    }
  },
  series: [{
    name: 'Acima da Média',
    data: [totalPercentTech]

  }, {
    name: 'Abaixo da Média',
    data: [(100-totalPercentTech)]
  }]
});
}
function aboveGradeHse(){
  var headOffice = dropMenu.value;
  var headOfficeClasses = dropMenuTwo.value;
  var sprints;
  var hse;
  var name = [];
  var hseMinArray = 0;
  var numberOfMinHse = 0;
  var totalPercentHse;
  for (student of data[headOffice][headOfficeClasses]["students"]){
    sprints = student.sprints;
    name.push(student.name);
    for (i in sprints) {
      hse = sprints[i].score.hse;
      if (hse > 840) {
        hseMinArray += 1;
      }
      if (hseMinArray === sprints.length){
        numberOfMinHse += 1;
      }          
    }
  } 
  totalPercentHse = (numberOfMinHse*100)/name.length;  
  document.getElementById('above-hse').innerHTML = totalPercentHse.toFixed(1) + '% <br> Alunas que excedem a média HSE' 
  document.getElementById('above-hse-1').innerHTML = numberOfMinHse + '<br> Quantidade de alunas que excedem a média HSE'
  Highcharts.chart('container-7', {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Alunas acima da média(HSE)'
  },
  colors:['#FF009E','#56f89a'],
  xAxis: {
    categories: [
      '',
    ],
    crosshair: true
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Notas (%)'
    }
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0
    }
  },
  series: [{
    name: 'Acima da Média',
    data: [totalPercentHse]

  }, {
    name: 'Abaixo da Média',
    data: [(100-totalPercentHse)]
  }]
});
}

