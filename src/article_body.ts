class ArticleBody extends HTMLElement {
  async connectedCallback() {
    const url = this.getAttribute("url");
    const state = this.getAttribute("state");
    const body = this.getAttribute("body") || "";
    const summary = this.getAttribute("summary") || "";

    if (state !== "done") {
      this.innerHTML = `<sl-progress-bar indeterminate></sl-progress-bar>`;
      this.innerHTML += `<p>${state}</p>`;
    } else {
      this.innerHTML = `<sl-tab-group>
    <sl-tab-group>
  <sl-tab slot="nav" panel="unbiased">Unbiased</sl-tab>
  <sl-tab slot="nav" panel="original">Original</sl-tab>

  <sl-tab-panel name="unbiased">
    <zero-md class="border-solid border-2 border-indigo-600 p-4 rounded-md bg-white">
      <script type="text/markdown">${summary}</script>
    </zero-md>
  </sl-tab-panel>
  <sl-tab-panel name="original">
    <zero-md class="border-solid border-2 border-indigo-600 p-4 rounded-md bg-white">
          <script type="text/markdown">${body}</script>
    </zero-md>
  </sl-tab-panel>
</sl-tab-group>
<p class="text-sm text-gray-500 pb-8"><a href="${url}" target="_blank">${url}</a></p>`;
      // if (summary != "null") {
      //   this.innerHTML += `<zero-md class="border-solid border-2 border-indigo-600 p-4 rounded-md bg-white">
      //   <script type="text/markdown">${summary}</script>
      //   </zero-md>`;
      // }
      // this.innerHTML += ``;
    }
  }
}
customElements.define("article-body", ArticleBody);
