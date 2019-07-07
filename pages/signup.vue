<template>
    <h1>Sign up</h1>
</template>

<script>
import { Auth } from 'aws-amplify'

export default {
    data() {
        return {

        }
    },
    methods: {
        signUp () {
        Auth.signUp(this.email, this.password)
            .then(data => {
            this.$store.dispatch('authSet', this.email)
            this.$router.push('/confirm')
            })
            .catch(err => this.errors = err)
        }
    }
}
</script>
