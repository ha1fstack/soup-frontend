import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { MouseEventHandler } from "react";
import {
  MdOutlineChevronLeft,
  MdOutlineChevronRight,
  MdOutlineFirstPage,
  MdOutlineLastPage,
} from "react-icons/md";
import { Flex } from "./Box";

const Container = styled(Flex)`
  justify-content: center;
  align-items: center;
  padding: 4px;
  gap: 4px;
`;

const Item = styled.button<{
  current?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--negative2);
  width: 24px;
  height: 24px;
  padding: 4px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  svg {
    font-size: 16px;
  }
  :disabled {
    color: #d3d5d9;
  }
  ${({ current, theme }) =>
    current &&
    css`
      color: var(--negative);
      background-color: var(--positive);
      border: 1px solid var(--outline);
    `}
`;

export const Pagination = ({
  current,
  end,
  onClick,
  className,
}: {
  current: number;
  end: number;
  onClick: (i: number) => void;
  className?: string | undefined;
}) => {
  return (
    <Container className={className}>
      {/* <Item onClick={() => onClick(Math.max(current - 9, 1))}>
        <MdOutlineFirstPage />
      </Item> */}
      {/* <Item disabled={current <= 1} onClick={() => onClick(current - 1)}>
        <MdOutlineChevronLeft />
      </Item> */}
      {Array.from(Array(9).keys())
        .slice(0, end ? (end >= 9 ? end - current + 5 : end) : 9)
        .map((x) => x + Math.max(1, current - 4))
        .map((item) => (
          <Item
            onClick={() => onClick(item)}
            key={item}
            current={current === item}
          >
            {item}
          </Item>
        ))}
      {/* <Item disabled={current >= end} onClick={() => onClick(current + 1)}>
        <MdOutlineChevronRight />
      </Item> */}
      {/* <Item onClick={() => onClick(Math.min(current + 9, end))}>
        <MdOutlineLastPage />
      </Item> */}
    </Container>
  );
};
