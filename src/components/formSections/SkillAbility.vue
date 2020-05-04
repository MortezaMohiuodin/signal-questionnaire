<template>
  <div>
    <ValidationObserver v-slot="{handleSubmit}">

        <div class="form-sections">

            <!-- Languages -->
            <div class="form-section">
                <h5 class="form-title">زبان های خارجی</h5>
                <hr>
                <b-row class="row-box" v-for="i in languages.length" v-bind:key="i">
                    <button class="btn-float" @click.prevent="deleteRow(i-1,languages)">
                        <v-icon scale="1.5" name="times"/>
                    </button>
                    <b-col sm="4"> 
                        <ValidationProvider v-slot="{errors}" name="زبان خارجی">
                            <b-form-group
                            label="زبان خارجی"
                            label-class="font-weight-bold">
                                <v-select
                                label="text"
                                v-model="languages[i-1].language"
                                :options="options.languages"
                                :reduce="item => item.value">
                                </v-select>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4" 
                    v-if="languages[i-1].language && languages[i-1].language.value === 'others'"> 
                        <ValidationProvider rules="required" v-slot="{errors}" name="توضیح سایر">
                            <b-form-group
                            label="سایر"
                            label-class="font-weight-bold">
                                <b-form-input v-model="languages[i-1].language_other"></b-form-input>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-row class="mx-0" v-if="languages[i-1].language">
                        <b-col sm="3"> 
                            <ValidationProvider rules="required" v-slot="{errors}" name="مهارت گفتاری"> 
                                <div class="text-center mb-1" >مهارت گفتاری</div>
                                <StarRating  v-bind:star-size="25" :show-rating="false" v-model="languages[i-1].speaking"/>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </ValidationProvider>
                        </b-col>
                        <b-col sm="3"> 
                            <ValidationProvider rules="required" v-slot="{errors}" name="مهارت شنیداری">
                                <div class="text-center mb-1">مهارت شنیداری </div>
                                <StarRating  v-bind:star-size="25" :show-rating="false" v-model="languages[i-1].listening"/>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </ValidationProvider>
                        </b-col>
                        <b-col sm="3"> 
                            <ValidationProvider rules="required" v-slot="{errors}" name="مهارت خواندن">
                                <div class="text-center mb-1">مهارت خواندن</div>
                                <StarRating  v-bind:star-size="25" :show-rating="false" v-model="languages[i-1].reading"/>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </ValidationProvider>
                        </b-col>
                        <b-col sm="3"> 
                            <ValidationProvider rules="required" v-slot="{errors}" name="مهارت نوشتاری">
                                <div class="text-center mb-1">مهارت نوشتاری </div>
                                <StarRating  v-bind:star-size="25" :show-rating="false" v-model="languages[i-1].writing"/>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </ValidationProvider>
                        </b-col>
                    </b-row>
                </b-row>
                <AddBtn v-on:addItem='addRow(languages)'/>
            </div>

             <!-- Program skill -->
            <div class="form-section">
                <h5 class="form-title">آشنایی با نرم افزارهای کاربردی</h5>
                <hr>
                <b-row>
                    <b-col cols="6" sm="4" md="2" v-for="program in program_skills" v-bind:key="program.value">
                        <b-form-checkbox
                            v-model="program.checked"
                            :value="program.value"
                            class="mb-1 pl-4">
                            {{program.name}}
                        </b-form-checkbox>
                        <StarRating v-if="program.checked" 
                        v-bind:star-size="25" 
                        :show-rating="false" 
                        v-model="program.rating"/>
                    </b-col>
                </b-row>
            </div>

            <!-- Professional skills -->
            <div class="form-section">
                <h5 class="form-title">مهارت های تخصصی</h5>
                <hr>
                <ItemList :items="skills"/>
            </div>

            <!-- File uploads -->
            <div class="form-section">
                <h5 class="form-title">بارگذاری فایل ها</h5>
                <hr>
                <b-row class="row-box" v-for="(fileUpload,i) in filesUpload" v-bind:key="i">
                    <button class="btn-float" @click.prevent="deleteRow(i,filesUpload)">
                        <v-icon scale="1.5" name="times"/>
                    </button>
                    <b-col sm="4"> 
                        <ValidationProvider v-slot="{errors}">
                            <b-form-group
                            label="لیست فایل ها"
                            label-class="font-weight-bold">
                                <v-select
                                label="text"
                                v-model="filesUpload[i].name"
                                :options="options.filesUpload"
                                :reduce="item => item.value">
                                </v-select>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4" v-if="filesUpload[i].name === 'others'"> 
                        <ValidationProvider rules="required" v-slot="{errors}">
                            <b-form-group
                            label="سایر"
                            label-class="font-weight-bold">
                                <b-form-input v-model="filesUpload[i].file_other"></b-form-input>
                                <span v-if="errors[0]" class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4" v-if="filesUpload[i].name"> 
                        <b-form-group
                        label="آپلود فایل"
                        label-class="font-weight-bold"
                        class="mb-0">
                            <label class="custom-file-upload">
                                <v-icon scale="1.5" name="upload"/> <small>بارگذاری </small>
                                <input @change="onFileChange($event,i)" aria-describedby="addon-right addon-left" type="file" class="form-control d-none">
                            </label>
                            <span class="mr-2" v-if="filesUpload[i].file">{{filesUpload[i].file.name}}</span>
                        </b-form-group>
                    </b-col>
                </b-row>
                <AddBtn v-on:addItem='addRow(filesUpload)'/>
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
import StarRating from 'vue-star-rating'
import ItemList from '@/components/ItemList.vue'
import dialog from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.min.css';

export default {
    name: 'skillAbilty',
    components: {
        NabButtons,
        AddBtn,
        StarRating,
        ItemList
    },
    data(){
        return{
            options:{
              languages:[
                { value: null, text: 'انتخاب کنید' },
                { value: 'es', text: 'انگلیسی'},
                { value: 'jb', text: 'عربی'},
                { value: 'jb', text: 'چینی'},
                { value: 'jb', text: 'فرانسوی'},
                { value: 'jb', text: 'آلمانی'},
                { value: 'jb', text: 'ترکی'},
                { value: 'others', text: 'سایر'}
              ],
              filesUpload:[
                { value: null, text: 'انتخاب کنید' },
                { value: 'resume', text: 'روزمه'},
                { value: 'courses', text: 'دوره های آموزشی'},
                { value: 'others', text: 'سایر'}
              ]
            },
            program_skills:[
                  { value: 'excel', name:'اکسل',checked:null,rating:null},
                  { value: 'photoshop', name:'فوتوشاپ',checked:null,rating:null},
                  { value: 'tenFinger', name:'تایپ ده انگشتی',checked:null,rating:null},
                  { value: 'web', name:'وبگردی',checked:null,rating:null},
                  { value: 'network', name:'شبکه',checked:null,rating:null}
            ],
            languages:[{}],
            skills:[],
            filesUpload:[{}],
            skillAbility:null
        }
            
    },
    methods:{
        handleNextStep(){
            let selected_programs = this.program_skills.filter(item => {
                if(item.checked){
                    return item
                }
            })
            this.skillAbility = {
                languages: this.languages,
                skills: this.skills,
                filesUpload:this.filesUpload,
                program_skills:selected_programs
            }
            this.$store.dispatch('changeSkillAbility',this.skillAbility)
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
        onFileChange(e,index){
            let file = e.target.files[0]
            let error = null
            if(file.type !== 'application/pdf' && file.type !== 'image/jpeg'){
                error = 'لطفا تنها فایل PDF و JPG بارگذاری کنید'
            }else if(file.size > 500000){
                error = 'فایل باید کمتر از 500 کیلوبایت باشد'
            }

            if(error){
                dialog.fire({
                    title: 'خطا',
                    text: error,
                    icon: 'error',
                    confirmButtonText: 'خب',
                    confirmButtonColor:'#f27474'
                })
            }else{
                this.filesUpload[index].file = file
                this.filesUpload.push({})
                this.filesUpload.pop()
            }
           
        }
    }
}
</script>

<style scoped>
.custom-checkbox{
    text-align: center;
    padding: .5rem;
}
.uploadImgPreview{
        width: 150px;
        height: auto;
}
.custom-file-upload{
    padding: 5px 15px;
    background: #266f8000;
    cursor: pointer;
    color: #00837d;
    border-radius: .2rem;
    border: 2px solid #00837d;
}
</style>
