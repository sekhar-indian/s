document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  form.addEventListener("submit", handleSubmit);

  function handleSubmit(event) {
    event.preventDefault();

    const taskInput = document.getElementById("taskInput").value;
    const descriptionInput = document.getElementById("descriptionInput").value;

    // Creating the list item for local tasks
    const taskList = document.getElementById("taskList");
    const listItem = createTaskElement(taskInput, descriptionInput);
    taskList.appendChild(listItem);

    // Clearing input fields after adding the task
    document.getElementById("taskInput").value = "";
    document.getElementById("descriptionInput").value = "";

    // Sending data to the API using Axios
    sendDataToAPI(taskInput, descriptionInput);
  }

  function createTaskElement(taskInput, descriptionInput) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <div>
        <span>${taskInput}</span>
        <span>${descriptionInput}</span>
        <button class="completeBtn">Complete</button>
        <button class="deleteBtn">Delete</button>
      </div>
    `;

    const deleteButton = listItem.querySelector(".deleteBtn");
    deleteButton.addEventListener("click", handleDelete);

    const completeButton = listItem.querySelector(".completeBtn");
    completeButton.addEventListener("click", handleComplete);

    return listItem;
  }

  function handleDelete(event) {
    const listItem = event.target.parentElement.parentElement;
    listItem.remove();
  }

  function handleComplete(event) {
    const listItem = event.target.parentElement.parentElement;
    const doneList = document.getElementById("doneList");
    doneList.appendChild(listItem);
    event.target.remove();
  }

  function sendDataToAPI(taskInput, descriptionInput) {
    axios
      .post('https://crudcrud.com/api/0acb7a1adf6a4fdaa05edb56bf14708c/s', {
        input: taskInput,
        des: descriptionInput
      })
      .then(response => console.log('Data sent to API:', response.data))
      .catch(error => console.error('Error sending data to API:', error));
  }

  // Function to fetch data from the API and display it in the doneList area
  function fetchDataFromAPI() {
    axios
      .get('https://crudcrud.com/api/0acb7a1adf6a4fdaa05edb56bf14708c/s')
      .then(response => showData(response.data))
      .catch(error => console.error('Error fetching data from API:', error));
  }

  function showData(data) {
    const displayArea = document.getElementById("doneList");
    displayArea.innerHTML = "";

    data.forEach(item => {
      const displayItem = document.createElement("div");
      displayItem.textContent = `Task: ${item.input}, Description: ${item.des}`;
      displayArea.appendChild(displayItem);
    });
  }

  // Fetch data from API on page load
  fetchDataFromAPI();
});
