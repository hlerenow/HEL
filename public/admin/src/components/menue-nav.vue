<template>
  <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
    <div class="panel panel-default" v-for="(topItem,index) in menueItem">
        <div class="panel-heading" role="tab" :id="'heading'+index">
          <h4 class="panel-title">
          <a data-toggle="collapse" :class="{collapsed:index==0}" data-parent="#accordion" :href="'#collapse'+index" :aria-expanded="index==0?true:false" aria-controls="'collapse'+index">
            {{topItem.name}}
          </h4>
        </div>
        <div :id="'collapse'+index" class="panel-collapse collapse" role="tabpanel" :aria-labelledby="'heading'+index">
          <div class="panel-body">
            <ul class="nav nav-pills nav-stacked " role="tablist">
              <li v-for="item in topItem.mitem"  role="presentation">
                <router-link :to="{name:item.link}">
                  {{item.name}}                          
                </router-link>
              </li>
            </ul>          
<!--             <ul class="list-group">
              <li v-for="item in topItem.mitem" :href="item.link" class="list-group-item"></li>
            </ul> -->
          </div>
        </div>
    </div> 
  </div>
</template>

<script>

  import {mapState} from 'vuex';
  import {mapMutations} from 'vuex';
  var $=require("jquery");
  export default {
    data () {
      return {
        menueItem:[
          {
            name:"商品管理",
            mitem:[
              {
                name:"上传商品",
                link:"upGoods"
              },
              {
                name:"添加商品",
                link:"login"
              },
              {
                name:"商品管理",
                link:"upGoods"
              },
            ]
          },
          {
            name:"订单管理",
            mitem:[
              {
                name:"订单查询",
                link:"upGoods"
              }
            ]
          },
          {
            name:"店铺设置",
            mitem:[
              {
                name:"店铺广告图设置",
                link:"upGoods"
              }
            ]
          }
        ],
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css">

  #accordion{
      margin-bottom: 0;
  }

  .panel{
    margin-top: 0px !important;
    border:none;
  }
  .panel-heading,.panel-body{
    border-style: none !important;

  }
  .panel-heading{
    height: 40px;
    background-color: #363b3f !important;
    color: white !important;
    border-bottom: 1px solid #26292c !important;
    border-radius: 0 !important;
  }

  .panel-heading a{
    display: block;
    font-size: 14px;
    text-decoration: none;
  }

  .panel-body{
    padding: 0;
  }

  .panel-body ul{
    margin-bottom: 0;
    border-radius: 0;
    background: oldlace;
    
  }

  .panel-body li,.panel-body a{
    margin-top: 0 !important;
    color: white;
    font-size: 13px;
    border-radius: 0 !important;
    border: none;
    background-color: #26292c;   
    transition: all .3s ;
    border-left: 5px solid #26292c !important;

  }

  .panel-body a:hover,.panel-body a:focus{
    background-color: #26292c !important;
  }
  .collapse.in {
  }

  .panel-body ul li:hover{
    border-left: 5px solid #f54141 !important;
  }

  .collapse.in{
  }  
</style>
