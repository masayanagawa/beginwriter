<template>
<div>
  <div class="window" v-if="loading">
      <div class='loading'>
          <div class="circle">
              <div class="circle-inner"></div>
          </div>
      </div>
  </div>
  <div class='window' v-else>
    <div class='wrapper'>
      <div class='sub_wrapper'>
          <h1>Begin</h1>
          <div class="loginForm">
              <div class="form">
                  <label>email</label>
                  <input v-model="email" type='text' name='id'>
                  <label>Password</label>
                  <input v-model="password" type='password' name='pass'>
                  <input type='submit' value='Login' v-bind:disabled="isDisabled" v-on:click="signin">
              </div>
          </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
import { Auth } from 'aws-amplify'

let baseURL = process.env.API_URL
export default {
    data() {
        return {
          email: null,
          password: null,
          disabled: true,
          userid: 'yappy',
          loading: true,
          articleItem: []
        }
    },
    computed: {
        isDisabled: function () {
          if(this.email && this.password) {
            this.disabled = false
            return this.disabled
          } else {
            this.disabled = true
            return this.disabled
          }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
            if (localStorage.getItem('user')) {
              this.$router.push(`/admin/${localStorage.getItem('user')}`)
            } else {
              this.loading = false
            }
            setTimeout(() => this.$nuxt.$loading.finish(), 300)
        })
    },
    methods: {
        signin: function () {
            Auth.signIn(this.email, this.password)
            .then(data => {
                //this.$store.dispatch('userSet', this.userid)
                //localStorage.setItem('user', this.$store.state.authUser)
                localStorage.setItem('user', this.userid)
                location.href = `/admin/${this.userid}`
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
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

.wrapper {
    padding-top: 50px;
    width: 100vw;
    min-height: 800px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
}

.sub_wrapper {
    margin: 0;
    width: 100vw;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
}

.loginForm {
    width: 40%;
    display: flex;
    flex-flow: column nowrap;
}

.form {
    background-color: #fff;
    margin: 50px;
    padding: 50px;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    border-radius: 8px;
}

.form label {
  color: #000;
  font-weight: bolder;
  margin: 5px 0;
}

input[type='text'] {
  margin-bottom: 20px;
  height: 30px;
  border: solid 1px #ccc;
  border-radius: 5px;
} 

input[type='password'] {
  margin-bottom: 20px;
  height: 30px;
  border: solid 1px #ccc;
  border-radius: 5px;
}

input[type='submit'] {
  border-style: none;
  height: 50px;
  background: #1fffa1;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  border-radius: 5px;
}

input[type='submit']:hover {
  border-style: none;
  cursor: pointer;
  background: #19e48f;
}

input[type="submit"][disabled]{
    background:#71fdc3;
    cursor:not-allowed;
}
</style>
