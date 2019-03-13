<template>
<div id="side-menu" class="sidebar" v-if="isAuthenticated">
  Это меню, которое будет сбоку
  <nav>
      <ul>
        <router-link to="/" tag="li">
          <a>
              <span>Home</span>
          </a>
        </router-link>
        <router-link to="/rates" tag="li">
          <a>
              <span>Rates</span>
          </a>
        </router-link>
        <router-link to="/cdrs" tag="li">
          <a>
              <span>Cdrs</span>
          </a>
        </router-link>
        <router-link to="/accounts" tag="li">
          <a>
              <span>Accounts</span>
          </a>
        </router-link>
        <li @click="logout">
          <a href="#">
            <span>Logout</span>
          </a>
        </li>
      </ul>
  </nav>
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'SideMenu',
    methods: {
      logout: function () {
        this.$store.dispatch('logout').then(() => this.$router.push('/login'));
      }
    },
    computed: {
      ...mapGetters(['isAuthenticated']),
    },
    data () {
      return ({})
    },
  }
</script>