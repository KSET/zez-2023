/* eslint-disable no-mixed-operators */
import { type Property } from "csstype";
import { type InferGetStaticPropsType } from "next";
import {
  type ComponentProps,
  type CSSProperties,
  useEffect,
  useMemo,
  useState,
} from "react";
import Seedrandom from "seedrandom";

import { PathBezierCubic, PathMoveTo, Point } from "~/utils/svg/path";

import $style from "./test.module.css";

type AnimationProps = {
  duration: Property.AnimationDuration;
  easing: Property.AnimationTimingFunction;
  delay: Property.AnimationDelay;
};

type Pointish = Point | ConstructorParameters<typeof Point>[0];

const RandPath = ({
  start,
  points,
  strokeDasharray,
  animations,
  ...pathProps
}: Omit<ComponentProps<"path">, "strokeDasharray" | "points"> & {
  start: Pointish;
  points: [Pointish, Pointish, Pointish, Pointish, Pointish, Pointish];
  strokeDasharray?: (number | null | undefined)[];
  animations?: {
    dashes?: Partial<AnimationProps>;
    path?: Partial<AnimationProps>;
  };
}) => {
  const startPath = `path("${[
    new PathMoveTo({ to: start }),
    new PathBezierCubic({
      controlPointStart: new Point(points[0]!),
      controlPointEnd: new Point(points[1]!),
      lineEnd: new Point(points[2]!),
    }),
  ].join(" ")}")`;

  const endPath = `path("${[
    new PathMoveTo({ to: start }),
    new PathBezierCubic({
      controlPointStart: new Point(points[3]!),
      controlPointEnd: new Point(points[4]!),
      lineEnd: new Point(points[5]!),
    }),
  ].join(" ")}")`;

  const animation = useMemo(
    () =>
      [
        [
          animations?.dashes?.duration ?? "1s",
          animations?.dashes?.easing ?? "linear",
          animations?.dashes?.delay ?? "0s",
          $style.animateDashOffset!,
        ].join(" "),
        [
          animations?.path?.duration ?? "1s",
          animations?.path?.easing ?? "linear",
          animations?.path?.delay ?? "0s",
          $style.animatePath!,
        ].join(" "),
      ].join(", "),
    [animations],
  );

  return (
    <path
      {...pathProps}
      style={
        {
          stroke: "black",
          fill: "transparent",
          ...pathProps.style,
          animation,
          animationIterationCount: "infinite",
          strokeDasharray: strokeDasharray?.filter(Boolean).join(" "),
          "--stroke-dashoffset-end": strokeDasharray
            ?.filter(Boolean)
            .reduce((acc, a) => acc + a, 0)
            .toString(),
          d: startPath,
          "--d-start": startPath,
          "--d-end": endPath,
        } as CSSProperties
      }
    />
  );
};

export const getStaticProps = () => {
  return {
    props: {
      randSeed: Math.random().toString(36).slice(2),
    },
  };
};

// eslint-disable-next-line react/function-component-definition
export default function PageTest(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [height, setHeight] = useState(1920);
  const [width, setWidth] = useState(1080);

  const rand = Seedrandom(props.randSeed);

  useEffect(() => {
    const resizeHandler = () => {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    };

    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  const nBands = Math.ceil(6 * rand.quick());
  const nSubBands = 5;

  const bandHeight = height / nBands;

  return (
    <div>
      <svg height={height} width={width} xmlns="http://www.w3.org/2000/svg">
        {Array.from({ length: nBands }, (_, i) => i)
          .map((bandI) =>
            Array.from(
              { length: Math.ceil(nSubBands * rand.quick()) },
              (_, i) => i,
            ).map((subBandI) => {
              const start = new Point({
                x: 0,
                y: bandHeight * bandI + bandHeight / 2,
              });

              return (
                <RandPath
                  key={`${bandI}-${subBandI}`}
                  start={start}
                  animations={{
                    dashes: {
                      delay: `${0.5 * rand.quick()}s`,
                      duration: `${0.5 * rand.quick() + 0.25}s`,
                    },
                    path: {
                      delay: `${0.5 * rand.quick()}s`,
                      duration: `${2 * rand.quick() + 0.25}s`,
                    },
                  }}
                  points={[
                    {
                      x: height / 2 - (height * rand.quick()) / nBands,
                      y: start.y - ((start.y / 2) * rand.quick()) / nBands,
                    },
                    {
                      x: height / 2 + (height * rand.quick()) / nBands,
                      y: start.y + ((start.y / 2) * rand.quick()) / nBands,
                    },
                    {
                      x: width,
                      y: start.y,
                    },

                    {
                      x: height / 2 - (height * rand.quick()) / nBands,
                      y: start.y + (width * rand.quick()) / nBands,
                    },
                    {
                      x: height / 2 + (height * rand.quick()) / nBands,
                      y: start.y - (width * rand.quick()) / nBands,
                    },
                    {
                      x: width,
                      y: start.y,
                    },
                  ]}
                  strokeDasharray={
                    rand.quick() > 0.5
                      ? [127 * rand.quick() + 1, 32 * rand.quick() + 1]
                      : undefined
                  }
                  style={{
                    stroke: `rgb(${rand.quick() * 255},${rand.quick() * 255},${
                      rand.quick() * 255
                    })`,
                    strokeWidth: `${rand.quick() * 10 + 1}`,
                  }}
                />
              );
            }),
          )
          .flat()}
      </svg>
    </div>
  );
}

PageTest.getLayout = (page: unknown) => page;
