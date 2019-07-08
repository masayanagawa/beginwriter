<template>
<div class='window'>
  <div class='wrapper'>
    <div class='sub_wrapper'>
        <h1>Confirm</h1>
        <div class="loginForm">
            <div class="form">
                <label>email</label>
                <p>{{ email }}</p>
                <label>code</label>
                <input v-model="code" type='text' name='code'>
                <input type='submit' value='Sign Up' v-bind:disabled="isDisabled" v-on:click="codeAuth">
            </div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
import { Auth } from 'aws-amplify'

export default {
    data () {
        return {
            email: this.$store.state.authEmail,
            code: null,
            errors: ''
        }
    },
    computed: {
        isDisabled: function () {
          if(this.email && this.code) {
            this.disabled = false
            return this.disabled
          } else {
            this.disabled = true
            return this.disabled
          }
        }
    },
    methods: {
        codeAuth: function () {
            console.log(this.$store.state.authUser)
            Auth.confirmSignUp(this.email, this.code)
            .then(data => {
                localStorage.setItem('user', this.$store.state.authUser)
                location.href = '/'
            })
            .catch(err => {
                console.log(err)
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

.form p {
    margin-bottom: 20px;
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
