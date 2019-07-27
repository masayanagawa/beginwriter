<template>
  <nav class="navbar is-white" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item"><a href="/">beginwriter</a></div>
      <div class="navbar-item"><nuxt-link v-bind:to="{name:'admin-id',params:{id: userid}}">{{userid}}</nuxt-link></div>
    </div><!-- navbar-brand END -->
  </nav>
</template>

<script>
export default {
    data() {
        let user = null;
        console.log(localStorage.getItem('user'))
        if(localStorage.getItem('user')){
            user = localStorage.getItem('user')
        } else {
            console.log('no login')
        }
        return {
            userid: user
        }
    }
}
</script>

<style>
.navbar {
    background-color: #04d47e;
    position: fixed;
    z-index: 5;
    width: 100vw;
    height: 50px;
}
.navbar-brand {
    padding: 10px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
}
.navbar-item {
    font-weight: bold;
    font-size: 22px;
    padding: 0 10px;
    color: #fcfcfc;
}

.navbar-item a {
    color: #fcfcfc;
    text-decoration: none;
}

.menu {
    position: relative;
    width: 100%;
    height: 50px;
    margin: 0 auto;
}

.menu > li {
    float: left;
    width: 25%; /* グローバルナビ4つの場合 */
    height: 50px;
    line-height: 50px;
    background: rgb(29, 33, 19);
}

.menu > li a {
    display: block;
    color: #fff;
}

.menu > li a:hover {
    color: #999;
}

ul.menu__second-level {
    visibility: hidden;
    opacity: 0;
    z-index: 1;
}

ul.menu__third-level {
    visibility: hidden;
    opacity: 0;
}

ul.menu__fourth-level {
    visibility: hidden;
    opacity: 0;
}

.menu > li:hover {
    background: #072A24;
    -webkit-transition: all .5s;
    transition: all .5s;
}

.menu__second-level li {
    border-top: 1px solid #111;
}

.menu__third-level li {
    border-top: 1px solid #111;
}

.menu__second-level li a:hover {
    background: #111;
}

.menu__third-level li a:hover {
    background: #2a1f1f;
}

.menu__fourth-level li a:hover {
    background: #1d0f0f;
}

/* 下矢印 */
.init-bottom:after {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    margin: 0 0 0 15px;
    border-right: 1px solid #fff;
    border-bottom: 1px solid #fff;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}

/* floatクリア */
.menu:before,
.menu:after {
    content: " ";
    display: table;
}

.menu:after {
    clear: both;
}

.menu {
    *zoom: 1;
}

.menu > li.menu__single {
    position: relative;
}

li.menu__single ul.menu__second-level {
    position: absolute;
    top: 40px;
    width: 100%;
    background: #072A24;
    -webkit-transition: all .2s ease;
    transition: all .2s ease;
}

li.menu__single:hover ul.menu__second-level {
    top: 50px;
    visibility: visible;
    opacity: 1;
}
</style>

