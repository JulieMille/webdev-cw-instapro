import { USER_POSTS_PAGE, POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken, renderApp } from "../index.js";
import { getPosts, sendLike, sendDislike, posssts } from "../api.js";

export function renderPostsPageComponent({ appEl, posssts }) {

  function initLikes() {
    for (let postLike of document.querySelectorAll(".like-button")) {
      let index = postLike.dataset.index;
      postLike.addEventListener('click', () => {
        console.log(`liked already ${postLike.dataset.isliked}`);
        if (postLike.dataset.isliked === 'true') {
          sendDislike({
            token: getToken(),
            id: postLike.dataset.postId,
          })
            .then(() => {
              getPosts({ getToken });
              posssts[index].isLiked = false;
              posssts[index].likes.forEach((user, indx) => {
                if (user.id === JSON.parse(window.localStorage.getItem("user"))._id) {
                  posssts[index].likes.splice(indx, 1);
                }
              })
            })
            .then(() => {
              return rendering();
            });
        } else if (postLike.dataset.isliked === 'false') {
          sendLike({
            token: getToken(),
            id: postLike.dataset.postId,
          })
            .then(() => {
              getPosts({ getToken });
              posssts[index].isLiked = true;
              posssts[index].likes.push({ id: JSON.parse(window.localStorage.getItem("user"))._id, name: JSON.parse(window.localStorage.getItem("user")).name });
            })
            .then(() => {
              return rendering();
            });
        }
      });
    }
  }

  function rendering() {

    let possstsHtml = posssts.map((possst, index) => {
      return `<li class="post" data-post-index=${index}>
                        <div class="post-header" data-user-id="${possst.userId}">
                            <img src="${possst.userImageUrl}" class="post-header__user-image">
                            <p class="post-header__user-name">${possst.userName}</p>
                        </div>
                        <div class="post-image-container">
                          <img class="post-image" src=${possst.imageUrl}>
                        </div>
                        <div class="post-likes">
                          <button data-post-id=${possst.id} data-userId=${possst.userId} data-username=${possst.userName} data-index=${index} data-isLiked=${possst.isLiked} class="like-button">
                            <img src="./assets/images/${possst.isLiked ? "like-active" : "like-not-active"}.svg">
                          </button>
                          <p class="post-likes-text">
                            Нравится: <strong>${possst.likes.length}</strong>
                          </p>
                        </div>
                        <p class="post-text">
                          <span class="user-name">${possst.userName}</span>
                          ${possst.text}
                        </p>
                        <p class="post-date">
                          ### минут назад
                        </p>
                      </li>`;
    }).join('');

    const appHtml = `<div class="page-container">
    <div class="header-container"></div>
    <ul class="posts">
    ${possstsHtml}
    </ul>
    </div>`

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });
    initLikes();

  };

  rendering();

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

}
