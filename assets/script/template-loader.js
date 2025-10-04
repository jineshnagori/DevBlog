/**
 * Simple Template Loader - Keep it simple!
 */

// Simple template loader object
const templateLoader = {
  // Simple function to load and insert template
  async loadTemplate(templatePath, targetElement) {
    try {
      const response = await fetch(templatePath);
      const html = await response.text();
      document.querySelector(targetElement).innerHTML = html;
    } catch (error) {
      console.warn(`Could not load template: ${templatePath}`);
    }
  },

  // Load multiple templates at once
  async loadMultipleTemplates(templates) {
    const promises = templates.map(({ path, target }) =>
      this.loadTemplate(path, target)
    );
    await Promise.all(promises);
  },
};

// Make it globally available
window.templateLoader = templateLoader;
