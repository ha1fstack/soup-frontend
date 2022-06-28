import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Youtube } from "lib/tiptap";

export const Viewer = ({
  content,
  ...props
}: Omit<React.HTMLProps<HTMLDivElement>, "content"> & {
  content: JSONContent;
}) => {
  const editor = useEditor({
    editable: false,
    extensions: [StarterKit, Image, Youtube],
    parseOptions: {
      preserveWhitespace: "full",
    },
    content: content,
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
    <div
      css={{
        ".ProseMirror": {
          ":focus": {
            outline: "none",
          },
          "& > *": {
            whiteSpace: "break-spaces",
          },
          lineHeight: 1.5,
          p: {
            marginBlockEnd: "6px",
          },
          h1: {
            fontSize: "2.4rem",
            fontWeight: "600",
            lineHeight: 2,
          },
          h2: {
            fontSize: "1.8rem",
            fontWeight: "600",
            lineHeight: 2,
          },
          pre: {
            padding: "8px",
            backgroundColor: "var(--background)",
            border: "1px solid var(--outline)",
            marginBlockStart: "12px",
            marginBlockEnd: "12px",
            borderRadius: "4px",
          },
          iframe: {
            marginBlockStart: "18px",
            marginBlockEnd: "18px",
            borderRadius: "8px",
            backgroundColor: "var(--outline)",
            width: "100%",
            maxWidth: "560px",
            height: "50vw",
            maxHeight: "315px",
          },
        },
      }}
      {...props}
    >
      <EditorContent editor={editor} />
    </div>
  );
};
