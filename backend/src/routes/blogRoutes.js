import express from "express"

const router = express.Router()


//create new blog post
router.post("/", (req, res) => {
  res.send('placeholder')
})


//get all blog posts
router.get('/', (req, res) => {
  res.send('Hello World!')
})



//update existing blog post
router.put("/:id", (req, res) => {
  res.send("placeholder")
})



//delete blog post 
router.delete("/:id", (req, res) => {
  
})



export default router