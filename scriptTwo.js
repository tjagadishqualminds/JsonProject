
document.addEventListener('DOMContentLoaded', ()=>{
    fetchAndDisplayData();
})

const tableResults = document.getElementById("tableData");
let updatePostId ="";


const table = document.getElementById("tableBody");

// Corrected code with explanations:
const buttons = document.getElementsByClassName('btn'); // Target buttons with class 'btn'

// Check if buttons exist to avoid errors:
if (buttons.length > 0) {
    for (const button of buttons) { // Iterate through each button
        button.addEventListener('click', () => {
            const modal = document.querySelector('.modal'); // Select the first modal element (if multiple exist)
            if (modal) { // Check if modal exists
                modal.style.display = 'block'; // Display the modal
            } else if(Update_Modal) {
                Update_Modal.style.display = 'block'; // Display the modal
                
               
            }
        });
    }
} else {
    console.warn("No buttons found with class 'btn'"); // Informative warning message
}
const close = document.getElementsByClassName("closebtn");


for (const closes of close){
    
    closes.addEventListener("click",(e)=>{
        e.preventDefault();
        closeModalDialog();// Display the modal
        // close.style.display='none';
    })
}

function closeModalDialog(){
    const modal = document.querySelector('.modal'); // Select the first modal element (if multiple exist)
    modal.style.display = 'none'; // Display the modal
    document.getElementById('update-modal').style.display='none';

}


// adding post
const modal = document.querySelector('.modal'); // Select the first modal element (if multiple exist)

modal.addEventListener('submit',(e)=>{
    e.preventDefault();
const title = document.getElementById('title').value;
const body = document.getElementById('Body').value;
const postData ={
    title,body
}
console.log(title,body);
// Make the POST request to Firebase
fetch('https://jsonproject-e6686-default-rtdb.firebaseio.com/product.json', {
    method: 'POST',
    body: JSON.stringify(postData)
})
.then((response) => {
    // Check for CORS preflight error
    if (!response.ok) {
        throw new Error('CORS preflight failed');
    }
    return response.json();
})
.then((data) => {
    console.log(data); // Log the response data
})
.catch((error) => {
    console.error('Error:', error); // Handle any errors
});

})

// Get references to HTML elements:
const tableBody = document.getElementById("tableBody");
// const tableResults = document.getElementById("tableData");
// const modal = document.querySelector('.modal');
const updateModal = document.getElementById('update-modal'); // Assuming you have a specific update modal

// Function to fetch and display data:
function fetchAndDisplayData() {
  fetch("https://jsonproject-e6686-default-rtdb.firebaseio.com/product.json")
    .then((response) => response.json())
    .then((data) => {
      const tableRows = Object.entries(data).reduce((rows, [productId, product]) => {
        return rows + `<tr>
          <td>${productId}</td>
          <td>${product.title}</td>
          <td>${product.body}</td>
          <td>
            <div class="btns">
              <button class="update">UPDATE</button>
              <button class="delete">DELETE</button>
            </div>
          </td>
        </tr>`;
      }, "");

      tableResults.innerHTML = tableRows; // Update the table with content
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      // Display an error message to the user
      tableResults.innerHTML = "Error fetching data. Please try again later.";
    });
}



//update code
tableResults.addEventListener('click', (e) => {
  let target = e.target;

  if (target.classList.contains('update')) {
    document.getElementById('update-modal').style.display = 'block';

    const postIdElement = target.closest('tr').querySelector('td:first-child'); // Get the post ID element
    if (postIdElement) {
      const postId = postIdElement.textContent;
       // Extract the post ID value
       console.log(postId)
      updatePostId=postId;
      
      fetch(`https://jsonproject-e6686-default-rtdb.firebaseio.com/product/${postId}.json`)
      .then((response) => response.json())
      .then((data) => {
        const selected = data;
        populateModalFields(selected);
      })
      .catch((error) => console.error(error));
    
    } else {
      console.warn('Post ID element not found');
    }
  }
});



  
  let populateModalFields = (post) => {
    if (post) {
      // Populate modal fields if post data is available
      document.getElementById("Updatetitle").value = post.title;
      document.getElementById('UpdateBody').value = post.body;
    } else {
      console.warn('Post data is undefined');
    }
  };

  let Update_Modal= document.getElementById('update-modal');
  Update_Modal.addEventListener('submit',(e)=>{
    e.preventDefault();
    let title= document.getElementById("Updatetitle").value;
    let body= document.getElementById("UpdateBody").value;
    console.log(title,body);
    console.log(updatePostId);
    let updatedPost={
        title,
        body
    }
    fetch(`https://jsonproject-e6686-default-rtdb.firebaseio.com/product/${updatePostId}.json`,{
        method:'PUT',
        body:JSON.stringify(updatedPost)
    })

  })


  //delete post

  tableResults.addEventListener('click',(e)=>{
    let target = e.target;
    if(e.target.classList.contains("delete")){
        const postIdElement = target.closest('tr').querySelector('td:first-child').textContent; // Get the post ID element

        fetch(`https://jsonproject-e6686-default-rtdb.firebaseio.com/product/${postIdElement}.json`,{
            method:'delete',
        }).then((response)=>{
            console.log(response)
        })
    }

  })