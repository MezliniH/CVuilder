const express = require("express");
const mongoose =require("mongoose")
import path from "path";
const pdf = require("html-pdf");
const cors = require("cors");
import morgan from "morgan";
import config from "./config";

import authRoutes from './routes/api/auth';
import userRoutes from "./routes/api/users";
const app = express();

const pdfTemplate = require("./documents");

const options = {
	height: "42cm",
	width: "29.7cm",
	timeout: "60000",
};

app.use(cors());
app.use(express.json())

// DB Config
const db = `${MONGO_URI}/${MONGO_DB_NAME}`;

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes

app.use('/api/users', userRoutes);
app.use("/api/auth", authRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}




// POST route for PDF generation....
app.post("/create-pdf", (req, res) => {
	pdf.create(pdfTemplate(req.body), options).toFile("Resume.pdf", (err) => {
		if (err) {
			console.log(err);
			res.send(Promise.reject());
		} else res.send(Promise.resolve());
	});
});

// GET route -> send generated PDF to client...
app.get("/fetch-pdf", (req, res) => {
	const file = `${__dirname}/Resume.pdf`;
	res.download(file);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

