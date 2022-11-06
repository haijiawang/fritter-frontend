<!-- Reusable component representing a collection button -->

<template>
  <article class="CommunityButtonComponent">
    <button>
      <router-link :to="{ path: '/communities/' + community._id }">
        🏠 {{ community.name }}
      </router-link>
    </button>
  </article>
</template>

<script>
export default {
  name: "CommunityButtonComponent",
  props: {
    // Data from the stored collection
    community: {
      type: Object,
      required: true,
    },
  },
  mounted() {},
  data() {
    return {
      editing: false, // Whether or not this freet is in edit mode
      draft: this.freet.content, // Potentially-new content for this freet
      alerts: {}, // Displays success/error messages encountered during freet modification
    };
  },
  methods: {
    startEditing() {
      /**
       * Enables edit mode on this freet.
       */
      this.editing = true; // Keeps track of if a freet is being edited
      this.draft = this.freet.content; // The content of our current "draft" while being edited
    },
    stopEditing() {
      /**
       * Disables edit mode on this freet.
       */
      this.editing = false;
      this.draft = this.freet.content;
    },
    deleteFreet() {
      /**
       * Deletes this freet.
       */
      const params = {
        method: "DELETE",
        callback: () => {
          this.$store.commit("alert", {
            message: "Successfully deleted freet!",
            status: "success",
          });
        },
      };
      this.request(params);
    },
    submitEdit() {
      /**
       * Updates freet to have the submitted draft content.
       */
      if (this.freet.content === this.draft) {
        const error =
          "Error: Edited freet content should be different than current freet content.";
        this.$set(this.alerts, error, "error"); // Set an alert to be the error text, timeout of 3000 ms
        setTimeout(() => this.$delete(this.alerts, error), 3000);
        return;
      }

      const params = {
        method: "PATCH",
        message: "Successfully edited freet!",
        body: JSON.stringify({ content: this.draft }),
        callback: () => {
          this.$set(this.alerts, params.message, "success");
          setTimeout(() => this.$delete(this.alerts, params.message), 3000);
        },
      };
      this.request(params);
    },
    async saveToCollection(collectionId) {
      /**
       * Saves the freet to specified collection
       */
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      };

      const url = `/api/freets/save/${this.freet._id}/${collectionId}`;
      try {
        const r = await fetch(url, options);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
      } catch (e) {}
    },
    async fetchDetails(collectionId) {
      /**
       * Gets all freets in a collection
       */
      const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      const url = `/api/collections/${collectionId}`;
      try {
        const r = await fetch(url, options);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
      } catch (e) {}
    },
    async request(params) {
      /**
       * Submits a request to the freet's endpoint
       * @param params - Options for the request
       * @param params.body - Body for the request, if it exists
       * @param params.callback - Function to run if the the request succeeds
       */
      const options = {
        method: params.method,
        headers: { "Content-Type": "application/json" },
      };
      if (params.body) {
        options.body = params.body;
      }

      try {
        const r = await fetch(`/api/freets/${this.freet._id}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.editing = false;
        this.$store.commit("refreshFreets");

        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, "error");
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
  },
};
</script>

<style scoped>
.CommunityButtonComponent button {
  height: 200px;
  width: 200px;
  padding: 20px;
  text-align: center;
  margin: 10px;
}
</style>
