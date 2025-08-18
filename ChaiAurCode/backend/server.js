import express from "express";

const app = express();

app.get('/',(req,res)=>{
    res.send('Server is Ready');
});

app.get('/api/jokes',(req,res)=>{
    const jokes= [
        {
        id:1,
        title:'A joke',
        content:'First joke'
    },{
        id:2,
        title:'Another joke',
        content:'Second joke'
    },{
        id:3,
        title:'A third joke',
        content:'Third joke'
    }
    ]
    res.send(jokes);
});


const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`server running at ${port}`);
})