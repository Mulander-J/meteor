import Vue from 'vue'
import SaoDialog from './sao-dialog.vue'

const defProp={
    title:'标题',
    value:true
};

function install(Vue) {
    Vue.saoDialog = Vue.prototype.saoDialog = {
        open
    }
}

function open(props) {
    let UiDialog = Vue.extend(SaoDialog)
    let vm = new UiDialog({
        propsData: { ...defProp,...props },
        methods: {
            handleClose: function () {
                let dialog = this.$el
                document.body.removeChild(dialog)
                this.$destroy()
                dialog = null
            }
        }
    }).$mount()
    document.body.appendChild(vm.$el)
}


Vue.use(install)

export default install