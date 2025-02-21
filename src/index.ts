import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.post("/bfhl", (req: Request, res: Response) => {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({ error: "Invalid input. Expected an array." });
  }


  let numbers: string[] = [];
  let alphabets: string[] = [];
  let highestAlphabet: string | null = null;

  for (let item of data) {
    if (typeof item === "string") {
      if (/^[a-zA-Z]$/.test(item)) {
        alphabets.push(item);
        if (!highestAlphabet || item.toUpperCase() > highestAlphabet.toUpperCase()) {
          highestAlphabet = item;
        }
      } else if (/^\d+$/.test(item)) {
        numbers.push(item);
      }
    }
  }

  res.json({
    is_success: true,
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123",
    numbers,
    alphabets,
    highest_alphabet: highestAlphabet ? [highestAlphabet] : [],
  });
});

app.get("/bfhl", (req: Request, res: Response) => {
  if (Object.keys(req.query).length || Object.keys(req.body).length || Object.keys(req.params).length) {
    return res.status(400).json({ error: "This endpoint does not accept any input." });
  }

  res.status(200).json({ operation_code: 1 });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

