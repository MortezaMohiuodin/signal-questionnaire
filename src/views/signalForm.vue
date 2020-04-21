<template>
    <div>
        <Navigation 
        :steps="steps" 
        :step="step"/>
        <div class="form-steps">
            <transition name="fade" mode="out-in">
                <keep-alive>
                    <component 
                    :is="formComponent"
                    v-on:handleNextStep="handleNextStep"  
                    v-on:handlePrevStep="handlePrevStep"  
                    ></component>
                </keep-alive>
            </transition>
        </div>
    </div>
</template>

<script>

import Navigation from '@/components/Navigation.vue'

import Specifications from '@/components/formSections/Specifications.vue'
import Records from '@/components/formSections/Records.vue'
import SkillAbility from '@/components/formSections/SkillAbility.vue'
import FinalConfirm from '@/components/formSections/FinalConfirm.vue'

export default {
    name: 'signalForm',
    components: {
       Navigation,
       Specifications,
       Records,
       SkillAbility,
       FinalConfirm
    },
    data(){
        return{
            steps:[
                {number: '1',title:'مشخصات'},
                {number: '2',title:'سوابق'},
                {number: '3',title:'مهارت ها توانایی ها ویژگی ها'},
                {number: '4',title:'تایید نهایی'}
            ],
            step:4,
        }
    },
    computed:{
        formComponent(){
            let component = null
            switch(this.step){
                case 1: 
                    component = 'Specifications'
                    break;
                case 2:
                    component = 'Records'
                    break;
                case 3:
                    component = 'SkillAbility'
                    break;
                case 4:
                    component = 'FinalConfirm'
                    break;
                default:
                    component = 'Specifications'
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
    padding:1rem;
    margin-top: 30px;
}
@media(max-width: 768px){
  .form-steps{
    padding:.5rem;
}
}
</style>
