import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Youtube } from "lib/tiptap";
import { tiptapStyleConfig } from "lib/utils";
import Link from "@tiptap/extension-link";

export const Viewer = ({
  content,
  ...props
}: Omit<React.HTMLProps<HTMLDivElement>, "content"> & {
  content: JSONContent;
}) => {
  const editor = useEditor({
    editable: false,
    extensions: [
      StarterKit,
      Image,
      Youtube,
      Link.configure({
        autolink: true,
      }),
    ],
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
        width: "100%",
        ".ProseMirror": tiptapStyleConfig,
      }}
      {...props}
    >
      <EditorContent editor={editor} />
    </div>
  );
};
