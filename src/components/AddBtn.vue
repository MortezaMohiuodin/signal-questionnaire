<template>
    <a class="btn-add" href="javascript:void(0)" @click.prevent="$emit('addItem')">
        <span class="btn-add__icon">
            <v-icon scale="1" name="plus"/>
        </span>
        <span class="btn-add__title">ردیف جدید</span>
    </a>
</template>
<style scoped>
.btn-add{
    background: #00C851;
    color: white;
    border-radius: .3rem;
    display: inline-block;
}
.btn-add__icon{
    display: inline-block;
    padding: .3rem .7rem;
    background: #007E33;
    border-radius: 0 .3rem .3rem 0;
}
.btn-add__title{
    display: inline-block;
    padding: .3rem 1rem;
    font-size: .9rem;
}
a.btn-add:hover{
    color: white;
}
</style>

