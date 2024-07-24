/* eslint-disable no-mixed-operators */
import { type Property } from "csstype";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { type InferGetServerSidePropsType } from "next";
import {
  type ComponentProps,
  type CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Seedrandom, { type PRNG } from "seedrandom";

import { cn } from "~/utils/style";
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

export const getServerSideProps = () => {
  return {
    props: {
      randSeed: Math.random().toString(36).slice(2),
    },
  };
};

const colors = [
  "#0c0",
  "#f39",
  "#001cce",
  "#a010fd",
  "#ff7900",
  "#000",
  // "#fff",
] as const;
type Color = (typeof colors)[number];
type BandData = {
  id: string;
  nSubBands: number;
  speed: number;
  amplitude: number;
  strokeWidth: number;
  dashWidth: number;
  color: Color;
};

const N_BANDS = 6;

const bandDataAtom = atom<BandData[]>([]);

const BandSvg = (props: {
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
          <RandPath
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

const BandsSvg = ({ randSeed }: { randSeed: string }) => {
  const [height, setHeight] = useState(1920);
  const [width, setWidth] = useState(1080);
  useEffect(() => {
    const resizeHandler = () => {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    };

    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  const bandHeight = height / N_BANDS;

  const rand = Seedrandom(randSeed);

  return (
    <svg height={height} width={width} xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: N_BANDS }, (_, i) => i).map((bandI) => (
        <BandSvg
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

const BandControls = () => {
  const [bandData, setBandData] = useAtom(bandDataAtom);
  const [selectedBand, setSelectedBand] = useState(0);

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
    <div className="absolute bottom-4 left-4 flex flex-col gap-4 rounded-md bg-gray-300 p-4">
      <div className="flex justify-between gap-4">
        {bandData.map((_, i) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className={cn(
              "box-content aspect-square h-[1em] cursor-pointer rounded-full border-4 border-off-black bg-white p-0.5 text-center align-middle text-4xl font-bold leading-none",
              selectedBand === i && "!bg-off-black !text-white",
            )}
            onClick={() => setSelectedBand(i)}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <label className="flex flex-col">
          snop
          <input
            max={100}
            min={1}
            type="range"
            value={selectedBandData.nSubBands}
            onChange={(e) => setProp("nSubBands", Number(e.target.value))}
          />
        </label>
        <label className="flex flex-col">
          speed
          <input
            max={50}
            min={1}
            type="range"
            value={selectedBandData.speed}
            onChange={(e) => setProp("speed", Number(e.target.value))}
          />
        </label>
        <label className="flex flex-col">
          amplitude
          <input
            max={50}
            min={1}
            type="range"
            value={selectedBandData.amplitude}
            onChange={(e) => setProp("amplitude", Number(e.target.value))}
          />
        </label>
        <label className="flex flex-col">
          stroke
          <input
            max={50}
            min={1}
            type="range"
            value={selectedBandData.strokeWidth}
            onChange={(e) => setProp("strokeWidth", Number(e.target.value))}
          />
        </label>
        <label className="flex flex-col">
          dash width
          <input
            max={100}
            min={0}
            type="range"
            value={selectedBandData.dashWidth}
            onChange={(e) => setProp("dashWidth", Number(e.target.value))}
          />
        </label>

        <div className="flex justify-between gap-2">
          {colors.map((c) => (
            <div
              key={c}
              className="aspect-square w-12 cursor-pointer rounded-full border-4 border-transparent"
              style={{
                backgroundColor: c,
                borderColor: c === selectedBandData.color ? "black" : undefined,
              }}
              onClick={() => setProp("color", c)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line react/function-component-definition
export default function PageTest(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const rand = useMemo(() => Seedrandom(props.randSeed), [props.randSeed]);

  const setBandData = useSetAtom(bandDataAtom);
  useEffect(() => {
    const randBetween = (a: number, b: number) =>
      Math.round(rand.quick() * (b - a) + a);

    setBandData(
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
            dashWidth: rand.quick() > 0.75 ? 0 : randBetween(0, 50),
          } satisfies BandData),
      ),
    );
  }, [rand, setBandData]);

  return (
    <>
      <div className="absolute inset-0">
        <BandsSvg randSeed={props.randSeed} />
      </div>
      <div>
        <BandControls />
      </div>
    </>
  );
}

PageTest.getLayout = (page: unknown) => page;
