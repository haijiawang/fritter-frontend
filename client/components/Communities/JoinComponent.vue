<template>
  <article class="freet">
    <h2 v-if="$store.state.username">Join the following communities:</h2>

    <div class="collections-grid">
      <MiniCommunityComponent
        v-for="community in communitiesArray"
        :key="community._id"
        :community="community"
        @followed="getRecommendedUsers"
      />
    </div>
  </article>
</template>

<script>
import MiniCommunityComponent from "@/components/Communities/MiniCommunityComponent.vue";

export default {
  name: "JoinComponent",
  components: { MiniCommunityComponent },
  props: {},
  async mounted() {
    this.getRecommendedUsers();
  },
  data() {
    return {
      usersArray: [],
      communitiesArray: [],
    };
  },
  methods: {
    async getRecommendedUsers() {
      const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const url = `/api/communities/all`;

      try {
        const r = await fetch(url, options);
        const res = await r.json();

        const notIn = res.communities.filter(
          (c) => !c.users.includes(this.$store.state.userId)
        );

        this.communitiesArray = notIn;

        if (!r.ok) {
          throw new Error(res.error);
        }
      } catch (e) {}
    },
  },
};
</script>

<style scoped>
</style>
