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

app.get("/suggestions", async (req,res) =>{
    const query = req.query.q;
    try {
        const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${process.env.WEATHER_API_KEY}`);
        res.json(response.data)
    } catch (error) {
        res.json([])
    }
});

app.post("/getdata", getdata);

async function getdata(req,res)  {
    const location = req.body.city
    try{
        const weatherdata = await CallApi(location);
        console.log(weatherdata.data)
        res.render("index.ejs", { weather : weatherdata.data, error: null });    
    } catch (error) {
        res.render("index.ejs", { weather : undefined, error: "city not found please check the spelling." });
    }
    
}
async function CallApi(location){
    const data=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API_KEY}`)
    return data
}

app.listen(port, () => {
    console.log(`server is running on the port:${port}`);
});
