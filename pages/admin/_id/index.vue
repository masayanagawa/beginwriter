<template>
<div>
    <div v-if="loading" class="window">
        <div class='loading'>
            <div class="circle">
                <div class="circle-inner"></div>
            </div>
        </div>
    </div>
    <div class='window' v-else>
        <div class='overflow-wrapper'>
          <div class='article_title'>
              <h1>Overview</h1>
          </div>
          <ul>
              <div v-if="articleItem" class='article_list'>
                  <li v-for="(item, index) in articleItem" :key="index" class='article'>
                      <nuxt-link v-bind:to="{name:'id-articleid',params:{id: item.username, articleid: item.id}}">
                          <h2>{{ item.title }}</h2>
                          <p>{{ item.date_time }}</p>
                      </nuxt-link>
                      <!-- <div class='title'></div> -->
                  </li>
              </div>
          </ul>
        </div>
        <div class='footer'>
            <div class='copyright'>
                <p>&copy; 2019 Begin.inc</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'

let baseURL = process.env.API_URL
let user;
export default {
    data() {
        if (!localStorage.getItem('user')) {
          this.$router.push(`/admin/login`)
        }
        return {
            userId: null,
            articleItem: [],
            errMsg: false,
            loading: true
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
            this.getArticle(localStorage.getItem('user'))
            setTimeout(() => this.$nuxt.$loading.finish(), 300)
        })
    },
    methods: {
        getArticle(userid) {
            var url = `${baseURL}/test/getuserarticle`;
            var headers = {
                headers: {
                    'x-api-key': `${process.env.API_KEY}`,
                }    
            }

            axios.post(url, {
                    user_id: userid
                },
                headers
            ).then(res => {
                console.log(res.data.body)
                this.loading = false
                let article = res.data.body
                for(var i of article) {
                    this.articleItem.push(i)
                }
                console.log(this.articleItem)
            }).catch(err => {
                console.log(err);
            })
        },
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

.err {
    padding-top: 50px;
    width: 100vw;
    min-height: 800px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
}

.loading {
    padding-top: 50px;
    width: 100vw;
    min-height: 800px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
}

.err h1 {
    font-size: 90px;
    font-weight: lighter;
}

.err p {
    font-weight: lighter;
}

.overflow-wrapper {
    padding-top: 50px;
    width: 100vw;
    min-height: 800px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
}

.sub_wrapper {
    margin: 0;
    width: 100vw;
    display: flex;
    flex-flow: column nowrap;
}

.profile {
    /* animation-name: fadein;
    animation-duration: 1s;
    animation-iteration-count: 1; */
}
.profile h1 {
    font-size: 28px;
}
.profile h3 {
    margin-left: 5px;
    font-size: 16px;
    font-weight: lighter;
}

.profile p {
    margin: 20px 0;
    font-size: 14px;
    font-style: italic;
    color: #ccc;
}

.article_title {
    width: 1080px;
    max-width: 100%;
    padding: 0;
    margin: 30px 0;
}

.article_title h1 {
    color: #222;
    font-weight: lighter;
    margin: 0 10px;
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 960px;
    max-width: 100%;
    color: #fff;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
}

.article_list {
    display: flex;
    width: 1080px;
    max-width: 100%;
    flex-flow: row wrap;
    justify-content: flex-start;
}

li {
    width: 300px;
    height: 150px;
    max-width: 100%;
    padding: 0;
    margin: 30px 10px;
    background-color: #fff;
    color: #222;
    border: solid 1px #ccc;
    border-radius: 8px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    animation-name: fadein;
    animation-duration: 1s;
    animation-iteration-count: 1;
    text-decoration: none;
    transition: all 0.3s;
}

@media screen and (max-width:320px) {
  li {
    margin: 0;
  }
  .article_list {
    justify-content:  center;
  }
}
@media screen and (min-width:320px) and (max-width:1000px) {
  li {
    margin: 10px;
  }
  .article_list {
    justify-content:  center;
  }
}

.article a {
    color: #222;
    border-radius: 8px;
    width: 100%;
    height: inherit;
    padding: 0;
    height: inherit;
    text-decoration: none;
    /* text-align: center; */
    display: flex;
    flex-flow: column nowrap;
    /* justify-content: center;
    align-items: center; */
    z-index: 4;
}

.article a h2 { 
    padding: 30px;
    margin: 10px 0;
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    align-items: center;
}

li:hover {
    background: #dfdede;
}
.article a:hover {
    cursor: pointer;
}

.article p {
    font-size: 12px;
    color: #aaa;
    margin-top: auto;
    align-self: flex-end;
    padding: 15px 25px;
}

.content {
    margin:  0 20px;
    display: flex;
    flex-flow: column nowrap; 
}

.title {
    display: flex;
    flex-flow: column nowrap;
    margin: 0;
}

.title h2 {
    margin-top: auto;
}


.user {
    margin-top: auto;
    font-weight: lighter;
    text-decoration: none;
}

.text {
    padding: 15px 0;
    color: #999;
    text-decoration: none;
}

.footer {
    width: 100vw;
    height: auto;
    border-top: solid 1px #ccc;
    color: #072d63;
    font-weight: lighter;
}

.copyright {
    padding: 20px;
    display: flex;
    font-size: 12px;
    justify-content: center;
    align-items: center;
}

.loading {
    color: #000;
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

@keyframes rotate-circle-left {
    0%   { transform: rotate(0deg); }
    50%  { transform: rotate(0deg); }
    100% { transform: rotate(180deg); }
}

</style>