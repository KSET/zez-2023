import { type NextPage } from "next";

import ImageZezLogo from "~/assets/page/index/zez-logo.png";

const PageHome: NextPage = () => {
  return (
    <div className="inline-block px-4 py-3">
      <img
        alt="Zez logo"
        className="w-64 drop-shadow-[0_2px_4px_rgba(0,0,0,.8)]"
        src={ImageZezLogo.src}
      />
    </div>
  );
};

export default PageHome;
