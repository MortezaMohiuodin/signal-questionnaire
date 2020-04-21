<template>
  <div>
      <b-row>
          <b-col sm="6">
            <ValidationProvider rules="required" v-slot="{errors}">
                <b-form-group
                label="حقوق پیشنهادی شما (تومان)"
                label-class="font-weight-bold">
                    <b-form-input class="mw-300" v-model="salary"></b-form-input>
                    <span class="errMessage">{{errors[0]}}</span>
                </b-form-group>
            </ValidationProvider>
          </b-col>
          <b-col sm="6">
            <ItemList 
            :items="items" 
            :listName="'مزایا و شرایط درخواستی شما'"/>
          </b-col>
      </b-row>
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
    name: 'salaryAndRightsInfo',
    components: {
       ItemList,
       NabButtons
    },
    data(){
        return{
           items:[],
           salary:null
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
