const tasksController = {};
const fs = require('fs');
const moment = require('moment');

const json_tasks = fs.readFileSync('./src/tasks.json', 'utf-8');
const tasks = JSON.parse(json_tasks);

tasksController.getTasks = (req, res) => {
	res.status(200).json(tasks);
};

tasksController.createTask = (req, res) => {
	const {descripcion} = req.body;

	!descripcion && res.status(400).send('La tarea debe tener un título');

	//se chequea si existe alguna tarea
	if (tasks.length === 0) {
		let newTask = {
			descripcion,
			horaInicio: new Date().toLocaleTimeString(),
			horaFinalizacion: null,
			tiempoTotal: null,
		};

		tasks.push(newTask);
		res.json(newTask);
	} else {
		let lastTask = tasks[tasks.length - 1];

		let horaInicio = moment(lastTask.horaInicio, 'HH:mm:ss');
		let horaFinalizacion = moment(new Date().toLocaleTimeString(), 'HH:mm:ss');

		//se calculan horas minutos y segundos para luego formatear la diferencia
		let diferenciaHoras = horaFinalizacion.diff(horaInicio, 'hours');
		let diferenciaMinutos = horaFinalizacion.diff(horaInicio, 'minutes');
		let diferenciaSegundos = horaFinalizacion.diff(horaInicio, 'seconds');

		//para obtener un resultado bien formateado:
		let tiempoTotal = moment().set('Hours', diferenciaHoras).set('Minutes', diferenciaMinutos).set('Seconds', diferenciaSegundos).format('HH:mm:ss');

		lastTask = {
			...lastTask,
			horaFinalizacion: new Date().toLocaleTimeString(),
			tiempoTotal: tiempoTotal,
		};

		let newTask = {
			descripcion,
			horaInicio: new Date().toLocaleTimeString(),
			horaFinalizacion: null,
			tiempoTotal: null,
		};

		//se quita la ultima tarea, se agrega la misma modificada, y la ultima tarea agregada
		tasks.pop();
		tasks.push(lastTask);
		tasks.push(newTask);
		res.json(newTask);
	}

	const json_tasks = JSON.stringify(tasks);

	fs.writeFileSync('src/tasks.json', json_tasks, 'utf-8');
};

tasksController.updateTask = (req, res) => {
    const {descripcion} = req.body;
	const {index} = req.params;

	const tarea = tasks[index];

	!tarea && res.status(400).send(`No existe la tarea con índice: ${index}`);

	const tareaEdit = {
		...tarea,
		descripcion,
	};

	tasks.splice(index, 1, tareaEdit);

	res.json(tasks);
}

module.exports = tasksController;
