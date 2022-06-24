const users = document.querySelector(".users");
const posts = document.querySelector(".posts");
const comments = document.querySelector(".comments");
const photos = document.querySelector(".photos");
async function GetUsersPhoto() {
  let res = await fetch("json/photos.json");
  let data = await res.json();
  return data;
}
async function GetPostComment() {
  let res = await fetch("json/comments.json");
  let data = await res.json();
  return data;
}
async function GetUsersPosts() {
  let res = await fetch("json/posts.json");
  let data = await res.json();
  return data;
}
async function GetUserData() {
  let res = await fetch("json/users.json");
  let data = await res.json();
  return data;
}
GetUserData().then((data) => {
  for (let x = 0; x < data.length; x++) {
    users.innerHTML += `<li class="user_name">${data[x].name}</li>`;
    const user_name = document.querySelectorAll(".user_name");
    for (let y = 0; y < user_name.length; y++) {
      user_name[y].addEventListener("click", (e) => {
        GetUsersPosts().then((data) => {
          for (let z = 0; z < data.length; z++) {
            if (data[z].userId == y + 1) {
              posts.innerHTML += `<li class="user_posts">${data[z].title}</li>`;
              const user_posts = document.querySelectorAll(".user_posts");
              for (let t = 0; t < user_posts.length; t++) {
                user_posts[t].addEventListener("click", (ex) => {
                  console.log(t + 1 + 10 * y);
                  GetPostComment().then((data) => {
                    for (let m = 0; m < data.length; m++) {
                      if (data[m].postId == t + 1 + 10 * y) {
                        comments.innerHTML += `<li class="user_comments">${data[m].email}</li>`;
                      }
                    }
                  });
                  GetUsersPhoto().then((data) => {
                    for (let h = 0; h < data.length; h++) {
                      if (data[h].albumId == t + 1 + 10 * y) {
                        photos.innerHTML += `<li><img width="50px" heigth="50px" src=${data[h].url} ></li>`;
                      }
                    }
                  });
                  comments.innerHTML = "";
                  photos.innerHTML = "";
                });
              }
            }
          }
        });
        posts.innerHTML = "";
        comments.innerHTML = "";
        photos.innerHTML = "";
      });
    }
  } 
});
