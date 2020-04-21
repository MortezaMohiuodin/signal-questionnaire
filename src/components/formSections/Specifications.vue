<template>
  <div>
    <ValidationObserver v-slot="{handleSubmit}">

        <div class="form-sections">
            <!-- personal info section -->
            <div class="form-section">
                <h5 class="form-title">اطلاعات شخصی</h5>    
                <hr>
                <b-row>
                    <b-col sm="4"> 
                        <ValidationProvider rules="required" v-slot="{errors}">
                            <b-form-group
                            label="نام *"
                            label-class="font-weight-bold">
                                <b-form-input type="text" v-model="personalInfo.firstname"></b-form-input>
                                <span class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4"> 
                        <ValidationProvider rules="required" v-slot="{errors}">
                            <b-form-group
                            label="نام خانوادگی *"
                            label-class="font-weight-bold">
                                <b-form-input v-model="personalInfo.lastname"></b-form-input>
                                <span class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4"> 
                        <ValidationProvider rules="required" v-slot="{errors}">
                            <b-form-group
                            label="جنسیت *"
                            label-class="font-weight-bold">
                                <v-select
                                label="text"
                                v-model="personalInfo.sex"
                                :options="options.sex"
                                :reduce="item => item.value"></v-select>
                                <span class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4"> 
                        <ValidationProvider rules="required" v-slot="{errors}">
                            <b-form-group
                            label="سابقه بیمه"
                            label-class="font-weight-bold">
                                <b-form-radio-group v-model="personalInfo.hasInsurance">
                                    <b-form-radio value="yes">دارم</b-form-radio>
                                    <b-form-radio value="no">ندارم</b-form-radio>
                                </b-form-radio-group>
                            </b-form-group>
                            <span class="errMessage">{{errors[0]}}</span>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4" v-if="personalInfo.hasInsurance === 'yes'"> 
                        <b-row>
                            <b-col cols="12">
                                <label class="font-weight-bold">مدت بیمه</label>
                            </b-col>
                            <b-col cols="6">
                                <b-form-group>
                                    <ValidationProvider rules="required|numeric" v-slot="{errors}">
                                        <b-form-input placeholder="سال" v-model="personalInfo.insurance_year"></b-form-input>
                                        <span class="errMessage">{{errors[0]}}</span>
                                    </ValidationProvider>
                                </b-form-group>
                            </b-col>
                            <b-col cols="6">
                                <b-form-group>
                                    <ValidationProvider rules="required|numeric" v-slot="{errors}">
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
                            label="تاریخ تولد *"
                            label-class="font-weight-bold">
                                <!-- <b-form-input v-model="personalInfo.birthdate" type="date"></b-form-input> -->
                                <VuePersianDatetimePicker v-model="personalInfo.birthdate"></VuePersianDatetimePicker>
                                <span class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4"> 
                        <ValidationProvider rules="required" v-slot="{errors}">
                            <b-form-group
                            label="وضعیت تاهل *"
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
                            label="وضعیت نظام وظیفه *"
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
                            label="سایر (نظام وظیفه) *"
                            label-class="font-weight-bold">
                                <b-form-input v-model="personalInfo.militaryOther"></b-form-input>
                                <span class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4"> 
                        <ValidationProvider rules="required" v-slot="{errors}">
                            <b-form-group
                            label="محدوده سکونت *"
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
                            label="شغل درخواستی *"
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
            </div>

            <!-- contact info section -->
            <div class="form-section">
                <h5 class="form-title">اطلاعات تماس</h5>
                <hr>
                <b-row>
                    <b-col sm="4"> 
                        <ValidationProvider rules="required|numeric|digits:11" v-slot="{errors}">
                            <b-form-group
                            label="شماره همراه *"
                            label-class="font-weight-bold">
                                <b-form-input v-model="contactInfo.phone"></b-form-input>
                                <span class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4"> 
                        <ValidationProvider rules="numeric" v-slot="{errors}">
                            <b-form-group
                            label="شماره ثابت (با کد شهر)"
                            label-class="font-weight-bold">
                                <b-form-input v-model="contactInfo.telephone"></b-form-input>
                                <span class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4"> 
                        <ValidationProvider rules="email" v-slot="{errors}">
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
                            label="نحوه آشنایی با ما *"
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
                            label="سایر (آشنایی با ما) *"
                            label-class="font-weight-bold">
                                <b-form-input v-model="contactInfo.knowViaOther"></b-form-input>
                                <span class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                </b-row>
            </div>
        </div>
        
        <NabButtons 
        v-on:handleNextStep="handleSubmit(handleNextStep)"
        v-on:handlePrevStep="handlePrevStep"
        :hidePrev="true"/>
     </ValidationObserver>
  </div>
</template>

<script>
import NabButtons from '@/components/NavButtons.vue'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';

export default {
    name: 'Specification',
    components: {
        NabButtons,
        VuePersianDatetimePicker
    },
    data(){
        return{
            options:{
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
                ],
                knowVia:[
                    { value: null, text: 'انتخاب کنید' },
                    { value: 'es', text: 'ای استخدام'},
                    { value: 'jb', text: 'جابینجا'},
                    { value: 'jb', text: 'دیوار'},
                    { value: 'jb', text: 'سایت'},
                    { value: 'jb', text: 'شبکه های اجتماعی'},
                    { value: 'jb', text: 'معرف'},
                    { value: 'jb', text: 'پیامک'},
                    { value: 'others', text: 'سایر'}
                ]
            },
            personalInfo:{
                firstname:null,
                lastname:null,
                sex:null,
                hasInsurance:null,
                insurance_month:null,
                insurance_year:null,
                birthdate:null,
                marital:null, 
                military:null,
                militaryOther:null,
                residence:null,
                position:null
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
            this.$store.dispatch('changePersonalInfo',this.personalInfo)
            this.$emit('handleNextStep')
        }
    }
}
</script>

<style>

</style>
