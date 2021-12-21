<template>
    <div class="home">
        <Toolbar />
        <main>
            <!-- 左侧组件列表 -->
            <section class="left">
                <ComponentList />
            </section>
            <!-- 中间画布 -->
            <section class="center" id="editor">
                <div class="content" 
                @drop="handleDrop" 
                @dragover="handleDragOver"
                @mousedown="handleMouseDown" 
                @mouseup="deselectCurComponent">
                    <Editor />
                </div>
            </section>
            <!-- 右侧属性列表 -->
            <section class="right">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="属性" name="attr">
                        <AttrList v-if="curComponent" />
                        <p v-else class="placeholder">请选择组件</p>
                    </el-tab-pane>
                    <el-tab-pane label="事件" name="events">
                        <EventList v-if="curComponent" />
                        <p v-else class="placeholder">请选择组件</p>
                    </el-tab-pane>
                </el-tabs>
            </section>
        </main>
    </div>
</template>

<script>
import Editor from '@/components/Editor/index'
import Toolbar from '@/components/Toolbar'
import ComponentList from '@/components/ComponentList' 
import AttrList from '@/components/AttrList'
import componentList from '@/custom-component/component-list'
import EventList from '@/components/EventList' 
import { deepCopy } from '@/utils/utils'
import { mapState } from 'vuex'
import generateID from '@/utils/generateID'
import { listenGlobalKeyDown } from '@/utils/shortcutKey'

export default {
    components: { Editor, Toolbar, ComponentList, AttrList, EventList },
    data() {
        return {
            activeName: 'attr',
        }
    },
    computed: mapState([
        'componentData',
        'curComponent',
        'isClickComponent',
        'canvasStyleData',
        'editor',
    ]),
    created() {
        this.restore()
        // 全局监听按键事件
        listenGlobalKeyDown()
    },
    methods: {
        restore() {
            // 用保存的数据恢复画布
            if (localStorage.getItem('canvasData')) {
                this.$store.commit('setComponentData', this.resetID(JSON.parse(localStorage.getItem('canvasData'))))
            }

            if (localStorage.getItem('canvasStyle')) {
                this.$store.commit('setCanvasStyle', JSON.parse(localStorage.getItem('canvasStyle')))
            }
        },
        resetID(data) {
            data.forEach(item => {
                item.id = generateID()
            })

            return data
        },
        handleDrop(e) {
            console.log(e)
            // 取消默认行为
            e.preventDefault()
            e.stopPropagation()
            const index = e.dataTransfer.getData('index')
            // 获取当前元素的位置
            const rectInfo = this.editor.getBoundingClientRect()
            if (index) {
                const component = deepCopy(componentList[index])
                component.style.top = e.clientY - rectInfo.y
                component.style.left = e.clientX - rectInfo.x
                component.id = generateID()
                this.$store.commit('addComponent', { component })
            }
        },

        handleDragOver(e) {
            e.preventDefault()
            // 在新位置生成源项的副本
            e.dataTransfer.dropEffect = 'copy'
        },

        handleMouseDown() {
            this.$store.commit('setClickComponentStatus', false)
        },

        deselectCurComponent(e) {
            if (!this.isClickComponent) {
                this.$store.commit('setCurComponent', { component: null, index: null })
            }
        },
    },
}
</script>

<style lang="scss">
.home {
    height: 100vh;
    background: #fff;

    main {
        height: calc(100% - 64px);
        position: relative;

        .left {
            position: absolute;
            height: 100%;
            width: 200px;
            left: 0;
            top: 0;
            padding-top: 10px;
        }

        .right {
            position: absolute;
            height: 100%;
            width: 262px;
            right: 0;
            top: 0;
        }

        .center {
            margin-left: 200px;
            margin-right: 262px;
            background: #f5f5f5;
            height: 100%;
            overflow: auto;
            padding: 20px;

            .content {
                width: 100%;
                height: 100%;
                overflow: auto;
                margin: auto;
            }
        }
    }

    .placeholder {
        text-align: center;
        color: #333;
    }
}
</style>
