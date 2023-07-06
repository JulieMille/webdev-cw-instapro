import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { getPosts, posssts, userPosssts } from "../api.js";

export function renderUserPostsPageComponent({ appEl, userPosssts }) {

  let possstsHtml = userPosssts.map((possst, index) => {
    return `<li class="post" data-post-index=${index}>
                      <div class="post-header" data-user-id="${possst.user.id}">
                          <img src="${possst.user.imageUrl}" class="post-header__user-image">
                          <p class="post-header__user-name">${possst.user.name}</p>
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
                        <span class="user-name">${possst.user.name}</span>
                        ${possst.description}
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

}
