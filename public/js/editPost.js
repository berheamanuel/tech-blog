// let post = window.location.pathname.split("/");

// // Allows user to edit posts from the post page
// const editPost = async (event) => {
//   event.preventDefault();
//   const title = document.getElementById("titleInput").value;
//   const description = document.getElementById("bodyInput").value;

//   if (title && description) {
//     const response = await fetch(`/api/post/${post[2]}`, {
//       method: "PUT",
//       body: JSON.stringify({
//         title,
//         description,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     if (response.ok) {
//       document.location.assign("/dashboard");
//     } else {
//       alert(response.statusText);
//     }
//   }
// };

// const submitButton = document.getElementById("editPost");

// // Event Listener
// submitButton.addEventListener("submit", editPost);

let blogPost = window.location.pathname.split("/");

// Function created allowing user to edit blog posts from the individual blog post page
const editPost = async (event) => {
  event.preventDefault();
 
 
  const comment_body = document.getElementById("editBtn").value.trim();

  
  document.location.assign(`/create/${post[2]}`);
};

const editButton = document.querySelectorAll("#editBtn");

// Iterates over all buttons on the page allowing for edit functionality
for (let i = 0; i < editButton.length; i++) {
  editButton[i].addEventListener("click", editPost);
}
