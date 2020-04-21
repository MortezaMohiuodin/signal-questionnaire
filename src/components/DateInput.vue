<template>
  <div>
      <input v-on:keyup="checkDigit" placeholder="سال" name="year" type="text">
      <input v-on:keyup="checkDigit" placeholder="ماه" name="month" type="text">
      <input v-on:keyup="checkDigit" placeholder="روز" name="day" type="text">
  </div>
</template>

<script>

export default {
    name: 'DateInput',

    data(){
        return{

        }
        
    },
    methods:{
        checkDigit(e){
            let value = e.target.value
            let name = e.target.name
            if(name === 'year'){
                if(value.length === 4){
                    document.querySelector("input[name='month']").focus()
                }
            }else if(name === 'month'){
                if(value.length === 2){
                    document.querySelector("input[name='day']").focus()
                }
            }
        }
    }
}
</script>

<style>

</style>
