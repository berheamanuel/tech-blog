// Function to delete posts from the individual blog post page
const deletePost = async (event) => {
  event.preventDefault();

  let post = window.location.pathname.split("/");

  const response = await fetch(`/api/blogPost/${post[2]}`, {
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
