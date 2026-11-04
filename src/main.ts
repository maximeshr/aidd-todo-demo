import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (app) {
  app.innerHTML = `
    <main class="todo">
      <h1>AIDD Todo</h1>
      <p class="todo__empty">Nothing to do yet.</p>
    </main>
  `;
}
