import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

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
      }
    })

    document.getElementById("add-button").addEventListener("click", () => {
      onAddPostClick({
        description: "Описание картинки",
        imageUrl: "https://image.png",
      });
    });
  };

  render();
}
