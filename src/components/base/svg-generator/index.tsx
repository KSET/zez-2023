/* eslint-disable no-mixed-operators */
import { type Property } from "csstype";
import { atom, useAtom, useAtomValue } from "jotai";
import {
  type ComponentProps,
  type CSSProperties,
  type HTMLProps,
  type ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { type PRNG } from "seedrandom";
import Seedrandom from "seedrandom";
import { z } from "zod";

import type { Payload as GenerateAnimationPayload } from "~/pages/api/generator/my-generated-animation.svg";
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
export const colorValidator = z.enum(colors);
export type Color = z.infer<typeof colorValidator>;

export const backgroundColors = ["#fff", "#322F31"] as const;
export const backgroundColorValidator = z.enum(backgroundColors);
export type BackgroundColor = z.infer<typeof backgroundColorValidator>;

export const bandDataValidator = z.object({
  id: z.string(),
  nSubBands: z.number(),
  speed: z.number(),
  amplitude: z.number(),
  strokeWidth: z.number(),
  dashWidth: z.number(),
  color: colorValidator,
  position: z.number(),
});
export type BandData = z.infer<typeof bandDataValidator>;

const _backgroundColorAtom = atom<BackgroundColor>(backgroundColors[0]);

export const backgroundColorAtom = atom((get) => get(_backgroundColorAtom));

const bandDataAtom = atom<BandData[]>(
  [
    {
      id: "band-0",
      nSubBands: 2,
      speed: 45,
      amplitude: 9,
      color: "#f39",
      strokeWidth: 75,
      dashWidth: 0,
    },
    {
      id: "band-1",
      nSubBands: 1,
      speed: 12,
      amplitude: 15,
      color: "#0c0",
      strokeWidth: 276,
      dashWidth: 0,
    },
    {
      id: "band-2",
      nSubBands: 72,
      speed: 31,
      amplitude: 19,
      color: "#001cce",
      strokeWidth: 1,
      dashWidth: 0,
    },
    {
      id: "band-3",
      nSubBands: 4,
      speed: 34,
      amplitude: 6,
      color: "#ff7900",
      strokeWidth: 113,
      dashWidth: 0,
    },
    {
      id: "band-4",
      nSubBands: 4,
      speed: 50,
      amplitude: 9,
      color: "#a010fd",
      strokeWidth: 12,
      dashWidth: 0,
    },
  ].map(
    (b, i, arr) =>
      ({
        ...b,
        position: (i / arr.length) * 100,
      } as BandData),
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
  rand,
  bandData,
  animations,
  ...pathProps
}: Omit<ComponentProps<"path">, "strokeDasharray" | "points"> & {
  start: Pointish;
  points: [Pointish, Pointish, Pointish, Pointish, Pointish, Pointish];
  strokeDasharray?: (number | null | undefined)[];
  bandData: BandData;
  rand: PRNG;
  animations?: {
    dashes?: Partial<AnimationProps>;
    path?: Partial<AnimationProps>;
  };
}) => {
  const xOffset = Math.ceil(
    20 + bandData.strokeWidth * 0.5 + bandData.strokeWidth * 0.5 * rand.quick(),
  );

  const startOffset = new Point({
    x: start.x - xOffset,
    y: start.y,
  });

  const startPath = `path("${[
    new PathMoveTo({ to: startOffset }),
    new PathBezierCubic({
      controlPointStart: new Point(points[0]!),
      controlPointEnd: new Point(points[1]!),
      lineEnd: new Point({
        x: points[2]!.x + xOffset,
        y: points[2]!.y,
      }),
    }),
  ].join(" ")}")`;

  const endPath = `path("${[
    new PathMoveTo({ to: startOffset }),
    new PathBezierCubic({
      controlPointStart: new Point(points[3]!),
      controlPointEnd: new Point(points[4]!),
      lineEnd: new Point({
        x: points[5]!.x + xOffset,
        y: points[5]!.y,
      }),
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

const SvgBand = (props: Omit<SvgBandRawProps, "nBands" | "band">) => {
  const data = useAtomValue(
    useMemo(() => atom((get) => get(bandDataAtom)[props.index]), [props.index]),
  );

  const nBands = useAtomValue(
    useMemo(() => atom((get) => get(bandDataAtom).length), []),
  );

  if (!data) {
    return null;
  }

  return <SvgBandRaw {...props} band={data} nBands={nBands} />;
};

type SvgBandRawProps = {
  start: Point;
  width: number;
  height: number;
  rand: PRNG;
  index: number;
  band: BandData;
  nBands: number;
};
export const SvgBandRaw = ({ band, nBands, ...props }: SvgBandRawProps) => {
  const start =
    band.position > 0
      ? new Point({
          x: 0,
          y: (band.position / 100 + 0.1) * props.height,
        })
      : props.start;
  return (
    <>
      {Array.from({ length: band.nSubBands }, (_, i) => i).map((subBandI) => {
        const speed = (50 - band.speed) * 0.5 + 0.25;

        return (
          <SvgPath
            key={`${band.id}-${subBandI}`}
            bandData={band}
            rand={props.rand}
            start={start}
            strokeDasharray={band.dashWidth > 0 ? [band.dashWidth] : undefined}
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
                  (props.height * props.rand.quick()) / nBands,
                y: start.y - props.height * (band.amplitude / 25),
              },
              {
                x:
                  props.height / 2 +
                  (props.height * props.rand.quick()) / nBands,
                y: start.y + props.height * (band.amplitude / 25),
              },
              {
                x: props.width,
                y: start.y,
              },

              {
                x:
                  props.height / 2 -
                  (props.height * props.rand.quick()) / nBands,
                y: start.y + props.height * (band.amplitude / 25),
              },
              {
                x:
                  props.height / 2 +
                  (props.height * props.rand.quick()) / nBands,
                y: start.y - props.height * (band.amplitude / 25),
              },
              {
                x: props.width,
                y: start.y,
              },
            ]}
            style={{
              stroke: band.color,
              strokeWidth: band.strokeWidth,
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
  const N_BANDS = useAtomValue(
    useMemo(() => atom((get) => get(bandDataAtom).length), []),
  );
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
              y: (height / N_BANDS) * (bandI + 0.5),
            })
          }
        />
      ))}
    </svg>
  );
};

export type SvgBandsRawProps = Omit<
  HTMLProps<SVGElement>,
  "children" | "xmlns" | "ref"
> & {
  randSeed: string;
  width: number;
  height: number;
  backgroundColor: string;
  bands: BandData[];
  children?: ReactNode;
};
export const SvgBandsRaw = ({
  backgroundColor,
  height,
  width,
  randSeed,
  bands,
  children,
  ...props
}: SvgBandsRawProps) => {
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
      {children}
      {bands.map((band, bandI) => (
        <SvgBandRaw
          key={band.id}
          band={band}
          height={height}
          index={bandI}
          nBands={bands.length}
          rand={rand}
          width={width}
          start={
            new Point({
              x: 0,
              y:
                band.position * height ||
                (height / bands.length) * (bandI + 0.5),
            })
          }
        />
      ))}
    </svg>
  );
};

export const DownloadAnimationForm = ({
  children,
  ...props
}: HTMLProps<HTMLFormElement> & { children: ReactNode }) => {
  const bands = useAtomValue(bandDataAtom);
  const backgroundColor = useAtomValue(backgroundColorAtom);

  const payload = useMemo(
    () =>
      ({
        bands,
        backgroundColor,
        randSeed: "",
      } satisfies GenerateAnimationPayload),
    [backgroundColor, bands],
  );
  const encodedPayload = useMemo(
    () => btoa(JSON.stringify(payload)),
    [payload],
  );

  return (
    <form
      {...props}
      action="/api/generator/my-generated-animation.svg"
      className="contents"
      method="POST"
    >
      <input name="data" type="hidden" value={encodedPayload} />
      {children}
    </form>
  );
};

const randBetween = (min: number, max: number, rand: PRNG) => {
  return min + (max - min) * rand.quick();
};

export const GeneratorControls = ({ children }: { children?: ReactNode }) => {
  const [bandData, setBandData] = useAtom(bandDataAtom);
  const [selectedBand, setSelectedBand] = useState(0);
  const [backgroundColor, setBackgroundColor] = useAtom(_backgroundColorAtom);
  const rand = useMemo(() => Seedrandom(), []);

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

  const addLine = () => {
    setBandData((b) => [
      ...b,
      {
        id: `band-${b.length}`,
        nSubBands: randBetween(1, 50, rand),
        speed: randBetween(1, 50, rand),
        amplitude: randBetween(1, 25, rand),
        color: colors[Math.round(Math.random() * colors.length)]!,
        strokeWidth: randBetween(1, 100, rand),
        dashWidth: rand.quick() > 0.5 ? 0 : randBetween(1, 100, rand),
        position: randBetween(0, 100, rand),
      },
    ]);
  };

  const removeLine = () => {
    if (bandData.length > 1) {
      if (selectedBand >= bandData.length - 1) {
        setSelectedBand(() => bandData.length - 2);
      }

      setBandData((b) => b.filter((_, i) => i !== bandData.length - 1));
    }
  };

  if (!selectedBandData) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="uppercase">Line</h2>
        <div className="flex flex-wrap justify-start gap-1.5">
          <button
            className="h-[32px] min-w-[26px] scale-110 cursor-pointer items-center rounded-[15px] border-[3px] border-off-black bg-white px-0.5 pb-1 text-center align-middle text-[23px] font-bold leading-none"
            type="button"
            onClick={() => {
              removeLine();
            }}
          >
            <span className="-mt-px block">-</span>
          </button>
          {bandData.map((_, i) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className={cn(
                "h-[32px] min-w-[26px] scale-110 cursor-pointer items-center rounded-[15px] border-[3px] border-off-black bg-white px-0.5 pb-1 text-center align-middle text-[23px] font-bold leading-none",
                selectedBand === i && "!bg-off-black !text-white",
              )}
              onClick={() => setSelectedBand(i)}
            >
              {i + 1}
            </div>
          ))}
          <button
            className="h-[32px] min-w-[26px] scale-110 cursor-pointer items-center rounded-[15px] border-[3px] border-off-black bg-white px-0.5 pb-1 pt-px text-center align-middle text-[23px] font-bold leading-none"
            type="button"
            onClick={() => {
              addLine();
            }}
          >
            <span className="-mt-px block">+</span>
          </button>
        </div>
      </div>

      <label className="flex flex-col gap-2">
        <span className="uppercase">Bundle</span>
        <input
          className="h-0.5 appearance-none bg-off-black accent-off-black"
          max={100}
          min={1}
          type="range"
          value={selectedBandData.nSubBands}
          onChange={(e) => setProp("nSubBands", Number(e.target.value))}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="uppercase">Speed</span>
        <input
          className="h-0.5 appearance-none bg-off-black accent-off-black"
          max={50}
          min={1}
          type="range"
          value={selectedBandData.speed}
          onChange={(e) => setProp("speed", Number(e.target.value))}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="uppercase">Line weight</span>
        <input
          className="h-0.5 appearance-none bg-off-black accent-off-black"
          max={400}
          min={1}
          type="range"
          value={selectedBandData.strokeWidth}
          onChange={(e) => setProp("strokeWidth", Number(e.target.value))}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="uppercase">Dash</span>
        <input
          className="h-0.5 appearance-none bg-off-black accent-off-black"
          max={100}
          min={0}
          type="range"
          value={selectedBandData.dashWidth}
          onChange={(e) => setProp("dashWidth", Number(e.target.value))}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="uppercase">Amplitude</span>
        <input
          className="h-0.5 appearance-none bg-off-black accent-off-black"
          max={50}
          min={1}
          type="range"
          value={selectedBandData.amplitude}
          onChange={(e) => setProp("amplitude", Number(e.target.value))}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="uppercase">Position</span>
        <input
          className="h-0.5 appearance-none bg-off-black accent-off-black"
          max={100}
          min={0}
          type="range"
          value={selectedBandData.position}
          onChange={(e) => setProp("position", Number(e.target.value))}
        />
      </label>

      <div className="flex flex-col gap-2">
        <span className="uppercase">Line color</span>
        <div className="flex justify-start gap-1.5">
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

      <div className="flex flex-col gap-2">
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

      {children}
    </>
  );
};
