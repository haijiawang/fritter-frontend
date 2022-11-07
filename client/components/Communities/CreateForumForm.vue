<!-- Form for creating freets (block style) -->

<script>
import BlockForm from "@/components/common/BlockForm.vue";

export default {
  name: "CreateForumForm",
  mixins: [BlockForm],
  data() {
    return {
      url: `/api/freets?communityId=${this.$router.app._route.params.communityId}`,
      method: "POST",
      hasBody: true,
      fields: [{ id: "content", label: "Content", value: "" }],
      title: "Create a freet in the community forum:",
      refreshFreets: true,
      callback: () => {
        const message = "Successfully created a forum post!";
        this.$set(this.alerts, message, "success");
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      },
    };
  },
};
</script>
