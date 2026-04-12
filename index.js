import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended:true }));

app.get("/",(req,res) => {
    res.render("index.ejs");
});

app.post("/getdata", getdata);

async function getdata(req,res)  {
    const location = req.body.city
    const weatherdata = await CallApi(location)
    console.log(weatherdata.data)
    res.render("index.ejs", { weather : weatherdata.data })
    
}
async function CallApi(location){
    const data=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API_KEY}`)
    return data
}

app.listen(port, () => {
    console.log(`server is running on the port:${port}`);
});
