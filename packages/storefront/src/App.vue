<template>
  <main v-if="isStandalone">
    <router-view />
  </main>
  <div id="app" v-else>
    <Header />
    <Aside />
    <Main>
      <router-view class="router-view" :class="{ 'router-view--loading': isLoading }" />
    </Main>
    <Backdrop />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import Backdrop from '@/components/Backdrop.vue';
  import Header from '@/components/Header.vue';
  import Aside from '@/components/Aside.vue';
  import Main from '@/components/Main.vue';
  import { Watch } from "vue-property-decorator";

  @Component({
    components: {
      Backdrop,
      Header,
      Aside,
      Main,
    },
  })
  export default class App extends Vue {

    public get isStandalone(): boolean {
      return this.$route.meta?.standalone;
    }

    public get isLoading(): boolean {
      return this.$store.getters.isLoading;
    }

    @Watch('$route')
    private onRouteChange(): void {
      this.$store.commit('setIsMenuActive', false);
    }
  }
</script>

<style lang="scss">
  // TODO: we shouldn't define most of the following styles globally

  @use '@porsche-design-system/components-js/styles' as *;

  // TODO: we should not rely on * selector reset
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  main {
    display: block;
  }

  .router-link {
    display: inline-block;
    outline: none;
    text-decoration: none;
  }

  .spacing-mt-8 {
    margin-top: $pds-spacing-static-small;
  }

  .spacing-mr-8 {
    margin-right: $pds-spacing-static-small;
  }

  .spacing-mt-16 {
    margin-top: $pds-spacing-static-medium;
  }

  .spacing-mt-24 {
    margin-top: 1.5rem;
  }

  .spacing-mt-32 {
    margin-top: $pds-spacing-static-large;
  }

  .spacing-mr-32 {
    margin-right: $pds-spacing-static-large;
  }

  .spacing-mt-48 {
    margin-top: $pds-spacing-static-x-large;
  }

  .spacing-mt-56 {
    margin-top: 3.5rem;
  }

  .spacing-mt-80 {
    margin-top: $pds-spacing-static-xx-large;
  }

  // padding
  .spacing-pt-8 {
    padding-top: $pds-spacing-static-small;
  }

  .spacing-pr-8 {
    padding-right: $pds-spacing-static-small;
  }

  .spacing-pb-8 {
    padding-bottom: $pds-spacing-static-small;
  }

  .spacing-pl-8 {
    padding-left: $pds-spacing-static-small;
  }

  .divider-spacing-small {
    margin: 1.5rem 0;
  }

  @include pds-media-query-min('m') {
    .spacing-mt-0-min-m {
      margin-top: 0;
    }
  }

  // form top spacing
  .form-top-spacing {
    margin-top: $pds-spacing-static-x-large;

    @include pds-media-query-min('m') {
      margin-top: 4rem;
    }
  }

  // form bottom spacing
  .form-bottom-spacing {
    padding-bottom: 4rem;

    @include pds-media-query-min('m') {
      padding-bottom: $pds-spacing-static-xx-large;
    }
  }

  // form section and fieldset spacing
  .form-section-spacing {
    margin-top: 2.5rem;

    @include pds-media-query-min('m') {
      margin-top: $pds-spacing-static-x-large;
    }
  }

  // form row spacing
  .form-row-spacing {
    margin-top: $pds-spacing-static-medium;
    @include pds-media-query-min('xs') {
      &--xs {
        margin-top: $pds-spacing-static-medium;
      }
      &--zero-xs {
        margin-top: 0;
      }
    }

    @include pds-media-query-min('s') {
      &--s {
        margin-top: $pds-spacing-static-medium;
      }
      &--zero-s {
        margin-top: 0;
      }
    }

    @include pds-media-query-min('m') {
      &--m {
        margin-top: $pds-spacing-static-medium;
      }
      &--zero-m {
        margin-top: 0;
      }
    }

    @include pds-media-query-min('l') {
      &--l {
        margin-top: $pds-spacing-static-medium;
      }
      &--zero-l {
        margin-top: 0;
      }
    }

    @include pds-media-query-min('xl') {
      &--xl {
        margin-top: $pds-spacing-static-medium;
      }
      &--zero-xl {
        margin-top: 0;
      }
    }
  }

  // form grid
  .form-grid-item-container {
    margin-left: -$pds-spacing-static-small;
    margin-right: -$pds-spacing-static-small;
  }

  .form-grid-item {
    padding-left: $pds-spacing-static-small;
    padding-right: $pds-spacing-static-small;
  }

  .form-fieldset {
    display: block;
    border: 0;
    padding: 0;
    min-width: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-block-start: 0;
    padding-inline-start: 0;
    padding-inline-end: 0;
    padding-block-end: 0;

    legend {
      display: block;
      font-weight: $pds-font-weight-semi-bold;
    }
  }
</style>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;
  @use '@/styles/internal.variables.scss' as *;

  #app {
    @include pds-grid;
    grid-row-gap: $pds-spacing-fluid-x-large;
    grid-template-rows: repeat(3, auto);
  }

  // TODO: loading state does not work properly because `setIsLoading` setter of Vue store is never called
  // TODO: desired delayed fade-in causes e2e/a11y test to fail
  /* .router-view {
    opacity: 1;
    transition: opacity $transition-duration $transition-duration; // let main content smoothly (delayed) fade in after loading

    &--loading {
      transition: opacity $transition-duration; // let main content smoothly (immediately) fade out while loading
      opacity: 0;
    }
  }*/
</style>
