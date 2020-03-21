<template>
    <transition>
        <div v-show="visible" class="meteor-modal-wrapper">
            <div class="modal-mask" v-if="mask" @click="handleMaskClick"></div>
            <div class="modal-content" :style="mainStyles">
                <div class="modal-header">
                    <slot name="title">
                        <span>{{title}}</span>
                    </slot>
                </div>
                <div class="modal-body">
                    <slot name="content">
                        modal
                    </slot>
                </div>
                <div class="modal-footer" v-if="!footerHide">
                    <slot name="footer">
                        <button class="footer-btn footer-close" @click="handleClose">{{cancelText}}</button>
                        <button class="footer-btn footer-submit" @click="handleSubmit">{{okText}}</button>
                    </slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "sao-dialog",
        props:{
            value:{
                type:Boolean,
                default:false
            },
            type:{
                type:String,
                default:'default'
            },
            width:{
                type:[Number,String],
                default:520
            },
            title:{
                type:String,
                default:'标题'
            },
            mask:{
                type:Boolean,
                default:true
            },
            maskCloseable:{
                type:Boolean,
                default:true
            },
            footerHide:{
                type:Boolean,
                default:false
            },
            okText:{
                type:[Number,String],
                default:'确认'
            },
            cancelText:{
                type:[Number,String],
                default:'取消'
            }
        },
        data(){
          return {
              visible:false
          }
        },
        computed: {
            mainStyles(){
                let style = {};
                style.width = `${parseInt(this.width)}px`;
                return style;
            }
        },
        watch:{
            value(val){
                this.visible=val
            },
            visible(val){
                this.$emit('input', val)
            }
        },
        methods:{
            handleMaskClick(){
              if(this.maskCloseable)this.visible = !this.visible
            },
            handleClose(){
                this.$emit('on-close');
                this._closeModal();
            },
            handleSubmit(){
                this.$emit('on-ok');
                this._closeModal();
            },
            _closeModal(){
                this.visible = false
            }
        },
        created(){
            this.visible = !!this.value
        }
    }
</script>

<style scoped lang="less">
@import "./modal.less";
</style>