import { Clerk } from "@clerk/clerk-js";
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const clerk = new Clerk(clerkPubKey);

class ArticleParser extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<p>${this.getAttribute(
      "url"
    )}</p><sl-progress-bar indeterminate></sl-progress-bar>

`;
    console.log("ArticleParser connected");

    this.postArticle();
  }

  async postArticle() {
    await clerk.load();

    console.log("postArticle start");
    const token = await clerk.session?.getToken();
    const results = document.getElementById("results");
    if (!token || !results) {
      if (results) {
        results.textContent = "Error: Unable to get authentication token";
      }
      return;
    }

    const response = await fetch(`${backendUrl}/article`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        url: this.getAttribute("url"),
      }),
    });

    console.log("postArticle result");

    const data = await response.json();
    this.processData(data);
  }

  async processData(data: any) {
    console.log(data);

    this.renderArticle(data);

    if (data.state !== "done") {
      setTimeout(async () => {
        console.log("polling");
        const response = await fetch(`${backendUrl}/article/${data.id}`);
        const new_data = await response.json();
        this.processData(new_data);
      }, 1000);
    }
  }

  renderArticle(data: any) {
    const results = document.getElementById("results");

    const articleElement = document.createElement("article-body");
    articleElement.setAttribute("url", data.url);
    articleElement.setAttribute("state", data.state);
    articleElement.setAttribute("body", data.body);
    articleElement.setAttribute("summary", data.summary);
    if (results) {
      results.innerHTML = "";
      results.appendChild(articleElement);
    }
  }
}

customElements.define("article-parser", ArticleParser);
