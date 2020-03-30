<template>
    <div :class="flipDir">
        <div class="front" :class="wrapClass">
            <slot name="front"></slot>
        </div>
        <div class="back" :class="wrapClass">
            <slot name="back"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FlipBox",
        props:{
            direction:{
                type:String,
                default:'x'
            },
            wrapClass:{
                type:String,
                default:''
            },
        },
        computed:{
            flipDir(){
                return `flip-${this.direction}`
            }
        }
    }
</script>

<style scoped lang="less">
    .front,.back{
        display: flex;
        background-position: center;
        background-size: cover;
        text-align: center;
        justify-content: center;
        align-items: center;
        position: absolute;
        height: 100%;
        width: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        transform-style: preserve-3d;
        transition: ease-in-out 600ms;
        background-color: transparent;
    }
    .flip-x{
        position: relative;
        color: inherit;
        cursor: pointer;
        width: 100%;
        height: 100%;
        perspective: 1000px;
        .front{
            transform: rotateX(0deg);
        }
        .back{
            transform: rotateX(180deg);
        }
        &:hover{
            .front{
                transform: rotateX(180deg);
            }
            .back{
                transform: rotateX(0deg);
            }
        }
    }
    .flip-y{
        position: relative;
        color: inherit;
        cursor: pointer;
        width: 100%;
        height: 100%;
        perspective: 1000px;
        .front{
            transform: rotateY(0deg);
        }
        .back{
            transform: rotateY(180deg);
        }
        &:hover{
            .front{
                transform: rotateY(180deg);
            }
            .back{
                transform: rotateY(0deg);
            }
        }
    }
</style>