export const toolboxMixin = {
  computed: {
    selectedIds() {
      return this.$store.state.selected.map((e) => {
        return e.id;
      });
    },
    selected() {
      return this.$store.state.selected;
    },
  },
};
