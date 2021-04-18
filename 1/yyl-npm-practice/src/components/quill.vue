<template>
  <div>
    <div id="editor"></div>
  </div>
</template>

<script>
import Quill from "quill";
import "quill/dist/quill.snow.css";
export default {
  name: "editor",
  props: {
    value: Object,
  },
  data() {
    return {
      quill: null,
      options: {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] },"bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" },{ align: [] },{ color: [] }, { background: [] }],
            ["link", "image","clean"],
            //[{ script: "sub" }, { script: "super" }],
            // ["video"],
            //[{ indent: "-1" }, { indent: "+1" }],
            //[{ direction: "rtl" }],
            //[{ font: [] }],
            //['blockquote', 'code-block'],
            //[{ 'header': 1 }, { 'header': 2 }],
            //[{ 'size': ['small', false, 'large', 'huge'] }],
          ],
        },
        placeholder: "我的笔记 ...",
      },
    };
  },
  mounted() {
    let dom = this.$el.querySelector("#editor");
    this.quill = new Quill(dom, this.options);
    this.quill.setContents(this.value);
    this.quill.on("text-change", () => {
      this.$emit("input", this.quill.getContents());
    });
  },
};
</script> 