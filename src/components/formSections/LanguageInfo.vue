<template>
  <div>
    <ValidationObserver v-slot="{handleSubmit}">
        <div class="test">
            <div class="mx-2 mb-3 p-3 position-relative bg-color-row" v-for="i in rows" v-bind:key="i">
                <button class="btn-float" @click.prevent="deleteRow(i-1)">
                    <v-icon scale="1.2" name="trash"/>
                </button>
                <b-row class="mx-0">
                    <b-col sm="4"> 
                        <ValidationProvider rules="required" v-slot="{errors}">
                            <b-form-group
                            label="زبان خارجی"
                            label-class="font-weight-bold">
                                <v-select
                                label="text"
                                v-model="languageInfo[i-1].language"
                                :options="options.languages"
                                :reduce="item => item.value">
                                </v-select>
                                <span class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                    <b-col sm="4" v-if="languageInfo[i-1].language === 'others'"> 
                        <ValidationProvider rules="required" v-slot="{errors}">
                            <b-form-group
                            label="سایر"
                            label-class="font-weight-bold">
                                <b-form-input v-model="languageInfo[i-1].languageOther"></b-form-input>
                                <span class="errMessage">{{errors[0]}}</span>
                            </b-form-group>
                        </ValidationProvider>
                    </b-col>
                </b-row>
                <b-row class="mx-0" v-if="languageInfo[i-1].language">
                    <b-col sm="3"> 
                        <div class="text-center">مهارت گفتاری</div>
                        <StarRating  v-bind:star-size="25" :show-rating="false" v-model="languageInfo[i-1].speaking"/>
                    </b-col>
                    <b-col sm="3"> 
                        <div class="text-center">مهارت شنیداری</div>
                        <StarRating  v-bind:star-size="25" :show-rating="false" v-model="languageInfo[i-1].listening"/>
                    </b-col>
                    <b-col sm="3"> 
                        <div class="text-center">مهارت خواندن</div>
                        <StarRating  v-bind:star-size="25" :show-rating="false" v-model="languageInfo[i-1].reading"/>
                    </b-col>
                    <b-col sm="3"> 
                        <div class="text-center">مهارت نوشتاری</div>
                        <StarRating  v-bind:star-size="25" :show-rating="false" v-model="languageInfo[i-1].writing"/>
                    </b-col>
                </b-row>
            </div>
        </div>
        <AddBtn v-on:addItem='addRow'/>
        <NabButtons 
        :invalid="invalid"
        v-on:handleNextStep="handleSubmit(handleNextStep)"
        v-on:handlePrevStep="handlePrevStep"/>
     </ValidationObserver>
  </div>
</template>

<script>
import NabButtons from '@/components/NavButtons.vue'
import AddBtn from '@/components/AddBtn.vue'
import StarRating from 'vue-star-rating'

export default {
    name: 'languageInfo',
    components: {
        NabButtons,
        AddBtn,
        StarRating
    },
    data(){
        return{
            options:{
              languages:[
                { value: null, text: 'انتخاب کنید' },
                { value: 'es', text: 'دیپلم'},
                { value: 'jb', text: 'کاردانی'},
                { value: 'jb', text: 'کارشناسی'},
                { value: 'others', text: 'سایر'}
              ]
            },
            languageInfo:[{}],
            rows: 1,
            rating:null
        }
            
    },
    methods:{
        handleNextStep(){
            this.$emit('handleNextStep')
        },
        handlePrevStep(){
            this.$emit('handlePrevStep')
        },
        addRow(){
            this.rows++
            this.languageInfo.push({})
        },
        deleteRow(i){
            this.rows--
            this.languageInfo.splice(i,1)
        }
    }
}
</script>

<style scoped>

</style>
