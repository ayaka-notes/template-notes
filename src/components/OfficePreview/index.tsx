import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import config from '@generated/docusaurus.config';


import { useState, useRef, useLayoutEffect } from "react";

export default function OfficePreview(props) {
    
    
    return (
        <BrowserOnly>
        { () => {
            // return <iframe src={"//view.officeapps.live.com/op/view.aspx?src=" + window.location.protocol + "//" + window.location.host + props.place} >这是嵌入 <a target="_blank" href="https://office.com">Microsoft Office</a> 演示文稿，由 <a target="_blank" href="https://office.com/webapps">Office</a> 提供支持。</iframe>
            // 得出移动端和桌面端的链接
            let propsPlace = props.place;
            if (propsPlace.startsWith("/") && config.baseUrl.endsWith("/")) {
                propsPlace = propsPlace.substr(1);
            }

            const targetUrl = config.baseUrl + propsPlace;

            const mobileOfficeUrl = "//view.officeapps.live.com/op/embed.aspx?src=" + window.location.protocol + "//" + window.location.host + targetUrl;
            const desktopOfficeUrl = "//view.officeapps.live.com/op/view.aspx?src=" + window.location.protocol + "//" + window.location.host + targetUrl;

            const [containerWidth, setContainerWidth] = useState(0);
            const [iframeUrl, setIframeUrl] = useState(desktopOfficeUrl);
            const iframeRef = useRef(null);
  
            useLayoutEffect(() => {
                const container = iframeRef.current.parentElement;
                const updateWidth = () => {
                    setContainerWidth(container.clientWidth);
                    if (container.clientWidth <= 610) {
                        setIframeUrl(mobileOfficeUrl);
                    }
                    else {
                        setIframeUrl(desktopOfficeUrl);
                    }
                };
            
                updateWidth();
                window.addEventListener("resize", updateWidth);
            
                return () => {
                    window.removeEventListener("resize", updateWidth);
                };
            }, [iframeRef.current]);
  

            return (
                <div>
                  {/* <iframe
                    ref={iframeRef}
                    src={iframeUrl}
                    style={{ width: `${containerWidth}px`, height: "500px" }}
                  ></iframe> */}
                  <iframe src={iframeUrl} ref={iframeRef}>这是嵌入<a target="_blank" href="https://office.com">Microsoft Office</a> 演示文稿，由 <a target="_blank" href="https://office.com/webapps">Office</a> 提供支持。</iframe>
                </div>
            );
        }}
        </BrowserOnly>
    );
}
