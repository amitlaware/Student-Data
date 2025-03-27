import express from "express";
import cors from "cors";

import { MongoClient, ObjectId } from "mongodb";

const app = express();
app.use(cors());
app.use(express.json());

const DBCONNECT = "mongodb://127.0.0.1:27017"; 
let db;
const connectDB =async()=>{
    try{
        const clinet = new MongoClient(DBCONNECT);
        await clinet.connect();
        db=clinet.db('StudentDB');
        console.log("Database connected sucessfully");
    }catch(error){
        console.log("Database connection error",error);
        process.exit(1);
    }
}

app.get('/',(req, res)=>{
    res.send("Hello");
})

app.get('/getstudent',async(req,res)=>{
    try{
        const result = await db.collection('Student').find({}).toArray();
        res.status(200).json(result);
    }catch(error){
        console.log("Error in finding data");
    }
})

// app.post("/add",async(req,res)=>{
//     try{
//         await db.collection("Student").insertOne(req.body);
//         res.status(201).json({message:"Student data inserted successfully"});

//     }catch(err){
//         console.log("Error occured while inserting data");
//         res.status(500).json({messsage:"Internal Server Error"});

//     }
// })
app.post("/addStudent", async (req, res) => {
    try {
        const { name, email, age, rollNo } = req.body; // Get new fields
        await db.collection("Student").insertOne({ name, email, age, rollNo });
        res.status(201).json({ message: "Student added successfully" });
    } catch (error) {
        console.log("Error inserting data", error);
        res.status(500).json({ message: "Error inserting student" });
    }
});


  app.delete("/deleteStudent/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.collection("Student").deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 1) {
            res.status(200).json({ message: "Student deleted successfully" });
        } else {
            res.status(404).json({ message: "Student not found" });
        }
    } catch (error) {
        console.error("Error deleting student", error);
        res.status(500).json({ message: "Error deleting student" });
    }
});

app.put("/updateStudent/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        await db.collection("Student").updateOne(
            { _id: new ObjectId(id) }, 
            { $set: updatedData }
        );
        res.status(200).json({ message: "Student updated successfully" });
    } catch (error) {
        console.log("Error updating student", error);
        res.status(500).json({ message: "Error updating student" });
    }
});

app.put("/updateStudent/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        await db.collection("Student").updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedData }
        );
        res.status(200).json({ message: "Student updated successfully" });
    } catch (error) {
        console.error("Error updating student", error);
        res.status(500).json({ message: "Error updating student" });
    }
});


connectDB().then(()=>{
    app.listen(4000,()=>{    
        console.log("Server is listening on port 4000");
    
    })
})














