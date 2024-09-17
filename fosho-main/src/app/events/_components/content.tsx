"use client";

import React from "react";
import CharacterCount from "@tiptap/extension-character-count";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { EditorContent, ReactNodeViewRenderer, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
// load all highlight.js languages
import "@/components/tiptap/styles/tiptap.scss";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import Heading from "@tiptap/extension-heading";
dayjs.extend(utc);
dayjs.extend(tz);


const Content = ({ content }: { content: string }) => {
  const [editable, setEditable] = React.useState(false);
  const editor = useEditor({
    editable,
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      TaskList,
      TaskItem,
      CharacterCount.configure({
        limit: 10000,
      }),
      Heading.configure({
        levels: [1, 2],
      })
    ],
    content: content,
  });

  return (
    <div className="prose prose-sm prose-h1:m-0 prose-p:m-0">
      <EditorContent className="editor__content" editor={editor} />
    </div>
  );
};

export default Content;
