"use client";

import {
  ArrowUpRightIcon,
  CopyIcon,
  FileUserIcon,
  HomeIcon,
  LaptopIcon,
  MailIcon,
  MoonIcon,
  PhoneIcon,
  SearchIcon,
  SunIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";
import { PORTFOLIO_SECTION_LINKS } from "@/features/portfolio/constants/sections";
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links";
import { USER } from "@/features/portfolio/data/user";
import { trackEvent } from "@/lib/events";
import { cn } from "@/lib/utils";
import {
  decodeEmail,
  decodePhoneNumber,
  formatPhoneNumber,
} from "@/utils/string";

type ThemeMode = "light" | "dark" | "system";

const SOCIAL_ITEMS = SOCIAL_LINKS.filter((item) =>
  item.href.startsWith("http")
);

export function CommandMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme } = useTheme();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const email = useMemo(() => decodeEmail(USER.email), []);
  const phoneNumber = useMemo(() => decodePhoneNumber(USER.phoneNumber), []);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setSearch("");
    }
  };

  const openMenuFromKeyboard = useCallback((shortcut: string) => {
    setOpen(true);
    trackEvent({
      name: "open_command_menu",
      properties: { method: "keyboard", key: shortcut },
    });
  }, []);

  useHotkeys(
    "ctrl+k",
    (event) => {
      event.preventDefault();
      openMenuFromKeyboard("ctrl+k");
    },
    [openMenuFromKeyboard]
  );

  useHotkeys(
    "meta+k",
    (event) => {
      event.preventDefault();
      openMenuFromKeyboard("meta+k");
    },
    [openMenuFromKeyboard]
  );

  useEffect(() => {
    if (!open) return;

    const query = search.trim();
    if (!query) return;

    const timeoutId = window.setTimeout(() => {
      trackEvent({
        name: "command_menu_search",
        properties: {
          query,
          query_length: query.length,
        },
      });
    }, 500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [open, search]);

  const onOpenFromClick = () => {
    setOpen(true);
    trackEvent({
      name: "open_command_menu",
      properties: { method: "click" },
    });
  };

  const onNavigate = (href: string, openInNewTab: boolean) => {
    trackEvent({
      name: "command_menu_action",
      properties: {
        action: "navigate",
        href,
        open_in_new_tab: openInNewTab,
      },
    });

    if (openInNewTab) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      router.push(href);
    }

    handleOpenChange(false);
  };

  const onNavigateToSection = (sectionId: string) => {
    const href = `/#${sectionId}`;

    trackEvent({
      name: "command_menu_action",
      properties: {
        action: "navigate",
        href,
        open_in_new_tab: false,
      },
    });

    if (pathname === "/" || pathname === "/index") {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", href);
      } else {
        router.push(href);
      }
    } else {
      router.push(href);
    }

    handleOpenChange(false);
  };

  const onCopy = async ({ text, label }: { text: string; label: string }) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied`);
      trackEvent({
        name: "command_menu_action",
        properties: { action: "copy", text },
      });
    } catch {
      toast.error(`Could not copy ${label.toLowerCase()}`);
    }

    handleOpenChange(false);
  };

  const onThemeChange = (theme: ThemeMode) => {
    setTheme(theme);
    trackEvent({
      name: "command_menu_action",
      properties: { action: "change_theme", theme },
    });
    toast.success(`Theme changed to ${theme}`);
    handleOpenChange(false);
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={onOpenFromClick}
        className={cn(
          "h-8 gap-1.5 rounded-md border-edge px-2 font-mono text-xs text-muted-foreground",
          "hover:text-foreground",
          "max-sm:size-8 max-sm:px-0"
        )}
        aria-label="Open command menu"
      >
        <SearchIcon className="size-3.5" />
        <span className="max-sm:sr-only">Quick Actions</span>
        <Kbd className="h-4 min-w-0 px-1 text-[10px] max-sm:hidden">
          Ctrl/Cmd+K
        </Kbd>
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={handleOpenChange}
        title="Quick Actions"
        description="Navigate, open links, copy contact info, and switch theme."
      >
        <CommandInput
          placeholder="Search sections, links, and actions..."
          value={search}
          onValueChange={setSearch}
        />

        <CommandList>
          <CommandEmpty>No matching command found.</CommandEmpty>

          <CommandGroup heading="Navigate">
            <CommandItem onSelect={() => onNavigate("/", false)}>
              <HomeIcon />
              Home
              <CommandShortcut>Enter</CommandShortcut>
            </CommandItem>

            {PORTFOLIO_SECTION_LINKS.map((section) => (
              <CommandItem
                key={section.id}
                onSelect={() => onNavigateToSection(section.id)}
              >
                <ArrowUpRightIcon />
                Go to {section.label}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Profiles">
            {SOCIAL_ITEMS.map((item) => (
              <CommandItem
                key={item.title}
                onSelect={() => onNavigate(item.href, true)}
              >
                <ArrowUpRightIcon />
                Open {item.title}
                <CommandShortcut>New Tab</CommandShortcut>
              </CommandItem>
            ))}

            <CommandItem onSelect={() => onNavigate("/vcard", true)}>
              <FileUserIcon />
              Download vCard
              <CommandShortcut>New Tab</CommandShortcut>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Contact">
            <CommandItem
              onSelect={() => onCopy({ text: email, label: "Email" })}
            >
              <MailIcon />
              Copy Email ({email})
              <CommandShortcut>
                <CopyIcon className="size-3" />
              </CommandShortcut>
            </CommandItem>

            <CommandItem
              onSelect={() => onCopy({ text: phoneNumber, label: "Phone" })}
            >
              <PhoneIcon />
              Copy Phone ({formatPhoneNumber(phoneNumber)})
              <CommandShortcut>
                <CopyIcon className="size-3" />
              </CommandShortcut>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => onThemeChange("light")}>
              <SunIcon />
              Light Theme
            </CommandItem>
            <CommandItem onSelect={() => onThemeChange("dark")}>
              <MoonIcon />
              Dark Theme
            </CommandItem>
            <CommandItem onSelect={() => onThemeChange("system")}>
              <LaptopIcon />
              System Theme
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
