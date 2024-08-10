import "./style.css";
import "@shoelace-style/shoelace/dist/themes/light.css";
import "@shoelace-style/shoelace";
import "./article_parser";
import "./aritcle_list";
import { clerk } from "./clerk";
import ZeroMd from "zero-md";

customElements.define("zero-md", ZeroMd);

window.addEventListener("load", async () => {
  await clerk.load();

  // Authentication
  const signinbutton = document.querySelectorAll(".sign-in");
  const appContainer = document.querySelector(".app-container");

  if (clerk.user) {
    const userButtonDiv = document.getElementById("profileContainer");
    signinbutton?.forEach((button) => {
      button.classList.add("hidden");
    });
    if (appContainer) {
      appContainer.classList.remove("hidden");
    }

    const splashScreen = document.getElementById("splash-screen");
    if (splashScreen) {
      splashScreen.classList.add("hidden");
    }

    if (userButtonDiv) {
      clerk.mountUserButton(userButtonDiv as HTMLDivElement);
    }
  } else {
    signinbutton.forEach((button) => {
      button.addEventListener("click", () => {
        clerk.openSignIn();
      });
    });
  }

  // Wire up the url button
  const urlInput = document.getElementById("url-input");
  urlInput?.addEventListener("sl-change", (event) => {
    const target = event.target as HTMLInputElement;
    if (target && target.value) {
      console.log(target.value);
      const results = document.getElementById("results");
      if (results) {
        results.innerHTML = `<article-parser url="${target.value}"></article-parser>`;
      }
      target.value = "";

      appContainer?.classList.add("hidden");
    }
  });

  // Example of a api query to a backend
  const mainButton = document.getElementById("main-button");

  mainButton?.addEventListener("click", async () => {
    await clerk.load();

    const token = await clerk.session?.getToken();
    const results = document.getElementById("results");
    if (!token || !results) {
      if (results) {
        results.textContent = "Error: Unable to get authentication token";
      }
      return;
    }

    const response = await fetch("http://localhost:9292/private", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log(data);
    results.textContent = JSON.stringify(data);
  });
});
