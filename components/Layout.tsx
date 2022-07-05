import React from "react";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { Header, MobileSideBar, SideBar } from "components";
import { SectionHeader } from "common/components";
import { defaultGridTemplate } from "common/styles";
import { breakpoints, Media } from "lib/utils";

const BodyContainer = styled.div`
  display: grid;
  grid-template-areas: "header header";
  grid-template-columns: auto 1fr;
  ${breakpoints.at("sm")} {
    grid-template-columns: auto 0px;
  }
`;

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Media at="sm">
        <MobileSideBar />
      </Media>
      <BodyContainer>
        <Header />
        <Media greaterThan="sm">
          <SideBar />
        </Media>
        {children}
      </BodyContainer>
    </>
  );
};

interface IPageContainerProps {
  width?: number;
  ignoreDefaultTopPadding?: boolean;
}

type IPageLayout = IPageContainerProps &
  (
    | {
        title: string;
        description?: string;
      }
    | {
        title?: never;
        description?: never;
      }
  ) & {
    width?: number;
    ignoreDefaultTopPadding?: boolean;
  };

const PageContainer = styled.div<IPageContainerProps>`
  width: 100%;
  align-self: start;
  ${({ width = 1140 }) => css`
    --container-width: ${width}px;
    ${defaultGridTemplate}
  `}
  * {
    grid-column: 2 / 2;
  }
  ${({ ignoreDefaultTopPadding }) =>
    ignoreDefaultTopPadding ||
    css`
      padding-top: 36px;
      ${breakpoints.at("sm")} {
        padding-top: 24px;
      }
    `}
`;

const PageLayout = ({
  title,
  description,
  children,
  width,
  ignoreDefaultTopPadding,
}: React.PropsWithChildren<IPageLayout>) => {
  return (
    <LayoutWrapper>
      <PageContainer {...{ width, ignoreDefaultTopPadding }}>
        {title && (
          <SectionHeader>
            <SectionHeader.Title>{title}</SectionHeader.Title>
            {description && (
              <SectionHeader.Description>
                {description}
              </SectionHeader.Description>
            )}
          </SectionHeader>
        )}
        {children}
      </PageContainer>
    </LayoutWrapper>
  );
};

export const DefaultPageLayout = ({
  children,
}: React.PropsWithChildren<IPageLayout>) => {
  return (
    <LayoutWrapper>
      <PageContainer>{children}</PageContainer>
    </LayoutWrapper>
  );
};

export const createPageLayout =
  // eslint-disable-next-line react/display-name
  (options?: IPageLayout) => (page: React.ReactElement) =>
    React.createElement(PageLayout, options, page);
