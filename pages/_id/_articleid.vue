<template>
<div class='window'>
  <div v-if="loading" class='loading'>
        <div class="circle">
            <div class="circle-inner"></div>
        </div>
  </div>
  <div class='wrapper' v-else>
    <div class='sub_wrapper'>
        <div v-for="(item ,index) in articleItem" :key="index" class="details">
            <div class="detail">
                <div class='title'>
                    <h1>{{ item.title }}</h1>
                    <h4>by @{{ item.username }}</h4>
                </div>
                <!-- <p v-html="$md.render(item.article)" class='text'>{{ item.article }}</p> -->
                <div v-html="$md.render(item.article)" class='text'></div>
            </div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

let baseURL = process.env.API_URL
export default {
    data() {
        return {
            userid: this.$route.params.id,
            loading: true,
            text: null,
            articleItem: []
        }
    },
    mounted() {
        console.log(this.$route.params.articleid)
        console.log(this.$route.params.id)

        this.$nextTick(() => {
            this.$nuxt.$loading.start()
            if(!localStorage.getItem('article')) {
                this.getArticleDetail(this.$route.params.articleid, this.$route.params.id);
            } else {
                let article = JSON.parse(localStorage.getItem('article'))
                console.log(article[0].id)
                if(article[0].id == this.$route.params.articleid){
                    this.articleItem = article
                    this.loading = false
                } else {
                    this.getArticleDetail(this.$route.params.articleid, this.$route.params.id);
                }
                
            }

            
            setTimeout(() => this.$nuxt.$loading.finish(), 300)
        })
        
    },
    methods: {
        getArticleDetail(id, userid) {
            let user;
            var url = `${baseURL}/test/getarticledetail`;
            var headers = {
                headers: {
                    'x-api-key': `${process.env.API_KEY}`,
                }    
            }

            axios.post(url, {
                    id: id,
                    user_id: userid
                },
                headers
            ).then(res => {
                console.log(res.data.body)
                let article = res.data.body
                for(var i of article) {
                    this.articleItem.push(i)
                }
                console.log(this.articleItem)
                this.$store.dispatch('articleSet', this.articleItem)
                localStorage.setItem('article', JSON.stringify(this.$store.state.article))
                this.loading = false
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

<style>
body {
    background-color: #ebedf0;
}

.window {
    width: 100vw;
    height: 100vh;
}

.loading {
    padding-top: 50px;
    width: 100vw;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
}

.wrapper {
    padding-top: 50px;
    width: 100vw;
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
}

.sub_wrapper {
    margin: 0;
    width: 100vw;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
}

.details {
    width: 55%;
    margin: 50px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    animation-name: fadein;
    animation-duration: 1s;
    animation-iteration-count: 1;
}

.detail {
    background-color: #fff;
    border: solid 1px #ddd;
    margin: 0 50px;
    padding: 50px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    border-radius: 8px;
}


.title {
    margin-bottom: 20px;
}

.detail h1 {
    font-size: 50px;
    margin-bottom: 20px;
}

.detail h4 {
    font-size: 18px;
    font-weight: lighter;
}

.text {
    padding-top: 30px;
    color: #000;
    white-space: pre-line;
}

.circle {
    position: relative;
    width: 40px;
    height: 40px;
    background: #777;
    border-radius: 50%;
    text-align: center;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}

.circle::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: -20px;
    width: 40px;
    height: 40px;
    background: #ebedf0;
    transform-origin: right 20px;
    z-index: 2;
    animation: rotate-circle-left 1s linear infinite both running;
}

.circle::after {
    content: "";
    display: block;
    position: absolute;
    top: 0px;
    left: 20px;
    width: 40px;
    height: 40px;
    background: #ebedf0;
    transform-origin: left 20px;
    z-index: 3;
    animation: rotate-circle-right 1s linear infinite both running;
}

.circle .circle-inner {
    position: absolute;
    /* top: 10px;
    left: 10px; */
    width: 30px;
    height: 30px;
    /* padding-top: 38px; */
    background: #ebedf0;
    border-radius: 50%;
    z-index: 4;
}

@keyframes rotate-circle-right {
    0%   {
        transform: rotate(0deg);
        background: #ebedf0;
    }
    50%  {
        transform: rotate(180deg);
        background: #ebedf0;
    }
    50.01% {
        transform: rotate(360deg);
        background: #777;
    }
    100% {
        transform: rotate(360deg);
        background: #777;
    }
}

@keyframes fadein {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes rotate-circle-left {
    0%   { transform: rotate(0deg); }
    50%  { transform: rotate(0deg); }
    100% { transform: rotate(180deg); }
}
</style>
