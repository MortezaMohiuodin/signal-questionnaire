<template>
  <div>
    <ValidationObserver v-slot="{handleSubmit}">

        <div class="form-sections">

            <!-- Educational records -->
            <div class="form-section">
                <h5 class="form-title">سوابق تحصیلی</h5>
                <hr>
                <b-row class="row-box" v-for="i in educationInfo.length" v-bind:key="i">
                    <button class="btn-float" @click.prevent="deleteRow(i-1,educationInfo)">
                        <v-icon scale="1.2" name="times"/>
                    </button>
                    <b-col sm="4"> 
                        <ValidationProvider rules="required" v-slot="{errors}">
                            <b-form-group
                            label="سطح *"
                            label-class="font-weight-bold">
                                <v-select
                                label="text"
                                v-model="educationInfo[i-1].degree"
                                :options="options.degrees">
                                </v-select>
                                <span class="errMessage">{{errors[0]}}</span>
                                <span class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4" v-if="educationInfo[i-1].degree && educationInfo[i-1].degree.value === 'others'"> 
                        <ValidationProvider rules="required" v-slot="{errors}">
                            <b-form-group
                            label="سایر (سطح) *"
                            label-class="font-weight-bold">
                                <b-form-input v-model="educationInfo[i-1].degreeOther"></b-form-input>
                                <span class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4"> 
                        <ValidationProvider rules="required" v-slot="{errors}">
                            <b-form-group
                            label="رشته *"
                            label-class="font-weight-bold">
                                <b-form-input v-model="educationInfo[i-1].major"></b-form-input>
                                <span class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4"> 
                        <ValidationProvider v-slot="{errors}">
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
                            label="وضعیت تحصیل *"
                            label-class="font-weight-bold">
                                <v-select
                                label="text"
                                v-model="educationInfo[i-1].educationStatus"
                                :options="options.educationStatus">
                                </v-select>
                                <span class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4"> 
                        <ValidationProvider v-slot="{errors}">
                            <b-form-group
                            label="معدل "
                            label-class="font-weight-bold">
                                <b-form-input v-model="educationInfo[i-1].score"></b-form-input>
                                <span class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                </b-row>
                <AddBtn v-on:addItem='addRow(educationInfo)'/>
            </div>

            <!-- Jobs records -->
            <div class="form-section">
                <h5 class="form-title">سوابق کاری</h5>
                <hr>
                <b-row class="row-box" v-for="i in jobHistoryInfo.length" v-bind:key="i">
                    <button class="btn-float" @click.prevent="deleteRow(i-1,jobHistoryInfo)">
                        <v-icon scale="1.2" name="times"/>
                    </button>
                    <b-col sm="4"> 
                        <ValidationProvider rules="required" v-slot="{errors}">
                        <b-form-group
                            label="موسسه/مجموعه/شرکت *"
                            label-class="font-weight-bold">
                                <b-form-input v-model="jobHistoryInfo[i-1].companyName" ></b-form-input>
                                <span class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4"> 
                        <ValidationProvider v-slot="{errors}">
                            <b-form-group
                            label="سمت"
                            label-class="font-weight-bold">
                                <b-form-input v-model="jobHistoryInfo[i-1].role"></b-form-input>
                                <span class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4"> 
                        <ValidationProvider rules="required" v-slot="{errors}">
                            <b-form-group
                            label="حقوق دریافتی (تومان) *"
                            label-class="font-weight-bold">
                                <b-form-input v-model="jobHistoryInfo[i-1].salary"></b-form-input>                          <!-- <b-form-input v-model="jobHistoryInfo[i-1].salary"></b-form-input> -->
                                <span class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4"> 
                        <ValidationProvider v-slot="{errors}">
                            <b-form-group
                            label="تاریخ شروع (ماه و سال)"
                            label-class="font-weight-bold">
                                <VuePersianDatetimePicker 
                                v-model="jobHistoryInfo[i-1].startDate"
                                type="year-month"
                                ></VuePersianDatetimePicker>
                                <span class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4"> 
                        <ValidationProvider v-slot="{errors}">
                        <b-form-group
                            label="تاریخ پایان (ماه و سال)"
                            label-class="font-weight-bold">
                                <VuePersianDatetimePicker 
                                v-model="jobHistoryInfo[i-1].endDate"
                                type="year-month"
                                ></VuePersianDatetimePicker>                                <span class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                </b-row>
                <AddBtn v-on:addItem='addRow(jobHistoryInfo)'/>
            </div>

             <!-- Courses -->
            <div class="form-section">
                <h5 class="form-title">دوره های آموزشی</h5>
                <hr>
                <b-row class="row-box" v-for="i in coursesInfo.length" v-bind:key="i">
                    <button class="btn-float" @click.prevent="deleteRow(i-1,coursesInfo)">
                        <v-icon scale="1.2" name="times"/>
                    </button>
                    <b-col sm="4"> 
                        <ValidationProvider v-slot="{errors}">
                        <b-form-group
                            label="عنوان دوره"
                            label-class="font-weight-bold">
                                <b-form-input v-model="coursesInfo[i-1].title" ></b-form-input>
                                <span class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4"> 
                        <ValidationProvider v-slot="{errors}">
                            <b-form-group
                            label="موسسه/آموزشگاه"
                            label-class="font-weight-bold">
                                <b-form-input v-model="coursesInfo[i-1].school"></b-form-input>
                                <span class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4"> 
                        <ValidationProvider v-slot="{errors}" rules="numeric">
                            <b-form-group
                            label="مدت دوره (ماه)"
                            label-class="font-weight-bold">
                                <b-form-input v-model="coursesInfo[i-1].startDate"></b-form-input>
                                <span class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4"> 
                        <ValidationProvider v-slot="{errors}">
                            <b-form-group
                            label="عنوان مدرک"
                            label-class="font-weight-bold">
                                <b-form-input v-model="coursesInfo[i-1].degreeName"></b-form-input>
                                <span class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                </b-row>
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
                ]

            },
            educationInfo:[{}],
            jobHistoryInfo:[{}],
            coursesInfo:[{}],
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
        }
    }
}
</script>

<style scoped>

</style>
