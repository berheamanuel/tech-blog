

// Function that allows for a user to edit blog posts on dashboard page 
const editPost = async (event) => {
  event.preventDefault();

  let postId = event.target.getAttribute("data-id");

  document.location.assign(`/create/${postId}`);
};

const editButton = document.querySelectorAll("#editBtn");

for (let i = 0; i < editButton.length; i++) {
  editButton[i].addEventListener("click", editPost);
}

// Function that allows users to delete blog posts on dashboard page 
const deletePost = async (event) => {
    event.preventDefault();
      
    let postId = event.target.getAttribute("data-id");
      
    const response = await fetch(`/api/post/${postId}`, {
      method: "DELETE",
    });
  
    if (response.ok) {
      document.location.assign(`/dashboard`);
    } else {
      alert(response.statusText);
    }
  };

const deleteButton = document.querySelectorAll("#deleteBtn");


for (let i = 0; i < deleteButton.length; i++) {
  deleteButton[i].addEventListener("click", deletePost);
}
