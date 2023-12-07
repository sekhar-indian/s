
const API_URL="https://crudcrud.com/api/36ef6ac87b31411abb97a34568e422bc/n"
const completedTasksKey = 'completedTasks';

const form = document.getElementById('form');
const taskInput = document.getElementById('taskInput');
const descriptionInput = document.getElementById('descriptionInput');
const taskList = document.getElementById('taskList');
const doneList = document.getElementById('doneList');


function createTaskItem(task, description, id) {
    const li = document.createElement('li');
   li.textContent = `${task}: ${description}`;
   li.dataset.id = id;

  const completeButton = document.createElement('button');
  completeButton.textContent = 'Complete';
  completeButton.addEventListener('click', async function(event) {
  event.stopPropagation();
 

    li.remove();
    const taskId = li.dataset.id;

    try {
      await axios.put(`${API_URL}/${taskId}`, { completed: true });
      const doneTask = document.createElement('li');
      doneTask.textContent = `${task}: ${description}`;
      doneList.appendChild(doneTask);
    
     
      const completedTasks = JSON.parse(localStorage.getItem(completedTasksKey)) || [];
      completedTasks.push({ id: taskId, task, description });
      localStorage.setItem(completedTasksKey, JSON.stringify(completedTasks));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  });
  li.appendChild(completeButton);

  const deleteButton = document.createElement('button');
     deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', async function(event) {
    event.stopPropagation();
    
     li.remove();

    const taskId = li.dataset.id;

    try {
      await axios.delete(`${API_URL}/${taskId}`);
      
      const completedTasks = JSON.parse(localStorage.getItem(completedTasksKey)) || [];
        const updatedCompletedTasks = completedTasks.filter(task => task.id !== taskId);
            localStorage.setItem(completedTasksKey, JSON.stringify(updatedCompletedTasks));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  });
  li.appendChild(deleteButton);

  return li;
}

// submission
form.addEventListener('submit', async function(event) {
  event.preventDefault();

  const task = taskInput.value;
  const description = descriptionInput.value;

  if (task.trim() !== '') {
    const newTaskItem = createTaskItem(task, description);
    taskList.appendChild(newTaskItem);

    try {
      const response = await axios.post(API_URL, { taskName: task, description, completed: false });
      const { _id } = response.data;
       newTaskItem.dataset.id = _id; // Update dataset id after adding task
    } catch (error) {
      console.error('Error adding new task:', error);
    }

    taskInput.value = '';
    descriptionInput.value = '';
  }
});

// Fe
async function fetchTasks( ) {
  try {
    const response = await axios.get(API_URL);
      const tasks = response.data;

    tasks.forEach(task => {
      const { _id, taskName, description, completed } = task;

      if (taskName && description) {
        const taskItem = createTaskItem(taskName, description, _id);
        if (completed) {
          const doneTask = document.createElement('li');
          doneTask.textContent = `${taskName}: ${description}`;
          doneList.appendChild(doneTask);
        } else {
          taskList.appendChild(taskItem);
        }
       
      }
    });

              
    const completedTasks = JSON.parse(localStorage.getItem(completedTasksKey)) || [];
        completedTasks.forEach(completedTask => {
      const doneTask = document.createElement('li');
      doneTask.textContent = `${completedTask.task}: ${completedTask.description}`;
      doneList.appendChild(doneTask);
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

fetchTasks();

