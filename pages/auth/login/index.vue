<template>
  <div class="sign-in">
    <h1 class="page-title text-center">
      Sign in
    </h1>
    <LogInForm />
  </div>
</template>
<script>
import LogInForm from '@/components/auth/LogInForm'

export default {
  name: 'SignInPage',
  components: {
    LogInForm
  },
  data () {
    return {
      email: '',
      password: ''
    }
  }
}
</script>
