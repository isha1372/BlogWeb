/* ==========================================================================
   RISALA — Main interactivity
   Runs after components.js has injected the navbar/footer/forms.
   ========================================================================== */

document.addEventListener("components:ready", () => {
  initMobileNav();
  initForms();
});

/* --------------------------------------------------------------------
   Mobile navigation toggle
   -------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close menu after a link is tapped (mobile)
  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* --------------------------------------------------------------------
   Forms — ask a question / message us / comments / contact
   Submits to Web3Forms (https://web3forms.com) using the access key set
   in js/components.js (SITE.web3formsKey). Get a free key by entering
   your email at web3forms.com — no signup or backend required.
   -------------------------------------------------------------------- */
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
web3formsKey: "e42fb4ab-a451-4953-b6ed-7b6fcc81f819"

function initForms() {
  document.querySelectorAll("form[data-form]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const successNote = form.querySelector("[data-success]");
      const errorNote = form.querySelector("[data-error]");
      const submitBtn = form.querySelector("button[type=submit]");

      // Hide any previous status messages
      if (successNote) successNote.classList.remove("visible");
      if (errorNote) errorNote.classList.remove("visible");

      if (!SITE.web3formsKey || SITE.web3formsKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
        console.warn(
          "Risala: add your Web3Forms access key to SITE.web3formsKey in js/components.js to enable form submissions."
        );
        if (errorNote) {
          errorNote.textContent =
            "Forms aren't connected yet — add a Web3Forms access key in js/components.js.";
          errorNote.classList.add("visible");
        }
        return;
      }

      const formData = new FormData(form);
      formData.append("access_key", SITE.web3formsKey);

      // Give each submission a useful subject line if the form doesn't have one
      if (!formData.get("subject")) {
        const formNames = {
          "ask-question": "New question",
          "message-us": "New message",
          comment: "New comment"
        };
        formData.append(
          "subject",
          `${formNames[form.dataset.form] || "New submission"} — Risala`
        );
      }

      // Helpful context for the recipient
      formData.append("page_url", window.location.href);
      formData.append("form_type", form.dataset.form);

      const originalBtnText = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }

      try {
        const response = await fetch(WEB3FORMS_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData
        });
        const result = await response.json();

        if (response.ok && result.success) {
          form.reset();
          if (successNote) {
            successNote.classList.add("visible");
            setTimeout(() => successNote.classList.remove("visible"), 6000);
          }
        } else {
          throw new Error(result.message || "Submission failed");
        }
      } catch (err) {
        if (errorNote) {
          errorNote.classList.add("visible");
          setTimeout(() => errorNote.classList.remove("visible"), 6000);
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
      }
    });
  });
}

/* --------------------------------------------------------------------
   "Load more" buttons on category pages (placeholder behaviour)
   -------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-load-more]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const hidden = document.querySelectorAll(".card.is-hidden");
      hidden.forEach((card) => card.classList.remove("is-hidden"));
      btn.style.display = "none";
    });
  });
});
