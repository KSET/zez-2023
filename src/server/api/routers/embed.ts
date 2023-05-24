import * as cheerio from "cheerio";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

type Embed = {
  url: string;
  title?: string;
  height?: number;
  width?: number;
};

const embedCache = new Map<string, Embed>();

export const embedRouter = createTRPCRouter({
  bandcamp: publicProcedure
    .input(
      z.object({
        url: z.string().url(),
      }),
    )
    .query(async (opts) => {
      const link = opts.input.url;

      opts.ctx.res?.setHeader(
        "Cache-Control",
        "public, max-age=3600, immutable",
      );

      if (embedCache.has(link)) {
        return {
          link,
          embed: embedCache.get(link),
        };
      }

      const pageHtml = await fetch(link)
        .then((res) => res.text())
        .catch((e) => {
          console.error(e);
          return null;
        });

      if (!pageHtml) {
        return null;
      }

      const $ = cheerio.load(pageHtml);

      const $og = (property: string) =>
        $(`meta[property='og:${property}']`).attr("content");

      const url = $og("video");
      const title = $og("title");

      if (!url || !title) {
        return null;
      }

      const height = $og("video:height");
      const width = $og("video:width");

      const embed = {
        url,
        title,
        height: height ? parseInt(height) : undefined,
        width: width ? parseInt(width) : undefined,
      } satisfies Embed;

      embedCache.set(link, embed);

      return {
        link,
        embed,
      };
    }),
});
