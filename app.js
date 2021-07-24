const express = require('express');

const app = express();

const PORT = 5000;

app.get('/',(req, res)=>{
   res.send("This is a collaborative project")
})

app.listen(PORT, ()=>{
    console.log(`Server running on port:${PORT}`)
})