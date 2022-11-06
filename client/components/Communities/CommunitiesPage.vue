<!-- Collections page that displays the saved freets organized by collection -->

<template>
  <div class="grid" v-if="$store.state.username">
    <main>
      <section v-if="$store.state.username">
        <header>
          <h2>@{{ $store.state.username }}'s communities</h2>
        </header>
        <CreateCommunityForm />
      </section>
      <section>
        <section v-if="$store.state.communities.length">
          <div class="collections-grid">
            <CommunityButtonComponent
              v-for="community in this.$store.state.communities"
              :key="community._id"
              :community="community"
            />
          </div>
        </section>
        <article v-else>
          <h3>No collections found.</h3>
        </article>
      </section>
    </main>
    <div>
      <FollowingComponent />
    </div>
  </div>
</template>

<script>
import FreetComponent from "@/components/Freet/FreetComponent.vue";
import CollectionComponent from "@/components/Collections/CollectionComponent.vue";
import CollectionButtonComponent from "@/components/Collections/CollectionButtonComponent.vue";
import FollowingComponent from "@/components/Following/FollowingComponent.vue";
import CreateCommunityForm from "@/components/Communities/CreateCommunityForm.vue";
import CommunityButtonComponent from "@/components/Communities/CommunityButtonComponent.vue";

export default {
  name: "CommunitiesPage",
  components: {
    FreetComponent,
    CollectionComponent,
    CollectionButtonComponent,
    FollowingComponent,
    CreateCommunityForm,
    CommunityButtonComponent,
  },
  mounted() {
    this.fetchCommunities();
  },
  methods: {
    async fetchCommunities() {
      const url = `/api/communities?userId=${this.$store.state.userId}`;
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
        this.$store.commit("updateCommunities", res.communities);
        console.log(this.$store.state.communities);
      } catch (e) {}
    },
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 8fr 2fr;
  column-gap: 2px;
  row-gap: 1em;
}

section {
  display: flex;
  flex-direction: column;
}

header,
header > * {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  margin-right: 10px;
}

section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
}

.collections-grid {
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 10px;
}
</style>
