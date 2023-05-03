import { type ComponentType, type ReactNode } from "react";

type ElementsWithRef = {
  [K in keyof JSX.IntrinsicElements]: "ref" extends keyof JSX.IntrinsicElements[K]
    ? JSX.IntrinsicElements[K]
    : never;
};

type HTMLElements = {
  [K in keyof ElementsWithRef]: ElementsWithRef[K] extends SVGSymbolElement
    ? never
    : ElementsWithRef[K];
};

type ViableElements = HTMLElements;

// Define our Props type to allow the specifying of a Tag for HTML attributes
// Also define children as React does with React.ReactNode
type Props<Tag extends keyof ViableElements> = {
  as?: ComponentType | keyof ViableElements;
  children?: ReactNode;
} & ViableElements[Tag];

// Define our generic (Tag) again here and give it our default value
// Don't forget to specify the type Props<Tag> at the end of your function's arguments
// Then we can spread all props to the tag/Wrapper
export const Component = <Tag extends keyof ViableElements = "div">({
  as: Wrapper = "div",
  ...props
}: Props<Tag>) => {
  // @ts-expect-error - We can't know if the Wrapper is a string or a component
  return <Wrapper {...props} />;
};
