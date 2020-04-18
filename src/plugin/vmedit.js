import VMdCodeEditor from '@kangc/v-md-editor/lib/codemirror-editor'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
VMdCodeEditor.use(vuepressTheme)
VMdPreview.use(vuepressTheme)
import 'prismjs/components/prism-less'
import 'prismjs/components/prism-json'
export default {
    VMdCodeEditor,VMdPreview
}