/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-heading',
  template: `
    <div class="playground light" title="should show headings with different style variants">
      <p-heading [variant]="'large-title'">The quick brown fox jumps over the lazy dog</p-heading>
      <p-heading [variant]="'heading-1'">The quick brown fox jumps over the lazy dog</p-heading>
      <p-heading [variant]="'heading-2'">The quick brown fox jumps over the lazy dog</p-heading>
      <p-heading [variant]="'heading-3'">The quick brown fox jumps over the lazy dog</p-heading>
      <p-heading [variant]="'heading-4'">The quick brown fox jumps over the lazy dog</p-heading>
      <p-heading [variant]="'heading-5'">The quick brown fox jumps over the lazy dog</p-heading>
    </div>

    <div class="playground light" title="should show headings with different style variants if tags are set as slots">
      <p-heading [variant]="'large-title'"><h1>The quick brown fox jumps over the lazy dog</h1></p-heading>
      <p-heading [variant]="'heading-1'"><h1>The quick brown fox jumps over the lazy dog</h1></p-heading>
      <p-heading [variant]="'heading-2'"><h2>The quick brown fox jumps over the lazy dog</h2></p-heading>
      <p-heading [variant]="'heading-3'"><h3>The quick brown fox jumps over the lazy dog</h3></p-heading>
      <p-heading [variant]="'heading-4'"><h4>The quick brown fox jumps over the lazy dog</h4></p-heading>
      <p-heading [variant]="'heading-5'"><h5>The quick brown fox jumps over the lazy dog</h5></p-heading>
      <p-heading [variant]="'heading-5'"><h6>The quick brown fox jumps over the lazy dog</h6></p-heading>
    </div>

    <div class="playground light" title="should show heading with different color variants on light background">
      <p-heading [color]="'default'" style="color: deeppink">The quick brown fox jumps over the lazy dog</p-heading>
      <p-heading [color]="'inherit'" style="color: deeppink">The quick brown fox jumps over the lazy dog</p-heading>
    </div>

    <div class="playground dark" title="should show heading with different color variants on dark background">
      <p-heading [theme]="'dark'" [color]="'default'" style="color: deeppink">
        The quick brown fox jumps over the lazy dog
      </p-heading>
      <p-heading [theme]="'dark'" [color]="'inherit'" style="color: deeppink">
        The quick brown fox jumps over the lazy dog
      </p-heading>
    </div>

    <div class="playground light" title="should show headings with different alignments">
      <p-heading [align]="'left'">Left</p-heading>
      <p-heading [align]="'center'">Center</p-heading>
      <p-heading [align]="'right'">Right</p-heading>

      <p-heading [align]="'left'" [variant]="'inherit'">Left</p-heading>
      <p-heading [align]="'center'" [variant]="'inherit'">Center</p-heading>
      <p-heading [align]="'right'" [variant]="'inherit'">Right</p-heading>
    </div>

    <div class="playground light" title="should cut off too long text">
      <p-heading [ellipsis]="true">
        Heading ellipsis - Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </p-heading>

      <p-heading [ellipsis]="true" [variant]="'inherit'">
        Heading ellipsis - Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </p-heading>
    </div>

    <div class="playground" title="should apply custom styles for dedicated slotted content">
      <p-heading>
        <span>
          Some slotted and deeply nested <a [href]="'#'">linked</a>, <b>bold</b>, <strong>strong</strong>,
          <em>emphasized</em> and <i>italic</i> text
        </span>
      </p-heading>
    </div>

    <div class="playground" title="should show heading for variant customizable">
      <p-heading [variant]="{ base: 'large', l: 'x-large' }">Lorem ipsum dolor sit amet et.</p-heading>
    </div>

    <div class="playground" title="should not automatically break words/strings by default">
      <p-heading [variant]="{base: 'inherit', m: 'large'}" style="width: 15rem; background: deeppink">
        This is the first time I've seen the word Pneumonoultramicroscopicsilicovolcanoconiosis. It's a long one.
      </p-heading>
      <p-heading [variant]="{base: 'inherit', m: 'large'}" style="width: 15rem; background: deepskyblue">
        <h3>This is the first time I've seen the word Pneumonoultramicroscopicsilicovolcanoconiosis. It's a long one.</h3>
      </p-heading>
    </div>

    <div
      class="playground"
      title="should be possible to overwrite hyphenation/break words behavior"
      style="hyphens: auto; overflow-wrap: break-word"
    >
      <p-heading [variant]="{base: 'inherit', m: 'large'}" style="width: 15rem; background: deeppink">
        This is the first time I've seen the word Pneumonoultramicroscopicsilicovolcanoconiosis. It's a long one.
      </p-heading>
      <p-heading [variant]="{base: 'inherit', m: 'large'}" style="width: 15rem; background: deepskyblue">
        <h3>This is the first time I've seen the word Pneumonoultramicroscopicsilicovolcanoconiosis. It's a long one.</h3>
      </p-heading>
    </div>

    <div class="playground" title="should consider only font-size definition on host element for variant inherit">
      <div style="height: 72px; border-left: 10px solid deeppink">
        <p-heading
          [variant]="'inherit'"
          style="
            font-size: 60px;
            line-height: 10;
            font-family: serif;
            font-weight: 100;
            color: deeppink;
            text-align: right;
            border-left: 10px solid deepskyblue;
          "
        >
          ABC
        </p-heading>
      </div>
      <br />
      <div style="height: 72px; border-left: 10px solid deeppink">
        <p-heading
          [variant]="'inherit'"
          style="
            font-size: 60px;
            line-height: 10;
            font-family: serif;
            font-weight: 100;
            color: deeppink;
            text-align: right;
            border-left: 10px solid deepskyblue;
          "
        >
          <h3
            style="
              margin: 100px;
              padding: 100px;
              font-size: 200px;
              line-height: 5;
              font-family: serif;
              font-weight: 100;
              color: deeppink;
              text-align: right;
            "
          >
            ABC
          </h3>
        </p-heading>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadingComponent {}
