<template>
  <p-table>
    <p-table-head>
      <p-table-head-row v-html="headRow"></p-table-head-row>
    </p-table-head>
    <p-table-body v-html="body"></p-table-body>
  </p-table>
</template>

<script lang="ts">
import Vue from 'vue';  
import Component from 'vue-class-component';
import { getComponentMeta, TAG_NAMES } from '@porsche-design-system/shared';
import type { ComponentMeta } from '@porsche-design-system/shared';

@Component
export default class Code extends Vue {
  get headRow(): string {
    return ['', ...TAG_NAMES].map((tagName) => {
      const { isDeprecated } = getComponentMeta(tagName) || {};
      return `<p-table-head-cell>${tagName}${isDeprecated ? ' 🚫' : ''}</p-table-head-cell>`;
    }).join('');
  }

  get body(): string {
    const rowKeys: (keyof ComponentMeta)[] = [
      'isDelegatingFocus',
      'isThemeable',
      'props',
      'requiredProps',
      'eventNames',
      'namedSlots',
      'nestedComponents',
      'hasSlottedCss',
    ];

    const content = rowKeys.map(key => {
      const cells = TAG_NAMES.map(tagName => {
        const meta = getComponentMeta(tagName);
        let value = meta[key];

        if (value && (key === 'props' || key === 'eventNames')) {
          const { deprecatedProps = [], deprecatedEventNames = [] } = meta;

          if (key === 'props') {
            value = Object.keys(value);
            value = value.map(val => deprecatedProps.includes(val) ? `${val} 🚫` : val);
          } else if (key === 'eventNames') {
            value = value.map(val => deprecatedEventNames.includes(val) ? `${val} 🚫` : val);
          }
        }

        let cellContent = value 
          ? Array.isArray(value)
            ? value.sort().map(val => key === 'nestedComponents' ? val : `<code>${val}</code>`).join('<br>') 
            : value
          : '';
        cellContent = cellContent === true ? '✅' : cellContent;

        return `<p-table-cell>${cellContent}</p-table-cell>`;
      }).join('');

      return `<p-table-row>
  <p-table-cell>${key}</p-table-cell>
  ${cells}
</p-table-row>`;
    }).join('');
    
    return content;
  }
}
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/components-js/styles/scss';

  p-table {
    max-width: none !important;
  }

  :deep(p-table-cell) {
    vertical-align: top;
  }

  :deep(code) {
    @include pds-text-x-small;
    font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
    padding: 0.125rem $pds-spacing-static-small;
    background-color: mix($pds-theme-light-primary, $pds-theme-light-background-base, 10%);
    border-radius: 3px;
    color: $pds-theme-light-primary;
  }
</style>
