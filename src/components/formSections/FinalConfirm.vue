<template>
  <div>
    <ValidationObserver v-slot="{handleSubmit}">
        <div class="form-sections">
            <!-- Salary and rights -->
            <div class="form-section">
                <h5 class="form-title">حقوق و مزایا</h5>
                <hr>
                <b-row>
                    <b-col sm="4">
                        <ValidationProvider rules="required" v-slot="{errors}">
                            <b-form-group
                            label="حداقل حقوق پیشنهادی (تومان)"
                            label-class="font-weight-bold">
                                <b-form-input class="" v-model="salary"></b-form-input>
                                <span class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4">
                        <ItemList 
                        :items="items" 
                        :listName="'مزایا و شرایط درخواستی شما'"/>
                    </b-col>
                </b-row>
            </div>

            <!-- Phone number confirmation -->
            <div class="form-section">
                <h5 class="form-title">تایید شماره موبایل</h5>
                <hr>
                <b-row>
                    <b-col sm="4">
                        <ValidationProvider rules="required" v-slot="{errors}">
                            <b-input-group>
                                <b-form-input class="mw-300" v-model="phoneNumber"></b-form-input>
                                <b-input-group-append>
                                    <b-button variant="info">
                                        دریافت کد تایید
                                    </b-button>
                                </b-input-group-append>
                            </b-input-group>
                            <span class="errMessage">{{errors[0]}}</span>
                        </ValidationProvider>
                    </b-col>
                </b-row>
            </div>
        </div>
        
        <div class="form-nav-buttons">
            <button
            class="sbtn"
            @click.prevent="handleSubmit(sendData)">
                تایید نهایی
            </button>
            <button 
            :class="{dNone:hidePrev}" 
            class="sbtn sbtn-prev" 
            @click.prevent="handlePrevStep">
                قبلی
            </button>
        </div>
        
     </ValidationObserver>
  </div>
</template>

<script>
import ItemList from '@/components/ItemList.vue'
import dialog from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.min.css';

export default {
    name: 'finalConfirm',
    components: {
        ItemList
    },
    data(){
        return{
            items:[],
            salary:null,
            phoneNumber: '0919xxxxxxxx'
        }
            
    },
    methods:{
        handlePrevStep(){
            this.$emit('handlePrevStep')
        },
        sendData(){
            //Sending data to server
            dialog.fire({
                title: 'پیام',
                text: 'اطلاعات با موفقیت ثبت شد',
                icon: 'success',
                confirmButtonText: 'خب',
                confirmButtonColor:'#1cc269'
            })
        }

    }
}
</script>

<style scoped>
.input-group input{
    border-radius: 0 .5rem .5rem 0!important;
}
.input-group-append button{
    border-radius: 0.5rem 0rem 0rem 0.5rem!important;
}
.form-nav-buttons{
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin-top: 1rem;
}
.sbtn{
    background: #029a8e;
    color: #f6fbfb;
    flex-basis: 50%;
    max-width: 350px;
    padding: .6rem 0;
    border: 0;
    border-radius: .5rem;
    margin: 0 .2rem;
}
.sbtn-prev{
    background: #959595;
}
.sbtn.disabled{
   background: #029a8e54; 
}
.dNone{
    display: none!important;
}
</style>
