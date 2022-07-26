import Editor from "./components/Editor.js";
import { setItem, getItem } from "./api/storage.js";
const $target = document.querySelector("#app");

// new App({ $target });

const TEMP_POST_SAVE_KEY = "temp-post";

const post = getItem(TEMP_POST_SAVE_KEY, {
  title: "",
  content: "",
});

new Editor({
  $target,
  initialState: post,
  onEditing: (post) => {
    setItem(TEMP_POST_SAVE_KEY, {
      ...post,
      tempSaveDate: new Date(),
    });
  },
});
