// import VMdEditor from '@kangc/v-md-editor/lib/base-editor'
import VMdCodeEditor from '@kangc/v-md-editor/lib/codemirror-editor'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
// VMdEditor.use(vuepressTheme)
VMdCodeEditor.use(vuepressTheme)
VMdPreview.use(vuepressTheme)
import 'prismjs/components/prism-less'
import 'prismjs/components/prism-json'
export default {
    // VMdEditor,
    VMdCodeEditor,VMdPreview
}