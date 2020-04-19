<template>
  <div>
        <b-row class="mx-2 mb-3 p-2">
            <b-col sm="12">
                <div>لطفا فایل های زیر را بارگذاری نمایید، می توانید از لینک هر بخش برای تهیه فایل استفاده نمایید</div>
                <hr>
            </b-col>
            <b-col sm="4" class="text-center"> 
                <p>فایل رزومه</p>
                <div>
                    <label class="custom-file-upload">
                        <v-icon scale="1.2" name="upload"/> <small>بارگذاری </small>
                        <input @change="onFileChange" name="resume"  aria-describedby="addon-right addon-left" type="file" class="form-control d-none">
                    </label>
                    <div v-if="resume">{{resume.name}}</div>
                </div>
                <a href="#">لینک</a>
            </b-col>
            <b-col sm="4" class="text-center"> 
                <p>فایل تست هوش</p>
                <div>
                    <label class="custom-file-upload">
                        <v-icon scale="1.2" name="upload"/> <small>بارگذاری </small>
                        <input @change="onFileChange" name="iq"  aria-describedby="addon-right addon-left" type="file" class="form-control d-none">
                    </label>
                    <div v-if="iqTest">{{iqTest.name}}</div>
                </div>
                <a href="#">لینک</a>
            </b-col>
            <b-col sm="4" class="text-center"> 
                <p>فایل تست شخصیت</p>
                <div>
                    <label class="custom-file-upload">
                        <v-icon scale="1.2" name="upload"/> <small>بارگذاری </small>
                        <input @change="onFileChange" name="personality"  aria-describedby="addon-right addon-left" type="file" class="form-control d-none">
                    </label>
                    <div v-if="personalityTest">{{personalityTest.name}}</div>
                </div>
                <a href="#">لینک</a>
            </b-col>
        </b-row>
         <NabButtons 
        :invalid="invalid"
        v-on:handleNextStep="handleNextStep"
        v-on:handlePrevStep="handlePrevStep"/>
  </div>
</template>

<script>
import NabButtons from '@/components/NavButtons.vue'
import dialog from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.min.css';

export default {
    name: 'fileUpload',
    components: {
        NabButtons
    },
    data(){
        return{
          resume:null,
          iqTest:null,
          personalityTest:null
        }
            
    },
    computed:{
        invalid(){
            if(this.resume && this.iqTest && this.personalityTest){
                console.log('true')
                return false
            }else{
                return true
            }
        }
    },  
    methods:{
        handleNextStep(){
            this.$emit('handleNextStep')
        },
        handlePrevStep(){
            this.$emit('handlePrevStep')
        },
        onFileChange(e){
            let name = e.target.getAttribute('name')
            let file = e.target.files[0]
            console.log(file)
            if(file.type === 'application/pdf'){
                if(name === 'resume'){
                    this.resume = file
                }else if(name === 'iq'){
                    this.iqTest = file
                }else{
                    this.personalityTest = file
                }
            }else{
                dialog.fire({
                    title: 'خطا',
                    text: 'لطفا تنها با فرمت PDF بارگزاری کنید',
                    icon: 'error',
                    confirmButtonText: 'خب',
                    confirmButtonColor:'#226d6a'
                })
            }
        }
    }
}
</script>

<style scoped>
.uploadImgPreview{
        width: 150px;
        height: auto;
}
.custom-file-upload{
    padding: 10px 13px;
    background: lightblue;
    cursor: pointer;
}
</style>
