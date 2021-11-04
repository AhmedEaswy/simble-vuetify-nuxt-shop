import Vue from "vue";

export default () => {
  Vue.filter("slice", function(value, max) {
    if (value.length > max) {
      return value.slice(0, max);
    } else {
      return value;
    }
  })

  Vue.filter("currency", function(value) {
    return `$${value}`;
  });
}
