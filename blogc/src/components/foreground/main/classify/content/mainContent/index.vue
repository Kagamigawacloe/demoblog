<template>
    <div class="search_article">
        <div class="titleBox">
            <p>{{classifyInfo.articleNumber}}篇更新</p>
            <h3># {{classifyInfo.classifyName}}</h3>
            <p>{{classifyInfo.classifyIntroduce}}</p>
        </div>
        <div class="contentBox" v-loading="loading" element-loading-text="玩命加载中...">
            <div class="titleWrapper">
                <h3 class="title"><b>全部</b></h3>
            </div>
            <div v-if="articleInfo.length < 1" class="emptyImg">暂无相关数据</div>
            <div class="articleBox" v-for="item in articleInfo">
                <a :href="'/articleDetails/'+item.articleId">
                    <h4 class="title highlight">{{item.articleTitle}}</h4>
                    <div class="article">
                        <img v-if="item.articleImgLitimg" class="focus" :src="item.articleImgLitimg"
                            :alt="item.articleTitle">
                        <!-- 内容样式根据有没有图片改变 -->
                        <div class="textBox" :class="[item.articleImgLitimg ? '':'textBox2']">
                            <p style="margin-bottom: 25px;" class="highlight">{{item.articleDase}}</p>
                            <p class="hidden-sm-and-up highlight">{{item.userName}} · {{item.publishTime}} ·
                                {{item.articleClassifyName}}</p>
                            <p class="articleMessage hidden-xs-only"><span>
                                    <el-icon>
                                        <User />
                                    </el-icon>
                                    <font class="highlight">{{item.userName}}</font>
                                </span>
                                <span>
                                    <el-icon>
                                        <FolderOpened />
                                    </el-icon>
                                    <font class="highlight">{{item.articleClassifyName}}</font>
                                </span>
                                <span>
                                    <el-icon>
                                        <Timer />
                                    </el-icon>{{item.publishTime}}
                                </span>
                                <span>
                                    <el-icon>
                                        <View />
                                    </el-icon>{{item.click}}
                                </span>

                            </p>
                        </div>
                    </div>
                </a>
            </div>
            <!--
			    total 总行数
			    page-size	每页显示条目个数
			    current-change 改变页码时触发
			    currentPage:当前页码
			 -->
            <el-pagination class="showPaging" background layout="prev, pager, next" :total="total" :page-size="pageSize"
                :disabled="disabled" @current-change="changePage" v-model:currentPage="currentPage"
                @size-change="handleSizeChange" :pager-count="3" :hide-on-single-page="true" />
            <el-pagination class="hidePaging" background layout="prev, pager, next, jumper" :total="total"
                :page-size="pageSize" :disabled="disabled" @current-change="changePage"
                v-model:currentPage="currentPage" @size-change="handleSizeChange" :pager-count="3"
                :hide-on-single-page="true" />
        </div>
    </div>
</template>

<script>
    import {
        ref,
        toRefs,
        reactive,
        onMounted,
        onUpdated,
        watch
    } from 'vue'
    import axios from "axios";
    import {
        useRoute,
        useRouter
    } from 'vue-router'
    /**
     * @desc 格式化日期字符串
     * @param { Nubmer} - 时间戳
     * @returns { String } 格式化后的日期字符串
     */
    function formatDate(timestamp) {
        // 补全为13位
        let arrTimestamp = (timestamp + '').split('');
        for (let start = 0; start < 13; start++) {
            if (!arrTimestamp[start]) {
                arrTimestamp[start] = '0';
            }
        }
        timestamp = arrTimestamp.join('') * 1;
        let minute = 1000 * 60;
        let hour = minute * 60;
        let day = hour * 24;
        let month = day * 30;
        let now = new Date().getTime();
        let diffValue = now - timestamp;
        // 如果本地时间反而小于变量时间
        if (diffValue < 0) {
            return '不久前';
        }
        // 计算差异时间的量级
        let monthC = diffValue / month;
        let weekC = diffValue / (7 * day);
        let dayC = diffValue / day;
        let hourC = diffValue / hour;
        let minC = diffValue / minute;
        // 数值补0方法
        let zero = function (value) {
            if (value < 10) {
                return '0' + value;
            }
            return value;
        };
        // 使用
        if (monthC > 4) {
            // 超过1年，直接显示年月日
            return (function () {
                let date = new Date(timestamp);
                return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
            })();
        } else if (monthC >= 1) {
            return parseInt(monthC) + '月前';
        } else if (weekC >= 1) {
            return parseInt(weekC) + '周前';
        } else if (dayC >= 1) {
            return parseInt(dayC) + '天前';
        } else if (hourC >= 1) {
            return parseInt(hourC) + '小时前';
        } else if (minC >= 1) {
            return parseInt(minC) + '分钟前';
        }
        return '刚刚';
    }

    /**
     * @desc 加载获取数据
     */
    function loadData(state, route) {
        state.loading = true;

        // 根据分类id查询分类信息
        axios.get("/classify/showClassifyInfoByClassifyId", {
            params:{
                'classifyId': route.params.id
            }
        }).then(res => {
            state.classifyInfo = res.data[0];
            console.log(res.data[0]);
        })

        // 根据分类id 查询分类的文章
        const params = {
            'currentPage': state.currentPage,
            'pageSize': state.pageSize,
            // route.params.id 跳转到当前路由携带着分类id
            'classifyId': route.params.id
        }
        axios.get("/article/byClassifyId", {
            params
        }).then(res => {
            // 先清空数据
            state.articleInfo = [];
            res.data.data.list.forEach(element => {
                // 时间戳格式化
                element.publishTime = formatDate(element.publishTime);
                // 图片 根url
                const url = process.env.VUE_APP_URL;
                // 缩略图 判断是点击上传的还是，网络图片
                if (element.articleImgLitimg != "" && !element.articleImgLitimg.includes('http') && !element.articleImgLitimg.includes('https')) {
                    element.articleImgLitimg = url + element.articleImgLitimg
                }

                // 添加
                state.articleInfo.push(element)
            });
            //JSON.parse 将从后台得到的数据转换为标准JSON格式
            //前台展示的是需要数组，JSON.parse转换后的数据，element-plus可以解析
            // state.tableData = res.data.data.list;
            state.total = res.data.data.total;
            state.pageSize = res.data.data.pageSize;
            state.currentPage = res.data.data.currentPage;
            state.articleCount = res.data.articleCount; // 查询出来的文章总数
            state.loading = false;
        })
    }
    export default {
        setup(props) {
            //挂载后加载数据
            onMounted(() => {
                const route = useRoute();
                loadData(state, route);
            });

            const route = useRoute();
            const router = useRouter();

            const state = reactive({
                // 展示文章信息
                articleInfo: [],
                // 分类信息
                classifyInfo:[],
                total: 0, //总条数
                pageSize: 8, //每页显示行数
                currentPage: 1, //当前页码
                keyword: route.query.keyword, // 搜索关键字
                articleCount:0,// 查询出来的文章总数
                loading:false,// 加载
            })

            // 切换页面的执行事件，  val 当前页码
            const changePage = (val) => {
                state.currentPage = val;
                loadData(state, route);
            };

            return {
                ...toRefs(state),
                changePage,
                route
            }
        }
    }
</script>

<style>
    .search_article .titleBox {
        width: 100%;
        background-color: white;
        padding: 20px;
        /* 添加此属性 padding间距不扩大div */
        box-sizing: border-box;
        border-radius: 10px;
        margin-bottom: 20px;
    }

    .search_article .titleBox h3 {
        font-size: 32px;
        color: #333;
        line-height: 36px;
        margin: 10px 0;
    }

    .search_article .titleBox p {
        font-size: 12px;
        color: #999;
    }

    .search_article .moreInfo {
        font-size: 12px;
        line-height: 18px;
        text-align: justify;
        color: #999;
    }

    .search_article .moreInfo b {
        margin: 0 10px;
    }

    .search_article .contentBox {
        width: 100%;
        padding: 20px;
        /* 添加此属性 padding间距不扩大div */
        box-sizing: border-box;
        background: white;
        border-radius: 10px;
    }

    .search_article .titleWrapper {
        /* margin-bottom: 15px; */
        margin-top: -10px;
        border-bottom: 1px solid #eee;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
    }

    .search_article .titleWrapper .title {
        line-height: 40px;
        color: #454545;
    }

    .search_article .titleWrapper .title b {
        display: inline-block;
        border-bottom: 4px solid #2FA7B9;
    }


    /* 文章样式 */
    .articleBox {
        padding: 20px 0;
        background-color: white;
        border-bottom: 1px solid #eee;
    }

    .articleBox .title {
        font-size: 18px;
        line-height: 45px;
        color: #454545;
        overflow: hidden;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        text-align: justify;
    }

    .articleBox .title:hover {
        color: #2FA7B9;
    }

    .article {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #999;
    }

    .article img {
        width: 140px;
        height: 90px;
        border-radius: 4px;
        object-fit: cover;
        overflow: hidden;
    }

    .articleMessage span {
        font-size: 13px;
        color: #999;
        line-height: 20px;
        margin-right: 15px;
        display: inline-flex;
        align-items: center;
    }

    .articleMessage .el-icon {
        font-size: 15px;
        margin-right: 8px;
    }

    .textBox {
        width: 750px;
        /* height: 100px; */
        line-height: 22px;
        font-size: 13px;
        color: #999;
        margin-left: 10px;
    }

    .textBox2 {
        width: auto;
        margin-left: 0px;
    }

    .textBox p {
        font-size: 15px;
        color: #999;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        text-align: justify;
        cursor: pointer;
        overflow: hidden;
    }

    @media screen and (max-width: 768px) {
        .textBox {
            width: 500px;
        }
    }

    .emptyImg {
        display: block;
        width: 307px;
        min-height: 170px;
        background: url(../../../../../../assets/dgy-empty.png) no-repeat;
        background-size: 307px 160px;
        margin: 120px auto 0;
        padding-top: 170px;
        text-align: center;
        font-size: 12px;
        line-height: 24px;
        color: #999;
    }

    /* 分页样式 */
    :deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
        background-color: #2fa7b9;
    }

    .el-pagination {
        margin-top: 20px;
        justify-content: center;
    }

    :deep(.el-table .cell) {
        -webkit-box-orient: vertical;
        display: -webkit-box;
        -webkit-line-clamp: 2;
    }

    @media screen and (max-width: 500px) {
        .hidePaging {
            display: none;
        }
    }

    @media screen and (min-width: 500px) {
        .showPaging {
            display: none;
        }
    }
</style>