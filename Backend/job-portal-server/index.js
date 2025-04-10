const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();

// middlewares
app.use(express.json());
app.use(cors());

// database connection
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qard9.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // creating database and collections
    const db = client.db("JobPortal");
    const jobsCollections = db.collection("Jobs");
    const usersCollections = db.collection("Users");

    // Job Routes
    // 1. Get all jobs
    app.get("/all-jobs", async (req, res) => {
      try {
        const jobs = await jobsCollections.find({}).toArray();
        res.send(jobs);
      } catch (error) {
        res.status(500).send("Error fetching jobs");
      }
    });

    // Get a single job
    app.get("/all-jobs/:id", async (req, res) => {
      const id = req.params.id;
      const job = await jobsCollections.findOne({ _id: new ObjectId(id) });
      res.send(job);
    });

    // 2. Post a job
    app.post("/post-job", async (req, res) => {
      const body = req.body;
      body.creatAt = new Date();
      const result = await jobsCollections.insertOne(body);
      if (result.insertedId) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({
          message: "Cannot Insert User, try again later!",
          status: false,
        });
      }
    });

    // 3. Get jobs by email
    app.get("/myJobs/:email", async (req, res) => {
      const jobs = await jobsCollections
        .find({ postedBy: req.params.email })
        .toArray();
      res.send(jobs);
    });

    // 4. Delete a job
    app.delete("/job/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await jobsCollections.deleteOne(filter); // deleting from database
      res.send(result);
    });

    // 5. Update a job
    app.patch("/update-job/:id", async (req, res) => {
      const id = req.params.id;
      const jobData = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...jobData,
        },
      };

      const result = await jobsCollections.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    // User routes
    // 1. adding new user
    app.post("/sign-up", async (req, res) => {
      const { name, phoneNo, email, password, address } = req.body;

      // checking if user already exists
      const existingUser = await usersCollections.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists!" });
      }

      // creating a new user
      const newUser = { name, phoneNo, email, password, address };
      const result = await usersCollections.insertOne(newUser);

      if (result.insertedId) {
        return res.status(200).json({
          message: "User created successfully!",
          user: {
            name: newUser.name,
            email: newUser.email,
          },
        });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(error);
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

// Example route to test database connection
app.get("/", async (req, res) => {
  try {
    const db = client.db("admin");
    const response = await db.command({ ping: 1 });
    res.send("MongoDB Connection is Active!");
  } catch (error) {
    res.status(500).send("Error connecting to MongoDB.");
  }
});

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
