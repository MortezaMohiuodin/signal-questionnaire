<template>
  <div>
    <ValidationObserver v-slot="{handleSubmit}">
        <b-row class="mx-2 mb-3 p-3 position-relative border-dot" v-for="i in rows" v-bind:key="i">
            <button class="btn-float" @click.prevent="deleteRow(i-1)">
                <v-icon scale="1.2" name="trash"/>
            </button>
            <b-col sm="4"> 
                <ValidationProvider rules="required" v-slot="{errors}">
                   <b-form-group
                    label="عنوان دوره"
                    label-class="font-weight-bold">
                        <b-form-input v-model="coursesInfo[i-1].title" ></b-form-input>
                        <span class="errMessage">{{errors[0]}}</span>
                    </b-form-group>
                </ValidationProvider>
            </b-col>
            <b-col sm="4"> 
                <ValidationProvider rules="required" v-slot="{errors}">
                    <b-form-group
                    label="موسسه/آموزشگاه"
                    label-class="font-weight-bold">
                        <b-form-input v-model="coursesInfo[i-1].school"></b-form-input>
                        <span class="errMessage">{{errors[0]}}</span>
                    </b-form-group>
                </ValidationProvider>
            </b-col>
            <b-col sm="4"> 
                <ValidationProvider rules="required" v-slot="{errors}">
                    <b-form-group
                    label="مدت دوره (ماه)"
                    label-class="font-weight-bold">
                        <b-form-input v-model="coursesInfo[i-1].startDate"></b-form-input>
                        <span class="errMessage">{{errors[0]}}</span>
                    </b-form-group>
                </ValidationProvider>
            </b-col>
        </b-row>
        <AddBtn v-on:addItem='addRow'/>
        <NabButtons 
        :invalid="invalid"
        v-on:handleNextStep="handleSubmit(handleNextStep)"
        v-on:handlePrevStep="handlePrevStep"/>
     </ValidationObserver>
  </div>
</template>

<script>
import NabButtons from '@/components/NavButtons.vue'
import AddBtn from '@/components/AddBtn.vue'

export default {
    name: 'coursesInfo',
    components: {AddBtn,NabButtons},
    data(){
        return{
            options:{
              
            },
            coursesInfo:[{}],
            rows: 1
        }
            
    },
    methods:{
        handleNextStep(){
            this.$emit('handleNextStep')
        },
        handlePrevStep(){
            this.$emit('handlePrevStep')
        },
        addRow(){
            this.rows++
            this.coursesInfo.push({})
        },
        deleteRow(i){
            this.rows--
            this.coursesInfo.splice(i,1)
        }
    }
}
</script>

<style scoped>

</style>
