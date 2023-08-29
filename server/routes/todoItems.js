const router = require("express").Router();

const todoItemsModel = require("../models/todoItems");

router.post("/api/item", async (req, res) => {
  try {
    const newItem = new todoItemsModel(
      req.body
      
    );

    // saving database
    const saveItem = await newItem.save();
    res.status(200).json("Item was added");
  } catch (err) {
    res.json(err);
  }
});

router.get('/api/items', async (req, res) => {
  try {
    const getAllTodoItems = await todoItemsModel.find({});
    res.status(200).json(getAllTodoItems);
  } catch (err) {
    res.json(err);
  }
});

router.put('/api/item/:id', async (req, res) => {
    try {
      const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {$set: req.body});
      res.status(200).json('Item was Update');
    } catch (err) {
      res.json(err);
    }
  });

  router.delete('/api/item/:id', async (req, res) =>{
    try{
        const itemDelete = await todoItemsModel.findByIdAndDelete(req.params.id);
        res.status(200).json('this item was delete')
    }catch(err){
        res.json(err);
    }
  })
  

module.exports = router;
