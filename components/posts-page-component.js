import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { getPosts, posssts } from "../api.js";

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */

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
                        <button data-post-id=${possst.id} class="like-button">
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
                    </li>`
  })

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

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}
