// choicesModule.js

async function initChoicesWithSearch(elementId, searchApiEndpoint) {
  const selectElement = document.getElementById(elementId);

  const choices = new Choices(selectElement, {
    searchEnabled: true,
    searchChoices: async function (value) {
      try {
        const response = await fetch(`${searchApiEndpoint}?query=${value}`);
        const data = await response.json();
        return data.map((item) => ({
          value: item._id,
          label: item.clientName,
        }));
        // Assuming data is an array of objects with clientId and clientName properties
      } catch (error) {
        console.error("Error searching:", error);
        return [];
      }
    },
    // Other options for Choices.js
  });

  return choices;
}

export { initChoicesWithSearch };
