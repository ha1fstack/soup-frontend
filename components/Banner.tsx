import Image from "next/image";
import { css } from "@emotion/react";
import { Label, Flex } from "common/components";
import { breakpoints } from "lib/utils";
import React from "react";

export const Banner = React.memo(
  ({
    color,
    backgroundColor,
    label,
    title,
    description,
  }: {
    color: string;
    backgroundColor: string;
    label: string;
    title: React.ReactNode;
    description?: React.ReactNode;
  }) => {
    const styles = {
      Wrapper: css`
        display: grid;
        grid-template-columns:
          1fr min(100%, var(--container-width)) minmax(
            0px,
            calc(1188px - var(--container-width))
          )
          1fr;
        background-color: ${backgroundColor};
        color: ${color};
        height: 300px;
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
        grid-column: 2;
        height: 100%;
        align-items: center;
        justify-content: space-between;
        position: relative;
        ${breakpoints.at("sm")} {
          padding-left: 16px;
          padding-right: 16px;
        }
        padding-left: 36px;
        padding-right: 36px;
      `,
      BannerContentWrapper: css`
        padding-top: 48px;
        padding-bottom: 48px;
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
        right: 0;
        z-index: 1;
        height: 100%;
        width: 100%;
        & > * {
          width: 100% !important;
          height: 100% !important;
          img {
            object-fit: contain;
            object-position: right;
          }
        }
      `,
    };

    const BannerLabel = () => (
      <Label variant="primary" size="freeform" css={styles.BannerBadge}>
        {label}
      </Label>
    );
    const BannerImage = () => (
      <Image
        alt="front-banner"
        src="https://i.imgur.com/7FfQL9b.png"
        width="240"
        height="240"
      />
    );

    return (
      <div css={styles.Wrapper}>
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
