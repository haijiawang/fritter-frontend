<!-- Collections page that displays the saved freets organized by collection -->

<template>
  <main>
    <section>
      <header>
        <h2>
          Viewing all Saved Collections for @{{ $store.state.username }}
        </h2>
      </header>
      <section
        v-if="$store.state.collections.length"
      >
      <div class="collections-grid">
        <CollectionButtonComponent
          v-for="collection in $store.state.collections"
          :key="collection._id"
          :collection="collection"
        />
      </div>  
      </section>
      <article
        v-else
      >
        <h3>No collections found.</h3>
      </article>
    </section>
  </main>
</template>

<script>
import FreetComponent from '@/components/Freet/FreetComponent.vue';
import CollectionComponent from '@/components/Collections/CollectionComponent.vue';
import CollectionButtonComponent from '@/components/Collections/CollectionButtonComponent.vue';

export default {
  name: 'CollectionsPage',
  components: {FreetComponent, CollectionComponent, CollectionButtonComponent},
  mounted() {
    this.$refs.getFreetsForm.submit();
    this.fetchCollections();
  },
  methods: {
    async fetchCollections() {
      const url = `/api/collections?userId=${this.$store.state.userId}`
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        this.$store.commit('updateCollections', res);
      } catch(e) {}
    }
  }
};

</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

header, header > * {
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
