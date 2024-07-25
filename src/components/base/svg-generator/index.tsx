/* eslint-disable no-mixed-operators */
import { type Property } from "csstype";
import { atom, useAtom, useAtomValue } from "jotai";
import {
  type ComponentProps,
  type CSSProperties,
  type HTMLProps,
  useCallback,
  useMemo,
  useState,
} from "react";
import { type PRNG } from "seedrandom";
import Seedrandom from "seedrandom";

import { cn } from "~/utils/style";
import { PathBezierCubic, PathMoveTo, Point } from "~/utils/svg/path";

import $style from "./index.module.css";

export const colors = [
  "#0c0",
  "#f39",
  "#001cce",
  "#a010fd",
  "#ff7900",
  "#322F31",
  "#fff",
] as const;
export type Color = (typeof colors)[number];

export const backgroundColors = ["#fff", "#322F31"] as const;
export type BackgroundColor = (typeof backgroundColors)[number];

export type BandData = {
  id: string;
  nSubBands: number;
  speed: number;
  amplitude: number;
  strokeWidth: number;
  dashWidth: number;
  color: Color;
};

const _backgroundColorAtom = atom<BackgroundColor>(backgroundColors[0]);

export const backgroundColorAtom = atom((get) => get(_backgroundColorAtom));

export const N_BANDS = 5;

const randBetween = (a: number, b: number) =>
  // eslint-disable-next-line no-mixed-operators
  Math.round(Math.random() * (b - a) + a);

const bandDataAtom = atom<BandData[]>(
  Array.from(
    { length: N_BANDS },
    (_, i) =>
      ({
        id: `band-${i}`,
        nSubBands: 4,
        speed: randBetween(5, 50),
        amplitude: randBetween(3, 10),
        color: colors[i % colors.length]!,
        strokeWidth: randBetween(1, 25),
        dashWidth: Math.random() > 0.75 ? 0 : randBetween(0, 50),
      } satisfies BandData),
  ),
);

type AnimationProps = {
  duration: Property.AnimationDuration;
  easing: Property.AnimationTimingFunction;
  delay: Property.AnimationDelay;
};

type Pointish = Point | ConstructorParameters<typeof Point>[0];

const SvgPath = ({
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
          "infinite",
          "alternate",
          $style.animateDashOffset!,
        ].join(" "),
        [
          animations?.path?.duration ?? "1s",
          animations?.path?.easing ?? "linear",
          animations?.path?.delay ?? "0s",
          "infinite",
          "alternate",
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

const SvgBand = (props: {
  start: Point;
  width: number;
  height: number;
  rand: PRNG;
  index: number;
}) => {
  const data = useAtomValue(
    useMemo(() => atom((get) => get(bandDataAtom)[props.index]), [props.index]),
  );

  if (!data) {
    return null;
  }

  return (
    <>
      {Array.from({ length: data.nSubBands }, (_, i) => i).map((subBandI) => {
        const speed = (50 - data.speed) * 0.5 + 0.25;

        return (
          <SvgPath
            key={`${data.id}-${subBandI}`}
            start={props.start}
            strokeDasharray={data.dashWidth > 0 ? [data.dashWidth] : undefined}
            animations={{
              dashes: {
                delay: `${speed * props.rand.quick()}s`,
                duration: `${speed}s`,
              },
              path: {
                delay: `${speed * props.rand.quick()}s`,
                duration: `${speed}s`,
              },
            }}
            points={[
              {
                x:
                  props.height / 2 -
                  (props.height * props.rand.quick()) / N_BANDS,
                y: props.start.y - props.height * (data.amplitude / 25),
              },
              {
                x:
                  props.height / 2 +
                  (props.height * props.rand.quick()) / N_BANDS,
                y: props.start.y + props.height * (data.amplitude / 25),
              },
              {
                x: props.width,
                y: props.start.y,
              },

              {
                x:
                  props.height / 2 -
                  (props.height * props.rand.quick()) / N_BANDS,
                y: props.start.y + props.height * (data.amplitude / 25),
              },
              {
                x:
                  props.height / 2 +
                  (props.height * props.rand.quick()) / N_BANDS,
                y: props.start.y - props.height * (data.amplitude / 25),
              },
              {
                x: props.width,
                y: props.start.y,
              },
            ]}
            style={{
              stroke: data.color,
              strokeWidth: data.strokeWidth,
            }}
          />
        );
      })}
    </>
  );
};

export type SvgBandsProps = Omit<
  HTMLProps<SVGElement>,
  "children" | "xmlns" | "ref"
> & {
  randSeed: string;
  width: number;
  height: number;
};

export const SvgBands = ({
  randSeed,
  width,
  height,
  ...props
}: SvgBandsProps) => {
  const bandHeight = height / N_BANDS;
  const backgroundColor = useAtomValue(backgroundColorAtom);

  const rand = Seedrandom(randSeed);

  return (
    <svg
      {...props}
      data-bg-color={backgroundColor}
      height={height}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        ...props.style,
        backgroundColor,
      }}
    >
      {Array.from({ length: N_BANDS }, (_, i) => i).map((bandI) => (
        <SvgBand
          key={bandI}
          height={height}
          index={bandI}
          rand={rand}
          width={width}
          start={
            new Point({
              x: 0,
              y: bandHeight * bandI + bandHeight / 2,
            })
          }
        />
      ))}
    </svg>
  );
};

export const GeneratorControls = () => {
  const [bandData, setBandData] = useAtom(bandDataAtom);
  const [selectedBand, setSelectedBand] = useState(0);
  const [backgroundColor, setBackgroundColor] = useAtom(_backgroundColorAtom);

  const selectedBandData = bandData[selectedBand];

  const setProp = useCallback(
    <T extends keyof BandData>(prop: T, value: BandData[T]) => {
      setBandData((b) => {
        const newBandData = [...b];
        newBandData[selectedBand] = {
          ...newBandData[selectedBand]!,
          [prop]: value,
        };
        return newBandData;
      });
    },
    [selectedBand, setBandData],
  );

  if (!selectedBandData) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="uppercase">Line</h2>
        <div className="flex justify-between gap-1.5">
          {bandData.map((_, i) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className={cn(
                "box-content aspect-[3/4] h-[1em] cursor-pointer items-center rounded-full border-[5px] border-off-black bg-white text-center align-middle text-3xl font-bold leading-none",
                selectedBand === i && "!bg-off-black !text-white",
              )}
              onClick={() => setSelectedBand(i)}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      <label className="flex flex-col">
        <span className="uppercase">Bundle</span>
        <input
          max={100}
          min={1}
          type="range"
          value={selectedBandData.nSubBands}
          onChange={(e) => setProp("nSubBands", Number(e.target.value))}
        />
      </label>

      <label className="flex flex-col">
        <span className="uppercase">Speed</span>
        <input
          max={50}
          min={1}
          type="range"
          value={selectedBandData.speed}
          onChange={(e) => setProp("speed", Number(e.target.value))}
        />
      </label>

      <label className="flex flex-col">
        <span className="uppercase">Line weight</span>
        <input
          max={50}
          min={1}
          type="range"
          value={selectedBandData.strokeWidth}
          onChange={(e) => setProp("strokeWidth", Number(e.target.value))}
        />
      </label>

      <label className="flex flex-col">
        <span className="uppercase">Dash</span>
        <input
          max={100}
          min={0}
          type="range"
          value={selectedBandData.dashWidth}
          onChange={(e) => setProp("dashWidth", Number(e.target.value))}
        />
      </label>

      <label className="flex flex-col">
        <span className="uppercase">Amplitude</span>
        <input
          max={50}
          min={1}
          type="range"
          value={selectedBandData.amplitude}
          onChange={(e) => setProp("amplitude", Number(e.target.value))}
        />
      </label>

      <div>
        <span className="uppercase">Line color</span>
        <div className="flex justify-between gap-1.5">
          {colors.map((c) => {
            let borderColor = undefined as string | undefined;
            if (c === selectedBandData.color) {
              borderColor = "black";
            }

            if (borderColor === undefined && c === "#fff") {
              borderColor = "#dcdcdc";
            }

            return (
              <div
                key={c}
                className="h-8 w-[26px] cursor-pointer rounded-full border-[3px] border-transparent"
                style={{
                  backgroundColor: c,
                  borderColor,
                }}
                onClick={() => setProp("color", c)}
              />
            );
          })}
        </div>
      </div>

      <div>
        <span className="uppercase">Background color</span>
        <div className="flex justify-start gap-1.5">
          {backgroundColors.map((c) => {
            let borderColor = undefined as string | undefined;
            if (c === backgroundColor) {
              borderColor = "black";
            }

            if (borderColor === undefined && c === "#fff") {
              borderColor = "#dcdcdc";
            }

            return (
              <div
                key={c}
                className="h-8 w-[26px] cursor-pointer rounded-full border-[3px] border-transparent"
                style={{
                  backgroundColor: c,
                  borderColor,
                }}
                onClick={() => setBackgroundColor(c)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
