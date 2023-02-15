/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
 let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
// Personal API Key for OpenWeatherMap API

 const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
 const apiKey = ',&appid=4575cd29b5551266626c6aa0c5c7c08b&units=metric';
 
 const generate = document.getElementById('generate');
 generate.addEventListener('click',performAction);

 function performAction(e){
    let zipCode = document.getElementById('zip').value;
    let newFeeling = document.getElementById('feelings').value;
    let errorZipCode = document.getElementById('errorzip');
    let errorFeelings =  document.getElementById('errorfeelings')
    if(!zipCode){
        errorZipCode.innerHTML = 'zipCode is required'
    }
    if(!newFeeling){
        errorFeelings.innerHTML = 'Your feeling is required'
    }else{
        getWeather(baseURL,zipCode,apiKey)
        .then(function(weatherData){
            updataUI('/all')
           postData('/addData',
           {
            data:  newDate,
            temp: Math.round(weatherData.main.temp),
            feeling: newFeeling
           })
        })
       
    }
    
 }

 const getWeather = async(baseURL,zipCode,apiKey)=>{
      const res = await fetch(baseURL+zipCode+apiKey)
      try {
        const weatherData = await res.json();
        return weatherData
      } catch (error) {
        console.log('error',error);
      }
 }

 const postData = async(url='',data={})=>{
    const response = await fetch (url,{
        method: 'POST',
        credentials :'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    try {
        const newData = response.json();
        return newData;
    } catch (error) {
        console.log('error',error);
    }
 }

 const updataUI = async(url)=>{
    const request = await fetch(url)
    try {
        const savedData = await request.json();
        console.log(savedData);
        document.getElementById('date').innerHTML = 'today is '+ savedData.data;
        document.getElementById('temp').innerHTML = 'temperature is '+ savedData.temp+'&degC';
        document.getElementById('content').innerHTML = 'Your feeling is '+ savedData.feeling;
    } catch (error) {
        console.log('error',error);
    }
 }