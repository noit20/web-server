const request = require('request');

const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/3629a00f85575426379354812b45c717/' + encodeURIComponent(latitude) +','+ encodeURIComponent(longitude) + '?units=si';
    request({url:url , json: true},(error,response)=>{
    if(error){
        callback('Connection fail');
        
    }    
    else if(response.body.error)
    {
        callback("Error "+ response.body.error)
        //console.log("Error "+ response.body.error);
    }
    else{
        callback(undefined,response.body.daily.data[0].summary);
       // console.log(response.body.daily.data[0].summary);
       // console.log("it is currently "+ response.body.currently.temperature + 'there is a ' +'%');
    }
   
})


}

module.exports=forecast;