let form=document.getElementById("form");
form.addEventListener("submit",f)

function f(event){
    event.preventDefault();

          
    const taskInput=event.target.taskInput.value;
    const odescriptionInput=event.target.descriptionInput.value;

    axios
        .post('https://crudcrud.com/api/0acb7a1adf6a4fdaa05edb56bf14708c/s',{
            input:taskInput,
            des:odescriptionInput,
          

        })
        .then(re=>showData(re))

        
            
    
}

function showData(re){
    const responseData = re.data;
    
    document.getElementById("1").innerHTML=`
    <h1>Task: ${responseData.input}</h1>
        <p>Description: ${responseData.des}</p>
    `
      
}