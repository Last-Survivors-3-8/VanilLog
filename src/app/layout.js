import Script from 'next/script';
import { AuthSession } from './AuthSession';
import './globals.css';

export const metadata = {
  title: { default: 'VanilLog' },
  description: { default: 'VanilLog post page' },
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script id='ga4-script'>
          {`
          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-P3RGJ89F');
        `}
        </Script>
      </head>
      <body>
        <AuthSession>{children}</AuthSession>
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-P3RGJ89F'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
      </body>
    </html>
  );
}
