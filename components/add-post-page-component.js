import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";
import { sendPost, uploadImage } from "../api.js";
import { getToken } from "../index.js"

let url = '';

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="head"></div>
    <div class="post-page-container">
      <div class="header-container" id="add-post-container"></div>
      Добавить пост
      <div class="choose-picture-button"></div>
      <div>
      <div> Описание фотографии </div>
      <input type="text" class="post-description-input"></div>
      <button class="button" id="add-button">Добавить</button>
    </div>
  `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".head")
    });

    renderUploadImageComponent({
      element: document.querySelector(".choose-picture-button"),
      onImageUrlChange: (imageUrl) => {
        imageUrl = imageUrl;
        url = imageUrl;
      }
    })

    const postDescriptionInput = document.querySelector(".post-description-input");

    document.getElementById("add-button").addEventListener("click", () => {
      uploadImage({ url })
        .then((data) => {
          console.log(data.fileUrl);
          url = data.fileUrl;
          return url;
        })
      onAddPostClick({
        description: postDescriptionInput.value,
        imageUrl: url,
      });
      sendPost({
        token: getToken(),
        description: postDescriptionInput.value,
        imageUrl: url,
      })
    });
  };

  render();
}
