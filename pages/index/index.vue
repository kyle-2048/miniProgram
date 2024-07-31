<template>
	<view class="content">
		<view class="text-area" @click="showToast">
			<text class="title">{{title2}}</text>
		</view>
    <u-select v-model="show" :list="list"></u-select>
		<u-button @click="showToast()">打开</u-button>

    <u-calendar v-model="show2" :mode="mode"></u-calendar>
		<u-button @click="show2 = true">打开</u-button>
    <mescroll-body
      class="mescroll"
      :down="downOption"
      :up="upOption"
      @init="mescrollInit"
      @down="downCallback"
      :bottom="'0rpx'"
      :height="height"
      @up="upCallback">
      <view v-for="item in scrollList" :key="item.value" style="height: 50px;">
        {{item.text}}
      </view>
    </mescroll-body>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { ref, toRaw, reactive } from 'vue'
  import MescrollMixin from '../../uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins'
	export default {
    mixins: [MescrollMixin],
		name: 'IndexComponent', // 修改组件名为多个单词
		data() {
			return {
				title: 'Hello22',
        show: false,
        mode: 'date',
        show2: false,
         // 下拉刷新的配置
        downOption: {
          offset: 50
        },
         // 上拉加载的配置
        upOption: {
          auto: false,
          page: {
            size: 10
          },
          textNoMore: '无更多数据'
        },
        height: '100px',
			}
		},
		setup() {
      const list = [
        {
          value: '1',
          label: '江'
        },
        {
          value: '2',
          label: '湖'
        }
      ]

			const title2 = ref('111')
      const scrollList = [
        {text: '1'},
        {text: '2'},
        {text: '3'},
        {text: '4'},
        // {text: '5'},
        // {text: '6'},
        // {text: '7'},
        // {text: '8'},
        // {text: '9'},
        // {text: '10'},
        // {text: '11'},
        // {text: '12'},
        // {text: '13'},
        // {text: '14'},
        // {text: '15'},
        // {text: '16'},
        // {text: '17'},
      ]
      const pageMsg = reactive({
        page: 1,
        pageSize: 20
      })
      // 上拉加载的回调页码, 默认从1开始
      const upCallback = (page) => {
        console.log(page.num)
        pageMsg.page = page.num
      }
			return {
				title2,
        list,
        scrollList,
        upCallback,
        pageMsg
			}
		},
		computed: {
			...mapState(["user", 'systemInfo', 'isWXCorp', 'isIPhoneX'])
		},
		onLoad() {

		},
		onShow() {
			console.log('systemInfo', toRaw(this.systemInfo))
		},
		methods: {
			showToast() {
        this.show = true
        console.log(this.$isEmptyString(''))
			},
      // 下拉刷新的回调
      downCallback() {
        this.mescroll.resetUpScroll()
      }
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
  .mescroll {
    margin-top: 100px;
  }
</style>
