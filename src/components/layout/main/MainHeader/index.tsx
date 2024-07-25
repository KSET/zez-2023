import { atom, useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  type ComponentProps,
  type HTMLProps,
  useEffect,
  useState,
} from "react";
import type { UrlObject } from "url";

import ImageZezLogo from "~/assets/img/shared/zez-logo.png";
import { Button } from "~/components/base/button";
import { AppDrawer } from "~/components/base/drawer";
import {
  DownloadAnimationButton,
  GeneratorControls,
} from "~/components/base/svg-generator";
import { useNavigationChange } from "~/hooks/onNavigation";
import { fontDisplay } from "~/utils/font";
import { cn } from "~/utils/style";

export type NavLinkProps = Omit<HTMLProps<typeof Link>, "children"> & {
  href?: string | UrlObject | null;
  label: string;
};

const links = [
  {
    href: "/archive",
    label: "archive",
  },
  {
    href: "/about",
    label: "about",
  },
] satisfies NavLinkProps[];

const socials = [
  {
    href: "https://www.instagram.com/zezfestival/",
    label: "ig",
  },
  {
    href: "https://www.facebook.com/zavodzaeksperimentalnizvuk",
    label: "fb",
  },
] satisfies NavLinkProps[];

const NavLink = ({ href, label, ...props }: NavLinkProps) => {
  const router = useRouter();
  const path = router.asPath;

  const active = (link: NavLinkProps): boolean => {
    return path.startsWith(String(link.href));
  };

  const isActive = active({ href, label });

  return (
    <Link
      href={href ?? "#"}
      className={cn(
        "inline-block self-start rounded-full text-[45px] leading-none max-br:text-[42px]",
        props.className,
      )}
      onClick={(event) => {
        if (!href) {
          event.preventDefault();
        }
        props.onClick?.(event as never);
      }}
    >
      <Button
        active={isActive}
        className="px-4 pb-1.5 leading-[.85em]"
        tabIndex={-1}
      >
        {label}
      </Button>
    </Link>
  );
};

type NavProps = ComponentProps<"nav"> & {
  sectionProps?: ComponentProps<"div">;
};

const generatorOpenAtom = atom(false);

const GeneratorDropdown = () => {
  const [isOpen, setIsOpen] = useAtom(generatorOpenAtom);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname !== "/") {
      setIsOpen(false);
    }
  }, [router.pathname, setIsOpen]);

  return (
    <div className="relative">
      <NavLink
        label="generator"
        onClick={() => {
          if (router.pathname !== "/") {
            void router.push("/").then(() => {
              setIsOpen(true);
            });
          } else {
            setIsOpen((x) => !x);
          }
        }}
      />
      {isOpen ? (
        <div className="absolute left-0 z-50 flex flex-col gap-4 rounded-[30px] border-4 border-off-black bg-white p-8 text-base font-medium">
          <GeneratorControls>
            <DownloadAnimationButton>
              <Button className="p-1.5 font-semibold uppercase">
                Save as SVG
              </Button>
            </DownloadAnimationButton>
          </GeneratorControls>
        </div>
      ) : null}
    </div>
  );
};

const Nav = ({ sectionProps, ...props }: NavProps) => {
  return (
    <nav {...props} className={cn("flex gap-8", props.className)}>
      <div {...sectionProps} className={cn("flex", sectionProps?.className)}>
        <GeneratorDropdown />
        {links.map((link) => {
          return <NavLink key={String(link.href)} {...link} />;
        })}
      </div>
      <div {...sectionProps} className={cn("flex", sectionProps?.className)}>
        {socials.map((link) => {
          return <NavLink key={String(link.href)} {...link} />;
        })}
      </div>
    </nav>
  );
};

export const MainHeader = (
  props: Omit<HTMLProps<HTMLDivElement>, "children" | "ref">,
) => {
  const [navOpen, setNavOpen] = useState(false);
  useNavigationChange(() => setNavOpen(false));

  return (
    <header
      {...props}
      className={cn(
        "container z-10 flex items-start pt-6 br:pt-7",
        fontDisplay.className,
        props.className,
      )}
    >
      <Nav className="max-br:hidden" />

      <Link className="ml-auto hover:contrast-200 max-br:hidden" href="/">
        <img
          alt="ZEZ logo"
          className="h-[100px] max-br:hidden"
          src={ImageZezLogo.src}
        />
      </Link>

      <div className="flex flex-col br:hidden">
        <NavLink label="menu" onClick={() => setNavOpen((open) => !open)} />
        <GeneratorDropdown />
        <AppDrawer showCloseButton open={navOpen} onChange={setNavOpen}>
          <div className="flex w-full flex-col bg-white text-off-black">
            <Nav
              className="flex-col"
              sectionProps={{
                className: "flex-col",
              }}
            />
          </div>

          <div className="mb-[18px] mt-auto">
            <Link
              className="ml-auto flex justify-end hover:contrast-200"
              href="/"
            >
              <img alt="ZEZ logo" className="h-[76px]" src={ImageZezLogo.src} />
            </Link>
          </div>
        </AppDrawer>
      </div>
    </header>
  );
};
