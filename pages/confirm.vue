<template>
    <h1>confirm</h1>
</template>

<script>
export default {
    data () {
        return {
            email: this.$store.state.authEmail,
            code: '',
            errors: ''
        }
    },
}
</script>