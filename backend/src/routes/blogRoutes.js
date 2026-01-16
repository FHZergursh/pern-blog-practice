import express from "express"
import { sql } from "../index.js"

const router = express.Router()


//create new blog post
router.post("/", async (req, res) => {
  try {
    const {title, text} = req.body

    if (!title || !text) {
      return res.status(400).json({success: false, message: "Please provide all values"})
    }

    const newBlog = await sql `INSERT INTO blogtable (title, text)
    VALUES (${title},${text})
    RETURNING *`

    res.status(201).json({success: true, data:newBlog[0]})
  } catch (error) {
    console.log("Error in create blog, ", error)
    res.status(500).json({success: false, message: "Internal server error"})
  }
})


//get all blog posts
router.get('/', async (req, res) => {
  try {
    const blogs = await sql `SELECT * FROM blogtable
    ORDER BY created_at DESC`
    res.status(200).json({success: true, data: blogs})

  } catch (error) {
    console.log("Error in get all blogs, ", error)
    res.status(500).json({success: false, message: "Internal server error"})
  }
})



//update existing blog post
router.put("/:id", async (req, res) => {
  try {
    const {blogid} = req.params
    const {title, text} = req.body

    if (!blogid || !title || !text) {
      return res.status(400).json({success: false, message: "Please provide all values"})
    }

    const updatedBlog = await sql `UPDATE blogtable
    SET title=${title}, text=${text}
    WHERE blogid = ${blogid}
    RETURNING *`

    return res.status(200).json({success: true, data: updatedBlog[0]})
    
  } catch (error) {
    console.log("Error in update blogs, ", error)
    res.status(500).json({success: false, message: "Internal server error"})
  }
})



//delete blog post 
router.delete("/:id", async (req, res) => {
  try {
    const {blogid} = req.params

    if (!blogid) {
      return res.status(400).json({success: false, message: "Blog entry not found"})
    }

    const deletedBlog = await sql `DELETE FROM blogtable
    WHERE blogid = ${blogid}
    RETURNING *`

    if (deletedBlog === 0) {
      return res.status(404).json({success: false, message: "Failed to delete blog "})
    }

    return res.status(200).json({success: true, data: deletedBlog[0]})


  } catch (error) {
    console.log("Error in delete blogs, ", error)
    res.status(500).json({success: false, message: "Internal server error"})
  }
})



export default router