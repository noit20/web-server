const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();


//define pathes for express config
app.set('view engine','hbs');
const viewsPath = path.join(__dirname,'../templates/views');
app.set('views',viewsPath);
const partialsPath = path.join(__dirname,'../templates/partials');
hbs.registerPartials(partialsPath);


//setup static dir
app.use(express.static(path.join(__dirname,'../public')));

//app.com
//app.com/help
//app.com/about

app.get('',(req,res)=>{
   
    res.render('index',{
        title: 'Weather App',
        name: 'Noa',
        
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Noa',
        name: 'Noa'
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message: 'This page will help you understand the web site',
        title: 'Help',
        name:'Noa'
    });
})



/*
app.get('/help',(req,res)=>{
    res.send({
        name:'Noa',
        age:37
    });
})

app.get('/about',(req,res)=>{
    res.send('<h1>this web is my taks</h1>');
})

*/

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send('error - no address provided ');
    }

    geocode(req.query.address, (error,{latitude,longitude} = {})=>{
        console.log('Error',error);
        //console.log('data',latitude);
        if(error){
            return res.send('no geo is found')
        }

        if(latitude){
         forecast(latitude,longitude,(error2,data2)=>{
            console.log(data2);
            console.log(error2);
            if(error2){
                res.send('no weather found');
            }
            else{
                
                console.log(data2);
                res.send({data2});
            }
        })
           
        }
    })

    /*
    res.send({
        forcast:'hot',
        adress: req.query.address
    });
    */
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        message: 'Help page not found',
        title: '404',
        name:'Noa'
    });
})

app.get('*',(req,res)=>{
    res.render('404',{
        message: 'page not found',
        title: '404',
        name:'Noa'
    });
})

app.listen(3000,()=>{
    console.log('server up');
})