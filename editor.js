import Quill from 'quill'

const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    [{ direction: 'rtl' }],
    [{ size: ['small', false, 'large', 'huge'] }],
    ["link", "image", "video", "formula"],
    ["clean"]
]

const quill = new Quill('#editor', {
    modules: {
        toolbar: TOOLBAR_OPTIONS
    },

    theme: 'snow',
})

//