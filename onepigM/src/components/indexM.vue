<template>
<div>
    <mt-header fixed title="OnePig 就是想吃！"></mt-header>
    <mt-button @click.native="cityPopupVisible = true" size="normal" style="width:30%">{{selectedCityName}}</mt-button>
    <mt-button @click="showRegionPop" size="normal" style="width:50%">{{selectedRegionName}}</mt-button>
    <mt-popup v-model="cityPopupVisible" position="right" class="city-popup" :modal="false">
      <mt-button 
      v-for="item in cityList" 
      @click = cityChange(item)
      size="normal" 
      type="primary"
      :key = item.value>{{ item.label }}</mt-button>
    </mt-popup>
    <mt-popup v-model="regionPopupVisible" position="right" class="region-popup" :modal="false">
      <mt-button 
      v-for="item in regionList" 
      @click = regionChange(item)
      size="small" 
      type="primary"
      :key = item.value>{{ item.label }}</mt-button>
    </mt-popup>
    <mt-popup v-model="tipPopupVisible" position="top" class="tip-popup" :modal="false">
      <p>请先点击列表第一条，跳转到大众点评首页。</p>
      <p>之后，即可正常跳转。</p>
    </mt-popup>
    <div class="page-radio">
      <mt-radio
        class="page-part"
        v-model="searchType"
        :options="discountOption" /> 
    </div>
    <div class="page-button">
    <mt-button @click="getShop" type="primary" size="large">搜索</mt-button>
    </div>
    <div class="page-cell">
        <mt-cell v-show="firstCellVisible"
        title="为确保正常跳转，请先点击这里"   
        is-link
        to="https://www.dianping.com/">
        </mt-cell>
        <mt-cell 
        class="shop-cell"
        v-for="item in shopList"
        :key = item.key
        :title="item.shop_name + ' ' + (Number(item.discount) * 10).toFixed(1) + '折'"
        :label="item.category_name + ' ' + item.deal_title + ' ' + item.region_name"      
        is-link
        :to="'https://www.dianping.com/shop/'+item.shop_id">
        </mt-cell>
    </div>

</div>
</template>
<style>
.city-popup {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}
.city-popup .mint-button {
  float: left;
  width: 27%;
  margin: 10px;
}

.region-popup {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}
.region-popup .mint-button {
  float: left;
  width: 43%;
  margin: 5px;
}
.tip-popup {
  width: 100%;
  height: 150px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  backface-visibility: hidden;
}
.tip-popup p {
  line-height: 50px;
  color: #fff;
}
</style>

<script>
export default {
  data() {
    return {
      cityPopupVisible: false,
      regionPopupVisible: false,
      tipPopupVisible: false,
      firstCellVisible: false,
      cityList: [
        { label: "北京", value: 2 },
        { label: "上海", value: 1 },
        { label: "广州", value: 4 },
        { label: "杭州", value: 3 },
        { label: "深圳", value: 7 },
        { label: "武汉", value: 16 },
        { label: "成都", value: 8 },
        { label: "重庆", value: 9 },
        { label: "南京", value: 5 },
        { label: "西安", value: 17 },
        { label: "厦门", value: 15 }
      ],
      regionList: [],
      shopList: [],
      selectedCityid: "",
      selectedCityName: "选择城市",
      selectedRegionid: "",
      selectedRegionName: "选择区域",
      searchType: "new",
      firstToDianPing: 0,
      searchNum: 0,
      discountOption: [
        { label: "新店开业折扣", value: "new", defualt: true },
        { label: "所有折扣", value: "all" }
      ]
    };
  },
  created: function () {
    console.log("学生党的自娱自乐，多有不足，有任何意见or建议，请发送邮件至taylor233@sina.com，第一时间予以回复。")
  },
  watch: {
    tipPopupVisible(val) {
      if (val) {
        setTimeout(() => {
          this.tipPopupVisible = false;
        }, 5000);
      }
    }
  },
  methods: {
    cityChange(item) {
      self = this;
      this.selectedCityid = item.value;
      this.selectedCityName = item.label;
      this.cityPopupVisible = false;
      this.selectedRegionName = "选择区域";
      this.selectedRegionid = "";
      this.$http({
        method: "GET",
        url: "/api/getRegion",
        params: { cityid: this.selectedCityid }
      }).then(function(response) {
        self.regionList = response.data;
      });
    },
    showRegionPop() {
      if (this.regionList.length == 0) {
        return;
      } else {
        this.regionPopupVisible = true;
      }
    },
    regionChange(item) {
      if (this.regionList.length == 0) {
        return;
      }
      this.selectedRegionid = item.value;
      this.selectedRegionName = item.label;
      this.regionPopupVisible = false;
    },
    getShop() {
      self = this;
      if (this.selectedCityid == "" || this.selectedRegionid == "") {
        return;
      }
      if (this.searchType == "new") {
        this.$http({
          method: "GET",
          url: "/api/getNewShop",
          params: {
            cityid: self.selectedCityid,
            regionid: self.selectedRegionid
          }
        }).then(function(response) {
          if (response.data.length == 0) {
            self.shopList = [{ shop_name: "暂无数据", deal_title: "no data" }];
          } else {
            if (self.searchNum < 1) {
              self.tipPopupVisible = true;
            }
            self.searchNum++;
            self.firstCellVisible = true;
            self.shopList = response.data;
          }
        });
      } else {
        this.$http({
          method: "GET",
          url: "/api/getShop",
          params: {
            cityid: self.selectedCityid,
            regionid: self.selectedRegionid
          }
        }).then(function(response) {
          self.shopList = response.data;
        });
      }
    }
  }
};
</script>


