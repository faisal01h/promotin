import React from "react";
import Markdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import "./inputDesc.scss";
import { useEffect } from "react";
import { useRef } from "react";
import 'emoji-picker-element'

function InputDesc() {
  const [inputValue, setInputValue] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState("");
  const [selected, setSelected] = useState("");
  const [select, setSelect] = useState("");
  const inputField = useRef();
  const [emojiToggle, setEmojiToggle] = useState(false);
  const [charCount, setCharCount] = useState(0);

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
    if(start === end) {
      inputField.current.value = val.slice(0, start)+ '**' + val.slice(start)

    } else {

      let stringBuilder = val.slice(start, end).replace(/\s/g, "");

      let preSpace = '', postSpace = '';

      if(val.slice(start, end)[0] === " ") preSpace = ' '
      if(val.slice(start, end)[val.slice(start, end).length-1]) postSpace = ' ';

      inputField.current.value = val.slice(0, start) + preSpace + '**' + stringBuilder + '**' + postSpace + val.slice(end, val.length)
    }
    renderPreview(e, 'manual');
  };

  const italic = (e) => {
    let update = "*" + selected + "*"
    console.log("update " + update);
    console.log("selected " + selected);
    let start = inputField.current.selectionStart;
    let end = inputField.current.selectionEnd;
    let val = inputField.current.value;
    if(start === end) {
      inputField.current.value = val.slice(0, start)+ '*' + val.slice(start)

    } else {

      let stringBuilder = val.slice(start, end).replace(/\s/g, "");

      let preSpace = '', postSpace = '';

      if(val.slice(start, end)[0] === " ") preSpace = ' '
      if(val.slice(start, end)[val.slice(start, end).length-1]) postSpace = ' ';

      inputField.current.value = val.slice(0, start) + preSpace + '*' + stringBuilder + '*' + postSpace + val.slice(end, val.length)
    }
    renderPreview(e, 'manual');
  };

  const code = (e) => {
    let update = "`" + selected + "`"
    console.log("update " + update);
    console.log("selected " + selected);
    let start = inputField.current.selectionStart;
    let end = inputField.current.selectionEnd;
    let val = inputField.current.value;
    if(start === end) {
      inputField.current.value = val.slice(0, start)+ '`' + val.slice(start)

    } else {

      let stringBuilder = val.slice(start, end).replace(/\s/g, "");

      let preSpace = '', postSpace = '';

      if(val.slice(start, end)[0] === " ") preSpace = ' '
      if(val.slice(start, end)[val.slice(start, end).length-1]) postSpace = ' ';

      inputField.current.value = val.slice(0, start) + preSpace + '`' + stringBuilder + '`' + postSpace + val.slice(end, val.length)
    }
    renderPreview(e, 'manual');
  };

  const codeBlock = (e) => {
    let update = "`" + selected + "`"
    console.log("update " + update);
    console.log("selected " + selected);
    let start = inputField.current.selectionStart;
    let end = inputField.current.selectionEnd;
    let val = inputField.current.value;
    if(start === end) {
      inputField.current.value = val.slice(0, start)+ '```javascript' + val.slice(start)

    } else {

      let stringBuilder = val.slice(start, end).replace(/\s/g, "");

      let preSpace = '', postSpace = '';

      if(val.slice(start, end)[0] === " ") preSpace = ' '
      if(val.slice(start, end)[val.slice(start, end).length-1]) postSpace = ' ';

      inputField.current.value = val.slice(0, start) + preSpace + '```' + stringBuilder + '```' + postSpace + val.slice(end, val.length)
    }
    renderPreview(e, 'manual');
  };

  const heading = (level, e) => {
    let start = inputField.current.selectionStart;
    let end = inputField.current.selectionEnd;
    let val = inputField.current.value;
    let marker = '';
    let preSpace = '  \n', postSpace = '';

    for(let i = 0; i<level; i++) marker+= '#';
    
    marker += ' ';

    if(start === end) {
      inputField.current.value = val.slice(0, start)+ preSpace + marker + val.slice(start)

    } else {

      let stringBuilder = val.slice(start, end).replace(/\s/g, "");
      if(val.slice(start, end)[val.slice(start, end).length-1]) postSpace = ' ';

      inputField.current.value = val.slice(0, start) + preSpace + marker + stringBuilder + postSpace + val.slice(end, val.length)
    }
    renderPreview(e, 'manual');
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

  function renderPreview(e, mode) {
    if(mode === 'manual' && e.current.value.length > 0) {
      setIsPreview(true);
      setPreviewContent(e.current.value);
      setCharCount(e.current.value.length)
    } else if (e.target.value.length > 0) {
      setIsPreview(true);
      setPreviewContent(e.target.value);
      setCharCount(e.target.value.length)
    } else {
      setIsPreview(false);
      setCharCount(e.target.value.length)
    }
  }

  return (
    <div className="desc-container">
      <div className="button-row">
        <div>
          <button onClick={() => heading(1, inputField)}><b>H1</b></button>
          <button onClick={() => heading(2, inputField)}><b>H2</b></button>
          <button onClick={() => heading(3, inputField)}><b>H3</b></button>
          <button onClick={() => heading(4, inputField)}><b>H4</b></button>
          <button onClick={() => heading(5, inputField)}><b>H5</b></button>
          <button onClick={() => bold(inputField)}><b>B</b></button>
          <button onClick={() => italic(inputField)}><i>i</i></button>
          <button onClick={() => code(inputField)}><pre>#</pre></button>
          <button onClick={() => codeBlock(inputField)}><pre>[#]</pre></button>
          <button onClick={()=> {
            setEmojiToggle(!emojiToggle);
          }}>✋</button>
        </div>
        <div style={{marginRight: '5px'}} class="md-logo-wrapper">
          <span class="tooltip">Bantuan mengenai pemformatan Markdown</span>
          <svg className="md-logo" xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 0 208 128" onClick={() => window.open("https://guides.github.com/features/mastering-markdown/", '_blank')}>
            <rect width="198" height="118" x="5" y="5" ry="10" stroke="#000" stroke-width="10" fill="none"/>
            <path d="M30 98V30h20l20 25 20-25h20v68H90V59L70 84 50 59v39zm125 0l-30-33h20V30h20v35h20z"/>
          </svg>
        </div>
      </div>
      
      {
        emojiToggle ?
        <emoji-picker></emoji-picker>
        :""
      }
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
      <div className="detail-row">
        {charCount} karakter
      </div>
      {isPreview ? (
        <div style={{ textAlign: "left" }}>
          Pratinjau
          <div className="form-input">
            <Markdown components={highlighter} remarkPlugins={[gfm]} children={previewContent} />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default InputDesc;
