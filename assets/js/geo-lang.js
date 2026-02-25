/**
 * Geo-based language redirect for FUI site.
 * Fetches visitor country and redirects to the matching language:
 * Russia/CIS -> ru, China/TW/HK -> cn, Spanish-speaking -> es, default -> en.
 * Only used on the root index.html entry page.
 */
(function(){
  var LANG_PATHS = { en: 'en', cn: 'cn', ru: 'ru', es: 'es' };
  var LANG_BY_COUNTRY = {
    ru: ['RU','BY','KZ','KG','TJ','TM','UZ','AZ','AM','MD'],
    cn: ['CN','TW','HK','MO'],
    es: ['ES','MX','AR','CO','CL','PE','VE','EC','GT','CU','BO','DO','PY','HN','SV','NI','CR','PA','UY','PR']
  };
  var ES_ONLY = ['ES','MX','AR','CO','CL','PE','VE','EC','GT','CU','BO','DO','PY','HN','SV','NI','CR','PA','UY','PR'];
  var EN_COUNTRIES = ['US','GB','AU','CA','IE','NZ','IN','ZA','NG','PH','SG','MY'];

  function getLangFromCountry(countryCode) {
    if (!countryCode) return 'en';
    var cc = countryCode.toUpperCase();
    if (LANG_BY_COUNTRY.cn.indexOf(cc) !== -1) return 'cn';
    if (LANG_BY_COUNTRY.ru.indexOf(cc) !== -1) return 'ru';
    if (ES_ONLY.indexOf(cc) !== -1) return 'es';
    if (EN_COUNTRIES.indexOf(cc) !== -1) return 'en';
    return 'en';
  }

  function redirectToLang(lang) {
    var path = LANG_PATHS[lang] || 'en';
    var base = window.location.pathname.replace(/\/?index\.html?$/, '').replace(/\/?$/, '');
    var target = (base ? base + '/' : '') + path + '/index.html';
    window.location.replace(target);
  }

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://ipapi.co/json/', true);
  xhr.timeout = 4000;
  xhr.onload = function() {
    try {
      var data = JSON.parse(xhr.responseText);
      var country = data.country_code || data.country || '';
      var lang = getLangFromCountry(country);
      redirectToLang(lang);
    } catch (e) {
      redirectToLang('en');
    }
  };
  xhr.onerror = xhr.ontimeout = function() {
    redirectToLang('en');
  };
  xhr.send();
})();
