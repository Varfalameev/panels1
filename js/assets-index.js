(()=>{var t={991:t=>{(()=>{"use strict";var e,a={};e=a,Object.defineProperty(e,"__esModule",{value:!0}),e.SHOPIFY_API_KEY=e.DEVELOPMENT_PATH_PREFIX=e.GEOSERVICE_URL=e.APP_URL=e.NODE_ENV=void 0,e.NODE_ENV="production",e.APP_URL="https://skosm.klarna.com",e.GEOSERVICE_URL=`${e.APP_URL}/geolocation/v1`,e.DEVELOPMENT_PATH_PREFIX="",e.SHOPIFY_API_KEY="4439684aa13a71f0befb66b3a308e7d4",t.exports=a})()}},e={};function a(r){var i=e[r];if(void 0!==i)return i.exports;var o=e[r]={exports:{}};return t[r](o,o.exports,a),o.exports}(()=>{"use strict";let t=null;const e="shopify_osm_debug_log",r=(...a)=>{var r,i;null===t&&(t="true"===(null===(r=localStorage.getItem(e))||void 0===r?void 0:r.toLowerCase())||"true"===(null===(i=new URLSearchParams(window.location.search).get("consoleDebug"))||void 0===i?void 0:i.toLowerCase()),t?localStorage.setItem(e,String(t)):localStorage.removeItem(e)),t&&console.log("[klarna-osm]",...a)},i=t=>new Promise((e=>setTimeout(e,t)));var o=a(991);const n={"Europe/Vienna":"AT","Australia/Lord_Howe":"AU","Antarctica/Macquarie":"AU","Australia/Hobart":"AU","Australia/Currie":"AU","Australia/Melbourne":"AU","Australia/Sydney":"AU","Australia/Broken_Hill":"AU","Australia/Brisbane":"AU","Australia/Lindeman":"AU","Australia/Adelaide":"AU","Australia/Darwin":"AU","Australia/Perth":"AU","Australia/Eucla":"AU","Europe/Brussels":"BE","America/St_Johns":"CA","America/Halifax":"CA","America/Glace_Bay":"CA","America/Moncton":"CA","America/Goose_Bay":"CA","America/Blanc-Sablon":"CA","America/Toronto":"CA","America/Nipigon":"CA","America/Thunder_Bay":"CA","America/Iqaluit":"CA","America/Pangnirtung":"CA","America/Resolute":"CA","America/Atikokan":"CA","America/Rankin_Inlet":"CA","America/Winnipeg":"CA","America/Rainy_River":"CA","America/Regina":"CA","America/Swift_Current":"CA","America/Edmonton":"CA","America/Cambridge_Bay":"CA","America/Yellowknife":"CA","America/Inuvik":"CA","America/Creston":"CA","America/Dawson_Creek":"CA","America/Vancouver":"CA","America/Whitehorse":"CA","America/Dawson":"CA","Europe/Zurich":"CH","Europe/Prague":"CZ","Europe/Berlin":"DE","Europe/Busingen":"DE","Europe/Copenhagen":"DK","Europe/Madrid":"ES","Africa/Ceuta":"ES","Atlantic/Canary":"ES","Europe/Helsinki":"FI","Europe/Paris":"FR","Europe/Budapest":"HU","Europe/Rome":"IT","America/Mexico_City":"MX","America/Cancun":"MX","America/Merida":"MX","America/Monterrey":"MX","America/Matamoros":"MX","America/Mazatlan":"MX","America/Chihuahua":"MX","America/Ojinaga":"MX","America/Hermosillo":"MX","America/Tijuana":"MX","America/Santa_Isabel":"MX","America/Bahia_Banderas":"MX","Europe/Amsterdam":"NL","Arctic/Longyearbyen":"NO","Europe/Oslo":"NO","Europe/Warsaw":"PL","Europe/Lisbon":"PT","Atlantic/Madeira":"PT","Atlantic/Azores":"PT","Europe/Stockholm":"SE","Europe/Bratislava":"SK"},s="klarnaosm_user_locale";class c{constructor(t){this.midLocales=t}static getCountryFromTimeZone(){var t;const{timeZone:e}=Intl.DateTimeFormat().resolvedOptions(),a=null!==(t=n[e])&&void 0!==t?t:null;return a||r("[getCountryFromTimeZone] unsupported country or time zone",{timeZone:e}),a}static async getUsersCountry(){let t=c.getCachedUsersCountry();if(t)return r("Found users country in cache"),t;try{const e=new AbortController;setTimeout((()=>e.abort()),1500);const a=await fetch(o.GEOSERVICE_URL,{signal:e.signal});if(!a.ok)throw new Error(a.statusText);t=(await a.json()).country}catch(t){return r("[getUsersCountry] Failed",t),r("[getUsersCountry] trying to parse from time zone"),this.getCountryFromTimeZone()}return t&&c.setCachedUsersCountry(t),t}static getCachedUsersCountry(){return localStorage.getItem(s)||null}static setCachedUsersCountry(t){r("Setting users country to cache",t),localStorage.setItem(s,t)}static findLocale(t,e,a){var i,o;if(t){r("[getMatchingLocale] Valid locales for users country",t);const n=null!==(i=t[0])&&void 0!==i?i:null;let s="";if(e&&"undefined"!=typeof Shopify?(s=Shopify.locale,r("[getMatchingLocale] Using Shopify.locale",s)):navigator.language&&(s=navigator.language.slice(0,2),r("[getMatchingLocale] Using browser language",s)),s){const e=t.find((t=>t.startsWith(s)));if(e)return e}return a&&null!==(o=t.find((t=>t.startsWith("en"))))&&void 0!==o?o:n}return null}getMatchingLocale(t,e,a){if(!t||!this.midLocales)return r("[getMatchingLocale] Invalid data",t,this.midLocales),null;r("[getMatchingLocale] Available countries for merchant",a);const i=this.getFilteredLocales(a);r("[getMatchingLocale] Valid locales for merchant",i);const o=null==i?void 0:i[t];return c.findLocale(o,e,!0)}getFilteredLocales(t){if(!t)return this.midLocales;const e=new Set(t);return Object.keys(this.midLocales).reduce(((t,a)=>(e.has(a)&&(t[a]=this.midLocales[a]),t)),{})}getMatchingLocaleWithMidLocales(t,e){if(!t||!this.midLocales||0===Object.keys(this.midLocales).length)return r("[getMatchingLocale] Invalid data",t,this.midLocales),null;const a=this.midLocales[t];return c.findLocale(a,e,!1)}}const l=c;class u{constructor(t,e){this.store=t,this.productVariants=e,this.localeService=new l(t.mid_locales)}static getVariantIdFromQueryString(){const t=new URLSearchParams(window.location.search).get("variant");return t?Number.parseInt(t,10):null}async init(){var t;window.klarna_OSMP=window.klarna_OSMP||{},window.klarna_OSMP.updaterId=null!==(t=window.klarna_OSMP.updaterId)&&void 0!==t?t:0,this.injectOnSiteScripts(),this.listenForInputChange()}injectOnSiteScripts(){if(null!==document.getElementById("klarna-osm-script-tag"))return;const t="us"===this.store.endpoint?"na":this.store.endpoint;let e;e=this.store.playground_active?`https://${t}-library.playground.klarnaservices.com`:`https://${t}-library.klarnaservices.com`;try{const t=document.createElement("script");t.id="klarna-osm-script-tag",t.async=!0,t.src=`${e}/lib.js`,t.setAttribute("data-client-id",this.store.client_id);const a=document.querySelector("body");a.insertBefore(t,a.children[0])}catch(t){r("Could not add script element",t)}}listenForInputChange(){"cart"===this.currentPage&&new MutationObserver((async t=>{window.klarna_OSMP.updaterId+=1;const e=window.klarna_OSMP.updaterId;let a=5,o=[await this.getCartTotal(),void 0,void 0];const n=async()=>{const t=await this.getCartTotal();return r("Comparing amount and history",t,o),!!o.some((e=>e!==t))&&(this.updatePurchaseAmount(t),o=[t,...o.slice(0,-1)],!0)};for(;a>0&&e===window.klarna_OSMP.updaterId;)a-=1,await i(1e3),await n()})).observe(document.body,{childList:!0,subtree:!0}),"product"===this.currentPage&&new MutationObserver((t=>{this.getKlarnaPlacements().forEach((t=>{const e=String(this.getDataPurchaseAmount()||0),a=t.getAttribute("data-purchase-amount");e!==t.getAttribute("data-purchase-amount")&&(r(`amount changed to ${e} from ${a}`),t.setAttribute("data-purchase-amount",e),window.KlarnaOnsiteService.push({eventName:"refresh-placements"}))}))})).observe(document.body,{childList:!0,subtree:!0})}async updatePurchaseAmount(t=""){const e=this.getKlarnaPlacements();let a=t;a||("cart"===this.currentPage?a=await this.getCartTotal():"product"===this.currentPage&&(a=this.getDataPurchaseAmount())),r("Updating purchase amount",a),e.forEach((t=>{r("updating placement",t),t.setAttribute("data-purchase-amount",String(a))})),window.KlarnaOnsiteService.push({eventName:"refresh-placements"})}async getCartTotal(){const t=await fetch("/cart.json");if(!t.ok)throw new Error;const e=await t.json();return e.total_price?e.total_price:0}}class d extends u{constructor(t,e){super(t,e.productVariants),this.data=e,this.currentPage=e.templateName}async init(){var t,e;const a=this.getKlarnaPlacement();a.setAttribute("data-locale",await this.fetchLocale()),a.setAttribute("data-purchase-amount",this.getPurchaseAmount()),"product"===this.currentPage&&"0"===this.getPurchaseAmount()&&(null===(t=this.store.dynamic_placements)||void 0===t?void 0:t.includes(a.getAttribute("data-key")||""))&&(r("[AppBlocksInject] using fallback placement",this.store.fallback_placement),a.setAttribute("data-key",this.store.fallback_placement)),a.setAttribute("data-preloaded","true");const i=Number.isNaN(this.data.topPadding)?0:this.data.topPadding,o=Number.isNaN(this.data.bottomPadding)?0:this.data.bottomPadding;return(i>0||o>0)&&(null===(e=document.getElementById(`shopify-block-${this.data.selector.slice(12)}`))||void 0===e||e.setAttribute("style",`padding: ${i}px 0px ${o}px 0px;`)),super.init()}getPurchaseAmount(){var t;return"product"===this.currentPage?this.data.variantPrice:"cart"===this.currentPage?this.data.cartPrice:(null===(t=window.Shopify)||void 0===t?void 0:t.designMode)?"10998":"0"}async fetchLocale(){var t,e,a,i,o;if((null===(t=window.Shopify)||void 0===t?void 0:t.designMode)&&this.data.localeFallback)return this.data.localeFallback.trim();if("manual"===this.data.localeOption&&this.data.localeFallback)return r("[fetchLocale] using manual locale"),this.data.localeFallback.trim();if("geolocation"===this.data.localeOption){r("[fetchLocale] using geolocation");const t=await l.getUsersCountry(),e=this.localeService.getMatchingLocaleWithMidLocales(t,!0);return r("got matching locale",{usersCountry:t,matchingLocale:e,midLocales:this.store.mid_locales}),e}if(null===(e=window.Shopify)||void 0===e?void 0:e.designMode){const t=null===(a=this.store.mid_locales)||void 0===a?void 0:a[null===Shopify||void 0===Shopify?void 0:Shopify.country],e=t?[t]:Object.values(this.store.mid_locales);let n=null!==(o=null===(i=e[0])||void 0===i?void 0:i[0])&&void 0!==o?o:null;for(const t of e)for(const e of t)if(e.startsWith(this.data.shopLocale)){r("[fetchLocale] using locale for design mode",{locale:e,midLocales:this.store.mid_locales}),n=e;break}return n}return null}getDataPurchaseAmount(){var t,e,a,r,i,o,n,s;let c=null;const l=u.getVariantIdFromQueryString();return l&&(c=null===(t=this.productVariants)||void 0===t?void 0:t.find((t=>t.id===l))),c?c.price:null!==(s=null!==(i=null===(r=null===(a=null===(e=this.productVariants)||void 0===e?void 0:e.filter((t=>t.available)))||void 0===a?void 0:a[0])||void 0===r?void 0:r.price)&&void 0!==i?i:null===(n=null===(o=this.productVariants)||void 0===o?void 0:o[0])||void 0===n?void 0:n.price)&&void 0!==s?s:0}getKlarnaPlacement(){return document.getElementById(this.data.selector)}getKlarnaPlacements(){return[this.getKlarnaPlacement()]}}class h{constructor(t){this.storage=t,this.started=!1}static async fetchStore(){var t;if(this.store)return this.store;const e=new URL(("/app-blocks/v1/store",`${o.DEVELOPMENT_PATH_PREFIX}/app-blocks/v1/store`),o.APP_URL);e.searchParams.set("domain",null===(t=window.Shopify)||void 0===t?void 0:t.shop);const a=await fetch(e.toString());return this.store=await a.json(),this.store}static from(t){return t instanceof h?t:new h(null!=t?t:[])}async push(t){await new d(await h.fetchStore(),t).init(),window.KlarnaOnsiteService.push({eventName:"refresh-placements"})}async start(){if(!this.started){this.started=!0;for(let t=this.storage.pop();void 0!==t;t=this.storage.pop())await this.push(t)}}}var m;r("app blocks loaded"),null!==(m=window.KlarnaOnsiteService)&&void 0!==m||(window.KlarnaOnsiteService=[]),window.klarnaAppBlocksManager=h.from(window.klarnaAppBlocksManager),window.klarnaAppBlocksManager.start()})()})();