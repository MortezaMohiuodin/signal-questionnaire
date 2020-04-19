<template>
  <div>
    <ValidationObserver v-slot="{handleSubmit}">
        <b-row class="mx-2 mb-3 p-3 position-relative bg-color-row" v-for="(row,index) in rows" v-bind:key="index">
            <button class="btn-float" @click.prevent="deleteRow(index)">
                <v-icon scale="1.2" name="trash"/>
            </button>
            <b-col sm="4"> 
                <ValidationProvider rules="required" v-slot="{errors}">
                   <b-form-group
                    label="نام موسسه/شرکت"
                    label-class="font-weight-bold">
                        <b-form-input v-model="jobHistoryInfo[index].companyName" ></b-form-input>
                        <span class="errMessage">{{errors[0]}}</span>
                    </b-form-group>
                </ValidationProvider>
            </b-col>
            <b-col sm="4"> 
                <ValidationProvider rules="required" v-slot="{errors}">
                    <b-form-group
                    label="سمت"
                    label-class="font-weight-bold">
                        <b-form-input v-model="jobHistoryInfo[index].role"></b-form-input>
                        <span class="errMessage">{{errors[0]}}</span>
                    </b-form-group>
                </ValidationProvider>
            </b-col>
            <b-col sm="4"> 
                <ValidationProvider rules="required" v-slot="{errors}">
                    <b-form-group
                    label="تاریخ شروع"
                    label-class="font-weight-bold">
                        <b-form-input v-model="jobHistoryInfo[index].startDate"></b-form-input>
                        <span class="errMessage">{{errors[0]}}</span>
                    </b-form-group>
                </ValidationProvider>
            </b-col>
            <b-col sm="4"> 
                <ValidationProvider rules="required" v-slot="{errors}">
                   <b-form-group
                    label="تاریخ پایان"
                    label-class="font-weight-bold">
                        <b-form-input v-model="jobHistoryInfo[index].endDate"></b-form-input>
                        <span class="errMessage">{{errors[0]}}</span>
                    </b-form-group>
                </ValidationProvider>
            </b-col>
            <b-col sm="4"> 
                <ValidationProvider rules="required" v-slot="{errors}">
                    <b-form-group
                    label="حقوق دریافتی (تومان)"
                    label-class="font-weight-bold">
                        <b-form-input v-model="jobHistoryInfo[index].salary"></b-form-input>
                        <span class="errMessage">{{errors[0]}}</span>
                    </b-form-group>
                </ValidationProvider>
            </b-col>
            <b-col sm="4"> 
                <ValidationProvider rules="required" v-slot="{errors}">
                    <b-form-group
                    label="علت انتخاب"
                    label-class="font-weight-bold">
                        <b-form-textarea v-model="jobHistoryInfo[index].score"></b-form-textarea>
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
    name: 'jobHistoryInfo',
    components:{AddBtn,NabButtons},
    data(){
        return{
            options:{
              
            },
            jobHistoryInfo:[{}],
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
            this.jobHistoryInfo.push({})
            this.rows++
            
        },
        deleteRow(index){
            this.jobHistoryInfo.splice(index,1)
            this.rows--
        }
    }
}
</script>

<style scoped>

</style>
