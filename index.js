const express=require("express")
const app=express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors=require('cors')
const jwt=require('jsonwebtoken');
require('dotenv').config()
app.use(cors())
app.use(express.json())
const port=process.env.PORT || 5000
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6doajke.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        const userCollection=client.db('assignment-12').collection('user')
        const productCollection=client.db('assignment-12').collection('product')
        const categoryCollection=client.db('assignment-12').collection('category')
        const bookingCollection=client.db('assignment-12').collection('booking')
        const reportCollection=client.db('assignment-12').collection('report')
        app.get("/user/admin/:email",async(req,res)=>{
            const email=req.params.email
            const query ={email}
            const user=await userCollection.findOne(query)
            res.send({isAdmin: user?.role === "admin"})
        })
        app.get("/user/user/:email",async(req,res)=>{
            const email=req.params.email
            const query ={email}
            const user=await userCollection.findOne(query)
            res.send({isUser: user?.role === "user"})
        })
        app.get("/seller/:email",async(req,res)=>{
            const email=req.params.email
            const query ={email}
            const user=await userCollection.findOne(query)
            res.send({isSeller: user?.role === "seller"})
        })
        app.put("/advertize/:id",async(req,res)=>{          
            const id=req.params.id
            const filter={_id:ObjectId(id)}
            const option={upsert:true}
            const updateDoc={
                    $set:{
                        advertize:true
                    }
            }
            const result=await productCollection.updateOne(filter,updateDoc,option)
            res.send(result)
        })
        app.put('/report/:id', async(req,res)=>{
            const id = req.params.id;
            const filter = {_id: ObjectId(id)}
            const options = {upsert: true}
            const updateDoc = {
                $set: {
                    report: true
                }
            }
            const seller = await productCollection.updateOne(filter, updateDoc,options)
            res.send(seller)
        })
        app.put('/verify/:id', async(req,res)=>{
            const id = req.params.id;
            const filter = {_id: ObjectId(id)}
            const options = {upsert: true}
            const updateDoc = {
                $set: {
                    verify: true
                }
            }
            const seller = await userCollection.updateOne(filter, updateDoc,options)
            res.send(seller)
        })
        app.get("/Allselleranduser",async(req,res)=>{
            const query={}
            const result=await userCollection.find(query).toArray()
            res.send(result)
        })
        app.delete("/alluserseller/:id",async(req,res)=>{
            const id=req.params.id
            const query={_id:ObjectId(id)}
            const result=await userCollection.deleteOne(query)
            res.send(result)
        })
        app.delete("/seller/:id",async(req,res)=>{
            const id=req.params.id
            const query={_id:ObjectId(id)}
            const result=await userCollection.deleteOne(query)
            res.send(result)
        })
        app.delete("/user/:id",async(req,res)=>{
            const id=req.params.id
            const query={_id:ObjectId(id)}
            const result=await userCollection.deleteOne(query)
            res.send(result)
        })
        app.get("/seller",async(req,res)=>{
            const query={role:"seller"}
            const result=await userCollection.find(query).toArray()
            res.send(result)
        })
        app.get('/user',async(req,res)=>{
            const query={role:"user"}
            const result =await userCollection.find(query).toArray()
            res.send(result)
        })
        app.get("/category",async(req,res)=>{
            const query={}
            const result=await categoryCollection.find(query).toArray()
            res.send(result)  
        })
        app.get("/product/:category",async(req,res)=>{
            const category=req.params.category
            const query={category:category}
            const result =await productCollection.find(query).toArray()
            res.send(result)
        })
        app.get('/category/:id',async(req,res)=>{
            const id=req.params.id
            const query={_id:ObjectId(id)}
            const result=await productCollection.findOne(query)
            res.send(result)
        })
        app.post("/booking",async(req,res)=>{
            const booking=req.body
            const result=await bookingCollection.insertOne(booking) 
            res.send(result)
        })
        app.post("/report",async(req,res)=>{
            const report=req.body
            const result=await reportCollection.insertOne(report) 
            res.send(result)
        })
        app.get("/booking",async(req,res)=>{
            const query={}
            const result=await bookingCollection.find(query).toArray()
            res.send(result)
        })
        app.delete("/booking/:id",async(req,res)=>{
            const id=req.params.id
            const query={_id:ObjectId(id)}
            const result=await bookingCollection.deleteOne(query)
            res.send(result)
        })
        app.post('/user',async(req,res)=>{
            const user=req.body
           
            const result=await userCollection.insertOne(user)
            res.send(result)
        })
        app.post('/addproduct',async(req,res)=>{
            const user=req.body
            const result=await productCollection.insertOne(user)
            res.send(result)
        })
        app.get("/myproduct",async(req,res)=>{
            const email=req.query.email
            console.log("myproduct",email)
            const query ={sellerEmail:email}
            console.log(query)
            const user=await productCollection.find(query).toArray()
            console.log(user)
            res.send(user)
        })
        app.delete("/myproduct/:id",async(req,res)=>{
            const id=req.params.id
            const query={_id:ObjectId(id)}
            const result=await productCollection.deleteOne(query)
            res.send(result)
        })
        app.get("/advertize",async(req,res)=>{
            const query={advertize:true}
            const result=await productCollection.find(query).toArray()
            res.send(result)
        })
        app.get("/report",async(req,res)=>{
            const query={report:true}
            const result=await productCollection.find(query).toArray()
            res.send(result)
        })
        app.delete("/report/:id",async(req,res)=>{
            const id=req.params.id
            const query={_id:ObjectId(id)}
            const result=await productCollection.deleteOne(query)
            res.send(result)
        })
    }
    finally{

    }
}
run().catch(err=>console.error(err))
app.get("/",(req,res)=>{
    res.send("server is running")
})
app.listen(port,()=>{
    console.log(`server is running ${port}`)
})