const tableResults = document.getElementById("tableData");
let updatePostId ="";
document.addEventListener('DOMContentLoaded', ()=>{
    fetchPosts();
})

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



//adding posts

const modal = document.querySelector('.modal'); // Select the first modal element (if multiple exist)

modal.addEventListener('submit',(e)=>{
    e.preventDefault();
const title = document.getElementById('title').value;
const body = document.getElementById('Body').value;
console.log(title,body);

const headersData = new Headers();
headersData.append('content-type','application/json');
headersData.append('user','jagadish');

let postData={
    title,
    body
}

fetch('https://jsonplaceholder.typicode.com/posts',{
    method:'POST',
    headers:headersData,
    body:JSON.stringify(postData),

}).then((_response)=>{
       fetchPosts();
    closeModalDialog();
    e.target.reset();

})

})



function fetchPosts (){

    const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
    const headers = new Headers;
    headers.append('content','application/json');
    fetch(postsUrl ,{
        method: 'GET',
        headers:headers,
    }).then((response)=>{
   return response.json();
    }).then((posts)=>{
     let tableRows = "";
     for(let post of posts){
        tableRows += `<tr>
        <td>${post.id}</td>
        <td>${post.title}</td>
        <td>${post.body}</td>
        <td>
        <div class="btns">
            <button class="update">
                UPDATE
            </button>
            <button class="delete">
                DELETE
            </button>
        </div>
    </td
        </tr>`
     }
    //  console.log(tableRows);
    table.innerHTML= tableRows
    
    })



}





//updatecode
tableResults.addEventListener('click', (e) => {
    let target = e.target;
  
    if (target.classList.contains('update')) {
      document.getElementById('update-modal').style.display = 'block';
  
      const postIdElement = target.closest('tr').querySelector('td:first-child'); // Get the post ID element
      if (postIdElement) {
        const postId = postIdElement.textContent; // Extract the post ID value

        updatePostId=postId;
  
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
          method: 'get'
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => { // data contains the fetched post
            // Find the selected post within the fetched data
            const selectedPost = data;  // Assuming only one post is returned
            populateModalFields(selectedPost);
          })
          .catch((error) => {
            console.error('Error fetching post data:', error);
          });
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
    fetch(`https://jsonplaceholder.typicode.com/posts/${updatePostId}`,{
        method:'PUT',
        body:JSON.stringify(updatedPost)
    })

  })

  // delete code


  tableResults.addEventListener('click',(e)=>{
    let target = e.target;
    if(e.target.classList.contains("delete")){
        const postIdElement = target.closest('tr').querySelector('td:first-child').textContent; // Get the post ID element

        fetch(`https://jsonplaceholder.typicode.com/posts/${postIdElement}`,{
            method:'delete',
        }).then((response)=>{
            console.log(response)
        })
    }

  })
