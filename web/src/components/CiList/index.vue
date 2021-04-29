<template>
			<div class="cinema_body">
				<ul>

					<li v-for="(item,index) in CinmaList" :key="index">
						<div>
							<span>{{item.rm}}</span>
							<span class="q"><span class="price">{{item.sellPrice}}</span> 元起</span>
						</div>
						<div class="address">
							<span>{{item.addr}}</span>
							<span>{{item.distancekm}}km</span>
						</div>
						<div class="card">
								<!-- v-if 报错 使用 v-show 即可 -->
                <div v-for="(num,key) in item.tag" :key='key' :class=" key | classCard "  v-show="num ===1"  >
									{{key | filtersTagCard}}
								</div>
       			</div>
					</li>


				</ul>
			</div>
</template>

<script>
export default {
	name: 'CiList',
	data() { 
		return {
				CinmaList:[],
		}
	},
	methods:{
			getCinma(){
					this.$http.get('/Cinma').then((res)=>{
							this.CinmaList = res.data.Cinmalist
					}).catch((err)=>{
							console.log(`数据获取失败`+ err);
					})
			},
	},
			// 过滤器
			filters:{
					// 过滤字
					filtersTagCard(key){
							var card = [
			   				{ key : 'allowRefund' , value : '改签' },
								{ key : 'buyout' , value : '有票' },
                { key : 'endorse' , value : '退' },
                { key : 'sell' , value : '折扣卡' },
                { key : 'snack' , value : '小吃'}
							];
							for(var i = 0;i<card.length;i++){
								if(card[i].key === key){
								 	return card[i].value;
									
								}
							}
							return ''
					},

					// 过滤颜色
					classCard(key){
							var card = [
									{ key : 'allowRefund' , value : 'bl' },
									{ key : 'endorse' , value : 'bl' },
									{ key : 'sell' , value : 'or' },
									{ key : 'snack' , value : 'or'}
							];
							for(var i=0;i<card.length;i++){
									if(card[i].key === key){
											return card[i].value;
									}
							}
							return '';
					}

			},

	created(){
		this.getCinma()
	}

 }
</script>

<style  scoped>
#content .cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex;}
.cinema_body .card  div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card  div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card  div.bl{ color: #589daf; border: 1px solid #589daf;}
</style>