import { TagColor } from "~/components/base/tag";

export const tags = {
  ambient: {
    color: TagColor.Green,
  },
  "avant pop": {
    color: TagColor.Pink,
  },
  breakbeat: {
    color: TagColor.Pink,
  },
  cinematic: {
    color: TagColor.Green,
  },
  "chamber music": {
    color: TagColor.Green,
  },
  "deconstructed club": {
    color: TagColor.Pink,
  },
  electroacoustic: {
    color: TagColor.Green,
  },
  electronic: {
    color: TagColor.Pink,
  },
  electro: {
    color: TagColor.Pink,
  },
  "experimental electronic": {
    color: TagColor.Pink,
  },
  "field recording": {
    color: TagColor.Green,
  },
  grime: {
    color: TagColor.Pink,
  },
  impro: {
    color: TagColor.Blue,
  },
  industrial: {
    color: TagColor.Purple,
  },
  "industrial noise": {
    color: TagColor.Purple,
  },
  kraut: {
    color: TagColor.Purple,
  },
  metal: {
    color: TagColor.Purple,
  },
  noise: {
    color: TagColor.Purple,
  },
  "noise rock": {
    color: TagColor.Purple,
  },
  percussion: {
    color: TagColor.Blue,
  },
  "power electronics": {
    color: TagColor.Pink,
  },
  psychedelic: {
    color: TagColor.Orange,
  },
  "spoken word": {
    color: TagColor.Green,
  },
  techno: {
    color: TagColor.Pink,
  },
};

export type Tags = typeof tags;
export type TagName = keyof Tags;
