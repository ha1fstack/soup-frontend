import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  useEditor,
  EditorContent,
  Editor as TipTapEditor,
  Content,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Box, Button, ButtonLink, Flex, Input } from "common/atoms";
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
  MdOutlineSmartDisplay,
  MdOutlineSplitscreen,
  MdOutlineUndo,
} from "react-icons/md";
import { Youtube } from "lib/tiptap";
import { useForm, UseFormSetValue } from "react-hook-form";
import { useEffect, useState, useLayoutEffect } from "react";
import { IArticleData } from "types";
import { breakpoints, tiptapStyleConfig } from "lib/utils";
import Portal from "./Portal";
import Link from "@tiptap/extension-link";

const ButtonElem = styled.button<{
  active?: boolean;
}>`
  border-radius: 4px;
  padding: 6px;
  :disabled {
    color: var(--outline);
  }
  // border: 1px solid var(--outline);
  ${({ active }) =>
    active &&
    css`
      background-color: var(--background);
      outline: 1px solid var(--outline);
    `};
`;

const ButtonGroup = styled(Flex)`
  font-size: 1.4rem;
  border-radius: 4px;
  // padding: 4px;
  // border: 1px solid var(--outline);
`;

const EditorButton = ({
  onMouseDown,
  ...props
}: React.ComponentProps<typeof ButtonElem>) => {
  return (
    <ButtonElem
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        if (onMouseDown) onMouseDown(e);
      }}
      {...props}
    />
  );
};

const MenuBar = ({ editor }: { editor: TipTapEditor | null }) => {
  const [showImagePopupState, setShowImagePopupState] = useState(false);

  if (!editor) {
    return null;
  }

  const addImage = () => {
    setShowImagePopupState(true);
  };

  const addYoutube = () => {
    const url = window.prompt("Youtube Link");

    if (!url) return;
    const regex =
      /(?:.+)(?:\.be\/|v=)([a-zA-Z0-9|_|-]+?)(?:&|$)(?:t=)?(\d+m\ds|\d+)?/;
    const [_, v, time] = url?.match(regex) || [null, null];
    if (!v) return;

    if (url) {
      editor
        .chain()
        .focus()
        .setYoutube({
          src: `https://www.youtube.com/embed/${v}${
            time ? `start${time}` : ""
          }`,
        })
        .run();
    }
  };

  const UploadImage = ({}) => {
    const {
      register,
      getValues,
      trigger,
      formState: { errors },
    } = useForm<{
      url: string;
    }>({
      mode: "all",
    });

    useEffect(() => {
      trigger();
    }, [trigger]);

    const submit = () => {
      const url = getValues("url");
      editor.chain().focus().setImage({ src: url }).run();
      setShowImagePopupState(false);
    };

    return (
      <Portal at="#editor">
        <div
          css={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            width: "100%",
            height: "100%",
          }}
        >
          <Box column css={{ gap: "12px", width: "300px" }}>
            <p>이미지 첨부</p>
            <ButtonLink href={"https://imgur.com/upload"} target="_blank">
              Imgur에 업로드하기
            </ButtonLink>
            <Input
              {...register("url", {
                validate: (value) => value.startsWith("https://i.imgur.com/"),
              })}
              placeholder="Imgur 이미지 URL 입력..."
            />
            <p css={{ fontSize: "1.2rem", color: "var(--negative2)" }}>
              * https://i.imgur.com/~ 형식으로 입력해 주세요 <br />* 모바일
              환경에서는 Imgur을 데스크탑 버전으로 이용해 주세요
            </p>
            <Button
              disabled={!!errors.url}
              variant="primary-outlined"
              onClick={submit}
            >
              확인
            </Button>
          </Box>
          <div
            css={{
              position: "absolute",
              backdropFilter: "blur(8px)",
              borderRadius: "8px",
              width: "100%",
              height: "100%",
              zIndex: -1,
            }}
            onClick={() => setShowImagePopupState(false)}
          ></div>
        </div>
      </Portal>
    );
  };

  return (
    <>
      {showImagePopupState && <UploadImage />}
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
        <ButtonGroup>
          <EditorButton onClick={addImage}>
            <MdOutlineImage />
          </EditorButton>
          <EditorButton onClick={addYoutube}>
            <MdOutlineSmartDisplay />
          </EditorButton>
        </ButtonGroup>
        <ButtonGroup>
          <EditorButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
          >
            <MdOutlineFormatBold />
          </EditorButton>
          <EditorButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
          >
            <MdOutlineFormatItalic />
          </EditorButton>
          <EditorButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive("strike")}
          >
            <MdOutlineFormatStrikethrough />
          </EditorButton>
          <EditorButton
            onClick={() => editor.chain().focus().unsetAllMarks().run()}
          >
            <MdOutlineFormatClear />
          </EditorButton>
        </ButtonGroup>
        <ButtonGroup>
          <EditorButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            active={editor.isActive("heading", { level: 1 })}
          >
            <MdOutlineLooksOne />
          </EditorButton>
          <EditorButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            active={editor.isActive("heading", { level: 2 })}
          >
            <MdOutlineLooksTwo />
          </EditorButton>
        </ButtonGroup>
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
        <ButtonGroup>
          <EditorButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
          >
            <MdOutlineFormatListBulleted />
          </EditorButton>
          <EditorButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
          >
            <MdOutlineFormatListNumbered />
          </EditorButton>
          <EditorButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive("codeBlock")}
          >
            <MdOutlineCode />
          </EditorButton>
          <EditorButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
          >
            <MdOutlineFormatQuote />
          </EditorButton>
          <EditorButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <MdOutlineHorizontalRule />
          </EditorButton>
        </ButtonGroup>
        <ButtonGroup>
          <EditorButton
            onClick={() => editor.chain().focus().setHardBreak().run()}
          >
            <MdOutlineSplitscreen />
          </EditorButton>
          <EditorButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <MdOutlineUndo />
          </EditorButton>
          <EditorButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <MdOutlineRedo />
          </EditorButton>
        </ButtonGroup>
      </Flex>
    </>
  );
};

export const Editor = ({
  setValue,
  initialContent,
}: {
  setValue: UseFormSetValue<IArticleData>;
  initialContent?: Content;
}) => {
  const editor = useEditor({
    onBlur({ editor }) {
      setValue("content", editor?.getJSON());
    },
    // onUpdate({ editor }) {
    //   setValue("content", editor?.getJSON());
    // },
    extensions: [
      StarterKit,
      Image,
      Youtube,
      Link.configure({
        autolink: true,
        openOnClick: false,
      }),
    ],
    parseOptions: {
      preserveWhitespace: "full",
    },
    content: initialContent,
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
    <>
      <Flex
        id="editor"
        column
        css={{
          position: "relative",
          ".ProseMirror": css(tiptapStyleConfig, { minHeight: "600px" }),
        }}
      >
        <div
          css={{
            padding: "12px",
            [breakpoints.at("sm")]: { padding: "12px 0px" },
          }}
        >
          <div
            css={{
              position: "sticky",
              top: "59px",
              [breakpoints.at("sm")]: {
                top: "54px",
              },
              zIndex: 1,
              borderBottom: "1px solid var(--outline)",
              padding: "12px 0px",
              marginTop: "-12px",
              marginBottom: "12px",
            }}
          >
            <div
              css={{
                marginTop: "-12px",
                position: "absolute",
                backgroundColor: "var(--positive)",
                width: "100%",
                height: "100%",
                opacity: 0.95,
                zIndex: -1,
              }}
            />
            <MenuBar editor={editor} />
          </div>
          <EditorContent css={{ padding: "0px 4px" }} editor={editor} />
        </div>
      </Flex>
      {/* <div css={{ whiteSpace: "break-spaces" }}>
        {JSON.stringify(editor?.getText())}
      </div> */}
    </>
  );
};
