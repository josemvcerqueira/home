import React, { useState } from "react";
import uuid from "uuid/v4";

const Tasks = () => {
	const [taskText, setTaskText] = useState("");
	const [tasks, setTasks] = useState([]);
	const [completedTasks, setCompletedTasks] = useState([]);

	const updateTaskText = event => {
		setTaskText(event.target.value);
	};

	const addTask = () => {
		setTasks([...tasks, { taskText, id: uuid() }]);
	};

	const completeTask = completedTask => {
		setCompletedTasks([...completedTasks, completedTask]);
		setTasks(tasks.filter(task => task.id !== completedTask.id));
	};

	const deleteTask = _task => {
		setCompletedTasks(completedTasks.filter(task => task.id !== _task.id));
	};

	return (
		<div>
			<h3>Tasks</h3>
			<div className="form">
				<input value={taskText} type="text" onChange={updateTaskText} />
				<button onClick={addTask}>Add Task</button>
			</div>
			<div className="task-list">
				{tasks.map(task => (
					<div key={task.id} onClick={() => completeTask(task)}>
						{task.taskText}
					</div>
				))}
			</div>
			<div className="completed-list">
				{completedTasks.map(task => (
					<div key={task.id}>
						{task.taskText}{" "}
						<span
							className="delete-task"
							onClick={() => deleteTask(task)}
						>
							x
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default Tasks;
