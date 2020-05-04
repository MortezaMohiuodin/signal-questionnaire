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
                        <ValidationProvider rules="required" name="نام و نام خانوادگی" v-slot="{errors}">
                            <b-form-group>
                                <label class="font-weight-bold">نام و نام خانوادگی</label>
                                <b-form-input v-model="specification.full_name"></b-form-input>
                                <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4"> 
                        <ValidationProvider rules="required" name="جنسیت" v-slot="{errors}">
                            <b-form-group >
                                <label class="font-weight-bold">جنسیت</label>
                                <v-select
                                label="text"
                                v-model="specification.gender"
                                :options="options.gender"
                                :reduce="item => item.value"></v-select>
                                <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                     <b-col sm="4"> 
                        <ValidationProvider rules="required" v-slot="{errors}" name="وضعیت تاهل">
                            <b-form-group>
                                <label class="font-weight-bold">وضعیت تاهل</label>
                                <v-select
                                label="text"
                                v-model="specification.marital"
                                :options="options.marital"
                                :reduce="item => item.value">
                                </v-select>
                                <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="4"> 
                        <ValidationProvider rules="required" name="تاریخ تولد" v-slot="{errors}">
                            <b-form-group >
                                <label class="font-weight-bold">تاریخ تولد</label>
                                <VuePersianDatetimePicker v-model="specification.birth_date"></VuePersianDatetimePicker>
                                <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                       <b-col sm="4"> 
                        <ValidationProvider rules="required" name="نحوه آشنایی با ما" v-slot="{errors}">
                        <b-form-group>
                                <label class="font-weight-bold">نحوه آشنایی با ما</label>
                                <v-select
                                label="text"
                                v-model="specification.knowVia"
                                :options="options.knowVia"
                                :reduce="item => item.value">
                                </v-select>
                                <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4" v-if="specification.knowVia === 'others'"> 
                        <ValidationProvider rules="required" v-slot="{errors}" name="توضیح سایر">
                            <b-form-group >
                                <label class="font-weight-bold">سایر (آشنایی با ما)</label>
                                <b-form-input v-model="specification.knowVia_other"></b-form-input>
                                <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4" v-if="specification.gender === 'man'">
                        <ValidationProvider rules="required" v-slot="{errors}" name="وضعیت نظام وظیفه">
                            <b-form-group>
                                <label class="font-weight-bold">وضعیت نظام وظیفه</label>
                                <v-select
                                label="text"
                                v-model="specification.military"
                                :options="options.military"
                                :reduce="item => item.value">
                                </v-select>
                                <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider> 
                    </b-col>
                     <b-col sm="4" v-if="specification.military === 'other'"> 
                        <ValidationProvider rules="required" v-slot="{errors}" name="توضیح سایر">
                            <b-form-group >
                                <label class="font-weight-bold">سایر (نظام وظیفه)</label>
                                <b-form-input v-model="specification.military_other"></b-form-input>
                                <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4"> 
                        <ValidationProvider rules="required" name="شغل درخواستی" v-slot="{errors}">
                            <b-form-group>
                                <label class="font-weight-bold">شغل درخواستی</label>
                                <v-select
                                label="text"
                                v-model="specification.position"
                                :options="options.position"
                                :reduce="item => item.value">
                                </v-select>
                               <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                     <b-col sm="4"> 
                        <ValidationProvider name="سابقه بیمه">
                            <b-form-group>
                                <label class="font-weight-bold">سابقه بیمه</label>
                                <span class="text-gray"> - اختیاری</span>
                                <b-form-radio-group v-model="specification.insurance">
                                    <b-form-radio value="yes">دارم</b-form-radio>
                                    <b-form-radio value="no">ندارم</b-form-radio>
                                </b-form-radio-group>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4" v-if="specification.insurance === 'yes'"> 
                        <b-row>
                            <b-col cols="12">
                                <label class="font-weight-bold">مدت بیمه</label>
                                <span class="text-gray"> - اختیاری</span>
                            </b-col>
                            <b-col cols="6">
                                <ValidationProvider rules="numeric" name="ماه" v-slot="{errors}">
                                    <b-form-group >
                                        <b-form-input placeholder="ماه" v-model="specification.insurance_month"></b-form-input>
                                        <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                                    </b-form-group>
                                </ValidationProvider>
                            </b-col>    
                            <b-col cols="6">
                                <ValidationProvider rules="numeric" name="سال" v-slot="{errors}">   
                                    <b-form-group >
                                        <b-form-input placeholder="سال" v-model="specification.insurance_year"></b-form-input>
                                    </b-form-group>
                                    <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                                </ValidationProvider>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
               
            
            </div>

            <!-- contact info section -->
            <div class="form-section">
                <h5 class="form-title">اطلاعات تماس</h5>
                <hr>
                <b-row>
                    <b-col sm="4"> 
                        <ValidationProvider rules="required|numeric|digits:11" name="شماره همراه" v-slot="{errors}">
                            <b-form-group >
                                <label class="font-weight-bold">شماره همراه</label>
                                <b-form-input v-model="specification.phone"></b-form-input>
                                <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4"> 
                        <ValidationProvider rules="numeric" v-slot="{errors}" name="شماره ثابت">
                            <b-form-group >
                                <label class="font-weight-bold">شماره ثابت</label>
                                <span class="text-gray"> - اختیاری</span>
                                <b-form-input v-model="specification.telephone"></b-form-input>
                                <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4"> 
                        <ValidationProvider rules="email" name="ایمیل" v-slot="{errors}">
                            <b-form-group >
                                <label class="font-weight-bold">ایمیل</label>
                                <span class="text-gray"> - اختیاری</span>
                                <b-form-input v-model="specification.email"></b-form-input>
                                <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4"> 
                        <ValidationProvider rules="required" v-slot="{errors}" name="محدوده سکونت">
                            <b-form-group>
                                <label class="font-weight-bold">محدوده سکونت</label>
                                <v-select
                                label="text"
                                v-model="specification.residence"
                                :options="options.residence"
                                :reduce="item => item.value">
                                </v-select>
                                <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="8"> 
                        <ValidationProvider rules="" v-slot="{errors}" name="آدرس">
                            <b-form-group >
                                <label class="font-weight-bold">آدرس</label>
                                <span class="text-gray"> - اختیاری</span>
                                <b-form-textarea
                                label="text"
                                v-model="specification.address"
                                :reduce="item => item.value">
                                </b-form-textarea>
                                <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                </b-row>
            </div>
        </div>
        
        <NabButtons 
        v-on:handleNextStep="handleSubmit(handleNextStep)"
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
                gender:[
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
            specification:{
                full_name:null,
                gender:null,
                insurance:null,
                insurance_month:null,
                insurance_year:null,
                birth_date:null,
                marital:null, 
                military:null,
                military_other:null,
                residence:null,
                position:null,
                phone:null,
                telephone:null,
                email:null,
                knowVia:null,
                knowVia_other:null,
                address:null
            }
        }
    },
    methods:{
        handleNextStep(){
            this.$store.dispatch('changeSpecification',this.specification)
            this.$emit('handleNextStep')
        }
    }
}
</script>

<style>

</style>
