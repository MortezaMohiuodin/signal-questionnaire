<template>
  <div>
    <ValidationObserver v-slot="{handleSubmit}">

        <div class="form-sections">

            <!-- Educational records -->
            <div class="form-section">
                <h5 class="form-title">سوابق تحصیلی</h5>
                <hr>
                <div class="row-flex" v-for="i in educationInfo.length" v-bind:key="i">
                    <div class="item-flex">
                        <ValidationProvider rules="required" v-slot="{errors}" name="سطح">
                            <b-form-group>
                                <label class="font-weight-bold">سطح</label>
                                <v-select
                                label="text"
                                v-model="educationInfo[i-1].degree"
                                :options="options.degrees">
                                </v-select>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </div>
                    <div class="item-flex" v-if="educationInfo[i-1].degree && educationInfo[i-1].degree.value === 'others'"> 
                        <ValidationProvider rules="required" v-slot="{errors}" name="توضیح سایر">
                            <b-form-group :class="{error:errors[0]}">
                                <label class="font-weight-bold">سایر (سطح)</label>
                                <b-form-input v-model="educationInfo[i-1].degreeOther"></b-form-input>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </div>
                    <div class="item-flex"> 
                        <ValidationProvider rules="required" v-slot="{errors}" name="رشته">
                            <b-form-group :class="{error:errors[0]}">
                                <label class="font-weight-bold">رشته</label>
                                <b-form-input v-model="educationInfo[i-1].major"></b-form-input>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </div>
                    <div class="item-flex"> 
                        <ValidationProvider v-slot="{errors}">
                            <b-form-group :class="{error:errors[0]}">
                                <label class="font-weight-bold">دانشگاه</label>
                                <span class="text-gray"> - اختیاری</span>
                                <b-form-input v-model="educationInfo[i-1].school"></b-form-input>
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
                                v-model="educationInfo[i-1].educationStatus"
                                :options="options.educationStatus">
                                </v-select>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </div>
                    <div class="item-flex"> 
                        <ValidationProvider v-slot="{errors}">
                            <b-form-group :class="{error:errors[0]}">
                                <label class="font-weight-bold">معدل</label>
                                <span class="text-gray"> - اختیاری</span>
                                <b-form-input v-model="educationInfo[i-1].score"></b-form-input>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </div>
                    <div>
                        <button class="btn-float" @click.prevent="deleteRow(i-1,educationInfo)">
                            <v-icon scale="1.5" name="times"/>
                        </button>
                    </div>
                </div>
                <AddBtn v-on:addItem='addRow(educationInfo)'/>
            </div>

            <!-- Jobs records -->
            <div class="form-section">
                <h5 class="form-title">سوابق کاری</h5>
                <hr>
                <div class="row-flex" v-for="i in jobHistoryInfo.length" v-bind:key="i">
                    <div class="item-flex"> 
                        <ValidationProvider rules="required" v-slot="{errors}">
                        <b-form-group :class="{error:errors[0]}">
                                <label class="font-weight-bold">موسسه/مجموعه/شرکت</label>
                                <b-form-input v-model="jobHistoryInfo[i-1].companyName" ></b-form-input>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </div>
                    <div class="item-flex"> 
                        <ValidationProvider v-slot="{errors}">
                            <b-form-group :class="{error:errors[0]}">
                                 <label class="font-weight-bold">سمت</label>
                                 <span class="text-gray"> - اختیاری</span>
                                <b-form-input v-model="jobHistoryInfo[i-1].role"></b-form-input>
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
                                v-model="jobHistoryInfo[i-1].salary">
                                </b-form-input>                         
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
                                v-model="jobHistoryInfo[i-1].startDate"
                                type="year-month">
                                </VuePersianDatetimePicker>
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
                                v-model="jobHistoryInfo[i-1].endDate"
                                type="year-month">
                                </VuePersianDatetimePicker> 
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </div>
                    <div>
                        <button class="btn-float" @click.prevent="deleteRow(i-1,jobHistoryInfo)">
                            <v-icon scale="1.5" name="times"/>
                        </button>
                    </div>
                </div>
                <AddBtn v-on:addItem='addRow(jobHistoryInfo)'/>
            </div>

             <!-- Courses -->
            <div class="form-section">
                <h5 class="form-title">دوره های آموزشی</h5>
                <hr>
                <div class="row-flex" v-for="i in coursesInfo.length" v-bind:key="i">
                    <div class="item-flex item-flex__two"> 
                        <ValidationProvider v-slot="{errors}">
                        <b-form-group :class="{error:errors[0]}">
                                <label class="font-weight-bold">دوره آموزشی</label>
                                <span class="text-gray"> - اختیاری</span>
                                <b-form-input v-model="coursesInfo[i-1].title" ></b-form-input>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </div>
                    <div class="item-flex"> 
                        <ValidationProvider v-slot="{errors}">
                            <b-form-group :class="{error:errors[0]}">
                                <label class="font-weight-bold">موسسه/آموزشگاه</label>
                                <span class="text-gray"> - اختیاری</span>
                                <b-form-input v-model="coursesInfo[i-1].school"></b-form-input>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </div>
                    <div class="item-flex"> 
                        <ValidationProvider v-slot="{errors}" rules="numeric" name="مدت دوره">
                            <b-form-group :class="{error:errors[0]}">
                                <label class="font-weight-bold">مدت دوره (ماه)</label>
                                <span class="text-gray"> - اختیاری</span>
                                <b-form-input v-model="coursesInfo[i-1].startDate"></b-form-input>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </div>
                    <div class="item-flex"> 
                        <ValidationProvider v-slot="{errors}">
                            <b-form-group :class="{error:errors[0]}">
                                <label class="font-weight-bold">عنوان مدرک</label>
                                <span class="text-gray"> - اختیاری</span>
                                <b-form-input v-model="coursesInfo[i-1].degreeName"></b-form-input>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </div>
                    <div>
                        <button class="btn-float" @click.prevent="deleteRow(i-1,coursesInfo)">
                            <v-icon scale="1.5" name="times"/>
                        </button>
                    </div>
                </div>
                <AddBtn v-on:addItem='addRow(coursesInfo)'/>
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
                    { value: 'es', text: 'دیپلم'},
                    { value: 'jb', text: 'کاردانی'},
                    { value: 'jb', text: 'کارشناسی'},
                    { value: 'jb', text: 'کارشناسی ارشد'},
                    { value: 'jb', text: 'دکترا'},
                    { value: 'others', text: 'سایر'}
                ],
                educationStatus:[
                    { value: null, text: 'انتخاب کنید' },
                    { value: 'es', text: 'دانشجو'},
                    { value: 'jb', text: 'فارغ التحصیل'},
                ],
                residence:[
                    { value: null, text: 'انتخاب کنید' },
                    { value: 'complete', text: 'دورشهر'},
                    { value: 'exempt', text: 'عطاران'},
                ],
            },
            educationInfo:[{}],
            jobHistoryInfo:[{}],
            coursesInfo:[{}],
            test:null
        }
            
    },
    methods:{
        handleNextStep(){
            this.$emit('handleNextStep')
        },
        handlePrevStep(){
            this.$emit('handlePrevStep')
        },
        addRow(array){
            array.push({})
        },
        deleteRow(index,array){
            array.splice(index,1)
        },
        addComma(index){
            this.jobHistoryInfo[index].salary = this.jobHistoryInfo[index].salary.replace(/\D/g, "")
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
