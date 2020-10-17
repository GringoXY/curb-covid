
var api_corona = [];
var infected = [];
var deceased = [];
var info_regions = [];
var get_data = new Date();
var month = get_data.getMonth() + 1
var current_data = "2020-"+month+"-"+ get_data.getDate();
var date_for_two_weeks = get_data.getDate() - 14;
var str1 = "0";
var fixed_date ="";
var data_for_two_weeks ="";
if (date_for_two_weeks <= 0){
    date_for_two_weeks = 30 - Math.abs(get_data.getDate() - 14) ;
    month -=1;
}
(month <10)? month = str1.concat(month):"";
(date_for_two_weeks < 10)? data_for_two_weeks = "2020-"+month+"-"+ str1.concat(date_for_two_weeks): data_for_two_weeks = "2020-"+month+"-"+date_for_two_weeks;

document.querySelector("#data").innerHTML = current_data;
document.querySelector("#for_two_weeks").innerHTML = data_for_two_weeks;

function gototab(reload)
   {
    window.location.hash = '#search';
    window.location.reload(true);
 }


/// dane z ministestwa zdrowia
url = "https://api.apify.com/v2/key-value-stores/3Po6TV7wTht4vIEid/records/LATEST?disableRedirect=true";
fetch(url)
    .then(res => res.json())
    .then((out) => {
         api_corona.push(out);

        
         infected.push(api_corona[0].infected);
         
         deceased = api_corona[0].deceased;
         info_regions = api_corona[0].infectedByRegion;
}).catch(err => console.error(err));

setTimeout(() => {  
  document.querySelector("#infected").innerHTML = infected;
  document.querySelector("#deceased").innerHTML = deceased;
  


}, 1000);

var full_array_wojewodztwa = new Array();
var complex_api = [];
  
var days = new Array();
var cases = new Array();


// liczba przyadków dziennie z okresu dwa tygodnie  wykres api nie rządowe
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://api.covid19api.com/country/poland/status/confirmed/live?from="+data_for_two_weeks+"T00:00:00Z&to="+current_data+"T00:00:00Z", requestOptions)
    .then(response => response.text())
    .then(result => {result;
        complex_api.push(JSON.parse(result));
       
       
       
       for ( var i = 0;i < complex_api[0].length;i++) {
        days.push(complex_api[0][i].Date.substring(0, 10));
        cases.push(complex_api[0][i].Cases)
        
        
        
    }
    })
   
    .catch(error => console.log('error', error));



    setTimeout(() => {  
        
        
        

        var chart = new Chart('chart1', {
          type: 'line',
          data: {
            labels: days,
            datasets: [
              {
                data: cases,
                borderColor: '#af90ca',
                backgroundColor: '#af90ca',
                fill: true,
                label: 'Total infected in two weeks',
                lineTension: 0
              }
            ]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: false
                }
              }]
            }
          }
        });
        
        
    
    
    
    }, 1000);

var from_march_until_now = new Array();
var days_from_march_until_now = new Array();
var cases_from_march_until_now = new Array();

// liczba przyapdkow dziennie od początku kwarantyny
fetch("https://api.covid19api.com/country/poland/status/confirmed/live?from=2020-03-01T00:00:00Z&to="+current_data+"T00:00:00Z", requestOptions)
    .then(response => response.text())
    .then(result => {result;
        from_march_until_now.push(JSON.parse(result));
       
      
       
       for ( var i = 0;i < from_march_until_now[0].length;i++) {
        days_from_march_until_now.push(from_march_until_now[0][i].Date.substring(0, 10));
        cases_from_march_until_now.push(from_march_until_now[0][i].Cases)
        
        
        
    }
    })
   
    .catch(error => console.log('error', error));



    setTimeout(() => {  
        
        
        
   

        var chart = new Chart('chart2', {
          type: 'line',
          data: {
            labels: days_from_march_until_now,
            datasets: [
              {
                data: cases_from_march_until_now,
                borderColor: '#af90ca',
                backgroundColor: '#af90ca',
                fill: true,
                label: 'Total infected all time',
                lineTension: 0
              }
            ]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
        
        
    
    
    
    }, 1000);

//liczba przyapdkow na wojewodztwa ogółem źródło ministerswo zdrowia
var array_wojewodztwa = new Array();
var infected_array_wojewodztwa = new Array();
var deceased_array_wojewodztwa = new Array();
var name_wojewodztwa = new Array();
fetch("https://api.apify.com/v2/key-value-stores/3Po6TV7wTht4vIEid/records/LATEST?disableRedirect=true", requestOptions)
    .then(response => response.text())
    .then(result => {result;
        array_wojewodztwa.push(JSON.parse(result));
       
      
      for (var j = 0; j < array_wojewodztwa[0].infectedByRegion.length;j++) {
        infected_array_wojewodztwa.push(array_wojewodztwa[0].infectedByRegion[j].infectedCount);
        deceased_array_wojewodztwa.push(array_wojewodztwa[0].infectedByRegion[j].deceasedCount);
        name_wojewodztwa.push(array_wojewodztwa[0].infectedByRegion[j].region);
        
      }
       
     
    })
   
    .catch(error => console.log('error', error));



    setTimeout(() => {  
        
      let myChart = document.getElementById('chart3').getContext('2d');

    
      Chart.defaults.global.defaultFontFamily = 'Lato';
      Chart.defaults.global.defaultFontSize = 18;
      Chart.defaults.global.defaultFontColor = '#777';
  
      let massPopChart = new Chart(myChart, {
        type:'bar', 
        data:{
          labels:name_wojewodztwa,
          datasets:[{
            label:'Infected',
            data:infected_array_wojewodztwa,
        
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)'
            ],
            borderWidth:1,
            borderColor:'#777',
            hoverBorderWidth:3,
            hoverBorderColor:'#000'
          },
          {
            label:'Deceased',
            data:deceased_array_wojewodztwa,
           
            backgroundColor:'red',
            borderWidth:1,
            borderColor:'#777',
            hoverBorderWidth:3,
            hoverBorderColor:'#000'
          }]
        },
        options:{
          title:{
            display:true,
            text:'Overall Coronavirus in voievoideships',
            fontSize:25
          },
          legend:{
            display:true,
            position:'right',
            labels:{
              fontColor:'#000'
            }
          },
          layout:{
            padding:{
              left:50,
              right:0,
              bottom:0,
              top:0
            }
          },
          tooltips:{
            enabled:true
          }
        }
      });
    }, 1000);
  
    var selected_wojewodztwo = new String;
    var select_id ;
// wartosc z selecta oraz funkcja pokazujaca wykresy dla wybranego wojewodztwa 

var array_selected_wojewodztwo = new Array();
var infected_array_selected_wojewodztwo = new Array();
var deceased_array_selected_wojewodztwo = new Array();
var time_of_data_wojewodztwo = new Array();
var show_chart_wojewodztwo = false;
var fetched_yet = false;
fetch("https://api.apify.com/v2/datasets/L3VCmhMeX0KUQeJto/items?format=json&clean=1", requestOptions)
    .then(response => response.text())
    .then(result => {result;
       full_array_wojewodztwa.push(JSON.parse(result));
       console.log(full_array_wojewodztwa[0][21]);
       fetched_yet = true;
       document.querySelector(".loading").style.display="none";
       document.querySelector("#main").style.display="block";
     
    })

    .catch(error => console.log('error', error));
    var start_loop_wojewodztwo = false;
function value_from_select() {
  document.querySelector(".search").style.display ="none";
  document.querySelector(".reset").style.display ="block";
array_selected_wojewodztwo = new Array();
 infected_array_selected_wojewodztwo = new Array();
 deceased_array_selected_wojewodztwo = new Array();
 time_of_data_wojewodztwo = new Array();

    select_id = document.querySelector("#s").value;
    switch(select_id){
      case '1':
        selected_wojewodztwo ='dolnoslaskie';
        break;
      case '2':
        selected_wojewodztwo ='kujawsko-pomorskie';
        break;
      case '3':
        selected_wojewodztwo ='lubelskie';
        break;
      case '4':
        selected_wojewodztwo ='lubuskie';
        break;
      case '5':
        selected_wojewodztwo ='lodzkie';
        break;
      case '6':
        selected_wojewodztwo ='malopolskie';
        break;
      case '7':
        selected_wojewodztwo ='mazowieckie';
        break;
      case '8':
        selected_wojewodztwo ='opolskie';
        break;
      case '9':
        selected_wojewodztwo ='podkarpackie';
        break;
      case '10':
        selected_wojewodztwo ='podlaskie';
        break;
      case '11':
        selected_wojewodztwo ='pomorskie';
        break;
      case '12':
        selected_wojewodztwo ='slaskie';
        break;
      case '13':
        selected_wojewodztwo ='swietokrzyskie';
        break;
      case '14':
        selected_wojewodztwo ='warminsko-mazurskie';
        break;
      case '15':
        selected_wojewodztwo ='wielkopolskie';
        break;
      case '16':
        selected_wojewodztwo ='zachodniopomorskie';
        break;
      default:
        selected_wojewodztwo = 'xd';
        
    }
   
    // poszczegolne szczegolowe przypadki na wojewodztwo wybrane z listy, dane z ministerstwa

    setTimeout(() => {  
        
        
      // petla wypisujaca wartosci z api dla danego wojewodztwa
      start_loop_wojewodztwo = true;
      for (var k=21; k <full_array_wojewodztwa[0].length; k++ ){
        for (var j=0; j<16;j++) {
         
         if(full_array_wojewodztwa[0][k].infectedByRegion[j].region == selected_wojewodztwo){
            infected_array_selected_wojewodztwo.push(full_array_wojewodztwa[0][k].infectedByRegion[j].infectedCount);
            deceased_array_selected_wojewodztwo.push(full_array_wojewodztwa[0][k].infectedByRegion[j].deceasedCount);
            time_of_data_wojewodztwo.push(full_array_wojewodztwa[0][k].lastUpdatedAtApify.substring(0,10));
            
          }
        }
      }
  
      let myChart = document.getElementById('chart4').getContext('2d');

      
            Chart.defaults.global.defaultFontFamily = 'Lato';
            Chart.defaults.global.defaultFontSize = 18;
            Chart.defaults.global.defaultFontColor = '#777';
        
            let massPopChart = new Chart(myChart, {
              type:'bar', 
              data:{
                labels:time_of_data_wojewodztwo,
                datasets:[{
                  label:'infected',
                  data:infected_array_selected_wojewodztwo,
              
                  backgroundColor:'green',
                  borderWidth:1,
                  borderColor:'#777',
                  hoverBorderWidth:3,
                  hoverBorderColor:'#000'
                },
                {
                  label:'deceased',
                  data:deceased_array_selected_wojewodztwo,
                 
                  backgroundColor:'red',
                  borderWidth:1,
                  borderColor:'#777',
                  hoverBorderWidth:3,
                  hoverBorderColor:'#000'
                }]
              },
              options:{
                title:{
                  display:true,
                  text:'Overall Coronavirus in voievoideships ' + selected_wojewodztwo,
                  fontSize:25
                },
                legend:{
                  display:true,
                  position:'right',
                  labels:{
                    fontColor:'#000'
                  }
                },
                layout:{
                  padding:{
                    left:50,
                    right:0,
                    bottom:0,
                    top:0
                  }
                },
                tooltips:{
                  enabled:true
                }
              }
            });
      show_chart_wojewodztwo = true;
         
          }, 1000);
            
        
      }


  