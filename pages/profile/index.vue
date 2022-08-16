<template>
  <div class="profile-page">
    <UserProfile />
  </div>
</template>

<script>
import UserProfile from '@/components/UserProfile'
export default {
  components: {
    UserProfile
  },
  middleware: 'auth-guard',
  mounted () { }
}
</script>
