<template>
    <div>
        <Navigation 
        :steps="steps" 
        :step="step"/>
        <div class="form-steps">
            <transition name="fade" mode="out-in">
                <component 
                :is="formComponent"
                v-on:handleNextStep="handleNextStep"  
                v-on:handlePrevStep="handlePrevStep"  
                ></component>
            </transition>
        </div>
    </div>
</template>

<script>

import Navigation from '@/components/Navigation.vue'

import PersonalInfo from '@/components/formSections/PersonalInfo.vue'
import ContactInfo from '@/components/formSections/ContactInfo.vue'
import EducationInfo from '@/components/formSections/EducationInfo.vue'
import JobHistoryInfo from '@/components/formSections/JobHistoryInfo.vue'
import LanguageInfo from '@/components/formSections/LanguageInfo.vue'
import SkillsInfo from '@/components/formSections/SkillsInfo.vue'
import ProgramsSkillInfo from '@/components/formSections/ProgramsSkillInfo.vue'
import CoursesInfo from '@/components/formSections/CoursesInfo.vue'
import FreeTimeInfo from '@/components/formSections/FreeTimeInfo.vue'
import SalaryAndRightsInfo from '@/components/formSections/SalaryAndRightsInfo.vue'
import FileUpload from '@/components/formSections/FileUpload.vue'
import FinalConfirm from '@/components/formSections/FinalConfirm.vue'

export default {
    name: 'signalForm',
    components: {
       Navigation,
       PersonalInfo,
       ContactInfo,
       EducationInfo,
       JobHistoryInfo,
       LanguageInfo,
       SkillsInfo,
       ProgramsSkillInfo,
       CoursesInfo,
       FreeTimeInfo,
       SalaryAndRightsInfo,
       FileUpload,
       FinalConfirm
    },
    data(){
        return{
            steps:[
                {number: '1',title:'مشخصات فردی'},
                {number: '2',title:'اطلاعات تماس'},
                {number: '3',title:'سوابق تحصیلی '},
                {number: '4',title:'سوابق کاری'},
                {number: '5',title:'زبان های خارجی'},
                {number: '6',title:'مهارت های کلیدی'},
                {number: '7',title:'آشنایی با نرم افزار'},
                {number: '8',title:'دوره های آموزشی'},
                {number: '9',title:'اوقات فراغت'},
                {number: '10',title:'حقوق و مزایا'},
                {number: '11',title:'آپلود فایل'},
                {number: '12',title:'تایید نهایی'},
            ],
            step:1,
        }
    },
    computed:{
        formComponent(){
            let component = null
            switch(this.step){
                case 1: 
                    component = 'PersonalInfo'
                    break;
                case 2:
                    component = 'ContactInfo'
                    break;
                case 3:
                    component = 'EducationInfo'
                    break;
                case 4:
                    component = 'JobHistoryInfo'
                    break;
                case 5:
                    component = 'LanguageInfo'
                    break;
                case 6:
                    component = 'SkillsInfo'
                    break;
                case 7:
                    component = 'ProgramsSkillInfo'
                    break;
                case 8:
                    component = 'CoursesInfo'
                    break;
                case 9:
                    component = 'FreeTimeInfo'
                    break;
                case 10:
                    component = 'SalaryAndRightsInfo'
                    break;
                case 11:
                    component = 'FileUpload'
                    break;
                case 12:
                    component = 'FinalConfirm'
                    break;
            }
            return component
        }
    },
    methods:{
            handleNextStep(){
                this.step++
            },
            handlePrevStep(){
                this.step--
            }
        }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity .4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
.form-steps{
    background: white;
    border-radius: .7rem;
    padding: 2rem 1rem;
    margin-top: 30px;
}
</style>
