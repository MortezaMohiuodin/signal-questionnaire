<template>
  <div>
      <b-row>
          <b-col col>
                <label for="" class="font-weight-bold">{{listName}}</label>
                <b-input-group>
                    <b-form-input class="mw-300" v-on:keyup.enter="addItem()" v-model="item_input"></b-form-input>
                    <b-input-group-append>
                        <b-button variant="info" @click.prevent="addItem()">
                            افزودن
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
                <ul>
                    <li v-for="(item,index) in items" v-bind:key="index">
                        <div class="tag">
                            <span class="tag__text">{{item}}</span>
                            <span @click="removeTag(index)" class="tag__remove">
                                <v-icon scale="1" name="times"/>
                            </span>
                        </div>
                    </li>
                </ul>
          </b-col>
      </b-row>
  </div>
</template>

<script>

export default {
    name: 'ItemList',
    props:['items','listName'],
    data(){
        return{
            item_input:null
        }
    },
    methods:{
        addItem(){
            if(this.item_input){
                this.items.push(this.item_input)
                this.item_input = null
            }
        },
        removeTag(index){
            this.items.splice(index,1)
        }
    }
}
</script>

<style scoped>
.maxw-400{
    max-width: 400px;
}
ul{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 1rem;
}
.tag{
    position: relative;
    display: inline-block;
    padding: .2rem 1rem;
    background-color: #ded6d6;
    margin: .2rem .5rem;
    border-radius: .2rem;
}
.tag__remove{
    position: absolute;
    right: 0px;
    top: 0;
    cursor: pointer;
    color: gray;
    transform: translate(50%,-50%);
    display: inline-block;
    width: 15px;
    height: 15px;
    text-align: center;
    line-height: 15px;
    border-radius: 50%;
    font-size: 20px;
}
.tag__remove:hover{
    color: black;
}
.input-group input{
    border-radius: 0 .5rem .5rem 0!important;
}
.input-group-append button{
    border-radius: 0.5rem 0rem 0rem 0.5rem!important;
}
</style>
