<template>
    <div class="bg" v-if="show">
        <el-button @click="close" class="close">关闭</el-button>
        <div class="canvas-container">
             <div class="canvas">
                {{htmlcode}}
            </div>
        </div>
    </div>
</template>

<script>
import { getStyle } from '@/utils/style'
import { mapState } from 'vuex'
import { changeStyleWithScale } from '@/utils/translate'

export default {
    model: {
        prop: 'show',
        event: 'change',
    },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
    computed: mapState([
        'htmlcode',
        'componentData',
        'canvasStyleData',
    ]),
    methods: {
        changeStyleWithScale,
        getStyle,

        close() {
            this.$emit('change', false)
        },
    },
}
</script>

<style lang="scss" scoped>
.bg {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: fixed;
    background: rgb(0, 0, 0, .5);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    padding: 20px;

    .canvas-container {
        width: 70%;
        height: 100%;
        overflow: auto;

        .canvas {
            background: #fff;
            position: relative;
            margin: auto;
        }
    }

    .close {
        position: absolute;
        right: 20px;
        top: 20px;
    }
}
</style>