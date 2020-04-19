<template>
  <div>
        <div class="form-nav-buttons">
            <button
            class="sbtn"
             @click.prevent="$emit('handleNextStep')">
                بعدی
            </button>
            <button 
            :class="{dNone:hidePrev}" 
            class="sbtn sbtn-prev" 
            @click.prevent="$emit('handlePrevStep')">
                قبلی
            </button>
        </div>
  </div>
</template>

<script>
export default {
    name: 'navButtons',
    props:{
        invalid:{
            type:String,
        },
        hidePrev:{
            type:Boolean,
            default:false
        }
    }
}
</script>

<style scoped>
.form-nav-buttons{
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin-top: 1rem;
}
.sbtn{
    background: #029a8e;
    color: #f6fbfb;
    flex: 1 1 auto;
    max-width: 350px;
    padding: .6rem 0;
    border: 0;
    border-radius: .5rem;
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
