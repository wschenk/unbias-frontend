class ArticleBody extends HTMLElement {
  async connectedCallback() {
    const url = this.getAttribute("url");
    const state = this.getAttribute("state");
    // const body = this.getAttribute("body");
    const summary = this.getAttribute("summary");

    if (state !== "done") {
      this.innerHTML = `<sl-progress-bar indeterminate></sl-progress-bar>`;
      this.innerHTML += `<p>${state}</p>`;
    }

    if (summary != "null") {
      this.innerHTML += `<zero-md class="border-solid border-2 border-indigo-600 p-4 rounded-md bg-white">
      <script type="text/markdown">${summary}</script>
      </zero-md>`;
    }
    this.innerHTML += `<p class="text-sm text-gray-500 pb-8"><a href="${url}" target="_blank">${url}</a></p>`;
  }
}
customElements.define("article-body", ArticleBody);
