import React from 'react';
import styled from 'styled-components';
import {
  displaySmallStyle,
  displayLargeStyle,
  displayMediumStyle,
  gridGap,
  headingLargeStyle,
  headingMediumStyle,
  headingSmallStyle,
  headingXLargeStyle,
  headingXXLargeStyle,
  spacingFluidMedium,
  textLargeStyle,
  textMediumStyle,
  textSmallStyle,
  textXLargeStyle,
  textXSmallStyle,
  themeLightPrimary,
} from '@porsche-design-system/components-react/styles';

// Wrapper
const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: gridGap,
  padding: spacingFluidMedium,
});

// Typography
const getTypographyStyle = {
  color: themeLightPrimary,
  margin: 0,
} as const;

const Heading = styled.h3({
  ...getTypographyStyle,
  ...headingMediumStyle,
});

// Display
const DisplayLargeStyle = styled.h1({
  ...getTypographyStyle,
  ...displayLargeStyle,
});

const DisplayMediumStyle = styled.h2({
  ...getTypographyStyle,
  ...displayMediumStyle,
});

const DisplaySmallStyle = styled.h2({
  ...getTypographyStyle,
  ...displaySmallStyle,
});

// Heading
const HeadingXXLargeStyle = styled.h2({
  ...getTypographyStyle,
  ...headingXXLargeStyle,
});

const HeadingXLargeStyle = styled.h3({
  ...getTypographyStyle,
  ...headingXLargeStyle,
});

const HeadingLargeStyle = styled.h4({
  ...getTypographyStyle,
  ...headingLargeStyle,
});

const HeadingMediumStyle = styled.h5({
  ...getTypographyStyle,
  ...headingMediumStyle,
});

const HeadingSmallStyle = styled.h6({
  ...getTypographyStyle,
  ...headingSmallStyle,
});

// Text
const TextXLargeStyle = styled.p({
  ...getTypographyStyle,
  ...textXLargeStyle,
});

const TextLargeStyle = styled.p({
  ...getTypographyStyle,
  ...textLargeStyle,
});

const TextMediumStyle = styled.p({
  ...getTypographyStyle,
  ...textMediumStyle,
});

const TextSmallStyle = styled.p({
  ...getTypographyStyle,
  ...textSmallStyle,
});

const TextXSmallStyle = styled.p({
  ...getTypographyStyle,
  ...textXSmallStyle,
});

export const DesignTokensTypographyExample = (): JSX.Element => {
  const content = 'The quick brown fox jumps over the lazy dog';
  return (
    <>
      <Wrapper>
        <Heading>Display</Heading>
        <DisplayLargeStyle>{content}</DisplayLargeStyle>
        <DisplayMediumStyle>{content}</DisplayMediumStyle>
        <DisplaySmallStyle>{content}</DisplaySmallStyle>
      </Wrapper>
      <Wrapper>
        <Heading>Heading</Heading>
        <HeadingXXLargeStyle>{content}</HeadingXXLargeStyle>
        <HeadingXLargeStyle>{content}</HeadingXLargeStyle>
        <HeadingLargeStyle>{content}</HeadingLargeStyle>
        <HeadingMediumStyle>{content}</HeadingMediumStyle>
        <HeadingSmallStyle>{content}</HeadingSmallStyle>
      </Wrapper>
      <Wrapper>
        <Heading>Text</Heading>
        <TextXLargeStyle>{content}</TextXLargeStyle>
        <TextLargeStyle>{content}</TextLargeStyle>
        <TextMediumStyle>{content}</TextMediumStyle>
        <TextSmallStyle>{content}</TextSmallStyle>
        <TextXSmallStyle>{content}</TextXSmallStyle>
      </Wrapper>
    </>
  );
};
