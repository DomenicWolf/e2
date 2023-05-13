const express = require('express');
const {ExpressError} = require('./error')
//const {checkAndReturn,mean,mode,median} = require('./functions');
let {items} = require('./fake');
const {loopy,patchy} = require('./functions');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/items',(req,res) => {
    return res.json(items);
})

app.post('/items',(req,res) => {
    items.push(req.body);
    console.log(req.body);
    res.status(201).json(req.body);
})

app.get('/items/:name',(req,res) => {
    const name = req.params.name;
    const item = loopy(items,name);
    console.log(item);
    return res.send(item);
})

app.patch('/items/:name',(req,res) => {
    const name = req.params.name;
    const item = loopy(items,name)
    const changes = req.body
    if(!item){
        return res.send('no item with that name!')
    }
    if (req.body.name){
        console.log(2)
        item.name = req.body.name
    }
    
    if (req.body.price){
        item.price = req.body.price
    }
    console.log(item)
    return res.send(item)


})
app.delete('/items/:name',(req,res) => {
    const name = req.params.name;
    const index = patchy(items,name)
    console.log(index)
    console.log(index > -1)
    
    if(index > -1 && index) {
        items.splice(index,1)
        return res.send(`${name} deleted!`)
    }
    return res.send('no item with that name!')
    
})








app.use((req,res,next) => {
    const e = new ExpressError('page not found',404);
    next(e);
})

app.use((err,req,res,next) => {
    console.log(err.msg);
    console.log(err.msg);
    res.status(err.code).send(err.msg);
})

module.exports = {app}