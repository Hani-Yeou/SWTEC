export default function Editor({
  $target,
  initialState = {
    title: "",
    content: "",
  },
  onEditing,
}) {
  const $editor = document.createElement("div");

  let isinitialize = false;

  this.state = initialState;

  $target.appendChild($editor);

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelectorAll("[name=title]").value = this.state.title;
    $editor.querySelectorAll("[name=content]").value = this.state.content;
    this.render();
  };

  this.render = () => {
    const { title, content } = this.state;
    if (!isinitialize) {
      $editor.innerHTML = `
        <input type="text" name="title" style="width:600px; height:100px" value="${title}" />
        <textarea name="content" style="width:600px; height:400px;">${content}</textarea>
      `;

      isinitialize = true;
    }
  };

  this.render();

  $editor.addEventListener("keyup", (e) => {
    const { target } = e;

    const name = target.getAttribute("name");

    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: target.value,
      };

      this.setState(nextState);
      onEditing(this.state);
    }
  });
}