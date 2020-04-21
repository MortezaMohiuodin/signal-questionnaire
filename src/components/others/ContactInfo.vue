<template>
  <div>
    <ValidationObserver v-slot="{handleSubmit}">
        <b-row>
            <b-col sm="4"> 
                <ValidationProvider rules="required|digits:11" v-slot="{errors}">
                    <b-form-group
                    label="شماره همراه"
                    label-class="font-weight-bold">
                        <b-form-input v-model="contactInfo.phone"></b-form-input>
                        <span class="errMessage">{{errors[0]}}</span>
                    </b-form-group>
                </ValidationProvider>
            </b-col>
            <b-col sm="4"> 
                <ValidationProvider rules="required|numeric" v-slot="{errors}">
                    <b-form-group
                    label="شماره ثابت (با کد شهر)"
                    label-class="font-weight-bold">
                        <b-form-input v-model="contactInfo.telephone"></b-form-input>
                        <span class="errMessage">{{errors[0]}}</span>
                    </b-form-group>
                </ValidationProvider>
            </b-col>
            <b-col sm="4"> 
                <ValidationProvider rules="required|email" v-slot="{errors}">
                    <b-form-group
                    label="ایمیل"
                    label-class="font-weight-bold">
                        <b-form-input v-model="contactInfo.email"></b-form-input>
                        <span class="errMessage">{{errors[0]}}</span>
                    </b-form-group>
                </ValidationProvider>
            </b-col>
            <b-col sm="4"> 
                <ValidationProvider rules="required" v-slot="{errors}">
                   <b-form-group
                    label="نحوه آشنایی با ما"
                    label-class="font-weight-bold">
                        <v-select
                        label="text"
                        v-model="contactInfo.knowVia"
                        :options="options.knowVia"
                        :reduce="item => item.value">
                        </v-select>
                        <span class="errMessage">{{errors[0]}}</span>
                    </b-form-group>
                </ValidationProvider>
            </b-col>
            <b-col sm="4" v-if="contactInfo.knowVia === 'others'"> 
                <ValidationProvider rules="required" v-slot="{errors}">
                    <b-form-group
                    label="توضیح سایر"
                    label-class="font-weight-bold">
                        <b-form-input v-model="contactInfo.knowViaOther"></b-form-input>
                        <span class="errMessage">{{errors[0]}}</span>
                    </b-form-group>
                </ValidationProvider>
            </b-col>
        </b-row>

        <NabButtons 
        :invalid="invalid"
        v-on:handleNextStep="handleSubmit(handleNextStep)"
        v-on:handlePrevStep="handlePrevStep"/>
     </ValidationObserver>
  </div>
</template>

<script>
import NabButtons from '@/components/NavButtons.vue'

export default {
    name: 'ContactInfo',
    components:{
        NabButtons
    },
    data(){
        return{
            options:{
                knowVia:[
                    { value: null, text: 'انتخاب کنید' },
                    { value: 'es', text: 'ای استخدام'},
                    { value: 'jb', text: 'جابینجا'},
                    { value: 'others', text: 'سایر'}
                ]
            },
            contactInfo:{
                phone:null,
                telephone:null,
                email:null,
                knowVia:null,
                knowViaOther:null
            }
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
