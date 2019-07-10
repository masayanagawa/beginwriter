<template>
<div>
    <div class="window">
        <div class="preparing-wrapper">
            <h1>Preparing now.....</h1>
            <p>I'm preparing Sign Up System now.</p>
        </div>
    </div>
</div>

<!-- <div class='window'>
  <div class='wrapper'>
    <div class='sub_wrapper'>
        <h1>Start of Begin.</h1>
        <div class="loginForm">
            <div class="form">
                <label>userID</label>
                <input v-model="userid" type='text' name='userid'>
                <label>email</label>
                <input v-model="mail" type='text' name='email'>
                <label>Password</label>
                <input v-model="password" type='password' name='pass'>
                <input type='submit' value='Sign Up' v-bind:disabled="isDisabled" v-on:click="signup">
            </div>
        </div>
    </div>
  </div>
</div> -->
</template>

<script>
import { Auth } from 'aws-amplify'

export default {
    data() {
        return {
            userid: null, 
            mail: null,
            password: null
        }
    },
    computed: {
        isDisabled: function () {
          if(this.userid && this.mail && this.password) {
            this.disabled = false
            return this.disabled
          } else {
            this.disabled = true
            return this.disabled
          }
        }
    },
    methods: {
        signup: function () {
            Auth.signUp(this.mail, this.password, this.mail)
                .then(data => {
                this.$store.dispatch('authSet', this.mail)
                this.$store.dispatch('userSet', this.userid)
                this.$router.push('/confirm')
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style>
/* body {
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
} */

.window {
    width: 100vw;
    height: 100vh;
}

.preparing-wrapper {
    padding-top: 50px;
    width: 100vw;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
}

.preparing-wrapper h1 {
    padding: 30px 0;
    font-size: 90px;
    font-weight: bold;
    text-align: center;
}

.preparing-wrapper p {
    font-size: 26px;
    font-weight: bold;
    text-align: center;
}
</style>
