(function () {
  const SUPPORT_EMAIL = "rufaidah.blw@gmail.com"; // <-- CHANGE THIS
  const APP_NAME = "Simply Resolve";

  function $(id) { return document.getElementById(id); }

  function encodeMail(subject, body) {
    const s = encodeURIComponent(subject || "");
    const b = encodeURIComponent(body || "");
    return `mailto:${SUPPORT_EMAIL}?subject=${s}&body=${b}`;
  }

  function baseDevicePrompt() {
    return [
      "—",
      "App version: ",
      "iOS version: ",
      "Device: ",
      "Expected: ",
      "Actual: ",
      "Steps to reproduce: ",
    ].join("\n");
  }

  function initYear() {
    const y = new Date().getFullYear();
    const el = $("year");
    if (el) el.textContent = String(y);
  }

  function initBugMailto() {
    const el = $("bugMailto");
    if (!el) return;
    const subject = `[${APP_NAME}] Bug report`;
    const body = `Hi,\n\nI found a bug:\n\n${baseDevicePrompt()}\n\nThanks.`;
    el.href = encodeMail(subject, body);
  }

  function initContactComposer() {
    const btn = $("sendBtn");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const from = ($("email")?.value || "").trim();
      const subjectInput = ($("subject")?.value || "").trim();
      const msg = ($("message")?.value || "").trim();

      const subject = subjectInput ? `[${APP_NAME}] ${subjectInput}` : `[${APP_NAME}] Support`;
      const body = [
        msg || "Hi, I need help with:",
        "",
        from ? `Reply-to (user provided): ${from}` : "",
        baseDevicePrompt(),
      ].filter(Boolean).join("\n");

      window.location.href = encodeMail(subject, body);
    });
  }

  function smoothScroll() {
    document.querySelectorAll("a[data-scroll]").forEach(a => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href") || "";
        if (!href.startsWith("#")) return;
        const el = document.querySelector(href);
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function initPolicyEmails() {
    const p = $("privacyEmail");
    if (p) p.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(`[${APP_NAME}] Privacy question`)}`;

    const t = $("termsEmail");
    if (t) t.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(`[${APP_NAME}] Terms question`)}`;
  }

  function setActiveDates({ updated }) {
    const el = $("updated");
    if (!el) return;
    el.textContent = updated || "";
  }

  window.SR = { setActiveDates };

  initYear();
  initBugMailto();
  initContactComposer();
  initPolicyEmails();
  smoothScroll();
})();
