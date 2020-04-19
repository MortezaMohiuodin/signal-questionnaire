<template>
  <div>
    <ValidationObserver v-slot="{handleSubmit}">
        <b-row>
            <b-col sm="4"> 
                <ValidationProvider rules="required" v-slot="{errors}">
                    <b-form-group
                    label="نام"
                    label-class="font-weight-bold">
                        <b-form-input v-model="personalInfo.firstname"></b-form-input>
                        <span class="errMessage">{{errors[0]}}</span>
                    </b-form-group>
                </ValidationProvider>
            </b-col>
            <b-col sm="4"> 
                <ValidationProvider rules="required" v-slot="{errors}">
                    <b-form-group
                    label="نام خانوادگی"
                    label-class="font-weight-bold">
                        <b-form-input v-model="personalInfo.lastname"></b-form-input>
                        <span class="errMessage">{{errors[0]}}</span>
                    </b-form-group>
                </ValidationProvider>
            </b-col>
            <b-col sm="4"> 
                <label class="font-weight-bold" for="">جنسیت</label>
                <ValidationProvider rules="required" v-slot="{errors}">
                    <v-select
                    label="text"
                    v-model="personalInfo.sex"
                    :options="options.sex"
                    :reduce="item => item.value"></v-select>
                    <span class="errMessage">{{errors[0]}}</span>
                </ValidationProvider>
            </b-col>
            <b-col sm="4"> 
                <ValidationProvider rules="required" v-slot="{errors}">
                     <b-form-group
                    label="سابقه بیمه"
                    label-class="font-weight-bold">
                        <v-select
                        label="text"
                        v-model="personalInfo.insurance"
                        :options="options.insurance"
                        :reduce="item => item.value">
                        </v-select>
                        <span class="errMessage">{{errors[0]}}</span>
                    </b-form-group>
                </ValidationProvider>
            </b-col>
            <b-col sm="4" v-if="personalInfo.insurance"> 
                <b-row>
                    <b-col cols="12">
                        <label class="font-weight-bold">مدت بیمه</label>
                    </b-col>
                    <b-col cols="6">
                        <b-form-group>
                            <ValidationProvider rules="required" v-slot="{errors}">
                                <b-form-input placeholder="سال" v-model="personalInfo.insurance_year"></b-form-input>
                                <span class="errMessage">{{errors[0]}}</span>
                            </ValidationProvider>
                        </b-form-group>
                    </b-col>
                    <b-col cols="6">
                        <b-form-group>
                            <ValidationProvider rules="required" v-slot="{errors}">
                                <b-form-input placeholder="ماه" v-model="personalInfo.insurance_month"></b-form-input>
                                <span class="errMessage">{{errors[0]}}</span>
                            </ValidationProvider>
                        </b-form-group>
                    </b-col>    
                </b-row>
            </b-col>
            <b-col sm="4"> 
                <ValidationProvider rules="required" v-slot="{errors}">
                    <b-form-group
                    label="تاریخ تولد"
                    label-class="font-weight-bold">
                        <b-form-input v-model="personalInfo.birthdate" type="date"></b-form-input>
                        <span class="errMessage">{{errors[0]}}</span>
                    </b-form-group>
                </ValidationProvider>
            </b-col>
            <b-col sm="4"> 
                <ValidationProvider rules="required" v-slot="{errors}">
                    <b-form-group
                    label="وضعیت تاهل"
                    label-class="font-weight-bold">
                        <v-select
                        label="text"
                        v-model="personalInfo.marital"
                        :options="options.marital"
                        :reduce="item => item.value">
                        </v-select>
                        <span class="errMessage">{{errors[0]}}</span>
                    </b-form-group>
                </ValidationProvider>
            </b-col>
            <b-col sm="4" v-if="personalInfo.sex === 'man'">
                <ValidationProvider rules="required" v-slot="{errors}">
                    <b-form-group
                    label="وضعیت نظام وظیفه"
                    label-class="font-weight-bold">
                        <v-select
                        label="text"
                        v-model="personalInfo.military"
                        :options="options.military"
                        :reduce="item => item.value">
                        </v-select>
                        <span class="errMessage">{{errors[0]}}</span>
                    </b-form-group>
                </ValidationProvider> 
            </b-col>
            <b-col sm="4" v-if="personalInfo.military === 'other'"> 
                <ValidationProvider rules="required" v-slot="{errors}">
                    <b-form-group
                    label="توضیح سایر"
                    label-class="font-weight-bold">
                        <b-form-input v-model="personalInfo.militaryOther"></b-form-input>
                        <span class="errMessage">{{errors[0]}}</span>
                    </b-form-group>
                </ValidationProvider>
            </b-col>
            <b-col sm="4"> 
                <ValidationProvider rules="required" v-slot="{errors}">
                    <b-form-group
                    label="محدوده سکونت"
                    label-class="font-weight-bold">
                        <v-select
                        label="text"
                        v-model="personalInfo.residence"
                        :options="options.residence"
                        :reduce="item => item.value">
                        </v-select>
                        <span class="errMessage">{{errors[0]}}</span>
                    </b-form-group>
                </ValidationProvider>
            </b-col>
            <b-col sm="4"> 
                <ValidationProvider rules="required" v-slot="{errors}">
                    <b-form-group
                    label="شغل درخواستی"
                    label-class="font-weight-bold">
                        <v-select
                        label="text"
                        v-model="personalInfo.position"
                        :options="options.position"
                        :reduce="item => item.value">
                        </v-select>
                        <span class="errMessage">{{errors[0]}}</span>
                    </b-form-group>
                </ValidationProvider>
            </b-col>
        </b-row>
        <NabButtons 
        :invalid="invalid"
        v-on:handleNextStep="handleSubmit(handleNextStep)"
        v-on:handlePrevStep="handlePrevStep"
        :hidePrev="true"/>
     </ValidationObserver>
  </div>
</template>

<script>
import NabButtons from '@/components/NavButtons.vue'

export default {
    name: 'PersonalInfo',
    components: {
        NabButtons
    },
    data(){
        return{
            options:{
                insurance:[
                    { value: null, text: 'انتخاب کنید' },
                    { value: 1, text: 'دارم'},
                    { value: 0, text: 'ندارم'}
                ],
                marital:[
                    { value: null, text: 'انتخاب کنید' },
                    { value: 1, text: 'متاهل'},
                    { value: 0, text: 'مجرد'}
                ],
                military:[
                    { value: null, text: 'انتخاب کنید' },
                    { value: 'complete', text: 'اتمام خدمت'},
                    { value: 'exempt', text: 'معاف'},
                    { value: 'medical', text: 'معاف پزشکی'},
                    { value: 'educational', text: 'معاف تحصیلی'},
                    { value: 'other', text: 'سایر'},
                ],
                residence:[
                    { value: null, text: 'انتخاب کنید' },
                    { value: 'complete', text: 'دورشهر'},
                    { value: 'exempt', text: 'عطاران'},
                ],
                position:[
                    { value: null, text: 'انتخاب کنید' },
                    { value: 'backend', text: 'برنامه نویس بک اند'},
                    { value: 'frontend', text: 'برنامه نویس فرانت اند'},
                ],
                sex:[
                    { value: null, text: 'انتخاب کنید' },
                    { value: 'man', text: 'مرد' },
                    { value: 'woman', text: 'زن' }
                ]
            },
            personalInfo:{
                firstname:null,
                lastname:null,
                sex:null,
                insurance:null,
                insurance_month:null,
                insurance_year:null,
                birthdate:null,
                marital:null, 
                military:null,
                militaryOther:null,
                residence:null,
                position:null
            }
            
        }
    },
    methods:{
        handleNextStep(){
            this.$store.dispatch('changePersonalInfo',this.personalInfo)
            this.$emit('handleNextStep')
        }
    }
}
</script>

<style>

</style>
