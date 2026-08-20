const form =
document.getElementById("problemForm");

form.addEventListener("submit" , function(event) {
    event.preventDefault();
   const problemName =
 document.getElementById("problemName").value;
   const platform =
document.getElementById("platform").value;
   const difficulty =
document.getElementById("difficulty").value;
  const topic =
  document.getElementById("topic").value;
  const status =
  document.getElementById("status").value;
  const date =
  document.getElementById("dateSolved").value;

fetch("http://localhost:3000/problems" , {
    method : "POST",
     headers : {
         "Content-Type" : "application/json"

    },
    body : JSON.stringify({
        problemName,
        platform,
        difficulty,
        topic,
        status,
        date
    })
    })

    .then(res => res.json())
    .then(data => {
        alert(data.message);
    })

  .catch(error => {
    console.log("Error:" , error);
});

});