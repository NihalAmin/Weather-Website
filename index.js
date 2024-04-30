
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_KEY = "36cc64fa979be0ae6d284e268821f866";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",  (req, res)     => {  
res.render("index.ejs",{content:" ",city:" ",temp:" ",real:" ",Humidity:" ",wind:" ",Pressure:" ",min:" ",max:" "});  
});

app.post("/weather", async (req, res) => {
    try {
        const place = req.body.place;
        console.log(place);
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${API_KEY}&units=metric`;
        const response = await axios.post(API_URL)
          
        const result = response.data;
        console.log(JSON.stringify(result.data))
        res.render("index.ejs",{temp: JSON.stringify(result.main.temp), min:JSON.stringify(result.main.temp_min),max:JSON.stringify(result.main.temp_max),real:JSON.stringify(result.main.feels_like),Humidity:JSON.stringify(result.main.humidity),wind:JSON.stringify(result.wind.speed),Pressure:JSON.stringify(result.main.pressure),city:place });
    }catch(error){
        res.render("index.ejs", { content: "error" });
        
    }

});


app.listen(port,()=>{
    console.log(`post is running in https://localhost:${port}`);
});
