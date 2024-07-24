import Link from "next/link";
import { useRouter } from "next/router";
import { type ComponentProps, type HTMLProps, useState } from "react";
import type { UrlObject } from "url";

import ImageZezLogo from "~/assets/img/shared/zez-logo.png";
import { Button } from "~/components/base/button";
import { AppDrawer } from "~/components/base/drawer";
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

const Nav = ({ sectionProps, ...props }: NavProps) => {
  return (
    <nav {...props} className={cn("flex gap-8", props.className)}>
      <div {...sectionProps} className={cn("flex", sectionProps?.className)}>
        <NavLink className="max-br:hidden" label="generator" />
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

export const MainHeader = () => {
  const [navOpen, setNavOpen] = useState(false);
  useNavigationChange(() => setNavOpen(false));

  return (
    <header
      className={cn(
        "container flex items-center pt-6 br:pt-7",
        fontDisplay.className,
      )}
    >
      <Nav className="max-br:hidden" />

      <Link className="ml-auto hover:contrast-200 max-br:hidden" href="/">
        <img
          alt="ZEZ logo"
          className="h-20 max-br:hidden"
          src={ImageZezLogo.src}
        />
      </Link>

      <div className="block br:hidden">
        <NavLink label="menu" onClick={() => setNavOpen((open) => !open)} />
        <NavLink label="generator" />
        <AppDrawer showCloseButton open={navOpen} onChange={setNavOpen}>
          <div className="flex w-full flex-col bg-white text-black">
            <Nav
              className="flex-col"
              sectionProps={{
                className: "flex-col",
              }}
            />
          </div>

          <div className="mb-[18px] ml-[10px] mt-auto">
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
