import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  useEditor,
  EditorContent,
  Editor as TipTapEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import Image from "@tiptap/extension-image";
import { Box, Flex } from "styles/components/Box";
import {
  MdOutlineCode,
  MdOutlineFormatBold,
  MdOutlineFormatClear,
  MdOutlineFormatItalic,
  MdOutlineFormatListBulleted,
  MdOutlineFormatListNumbered,
  MdOutlineFormatQuote,
  MdOutlineFormatStrikethrough,
  MdOutlineHorizontalRule,
  MdOutlineImage,
  MdOutlineLooksOne,
  MdOutlineLooksTwo,
  MdOutlineRedo,
  MdOutlineSplitscreen,
  MdOutlineUndo,
} from "react-icons/md";

const ButtonElem = styled.button<{
  active?: boolean;
}>`
  font-size: 14px;
  border-radius: 4px;
  padding: 8px;
  border: 1px solid #e0e3e7;
  ${({ active }) =>
    active &&
    css`
      background-color: #e0e3e7;
    `};
`;

const Button = ({
  onMouseDown,
  ...props
}: React.ComponentProps<typeof ButtonElem>) => {
  return (
    <ButtonElem
      onMouseDown={(e) => {
        e.preventDefault();
        if (onMouseDown) onMouseDown(e);
      }}
      {...props}
    />
  );
};

const MenuBar = ({ editor }: { editor: TipTapEditor | null }) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <Flex
      css={{
        flexWrap: "wrap",
        rowGap: "8px",
        "& > *:not(:last-child)": {
          marginRight: "12px",
        },
        " & > * > *:not(:last-child)": {
          marginRight: "4px",
        },
      }}
    >
      <Flex>
        <Button onClick={addImage}>
          <MdOutlineImage />
        </Button>
      </Flex>
      <Flex>
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          <MdOutlineFormatBold />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          <MdOutlineFormatItalic />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
        >
          <MdOutlineFormatStrikethrough />
        </Button>
        <Button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          <MdOutlineFormatClear />
        </Button>
      </Flex>
      <Flex>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          active={editor.isActive("heading", { level: 1 })}
        >
          <MdOutlineLooksOne />
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor.isActive("heading", { level: 2 })}
        >
          <MdOutlineLooksTwo />
        </Button>
      </Flex>
      {/*     
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive("heading", { level: 3 })}
      >
        <MdOutlineLooks3 />
      </Button> 
      <Button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleCode().run()}
        active={editor.isActive("code")}
      >
        <MdOutlineCode />
      </Button>
      <Button
        onClick={() => editor.chain().focus().setParagraph().run()}
        active={editor.isActive("paragraph")}
      >
        paragraph
      </Button><Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        active={editor.isActive("heading", { level: 4 })}
      >
        h4
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        active={editor.isActive("heading", { level: 5 })}
      >
        h5
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        active={editor.isActive("heading", { level: 6 })}
      >
        h6
      </Button> */}
      <Flex>
        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        >
          <MdOutlineFormatListBulleted />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
        >
          <MdOutlineFormatListNumbered />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
        >
          <MdOutlineCode />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
        >
          <MdOutlineFormatQuote />
        </Button>
        <Button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <MdOutlineHorizontalRule />
        </Button>
      </Flex>
      <Flex>
        <Button onClick={() => editor.chain().focus().setHardBreak().run()}>
          <MdOutlineSplitscreen />
        </Button>
        <Button onClick={() => editor.chain().focus().undo().run()}>
          <MdOutlineUndo />
        </Button>
        <Button onClick={() => editor.chain().focus().redo().run()}>
          <MdOutlineRedo />
        </Button>
      </Flex>
    </Flex>
  );
};

export const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    // content: "<p>Hello World!</p>",
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        spellcheck: "false",
      },
    },
  });

  return (
    <Box
      variant="white"
      column
      css={{
        ".ProseMirror": {
          minHeight: "600px",
          ":focus": {
            outline: "none",
          },
        },
      }}
    >
      <MenuBar editor={editor} />
      <hr color="#e0e3e7" css={{ margin: "12px 0px" }} />
      <EditorContent editor={editor} />
    </Box>
  );
};
