import "./article_body";
import { clerk } from "./clerk";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

class ArticleList extends HTMLElement {
  async connectedCallback() {
    this.innerHTML = "<sl-progress-bar indeterminate></sl-progress-bar>";
    await clerk.load();
    console.log("postArticle start");
    const token = await clerk.session?.getToken();

    const response = await fetch(`${backendUrl}/articles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    this.innerHTML = "";

    data.forEach((article: any) => {
      const articleElement = document.createElement("article-body");
      articleElement.setAttribute("url", article.url);
      articleElement.setAttribute("state", article.state);
      articleElement.setAttribute("body", article.body);
      articleElement.setAttribute("summary", article.summary);
      this.appendChild(articleElement);
    });
  }
}
customElements.define("article-list", ArticleList);
