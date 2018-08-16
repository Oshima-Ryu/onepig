<template>
    <el-row style="margin:5px">        
        <el-col>      
            <div style="float:left">
                <div id="searchNav">                  
                    <!-- <el-select 
                        v-model="selectedCity" 
                        placeholder="选择城市"
                        @change="cityChange">
                      <el-option v-for="city in cityList"
                       :key="city.cityid"
                       :label="city.cityname"
                       :value="city.cityid">
                       </el-option>
                    </el-select> -->
                    <el-cascader
                        expand-trigger="hover"
                        placeholder="选择城市"
                        :options="cityList"
                        v-model="selectedCity"
                        @change="cityChange"
                        >
                    </el-cascader>
                    <el-cascader
                        expand-trigger="hover"
                        placeholder="选择商圈"
                        :options="regionList"
                        v-model="selectedRegion"
                        >
                    </el-cascader>
                    
                    <template>
                        <el-radio v-model="searchType" label="new" style="margin-left:20px">新店开业折扣</el-radio>
                        <el-radio v-model="searchType" label="all">所有折扣</el-radio>
                        
                    </template>
                    <!-- <el-radio-group v-model="searchType" size="small">
                        <el-radio-button label="所有折扣"></el-radio-button>
                        <el-radio-button label="新店开业"></el-radio-button>
                        <el-radio-button label="十年好店"></el-radio-button>
                    </el-radio-group> -->
                    <el-button type="primary" style="margin-left:20px" @click="getShop">搜索</el-button>
                    
                </div>
            </div>
            <div id="shopList">
                <el-table 
                :data="shopList"
                style="width: 100%">
                 <el-table-column prop="region_name" label="商圈" align="center"></el-table-column>
                 <el-table-column prop="category_name" label="类型" align="center"></el-table-column>
                  <el-table-column prop="shop_name" label="店名" align="center"></el-table-column>                                    
                  <!-- <el-table-column prop="branch_name" label="街道" align="center"></el-table-column> -->
                  <el-table-column prop="deal_title" label="代金券" align="center"></el-table-column>
                  <el-table-column prop="discount" label="折扣力度" align="center" :formatter="discountFormatter"></el-table-column>
                  <el-table-column
                    label="操作"
                    align="center"
                    width="50">
                    <template slot-scope="scope">
                      <el-button type="text" @click="goDianPing(scope.row)">访问</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column prop="create_time" label="更新时间" align="center" :formatter="createTimeFormatter"></el-table-column>
                </el-table>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import moment from "moment";
export default {
  name: "Index",
  data() {
    return {
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
        // { key: 1, cityname: "北京", cityid: 2 },
        // { key: 2, cityname: "上海", cityid: 1 },
        // { key: 3, cityname: "杭州", cityid: 3 },
        // { key: 4, cityname: "武汉", cityid: 16 },
        // { key: 5, cityname: "成都", cityid: 8 }
      ],
      regionList: [],
      shopList: [],
      selectedCity: "",
      selectedRegion: "",
      searchType: "new",
      firstToDianPing: 0,
      searchNum:0,
    };
  },
  created: function () {
    console.log("学生党的自娱自乐，多有不足，有任何意见or建议，请发送邮件至taylor233@sina.com，第一时间予以回复。")
  },
  methods: {
    cityChange() {
      //   alert(this.selectedCity)
      self = this;
      if (this.selectedCity[0] == "") {
        return;
      }
      this.$http({
        method: "GET",
        url: "/api/getRegion",
        params: { cityid: self.selectedCity[0] }
      }).then(function(response) {
        // console.log(response);
        self.regionList = response.data;
      });
    },
    getShop() {
      self = this;
      if (this.selectedCity == "" || this.selectedRegion == "") {
        return;
      }
      if (this.searchNum < 2) {
        this.$notify({
          title: "请注意",
          message:
            "第一次点击【访问】会跳转到大众点评首页，再次点击【访问】，即可正常跳转。",
          type: "warning",
          duration: 0
        });
      }
      this.searchNum++
      if (this.searchType == "new") {
        this.$http({
          method: "GET",
          url: "/api/getNewShop",
          params: {
            cityid: self.selectedCity[0],
            regionid: self.selectedRegion[0]
          }
        }).then(function(response) {
          // console.log(response);
          self.shopList = response.data;
        });
      } else {
        this.$http({
          method: "GET",
          url: "/api/getShop",
          params: {
            cityid: self.selectedCity,
            regionid: self.selectedRegion[0]
          }
        }).then(function(response) {
          // console.log(response);
          self.shopList = response.data;
        });
      }
    },

    goDianPing(row, column) {
      // console.log(row['shop_id'])
      var dpurl = "http://www.dianping.com/shop/" + row["shop_id"];
      if (this.firstToDianPing == 0) {
        window.open("http://www.dianping.com");
        this.firstToDianPing++;
      } else {
        window.open(dpurl);
      }
    },
    discountFormatter(row, column) {
      //   var num = Number(row.discount).toFixed(2)
      return (Number(row.discount) * 10).toFixed(1) + "折";
    },

    createTimeFormatter(row, column) {
      //   return row.discount
      return moment(row.create_time).format("YYYY-MM-DD");
    }
  }
};
</script>

<style scoped>
#navList ul,
li {
  list-style: none;
  float: left;
  margin: 3px;
}
</style>



