const {Router} = require('express');
const router = Router();
const fs = require('fs');

const json_tasks = fs.readFileSync('src/tasks.json', 'utf-8');
const tasks = JSON.parse(json_tasks);

router.get('/get-tasks', (req, res) => {
	res.status(200).json(tasks);
});

router.post('/new-task', (req, res) => {
	const {descripcion} = req.body;

	!descripcion && res.status(400).send('La tarea debe tener un título');

	console.log('request', req.body);

	let newTask = {
		descripcion,
		horaInicio: new Date().toLocaleTimeString(),
		horaFinalizacion: new Date().toLocaleTimeString(),
	};

	tasks.push(newTask);
	console.log('tareas', tasks);
    res.json(newTask);

    const json_tasks = JSON.stringify(tasks);

    fs.writeFileSync('src/tasks.json', json_tasks, 'utf-8');
});

module.exports = router;
