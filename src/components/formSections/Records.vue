<template>
  <div>
    <ValidationObserver v-slot="{handleSubmit}">

        <div class="form-sections">

            <!-- Educational records -->
            <div class="form-section">
                <h5 class="form-title">سوابق تحصیلی</h5>
                <hr>
                <div class="row-flex" v-for="i in educations.length" v-bind:key="i">
                    <div class="item-flex">
                        <ValidationProvider rules="required" v-slot="{errors}" name="سطح">
                            <b-form-group>
                                <label class="font-weight-bold">سطح</label>
                                <v-select
                                label="text"
                                v-model="educations[i-1].degree"
                                :options="options.degrees"
                                :reduce="item => item.value">
                                </v-select>
                                 <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </div>
                    <div class="item-flex" v-if="educations[i-1].degree == '0'"> 
                        <ValidationProvider rules="required" v-slot="{errors}" name="توضیح سایر">
                            <b-form-group :class="{error:errors[0]}">
                                <label class="font-weight-bold">سایر (سطح)</label>
                                <b-form-input v-model="educations[i-1].degree_other"></b-form-input>
                                <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </div>
                    <div class="item-flex"> 
                        <ValidationProvider rules="required" v-slot="{errors}" name="رشته">
                            <b-form-group :class="{error:errors[0]}">
                                <label class="font-weight-bold">رشته</label>
                                <b-form-input v-model="educations[i-1].major"></b-form-input>
                                <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </div>
                    <div class="item-flex"> 
                        <ValidationProvider v-slot="{errors}">
                            <b-form-group :class="{error:errors[0]}">
                                <label class="font-weight-bold">دانشگاه</label>
                                <span class="text-gray"> - اختیاری</span>
                                <b-form-input v-model="educations[i-1].school"></b-form-input>
                                <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </div>
                    <div class="item-flex"> 
                        <ValidationProvider rules="required" v-slot="{errors}" name="وضعیت">
                            <b-form-group>
                                <label class="font-weight-bold">وضعیت</label>
                                <v-select
                                label="text"
                                v-model="educations[i-1].educationStatus"
                                :options="options.educationStatus"
                                :reduce="item => item.value">
                                </v-select>
                                <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </div>
                    <div class="item-flex"> 
                        <ValidationProvider v-slot="{errors}">
                            <b-form-group :class="{error:errors[0]}">
                                <label class="font-weight-bold">معدل</label>
                                <span class="text-gray"> - اختیاری</span>
                                <b-form-input v-model="educations[i-1].score"></b-form-input>
                                <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </div>
                    <div>
                        <button class="btn-float" @click.prevent="deleteRow(i-1,educations)">
                            <v-icon scale="1.5" name="times"/>
                        </button>
                    </div>
                </div>
                <AddBtn v-on:addItem='addRow(educations,education)'/>
            </div>

            <!-- Jobs records -->
            <div class="form-section">
                <h5 class="form-title">سوابق کاری</h5>
                <hr>
                <div class="row-flex" v-for="i in jobs.length" v-bind:key="i">
                    <div class="item-flex"> 
                        <ValidationProvider rules="required" name="موسسه/مجموعه/شرکت" v-slot="{errors}">
                        <b-form-group :class="{error:errors[0]}">
                                <label class="font-weight-bold">موسسه/مجموعه/شرکت</label>
                                <b-form-input v-model="jobs[i-1].company_name" ></b-form-input>
                                <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </div>
                    <div class="item-flex"> 
                        <ValidationProvider v-slot="{errors}">
                            <b-form-group :class="{error:errors[0]}">
                                 <label class="font-weight-bold">سمت</label>
                                 <span class="text-gray"> - اختیاری</span>
                                <b-form-input v-model="jobs[i-1].role"></b-form-input>
                                <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </div>
                    <div class="item-flex"> 
                        <ValidationProvider rules="required" v-slot="{errors}" name="حقوق دریافتی">
                            <b-form-group :class="{error:errors[0]}">
                                <label class="font-weight-bold">حقوق دریافتی (تومان)</label>
                                <b-form-input 
                                v-on:keyup="addComma(i-1)" 
                                v-model="jobs[i-1].salary">
                                </b-form-input>                         
                                <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </div>
                    <div class="item-flex"> 
                        <ValidationProvider v-slot="{errors}">
                            <b-form-group :class="{error:errors[0]}">
                                <label class="font-weight-bold">تاریخ شروع</label>
                                <span class="text-gray"> - اختیاری</span>
                                <VuePersianDatetimePicker 
                                v-model="jobs[i-1].start_date"
                                format="YYYY-MM"
                                type="year-month">
                                </VuePersianDatetimePicker>
                                <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </div>
                    <div class="item-flex"> 
                        <ValidationProvider v-slot="{errors}">
                            <b-form-group :class="{error:errors[0]}">
                                <label class="font-weight-bold">تاریخ پایان</label>
                                <span class="text-gray"> - اختیاری</span>
                                <VuePersianDatetimePicker 
                                v-model="jobs[i-1].end_date"
                                format="YYYY-MM"
                                type="year-month">
                                </VuePersianDatetimePicker> 
                                <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </div>
                    <div>
                        <button class="btn-float" @click.prevent="deleteRow(i-1,jobs)">
                            <v-icon scale="1.5" name="times"/>
                        </button>
                    </div>
                </div>
                <AddBtn v-on:addItem='addRow(jobs,job)'/>
            </div>

             <!-- Courses -->
            <div class="form-section">
                <h5 class="form-title">دوره های آموزشی</h5>
                <hr>
                <div class="row-flex" v-for="i in courses.length" v-bind:key="i">
                    <div class="item-flex item-flex__two"> 
                        <ValidationProvider v-slot="{errors}">
                        <b-form-group :class="{error:errors[0]}">
                                <label class="font-weight-bold">دوره آموزشی</label>
                                <span class="text-gray"> - اختیاری</span>
                                <b-form-input v-model="courses[i-1].title" ></b-form-input>
                                <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </div>
                    <div class="item-flex"> 
                        <ValidationProvider v-slot="{errors}">
                            <b-form-group :class="{error:errors[0]}">
                                <label class="font-weight-bold">موسسه/آموزشگاه</label>
                                <span class="text-gray"> - اختیاری</span>
                                <b-form-input v-model="courses[i-1].school"></b-form-input>
                                <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </div>
                    <div class="item-flex"> 
                        <ValidationProvider v-slot="{errors}" rules="numeric" name="مدت دوره">
                            <b-form-group :class="{error:errors[0]}">
                                <label class="font-weight-bold">مدت دوره (ماه)</label>
                                <span class="text-gray"> - اختیاری</span>
                                <b-form-input v-model="courses[i-1].course_duration"></b-form-input>
                                <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </div>
                    <div class="item-flex"> 
                        <ValidationProvider v-slot="{errors}">
                            <b-form-group :class="{error:errors[0]}">
                                <label class="font-weight-bold">عنوان مدرک</label>
                                <span class="text-gray"> - اختیاری</span>
                                <b-form-input v-model="courses[i-1].degree_name"></b-form-input>
                                <span v-if="errors[0]" class="error_icon">
                                    <v-icon scale="1.3" color="#e76767" name="exclamation-circle"/>
                                </span>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </div>
                    <div>
                        <button class="btn-float" @click.prevent="deleteRow(i-1,courses)">
                            <v-icon scale="1.5" name="times"/>
                        </button>
                    </div>
                </div>
                <AddBtn v-on:addItem='addRow(courses,course)'/>
            </div>

        </div>
        <NabButtons 
        v-on:handleNextStep="handleSubmit(handleNextStep)"
        v-on:handlePrevStep="handlePrevStep"/>
     </ValidationObserver>
  </div>
</template>

<script>
import NabButtons from '@/components/NavButtons.vue'
import AddBtn from '@/components/AddBtn.vue'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';

export default {
    name: 'records',
    components:{
        AddBtn,
        NabButtons,
        VuePersianDatetimePicker,
        },
    data(){
        return{
            options:{
                degrees:[
                    { value: null, text: 'انتخاب کنید' },
                    { value: 1, text: 'دیپلم'},
                    { value: 2, text: 'کاردانی'},
                    { value: 3, text: 'کارشناسی'},
                    { value: 4, text: 'کارشناسی ارشد'},
                    { value: 5, text: 'دکترا'},
                    { value: 0, text: 'سایر'}
                ],
                educationStatus:[
                    { value: null, text: 'انتخاب کنید' },
                    { value: 1, text: 'دانشجو'},
                    { value: 2, text: 'فارغ التحصیل'},
                ],
            },
            education:{
                degree:null,
                educationStatus:null,
                major:null,
                school:null,
                degree_other:null,
                score:null
            },
            job:{
                role:null,
                company_name:null,
                salary:null,
                start_date:null,
                end_date:null
            },
            course:{
                title:null,
                school:null,
                course_duration:null,
                degree_name:null
            },
            educations:[{
                degree:null,
                educationStatus:null,
                major:null,
                school:null,
                degree_other:null,
                score:null
            }],
            jobs:[{
                role:null,
                company_name:null,
                salary:null,
                start_date:null,
                end_date:null
            }],
            courses:[{
                title:null,
                school:null,
                course_duration:null,
                degree_name:null
            }],
            records:null
        }
            
    },
    methods:{
        handleNextStep(){
            this.records = {
                educations: this.educations,
                courses: this.courses,
                jobs:this.jobs
            }
            this.$store.dispatch('changeRecords',this.records)
            this.$emit('handleNextStep')
        },
        handlePrevStep(){
            this.$emit('handlePrevStep')
        },
        addRow(array,object){
            array.push(object)
        },
        deleteRow(index,array){
            array.splice(index,1)
        },
        addComma(index){
            this.jobs[index].salary = this.jobs[index].salary.replace(/\D/g, "")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
}
</script>

<style scoped>
.row-b{
    text-align: right;
}
</style>
