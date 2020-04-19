<template>
  <div>
        <ItemList :items="items" :listName="'اوقات فراغت و تفریحات'" />
        <NabButtons 
        :invalid="false"
        v-on:handleNextStep="handleNextStep"
        v-on:handlePrevStep="handlePrevStep"/>
  </div>
</template>

<script>
import ItemList from '@/components/ItemList.vue'
import NabButtons from '@/components/NavButtons'

export default {
    name: 'freeTimeInfo',
    components: {
       ItemList,
       NabButtons
    },
    data(){
        return{
           items:[]
        }
    },
    methods:{
        handleNextStep(){
            this.$emit('handleNextStep')
        },
        handlePrevStep(){
            this.$emit('handlePrevStep')
        }
    }
}
</script>

<style scoped>

</style>
