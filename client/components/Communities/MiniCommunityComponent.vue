<template>
  <article class="user">
    <div class="follow-grid">
      <h3 class="name-text">{{ community.name }}</h3>
      <button @click="joinCommunity(community._id)">Join 🏠</button>
    </div>
  </article>
</template>

<script>
export default {
  name: "MiniCommunityComponent",
  props: {
    community: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    async followUser(userId) {
      const options = {
        method: "PUT",
        header: { "Content-Type": "application/json" },
      };

      const url = `/api/feed/follow/${userId}`;
      try {
        const r = await fetch(url, options);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
        this.$emit("followed");
      } catch (e) {}
    },
    async joinCommunity(communityId) {
      const options = {
        method: "PUT",
        header: { "Content-Type": "application/json" },
      };

      const url = `/api/communities/${communityId}/member/${this.$store.state.userId}`;
      try {
        const r = await fetch(url, options);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
        this.$emit("followed");
      } catch (e) {}
    },
  },
};
</script>

<style scoped>
.follow-grid {
  display: flex;
  justify-content: space-between;
}

.follow-grid button {
  margin-top: 20px;
  margin-right: 100px;
}

.name-text {
  font-size: 20px;
  font-weight: 400;
}
</style>

