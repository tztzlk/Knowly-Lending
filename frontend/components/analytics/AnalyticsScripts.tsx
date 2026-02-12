"use client";

import Script from "next/script";

const CLARITY_ID = process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Placeholder for Microsoft Clarity and Google Analytics.
 * Set NEXT_PUBLIC_MICROSOFT_CLARITY_ID and/or NEXT_PUBLIC_GA_MEASUREMENT_ID in .env.local to enable.
 */
export function AnalyticsScripts() {
  return (
    <>
      {CLARITY_ID && (
        <Script
          id="clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${CLARITY_ID}");
`,
          }}
        />
      )}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}
    </>
  );
}
