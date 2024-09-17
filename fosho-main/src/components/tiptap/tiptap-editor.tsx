"use client";

import React from "react";
import CharacterCount from "@tiptap/extension-character-count";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { EditorContent, ReactNodeViewRenderer, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Menubar from "./menu-bar";
// load all highlight.js languages
import "./styles/tiptap.scss";
import Heading from "@tiptap/extension-heading";
const TiptapEditor = ({ onChange, content }: any) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };
  const editor = useEditor({
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
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'bg-white',
      },
    },

    content: content,
  });

  return (
    <div className="editor prose prose-sm prose-h1:m-0 prose-p:m-0">
      {editor && <Menubar editor={editor} />}
      <EditorContent
        style={{ whiteSpace: "pre-line", minHeight: "100px" }}
        className="editor__content"
        editor={editor}
      />
    </div>
  );
};

export default TiptapEditor;
