<template>
<div class='window'>
  <div v-if="loading" class='loading'>
        <div class="circle">
            <div class="circle-inner"></div>
        </div>
  </div>
  <div class='wrapper' v-else>
    <div class='editor'>
        <input type="text" v-model="title" class='h1' placeholder="タイトルを入力">
        <textarea v-model="text" class='text' placeholder="テキストを入力"></textarea>
    </div>
    <div class='sub_wrapper'>
        <div class='submit_bar'>
            <input type="submit" value='Edit' v-bind:disabled="isDisabled" v-on:click="setArticle(id)">
        </div>
        <div class="details">
            <div class="detail">
                <div class='title'>
                    <h1>{{ title }}</h1>
                </div>
                <!-- <p v-html="$md.render(item.article)" class='text'>{{ item.article }}</p> -->
                <div v-html="$md.render(text)" class='textpreview'></div>
            </div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import { VueEditor } from "vue2-editor";
import { Auth } from 'aws-amplify'

let baseURL = process.env.API_URL
export default {
    middleware: 'amplify-auth',
    components: {
        VueEditor
    },
    data() {
        return {
            id: this.$route.params.articleid,
            userid: this.$route.params.id,
            loading: true,
            title: null,
            text: '',
            disabled: true,
            articleItem: [],
            count: null,
            date: null
        }
    },
    mounted() {
        console.log(this.$route.params.articleid)
        console.log(this.$route.params.id)
        
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
            this.getArticleDetail(this.$route.params.articleid, this.$route.params.id);
            // if(!localStorage.getItem('article')) {
            //     this.getArticleDetail(this.$route.params.articleid, this.$route.params.id);
            // } else {
            //     let article = JSON.parse(localStorage.getItem('article'))
            //     console.log(article[0].id)
            //     if(article[0].id == this.$route.params.articleid){
            //         this.articleItem = article
            //         this.loading = false
            //     } else {
            //         this.getArticleDetail(this.$route.params.articleid, this.$route.params.id);
            //     }
            // }

            
            setTimeout(() => this.$nuxt.$loading.finish(), 300)
        })
        
    },
    computed: {
        isDisabled: function () {
          if(this.title && this.text) {
            this.disabled = false
            return this.disabled
          } else {
            this.disabled = true
            return this.disabled
          }
        }
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
                    console.log(i.title)
                    console.log(i.text)
                    this.title = i.title
                    this.text = i.article
                }
                console.log(this.articleItem)
                this.$store.dispatch('articleSet', this.articleItem)
                localStorage.setItem('article', JSON.stringify(this.$store.state.article))
                this.loading = false
            }).catch(err => {
                console.log(err);
            })
        },
        setArticle(id) {
            let user;
            var url = `${baseURL}/test/articleupdate`;
            var counturl = `${baseURL}/test/testcount`;
            var headers = {
                headers: {
                    'x-api-key': `${process.env.API_KEY}`,
                }    
            }

            var nowdate = new Date();
            var year = nowdate.getFullYear();
            var month = nowdate.getMonth() + 1;
            var hour = nowdate.getHours();
            var minutes = nowdate.getMinutes();
            this.date = `${year}-${("0" + month).slice(-2)}-${("0"+nowdate.getDate()).slice(-2)} ${("0"+hour).slice(-2)}:${("0"+minutes).slice(-2)}`

            axios.post(url, {
                    id: Number(id),
                    article: this.text,
                    date_time: this.date,
                    title: this.title,
                    username: this.userid
                },
                headers
            ).then(res => {
                console.log(res.data)
                location.href = `/${this.userid}/${id}`
            }).catch(err => {
                console.log(err);
            })

            // axios.post(counturl, {
            //         user_id: this.userid
            //     },
            //     headers
            // ).then(res => {
            //     this.count = res.data + 1
                
                
            // }).catch(err => {
            //     console.log(err);
            // })
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
    align-items: flex-end;
}

.sub_wrapper {
    margin: 0;
    height: 100%;
    width: 55%;
    margin-left: auto; 
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
}

.editor {
    position: fixed;
    margin: 50px 0 0 0;
    padding-top: 10px;
    height: 100%;
    width: 45%;
    background-color: #fff;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    border-right: solid 1px #aaa;
}

.editor textarea {
    width: 95%;
    height: 100%;
    resize: none;
    border: none;
    border-top: solid 1px #ccc;
    outline: 0;
    margin: 0;
    font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
}


input:focus::-webkit-input-placeholder { color:transparent; }
input:focus:-moz-placeholder { color:transparent; }
input:focus::-moz-placeholder { color:transparent; }

textarea:focus::-webkit-input-placeholder { color:transparent; }
textarea:focus:-moz-placeholder { color:transparent; }
textarea:focus::-moz-placeholder { color:transparent; }

.editor .h1 {
    width: 95%;
    outline: 0;
    font-size: 30px;
    border: none;
    margin: 10px 0;
}

.details {
    width: 100%;
    margin: 30px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
}

.detail {
    background-color: #fff;
    border: solid 1px #ddd;
    margin: 0 20px;
    padding: 50px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    border-radius: 8px;
    font-size: 18px;
    color: #000;
}

.detail p {
    margin: 0;
    padding: 0;
}

.detail h1 {
    margin: 0;
    padding: 0;
}

.detail h2 {
    margin: 0;
    padding: 0;
}

.detail h3 {
    margin: 0;
    padding: 0;
}

.detail h4 {
    margin: 0;
    padding: 0;
}

.detail h5 {
    margin: 0;
    padding: 0;
}

.detail h6 {
    margin: 0;
    padding: 0;
}


.detail ul li {
    margin: 0;
    padding: 0;
}


.text {
    color: #555;
    white-space: pre-line;
    font-size: 16px;
    padding: 10px 0;
}

.textpreview {
    color: #000;
    white-space: pre-line;
}


.title {
    margin-bottom: 20px;
}

.title h1 {
    font-size: 50px;
    margin-bottom: 20px;
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

.submit_bar {
    position: sticky;
    top: 50px;
    width: 100%;
    height: 60px;
    background: #ddd;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.submit_bar input[type="submit"] {
    width: 80px;
    height: 40px;
    background: #04d47e;
    border-style: none;
    font-size: 20px;
    font-weight: bold;
    outline: 0;
    border-radius: 5px;
    margin: 20px;
    color: #fff;
    border: solid 3px #00ff62;
    cursor: pointer;
    opacity: 1;
}

.submit_bar input[type="submit"][disabled] {
    opacity: 0.5;
    cursor:not-allowed;
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
