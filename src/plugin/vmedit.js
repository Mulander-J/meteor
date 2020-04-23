import VMdCodeEditor from '@kangc/v-md-editor/lib/codemirror-editor'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index'
VMdCodeEditor.use(vuepressTheme)
VMdPreview.use(vuepressTheme)
VMdCodeEditor.use(createTodoListPlugin())
VMdPreview.use(createTodoListPlugin())
import 'prismjs/components/prism-less'
import 'prismjs/components/prism-json'
export default {
    VMdCodeEditor,VMdPreview
}