const taskInput = document.getElementById("taskInput");
const btn = document.getElementById("btn");
const list = document.getElementById("list");


btn.addEventListener("click", () => {
      const value = taskInput.value;
   if(value === ""){
    alert("Enter Your Task")
   }
   const li = document.createElement("li");
 
   li.textContent = value;

   list.appendChild(li);
})  