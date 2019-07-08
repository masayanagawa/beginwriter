<template>
<div>
    <div v-if="loading" class="window">
        <div class='loading'>
            <div class="circle">
                <div class="circle-inner"></div>
            </div>
        </div>
    </div>
    <div v-else-if="errMsg" class="window">
        <div class="err">
            <h1>404 Not Found.</h1>
            <p>ユーザーは見つかりませんでした。</p>
        </div>
    </div>
    <div class='window' v-else>
        <div class='wrapper'>
            <div class='side'>
                <div v-if="username" class='profile'>
                <h1>{{ username }}</h1>
                <h3>{{ userId }}</h3>
                <p>{{ profile }}</p>
                </div>
                <div v-else>
                    <div class="circle-side">
                        <div class="circle-inner-side"></div>
                    </div>
                </div>
            </div>
            <div class='sub_wrapper'>
                <div class='article_title'>
                    <h1>All Notes</h1>
                </div>
                <ul>
                    <div v-if="username" class='article_list'>
                        <li v-for="(item, index) in articleItem" :key="index" class='article'>
                            <nuxt-link v-bind:to="{name:'id-articleid',params:{id: item.username, articleid: item.id}}">
                                <h2>{{ item.title }}</h2>
                                <p>{{ item.date_time }}</p>
                            </nuxt-link>
                            <!-- <div class='title'></div> -->
                        </li>
                    </div>
                    <div class='loading' v-else>
                        <div class="circle">
                            <div class="circle-inner"></div>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
        <!-- <div class='footer'>
            <div class='copyright'>
                <p>&copy; 2019 Begin.inc</p>
            </div>
        </div> -->
    </div>
</div>
</template>

<script>
import axios from 'axios'

let baseURL = process.env.API_URL
export default {
    data() {
        return {
            userId: null,
            username: null,
            profile: null,
            articleItem: [],
            errMsg: false,
            loading: true
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
            if(!localStorage.getItem('profile')) {
                this.getUser();
                this.getArticle(this.$route.params.id)
            } else {
                let profile = JSON.parse(localStorage.getItem('profile'))
                if(profile.user_id == this.$route.params.id){
                    this.userId = `@${profile.user_id}`
                    this.username = profile.user_name
                    this.profile = profile.user_profile
                    if(!localStorage.getItem('articlelist')) {
                        this.getArticle(this.$route.params.id)
                    } else {
                        let articleList = JSON.parse(localStorage.getItem('articlelist'))
                        this.articleItem = articleList
                        this.loading = false
                    }
                } else {
                    this.getUser();
                    this.getArticle(this.$route.params.id)
                }
            }
            
            setTimeout(() => this.$nuxt.$loading.finish(), 300)
        })
    },
    methods: {
        getUser() {
            let user;
            var url = `${baseURL}/test/testuser`;
            var headers = {
                headers: {
                    'x-api-key': `${process.env.API_KEY}`,
                }    
            }

            axios.post(url, {
                    user_id: this.$route.params.id
                },
                headers
            ).then(res => {
                console.log(res.data.body)
                this.userId = `@${res.data.body.user_id}`
                this.username = res.data.body.user_name
                this.profile = res.data.body.user_profile

                this.$store.dispatch('profileSet', res.data.body)
                localStorage.setItem('profile', JSON.stringify(this.$store.state.userprofile))
            }).catch(err => {
                console.log("ユーザが見つかりません。");
                this.loading = false
                this.errMsg = true
            })
        },
        getArticle(userid) {
            let user;
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
                let article = res.data.body
                for(var i of article) {
                    this.articleItem.push(i)
                }
                console.log(this.articleItem)
                this.$store.dispatch('articleListSet', this.articleItem)
                localStorage.setItem('articlelist', JSON.stringify(this.$store.state.articlelist))
                this.loading = false
            }).catch(err => {
                this.loading = false
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

.err {
    padding-top: 50px;
    width: 100vw;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
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

.err h1 {
    font-size: 90px;
    font-weight: lighter;
}

.err p {
    font-weight: lighter;
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
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
}

.side {
    margin: 0;
    padding: 30px;
    height: 100%;
    width: 20%;
    background-color: #006aff;
    color: #fff;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
}

.profile {
    margin: 20px 0;
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
    padding: 0;
    margin: 50px 0;
}

.article_title h1 {
    color: #222;
    font-weight: lighter;
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 90%;
    color: #fff;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
}

.article_list {
    display: flex;
    width: 960px;
    flex-flow: row wrap;
    justify-content:  flex-start;
}

li {
    width: 300px;
    height: 150px;
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

.circle-side {
    position: relative;
    width: 40px;
    height: 40px;
    background: #fff;
    border-radius: 50%;
    text-align: center;
    overflow: hidden;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    z-index: 1;
}

.circle-side::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: -20px;
    width: 40px;
    height: 40px;
    background: #006aff;
    transform-origin: right 20px;
    z-index: 2;
    animation: rotate-circle-left 1s linear infinite both running;
}

.circle-side::after {
    content: "";
    display: block;
    position: absolute;
    top: 0px;
    left: 20px;
    width: 40px;
    height: 40px;
    background: #006aff;
    transform-origin: left 20px;
    z-index: 3;
    animation: rotate-circle-right-side 1s linear infinite both running;
}

.circle-side .circle-inner-side {
    position: absolute;
    /* top: 10px;
    left: 10px; */
    width: 30px;
    height: 30px;
    /* padding-top: 38px; */
    background: #006aff;
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

@keyframes rotate-circle-right-side {
    0%   {
        transform: rotate(0deg);
        background: #006aff;
    }
    50%  {
        transform: rotate(180deg);
        background: #006aff;
    }
    50.01% {
        transform: rotate(360deg);
        background: #fff;
    }
    100% {
        transform: rotate(360deg);
        background: #fff;
    }
}

@keyframes rotate-circle-left {
    0%   { transform: rotate(0deg); }
    50%  { transform: rotate(0deg); }
    100% { transform: rotate(180deg); }
}

</style>