<template>
    <div>
        <ul>
            <li v-for="singleStep in steps" v-bind:key="singleStep.number">
                <div class="nav-step">
                    <div 
                    :class="{active: step == singleStep.number,completed: step > singleStep.number}"
                    class="nav-step__progress">
                         <span 
                         :class="{iconCompleted:step > singleStep.number}" 
                         class="nav-step__progress__icon">
                            <template v-if="step > singleStep.number">
                                <v-icon scale=".8" name="check"/>
                            </template>
                            <template v-else>
                                {{singleStep.number}}
                            </template>
                        </span>
                    </div>
                    <div class="nav-step__progress__title">{{singleStep.title}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    name: 'Navigation',
    components: {
    },
    props:[
        'steps',
        'step'
    ],
    computed:{
        stepIcon(){
            return 1
        }
    }
}
</script>

<style scoped>

ul{
    display: flex;
    flex-direction: row;
}

li{
    flex: 1 1 16.6%;
}

.nav-step{
    text-align: center;
}

.nav-step__progress{
    height: 8px;
    background-color: #64c4bc;
    position: relative;
}

ul li:first-child .nav-step__progress{
    border-radius: 0 3rem 3rem 0;
}

ul li:last-child .nav-step__progress{
    border-radius: 3rem 0 0 3rem;
}

.nav-step__progress__icon{
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(50%,-50%);
    color: #039a8e;
    display: inline-block;
    background: white;
    border-radius: 2rem;
    width: 20px;
    height: 20px;
    line-height: 20px;
    z-index: 5;
    font-size: 14px;
    font-weight: bold;
}

.nav-step__progress__title{
    margin-top: 20px;
    color: #f6fbfb;
}

.active{
    background-color: white;
}

.completed{
    background-color: #69e1a1;
}

.iconCompleted{
    font-weight: bold;
    background: #1cc269;
    color: white;
}
@media(max-width: 1100px){
  .nav-step__progress__title{
    display: none;
  }
  .nav-step__progress__icon{
    width: 27px;
    height: 27px;
    line-height: 27px;
    font-size: 15px;
  }
}
</style>