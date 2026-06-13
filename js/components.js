/* ==========================================================================
   RISALA — Shared Components
   Injects the navbar, footer, "Ask your question" sidebar and the
   "Message us" form into every page. Edit the data below once and it
   updates across the whole site.
   ========================================================================== */

const SITE = {
  name: "Risala",
  subline: "Faith, Knowledge & Reflection",
  logo: "assets/logo.svg",
  gazvaUrl: "https://gazva.example.com", // TODO: replace with the real Gazva site link
  email: "hello@risala.example.com",
  whatsapp: "https://wa.me/910000000000",
  whatsappDisplay: "+91 00000 00000",
  phone: "+91 00000 00000",
  instagram: "https://instagram.com/risala",
  facebook: "https://facebook.com/risala",
  // TODO: replace with your real Web3Forms access key from https://web3forms.com
  // (Get a free key by entering your email there — no signup needed.)
  web3formsKey: "e42fb4ab-a451-4953-b6ed-7b6fcc81f819"
};

const NAV_LINKS = [
  { href: "index.html", label: "Home" },
  { href: "fiqh.html", label: "Fiqh" },
  { href: "quran.html", label: "Quran" },
  { href: "seerah.html", label: "Seerah" },
  { href: "poem.html", label: "Poem" },
  { href: "story.html", label: "Story" },
  { href: "contact.html", label: "Contact us" }
];

/* --------------------------------------------------------------------
   Navbar
   -------------------------------------------------------------------- */
function renderNavbar() {
  const mount = document.getElementById("site-navbar");
  if (!mount) return;

  const links = NAV_LINKS.map(
    (link) => `<a href="${link.href}" data-nav="${link.href}">${link.label}</a>`
  ).join("");

  mount.innerHTML = `
    <nav class="navbar">
      <div class="container">
        <a class="brand" href="index.html">
          <img src="${SITE.logo}" alt="">
          <span class="brand-text">
            <span class="brand-name">${SITE.name}</span>
            <span class="brand-sub">${SITE.subline}</span>
          </span>
        </a>
        <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <div class="nav-links" id="nav-links">
          ${links}
          <a href="${SITE.gazvaUrl}" class="nav-external" target="_blank" rel="noopener">Gazva Media ↗</a>
        </div>
      </div>
    </nav>
  `;

  // Highlight active link
  const current = (window.location.pathname.split("/").pop() || "index.html");
  mount.querySelectorAll("[data-nav]").forEach((a) => {
    if (a.getAttribute("data-nav") === current) a.classList.add("active");
  });
}

/* --------------------------------------------------------------------
   Footer
   -------------------------------------------------------------------- */
function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;

  mount.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <span class="brand-name">${SITE.name}</span>
            <span class="brand-sub">${SITE.subline}</span>
            <p>Articles and reflections on Fiqh, Quran, Seerah, poetry and stories — in Malayalam and English.</p>
          </div>
          <div class="footer-col">
            <h4>Quick links</h4>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="fiqh.html">Fiqh</a></li>
              <li><a href="quran.html">Quran</a></li>
              <li><a href="seerah.html">Seerah</a></li>
              <li><a href="poem.html">Poem</a></li>
              <li><a href="story.html">Story</a></li>
              <li><a href="about.html">About us</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
              <li><a href="${SITE.whatsapp}" target="_blank" rel="noopener">WhatsApp: ${SITE.whatsappDisplay}</a></li>
              <li><span>${SITE.phone}</span></li>
              <li><a href="contact.html">Contact page →</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Follow us</h4>
            <div class="footer-social">
              <a href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="Instagram">IG</a>
              <a href="${SITE.facebook}" target="_blank" rel="noopener" aria-label="Facebook">FB</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 Risala. All rights reserved to Gazva.</span>
          <span>Powered by <a href="${SITE.gazvaUrl}" target="_blank" rel="noopener">Gazva Media</a></span>
        </div>
      </div>
    </footer>
  `;
}

/* --------------------------------------------------------------------
   Sidebar — Ask your question
   -------------------------------------------------------------------- */
function renderAskSidebar() {
  document.querySelectorAll('[data-component="ask-sidebar"]').forEach((mount) => {
    mount.innerHTML = `
      <div class="ask-box">
        <h3>Ask your question</h3>
        <p class="ask-instructions">
          Have a question about Fiqh, Quran, Seerah or anything else? Fill the form below
          and our team will reply by email. Please keep your question clear and specific —
          one question per submission helps us answer faster.
        </p>
        <form class="form-grid" data-form="ask-question">
          <div class="field">
            <label for="ask-name">Name</label>
            <input type="text" id="ask-name" name="name" required>
          </div>
          <div class="field">
            <label for="ask-email">Email</label>
            <input type="email" id="ask-email" name="email" required>
          </div>
          <div class="field">
            <label for="ask-subject">Subject</label>
            <input type="text" id="ask-subject" name="subject" required>
          </div>
          <div class="field">
            <label for="ask-category">Category</label>
            <select id="ask-category" name="category" required>
              <option value="">Select a category</option>
              <option value="fiqh">Fiqh</option>
              <option value="quran">Quran</option>
              <option value="seerah">Seerah</option>
              <option value="poem">Poem</option>
              <option value="story">Story</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="field">
            <label for="ask-question">Your question</label>
            <textarea id="ask-question" name="question" rows="4" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary btn-block">Submit question</button>
          <p class="form-success" data-success>Thank you — your question has been sent. We'll get back to you by email.</p>
          <p class="form-error" data-error>Something went wrong — please try again or email us directly.</p>
          <input type="checkbox" name="botcheck" style="display:none" tabindex="-1" autocomplete="off">
        </form>
      </div>
    `;
  });
}

/* --------------------------------------------------------------------
   Message us (footer band, on every page)
   -------------------------------------------------------------------- */
function renderMessageUs() {
  document.querySelectorAll('[data-component="message-us"]').forEach((mount) => {
    mount.innerHTML = `
      <section class="message-us">
        <div class="container">
          <div class="message-us-info">
            <span class="eyebrow">Get in touch</span>
            <h2>Message us</h2>
            <p>For feedback, corrections or collaboration, send us a message — we read every one.</p>
            <div class="contact-chip-list">
              <div class="contact-chip"><span class="chip-icon">✉</span> <a href="mailto:${SITE.email}">${SITE.email}</a></div>
              <div class="contact-chip"><span class="chip-icon">☎</span> ${SITE.phone}</div>
              <div class="contact-chip"><span class="chip-icon">⬡</span> <a href="${SITE.whatsapp}" target="_blank" rel="noopener">WhatsApp: ${SITE.whatsappDisplay}</a></div>
            </div>
          </div>
          <form class="message-us-form form-grid" data-form="message-us">
            <div class="form-row">
              <div class="field">
                <label for="msg-name">Name</label>
                <input type="text" id="msg-name" name="name" required>
              </div>
              <div class="field">
                <label for="msg-email">Email</label>
                <input type="email" id="msg-email" name="email" required>
              </div>
            </div>
            <div class="field">
              <label for="msg-subject">Subject</label>
              <input type="text" id="msg-subject" name="subject" required>
            </div>
            <div class="field">
              <label for="msg-message">Message</label>
              <textarea id="msg-message" name="message" rows="4" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Send message</button>
            <p class="form-success" data-success>Thanks for writing in — your message has been sent.</p>
            <p class="form-error" data-error>Something went wrong — please try again or email us directly.</p>
            <input type="checkbox" name="botcheck" style="display:none" tabindex="-1" autocomplete="off">
          </form>
        </div>
      </section>
    `;
  });
}

/* --------------------------------------------------------------------
   Init
   -------------------------------------------------------------------- */
function initComponents() {
  renderNavbar();
  renderFooter();
  renderAskSidebar();
  renderMessageUs();
  document.dispatchEvent(new Event("components:ready"));
}

document.addEventListener("DOMContentLoaded", initComponents);
