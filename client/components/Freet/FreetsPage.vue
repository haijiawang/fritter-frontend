<!-- Default page that also displays freets -->

<template>
  <div class="grid">
    <main>
      <section v-if="$store.state.username">
        <header>
          <h2>Welcome @{{ this.$store.state.username }}</h2>
        </header>
        <CreateFreetForm />
        <CreateCollectionForm />
      </section>
      <section v-else>
        <header>
          <h2>Welcome to Fritter!</h2>
        </header>
        <article>
          <h3>
            <router-link to="/login"> Sign in </router-link>
            to create, edit, and delete freets.
          </h3>
        </article>
      </section>
      <section>
        <header>
          <div class="left">
            <h2>
              Viewing all freets
              <span v-if="$store.state.filter">
                by @{{ $store.state.filter }}
              </span>
            </h2>
          </div>
          <div class="right">
            <GetFreetsForm
              ref="getFreetsForm"
              value="author"
              placeholder="🔍 Filter by author (optional)"
              button="🔄 Get freets"
            />
          </div>
        </header>
        <section v-if="$store.state.freets.length">
          <FreetComponent
            v-for="freet in $store.state.freets"
            :key="freet.id"
            :freet="freet"
          />
        </section>
        <article v-else>
          <h3>No freets found.</h3>
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
import CreateFreetForm from "@/components/Freet/CreateFreetForm.vue";
import CreateCollectionForm from "@/components/Freet/CreateCollectionForm.vue";
import GetFreetsForm from "@/components/Freet/GetFreetsForm.vue";
import FollowingComponent from "@/components/Following/FollowingComponent.vue";

export default {
  name: "FreetPage",
  components: {
    FreetComponent,
    GetFreetsForm,
    CreateFreetForm,
    CreateCollectionForm,
    FollowingComponent,
  },
  mounted() {
    this.$refs.getFreetsForm.submit();
    this.fetchCollections();
  },
  methods: {
    async fetchCollections() {
      const url = `/api/collections?userId=${this.$store.state.userId}`;
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        this.$store.commit("updateCollections", res);
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

h2 {
  font-weight: 500;
}
</style>
