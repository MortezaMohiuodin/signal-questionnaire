<template>
  <div>
    <ValidationObserver v-slot="{handleSubmit}">
        <b-row class="mx-2 mb-3 p-3 position-relative bg-color-row" v-for="i in rows" v-bind:key="i">
            <button class="btn-float" @click.prevent="deleteRow">
                <v-icon scale="1.2" name="trash"/>
            </button>
            <b-col sm="4"> 
                <ValidationProvider rules="required" v-slot="{errors}">
                   <b-form-group
                    label="سطح"
                    label-class="font-weight-bold">
                        <v-select
                        label="text"
                        v-model="educationInfo[i-1].degree"
                        :options="options.degrees"
                        :reduce="item => item.value">
                        </v-select>
                        <span class="errMessage">{{errors[0]}}</span>
                    </b-form-group>
                </ValidationProvider>
            </b-col>
            <b-col sm="4" v-if="educationInfo[i-1].degree === 'others'"> 
                <ValidationProvider rules="required" v-slot="{errors}">
                    <b-form-group
                    label="توضیح سایر"
                    label-class="font-weight-bold">
                        <b-form-input v-model="educationInfo[i-1].degreeOther"></b-form-input>
                        <span class="errMessage">{{errors[0]}}</span>
                    </b-form-group>
                </ValidationProvider>
            </b-col>
            <b-col sm="4"> 
                <ValidationProvider rules="required" v-slot="{errors}">
                    <b-form-group
                    label="رشته"
                    label-class="font-weight-bold">
                        <b-form-input v-model="educationInfo[i-1].major"></b-form-input>
                        <span class="errMessage">{{errors[0]}}</span>
                    </b-form-group>
                </ValidationProvider>
            </b-col>
            <b-col sm="4"> 
                <ValidationProvider rules="required" v-slot="{errors}">
                    <b-form-group
                    label="دانشگاه"
                    label-class="font-weight-bold">
                        <b-form-input v-model="educationInfo[i-1].school"></b-form-input>
                        <span class="errMessage">{{errors[0]}}</span>
                    </b-form-group>
                </ValidationProvider>
            </b-col>
            <b-col sm="4"> 
                <ValidationProvider rules="required" v-slot="{errors}">
                   <b-form-group
                    label="وضعیت تحصیل"
                    label-class="font-weight-bold">
                        <v-select
                        label="text"
                        v-model="educationInfo[i-1].educationStatus"
                        :options="options.educationStatus"
                        :reduce="item => item.value">
                        </v-select>
                        <span class="errMessage">{{errors[0]}}</span>
                    </b-form-group>
                </ValidationProvider>
            </b-col>
            <b-col sm="4"> 
                <ValidationProvider rules="required" v-slot="{errors}">
                    <b-form-group
                    label="معدل"
                    label-class="font-weight-bold">
                        <b-form-input v-model="educationInfo[i-1].score"></b-form-input>
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
    name: 'educationInfo',
    components:{AddBtn,NabButtons},
    data(){
        return{
            options:{
                degrees:[
                    { value: null, text: 'انتخاب کنید' },
                    { value: 'es', text: 'دیپلم'},
                    { value: 'jb', text: 'کاردانی'},
                    { value: 'jb', text: 'کارشناسی'},
                    { value: 'others', text: 'سایر'}
                ],
                educationStatus:[
                    { value: null, text: 'انتخاب کنید' },
                    { value: 'es', text: 'دانشجو'},
                    { value: 'jb', text: 'فارغ التحصیل'},
                ]

            },
            educationInfo:[{}],
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
            this.educationInfo.push({})
        },
        deleteRow(){
            this.rows--
            this.educationInfo.pop()
        }
    }
}
</script>

<style scoped>

</style>
