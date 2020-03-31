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
            auto:{
                type:Boolean,
                default:false
            },
        },
        computed:{
            flipDir(){
                return `flip-${this.direction} flip-${this.auto?'auto':'unto'}`
            }
        }
    }
</script>

<style scoped lang="less">
    .flip-y,
    .flip-x{
        position: relative;
        color: inherit;
        cursor: pointer;
        width: 100%;
        height: 100%;
        perspective: 1000px;
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
    }
    .flip-unto{
        &.flip-x{
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
        &.flip-y{
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
    }
    @dur:4s;
    .flip-auto{
        &.flip-x{
            .front{
                transform: rotateX(0deg);
                animation: flipXF @dur ease-in-out infinite;
            }
            .back{
                transform: rotateX(180deg);
                animation: flipXB @dur ease-in-out infinite;
            }
        }
        &.flip-y{
            .front{
                transform: rotateY(0deg);
                animation: flipYF @dur ease-in-out infinite;
            }
            .back{
                transform: rotateY(180deg);
                animation: flipYB @dur ease-in-out infinite;
            }
        }
    }
    @keyframes flipXF {
        0%,100%{
            transform: rotateX(0deg);
        }
        50%{
            transform: rotateX(180deg);
        }
    }
    @keyframes flipXB {
        0%,100%{
            transform: rotateX(180deg);
        }
        50%{
            transform: rotateX(0deg);
        }
    }
    @keyframes flipYF {
        0%,100%{
            transform: rotateY(0deg);
        }
        50%{
            transform: rotateY(180deg);
        }
    }
    @keyframes flipYB {
        0%,100%{
            transform: rotateY(180deg);
        }
        50%{
            transform: rotateY(0deg);
        }
    }
</style>