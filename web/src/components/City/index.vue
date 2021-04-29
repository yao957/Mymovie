<template>
  <div class="city_body">
    <div class="city_list">
      <div class="city_hot">
        <h2>热门城市</h2>
        <ul class="clearfix">
          <li v-for="(item,index) in datahotcity" :key="index">{{item.name}}</li>
        </ul>
      </div>
      <div class="city_sort"  ref="city_sort" >
        <div v-for="(item, index) in datalist" :key="index">
          <h2>{{ item.index}}</h2>
          <ul>
            <li v-for="(i, j) in item.list" :key="j">{{i.nm}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="city_index">
      <ul>
        <li v-for="(item, index) in datalist" :key="index" @touchstart="handleToIndex(index)">{{ item.index}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "City",
  data() {
    return {
      datalist: [],
			datahotcity:[]
    };
  },
  methods: {
    getdata() {
      this.$http
        .get("/getcity")
        .then((res) => {
					var cities = res.data.citylist
					console.log(cities);
					// 用来接收处理后的数组
					let cityLists = [];
					// 热门城市数组
					let hotList = [];
					// 循环数组把 ishot等于一的就加入到 hotlist数组中
					for(var i=0;i<cities.length;i++){
							if(cities[i].isHot === '1'){
									hotList.push( cities[i] );
							}
					}
					this.datahotcity = hotList
					// console.log(hotList);
					//对数组进行改造
						for(var i=0;i<cities.length;i++){
							// 若正常返回的时候应该是拼音如 北京市 Beijing 所以截取第一个 抓换成大写
							var firstLetter = cities[i].py.substring(0,1).toUpperCase();
							// console.log(`拼音`+firstLetter);
							// 当没有这个拼音的时候 就添加进去
							if(toCom(firstLetter)){
								// console.log(`没有这个拼音`);
								cityLists.push({ index : firstLetter , list : [ { nm : cities[i].name , id : cities[i].id } ] });
							}else{
							// console.log(`已经存在这个拼音`);
							// 当已经有了这个拼音的时候
								for(var j=0;j<cityLists.length;j++){
									// 找到是那个 然后把它添加到list这个数组字段里面
										if( cityLists[j].index === firstLetter ){
												cityLists[j].list.push( { nm : cities[i].name , id : cities[i].id } );
										}
								}
							}
						}
						// toCom 方法判断 当前cityLists数组是否已经存在循环的字母
          	function toCom(firstLetter){
							//  console.log(cityLists.length);
                for(var i=0;i<cityLists.length;i++){
                    if( cityLists[i].index ===  firstLetter){
                        return false;
                    }
                }
                return true;
            }
					// 排序
				   cityLists.sort((n1,n2)=>{
							if( n1.index > n2.index ){
									return 1;
							}
							else if(n1.index < n2.index){
									return -1;
							}
							else{
									return 0;
							}
					});
					this.datalist = cityLists
					// console.log(this.datalist);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 点击字母移动一定的高度
   handleToIndex(index){
        var h2 = this.$refs.city_sort.getElementsByTagName('h2');
        // console.log(h2[index].offsetTop);
        this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
      },
  },
  created() {
    this.getdata();
  },
};
</script>

<style  scoped>
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_hot ul li {
  float: left;
  background: #fff;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}
.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
</style>