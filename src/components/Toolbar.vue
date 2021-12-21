<template>
    <div>
        <div class="toolbar">
            <img :src="imgUrl"
             class="logo"/>
            <span class="logoText">Visual Grag</span>
            <el-button @click="save" style="margin-left: 10px;">保存</el-button>
            <el-button @click="preview" style="margin-left: 10px;">预览</el-button>
            <el-button @click="exportCode" style="margin-left: 10px;">导出代码</el-button>
        
        </div>
        <!-- 预览 -->
        <Preview v-model="isShowPreview" @change="handlePreviewChange" />
        <ExportCode v-model="isShowExportCode"/>
    </div>
</template>

<script>
import generateID from '@/utils/generateID'
import toast from '@/utils/toast'
import { mapState } from 'vuex'
import Preview from '@/components/Editor/Preview'
import ExportCode from '@/components/Editor/ExportCode'
import { commonStyle, commonAttr } from '@/custom-component/component-list'
import eventBus from '@/utils/eventBus'

export default {
    components: { Preview, ExportCode },
    data() {
        return {
            imgUrl: require('../assets/drag.png'),
            isShowPreview: false,
            isShowExportCode: false,
            needToChange: [
                'top',
                'left',
                'width',
                'height',
                'fontSize',
                'borderWidth',
            ],
            scale: '100%',
            timer: null,
        }
    },
    computed: mapState([
        'componentData',
        'canvasStyleData',
        'areaData',
        'curComponent',
    ]),
    created() {
        eventBus.$on('preview', this.preview)
        eventBus.$on('save', this.save)
        eventBus.$on('exportCode', this.exportCode)

        this.scale = this.canvasStyleData.scale
    },
    methods: {
        format(value) {
            const scale = this.scale
            return value * parseInt(scale) / 100
        },
        preview() {
            this.isShowPreview = true
            this.$store.commit('setEditMode', 'preview')
        },
        exportCode() {
            this.isShowExportCode = true
            let htmlcode = document.getElementById('editor').innerHTML
            this.$store.commit('changeHtmlCode', htmlcode)
        },

        save() {
            localStorage.setItem('componentsData', JSON.stringify(this.componentData))
            localStorage.setItem('componentsStyle', JSON.stringify(this.canvasStyleData))
            this.$message.success('保存成功')
        },

        handlePreviewChange() {
            this.$store.commit('setEditMode', 'edit')
        },
    },
}
</script>

<style lang="scss" scoped>
.toolbar {
    padding: 15px 10px;
    white-space: nowrap;
    overflow-x: auto;
    background: #fff;
    border-bottom: 1px solid #ddd;

    .logo {
        margin-left: 30px;
        margin-right: 10px;
    }

    .logoText{
        font-size: 18px;
        font-weight: bold;
        margin-right: 30px;
    }

    .canvas-config {
        display: inline-block;
        margin-left: 10px;
        font-size: 14px;
        color: #606266;

        input {
            width: 50px;
            margin-left: 10px;
            outline: none;
            padding: 0 5px;
            border: 1px solid #ddd;
            color: #606266;
        }

        span {
            margin-left: 10px;
        }
    }

    .insert {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #FFF;
        border: 1px solid #DCDFE6;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        padding: 9px 15px;
        font-size: 12px;
        border-radius: 3px;
        margin-left: 10px;

        &:active {
            color: #3a8ee6;
            border-color: #3a8ee6;
            outline: 0;
        }

        &:hover {
            background-color: #ecf5ff;
            color: #3a8ee6;
        }
    }
}
</style>
