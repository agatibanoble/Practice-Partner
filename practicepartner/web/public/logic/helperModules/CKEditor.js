// CKEditorModule.js
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

let editorInstance = null;

const initializeCKEditor = (element) => {
  return new Promise((resolve, reject) => {
    if (editorInstance) {
      resolve(editorInstance);
    } else {
      ClassicEditor.create(document.querySelector(element))
        .then((editor) => {
          editorInstance = editor;
          resolve(editorInstance);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
};

const getEditorInstance = async (element) => {
  if (!editorInstance) {
    try {
      editorInstance = await initializeCKEditor(element);
    } catch (error) {
      console.error("Error initializing CKEditor:", error);
    }
  }
  return editorInstance;
};

export { initializeCKEditor, getEditorInstance };
