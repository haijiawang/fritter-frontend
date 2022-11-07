<!-- Reusable component representing a collections' details -->

<template>
  <div class="grid">
    <main>
      <section v-if="$store.state.username">
        <header>
          <h2>🏠 Your Community Forum</h2>
        </header>
        <CreateForumForm />
      </section>
      <section>
        <button @click="leaveCommunity">❌ Leave Community</button>
      </section>
      <section>
        <header>
          <div class="left">
            <h2>📝 Viewing all community forum posts</h2>
          </div>
        </header>
        <section v-if="$store.state.freets.length">
          <FreetComponent
            v-for="freet in forumsArray"
            :key="freet.id"
            :freet="freet"
          />
        </section>
        <article v-else>
          <h3>No freets found.</h3>
        </article>
      </section>
    </main>
  </div>
</template>

<script>
import FreetComponent from "@/components/Freet/FreetComponent.vue";
import CreateForumForm from "@/components/Communities/CreateForumForm.vue";

export default {
  name: "CollectionList",
  components: { FreetComponent, CreateForumForm },
  mounted() {
    this.getForumPosts();
  },
  data() {
    return {
      forumsArray: [],
    };
  },
  methods: {
    async getForumPosts() {
      const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const communityId = this.$router.app._route.params.communityId;
      const url = `/api/feed/community/${communityId}`;
      try {
        const r = await fetch(url, options);
        const res = await r.json();
        this.forumsArray = res.feed;
        if (!r.ok) {
          throw new Error(res.error);
        }
      } catch (e) {}
    },
    async leaveCommunity() {
      const options = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };

      const communityId = this.$router.app._route.params.communityId;
      const userId = this.$store.state.userId;
      const url = `/api/communities/${communityId}/member/${userId}`;
      try {
        const r = await fetch(url, options);
        const res = await r.json();

        if (!r.ok) {
          throw new Error(res.error);
        }
        this.$set(this.alerts, "Successfully left community!", "success");
        setTimeout(
          () => this.$delete(this.alerts, "Successfully left community!"),
          3000
        );
      } catch (e) {}
    },
  },
};
</script>