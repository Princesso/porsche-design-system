# Typography

<TableOfContents></TableOfContents>

## Example

<Playground :frameworkMarkup="codeExample">
  <ExampleDesignTokensTypography />
</Playground>

## Usage

tbd.

## Styles

The Styles / Design Tokens are available as JavaScript and SCSS version. Look at the example above to see how the tokens
work.

#### JS

JavaScript Design Tokens can be imported by
`import { … } from '@porsche-design-system/components-{js|angular|react|vue}/styles';`.

- `displayLargeStyle`
- `displayMediumStyle`
- `displaySmallStyle`
- `headingXXLargeStyle`
- `headingXLargeStyle`
- `headingLargeStyle`
- `headingMediumStyle`
- `headingSmallStyle`
- `textXLargeStyle`
- `textLargeStyle`
- `textMediumStyle`
- `textSmallStyle`
- `textXSmallStyle`

#### SCSS

SCSS Design Tokens can be imported by `@import '~@porsche-design-system/components-{js|angular|react|vue}/styles/scss';`
(make sure your bundler supports scss `~` tilde imports).

- `@mixin pds-display-large`
- `@mixin pds-display-medium`
- `@mixin pds-display-small`
- `@mixin pds-heading-xx-large`
- `@mixin pds-heading-x-large`
- `@mixin pds-heading-large`
- `@mixin pds-heading-medium`
- `@mixin pds-heading-small`
- `@mixin pds-text-x-large`
- `@mixin pds-text-large`
- `@mixin pds-text-medium`
- `@mixin pds-text-small`
- `@mixin pds-text-x-small`

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getDesignTokensTypographyCodeSamples } from '@porsche-design-system/shared';
import ExampleDesignTokensTypography from '@/pages/patterns/design-tokens/example-typography.vue';

@Component({
  components: {
    ExampleDesignTokensTypography
  },
})
export default class Code extends Vue {
  codeExample = getDesignTokensTypographyCodeSamples();
}
</script>
