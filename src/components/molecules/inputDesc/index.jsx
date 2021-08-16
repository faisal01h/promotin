import React from "react";
import Markdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import "./inputDesc.scss";
import { useEffect } from "react";
import { useRef } from "react";
import "emoji-mart/css/emoji-mart.css"
import emoji from 'emoji-mart/data/facebook.json'
import { NimblePicker } from "emoji-mart";

function InputDesc({ deskripsiValue, initialValue }) {
  const [inputValue, setInputValue] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState("");
  const [selected, setSelected] = useState("");
  const [select, setSelect] = useState("");
  const inputField = useRef();
  const [emojiToggle, setEmojiToggle] = useState(false);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if(initialValue) {
      inputField.current.value = initialValue
      renderPreview(inputField, 'manual')
    }
  }, [initialValue])

  useEffect(() => {
    deskripsiValue(inputValue);
  }, [inputValue]);

  const handleChange = (e) => {
    const value = e.target.value;

    setInputValue(value);
  };

  const highlighter = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          className="codeblock"
          style={theme}
          language={match[1]}
          PreTag="div"
          children={String(children).replace(/\n$/, "")}
          {...props}
        />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  const bold = (e) => {
    let start = inputField.current.selectionStart;
    let end = inputField.current.selectionEnd;
    let val = inputField.current.value;
    if (start === end) {
      inputField.current.value = val.slice(0, start) + "**" + val.slice(start);
    } else {
      let stringBuilder = val.slice(start, end).replace(/\s/g, "");

      let preSpace = "",
        postSpace = "";

      if (val.slice(start, end)[0] === " ") preSpace = " ";
      if (val.slice(start, end)[val.slice(start, end).length - 1])
        postSpace = " ";

      inputField.current.value =
        val.slice(0, start) +
        preSpace +
        "**" +
        stringBuilder +
        "**" +
        postSpace +
        val.slice(end, val.length);
    }
    renderPreview(e, "manual");
  };

  const italic = (e) => {
    let update = "*" + selected + "*";
    console.log("update " + update);
    console.log("selected " + selected);
    let start = inputField.current.selectionStart;
    let end = inputField.current.selectionEnd;
    let val = inputField.current.value;
    if (start === end) {
      inputField.current.value = val.slice(0, start) + "*" + val.slice(start);
    } else {
      let stringBuilder = val.slice(start, end).replace(/\s/g, "");

      let preSpace = "",
        postSpace = "";

      if (val.slice(start, end)[0] === " ") preSpace = " ";
      if (val.slice(start, end)[val.slice(start, end).length - 1])
        postSpace = " ";

      inputField.current.value =
        val.slice(0, start) +
        preSpace +
        "*" +
        stringBuilder +
        "*" +
        postSpace +
        val.slice(end, val.length);
    }
    renderPreview(e, "manual");
  };

  const code = (e) => {
    let update = "`" + selected + "`";
    console.log("update " + update);
    console.log("selected " + selected);
    let start = inputField.current.selectionStart;
    let end = inputField.current.selectionEnd;
    let val = inputField.current.value;
    if (start === end) {
      inputField.current.value = val.slice(0, start) + "`" + val.slice(start);
    } else {
      let stringBuilder = val.slice(start, end).replace(/\s/g, "");

      let preSpace = "",
        postSpace = "";

      if (val.slice(start, end)[0] === " ") preSpace = " ";
      if (val.slice(start, end)[val.slice(start, end).length - 1])
        postSpace = " ";

      inputField.current.value =
        val.slice(0, start) +
        preSpace +
        "`" +
        stringBuilder +
        "`" +
        postSpace +
        val.slice(end, val.length);
    }
    renderPreview(e, "manual");
  };

  const codeBlock = (e) => {
    let update = "`" + selected + "`";
    console.log("update " + update);
    console.log("selected " + selected);
    let start = inputField.current.selectionStart;
    let end = inputField.current.selectionEnd;
    let val = inputField.current.value;
    if (start === end) {
      inputField.current.value =
        val.slice(0, start) + "```javascript" + val.slice(start);
    } else {
      let stringBuilder = val.slice(start, end).replace(/\s/g, "");

      let preSpace = "",
        postSpace = "";

      if (val.slice(start, end)[0] === " ") preSpace = " ";
      if (val.slice(start, end)[val.slice(start, end).length - 1])
        postSpace = " ";

      inputField.current.value =
        val.slice(0, start) +
        preSpace +
        "```" +
        stringBuilder +
        "```" +
        postSpace +
        val.slice(end, val.length);
    }
    renderPreview(e, "manual");
  };

  const heading = (level, e) => {
    let start = inputField.current.selectionStart;
    let end = inputField.current.selectionEnd;
    let val = inputField.current.value;
    let marker = "";
    let preSpace = "  \n",
      postSpace = "";

    for (let i = 0; i < level; i++) marker += "#";

    marker += " ";

    if (start === end) {
      inputField.current.value =
        val.slice(0, start) + preSpace + marker + val.slice(start);
    } else {
      let stringBuilder = val.slice(start, end).replace(/\s/g, "");
      if (val.slice(start, end)[val.slice(start, end).length - 1])
        postSpace = " ";

      inputField.current.value =
        val.slice(0, start) +
        preSpace +
        marker +
        stringBuilder +
        postSpace +
        val.slice(end, val.length);
    }
    renderPreview(e, "manual");
  };

  const handleSelection = (e) => {
    let start = e.target.selectionStart;
    let end = e.target.selectionEnd;
    if (start !== end) {
      setSelected(select);
    }
  };

  function renderPreview(e, mode) {
    if (mode === "manual" && e.current.value.length > 0) {
      setIsPreview(true);
      setPreviewContent(e.current.value);
      setCharCount(e.current.value.length);
    } else if (e.target.value.length > 0) {
      setIsPreview(true);
      setPreviewContent(e.target.value);
      setCharCount(e.target.value.length);
    } else {
      setIsPreview(false);
      setCharCount(e.target.value.length);
    }
  }

  function printEmoji(emoji) {
    let start = inputField.current.selectionStart;
    let end = inputField.current.selectionEnd;
    let val = inputField.current.value;
    if (start === end) {
      inputField.current.value = val.slice(0, start) + emoji + val.slice(start);
    } else {
      inputField.current.value =
        val.slice(0, start) +
        emoji +
        val.slice(end, val.length);
    }
    renderPreview(inputField, "manual");
  }

  return (
    <div className="desc-container">
      
      {emojiToggle ? <NimblePicker set='apple' data={emoji} onSelect={(e) => {printEmoji(e.native)}} /> : ""}
      <textarea
        name="deskripsi"
        id="deskripsi"
        cols="30"
        rows="10"
        onChange={(e) => {
          handleChange(e);
          renderPreview(e);
        }}
        onLoad={(e) => {
          handleChange(e);
          renderPreview(e);
        }}
        onSelect={(e) => handleSelection(e)}
        ref={inputField}
      ></textarea>
      
      {isPreview ? (
        <div style={{ textAlign: "left" }}>
          Pratinjau
          <div className="form-input">
            <Markdown
              components={highlighter}
              remarkPlugins={[gfm]}
              children={previewContent}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default InputDesc;
