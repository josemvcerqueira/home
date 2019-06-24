import React, { useState, useEffect, useReducer } from "react";
import uuid from "uuid/v4";

const initialTasksState = {
	tasks: [],
	completedTasks: []
};

const TYPES = {
	ADD_TASK: "ADD_TASK",
	DELETE_TASK: "DELETE_TASK",
	COMPLETE_TASK: "COMPLETE_TASK"
};

const tasksReducer = (state, action) => {
	switch (action.type) {
		case TYPES.ADD_TASK:
			return {
				...state,
				tasks: [...state.tasks, action.task]
			};
		case TYPES.COMPLETE_TASK:
			const { completedTask } = action;
			return {
				...state,
				completedTasks: [...state.completedTasks, completedTask],
				tasks: state.tasks.filter(t => t.id !== completedTask.id)
			};
		case TYPES.DELETE_TASK:
			return {
				...state,
				completedTasks: state.completedTasks.filter(
					t => t.id !== action.task.id
				)
			};
	}
	return initialTasksState;
};

const TASKS_STORAGE_KEY = "TASKS_STORAGE_KEY";

const storeTasks = taskmap => {
	localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(taskmap));
};

const readStoredTasks = () => {
	const tasksMap = JSON.parse(localStorage.getItem("TASKS_STORAGE_KEY"));
	return tasksMap ? tasksMap : initialTasksState;
};

const Tasks = () => {
	const storedTasks = readStoredTasks();

	const [taskText, setTaskText] = useState("");

	const [state, dispatch] = useReducer(tasksReducer, storedTasks);
	const { tasks, completedTasks } = state;

	useEffect(() => {
		storeTasks({ tasks, completedTasks });
	});

	const updateTaskText = event => {
		setTaskText(event.target.value);
	};

	const addTask = () => {
		dispatch({ type: TYPES.ADD_TASK, task: { taskText, id: uuid() } });
	};

	const completeTask = completedTask => {
		dispatch({ type: TYPES.COMPLETE_TASK, completedTask });
	};

	const deleteTask = _task => {
		dispatch({ type: TYPES.DELETE_TASK, task: _task });
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
