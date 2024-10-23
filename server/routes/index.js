const express = require("express");
const router = express.Router();
const TodoControllers = require("../controllers/TodoControllers");

const controllerTodo = new TodoControllers();

/* GET home page. */
router.get("/", controllerTodo.getTodos);

router.post("/", controllerTodo.addTodo);

router.put("/:id", [controllerTodo.toggleTodo, controllerTodo.editTodo]);

router.delete("/:id", controllerTodo.deleteTodo);

module.exports = router;
