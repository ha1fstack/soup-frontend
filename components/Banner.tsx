import Image from "next/image";
import { css } from "@emotion/react";
import { Label, Flex } from "common/atoms";
import { breakpoints } from "lib/utils";
import React from "react";
import { defaultGridTemplate } from "common/styles";

export const Banner = React.memo(
  ({
    color,
    backgroundColor,
    badgeColor,
    label,
    title,
    description,
    image,
  }: {
    color: string;
    backgroundColor: string;
    badgeColor: string;
    label: string;
    title: React.ReactNode;
    description?: React.ReactNode;
    image?: string;
  }) => {
    const styles = {
      Wrapper: css`
        ${defaultGridTemplate}
        background-color: ${backgroundColor};
        color: ${color};
        height: 280px;
        ${breakpoints.at("sm")} {
          height: 200px;
        }
        margin-bottom: 0;
        z-index: -2;
        border-top: 0px;
      `,
      InnerWrapper: css`
        --banner-title: 24px;
        --banner-description: 16px;
        --banner-image-size: 240px;
        ${breakpoints.at("sm")} {
          --banner-title: 16px;
          --banner-description: 14px;
          --banner-image-size: 128px;
        }
        grid-column: 2 / 2;
        height: 100%;
        align-items: center;
        justify-content: space-between;
        position: relative;
      `,
      BannerContentWrapper: css`
        z-index: 2;
        padding-top: 36px;
        padding-bottom: 36px;
        ${breakpoints.at("sm")} {
          padding-top: 24px;
          padding-bottom: 24px;
        }
        height: 100%;
        justify-content: space-between;
        align-items: flex-start;
      `,
      BannerBadge: css`
        color: ${backgroundColor};
        background-color: ${badgeColor};
        font-weight: 700;
        font-size: var(--banner-description);
        padding: 0.5em 0.65em;
      `,
      BannerTitle: css`
        font-weight: 700;
        font-size: var(--banner-title);
      `,
      BannerDescription: css`
        font-size: var(--banner-description);
      `,
      BannerImage: css`
        position: absolute;
        right: calc(10% - 36px);
        z-index: 0;
        height: 100%;
        & > * {
          height: 100% !important;
          img {
            min-width: 2560px !important;
            object-fit: contain;
            object-position: right;
          }
        }
      `,
      BannerShadow: css`
        position: absolute;
        z-index: 1;
        height: 100%;
        width: 100%;
        opacity: 0.7;
        background: linear-gradient(
          90deg,
          ${backgroundColor} 360px,
          transparent 640px
        );
        ${breakpoints.at("sm")} {
          opacity: 0.85;
          background: linear-gradient(
            0deg,
            ${backgroundColor} 30%,
            transparent 70%
          );
        }
      `,
    };

    const BannerLabel = () => (
      <Label size="freeform" css={styles.BannerBadge}>
        {label}
      </Label>
    );
    const BannerImage = () =>
      image ? (
        <Image alt="front-banner" src={image} width="560" height="560" />
      ) : (
        <></>
      );

    return (
      <div css={styles.Wrapper}>
        <div css={styles.BannerShadow} />
        <Flex css={styles.InnerWrapper}>
          <Flex column css={styles.BannerContentWrapper}>
            <BannerLabel />
            <Flex
              column
              css={{
                gap: "12px",
                [breakpoints.at("sm")]: {
                  gap: "6px",
                },
              }}
            >
              <p css={styles.BannerTitle}>{title}</p>
              {description && (
                <p css={styles.BannerDescription}>{description}</p>
              )}
            </Flex>
          </Flex>
          <span css={styles.BannerImage}>
            <BannerImage />
          </span>
        </Flex>
      </div>
    );
  }
);
Banner.displayName = "Banner";
