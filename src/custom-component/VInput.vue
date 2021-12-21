<template>
    <input class="v-input">
</template>

<script>
export default {
    props: {
        element: {
            type: Object,
        },
    },
}
</script>

<style lang="scss" scoped>
.v-input {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    border: 1px solid #DCDFE6;
    color: #606266;
    -webkit-appearance: none;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    width: 100%;
    height: 100%;
    font-size: 14px;
}
</style>
