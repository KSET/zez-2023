/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type ComponentProps, type CSSProperties, type FC } from "react";

abstract class SvgPathItem {
  abstract toString(): string;
}

export const Path: FC<
  Omit<ComponentProps<"path">, "ref" | "d" | "style"> & {
    style?: CSSProperties & Record<`--${string}`, string | number | undefined>;
    commands: SvgPathItem[];
  }
> = ({ commands, ...props }) => {
  return <path {...props} d={commands.join(" ")} />;
};

export class Point extends SvgPathItem {
  public x: number;
  public y: number;

  constructor(opts: { x: number; y: number }) {
    super();
    this.x = opts.x;
    this.y = opts.y;
  }

  public toString() {
    return `${this.x} ${this.y}`;
  }
}

export class PathMoveTo extends SvgPathItem {
  public to: Point;
  public isRelative: boolean;

  constructor(opts: { to: Point; isRelative?: boolean }) {
    super();
    this.to = opts.to;
    this.isRelative = opts.isRelative ?? false;
  }

  public asRelative(is = true) {
    this.isRelative = is;
    return this;
  }

  public toString() {
    return `${this.isRelative ? "m" : "M"} ${this.to.x},${this.to.y}`;
  }
}

export class PathBezierCubic extends SvgPathItem {
  public controlPointStart: Point;
  public controlPointEnd: Point;
  public lineEnd: Point;
  public isRelative: boolean;

  constructor(opts: {
    controlPointStart: Point;
    controlPointEnd: Point;
    lineEnd: Point;
    isRelative?: boolean;
  }) {
    super();
    this.controlPointStart = opts.controlPointStart;
    this.controlPointEnd = opts.controlPointEnd;
    this.lineEnd = opts.lineEnd;
    this.isRelative = opts.isRelative ?? false;
  }

  public asRelative(is = true) {
    this.isRelative = is;
    return this;
  }

  public toString() {
    return `${this.isRelative ? "c" : "C"} ${this.controlPointStart}, ${
      this.controlPointEnd
    }, ${this.lineEnd}`;
  }
}

export class PathBezierQuadratic extends SvgPathItem {
  public controlPoint: Point;
  public lineEnd: Point;
  public isRelative: boolean;

  constructor(opts: {
    controlPoint: Point;
    lineEnd: Point;
    isRelative?: boolean;
  }) {
    super();
    this.controlPoint = opts.controlPoint;
    this.lineEnd = opts.lineEnd;
    this.isRelative = opts.isRelative ?? false;
  }

  public toString() {
    return `${this.isRelative ? "q" : "Q"} ${this.controlPoint}, ${
      this.lineEnd
    }`;
  }
}
