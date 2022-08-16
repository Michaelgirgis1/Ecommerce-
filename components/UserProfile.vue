<template>
  <div class="user-profile">
    <!-- <h1>user profile</h1> -->
    <div class="user-profile__content">
      <h1>Hiiiii {{$auth.$state.user.firstname}} {{$auth.$state.user.lastname}}</h1>
      <!-- <p></p> -->
      <p>{{$auth.user.email}}</p>
      <!-- <p>{{$auth.$state.user}}</p> -->
      <p>{{$auth.user.custom_attributes[0].value}}</p>
      <nuxt-link to="/modify-profile">
        <v-btn
          depressed
          color="primary"
        >
          Edit Profile
        </v-btn>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfile'
}
</script>
