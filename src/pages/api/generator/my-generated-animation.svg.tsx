import { type NextApiRequest, type NextApiResponse } from "next";
import { renderToStaticMarkup } from "react-dom/server";
import { z } from "zod";

import {
  backgroundColorValidator,
  bandDataValidator,
  SvgBandsRaw,
} from "~/components/base/svg-generator";
import $style from "~/components/base/svg-generator/index.module.css";

export const payloadValidator = z.object({
  bands: z.array(bandDataValidator),
  backgroundColor: backgroundColorValidator,
  randSeed: z.string().optional(),
});

export type Payload = z.infer<typeof payloadValidator>;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const rawData = req.query.data;

  if (!rawData || typeof rawData !== "string") {
    return res.status(400).send("Invalid data. Failed to get data from query.");
  }

  let data = null as Payload | null;
  try {
    data = payloadValidator.parse(JSON.parse(atob(rawData)));
  } catch (e) {
    return res
      .status(400)
      .send(`Invalid data. Failed to parse data.\n\n${String(e)}`);
  }

  const markup = renderToStaticMarkup(
    <SvgBandsRaw
      backgroundColor={data.backgroundColor}
      bands={data.bands}
      height={1080}
      randSeed={data.randSeed ?? ""}
      width={1920}
    >
      <style>
        {`
      @keyframes ${$style.animateDashOffset!} {
        0% {
          stroke-dashoffset: var(--stroke-dashoffset-end);
        }

        100% {
          stroke-dashoffset: 0;
        }
      }

      @keyframes ${$style.animatePath!} {
        0% {
          d: var(--d-start);
        }

        50% {
          d: var(--d-end);
        }

        100% {
          d: var(--d-start);
        }
      }
    `.trim()}
      </style>
    </SvgBandsRaw>,
  );

  return res
    .status(200)
    .setHeader("content-type", "image/svg+xml")
    .send(markup);
}
