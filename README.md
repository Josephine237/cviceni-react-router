     
Single-page Application (SPA)

Aplikace psané v Reactu nebo podobných frameworcích se označuji jako SPA (Single-page Applications). Je to proto, že aplikace je fakticky tvořená jednou jedinou HTML stránkou, uvnitř které se dynamicky JavaScriptem vyměňuje obsah. Výhodou takových aplikací je rychlost a plynulost navigace - uživatel nemusí čekat na načtení každé jednotlivé stránky. Snížená je obvykle i zátěž na server, kdy server pošle celou aplikaci jednou a o navigaci uvnitř se pak postará JavaScript v prohlížeči.

SPA samozřejmě mají i svoje nevýhody - například horší možnosti SEO optimalizace, delší načítání při startu aplikace, apod. Ale to je mimo rámec této lekce.
React Router

Jak udělat vícestránkovou navigaci v rámci naši "jednostránkové" aplikace (SPA)? Do naší aplikace si přidáme React Router. To je knihovna, která zařídí navigaci a přepínání komponent, které tvoří "stránky" naší aplikace. Knihovnu nainstalujeme jako závislost z NPM:

npm install react-router-dom

Z knihovny musíme do aplikace naimportovat potřebné komponenty:

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';

    <BrowserRouter> je komponenta, do které zabalíme celou naši aplikaci, aby navigace v naší aplikaci fungovala.
    <Routes> je komponenta, která v naší aplikaci vytvoří prostor, do kterého se bude umisťovat obsah komponent, které představují stránky v naší aplikaci.
    <Route> je komponenta, pomocí které definujeme stránky v naší aplikaci. V props definujeme výslednou cestu (adresu) naší stránky a také komponentu, která se pod danou adresou zobrazí.
    <Link> je pak jednoduchá komponenta, pomocí které vytváříme odkazy na jednotlivé stránky. V podstatě nahrazuje značku <a> pro navigaci uvnitř naší aplikace.

Základní struktura

Struktura naší aplikace tedy bude vypadat zhruba takto:

const App = () => {
  return (
    <BrowserRouter>
      <h1>Naše aplikace</h1>
      <Routes>
        <Route path="/" element={ <Uvod /> }>
        <Route path="/onas" element={ <Onas /> }>
        <Route path="/produkty" element={ <Produkty /> }>
      </Routes>
    </BrowserRouter>
  );
}

Pomocí prop path určujeme, pod jakou adresou bude daná stránka dostupná. Pomocí prop element nastavujeme, jaká komponenta se zobrazí, když uživatel danou adresu navštíví.

Pro navigaci mezi stránkami můžeme využít poslední zmíněnou komponentu <Link> z React Routeru. Používá se následovně:

<Link to="/produkty">Odkaz na stránku produktů</Link>

Komponenta <Link> pro navigaci v rámci aplikace v podstatě nahrazuje bežnou značku <a href="...">Odkaz</a>
Cvičení na základy React Routeru

    Cvičení 1 - Přepínání stránek

Dynamické parametry stránek

Na spoustě webů si vystačíme s několika pevně danými stránkami. Ale co třeba blog, zpravodajský web nebo e-shop, kde může být teoreticky neomezený počet článků nebo produktů? Nebudeme přeci pro každý článek vytvářet novou komponentu a separátní cestu v naší App a kompilovat celou aplikaci znovu, když přidáme produkt do e-shopu.

Stačí nám jedna komponenta, např. <Article />, která dynamicky z API načte data příslušného článku a vypíše je do připravené šablony uvnitř komponenty. Jak ale komponenta pozná, který článek má zobrazit? K tomu slouží URL parametry v cestě.
URL parametry

Určitě jste už někdy viděli v prohlížeči podobnou adresu:

https://mojestranka.cz?clanek=123

Pomocí URL parametrů dokážeme v adrese předávat stránce dodatečné informace. První parametr se od adresy odděluje pomocí otazníku ?, další parametry od sebe navzájem pomocí symbolu &. Každý parametr je tvořen dvojící klic=hodnota. V našem příkladu tak dokážeme zjistit, že chceme zobrazit článek s číslem 123.

Často se také můžeme setkat s takovouto podobou, kdy to vypadám že chceme zobrazit stránku 123 ze složky clanek na našem webu:

https://mojestranka.cz/clanek/123

Dynamickou část adresy v React Routeru nastavíme takto:

<Routes>
  <Route path="/clanek/:id" element={ <Clanek /> }>
</Routes>

Routeru tak říkáme, že má zobrazit komponentu <Clanek /> pro každou adresu, která začíná segmentem /clanek/ a za posledním lomítkem následuje něco. Toto něco je uvnitř komponenty dostupné jako parametr s názvem id.

Uvnitř komponenty k parametru přistoupíme pomocí hooku useParams, který si naimportujeme z React Routeru.

import {useParams} from 'react-router-dom';

const Clanek = () => {
  const { id } = useParams();

  return (
    <p>Zobrazujeme článek č. {id}</p>
  );
}