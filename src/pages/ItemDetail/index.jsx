import React from "react";
import "./ItemDetail.scss";
import { poster } from "../../assets";
import { Icon, InlineIcon } from "@iconify/react";
import calendarWeekFill from "@iconify/icons-bi/calendar-week-fill";
import circleFill from "@iconify/icons-bi/circle-fill";
import filePaper2Fill from "@iconify/icons-ri/file-paper-2-fill";
import { Comments, Line } from "../../components";
import Markdown from 'react-markdown'
import gfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { coldarkDark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism'

function ItemDetail() {

  // Syntax highlighting gawe <Markdown><pre>
  const components = {
    code({node, inline, className, children, ...props}) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter className="codeblock" style={theme} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    }
  }
  
  // Isine markdown
  const description = `
  # Hai!
  ## h2
  ### h3
  > blockquote
  paragraph:
  Lorem ipsum dolor sit, amet consectetur adipisicing elit.    
      
  Ipsa ad aliquam natus officia ab, quo doloribus aspernatur totam maxime ea, commodi blanditiis ullam! Blanditiis, adipisci minima? Suscipit beatae dolores repudiandae.

  &nbsp;
  
  Sanitation check  
  <img onerror="javascript:alert('ok')" src="yes">
  
  * [ ] tidak
  * [x] ya
   
  tabel  
  | Header1 | Header2  | Header3 |
  --- | --- | ---
  | data1 |data2 |data3 |
  | data11|data12|data13|

  *italic* _italic2_ **bold** ~strikethru~

  [Link](http://localhost:3000/)
  ![Contoh pelarangan penggunaan gambar](http://localhost:3000/promotin/static/media/poster.095d39ca.jpg)

  Kita dapat menggunakan \` \`\`\` \` yang dilanjutkan dengan nama bahasa untuk menulis kode.  
  Misal: \` \`\`\`jsx \`
  \`\`\`jsx
  import React from 'react';
  import './App.css';
  
  function App() {
    return (
      <div className="App">
             Hello World!
      </div>
    );
  }
  
  export default App;
  \`\`\`

  👍
  `

  return (
    <div className="id-container">
      <div className="id-wrapper">
        <img src={poster} alt="poster" className="poster" />
        <div className="content-wrapper">
          <h1 className="id-title">Lomba Poster</h1>
          <div className="id-tag">
            <Icon icon={circleFill} className="c-f" />
            <a href="#">lomba</a>
            <Icon icon={circleFill} className="c-f" />
            <a href="#">Digital Art</a>
          </div>

          <Line width={100} />

          <h3 className="tgl-pelaksanaan">
            <Icon icon={calendarWeekFill} /> Tanggal Pelaksanaan
          </h3>
          <div className="tgl-pel-detail">
            <div className="dari">
              <p className="ket">Dari</p>
              <p className="ket-det">3 Agustus 2021</p>
            </div>

            <div className="sampai">
              <p className="ket">Sampai</p>
              <p className="ket-det">18 Agustus 2021</p>
            </div>
          </div>

          <h3 className="detail-event">
            <Icon icon={filePaper2Fill} /> Detail Event
          </h3>

          <section style={{width: '100%'}}>
            <Markdown className="md-content" disallowedElements={["img", "media", "script", "style"]} remarkPlugins={[gfm]} children={description} components={components} />
          </section>
          <button className="add-fav">Tambahkan ke Favorit</button>
        </div>
      </div>

      <div className="comment">
        <Comments />
      </div>
    </div>
  );
}

export default ItemDetail;
