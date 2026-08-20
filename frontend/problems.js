const problemsContainer =
 document.getElementById("problemsContainer");

fetch("/problems" , {
    method : "GET",
})

.then(res => res.json())
.then(data => {
    data.forEach((problem, index) => {
       

        const row =
        document.createElement("div");
       row.className = "problem-card";

       row.innerHTML = `
       <div class="problem-name"> ${problem.problemName}</div>
       <div class="problem-platform"> ${problem.platform}</div>
       <div class="problem-info">${problem.difficulty}</div>
       <div class="problem-info">${problem.topic}</div>
       <div class="problem-info">${problem.status}</div>
       <div class="problem-info">${problem.date}</div>
      

       
       <div class ="problem-actions">
        <button class ="update-btn"  data-index="${index}">Update</button>
        <button class ="delete-btn"  data-index="${index}">Delete</button>
       </div>
`;
      const updateBtn =
    row.querySelector(".update-btn");

    updateBtn.addEventListener("click" , function(event) {
        event.preventDefault();

        const updatedProblem = {
            problemName : problem.problemName,
            platform : problem.platform,
            difficulty : problem.difficulty,
            topic : problem.topic,
            status : problem.status,
            date : problem.date
        };

        fetch(`/problems/${index}` , {
            method: "PUT",
            headers : {
                "Content-Type" : "application/json"
            },

            body : JSON.stringify(updatedProblem)
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.log("error:" , error);
        });
    }); 

    const deleteBtn =
    row.querySelector(".delete-btn");

    deleteBtn.addEventListener("click" , function(event) {
        event.preventDefault();

    fetch("/problems/${index}" , {
        method : "DELETE",
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.log("Error: " , error)
    });
    });
   
       problemsContainer.appendChild(row);
        
       
       
    });
})
.catch(error => {
    console.log("Error:", error);
});