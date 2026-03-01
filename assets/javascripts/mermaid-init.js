document.addEventListener("DOMContentLoaded", () => {
  if (typeof window.mermaid === "undefined") return;

  const isDark =
    document.body.getAttribute("data-md-color-scheme") === "slate";

  window.mermaid.initialize({
    startOnLoad: false,
    securityLevel: "loose",
    theme: "base",
    themeVariables: {
      background: "transparent",
      primaryColor: isDark ? "#102335" : "#eef5f8",
      primaryTextColor: isDark ? "#d5e8f0" : "#122431",
      primaryBorderColor: isDark ? "#4dd9cf" : "#0d7d89",
      lineColor: isDark ? "#82a9bc" : "#385262",
      tertiaryColor: isDark ? "#0d1e2d" : "#e7f2f3",
      fontFamily: "IBM Plex Sans, sans-serif",
    },
    flowchart: {
      curve: "basis",
      padding: 18,
    },
  });

  const mermaidStarts = [
    "flowchart",
    "graph ",
    "sequenceDiagram",
    "classDiagram",
    "stateDiagram",
    "erDiagram",
    "journey",
    "gantt",
    "pie ",
    "mindmap",
    "timeline",
    "gitGraph",
    "requirementDiagram",
    "quadrantChart",
    "xychart-beta",
  ];

  const blocks = Array.from(document.querySelectorAll("pre code")).filter(
    (code) => {
      const text = (code.textContent || "").trimStart();
      const hasExplicitClass =
        code.classList.contains("language-mermaid") ||
        code.classList.contains("mermaid");
      const hasMermaidPrefix = mermaidStarts.some((prefix) =>
        text.startsWith(prefix)
      );
      return hasExplicitClass || hasMermaidPrefix;
    }
  );

  blocks.forEach((code) => {
    const pre = code.parentElement;
    if (!pre || !pre.parentElement) return;
    const container = document.createElement("div");
    container.className = "mermaid";
    container.textContent = code.textContent || "";
    pre.parentElement.replaceChild(container, pre);
  });

  window.mermaid.run({ querySelector: ".mermaid" });
});
