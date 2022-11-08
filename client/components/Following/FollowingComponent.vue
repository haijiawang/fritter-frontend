<template>
  <article class="freet">
    <h2 v-if="$store.state.username">You should follow</h2>

    <div class="collections-grid">
      <MiniUserComponent
        v-for="user in usersArray"
        :key="user._id"
        :user="user"
        @followed="getRecommendedUsers"
      />
    </div>
  </article>
</template>

<script>
import MiniUserComponent from "@/components/Following/MiniUserComponent.vue";

export default {
  name: "FollowingComponent",
  components: { MiniUserComponent },
  props: {},
  async mounted() {
    this.getRecommendedUsers();
  },
  data() {
    return {
      usersArray: [],
    };
  },
  methods: {
    async getRecommendedUsers() {
      const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const url = `/api/users`;
      const followingUrl = `/api/users/following`;

      try {
        const r = await fetch(url, options);
        const res = await r.json();

        const f = await fetch(followingUrl, options);
        const fRes = await f.json();

        let notFollowing = res.users.filter(
          (u) => u.username !== this.$store.state.username
        );
        if (fRes.users) {
          notFollowing = res.users.filter(
            (u) =>
              !fRes.users.includes(u._id) &&
              u.username !== this.$store.state.username
          );
        }

        this.usersArray = notFollowing;

        if (!r.ok) {
          throw new Error(res.error);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
</style>
