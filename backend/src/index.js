import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { neon } from '@neondatabase/serverless';
import blogRoutes from './routes/blogRoutes.js'

dotenv.config()

const app = express();
const PORT = 3000;
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

app.use(express.json())
app.use(cors())

export const sql = neon( //data taken from the env
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&channel_binding=require` 
);

async function getPgVersion() {
  const result = await sql`SELECT version()`;
  console.log(result[0]);
}

//getPgVersion();     

app.use("/api/blogs", blogRoutes) // routes/blogRoutes.js 


async function initDB() {
  try {
    await sql`
    CREATE TABLE IF NOT EXISTS blogTable (
      blogId SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      text VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `;

    console.log("Database initialized successfully!")

  } catch (error) {
    console.log("Error initDB", error)
  }
}

initDB().then(() => {
    app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
  })
})