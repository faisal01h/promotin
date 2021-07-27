import React from "react";
import Markdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import "./inputDesc.scss";
import { useEffect } from "react";
import { useRef } from "react";

function InputDesc() {
  const [inputValue, setInputValue] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState("");
  const [selected, setSelected] = useState("");
  const [select, setSelect] = useState("");
  const inputField = useRef(null);

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

  const bold = () => {
    let update = "**" + selected + "**";
    console.log("update " + update);
    console.log("selected " + selected);
    let start = inputField.current.selectionStart;
    let end = inputField.current.selectionEnd;
    let val = inputField.current.value;
    if(start === end) {
      inputField.current.value = val.slice(0, start)+ '**' + val.slice(start)

    } else {
      inputField.current.value = val.slice(0, start)+ '**' + val.slice(start, end) + '**' +val.slice(end, val.length)
    }
    console.log(start, end, val);
  };

  useEffect(() => {
    console.log("ref", inputField.current.value);
  }, [selected, inputField]);

  const handleSelection = (e) => {
    let start = e.target.selectionStart;
    let end = e.target.selectionEnd;
    if(start !== end) {
      
      setSelected(select);
    }
    
  };

  function renderPreview(e) {
    if (e.target.value.length > 0) {
      setIsPreview(true);
      setPreviewContent(e.target.value);
    } else {
      setIsPreview(false);
    }
  }

  return (
    <div className="desc-container">
      <button onClick={() => bold()}>B</button>
      <textarea
        name="deskripsi"
        id="deskripsi"
        cols="30"
        rows="10"
        onChange={(e) => {
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
            <Markdown components={highlighter} children={previewContent} />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default InputDesc;
