# Frosted Glass

<TableOfContents></TableOfContents>

## Example

<Playground :frameworkMarkup="codeExample">
  <ExampleDesignTokensFrostedGlass />
</Playground>

## Usage

tbd.

## Styles

The Styles / Design Tokens are available as JavaScript and SCSS version. Look at the example above to see how the tokens
work.

#### JS

JavaScript Design Tokens can be imported by
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles';`.

- `frostedGlassStyle`

#### SCSS

SCSS Design Tokens can be imported by `@import '~@porsche-design-system/components-{js|angular|react|vue}/styles/scss';`
(make sure your bundler supports scss `~` tilde imports).

- `@mixin pds-frosted-glass()`

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getDesignTokensFrostedGlassCodeSamples } from '@porsche-design-system/shared';
import ExampleDesignTokensFrostedGlass from '@/pages/patterns/design-tokens/example-frosted-glass.vue';

@Component({
  components: {
    ExampleDesignTokensFrostedGlass
  },
})
export default class Code extends Vue {
  codeExample = getDesignTokensFrostedGlassCodeSamples();
}
</script>
