import { useAuth } from "lib/hooks";
import { useTheme as useNextTheme } from "next-themes";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IAuthData } from "types";

const themeTransition = (ms: number) => {
  const css = document.createElement("style");
  css.appendChild(
    document.createTextNode(
      `* { transition-duration: 250ms; transition-property: background-color, outline-color, border-color; -webkit-transition-duration: 250ms; -webkit-transition-property: background-color, outline-color, border-color; }`
    )
  );
  document.head.appendChild(css);
  return () => {
    (() => window.getComputedStyle(document.body))();
    setTimeout(() => {
      document.head.removeChild(css);
    }, ms);
  };
};

export const WithThemeToggle = ({
  children,
}: {
  children: (props: { theme: string; toggleTheme: () => void }) => JSX.Element;
}) => {
  const { theme, setTheme } = useNextTheme();
  const toggleTheme = () => {
    const removeAnimation = themeTransition(250);
    setTheme(theme === "light" ? "dark" : "light");
    removeAnimation();
  };

  if (!theme) return null;
  return children({ theme, toggleTheme });
};

export const WithAuth = ({
  authorized = false,
  children,
}: {
  authorized?: boolean;
  children({
    auth,
    forbidden,
  }: {
    auth: IAuthData;
    forbidden: boolean;
  }): JSX.Element;
}) => {
  const auth = useAuth();
  const forbidden = authorized && !auth.success;

  const router = useRouter();
  useEffect(() => {
    if (forbidden)
      router.push(
        {
          pathname: "/login",
          query: {
            redirect: router.asPath,
          },
        },
        undefined,
        {
          shallow: true,
        }
      );
  }, [forbidden, router]);

  return children({ auth, forbidden });
};
