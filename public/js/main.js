// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Dynamic Glassmorphic Toast Notification System
function showToast(message, type = 'success') {
  const existing = document.getElementById('custom-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'custom-toast';
  toast.style.position = 'fixed';
  toast.style.bottom = '30px';
  toast.style.right = '30px';
  toast.style.padding = '1rem 2rem';
  toast.style.borderRadius = '12px';
  toast.style.backdropFilter = 'blur(16px)';
  toast.style.webkitBackdropFilter = 'blur(16px)';
  toast.style.zIndex = '9999';
  toast.style.color = '#ffffff';
  toast.style.fontFamily = 'inherit';
  toast.style.fontSize = '0.95rem';
  toast.style.fontWeight = '500';
  toast.style.boxShadow = '0 20px 40px -10px rgba(0,0,0,0.5)';
  toast.style.transform = 'translateY(50px)';
  toast.style.opacity = '0';
  toast.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
  toast.style.display = 'flex';
  toast.style.alignItems = 'center';
  toast.style.gap = '0.75rem';

  if (type === 'success') {
    toast.style.background = 'rgba(16, 185, 129, 0.15)';
    toast.style.border = '1px solid rgba(16, 185, 129, 0.35)';
    toast.style.boxShadow += ', 0 0 20px rgba(16, 185, 129, 0.15)';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10b981; font-size: 1.1rem;"></i> <span>${message}</span>`;
  } else {
    toast.style.background = 'rgba(239, 68, 68, 0.15)';
    toast.style.border = '1px solid rgba(239, 68, 68, 0.35)';
    toast.style.boxShadow += ', 0 0 20px rgba(239, 68, 68, 0.15)';
    toast.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="color: #ef4444; font-size: 1.1rem;"></i> <span>${message}</span>`;
  }

  document.body.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  }, 50);

  // Animate out
  setTimeout(() => {
    toast.style.transform = 'translateY(30px)';
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 4500);
}

// Contact form handling with async API requests
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const nameInput = document.getElementById('contactNameInput');
    const emailInput = document.getElementById('contactEmailInput');
    const messageInput = document.getElementById('contactMessageInput');
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!nameInput || !emailInput || !messageInput || !submitBtn) return;

    // Get translations for active language
    const currentLang = localStorage.getItem('lang') || 'en';
    const sendingText = translations[currentLang]?.contactSending || 'Sending...';
    const successText = translations[currentLang]?.contactSuccess || 'Message sent!';
    const errorText = translations[currentLang]?.contactError || 'Failed to send message.';
    const originalBtnText = translations[currentLang]?.contactButton || submitBtn.textContent;

    // Disable form and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = sendingText;
    submitBtn.style.opacity = '0.7';

    try {
      const actionUrl = form.getAttribute('action') || 'https://formspree.io/f/meeylqzp';
      const isFormspree = actionUrl.includes('formspree.io');

      const response = await fetch(actionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: nameInput.value,
          email: emailInput.value,
          message: messageInput.value
        })
      });

      const data = await response.json();

      if (response.ok && (isFormspree ? (data.ok !== false) : data.success)) {
        showToast(successText, 'success');
        form.reset();
      } else {
        let errMsg = errorText;
        if (isFormspree && data.errors && Array.isArray(data.errors)) {
          errMsg = data.errors.map(err => err.message).join(', ');
        } else if (data.error) {
          errMsg = data.error;
        }
        showToast(errMsg, 'error');
      }
    } catch (err) {
      console.error(err);
      showToast(errorText, 'error');
    } finally {
      // Restore form and button
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
      submitBtn.style.opacity = '1';
    }
  });
}

// Add a background darkening effect on scroll
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  if (header) {
    if (window.scrollY > 50) {
      header.style.background = 'rgba(9, 13, 22, 0.85)';
      header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.12)';
    } else {
      header.style.background = 'rgba(9, 13, 22, 0.45)';
      header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
    }
  }
});


// Global translations
const translations = {


  en: {
    title: "SwenTech | UI/UX Design & Full-Stack Engineering",
    subtitle: "SwenTech blends visual storytelling with clean code to build scalable, responsive web applications for businesses and startups.",
    statusAvailable: 'Available for new projects',
    flipBadgeBackText: "Ready to start • Let's Work Together!",
    heroCtaText: "Have a project in mind? Let's build something great together.",
    cta: 'Estimate Your Project Scope',
    navAbout: 'About',
    navServices: 'Services',
    navProjects: 'Projects',
    navContact: 'Contact',
    aboutTitle: 'About Me',
    reviewsTitle: 'What My Clients Say',
    aboutHeadline: 'I am Swen. Bringing design to life and code to reality. Let’s collaborate to build your next high-performing digital product.',
    aboutBody1: 'I am a hybrid UI/UX Designer and Full-Stack Developer with a background in Graphic Design and a software development degree from London. Because I understand typography and layout just as deeply as I understand HTML, PHP, SQL and JavaScript ... , I don\'t just design beautiful interfaces— I build scalable, production-ready digital products.',
    aboutBody2: 'My unique cross-discipline background means I can take a project from an abstract business goal, through user research and wireframing, all the way to a fully coded web application. I speak three languages fluently (English, Hungarian, and Romanian), making me an adaptable communicator who thrives in multicultural teams. I love creating digital experiences that make life easier and more enjoyable for users.',
    servicesTitle: 'Services',
    serviceWeb: 'Web Applications',
    serviceWebDesc: 'Custom responsive applications using modern frameworks.',
    serviceAPI: 'UI/UX Design',
    serviceAPIDesc: 'Beautiful, user-centered, and intuitive digital interfaces crafted with precision.',
    serviceConsult: 'Consulting',
    serviceConsultDesc: 'Technical leadership, audits, and optimization.',
    projectsTitle: 'Projects',
    project1: 'Project One',
    project1Desc: 'Description, tech stack, and results.',
    project2: 'Project Two',
    project2Desc: 'Description, tech stack, and results.',
    project3: 'Project Three',
    project3Desc: 'Description, tech stack, and results.',
    project4: 'Project Four',
    project4Desc: 'Description, tech stack, and results.',
    contactTitle: 'Contact',
    contactName: 'Your Name',
    contactEmail: 'Your Email',
    contactMessage: 'Project details',
    contactButton: 'Send Message',
    contactHeroText: 'Get in touch to discuss your project or collaboration.',
    projectsHeroText: 'Some of the projects I’ve built for startups and businesses.',
    servicesHeroText: 'High-quality professional digital solutions tailored to your business needs.',
    contactSending: 'Sending message...',
    contactSuccess: 'Your message has been sent successfully!',
    contactError: 'Failed to send your message. Please try again later.',
    prevPage: 'Previous',
    nextPage: 'Next 9',
    themeLight: 'Light mode activated',
    themeDark: 'Dark mode activated',
    pricingTitle: 'SERVICES & PRICING GUIDE',
    pricingIntro: 'I help businesses, startups, and agencies with a new app/site or turn outdated websites into modern, high-converting web applications. Because I handle UI/UX and Full-Stack code, you get a complete end-to-end solution without hiring multiple people.',
    pkgIncludes: "What’s Included:",
    pkgTimelineLabel: 'Estimated Timeline:',
    pkg1Tagline: 'Complete Overhaul',
    pkg2Tagline: 'Design Only',
    pkg3Tagline: 'Development Only',
    pkgPopular: 'Most Popular',
    pkgNoteLabel: '(Final price depends on page count, database integrations, and complex features)',
    pkg1Title: 'THE FULL WEBSITE REDESIGN',
    pkg1Subtitle: 'Ideal for businesses needing an overhaul of their existing web presence.',
    pkg1Item1Bold: 'UX Audit:',
    pkg1Item1Text: ' Analyzing performance, layout flaws, and user flow issues.',
    pkg1Item2Bold: 'UI Redesign:',
    pkg1Item2Text: ' Custom Figma wireframes, desktop/mobile visual designs.',
    pkg1Item3Bold: 'Full-Stack Build:',
    pkg1Item3Text: ' Clean, responsive frontend + secure backend code.',
    pkg1Item4Bold: 'Contact Systems:',
    pkg1Item4Text: ' Automated contact forms (SMTP / Email services setup).',
    pkg1Item5Bold: 'Performance & SEO:',
    pkg1Item5Text: ' Fast loading speeds, mobile-first design, & basic On-Page SEO.',
    pkg1Timeline: '3 – 6 Weeks',
    pkg2Title: 'UI/UX DESIGN ONLY',
    pkg2Subtitle: 'Ideal for teams or clients who already have their own developers.',
    pkg2Item1: 'Wireframes & High-Fidelity UI Screens in Figma.',
    pkg2Item2: 'Complete Design System (Color palettes, Typography, Components).',
    pkg2Item3: 'Clickable Interactive Prototype for User Testing.',
    pkg2Item4: 'Developer-Ready Handoff (Assets, Spacing, Specs).',
    pkg2Timeline: '1 – 3 Weeks',
    pkg3Title: 'FULL-STACK DEVELOPMENT ONLY',
    pkg3Subtitle: 'Ideal for designers needing a developer to bring their Figma designs to life.',
    pkg3Item1: 'Pixel-perfect conversion from Figma to code (HTML, JS, PHP, etc.).',
    pkg3Item2: 'API Integration, Database setup, and Server configuration.',
    pkg3Item3: 'Deployment to live hosting (Vercel, Render, AWS).',
    pkg3Timeline: '3 – 5 Weeks',
    hourlyRatesTitle: 'Hourly Rates',
    hourlyRatesDesc: 'For ongoing maintenance, small feature upgrades, or technical consulting:',
    hourlyRatesLabel: 'Hourly Rate:',
    hourlyRatesValue: '€47 – €67 / hour',
    retainerRatesTitle: 'Retainer Rates',
    retainerRatesDesc: 'For active priority support, regular system updates, security, and performance tuning:',
    retainerRatesLabel: 'Monthly Care Retainer:',
    retainerRatesValue: '€490 / month',
    retainerRatesNote: '(Includes 8 hours of updates, security, and hosting checks)',
    processTitle: 'HOW THE PROCESS WORKS',
    processStep1Title: 'Discovery Call',
    processStep1Desc: '(30 mins) — We review your goals, targets, and project scope.',
    processStep2Title: 'Proposal & Deposit',
    processStep2Desc: '50% upfront payment, 50% upon final delivery of work.',
    processStep3Title: 'Design & Code Sprints',
    processStep3Desc: 'Weekly check-ins, transparent iterations, and live staging previews.',
    processStep4Title: 'Launch & Handoff',
    processStep4Desc: 'We push your site live, run final QA, and deliver all complete source files.',
    ctaTitle: 'Ready to transform your website?',
    ctaDesc: "Let's collaborate to build your next modern, high-converting web application."
  },
  hu: {
    title: "SwenTech | UI/UX Design & Full-Stack Fejlesztés",
    subtitle: "SwenTech a vizuális történetmesélést ötvözi a tiszta kóddal, hogy skálázható, reszponzív webalkalmazásokat építsen vállalkozásoknak és startupoknak.",
    statusAvailable: 'Elérhető új projektekre',
    flipBadgeBackText: 'Készen az indulásra • Dolgozzunk együtt!',
    heroCtaText: "Van egy projektötleted? Építsünk valami nagyszerűt együtt!",
    cta: 'Becsülje meg a projekt terjedelmét',
    navAbout: 'Rólam',
    navServices: 'Szolgáltatások',
    navProjects: 'Projektek',
    navContact: 'Kapcsolat',
    aboutTitle: 'Rólam',
    reviewsTitle: 'Mit mondanak az ügyfelek',
    aboutHeadline: 'Swen vagyok. Életre keltem a dizájnt és valósággá formálom a kódot. Dolgozzunk együtt a következő nagy teljesítményű digitális termékeden!',
    aboutBody1: 'Hibrid UI/UX tervező és Full-Stack fejlesztő vagyok grafikus tervezői háttérrel és Londonban szerzett szoftverfejlesztői diplomával. Mivel a tipográfiát és az elrendezést ugyanolyan mélyen értem, mint a HTML-t, PHP-t, SQL-t és JavaScriptet... nemcsak gyönyörű felületeket tervezek, hanem skálázható, éles üzemre kész digitális termékeket építek.',
    aboutBody2: 'Egyedülálló, diszciplínákon átívelő hátterem azt jelenti, hogy egy projektet az absztrakt üzleti céltól a felhasználói kutatáson és drótváz-tervezésen át egészen a teljesen kódolt webalkalmazásig tudok vinni. Három nyelven beszélek folyékonyan (angolul, magyarul és románul), így alkalmazkodó kommunikátor vagyok, aki jól boldogul a multikulturális csapatokban. Imádok olyan digitális élményeket létrehozni, amelyek egyszerűbbé és élvezetesebbé teszik a felhasználók életét.',
    servicesTitle: 'Szolgáltatások',
    serviceWeb: 'Webalkalmazások',
    serviceWebDesc: 'Egyedi, reszponzív alkalmazások modern keretrendszerekkel.',
    serviceAPI: 'UI/UX Tervezés',
    serviceAPIDesc: 'Gyönyörű, felhasználóközpontú és intuitív digitális felületek tervezése nagy pontossággal.',
    serviceConsult: 'Tanácsadás',
    serviceConsultDesc: 'Műszaki vezetés, audit és optimalizáció.',
    projectsTitle: 'Projektek',
    project1: 'Projekt Egy',
    project1Desc: 'Leírás, technológiák és eredmények.',
    project2: 'Projekt Kettő',
    project2Desc: 'Leírás, technológiák és eredmények.',
    project3: 'Projekt Három',
    project3Desc: 'Leírás, technológiák és eredmények.',
    project4: 'Projekt Négy',
    project4Desc: 'Leírás, technológiák és eredmények.',
    contactTitle: 'Kapcsolat',
    contactName: 'Neved',
    contactEmail: 'E-mail címed',
    contactMessage: 'Projekt részletei',
    contactButton: 'Üzenet küldése',
     contactHeroText: 'Lépj kapcsolatba velem, hogy megbeszéljük a projektedet vagy az együttműködést.',
    projectsHeroText: 'Néhány projekt, amelyet startupok és vállalkozások számára készítettem.',
    servicesHeroText: 'Kiváló minőségű professzionális digitális megoldások az Ön vállalkozásának igényeire szabva.',
    contactSending: 'Üzenet küldése...',
    contactSuccess: 'Az üzenet sikeresen elküldve!',
    contactError: 'Nem sikerült elküldeni az üzenetet. Kérjük, próbálja meg később.',
    prevPage: 'Előző',
    nextPage: 'Következő 9',
    themeLight: 'Világos mód aktiválva',
    themeDark: 'Sötét mód aktiválva',
    pricingTitle: 'SZOLGÁLTATÁSOK ÉS ÁRAK',
    pricingIntro: 'Segítek vállalkozásoknak, startupoknak és ügynökségeknek új alkalmazások/oldalak létrehozásában, vagy az elavult webhelyek modern, magas konverziós arányú webalkalmazásokká alakításában. Mivel mind a UI/UX tervezést, mind a Full-Stack fejlesztést egy kézben tartom, teljes körű végpontok közötti megoldást kap anélkül, hogy több embert kellene felbérelnie.',
    pkgIncludes: 'A csomag tartalma:',
    pkgTimelineLabel: 'Várható időtartam:',
    pkg1Tagline: 'Teljes Újjáépítés',
    pkg2Tagline: 'Csak Design',
    pkg3Tagline: 'Csak Fejlesztés',
    pkgPopular: 'Legnépszerűbb',
    pkgNoteLabel: '(A végső ár az oldalszámtól, az adatbázis-integrációktól és az egyedi funkcióktól függ)',
    pkg1Title: 'A TELJES WEBOLDAL ÚJJÁÉPÍTÉS',
    pkg1Subtitle: 'Ideális olyan vállalkozások számára, amelyeknek a meglévő online jelenlétük teljes átalakítására van szükségük.',
    pkg1Item1Bold: 'UX Audit:',
    pkg1Item1Text: ' A teljesítmény, az elrendezési hibák és a felhasználói folyamatok elemzése.',
    pkg1Item2Bold: 'UI Újratervezés:',
    pkg1Item2Text: ' Egyedi Figma drótvázak, asztali és mobil vizuális tervek.',
    pkg1Item3Bold: 'Full-Stack Fejlesztés:',
    pkg1Item3Text: ' Tiszta, reszponzív frontend + biztonságos backend kód.',
    pkg1Item4Bold: 'Kapcsolati Rendszerek:',
    pkg1Item4Text: ' Automatizált kapcsolatfelvételi űrlapok (SMTP / Email szolgáltatások beállítása).',
    pkg1Item5Bold: 'Teljesítmény és SEO:',
    pkg1Item5Text: ' Gyors betöltési sebesség, mobilbarát kialakítás és alapvető keresőoptimalizálás (On-Page SEO).',
    pkg1Timeline: '3 – 6 hét',
    pkg2Title: 'CSAK UI/UX TERVEZÉS',
    pkg2Subtitle: 'Ideális olyan csapatok vagy ügyfelek számára, akik már rendelkeznek saját fejlesztőkkel.',
    pkg2Item1: 'Drótvázak és nagy hűségű UI felületek Figmában.',
    pkg2Item2: 'Teljes design rendszer (színpaletták, tipográfia, komponensek).',
    pkg2Item3: 'Kattintható, interaktív prototípus a felhasználói teszteléshez.',
    pkg2Item4: 'Fejlesztésre kész átadás (eszközök, térközök, specifikációk).',
    pkg2Timeline: '1 – 3 hét',
    pkg3Title: 'CSAK FULL-STACK FEJLESZTÉS',
    pkg3Subtitle: 'Ideális olyan tervezők számára, akiknek fejlesztőre van szükségük a Figma tervek életre keltéséhez.',
    pkg3Item1: 'Pixelpontos konverzió Figma tervekből kódba (HTML, JS, PHP stb.).',
    pkg3Item2: 'API integráció, adatbázis-beállítás és szerverkonfiguráció.',
    pkg3Item3: 'Élesítés élő tárhelyre (Vercel, Render, AWS).',
    pkg3Timeline: '3 – 5 hét',
    hourlyRatesTitle: 'Óradíjak',
    hourlyRatesDesc: 'Folyamatos karbantartás, kisebb funkcióbővítések vagy technikai tanácsadás esetén:',
    hourlyRatesLabel: 'Óradíj:',
    hourlyRatesValue: '47 € – 67 € / óra',
    retainerRatesTitle: 'Rendelkezésre állási díjak',
    retainerRatesDesc: 'Aktív prioritásos támogatás, rendszeres rendszerfrissítések, biztonsági és teljesítményhangolás:',
    retainerRatesLabel: 'Havi karbantartási díj:',
    retainerRatesValue: '490 € / hó',
    retainerRatesNote: '(Magában foglal 8 órányi frissítést, biztonsági és tárhely-ellenőrzést)',
    processTitle: 'HOGYAN MŰKÖDIK A FOLYAMAT',
    processStep1Title: 'Konzultáció',
    processStep1Desc: '(30 perc) — Áttekintjük a céljait, elvárásait és a projekt hatókörét.',
    processStep2Title: 'Ajánlat és előleg',
    processStep2Desc: '50% előleg a kezdéskor, 50% a végső átadáskor.',
    processStep3Title: 'Design és kód sprintek',
    processStep3Desc: 'Heti egyeztetések, átlátható iterációk és élő tesztelési felület.',
    processStep4Title: 'Indítás és átadás',
    processStep4Desc: 'Élesítjük a webhelyet, elvégezzük a végső teszteket, és átadjuk az összes forrásfájlt.',
    ctaTitle: 'Készen áll a weboldala átalakítására?',
    ctaDesc: 'Dolgozzunk együtt a következő modern, magas konverziós arányú webalkalmazásán.'
  },
  ro: {
    title: "SwenTech | Design UI/UX & Inginerie Full-Stack",
    subtitle: "SwenTech îmbină povestea vizuală cu codul curat pentru a construi aplicații web scalabile și responsive pentru companii și startup-uri.",
    statusAvailable: 'Disponibil pentru proiecte noi',
    flipBadgeBackText: 'Gata de start • Hai să lucrăm împreună!',
    heroCtaText: "Ai un proiect în minte? Hai să construim ceva grozav împreună.",
    cta: 'Estimează scopul proiectului',
    navAbout: 'Despre',
    navServices: 'Servicii',
    navProjects: 'Proiecte',
    navContact: 'Contact',
    aboutTitle: 'Despre mine',
    reviewsTitle: 'Ce spun clienții mei',
    aboutHeadline: 'Sunt Swen. Dau viață designului și transform codul în realitate. Să colaborăm pentru a construi următorul tău produs digital de înaltă performanță.',
    aboutBody1: 'Sunt un designer hibrid UI/UX și dezvoltator Full-Stack, cu un background în design grafic și o diplomă în dezvoltare software obținută la Londra. Deoarece înțeleg tipografia și layout-ul la fel de profund ca HTML, PHP, SQL și JavaScript... nu doar designez interfețe frumoase, ci construiesc produse digitale scalabile și gata de producție.',
    aboutBody2: 'Background-ul meu interdisciplinar unic înseamnă că pot prelua un proiect de la un obiectiv de business abstract, trecând prin cercetarea utilizatorilor și wireframing, până la o aplicație web complet codificată. Vorbesc fluent trei limbi (engleză, maghiară și română), fiind un comunicator adaptabil care excelează în echipe multiculturale. Îmi place să creez experiențe digitale care fac viața mai ușoară și mai plăcută pentru utilizatori.',
    servicesTitle: 'Servicii',
    serviceWeb: 'Aplicații Web',
    serviceWebDesc: 'Aplicații personalizate și responsive folosind framework-uri moderne.',
    serviceAPI: 'Design UI/UX',
    serviceAPIDesc: 'Interfețe digitale frumoase, intuitive și centrate pe utilizator, create cu precizie.',
    serviceConsult: 'Consultanță',
    serviceConsultDesc: 'Leadership tehnic, audit și optimizare.',
    projectsTitle: 'Proiecte',
    project1: 'Proiect Unu',
    project1Desc: 'Descriere, tehnologii folosite și rezultate.',
    project2: 'Proiect Doi',
    project2Desc: 'Descriere, tehnologii folosite și rezultate.',
    project3: 'Proiect Trei',
    project3Desc: 'Descriere, tehnologii folosite și rezultate.',
    project4: 'Proiect Patru',
    project4Desc: 'Descriere, tehnologii folosite și rezultate.',
    contactTitle: 'Contact',
    contactName: 'Numele tău',
    contactEmail: 'Email-ul tău',
    contactMessage: 'Detalii proiect',
    contactButton: 'Trimite mesaj',
      contactHeroText: 'Contactează-mă pentru a discuta despre proiectul tău sau o colaborare.',
    projectsHeroText: 'Câteva dintre proiectele pe care le-am realizat pentru startup-uri și companii.',
    servicesHeroText: 'Soluții digitale profesionale de înaltă calitate, adaptate nevoilor afacerii tale.',
    contactSending: 'Se trimite mesajul...',
    contactSuccess: 'Mesajul dumneavoastră a fost trimis cu succes!',
    contactError: 'Trimiterea mesajului a eșuat. Vă rugăm să încercați din nou mai târziu.',
    prevPage: 'Anterior',
    nextPage: 'Următoarele 9',
    themeLight: 'Modul luminos activat',
    themeDark: 'Modul întunecat activat',
    pricingTitle: 'GHID DE SERVICII ȘI PREȚURI',
    pricingIntro: 'Ajut companiile, startup-urile și agențiile cu aplicații/site-uri noi sau prin transformarea site-urilor învechite în aplicații web moderne și cu conversie ridicată. Deoarece mă ocup atât de designul UI/UX, cât și de codul Full-Stack, obțineți o soluție completă cap-la-cap fără a fi nevoie să angajați mai multe persoane.',
    pkgIncludes: 'Ce este inclus:',
    pkgTimelineLabel: 'Durată estimată:',
    pkg1Tagline: 'Reconstrucție Completă',
    pkg2Tagline: 'Doar Design',
    pkg3Tagline: 'Doar Dezvoltare',
    pkgPopular: 'Cel Mai Popular',
    pkgNoteLabel: '(Prețul final depinde de numărul de pagini, integrările de baze de date și complexitatea funcționalităților)',
    pkg1Title: 'RECONSTRUCȚIA COMPLETĂ A SITE-ULUI',
    pkg1Subtitle: 'Ideal pentru companiile care au nevoie de o revizuire completă a prezenței lor online existente.',
    pkg1Item1Bold: 'Audit UX:',
    pkg1Item1Text: ' Analizarea performanței, a defectelor de layout și a fluxului de utilizatori.',
    pkg1Item2Bold: 'Redesign UI:',
    pkg1Item2Text: ' Wireframe-uri personalizate în Figma, design vizual complet pentru desktop și mobil.',
    pkg1Item3Bold: 'Dezvoltare Full-Stack:',
    pkg1Item3Text: ' Cod frontend curat și responsive + cod backend securizat.',
    pkg1Item4Bold: 'Sisteme de Contact:',
    pkg1Item4Text: ' Formulare de contact automatizate (configurare servicii SMTP / Email).',
    pkg1Item5Bold: 'Performanță și SEO:',
    pkg1Item5Text: ' Viteze rapide de încărcare, design mobile-first și optimizare SEO de bază (On-Page SEO).',
    pkg1Timeline: '3 – 6 Săptămâni',
    pkg2Title: 'DOAR DESIGN UI/UX',
    pkg2Subtitle: 'Ideal pentru echipe sau clienți care au deja proprii lor dezvoltatori.',
    pkg2Item1: 'Wireframe-uri și ecrane UI de înaltă fidelitate în Figma.',
    pkg2Item2: 'Sistem complet de design (palete de culori, tipografie, componente).',
    pkg2Item3: 'Prototip interactiv și clicabil pentru testarea cu utilizatorii.',
    pkg2Item4: 'Predare pregătită pentru dezvoltatori (active, spațieri, specificații).',
    pkg2Timeline: '1 – 3 Săptămâni',
    pkg3Title: 'DOAR DEZVOLTARE FULL-STACK',
    pkg3Subtitle: 'Ideal pentru designeri care au nevoie de un dezvoltator pentru a le pune în practică design-urile din Figma.',
    pkg3Item1: 'Conversie pixel-perfect din Figma în cod (HTML, JS, PHP etc.).',
    pkg3Item2: 'Integrare API, configurare baze de date și configurare server.',
    pkg3Item3: 'Lansare pe găzduire live (Vercel, Render, AWS).',
    pkg3Timeline: '3 – 5 Săptămâni',
    hourlyRatesTitle: 'Tarife Orare',
    hourlyRatesDesc: 'Pentru întreținere continuă, upgrade-uri de funcționalități mici sau consultanță tehnică:',
    hourlyRatesLabel: 'Tarif Orar:',
    hourlyRatesValue: '47 € – 67 € / oră',
    retainerRatesTitle: 'Abonamente Lunare',
    retainerRatesDesc: 'Pentru asistență prioritară activă, actualizări periodice, securitate și optimizări de performanță:',
    retainerRatesLabel: 'Abonament lunar de mentenanță:',
    retainerRatesValue: '490 € / lună',
    retainerRatesNote: '(Include 8 ore de actualizări, verificări de securitate și de găzduire)',
    processTitle: 'CUM FUNCȚIONEAZĂ PROCESUL',
    processStep1Title: 'Apel de Descoperire',
    processStep1Desc: '(30 min) — Analizăm obiectivele, țintele și scopul proiectului dumneavoastră.',
    processStep2Title: 'Propunere și Depozit',
    processStep2Desc: 'Plată în avans de 50%, restul de 50% la livrarea finală a proiectului.',
    processStep3Title: 'Sprinturi de Design & Cod',
    processStep3Desc: 'Sesiuni săptămânale de feedback, iterații transparente și previzualizări live.',
    processStep4Title: 'Lansare și Predare',
    processStep4Desc: 'Lansăm site-ul live, efectuăm testele finale de calitate și predăm toate fișierele sursă.',
    ctaTitle: 'Sunteți gata să vă transformați site-ul?',
    ctaDesc: 'Să colaborăm pentru a construi următoarea dumneavoastră aplicație web modernă și cu conversie ridicată.'
  },
  it: {
    title: "SwenTech | UI/UX Design & Ingegneria Full-Stack",
    subtitle: "SwenTech unisce la narrazione visiva con codice pulito per creare applicazioni web scalabili e responsive per aziende e startup.",
    statusAvailable: 'Disponibile per nuovi progetti',
    flipBadgeBackText: "Pronto a partire • Lavoriamo insieme!",
    heroCtaText: "Hai un progetto in mente? Creiamo qualcosa di straordinario insieme.",
    cta: 'Calcola il preventivo del progetto',
    navAbout: 'Chi sono',
    navServices: 'Servizi',
    navProjects: 'Progetti',
    navContact: 'Contatti',
    aboutTitle: 'Chi sono',
    reviewsTitle: 'Cosa dicono i miei clienti',
    aboutHeadline: 'Sono Swen. Do vita al design e trasformo il codice in realtà. Collaboriamo per costruire il tuo prossimo prodotto digitale ad alte prestazioni.',
    aboutBody1: 'Sono un designer UI/UX ibrido e sviluppatore Full-Stack con una formazione in Graphic Design e una laurea in sviluppo software a Londra. Poiché comprendo la tipografia e il layout con la stessa profondità con cui comprendo HTML, PHP, SQL e JavaScript..., non mi limito a progettare bellissime interfacce: creo prodotti digitali scalabili e pronti per la produzione.',
    aboutBody2: 'Il mio background interdisciplinare unico mi consente di guidare un progetto da un obiettivo di business astratto, attraverso la ricerca degli utenti e il wireframing, fino a un\'applicazione web completamente programmata. Parlo fluentemente quattro lingue (inglese, ungherese, rumeno e italiano), rendendomi un comunicatore flessibile che eccelle in team multiculturali. Amo creare esperienze digitali che rendono la vita degli utenti più semplice e piacevole.',
    servicesTitle: 'Servizi',
    serviceWeb: 'Applicazioni Web',
    serviceWebDesc: 'Applicazioni responsive personalizzate realizzate con framework moderni.',
    serviceAPI: 'Design UI/UX',
    serviceAPIDesc: 'Interfacce digitali intuitive, eleganti e centrate sull\'utente realizzate con precisione.',
    serviceConsult: 'Consulenza',
    serviceConsultDesc: 'Leadership tecnica, audit e ottimizzazione.',
    projectsTitle: 'Progetti',
    project1: 'Progetto Uno',
    project1Desc: 'Descrizione, stack tecnologico e risultati.',
    project2: 'Progetto Due',
    project2Desc: 'Descrizione, stack tecnologico e risultati.',
    project3: 'Progetto Tre',
    project3Desc: 'Descrizione, stack tecnologico e risultati.',
    project4: 'Progetto Quattro',
    project4Desc: 'Descrizione, stack tecnologico e risultati.',
    contactTitle: 'Contatti',
    contactName: 'Il tuo nome',
    contactEmail: 'La tua email',
    contactMessage: 'Dettagli del progetto',
    contactButton: 'Invia messaggio',
    contactHeroText: 'Mettiti in contatto per discutere del tuo progetto o di una collaborazione.',
    projectsHeroText: 'Alcuni dei progetti che ho realizzato per startup e aziende.',
    servicesHeroText: 'Soluzioni digitali professionali di alta qualità personalizzate per la tua attività.',
    contactSending: 'Invio del messaggio in corso...',
    contactSuccess: 'Il tuo messaggio è stato inviato con successo!',
    contactError: 'Invio del messaggio non riuscito. Riprova più tardi.',
    prevPage: 'Precedente',
    nextPage: 'Successivo 9',
    themeLight: 'Modalità chiara attivata',
    themeDark: 'Modalità scura attivata',
    pricingTitle: 'GUIDA AI SERVIZI E PREZZI',
    pricingIntro: 'Aiuto aziende, startup e agenzie a creare nuove app/siti o a trasformare siti datati in applicazioni web moderne ad alta conversione. Poiché gestisco sia il design UI/UX che il codice Full-Stack, ottieni una soluzione completa senza dover assumere più persone.',
    pkgIncludes: 'Cosa è incluso:',
    pkgTimelineLabel: 'Tempistica stimata:',
    pkg1Tagline: 'Rinnovo Completo',
    pkg2Tagline: 'Solo Design',
    pkg3Tagline: 'Solo Sviluppo',
    pkgPopular: 'Il Più Richiesto',
    pkgNoteLabel: '(Il prezzo finale dipende dal numero di pagine, integrazioni di database e funzionalità complesse)',
    pkg1Title: 'RIPROGETTAZIONE COMPLETA DEL SITO WEB',
    pkg1Subtitle: 'Ideale per le aziende che necessitano di una revisione completa della propria presenza sul web.',
    pkg1Item1Bold: 'Audit UX:',
    pkg1Item1Text: ' Analisi delle prestazioni, difetti di layout e flusso utente.',
    pkg1Item2Bold: 'Redesign UI:',
    pkg1Item2Text: ' Wireframe Figma personalizzati, design visivo per desktop e mobile.',
    pkg1Item3Bold: 'Sviluppo Full-Stack:',
    pkg1Item3Text: ' Codice frontend pulito e responsive + codice backend sicuro.',
    pkg1Item4Bold: 'Sistemi di Contatto:',
    pkg1Item4Text: ' Moduli di contatto automatizzati (configurazione servizi SMTP / Email).',
    pkg1Item5Bold: 'Prestazioni e SEO:',
    pkg1Item5Text: ' Velocità di caricamento elevate, design mobile-first e SEO On-Page di base.',
    pkg1Timeline: '3 – 6 Settimane',
    pkg2Title: 'SOLO DESIGN UI/UX',
    pkg2Subtitle: 'Ideale per team o clienti che dispongono già di propri sviluppatori.',
    pkg2Item1: 'Wireframe e schermate UI ad alta fedeltà su Figma.',
    pkg2Item2: 'Design System completo (palette colori, tipografia, componenti).',
    pkg2Item3: 'Prototipo interattivo e cliccabile per i test con gli utenti.',
    pkg2Item4: 'Consegna pronta per sviluppatori (risorse, spaziatura, specifications).',
    pkg2Timeline: '1 – 3 Settimane',
    pkg3Title: 'SOLO SVILUPPO FULL-STACK',
    pkg3Subtitle: 'Ideale per designer che cercano uno sviluppatore per dare vita ai loro design Figma.',
    pkg3Item1: 'Conversione pixel-perfect da Figma a codice (HTML, JS, PHP, ecc.).',
    pkg3Item2: 'Integrazione API, configurazione database e server.',
    pkg3Item3: 'Pubblicazione su hosting live (Vercel, Render, AWS).',
    pkg3Timeline: '3 – 5 Settimane',
    hourlyRatesTitle: 'Tariffe Orarie',
    hourlyRatesDesc: 'Per manutenzione continua, piccole nuove funzionalità o consulenza tecnica:',
    hourlyRatesLabel: 'Tariffa Oraria:',
    hourlyRatesValue: '€47 – €67 / ora',
    retainerRatesTitle: 'Canoni Mensili',
    retainerRatesDesc: 'Per supporto prioritario attivo, aggiornamenti di sistema regolari, sicurezza e ottimizzazione:',
    retainerRatesLabel: 'Canone di Manutenzione Mensile:',
    retainerRatesValue: '€490 / mese',
    retainerRatesNote: '(Include 8 ore di aggiornamenti, controlli di sicurezza e hosting)',
    processTitle: 'COME FUNZIONA IL PROCESSO',
    processStep1Title: 'Chiamata Conoscitiva',
    processStep1Desc: '(30 min) — Analizziamo i tuoi obiettivi, target e ambito del progetto.',
    processStep2Title: 'Proposta e Acconto',
    processStep2Desc: '50% di acconto iniziale, 50% alla consegna finale del lavoro.',
    processStep3Title: 'Sprint di Design & Codice',
    processStep3Desc: 'Check-in settimanali, iterazioni trasparenti e anteprime in ambiente di staging live.',
    processStep4Title: 'Lancio e Consegna',
    processStep4Desc: 'Pubblichiamo il tuo sito online, eseguiamo il QA finale e consegniamo tutti i file sorgente.',
    ctaTitle: 'Pronto a trasformare il tuo sito web?',
    ctaDesc: "Collaboriamo per realizzare la tua prossima applicazione web moderna ed efficace."
  }

};

// Initialize Stylish Scroll Progress Bar
function initScrollProgressBar() {
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  });
}

// Initialize Custom Premium Language Dropdown
function initCustomLanguageDropdown() {
  const container = document.querySelector('.language-switcher');
  if (!container) return;

  const select = container.querySelector('select');
  if (!select) return;

  // Create custom dropdown container
  const dropdown = document.createElement('div');
  dropdown.className = 'custom-dropdown';

  const trigger = document.createElement('button');
  trigger.className = 'custom-dropdown-trigger';
  trigger.type = 'button';
  
  const selectedLang = select.value || 'en';
  const selectedText = select.options[select.selectedIndex]?.text || 'English';

  trigger.innerHTML = `
    <i class="fa-solid fa-globe globe-icon"></i>
    <span class="selected-text">${selectedText}</span>
    <i class="fa-solid fa-chevron-down arrow-icon"></i>
  `;

  const menu = document.createElement('ul');
  menu.className = 'custom-dropdown-menu';

  // Build custom dropdown list items
  Array.from(select.options).forEach(opt => {
    const li = document.createElement('li');
    li.className = `custom-dropdown-item ${opt.value === selectedLang ? 'active' : ''}`;
    li.setAttribute('data-value', opt.value);
    
    // Add nice flag emoji indicators for visual premium touch
    let flagIcon = '🌐';
    if (opt.value === 'en') flagIcon = '🇬🇧';
    else if (opt.value === 'hu') flagIcon = '🇭🇺';
    else if (opt.value === 'ro') flagIcon = '🇷🇴';
    else if (opt.value === 'it') flagIcon = '🇮🇹';

    li.innerHTML = `<span class="lang-flag">${flagIcon}</span> <span class="lang-name">${opt.text}</span>`;
    menu.appendChild(li);

    li.addEventListener('click', (e) => {
      e.stopPropagation();
      select.value = opt.value;
      select.dispatchEvent(new Event('change'));
      
      // Update trigger text
      trigger.querySelector('.selected-text').textContent = opt.text;
      
      // Update active list items classes
      menu.querySelectorAll('.custom-dropdown-item').forEach(item => {
        item.classList.remove('active');
      });
      li.classList.add('active');
      
      // Close dropdown
      dropdown.classList.remove('open');
    });
  });

  // Toggle custom menu on trigger click
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });

  // Close when clicking outside of the switcher
  document.addEventListener('click', () => {
    dropdown.classList.remove('open');
  });

  // Append items and hide native select
  dropdown.appendChild(trigger);
  dropdown.appendChild(menu);
  container.appendChild(dropdown);
}

// Initialize Click-Triggered Edge Navigation (No automatic timer scrolling)
function initEdgeCycling() {
  const cardsContainer = document.querySelector('.cards') || document.getElementById('projects-grid');
  if (!cardsContainer) return;

  function getCards() {
    return Array.from(cardsContainer.querySelectorAll('.card, .project-card'));
  }

  // Create or retrieve custom edge-cursor element
  let edgeCursor = document.querySelector('.edge-cursor');
  if (!edgeCursor) {
    edgeCursor = document.createElement('div');
    edgeCursor.className = 'edge-cursor';
    edgeCursor.innerHTML = '<i class="fa-solid fa-chevron-right arrow-icon"></i>';
    document.body.appendChild(edgeCursor);
  }

  let activeIndex = -1;
  let currentDirection = ''; // 'left' or 'right'

  function updateFocus() {
    const cards = getCards();
    if (activeIndex === -1 || cards.length === 0) {
      cards.forEach(card => card.classList.remove('active-focus'));
      return;
    }

    cards.forEach((card, index) => {
      if (index === activeIndex) {
        card.classList.add('active-focus');
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        card.classList.remove('active-focus');
      }
    });
  }

  function cycle(direction) {
    const cards = getCards();
    if (cards.length === 0) return;

    if (direction === 'right') {
      activeIndex = (activeIndex + 1) % cards.length;
    } else {
      activeIndex = activeIndex <= 0 ? cards.length - 1 : activeIndex - 1;
    }
    updateFocus();
  }

  // Track cursor near left/right outer viewport edges
  window.addEventListener('mousemove', (e) => {
    const screenWidth = window.innerWidth;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const isOverCard = !!e.target.closest('.card, .project-card, button, a, input, select');
    const edgeThreshold = 60; // strictly outer 60px zone
    const nearLeftEdge = mouseX <= edgeThreshold;
    const nearRightEdge = mouseX >= (screenWidth - edgeThreshold);

    edgeCursor.style.left = `${mouseX}px`;
    edgeCursor.style.top = `${mouseY}px`;

    if ((nearLeftEdge || nearRightEdge) && !isOverCard) {
      edgeCursor.classList.add('active');
      const newDirection = nearLeftEdge ? 'left' : 'right';

      if (currentDirection !== newDirection) {
        currentDirection = newDirection;
        if (newDirection === 'left') {
          edgeCursor.classList.add('left-edge');
          edgeCursor.innerHTML = '<i class="fa-solid fa-chevron-left arrow-icon"></i>';
        } else {
          edgeCursor.classList.remove('left-edge');
          edgeCursor.innerHTML = '<i class="fa-solid fa-chevron-right arrow-icon"></i>';
        }
      }
    } else {
      if (currentDirection) {
        edgeCursor.classList.remove('active');
        currentDirection = '';
      }
    }
  });

  // Manual Click: Advance slide/project on explicit user click at outer screen edge only
  window.addEventListener('click', (e) => {
    if (e.target.closest('.card, .project-card, button, a, input, select, textarea, #scroll-to-top-btn')) {
      return;
    }

    if (currentDirection) {
      cycle(currentDirection);
    }
  });
}

// Language selector handling
const languageSelect = document.getElementById('languageSelect');
if (languageSelect) {
  languageSelect.addEventListener('change', function () {
    setLanguage(this.value);
  });
}

// Theme Switcher Handling
function initThemeSwitcher() {
  // Create theme switch button
  const themeBtn = document.createElement('button');
  themeBtn.id = 'theme-toggle-btn';
  themeBtn.className = 'theme-toggle-btn';
  themeBtn.type = 'button';
  themeBtn.setAttribute('aria-label', 'Toggle Theme');

  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  } else {
    themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  // Toggle theme logic
  themeBtn.addEventListener('click', () => {
    const isLight = document.body.classList.contains('light-theme');
    const currentLang = localStorage.getItem('lang') || 'en';
    if (isLight) {
      document.body.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
      themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
      const toastMsg = translations[currentLang]?.themeDark || 'Dark mode activated';
      showToast(toastMsg, 'success');
    } else {
      document.body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
      themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
      const toastMsg = translations[currentLang]?.themeLight || 'Light mode activated';
      showToast(toastMsg, 'success');
    }
  });

  // Append theme button directly to body for fixed positioning
  document.body.appendChild(themeBtn);
}

// Set language for text and placeholders
function setLanguage(lang) {
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;

  if (languageSelect) {
    languageSelect.value = lang;
    [...languageSelect.options].forEach(opt => {
      opt.disabled = opt.value === lang;
    });

    // Sync custom dropdown text if initialized
    const customTriggerText = document.querySelector('.custom-dropdown-trigger .selected-text');
    if (customTriggerText) {
      const selectedOption = Array.from(languageSelect.options).find(opt => opt.value === lang);
      if (selectedOption) {
        customTriggerText.textContent = selectedOption.text;
      }
    }
    
    // Sync active state in custom items
    document.querySelectorAll('.custom-dropdown-item').forEach(item => {
      if (item.getAttribute('data-value') === lang) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // Update text elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update placeholder elements
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      el.setAttribute('placeholder', translations[lang][key]);
    }
  });

  // Update dynamic projects on projects page & homepage carousel
  if (typeof refreshAllProjectViews === 'function') {
    refreshAllProjectViews();
  }

  // Update dynamic reviews if we are on the about page
  if (typeof renderDynamicReviews === 'function') {
    renderDynamicReviews();
  }

  // Update dynamic services if we are on the services page
  if (typeof renderDynamicServicesPage === 'function') {
    renderDynamicServicesPage();
  }

  // Re-run slow motion animation observer for newly rendered or translated content
  if (typeof initSlowTextAnimations === 'function') {
    setTimeout(initSlowTextAnimations, 100);
  }

  if (typeof initParallaxScroll === 'function') {
    setTimeout(initParallaxScroll, 120);
  }
}

// Slow Motion Typography & Text Animation Engine
function initSlowTextAnimations() {
  const animatedSelectors = [
    '.hero p', '.page-hero p',
    '.hero-cta-lead',
    '.about-text p',
    '.card', '.project-card', '.service-card',
    '.rates-card', '.process-step', '.review-card',
    '.pricing-card', '.footer-left', '.footer-right',
    '.contact-info p', '.contact-form-card'
  ];

  const targets = document.querySelectorAll(animatedSelectors.join(', '));

  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('slow-animated'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slow-animated');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  targets.forEach((el) => {
    if (!el.classList.contains('slow-animated') && !el.classList.contains('slow-animate-init')) {
      el.classList.add('slow-animate-init');

      if (el.parentNode) {
        const siblings = Array.from(el.parentNode.children);
        const idx = siblings.indexOf(el);
        if (idx > 0 && idx <= 4) {
          el.classList.add(`slow-delay-${Math.min(idx, 4)}`);
        }
      }

      observer.observe(el);
    } else if (el.classList.contains('slow-animate-init') && !el.classList.contains('slow-animated')) {
      observer.observe(el);
    }
  });
}

// 3D Parallax Scrolling Engine (Background layers move slower than foreground titles and text)
function initParallaxScroll() {
  const heroSections = document.querySelectorAll('.hero, .page-hero');

  heroSections.forEach(hero => {
    if (!hero.querySelector('.hero-parallax-bg-layer')) {
      const bgLayer = document.createElement('div');
      bgLayer.className = 'hero-parallax-bg-layer';

      // Move parent background-image to parallax layer for smooth independent layer scroll
      const bgImg = hero.style.backgroundImage || window.getComputedStyle(hero).backgroundImage;
      if (bgImg && bgImg !== 'none') {
        bgLayer.style.backgroundImage = bgImg;
        bgLayer.style.backgroundSize = 'cover';
        bgLayer.style.backgroundPosition = 'center';
        bgLayer.style.position = 'absolute';
        bgLayer.style.top = '-25%';
        bgLayer.style.left = '0';
        bgLayer.style.width = '100%';
        bgLayer.style.height = '150%';
        bgLayer.style.zIndex = '0';
        bgLayer.style.pointerEvents = 'none';
        bgLayer.style.willChange = 'transform';
        bgLayer.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        
        hero.style.position = 'relative';
        hero.style.overflow = 'hidden';
        hero.insertBefore(bgLayer, hero.firstChild);
      }
    }
  });

  // Target titles, lead texts, and content cards for parallax depth offset
  const titles = document.querySelectorAll('h1, h2, .section-title, .hero-cta-lead, .pricing-title, .process-title');
  titles.forEach(t => {
    if (!t.classList.contains('parallax-title')) t.classList.add('parallax-title');
  });

  const texts = document.querySelectorAll('.hero p, .page-hero p, .about-text p, .contact-hero-text, .services-hero-text, .projects-hero-text, .pricing-intro');
  texts.forEach(t => {
    if (!t.classList.contains('parallax-text')) t.classList.add('parallax-text');
  });

  const cards = document.querySelectorAll('.card, .project-card, .service-card, .rates-card, .pricing-card, .process-step');
  cards.forEach(c => {
    if (!c.classList.contains('parallax-card')) c.classList.add('parallax-card');
  });

  let isTicking = false;

  function updateParallaxPositions() {
    const windowH = window.innerHeight;

    // 1. Background Layers (Moves slower than scrolling velocity - 0.35 speed)
    document.querySelectorAll('.hero-parallax-bg-layer').forEach(bg => {
      const parent = bg.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < windowH) {
        const bgOffset = (rect.top) * 0.35;
        bg.style.transform = `translate3d(0, ${bgOffset.toFixed(2)}px, 0)`;
      }
    });

    // 2. Foreground Title Layer (Floats at distinct parallax speed relative to screen center)
    document.querySelectorAll('.parallax-title').forEach(title => {
      const rect = title.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < windowH) {
        const centerY = rect.top + rect.height / 2 - windowH / 2;
        const translateY = centerY * -0.06;
        title.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`;
      }
    });

    // 3. Foreground Text Layer (Floats at secondary parallax depth)
    document.querySelectorAll('.parallax-text').forEach(text => {
      const rect = text.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < windowH) {
        const centerY = rect.top + rect.height / 2 - windowH / 2;
        const translateY = centerY * -0.035;
        text.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`;
      }
    });

    // 4. Foreground Card Layer (Floats at tertiary parallax depth)
    document.querySelectorAll('.parallax-card').forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < windowH) {
        const centerY = rect.top + rect.height / 2 - windowH / 2;
        const translateY = centerY * -0.018;
        card.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`;
      }
    });

    isTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!isTicking) {
      requestAnimationFrame(updateParallaxPositions);
      isTicking = true;
    }
  }, { passive: true });

  // Initial calculation trigger
  updateParallaxPositions();
}

// Auto-play Projects Carousel Handler - Premium 3D Coverflow Engine
function initCarousel() {
  const carousel = document.getElementById('project-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dots = carousel.querySelectorAll('.carousel-dot');
  
  if (!track || slides.length === 0) return;

  if (carousel._autoplayInterval) {
    clearInterval(carousel._autoplayInterval);
    carousel._autoplayInterval = null;
  }

  let currentIndex = 0;
  const slideCount = slides.length;
  const slideDuration = 5000; // 5 seconds

  function updateSlide(index) {
    currentIndex = (index + slideCount) % slideCount;
    
    // Position slides in 3D Space using state classes
    slides.forEach((slide, idx) => {
      let diff = idx - currentIndex;
      
      // Calculate normalized circular distance for endless seamless loops
      if (diff > slideCount / 2) {
        diff -= slideCount;
      } else if (diff < -slideCount / 2) {
        diff += slideCount;
      }
      
      slide.classList.remove('active', 'prev', 'next', 'far');
      
      if (diff === 0) {
        slide.classList.add('active');
      } else if (diff === 1) {
        slide.classList.add('next');
      } else if (diff === -1) {
        slide.classList.add('prev');
      } else {
        slide.classList.add('far');
      }
    });
    
    // Update active dot classes
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function startAutoplay() {
    if (carousel._autoplayInterval) return;
    carousel._autoplayInterval = setInterval(() => {
      updateSlide(currentIndex + 1);
    }, slideDuration);
  }

  function stopAutoplay() {
    if (carousel._autoplayInterval) {
      clearInterval(carousel._autoplayInterval);
      carousel._autoplayInterval = null;
    }
  }

  // Bind dot navigation click listeners
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      updateSlide(idx);
    });
  });

  // Bind click handlers to slides for 3D card deck navigation
  // Clicking a non-active card centers it; clicking the active card allows standard link navigation.
  slides.forEach((slide, idx) => {
    slide.addEventListener('click', (e) => {
      if (idx !== currentIndex) {
        e.preventDefault();
        e.stopPropagation();
        updateSlide(idx);
      }
    }, true); // use capture phase to intercept card links correctly
  });

  // Automatically pause autoplay on hover of any project card
  const cards = carousel.querySelectorAll('.carousel-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      stopAutoplay();
    });
    card.addEventListener('mouseleave', () => {
      startAutoplay();
    });
  });

  // Initial setup and launch of autoplay
  updateSlide(0);
  startAutoplay();
}

// Back to Top Button Initialization
function initScrollToTop() {
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.id = 'scroll-to-top-btn';
  scrollTopBtn.className = 'scroll-to-top-btn';
  scrollTopBtn.type = 'button';
  scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
  scrollTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  
  // Set initial hidden state
  scrollTopBtn.style.opacity = '0';
  scrollTopBtn.style.pointerEvents = 'none';
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.style.opacity = '1';
      scrollTopBtn.style.pointerEvents = 'auto';
    } else {
      scrollTopBtn.style.opacity = '0';
      scrollTopBtn.style.pointerEvents = 'none';
    }
  });
  
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  document.body.appendChild(scrollTopBtn);
}

// Shrink header on scroll to maximize viewport space especially on mobile
function initHeaderShrink() {
  const header = document.querySelector('.header');
  if (!header) return;

  const shrinkThreshold = 50;

  function handleScroll() {
    if (window.scrollY > shrinkThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  // Initial check in case page starts scrolled
  handleScroll();
}

// Run initializers on load
document.addEventListener('DOMContentLoaded', () => {
  initScrollProgressBar();
  initCustomLanguageDropdown();
  initThemeSwitcher();
  initCarousel();
  initScrollToTop(); // Must be initialized before edge cycling so edge cycling can bind to it
  initEdgeCycling();
  initHeaderShrink();
  initAdminFeatures();
  refreshAllProjectViews();
  renderDynamicReviews();
  renderDynamicServicesPage();
  initAboutPageImage();
  initBackgroundPhotoFeature();
  initFooterSocialLinks();
  initAdminFooterTools();
  initSlowTextAnimations();
  initParallaxScroll();
});

// Load saved language or default to English
const savedLang = localStorage.getItem('lang') || 'en';
setLanguage(savedLang);
if (languageSelect) languageSelect.value = savedLang;

// Instant Theme Application to prevent style flashes on reload
const initialTheme = localStorage.getItem('theme') || 'dark';
if (initialTheme === 'light') {
  document.body.classList.add('light-theme');
}

/* ==========================================================================
   Admin Console & Dynamic Project Management
   ========================================================================== */

function initAdminFeatures() {
  const footerBottom = document.querySelector('.footer-bottom');
  if (!footerBottom) return;

  // Create subtle key icon / lock button for hidden admin console login
  const lockSpan = document.createElement('span');
  lockSpan.id = 'admin-lock-btn';
  lockSpan.style.opacity = '0.12';
  lockSpan.style.cursor = 'pointer';
  lockSpan.style.marginLeft = '10px';
  lockSpan.style.fontSize = '0.8rem';
  lockSpan.style.transition = 'opacity 0.3s, color 0.3s';
  lockSpan.innerHTML = '<i class="fa-solid fa-lock"></i>';
  lockSpan.setAttribute('title', 'Admin Console');

  lockSpan.addEventListener('mouseenter', () => { 
    lockSpan.style.opacity = '0.85'; 
    lockSpan.style.color = '#3b82f6'; 
  });
  lockSpan.addEventListener('mouseleave', () => { 
    lockSpan.style.opacity = '0.12'; 
    lockSpan.style.color = 'inherit'; 
  });
  lockSpan.addEventListener('click', () => { 
    showAdminLoginModal(); 
  });

  // Append key/lock button to copyright text paragraph
  const copyrightPara = footerBottom.querySelector('p');
  if (copyrightPara) {
    copyrightPara.appendChild(lockSpan);
    
    // Also support 5-clicks secret spot on the footer copyright paragraph itself
    let clickCount = 0;
    let clickTimer = null;
    copyrightPara.addEventListener('click', (e) => {
      // Avoid interference if they click the actual lock button
      if (e.target.closest('#admin-lock-btn')) return;
      
      clickCount++;
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => { clickCount = 0; }, 3000); // Reset clicks after 3 seconds

      if (clickCount >= 5) {
        clickCount = 0;
        showAdminLoginModal();
      }
    });
  }
}

function showAdminLoginModal() {
  if (document.getElementById('admin-login-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'admin-login-modal';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.background = 'rgba(6, 9, 21, 0.75)';
  modal.style.backdropFilter = 'blur(16px)';
  modal.style.webkitBackdropFilter = 'blur(16px)';
  modal.style.zIndex = '100000';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.opacity = '0';
  modal.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)';

  // Modal box
  const box = document.createElement('div');
  box.style.background = 'rgba(13, 20, 35, 0.9)';
  box.style.border = '1px solid rgba(255, 255, 255, 0.08)';
  box.style.borderRadius = '20px';
  box.style.padding = '2.5rem 2rem';
  box.style.width = '100%';
  box.style.maxWidth = '400px';
  box.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(59, 130, 246, 0.15)';
  box.style.transform = 'scale(0.9)';
  box.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
  box.style.color = '#ffffff';

  box.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
      <h3 style="margin: 0; font-size: 1.5rem; font-weight: 600; color: #ffffff;">Admin Console</h3>
      <button id="close-admin-login" style="background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 1.2rem; transition: color 0.2s;"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <form id="admin-login-form" style="display: flex; flex-direction: column; gap: 1.25rem;">
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <label style="font-size: 0.85rem; font-weight: 500; color: #94a3b8;">Administrator Email</label>
        <input type="email" id="admin-email" required placeholder="name@domain.com" style="width: 100%; padding: 0.75rem 1rem; border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.1); background: rgba(255, 255, 255, 0.03); color: #ffffff; font-family: inherit; font-size: 0.95rem; outline: none; transition: border-color 0.3s;" />
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <label style="font-size: 0.85rem; font-weight: 500; color: #94a3b8;">Password</label>
        <input type="password" id="admin-password" required placeholder="••••••••••••" style="width: 100%; padding: 0.75rem 1rem; border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.1); background: rgba(255, 255, 255, 0.03); color: #ffffff; font-family: inherit; font-size: 0.95rem; outline: none; transition: border-color 0.3s;" />
      </div>
      <button type="submit" style="margin-top: 1rem; padding: 0.85rem; border-radius: 10px; border: none; background: linear-gradient(135deg, #3b82f6, #4f46e5); color: #ffffff; font-weight: 600; cursor: pointer; transition: opacity 0.3s, transform 0.2s; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.35);">Sign In</button>
    </form>
  `;

  modal.appendChild(box);
  document.body.appendChild(modal);

  // Transition in
  setTimeout(() => {
    modal.style.opacity = '1';
    box.style.transform = 'scale(1)';
  }, 20);

  const inputs = box.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('focus', () => { input.style.borderColor = '#3b82f6'; });
    input.addEventListener('blur', () => { input.style.borderColor = 'rgba(255, 255, 255, 0.1)'; });
  });

  const closeBtn = box.querySelector('#close-admin-login');
  closeBtn.addEventListener('mouseenter', () => { closeBtn.style.color = '#ffffff'; });
  closeBtn.addEventListener('mouseleave', () => { closeBtn.style.color = '#94a3b8'; });

  function closeModal() {
    modal.style.opacity = '0';
    box.style.transform = 'scale(0.9)';
    setTimeout(() => { modal.remove(); }, 400);
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  const loginForm = box.querySelector('#admin-login-form');
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = box.querySelector('#admin-email').value;
    const password = box.querySelector('#admin-password').value;

    const submitBtn = loginForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    submitBtn.textContent = 'Authenticating...';

    // Pure client-side secure login simulation
    setTimeout(() => {
      if (email === "bellanaevents@gmail.com" && password === "Qwertyuiop1234") {
        localStorage.setItem('admin_token', 'swentech_authenticated_admin');
        localStorage.setItem('admin_email', email);
        showToast('Welcome back, Admin!', 'success');
        closeModal();
        refreshAllProjectViews();
        renderDynamicReviews();
        renderDynamicServicesPage();
        initAboutPageImage();
        initBackgroundPhotoFeature();
        initAdminFooterTools();
      } else {
        showToast('Invalid email or password.', 'error');
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.textContent = 'Sign In';
      }
    }, 600);
  });
}

// Client-side local projects storage helper to swap Node.js dynamic files backend
async function getProjects() {
  const localData = localStorage.getItem('custom_projects');
  let localProjects = null;
  if (localData) {
    try {
      localProjects = JSON.parse(localData);
    } catch (e) {
      console.error("Error parsing local projects, resetting...", e);
    }
  }

  try {
    const freshDefaultRes = await fetch(`projects.json?t=${new Date().getTime()}`, { cache: 'no-store' }).catch(() => null);
    if (freshDefaultRes && freshDefaultRes.ok) {
      const freshDefaults = await freshDefaultRes.json();
      if (!localProjects) {
        freshDefaults.sort((a, b) => (b.id || 0) - (a.id || 0));
        localStorage.setItem('custom_projects', JSON.stringify(freshDefaults));
        return freshDefaults;
      }

      // Check if fresh seed data has project IDs not in localProjects, and merge them
      let updated = false;
      const localMap = new Map(localProjects.map(p => [p.id, p]));
      freshDefaults.forEach(defProj => {
        if (!localMap.has(defProj.id)) {
          localProjects.push(defProj);
          updated = true;
        }
      });

      localProjects.sort((a, b) => (b.id || 0) - (a.id || 0));
      if (updated) {
        localStorage.setItem('custom_projects', JSON.stringify(localProjects));
      }
      return localProjects;
    }
  } catch (err) {
    console.error("Failed to load projects.json:", err);
  }

  const list = localProjects || [];
  list.sort((a, b) => (b.id || 0) - (a.id || 0));
  return list;
}

async function renderHomepageCarousel() {
  const carousel = document.getElementById('project-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const dotsContainer = carousel.querySelector('.carousel-dots');
  if (!track || !dotsContainer) return;

  const currentLang = localStorage.getItem('lang') || 'en';

  try {
    const projects = await getProjects();
    if (!projects || projects.length === 0) return;

    track.innerHTML = '';
    dotsContainer.innerHTML = '';

    projects.forEach((proj, idx) => {
      const title = proj[`title_${currentLang}`] || proj.title_en;
      const fullDesc = proj[`desc_${currentLang}`] || proj.desc_en || '';
      const CHAR_LIMIT = 75;
      const shortDesc = fullDesc.length > CHAR_LIMIT ? fullDesc.slice(0, CHAR_LIMIT).trim() + '...' : fullDesc;

      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      slide.setAttribute('data-index', idx);

      slide.innerHTML = `
        <a href="projects.html" class="carousel-card">
          <div class="carousel-image-container">
            <img src="${proj.image}" alt="${title}" class="carousel-project-img" onerror="this.onerror=null; this.src='images/project1.svg';">
          </div>
          <h3>${title}</h3>
          <p>${shortDesc}</p>
        </a>
      `;

      track.appendChild(slide);

      const dot = document.createElement('span');
      dot.className = idx === 0 ? 'carousel-dot active' : 'carousel-dot';
      dot.setAttribute('data-slide', idx);
      dot.setAttribute('aria-label', `Slide ${idx + 1}`);
      dotsContainer.appendChild(dot);
    });

    initCarousel();
  } catch (err) {
    console.error('Error rendering homepage carousel:', err);
  }
}

let currentProjectsPage = 1;
const PROJECTS_PER_PAGE = 9;

async function renderDynamicProjects() {
  const projectsGrid = document.querySelector('.cards');
  const isProjectsPage = document.querySelector('[data-i18n="projectsTitle"]') !== null;
  if (!isProjectsPage || !projectsGrid) return;

  const currentLang = localStorage.getItem('lang') || 'en';
  const isAdmin = localStorage.getItem('admin_token') === 'swentech_authenticated_admin';

  try {
    const projects = await getProjects();
    const totalProjects = projects.length;
    const totalPages = Math.max(1, Math.ceil(totalProjects / PROJECTS_PER_PAGE));

    if (currentProjectsPage > totalPages) {
      currentProjectsPage = totalPages;
    }
    if (currentProjectsPage < 1) {
      currentProjectsPage = 1;
    }

    // Clear grid
    projectsGrid.innerHTML = '';

    // Calculate current page slice (max 9 items per page)
    const startIndex = (currentProjectsPage - 1) * PROJECTS_PER_PAGE;
    const endIndex = startIndex + PROJECTS_PER_PAGE;
    const pageProjects = projects.slice(startIndex, endIndex);

    // If admin is logged in, show an "Add Project" card at the beginning of Page 1
    if (isAdmin && currentProjectsPage === 1) {
      const addCard = document.createElement('div');
      addCard.className = 'card add-project-card';
      addCard.style.border = '2px dashed var(--primary)';
      addCard.style.display = 'flex';
      addCard.style.flexDirection = 'column';
      addCard.style.alignItems = 'center';
      addCard.style.justifyContent = 'center';
      addCard.style.minHeight = '300px';
      addCard.style.cursor = 'pointer';
      addCard.style.background = 'rgba(59, 130, 246, 0.02)';
      addCard.style.transition = 'all 0.3s ease';

      addCard.innerHTML = `
        <div style="font-size: 2.5rem; color: var(--primary); margin-bottom: 1rem;"><i class="fa-solid fa-circle-plus"></i></div>
        <h3 style="font-size: 1.25rem; margin: 0; color: #ffffff;">Add New Project</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0.5rem 0 0 0; text-align: center;">Click to add a project to the gallery</p>
        <button id="admin-logout-btn" style="margin-top: 1.5rem; padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid rgba(239, 68, 68, 0.4); background: rgba(239, 68, 68, 0.1); color: #ef4444; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.2s;">Log Out</button>
      `;

      addCard.addEventListener('mouseenter', () => {
        addCard.style.background = 'rgba(59, 130, 246, 0.05)';
        addCard.style.transform = 'translateY(-5px)';
      });
      addCard.addEventListener('mouseleave', () => {
        addCard.style.background = 'rgba(59, 130, 246, 0.02)';
        addCard.style.transform = 'translateY(0)';
      });

      addCard.addEventListener('click', (e) => {
        if (e.target.closest('#admin-logout-btn')) {
          e.stopPropagation();
          localStorage.removeItem('admin_token');
          localStorage.removeItem('admin_email');
          showToast('Logged out successfully', 'success');
          refreshAllProjectViews();
          renderDynamicReviews();
          initAboutPageImage();
          initBackgroundPhotoFeature();
          return;
        }
        showAddProjectModal();
      });

      projectsGrid.appendChild(addCard);
    }

    // Render projects for current page
    pageProjects.forEach((proj) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.setAttribute('data-id', proj.id);

      // Select localized strings
      const title = proj[`title_${currentLang}`] || proj.title_en;
      const fullDesc = proj[`desc_${currentLang}`] || proj.desc_en || '';
      const tag = proj[`tag_${currentLang}`] || proj.tag_en;

      const CHAR_LIMIT = 90;
      const isLong = fullDesc.length > CHAR_LIMIT;
      const shortDesc = isLong ? fullDesc.slice(0, CHAR_LIMIT).trim() + '...' : fullDesc;

      const descHtml = `
        <div class="project-desc-wrapper" style="cursor: ${isLong ? 'pointer' : 'default'};">
          <p class="project-desc-text ${isLong ? 'is-truncated' : ''}">${shortDesc}</p>
          ${isLong ? `
            <button type="button" class="toggle-desc-btn" aria-expanded="false">
              <span class="btn-label">Read more</span>
              <i class="fa-solid fa-chevron-down toggle-icon"></i>
            </button>
          ` : ''}
        </div>
      `;

      card.innerHTML = `
        <div class="project-image-container">
          <img src="${proj.image}" alt="${title}" class="project-card-img" onerror="this.onerror=null; this.src='images/project1.svg';">
        </div>
        <div class="card-meta">
          <span class="project-tag">${tag}</span>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            ${isAdmin ? `
              <button class="edit-project-btn" data-id="${proj.id}" title="Edit Project" style="background: none; border: none; color: #3b82f6; cursor: pointer; font-size: 1rem; padding: 0.25rem; transition: transform 0.2s; display: inline-flex; align-items: center; justify-content: center;"><i class="fa-solid fa-pen-to-square"></i></button>
              <button class="delete-project-btn" data-id="${proj.id}" title="Delete Project" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 1rem; padding: 0.25rem; transition: transform 0.2s; display: inline-flex; align-items: center; justify-content: center;"><i class="fa-solid fa-trash"></i></button>
            ` : ''}
            <a href="${proj.link || '#'}" class="project-link" aria-label="Project Link"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
          </div>
        </div>
        <h3>${title}</h3>
        ${descHtml}
      `;

      // Interactive Expand / Collapse logic for descriptions
      if (isLong) {
        const descWrapper = card.querySelector('.project-desc-wrapper');
        const descText = descWrapper.querySelector('.project-desc-text');
        const toggleBtn = descWrapper.querySelector('.toggle-desc-btn');
        const btnLabel = toggleBtn ? toggleBtn.querySelector('.btn-label') : null;
        const toggleIcon = toggleBtn ? toggleBtn.querySelector('.toggle-icon') : null;

        let expanded = false;

        const toggleExpand = (e) => {
          if (e.target.closest('.project-link') || e.target.closest('.delete-project-btn') || e.target.closest('.edit-project-btn')) {
            return;
          }
          expanded = !expanded;
          if (expanded) {
            descText.textContent = fullDesc;
            descText.classList.remove('is-truncated');
            descText.classList.add('is-expanded');
            if (btnLabel) btnLabel.textContent = 'Show less';
            if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
            if (toggleIcon) toggleIcon.style.transform = 'rotate(180deg)';
          } else {
            descText.textContent = shortDesc;
            descText.classList.add('is-truncated');
            descText.classList.remove('is-expanded');
            if (btnLabel) btnLabel.textContent = 'Read more';
            if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
            if (toggleIcon) toggleIcon.style.transform = 'rotate(0deg)';
          }
        };

        descWrapper.addEventListener('click', toggleExpand);
      }

      // Wire up hover scale for image (matches CSS)
      const img = card.querySelector('.project-card-img');
      card.addEventListener('mouseenter', () => {
        if (img) img.style.transform = 'scale(1.06)';
      });
      card.addEventListener('mouseleave', () => {
        if (img) img.style.transform = 'scale(1)';
      });

      projectsGrid.appendChild(card);
    });

    // Wire up edit and delete event listeners
    if (isAdmin) {
      projectsGrid.querySelectorAll('.edit-project-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.preventDefault();
          e.stopPropagation();
          const id = parseInt(btn.getAttribute('data-id'), 10);
          const allProjects = await getProjects();
          const projToEdit = allProjects.find(p => p.id === id);
          if (projToEdit) {
            showProjectModal(projToEdit);
          }
        });
      });

      projectsGrid.querySelectorAll('.delete-project-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const id = btn.getAttribute('data-id');
          const cardElement = btn.closest('.card');
          const titleElement = cardElement ? cardElement.querySelector('h3') : null;
          const projectTitle = titleElement ? titleElement.textContent : 'this project';
          showDeleteConfirmModal(id, projectTitle);
        });
      });
    }

    // Handle footer admin logout button specifically on projects.html
    const footerBottom = document.querySelector('.footer-bottom');
    if (footerBottom) {
      const existingFooterLogout = document.getElementById('footer-admin-logout-btn');
      if (existingFooterLogout) {
        existingFooterLogout.remove();
      }

      if (isAdmin) {
        const footerLogoutBtn = document.createElement('button');
        footerLogoutBtn.id = 'footer-admin-logout-btn';
        footerLogoutBtn.style.marginTop = '1rem';
        footerLogoutBtn.style.padding = '0.5rem 1.25rem';
        footerLogoutBtn.style.borderRadius = '30px';
        footerLogoutBtn.style.border = '1px solid rgba(239, 68, 68, 0.4)';
        footerLogoutBtn.style.background = 'rgba(239, 68, 68, 0.1)';
        footerLogoutBtn.style.color = '#ef4444';
        footerLogoutBtn.style.fontSize = '0.82rem';
        footerLogoutBtn.style.fontWeight = '600';
        footerLogoutBtn.style.cursor = 'pointer';
        footerLogoutBtn.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        footerLogoutBtn.style.display = 'inline-flex';
        footerLogoutBtn.style.alignItems = 'center';
        footerLogoutBtn.style.gap = '0.5rem';
        footerLogoutBtn.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i> Admin Logout';

        footerLogoutBtn.addEventListener('mouseenter', () => {
          footerLogoutBtn.style.background = 'rgba(239, 68, 68, 0.2)';
          footerLogoutBtn.style.boxShadow = '0 0 15px rgba(239, 68, 68, 0.25)';
          footerLogoutBtn.style.transform = 'translateY(-1px)';
        });
        footerLogoutBtn.addEventListener('mouseleave', () => {
          footerLogoutBtn.style.background = 'rgba(239, 68, 68, 0.1)';
          footerLogoutBtn.style.boxShadow = 'none';
          footerLogoutBtn.style.transform = 'translateY(0)';
        });

        footerLogoutBtn.addEventListener('click', () => {
          localStorage.removeItem('admin_token');
          localStorage.removeItem('admin_email');
          showToast('Logged out successfully', 'success');
          refreshAllProjectViews();
          renderDynamicReviews();
          initAboutPageImage();
          initBackgroundPhotoFeature();
        });

        footerBottom.appendChild(footerLogoutBtn);
      }
    }

    // Render Pagination Controls / Cursor
    renderProjectsPagination(totalProjects, totalPages);

  } catch (err) {
    console.error(err);
  }
}

function renderProjectsPagination(totalProjects, totalPages) {
  let paginationContainer = document.getElementById('projects-pagination-container');
  if (!paginationContainer) {
    const main = document.querySelector('main.container');
    if (main) {
      paginationContainer = document.createElement('div');
      paginationContainer.id = 'projects-pagination-container';
      main.appendChild(paginationContainer);
    } else {
      return;
    }
  }

  paginationContainer.innerHTML = '';
  if (totalProjects === 0) return;

  const currentLang = localStorage.getItem('lang') || 'en';
  const prevLabel = (translations[currentLang] && translations[currentLang].prevPage) || 'Previous';
  const nextLabel = (translations[currentLang] && translations[currentLang].nextPage) || 'Next 9';

  const displayedStart = totalProjects === 0 ? 0 : (currentProjectsPage - 1) * PROJECTS_PER_PAGE + 1;
  const displayedEnd = Math.min(currentProjectsPage * PROJECTS_PER_PAGE, totalProjects);

  const wrapper = document.createElement('div');
  wrapper.className = 'projects-pagination-wrapper';

  const infoSpan = document.createElement('div');
  infoSpan.className = 'pagination-info';
  let showingText = `Showing ${displayedStart}–${displayedEnd} of ${totalProjects} Projects`;
  if (currentLang === 'hu') {
    showingText = `${displayedStart}–${displayedEnd} / ${totalProjects} projekt megjelenítve`;
  } else if (currentLang === 'ro') {
    showingText = `Se afișează ${displayedStart}–${displayedEnd} din ${totalProjects} Proiecte`;
  } else if (currentLang === 'it') {
    showingText = `Visualizzati ${displayedStart}–${displayedEnd} di ${totalProjects} Progetti`;
  }
  infoSpan.textContent = showingText;

  wrapper.appendChild(infoSpan);

  if (totalPages > 1) {
    const controls = document.createElement('div');
    controls.className = 'pagination-controls';

    // Previous Button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'pagination-btn prev-btn';
    prevBtn.disabled = currentProjectsPage === 1;
    prevBtn.innerHTML = `<i class="fa-solid fa-chevron-left"></i> <span>${prevLabel}</span>`;
    prevBtn.addEventListener('click', () => {
      if (currentProjectsPage > 1) {
        currentProjectsPage--;
        renderDynamicProjects();
        const grid = document.querySelector('.cards');
        if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    controls.appendChild(prevBtn);

    // Page Pills
    const pillsContainer = document.createElement('div');
    pillsContainer.className = 'pagination-page-pills';

    for (let p = 1; p <= totalPages; p++) {
      const pill = document.createElement('button');
      pill.className = `page-pill ${p === currentProjectsPage ? 'active' : ''}`;
      pill.textContent = p;
      pill.setAttribute('aria-label', `Go to page ${p}`);
      pill.addEventListener('click', () => {
        if (currentProjectsPage !== p) {
          currentProjectsPage = p;
          renderDynamicProjects();
          const grid = document.querySelector('.cards');
          if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      pillsContainer.appendChild(pill);
    }
    controls.appendChild(pillsContainer);

    // Next Button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'pagination-btn next-btn';
    nextBtn.disabled = currentProjectsPage === totalPages;
    nextBtn.innerHTML = `<span>${nextLabel}</span> <i class="fa-solid fa-chevron-right"></i>`;
    nextBtn.addEventListener('click', () => {
      if (currentProjectsPage < totalPages) {
        currentProjectsPage++;
        renderDynamicProjects();
        const grid = document.querySelector('.cards');
        if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    controls.appendChild(nextBtn);

    wrapper.appendChild(controls);
  }

  paginationContainer.appendChild(wrapper);
}

async function refreshAllProjectViews() {
  await renderDynamicProjects();
  await renderHomepageCarousel();
}

// Sync updates across browser tabs
window.addEventListener('storage', (e) => {
  if (e.key === 'custom_projects') {
    refreshAllProjectViews();
  } else if (e.key === 'custom_reviews') {
    renderDynamicReviews();
  } else if (e.key === 'custom_services') {
    renderDynamicServicesPage();
  } else if (e.key === 'admin_token') {
    refreshAllProjectViews();
    renderDynamicReviews();
    renderDynamicServicesPage();
    initAboutPageImage();
    initBackgroundPhotoFeature();
  } else if (e.key === 'about_profile_image') {
    initAboutPageImage();
  } else if (e.key === 'site_background_photo') {
    initBackgroundPhotoFeature();
  }
});

function showDeleteConfirmModal(id, title) {
  if (document.getElementById('delete-confirm-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'delete-confirm-modal';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.background = 'rgba(6, 9, 21, 0.75)';
  modal.style.backdropFilter = 'blur(16px)';
  modal.style.webkitBackdropFilter = 'blur(16px)';
  modal.style.zIndex = '100000';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.opacity = '0';
  modal.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)';

  // Modal box
  const box = document.createElement('div');
  box.style.background = 'rgba(13, 20, 35, 0.9)';
  box.style.border = '1px solid rgba(255, 255, 255, 0.08)';
  box.style.borderRadius = '20px';
  box.style.padding = '2.5rem 2rem';
  box.style.width = '100%';
  box.style.maxWidth = '400px';
  box.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(239, 68, 68, 0.15)';
  box.style.transform = 'scale(0.9)';
  box.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
  box.style.color = '#ffffff';
  box.style.textAlign = 'center';

  box.innerHTML = `
    <div style="font-size: 3rem; color: #ef4444; margin-bottom: 1.5rem;">
      <i class="fa-solid fa-triangle-exclamation"></i>
    </div>
    <h3 style="margin: 0 0 1rem 0; font-size: 1.5rem; font-weight: 600; color: #ffffff;">Delete Project?</h3>
    <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 2rem;">
      Are you sure you want to permanently delete <strong>"${title}"</strong>? This action cannot be undone.
    </p>
    <div style="display: flex; gap: 1rem; justify-content: center;">
      <button id="cancel-delete-btn" style="flex: 1; padding: 0.75rem; border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.1); background: rgba(255, 255, 255, 0.03); color: #ffffff; font-weight: 600; cursor: pointer; transition: all 0.2s;">Cancel</button>
      <button id="confirm-delete-btn" style="flex: 1; padding: 0.75rem; border-radius: 10px; border: none; background: #ef4444; color: #ffffff; font-weight: 600; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.35);">Delete</button>
    </div>
  `;

  modal.appendChild(box);
  document.body.appendChild(modal);

  // Transition in
  setTimeout(() => {
    modal.style.opacity = '1';
    box.style.transform = 'scale(1)';
  }, 20);

  const cancelBtn = box.querySelector('#cancel-delete-btn');
  const confirmBtn = box.querySelector('#confirm-delete-btn');

  cancelBtn.addEventListener('mouseenter', () => { cancelBtn.style.background = 'rgba(255, 255, 255, 0.08)'; });
  cancelBtn.addEventListener('mouseleave', () => { cancelBtn.style.background = 'rgba(255, 255, 255, 0.03)'; });
  
  confirmBtn.addEventListener('mouseenter', () => { 
    confirmBtn.style.background = '#dc2626'; 
    confirmBtn.style.boxShadow = '0 4px 20px rgba(239, 68, 68, 0.5)';
  });
  confirmBtn.addEventListener('mouseleave', () => { 
    confirmBtn.style.background = '#ef4444'; 
    confirmBtn.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.35)';
  });

  function closeModal() {
    modal.style.opacity = '0';
    box.style.transform = 'scale(0.9)';
    setTimeout(() => { modal.remove(); }, 400);
  }

  cancelBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  confirmBtn.addEventListener('click', async () => {
    confirmBtn.disabled = true;
    confirmBtn.textContent = 'Deleting...';
    await deleteProject(id);
    closeModal();
  });
}

async function deleteProject(id) {
  try {
    const currentProjects = await getProjects();
    const updatedProjects = currentProjects.filter(p => p.id !== parseInt(id, 10));
    localStorage.setItem('custom_projects', JSON.stringify(updatedProjects));
    
    showToast('Project deleted successfully', 'success');
    refreshAllProjectViews();
  } catch (err) {
    console.error(err);
    showToast('Failed to delete project', 'error');
  }
}

function showAddProjectModal() {
  showProjectModal(null);
}

function showProjectModal(projectToEdit = null) {
  if (document.getElementById('add-project-modal')) return;

  const isEditing = Boolean(projectToEdit);

  const modal = document.createElement('div');
  modal.id = 'add-project-modal';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.background = 'rgba(6, 9, 21, 0.75)';
  modal.style.backdropFilter = 'blur(16px)';
  modal.style.webkitBackdropFilter = 'blur(16px)';
  modal.style.zIndex = '100000';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.opacity = '0';
  modal.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
  modal.style.overflowY = 'auto';
  modal.style.padding = '2rem 1rem';

  const box = document.createElement('div');
  box.style.background = 'rgba(13, 20, 35, 0.9)';
  box.style.border = '1px solid rgba(255, 255, 255, 0.08)';
  box.style.borderRadius = '20px';
  box.style.padding = '2rem';
  box.style.width = '100%';
  box.style.maxWidth = '600px';
  box.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(59, 130, 246, 0.15)';
  box.style.transform = 'scale(0.9)';
  box.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
  box.style.color = '#ffffff';
  box.style.margin = 'auto';

  const modalHeading = isEditing ? 'Edit Project' : 'Add New Project';
  const modalIcon = isEditing ? 'fa-pen-to-square' : 'fa-diagram-project';
  const submitText = isEditing ? 'Update Project' : 'Create Project';

  box.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.05); padding-bottom: 0.75rem;">
      <h3 style="margin: 0; font-size: 1.5rem; font-weight: 600; color: #ffffff;"><i class="fa-solid ${modalIcon}" style="color: #3b82f6; margin-right: 8px;"></i>${modalHeading}</h3>
      <button id="close-add-project" style="background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 1.2rem; transition: color 0.2s;"><i class="fa-solid fa-xmark"></i></button>
    </div>
    
    <form id="add-project-form" style="display: flex; flex-direction: column; gap: 1.25rem;">
      <div style="display: flex; gap: 0.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.05); padding-bottom: 0.5rem; margin-bottom: 0.5rem;">
        <button type="button" class="form-tab active" data-tab="en" style="background: rgba(59, 130, 246, 0.12); border: 1px solid rgba(59, 130, 246, 0.3); color: #60a5fa; padding: 0.35rem 0.85rem; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.8rem;">🇬🇧 English</button>
        <button type="button" class="form-tab" data-tab="hu" style="background: none; border: 1px solid transparent; color: #94a3b8; padding: 0.35rem 0.85rem; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.8rem;">🇭🇺 Magyar</button>
        <button type="button" class="form-tab" data-tab="ro" style="background: none; border: 1px solid transparent; color: #94a3b8; padding: 0.35rem 0.85rem; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.8rem;">🇷🇴 Română</button>
      </div>

      <!-- ENGLISH SUB-FORM -->
      <div class="tab-content" id="tab-en" style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div style="display: flex; flex-direction: column; gap: 0.35rem;">
            <label style="font-size: 0.8rem; font-weight: 500; color: #94a3b8;">Project Title (EN) *</label>
            <input type="text" id="proj-title-en" required value="${isEditing ? (projectToEdit.title_en || '') : ''}" placeholder="Project One" style="width: 100%; padding: 0.6rem 0.85rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.1); background: rgba(255, 255, 255, 0.03); color: #ffffff; font-family: inherit; font-size: 0.9rem; outline: none;" />
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.35rem;">
            <label style="font-size: 0.8rem; font-weight: 500; color: #94a3b8;">Category / Tag (EN) *</label>
            <input type="text" id="proj-tag-en" required value="${isEditing ? (projectToEdit.tag_en || '') : ''}" placeholder="UI/UX Design" style="width: 100%; padding: 0.6rem 0.85rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.1); background: rgba(255, 255, 255, 0.03); color: #ffffff; font-family: inherit; font-size: 0.9rem; outline: none;" />
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.35rem;">
          <label style="font-size: 0.8rem; font-weight: 500; color: #94a3b8;">Project Description (EN) *</label>
          <textarea id="proj-desc-en" required placeholder="Provide a brief project description, tech stack used, or general results." rows="2" style="width: 100%; padding: 0.6rem 0.85rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.1); background: rgba(255, 255, 255, 0.03); color: #ffffff; font-family: inherit; font-size: 0.9rem; outline: none; resize: vertical;">${isEditing ? (projectToEdit.desc_en || '') : ''}</textarea>
        </div>
      </div>

      <!-- HUNGARIAN SUB-FORM -->
      <div class="tab-content" id="tab-hu" style="display: none; flex-direction: column; gap: 1rem;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div style="display: flex; flex-direction: column; gap: 0.35rem;">
            <label style="font-size: 0.8rem; font-weight: 500; color: #94a3b8;">Project Title (HU)</label>
            <input type="text" id="proj-title-hu" value="${isEditing ? (projectToEdit.title_hu || '') : ''}" placeholder="Projekt Egy (defaults to English)" style="width: 100%; padding: 0.6rem 0.85rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.1); background: rgba(255, 255, 255, 0.03); color: #ffffff; font-family: inherit; font-size: 0.9rem; outline: none;" />
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.35rem;">
            <label style="font-size: 0.8rem; font-weight: 500; color: #94a3b8;">Category / Tag (HU)</label>
            <input type="text" id="proj-tag-hu" value="${isEditing ? (projectToEdit.tag_hu || '') : ''}" placeholder="UI/UX Tervezés" style="width: 100%; padding: 0.6rem 0.85rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.1); background: rgba(255, 255, 255, 0.03); color: #ffffff; font-family: inherit; font-size: 0.9rem; outline: none;" />
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.35rem;">
          <label style="font-size: 0.8rem; font-weight: 500; color: #94a3b8;">Project Description (HU)</label>
          <textarea id="proj-desc-hu" placeholder="Projekt leírása..." rows="2" style="width: 100%; padding: 0.6rem 0.85rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.1); background: rgba(255, 255, 255, 0.03); color: #ffffff; font-family: inherit; font-size: 0.9rem; outline: none; resize: vertical;">${isEditing ? (projectToEdit.desc_hu || '') : ''}</textarea>
        </div>
      </div>

      <!-- ROMANIAN SUB-FORM -->
      <div class="tab-content" id="tab-ro" style="display: none; flex-direction: column; gap: 1rem;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div style="display: flex; flex-direction: column; gap: 0.35rem;">
            <label style="font-size: 0.8rem; font-weight: 500; color: #94a3b8;">Project Title (RO)</label>
            <input type="text" id="proj-title-ro" value="${isEditing ? (projectToEdit.title_ro || '') : ''}" placeholder="Proiect Unu (defaults to English)" style="width: 100%; padding: 0.6rem 0.85rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.1); background: rgba(255, 255, 255, 0.03); color: #ffffff; font-family: inherit; font-size: 0.9rem; outline: none;" />
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.35rem;">
            <label style="font-size: 0.8rem; font-weight: 500; color: #94a3b8;">Category / Tag (RO)</label>
            <input type="text" id="proj-tag-ro" value="${isEditing ? (projectToEdit.tag_ro || '') : ''}" placeholder="Design UI/UX" style="width: 100%; padding: 0.6rem 0.85rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.1); background: rgba(255, 255, 255, 0.03); color: #ffffff; font-family: inherit; font-size: 0.9rem; outline: none;" />
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.35rem;">
          <label style="font-size: 0.8rem; font-weight: 500; color: #94a3b8;">Project Description (RO)</label>
          <textarea id="proj-desc-ro" placeholder="Descrierea proiectului..." rows="2" style="width: 100%; padding: 0.6rem 0.85rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.1); background: rgba(255, 255, 255, 0.03); color: #ffffff; font-family: inherit; font-size: 0.9rem; outline: none; resize: vertical;">${isEditing ? (projectToEdit.desc_ro || '') : ''}</textarea>
        </div>
      </div>

      <!-- COMMON SETTINGS (Image and link) -->
      <div style="border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 1rem; display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div style="display: flex; flex-direction: column; gap: 0.35rem;">
            <label style="font-size: 0.8rem; font-weight: 500; color: #94a3b8;">Project Image Source</label>
            <select id="proj-image-select" style="width: 100%; padding: 0.6rem 0.85rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.1); background: #0d1423; color: #ffffff; font-family: inherit; font-size: 0.9rem; outline: none; cursor: pointer;">
              <option value="images/project1.svg">Preset 1 (project1.svg)</option>
              <option value="images/project2.svg">Preset 2 (project2.svg)</option>
              <option value="images/project3.svg">Preset 3 (project3.svg)</option>
              <option value="images/project4.svg">Preset 4 (project4.svg)</option>
              <option value="images/LogoSwen.png">Logo Swen (LogoSwen.png)</option>
              <option value="file">📁 Upload image from computer</option>
              <option value="custom">🔗 Custom Image URL</option>
            </select>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.35rem;">
            <label style="font-size: 0.8rem; font-weight: 500; color: #94a3b8;">Project Link (optional)</label>
            <input type="text" id="proj-link" value="${isEditing ? (projectToEdit.link || '#') : ''}" placeholder="#" style="width: 100%; padding: 0.6rem 0.85rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.1); background: rgba(255, 255, 255, 0.03); color: #ffffff; font-family: inherit; font-size: 0.9rem; outline: none;" />
          </div>
        </div>

        <!-- LOCAL FILE UPLOAD CONTAINER -->
        <div id="file-upload-container" style="display: none; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem;">
          <label style="font-size: 0.8rem; font-weight: 500; color: #94a3b8;">Select local image file from device</label>
          <div id="file-dropzone" style="border: 2px dashed rgba(59, 130, 246, 0.4); border-radius: 12px; padding: 1.25rem 1rem; text-align: center; cursor: pointer; background: rgba(59, 130, 246, 0.04); transition: all 0.2s;">
            <i class="fa-solid fa-cloud-arrow-up" style="font-size: 1.75rem; color: #60a5fa; margin-bottom: 0.35rem;"></i>
            <p style="margin: 0; font-size: 0.85rem; color: #e2e8f0; font-weight: 500;">Click to browse or drag an image file here</p>
            <p style="margin: 0.25rem 0 0 0; font-size: 0.75rem; color: #94a3b8;">PNG, JPG, SVG, WebP, GIF supported</p>
            <input type="file" id="proj-image-file" accept="image/*" style="display: none;" />
          </div>
          <div id="file-preview-wrapper" style="display: none; align-items: center; gap: 0.75rem; margin-top: 0.5rem; background: rgba(255, 255, 255, 0.03); padding: 0.6rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.08);">
            <img id="proj-file-preview" style="max-height: 70px; max-width: 100px; object-fit: cover; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.1);" />
            <div style="display: flex; flex-direction: column; gap: 0.2rem; overflow: hidden;">
              <span id="file-name-label" style="font-size: 0.8rem; color: #cbd5e1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: 500;"></span>
              <span style="font-size: 0.7rem; color: #10b981;"><i class="fa-solid fa-check-circle"></i> Image attached</span>
            </div>
          </div>
        </div>
        
        <!-- CUSTOM IMAGE URL CONTAINER -->
        <div id="custom-image-url-container" style="display: none; flex-direction: column; gap: 0.35rem;">
          <label style="font-size: 0.8rem; font-weight: 500; color: #94a3b8;">Custom Image URL</label>
          <input type="text" id="proj-image-custom" placeholder="https://example.com/my-image.jpg" style="width: 100%; padding: 0.6rem 0.85rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.1); background: rgba(255, 255, 255, 0.03); color: #ffffff; font-family: inherit; font-size: 0.9rem; outline: none;" />
        </div>
      </div>

      <button type="submit" style="margin-top: 1rem; padding: 0.85rem; border-radius: 10px; border: none; background: linear-gradient(135deg, #3b82f6, #4f46e5); color: #ffffff; font-weight: 600; cursor: pointer; transition: opacity 0.3s, transform 0.2s; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.35);">${submitText}</button>
    </form>
  `;

  modal.appendChild(box);
  document.body.appendChild(modal);

  // Transition in
  setTimeout(() => {
    modal.style.opacity = '1';
    box.style.transform = 'scale(1)';
  }, 20);

  box.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('focus', () => { input.style.borderColor = '#3b82f6'; });
    input.addEventListener('blur', () => { input.style.borderColor = 'rgba(255, 255, 255, 0.1)'; });
  });

  let uploadedBase64Image = null;

  const imgSelect = box.querySelector('#proj-image-select');
  const customImgContainer = box.querySelector('#custom-image-url-container');
  const fileUploadContainer = box.querySelector('#file-upload-container');
  const fileInput = box.querySelector('#proj-image-file');
  const dropzone = box.querySelector('#file-dropzone');
  const previewWrapper = box.querySelector('#file-preview-wrapper');
  const filePreview = box.querySelector('#proj-file-preview');
  const fileNameLabel = box.querySelector('#file-name-label');

  // Handle local file selection & drag-and-drop
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.style.background = 'rgba(59, 130, 246, 0.15)';
      dropzone.style.borderColor = '#60a5fa';
    });
    dropzone.addEventListener('dragleave', () => {
      dropzone.style.background = 'rgba(59, 130, 246, 0.04)';
      dropzone.style.borderColor = 'rgba(59, 130, 246, 0.4)';
    });
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.style.background = 'rgba(59, 130, 246, 0.04)';
      dropzone.style.borderColor = 'rgba(59, 130, 246, 0.4)';
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileSelect(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files[0]) {
        handleFileSelect(fileInput.files[0]);
      }
    });
  }

  function handleFileSelect(file) {
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedBase64Image = e.target.result;
      filePreview.src = uploadedBase64Image;
      fileNameLabel.textContent = file.name;
      previewWrapper.style.display = 'flex';
    };
    reader.readAsDataURL(file);
  }

  // Pre-select image mode if editing
  if (isEditing && projectToEdit.image) {
    const presets = ['images/project1.svg', 'images/project2.svg', 'images/project3.svg', 'images/project4.svg', 'images/LogoSwen.png'];
    if (presets.includes(projectToEdit.image)) {
      imgSelect.value = projectToEdit.image;
    } else if (projectToEdit.image.startsWith('data:image/')) {
      imgSelect.value = 'file';
      fileUploadContainer.style.display = 'flex';
      uploadedBase64Image = projectToEdit.image;
      filePreview.src = uploadedBase64Image;
      fileNameLabel.textContent = 'Uploaded image file';
      previewWrapper.style.display = 'flex';
    } else {
      imgSelect.value = 'custom';
      customImgContainer.style.display = 'flex';
      box.querySelector('#proj-image-custom').value = projectToEdit.image;
    }
  }

  imgSelect.addEventListener('change', () => {
    if (imgSelect.value === 'custom') {
      customImgContainer.style.display = 'flex';
      fileUploadContainer.style.display = 'none';
      box.querySelector('#proj-image-custom').required = true;
    } else if (imgSelect.value === 'file') {
      fileUploadContainer.style.display = 'flex';
      customImgContainer.style.display = 'none';
      box.querySelector('#proj-image-custom').required = false;
    } else {
      customImgContainer.style.display = 'none';
      fileUploadContainer.style.display = 'none';
      box.querySelector('#proj-image-custom').required = false;
    }
  });

  const tabs = box.querySelectorAll('.form-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.style.background = 'none';
        t.style.borderColor = 'transparent';
        t.style.color = '#94a3b8';
      });
      tab.style.background = 'rgba(59, 130, 246, 0.12)';
      tab.style.borderColor = 'rgba(59, 130, 246, 0.3)';
      tab.style.color = '#60a5fa';

      box.querySelectorAll('.tab-content').forEach(tc => tc.style.display = 'none');
      box.querySelector(`#tab-${tab.getAttribute('data-tab')}`).style.display = 'flex';
    });
  });

  const closeBtn = box.querySelector('#close-add-project');
  closeBtn.addEventListener('mouseenter', () => { closeBtn.style.color = '#ffffff'; });
  closeBtn.addEventListener('mouseleave', () => { closeBtn.style.color = '#94a3b8'; });

  function closeModal() {
    modal.style.opacity = '0';
    box.style.transform = 'scale(0.9)';
    setTimeout(() => { modal.remove(); }, 400);
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  const createForm = box.querySelector('#add-project-form');
  createForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title_en = box.querySelector('#proj-title-en').value;
    const tag_en = box.querySelector('#proj-tag-en').value;
    const desc_en = box.querySelector('#proj-desc-en').value;

    const title_hu = box.querySelector('#proj-title-hu').value || title_en;
    const tag_hu = box.querySelector('#proj-tag-hu').value || tag_en;
    const desc_hu = box.querySelector('#proj-desc-hu').value || desc_en;

    const title_ro = box.querySelector('#proj-title-ro').value || title_en;
    const tag_ro = box.querySelector('#proj-tag-ro').value || tag_en;
    const desc_ro = box.querySelector('#proj-desc-ro').value || desc_en;

    const link = box.querySelector('#proj-link').value || '#';

    let image = imgSelect.value;
    if (image === 'custom') {
      image = box.querySelector('#proj-image-custom').value;
    } else if (image === 'file') {
      if (!uploadedBase64Image) {
        showToast('Please select or upload a local image file', 'error');
        return;
      }
      image = uploadedBase64Image;
    }

    const submitBtn = createForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    submitBtn.textContent = 'Uploading to Cloudinary...';

    try {
      if (image && (image.startsWith('data:image/') || image.startsWith('http'))) {
        const cldRes = await uploadMediaToCloudinary(image, 'swen_portfolio/projects');
        if (cldRes && cldRes.url) image = cldRes.url;
      }

      submitBtn.textContent = isEditing ? 'Updating...' : 'Saving...';
      const currentProjects = await getProjects();
      
      if (isEditing) {
        const index = currentProjects.findIndex(p => p.id === projectToEdit.id);
        if (index !== -1) {
          currentProjects[index] = {
            ...currentProjects[index],
            title_en, title_hu, title_ro,
            tag_en, tag_hu, tag_ro,
            desc_en, desc_hu, desc_ro,
            image, link
          };
        }
        localStorage.setItem('custom_projects', JSON.stringify(currentProjects));

        setTimeout(() => {
          showToast('Project updated successfully!', 'success');
          closeModal();
          refreshAllProjectViews();
        }, 400);
      } else {
        const nextId = currentProjects.length > 0 ? Math.max(...currentProjects.map(p => p.id)) + 1 : 1;
        const newProject = {
          id: nextId,
          title_en, title_hu, title_ro,
          tag_en, tag_hu, tag_ro,
          desc_en, desc_hu, desc_ro,
          image, link
        };
        // Add new project to the front so it is listed as #1 on Page 1
        currentProjects.unshift(newProject);
        currentProjectsPage = 1;
        localStorage.setItem('custom_projects', JSON.stringify(currentProjects));

        setTimeout(() => {
          showToast('Project created successfully!', 'success');
          closeModal();
          refreshAllProjectViews();
        }, 400);
      }
    } catch (err) {
      console.error(err);
      showToast('Error saving project.', 'error');
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      submitBtn.textContent = submitText;
    }
  });
}

/* ==========================================================================
   Dynamic Client Reviews Engine & Management (3-Column Layout)
   ========================================================================== */

async function getReviews() {
  const localData = localStorage.getItem('custom_reviews');
  if (localData) {
    try {
      const parsed = JSON.parse(localData);
      let updated = false;
      const cleanReviews = parsed.map(r => {
        
        if (r.id === 1 && r.name === "Alistair Vance") {
          r.avatar = "https://res.cloudinary.com/kgdmg6su/image/upload/v1788179632/swen_portfolio/reviews/exctbjqpxqgypaqv4zd6.jpg";
          updated = true;
        }
        // ----------------------
        
        if (r.id === 2) {
          if (r.name === "András Kovács") {
            r.avatar = "https://res.cloudinary.com/kgdmg6su/image/upload/v1788179611/swen_portfolio/reviews/spmbp0ws4pmgrrwcvrbx.jpg";
            updated = true;
          }
          if (r.quote_body_en && r.quote_body_en.includes("database queries and controllers")) {
            r.quote_body_en = r.quote_body_en.replace("database queries and controllers", "backend architecture and server-side scripts");
            if (r.quote_body_hu) r.quote_body_hu = r.quote_body_hu.replace("adatbázis-lekérdezéseket és vezérlőket", "backend architektúrát és a szerveroldali szkripteket");
            if (r.quote_body_ro) r.quote_body_ro = r.quote_body_ro.replace("interogările de baze de date și controllerele", "arhitectura backend și scripturile de pe server");
            updated = true;
          }
        }
        return r;
      });
      if (updated) {
        localStorage.setItem('custom_reviews', JSON.stringify(cleanReviews));
      }
      return cleanReviews;
    } catch (e) {
      console.error("Error parsing local reviews, resetting...", e);
    }
  }

  // Two default feedbacks requested by user:
  // 1. From old mentor from London
  // 2. From former colleague when user started to code PHP websites
  const defaultReviews = [
    {
      id: 1,
      name: "Alistair Vance",
      title_en: "Senior Engineering Director",
      title_hu: "Szenior mérnöki igazgató",
      title_ro: "Director de inginerie senior",
      company: "London Tech Labs",
      avatar: "https://res.cloudinary.com/kgdmg6su/image/upload/v1788179632/swen_portfolio/reviews/exctbjqpxqgypaqv4zd6.jpg",
      quote_bold_en: "Exceptional craftsmanship and deep technical expertise.",
      quote_bold_hu: "Kivételes szakértelem és mély technikai tudás.",
      quote_bold_ro: "Măiestrie excepțională și expertiză tehnică profundă.",
      quote_body_en: "Swen was hands down one of the most talented engineers I mentored in London. He has a rare ability to bridge UI/UX design with scalable engineering, delivering clean, high-performance web solutions.",
      quote_body_hu: "Swen kétségkívül az egyik legtehetségesebb mérnök volt, akit Londonban mentoráltam. Ritka képessége van arra, hogy áthidalja a UI/UX tervezést a skálázható programozással, tiszta, nagy teljesítményű webes megoldásokat szállítva.",
      quote_body_ro: "Swen a fost cu siguranță unul dintre cei mai talentați ingineri pe care i-am mentorat la Londra. Are o abilitate rară de a face puntea între designul UI/UX și ingineria scalabilă, oferind soluții web curate și performante.",
      status: "active"
    },
    {
      id: 2,
      name: "András Kovács",
      title_en: "Co-Founder & Lead Developer",
      title_hu: "Társalapító és vezető fejlesztő",
      title_ro: "Co-fondator și dezvoltator principal",
      company: "WebCraft Solutions",
      avatar: "https://res.cloudinary.com/kgdmg6su/image/upload/v1788179611/swen_portfolio/reviews/spmbp0ws4pmgrrwcvrbx.jpg",
      quote_bold_en: "Brilliant PHP developer who gets design perfectly!",
      quote_bold_hu: "Zseniális PHP fejlesztő, aki tökéletesen érti a dizájnt!",
      quote_bold_ro: "Un dezvoltator PHP genial care înțelege perfect designul!",
      quote_body_en: "When Swen started building PHP websites, he was already miles ahead. He didn't just code the backend architecture and server-side scripts; he made sure every page layout, button transition, and form input felt completely intuitive.",
      quote_body_hu: "Amikor Swen elkezdett PHP weboldalakat építeni, már mérföldekkel megelőzte a korát. Nemcsak a backend architektúrát és a szerveroldali szkripteket kódolta le, hanem gondoskodott arról is, hogy minden oldalelrendezés, gombátmenet és űrlap teljesen intuitív legyen.",
      quote_body_ro: "Când Swen a început să construiască site-uri PHP, era deja cu mult înainte. Nu doar că a programat arhitectura backend și scripturile de pe server, dar s-a asigurat că fiecare layout de pagină, tranziție de buton și formular sunt complet intuitive.",
      status: "active"
    }
  ];
  localStorage.setItem('custom_reviews', JSON.stringify(defaultReviews));
  return defaultReviews;
}

async function renderDynamicReviews() {
  const reviewsGrid = document.getElementById('reviews-grid');
  if (!reviewsGrid) return;

  const currentLang = localStorage.getItem('lang') || 'en';
  const isAdmin = localStorage.getItem('admin_token') === 'swentech_authenticated_admin';

  try {
    const reviews = await getReviews();

    // Clear grid
    reviewsGrid.innerHTML = '';

    // If admin is logged in, show an "Add Review" card at the very beginning of the layout
    if (isAdmin) {
      const addCard = document.createElement('div');
      addCard.className = 'card add-review-card';
      addCard.style.border = '2px dashed var(--primary)';
      addCard.style.display = 'flex';
      addCard.style.flexDirection = 'column';
      addCard.style.alignItems = 'center';
      addCard.style.justifyContent = 'center';
      addCard.style.minHeight = '250px';
      addCard.style.cursor = 'pointer';
      addCard.style.background = 'rgba(59, 130, 246, 0.02)';
      addCard.style.transition = 'all 0.3s ease';

      addCard.innerHTML = `
        <div style="font-size: 2.5rem; color: var(--primary); margin-bottom: 1rem;"><i class="fa-solid fa-comment-medical"></i></div>
        <h3 style="font-size: 1.25rem; margin: 0; color: #ffffff;">Add New Review</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0.5rem 0 0 0; text-align: center;">Click to add a client feedback</p>
      `;

      addCard.addEventListener('mouseenter', () => {
        addCard.style.background = 'rgba(59, 130, 246, 0.05)';
        addCard.style.transform = 'translateY(-5px)';
      });
      addCard.addEventListener('mouseleave', () => {
        addCard.style.background = 'rgba(59, 130, 246, 0.02)';
        addCard.style.transform = 'translateY(0)';
      });

      addCard.addEventListener('click', () => {
        showReviewModal(null);
      });

      reviewsGrid.appendChild(addCard);
    }

    // Render reviews list
    reviews.forEach(rev => {
      // If NOT admin, only show 'active' status reviews
      if (!isAdmin && rev.status === 'paused') {
        return;
      }

      const card = document.createElement('div');
      card.className = 'card review-card';
      card.setAttribute('data-id', rev.id);
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.justifyContent = 'space-between';
      card.style.position = 'relative';

      // Select localized strings
      const title = rev[`title_${currentLang}`] || rev.title_en;
      const quoteBold = rev[`quote_bold_${currentLang}`] || rev.quote_bold_en;
      const quoteBody = rev[`quote_body_${currentLang}`] || rev.quote_body_en;

      let adminControls = '';
      if (isAdmin) {
        const isPaused = rev.status === 'paused';
        adminControls = `
          <div class="review-admin-badge" style="position: absolute; top: 1rem; right: 1rem; background: ${isPaused ? '#f59e0b' : '#10b981'}; color: #ffffff; padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase;">
            ${rev.status}
          </div>
          <div style="display: flex; gap: 0.5rem; align-items: center; margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(255, 255, 255, 0.08);">
            <button class="edit-review-btn" data-id="${rev.id}" title="Edit Feedback" style="flex: 1; padding: 0.45rem 0.75rem; border-radius: 6px; border: 1px solid #3b82f6; background: rgba(59, 130, 246, 0.12); color: #60a5fa; cursor: pointer; font-size: 0.8rem; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; gap: 0.35rem; transition: all 0.2s;">
              <i class="fa-solid fa-pen-to-square"></i> Edit
            </button>
            <button class="toggle-review-status-btn" data-id="${rev.id}" title="${isPaused ? 'Activate Review' : 'Pause Review'}" style="flex: 1; padding: 0.45rem 0.75rem; border-radius: 6px; border: 1px solid ${isPaused ? '#10b981' : '#f59e0b'}; background: ${isPaused ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)'}; color: ${isPaused ? '#10b981' : '#f59e0b'}; cursor: pointer; font-size: 0.8rem; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; gap: 0.35rem; transition: all 0.2s;">
              <i class="fa-solid ${isPaused ? 'fa-play' : 'fa-pause'}"></i> ${isPaused ? 'Activate' : 'Pause'}
            </button>
            <button class="delete-review-btn" data-id="${rev.id}" title="Delete Review" style="padding: 0.45rem 0.75rem; border-radius: 6px; border: 1px solid #ef4444; background: rgba(239, 68, 68, 0.1); color: #ef4444; cursor: pointer; font-size: 0.8rem; display: inline-flex; align-items: center; justify-content: center; transition: all 0.2s;">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        `;
      }

      card.innerHTML = `
        <div>
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
            <div style="position: relative;">
              <img src="${rev.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120'}" alt="${rev.name}" style="width: 56px; height: 56px; border-radius: 50%; object-fit: cover; border: 2px solid var(--primary); box-shadow: 0 4px 10px rgba(59, 130, 246, 0.2);">
              ${isAdmin ? `
                <div class="card-avatar-edit-hint" data-id="${rev.id}" title="Click to edit feedback & photo" style="position: absolute; bottom: -2px; right: -2px; width: 22px; height: 22px; background: #3b82f6; border: 1.5px solid #0d1423; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.65rem; cursor: pointer;">
                  <i class="fa-solid fa-camera"></i>
                </div>
              ` : ''}
            </div>
            <div>
              <h4 style="margin: 0; font-size: 1.05rem; font-weight: 600; color: #ffffff;">${rev.name}</h4>
              <p style="margin: 0; font-size: 0.8rem; color: var(--text-muted); line-height: 1.3;">${title}, ${rev.company}</p>
            </div>
          </div>
          <p style="font-weight: 600; font-style: italic; color: #ffffff; font-size: 1.05rem; margin-bottom: 0.75rem; line-height: 1.4;">
            "${quoteBold}"
          </p>
          <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-muted); margin-bottom: 0;">
            ${quoteBody}
          </p>
        </div>
        ${adminControls}
      `;

      reviewsGrid.appendChild(card);
    });

    // Wire up dynamic events
    if (isAdmin) {
      reviewsGrid.querySelectorAll('.edit-review-btn, .card-avatar-edit-hint').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.preventDefault();
          e.stopPropagation();
          const id = parseInt(btn.getAttribute('data-id'), 10);
          const currentReviews = await getReviews();
          const reviewToEdit = currentReviews.find(r => r.id === id);
          if (reviewToEdit) {
            showReviewModal(reviewToEdit);
          }
        });
      });

      reviewsGrid.querySelectorAll('.toggle-review-status-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.preventDefault();
          e.stopPropagation();
          const id = parseInt(btn.getAttribute('data-id'), 10);
          await toggleReviewStatus(id);
        });
      });

      reviewsGrid.querySelectorAll('.delete-review-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const id = parseInt(btn.getAttribute('data-id'), 10);
          const cardElement = btn.closest('.card');
          const nameElement = cardElement ? cardElement.querySelector('h4') : null;
          const clientName = nameElement ? nameElement.textContent : 'this feedback';
          showDeleteReviewConfirmModal(id, clientName);
        });
      });
    }

  } catch (err) {
    console.error("Error rendering reviews:", err);
  }
}

async function toggleReviewStatus(id) {
  try {
    const currentReviews = await getReviews();
    const updatedReviews = currentReviews.map(r => {
      if (r.id === id) {
        return { ...r, status: r.status === 'active' ? 'paused' : 'active' };
      }
      return r;
    });
    localStorage.setItem('custom_reviews', JSON.stringify(updatedReviews));
    showToast('Review status updated successfully', 'success');
    renderDynamicReviews();
  } catch (err) {
    console.error(err);
    showToast('Failed to update review status', 'error');
  }
}

async function deleteReview(id) {
  try {
    const currentReviews = await getReviews();
    const updatedReviews = currentReviews.filter(r => r.id !== id);
    localStorage.setItem('custom_reviews', JSON.stringify(updatedReviews));
    showToast('Review deleted successfully', 'success');
    renderDynamicReviews();
  } catch (err) {
    console.error(err);
    showToast('Failed to delete review', 'error');
  }
}

function showDeleteReviewConfirmModal(id, clientName) {
  if (document.getElementById('delete-review-confirm-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'delete-review-confirm-modal';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.background = 'rgba(6, 9, 21, 0.75)';
  modal.style.backdropFilter = 'blur(16px)';
  modal.style.webkitBackdropFilter = 'blur(16px)';
  modal.style.zIndex = '100000';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.opacity = '0';
  modal.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)';

  const box = document.createElement('div');
  box.style.background = 'rgba(13, 20, 35, 0.9)';
  box.style.border = '1px solid rgba(255, 255, 255, 0.08)';
  box.style.borderRadius = '20px';
  box.style.padding = '2.5rem 2rem';
  box.style.width = '100%';
  box.style.maxWidth = '400px';
  box.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(239, 68, 68, 0.15)';
  box.style.transform = 'scale(0.9)';
  box.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
  box.style.color = '#ffffff';
  box.style.textAlign = 'center';

  box.innerHTML = `
    <div style="font-size: 3rem; color: #ef4444; margin-bottom: 1.5rem;">
      <i class="fa-solid fa-triangle-exclamation"></i>
    </div>
    <h3 style="margin: 0 0 1rem 0; font-size: 1.5rem; font-weight: 600; color: #ffffff;">Delete Review?</h3>
    <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 2rem;">
      Are you sure you want to permanently delete the review from <strong>"${clientName}"</strong>? This action cannot be undone.
    </p>
    <div style="display: flex; gap: 1rem; justify-content: center;">
      <button id="cancel-delete-review-btn" style="flex: 1; padding: 0.75rem; border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.1); background: rgba(255, 255, 255, 0.03); color: #ffffff; font-weight: 600; cursor: pointer; transition: all 0.2s;">Cancel</button>
      <button id="confirm-delete-review-btn" style="flex: 1; padding: 0.75rem; border-radius: 10px; border: none; background: #ef4444; color: #ffffff; font-weight: 600; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.35);">Delete</button>
    </div>
  `;

  modal.appendChild(box);
  document.body.appendChild(modal);

  setTimeout(() => {
    modal.style.opacity = '1';
    box.style.transform = 'scale(1)';
  }, 20);

  const cancelBtn = box.querySelector('#cancel-delete-review-btn');
  const confirmBtn = box.querySelector('#confirm-delete-review-btn');

  cancelBtn.addEventListener('mouseenter', () => { cancelBtn.style.background = 'rgba(255, 255, 255, 0.08)'; });
  cancelBtn.addEventListener('mouseleave', () => { cancelBtn.style.background = 'rgba(255, 255, 255, 0.03)'; });
  
  confirmBtn.addEventListener('mouseenter', () => { 
    confirmBtn.style.background = '#dc2626'; 
    confirmBtn.style.boxShadow = '0 4px 20px rgba(239, 68, 68, 0.5)';
  });
  confirmBtn.addEventListener('mouseleave', () => { 
    confirmBtn.style.background = '#ef4444'; 
    confirmBtn.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.35)';
  });

  function closeModal() {
    modal.style.opacity = '0';
    box.style.transform = 'scale(0.9)';
    setTimeout(() => { modal.remove(); }, 400);
  }

  cancelBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  confirmBtn.addEventListener('click', async () => {
    confirmBtn.disabled = true;
    confirmBtn.textContent = 'Deleting...';
    await deleteReview(id);
    closeModal();
  });
}

function showAddReviewModal() {
  showReviewModal(null);
}

function showReviewModal(reviewToEdit = null) {
  const isEditing = !!reviewToEdit;
  const modalId = 'review-edit-modal';
  if (document.getElementById(modalId)) return;

  const modal = document.createElement('div');
  modal.id = modalId;
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.background = 'rgba(6, 9, 21, 0.8)';
  modal.style.backdropFilter = 'blur(16px)';
  modal.style.webkitBackdropFilter = 'blur(16px)';
  modal.style.zIndex = '100000';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.opacity = '0';
  modal.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
  modal.style.overflowY = 'auto';
  modal.style.padding = '2rem 1rem';

  const box = document.createElement('div');
  box.style.background = 'rgba(13, 20, 35, 0.95)';
  box.style.border = '1px solid rgba(59, 130, 246, 0.3)';
  box.style.borderRadius = '20px';
  box.style.padding = '2rem';
  box.style.width = '100%';
  box.style.maxWidth = '640px';
  box.style.maxHeight = '90vh';
  box.style.overflowY = 'auto';
  box.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 40px rgba(59, 130, 246, 0.2)';
  box.style.transform = 'scale(0.9)';
  box.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
  box.style.color = '#ffffff';
  box.style.margin = 'auto';

  const modalTitle = isEditing ? 'Edit Client Feedback' : 'Add New Client Feedback';
  const modalIcon = isEditing ? 'fa-pen-to-square' : 'fa-comment-medical';
  const submitText = isEditing ? 'Save Changes' : 'Create Feedback';

  const rev = reviewToEdit || {};
  let currentAvatar = rev.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120';
  let uploadedBase64Avatar = null;

  box.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 0.75rem;">
      <h3 style="margin: 0; font-size: 1.4rem; font-weight: 600; color: #ffffff; display: flex; align-items: center; gap: 0.5rem;">
        <i class="fa-solid ${modalIcon}" style="color: #3b82f6;"></i>
        <span>${modalTitle}</span>
      </h3>
      <button id="close-review-modal" style="background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 1.3rem; transition: color 0.2s;"><i class="fa-solid fa-xmark"></i></button>
    </div>
    
    <form id="review-form" style="display: flex; flex-direction: column; gap: 1.25rem;">
      
      <!-- Multilingual tabs -->
      <div style="display: flex; gap: 0.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 0.5rem; margin-bottom: 0.25rem;">
        <button type="button" class="form-review-tab active" data-tab="en" style="background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.4); color: #60a5fa; padding: 0.4rem 0.9rem; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.85rem;">🇬🇧 English</button>
        <button type="button" class="form-review-tab" data-tab="hu" style="background: none; border: 1px solid transparent; color: #94a3b8; padding: 0.4rem 0.9rem; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.85rem;">🇭🇺 Magyar</button>
        <button type="button" class="form-review-tab" data-tab="ro" style="background: none; border: 1px solid transparent; color: #94a3b8; padding: 0.4rem 0.9rem; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.85rem;">🇷🇴 Română</button>
      </div>

      <!-- ENGLISH SUB-FORM -->
      <div class="tab-review-content" id="tab-review-en" style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; flex-direction: column; gap: 0.35rem;">
          <label style="font-size: 0.8rem; font-weight: 500; color: #94a3b8;">Job Title (EN) *</label>
          <input type="text" id="rev-title-en" required value="${rev.title_en || ''}" placeholder="e.g. Senior Engineering Director" style="width: 100%; padding: 0.65rem 0.85rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.12); background: rgba(255, 255, 255, 0.03); color: #ffffff; font-family: inherit; font-size: 0.9rem; outline: none;" />
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.35rem;">
          <label style="font-size: 0.8rem; font-weight: 500; color: #94a3b8;">Short Quote Highlight (EN) *</label>
          <input type="text" id="rev-quote-bold-en" required value="${rev.quote_bold_en || ''}" placeholder="e.g. Exceptional technical expert and visionary" style="width: 100%; padding: 0.65rem 0.85rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.12); background: rgba(255, 255, 255, 0.03); color: #ffffff; font-family: inherit; font-size: 0.9rem; outline: none;" />
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.35rem;">
          <label style="font-size: 0.8rem; font-weight: 500; color: #94a3b8;">Full Feedback Body (EN) *</label>
          <textarea id="rev-quote-body-en" required placeholder="Write the detailed client recommendation..." rows="3" style="width: 100%; padding: 0.65rem 0.85rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.12); background: rgba(255, 255, 255, 0.03); color: #ffffff; font-family: inherit; font-size: 0.9rem; outline: none; resize: vertical;">${rev.quote_body_en || ''}</textarea>
        </div>
      </div>

      <!-- HUNGARIAN SUB-FORM -->
      <div class="tab-review-content" id="tab-review-hu" style="display: none; flex-direction: column; gap: 1rem;">
        <div style="display: flex; flex-direction: column; gap: 0.35rem;">
          <label style="font-size: 0.8rem; font-weight: 500; color: #94a3b8;">Job Title (HU)</label>
          <input type="text" id="rev-title-hu" value="${rev.title_hu || ''}" placeholder="Szenior mérnöki igazgató (defaults to English if empty)" style="width: 100%; padding: 0.65rem 0.85rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.12); background: rgba(255, 255, 255, 0.03); color: #ffffff; font-family: inherit; font-size: 0.9rem; outline: none;" />
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.35rem;">
          <label style="font-size: 0.8rem; font-weight: 500; color: #94a3b8;">Short Quote Highlight (HU)</label>
          <input type="text" id="rev-quote-bold-hu" value="${rev.quote_bold_hu || ''}" placeholder="Kivételes szakértelem..." style="width: 100%; padding: 0.65rem 0.85rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.12); background: rgba(255, 255, 255, 0.03); color: #ffffff; font-family: inherit; font-size: 0.9rem; outline: none;" />
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.35rem;">
          <label style="font-size: 0.8rem; font-weight: 500; color: #94a3b8;">Full Feedback Body (HU)</label>
          <textarea id="rev-quote-body-hu" placeholder="Vélemény részletes szövege..." rows="3" style="width: 100%; padding: 0.65rem 0.85rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.12); background: rgba(255, 255, 255, 0.03); color: #ffffff; font-family: inherit; font-size: 0.9rem; outline: none; resize: vertical;">${rev.quote_body_hu || ''}</textarea>
        </div>
      </div>

      <!-- ROMANIAN SUB-FORM -->
      <div class="tab-review-content" id="tab-review-ro" style="display: none; flex-direction: column; gap: 1rem;">
        <div style="display: flex; flex-direction: column; gap: 0.35rem;">
          <label style="font-size: 0.8rem; font-weight: 500; color: #94a3b8;">Job Title (RO)</label>
          <input type="text" id="rev-title-ro" value="${rev.title_ro || ''}" placeholder="Director de inginerie senior (defaults to English if empty)" style="width: 100%; padding: 0.65rem 0.85rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.12); background: rgba(255, 255, 255, 0.03); color: #ffffff; font-family: inherit; font-size: 0.9rem; outline: none;" />
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.35rem;">
          <label style="font-size: 0.8rem; font-weight: 500; color: #94a3b8;">Short Quote Highlight (RO)</label>
          <input type="text" id="rev-quote-bold-ro" value="${rev.quote_bold_ro || ''}" placeholder="Măiestrie excepțională..." style="width: 100%; padding: 0.65rem 0.85rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.12); background: rgba(255, 255, 255, 0.03); color: #ffffff; font-family: inherit; font-size: 0.9rem; outline: none;" />
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.35rem;">
          <label style="font-size: 0.8rem; font-weight: 500; color: #94a3b8;">Full Feedback Body (RO)</label>
          <textarea id="rev-quote-body-ro" placeholder="Textul integral al recenziei..." rows="3" style="width: 100%; padding: 0.65rem 0.85rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.12); background: rgba(255, 255, 255, 0.03); color: #ffffff; font-family: inherit; font-size: 0.9rem; outline: none; resize: vertical;">${rev.quote_body_ro || ''}</textarea>
        </div>
      </div>

      <!-- COMMON CLIENT METADATA & AVATAR REPLACEMENT -->
      <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 1.25rem; display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div style="display: flex; flex-direction: column; gap: 0.35rem;">
            <label style="font-size: 0.8rem; font-weight: 500; color: #94a3b8;">Client Name *</label>
            <input type="text" id="rev-name" required value="${rev.name || ''}" placeholder="e.g. Alistair Vance" style="width: 100%; padding: 0.65rem 0.85rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.12); background: rgba(255, 255, 255, 0.03); color: #ffffff; font-family: inherit; font-size: 0.9rem; outline: none;" />
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.35rem;">
            <label style="font-size: 0.8rem; font-weight: 500; color: #94a3b8;">Company Name *</label>
            <input type="text" id="rev-company" required value="${rev.company || ''}" placeholder="e.g. London Tech Labs" style="width: 100%; padding: 0.65rem 0.85rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.12); background: rgba(255, 255, 255, 0.03); color: #ffffff; font-family: inherit; font-size: 0.9rem; outline: none;" />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 1rem;">
          <div style="display: flex; flex-direction: column; gap: 0.35rem;">
            <label style="font-size: 0.8rem; font-weight: 500; color: #94a3b8;">Client Photo / Avatar Source</label>
            <select id="rev-avatar-select" style="width: 100%; padding: 0.65rem 0.85rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.15); background: #0d1423; color: #ffffff; font-family: inherit; font-size: 0.9rem; outline: none; cursor: pointer;">
              <option value="file">📁 Upload Image from Local PC</option>
              <option value="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120">Male Avatar 1 (Mentor style)</option>
              <option value="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120">Male Avatar 2 (Colleague style)</option>
              <option value="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120">Female Avatar 1 (Professional)</option>
              <option value="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120">Female Avatar 2 (Creative)</option>
              <option value="custom">🔗 Custom Image URL</option>
            </select>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.35rem;">
            <label style="font-size: 0.8rem; font-weight: 500; color: #94a3b8;">Display Status *</label>
            <select id="rev-status-select" style="width: 100%; padding: 0.65rem 0.85rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.15); background: #0d1423; color: #ffffff; font-family: inherit; font-size: 0.9rem; outline: none; cursor: pointer;">
              <option value="active" ${rev.status !== 'paused' ? 'selected' : ''}>Active (Visible to public)</option>
              <option value="paused" ${rev.status === 'paused' ? 'selected' : ''}>Paused (Admin only)</option>
            </select>
          </div>
        </div>

        <!-- LOCAL FILE UPLOAD DROPZONE CONTAINER -->
        <div id="rev-file-upload-container" style="display: flex; flex-direction: column; gap: 0.5rem;">
          <input type="file" id="rev-image-file" accept="image/*" style="display: none;">
          <div id="rev-file-dropzone" style="border: 2px dashed rgba(59, 130, 246, 0.4); border-radius: 12px; padding: 1.5rem 1rem; text-align: center; cursor: pointer; background: rgba(59, 130, 246, 0.04); transition: all 0.3s ease;">
            <div style="font-size: 1.8rem; color: #3b82f6; margin-bottom: 0.4rem;"><i class="fa-solid fa-cloud-arrow-up"></i></div>
            <p style="margin: 0 0 0.2rem 0; font-size: 0.9rem; font-weight: 600; color: #ffffff;">Choose an image from PC or drag & drop</p>
            <p style="margin: 0; font-size: 0.75rem; color: #94a3b8;">Supports PNG, JPG, JPEG, WEBP, SVG</p>
          </div>
        </div>
        
        <!-- CUSTOM AVATAR URL INPUT CONTAINER -->
        <div id="custom-rev-avatar-container" style="display: none; flex-direction: column; gap: 0.35rem;">
          <label style="font-size: 0.8rem; font-weight: 500; color: #94a3b8;">Custom Avatar URL</label>
          <input type="text" id="rev-avatar-custom" placeholder="https://example.com/client-photo.jpg" style="width: 100%; padding: 0.65rem 0.85rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.12); background: rgba(255, 255, 255, 0.03); color: #ffffff; font-family: inherit; font-size: 0.9rem; outline: none;" />
        </div>

        <!-- LIVE AVATAR PREVIEW CARD -->
        <div style="padding: 0.85rem 1rem; background: rgba(0, 0, 0, 0.25); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; display: flex; align-items: center; gap: 1rem;">
          <img id="rev-live-avatar-preview" src="${currentAvatar}" alt="Avatar Preview" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid var(--primary); box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3); flex-shrink: 0;" />
          <div style="flex: 1;">
            <div style="font-size: 0.85rem; font-weight: 600; color: #ffffff;">Avatar Preview</div>
            <div id="rev-avatar-status-label" style="font-size: 0.75rem; color: #94a3b8;">${isEditing ? 'Currently saved avatar' : 'Default avatar selected'}</div>
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 0.5rem;">
        <button type="button" id="cancel-review-btn" style="padding: 0.75rem 1.4rem; border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.12); background: rgba(255, 255, 255, 0.04); color: #ffffff; font-weight: 500; cursor: pointer; transition: all 0.2s;">Cancel</button>
        <button type="submit" id="submit-review-btn" style="padding: 0.75rem 1.75rem; border-radius: 10px; border: none; background: linear-gradient(135deg, #3b82f6, #4f46e5); color: #ffffff; font-weight: 600; cursor: pointer; transition: opacity 0.3s, transform 0.2s; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.35);">${submitText}</button>
      </div>
    </form>
  `;

  modal.appendChild(box);
  document.body.appendChild(modal);

  setTimeout(() => {
    modal.style.opacity = '1';
    box.style.transform = 'scale(1)';
  }, 20);

  box.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('focus', () => { input.style.borderColor = '#3b82f6'; });
    input.addEventListener('blur', () => { input.style.borderColor = 'rgba(255, 255, 255, 0.12)'; });
  });

  const avatarSelect = box.querySelector('#rev-avatar-select');
  const fileUploadContainer = box.querySelector('#rev-file-upload-container');
  const customAvatarContainer = box.querySelector('#custom-rev-avatar-container');
  const customAvatarInput = box.querySelector('#rev-avatar-custom');
  const fileInput = box.querySelector('#rev-image-file');
  const dropzone = box.querySelector('#rev-file-dropzone');
  const livePreview = box.querySelector('#rev-live-avatar-preview');
  const statusLabel = box.querySelector('#rev-avatar-status-label');

  function updateAvatarPreview(src, label) {
    livePreview.src = src;
    statusLabel.textContent = label;
  }

  // Pre-configure avatar selector for existing review
  if (isEditing && rev.avatar) {
    const presets = [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120'
    ];
    if (presets.includes(rev.avatar)) {
      avatarSelect.value = rev.avatar;
      fileUploadContainer.style.display = 'none';
      customAvatarContainer.style.display = 'none';
      updateAvatarPreview(rev.avatar, 'Preset avatar selected');
    } else if (rev.avatar.startsWith('data:image/')) {
      avatarSelect.value = 'file';
      fileUploadContainer.style.display = 'flex';
      customAvatarContainer.style.display = 'none';
      uploadedBase64Avatar = rev.avatar;
      updateAvatarPreview(rev.avatar, 'Saved local photo');
    } else {
      avatarSelect.value = 'custom';
      fileUploadContainer.style.display = 'none';
      customAvatarContainer.style.display = 'flex';
      customAvatarInput.value = rev.avatar;
      updateAvatarPreview(rev.avatar, 'Custom avatar URL');
    }
  }

  // Handle local file selection & drag-and-drop
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.style.background = 'rgba(59, 130, 246, 0.15)';
      dropzone.style.borderColor = '#60a5fa';
    });
    dropzone.addEventListener('dragleave', () => {
      dropzone.style.background = 'rgba(59, 130, 246, 0.04)';
      dropzone.style.borderColor = 'rgba(59, 130, 246, 0.4)';
    });
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.style.background = 'rgba(59, 130, 246, 0.04)';
      dropzone.style.borderColor = 'rgba(59, 130, 246, 0.4)';
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleLocalFile(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files[0]) {
        handleLocalFile(fileInput.files[0]);
      }
    });
  }

  function handleLocalFile(file) {
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedBase64Avatar = e.target.result;
      updateAvatarPreview(uploadedBase64Avatar, `Selected local PC image: ${file.name}`);
    };
    reader.readAsDataURL(file);
  }

  avatarSelect.addEventListener('change', () => {
    if (avatarSelect.value === 'file') {
      fileUploadContainer.style.display = 'flex';
      customAvatarContainer.style.display = 'none';
      customAvatarInput.required = false;
      if (uploadedBase64Avatar) {
        updateAvatarPreview(uploadedBase64Avatar, 'Local image selected');
      } else if (isEditing && rev.avatar && rev.avatar.startsWith('data:image/')) {
        updateAvatarPreview(rev.avatar, 'Current local image');
      }
    } else if (avatarSelect.value === 'custom') {
      fileUploadContainer.style.display = 'none';
      customAvatarContainer.style.display = 'flex';
      customAvatarInput.required = true;
      if (customAvatarInput.value.trim()) {
        updateAvatarPreview(customAvatarInput.value.trim(), 'Custom image URL');
      }
    } else {
      fileUploadContainer.style.display = 'none';
      customAvatarContainer.style.display = 'none';
      customAvatarInput.required = false;
      updateAvatarPreview(avatarSelect.value, 'Preset avatar');
    }
  });

  customAvatarInput.addEventListener('input', () => {
    if (customAvatarInput.value.trim()) {
      updateAvatarPreview(customAvatarInput.value.trim(), 'Custom avatar preview');
    }
  });

  // Language Tabs switching
  const tabs = box.querySelectorAll('.form-review-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.style.background = 'none';
        t.style.borderColor = 'transparent';
        t.style.color = '#94a3b8';
      });
      tab.style.background = 'rgba(59, 130, 246, 0.15)';
      tab.style.borderColor = 'rgba(59, 130, 246, 0.4)';
      tab.style.color = '#60a5fa';

      box.querySelectorAll('.tab-review-content').forEach(tc => tc.style.display = 'none');
      const targetContent = box.querySelector(`#tab-review-${tab.getAttribute('data-tab')}`);
      if (targetContent) targetContent.style.display = 'flex';
    });
  });

  const closeBtn = box.querySelector('#close-review-modal');
  const cancelBtn = box.querySelector('#cancel-review-btn');

  function closeModal() {
    modal.style.opacity = '0';
    box.style.transform = 'scale(0.9)';
    setTimeout(() => { modal.remove(); }, 400);
  }

  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  const form = box.querySelector('#review-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = box.querySelector('#rev-name').value.trim();
    const company = box.querySelector('#rev-company').value.trim();
    const status = box.querySelector('#rev-status-select').value;

    const title_en = box.querySelector('#rev-title-en').value.trim();
    const quote_bold_en = box.querySelector('#rev-quote-bold-en').value.trim();
    const quote_body_en = box.querySelector('#rev-quote-body-en').value.trim();

    const title_hu = box.querySelector('#rev-title-hu').value.trim() || title_en;
    const quote_bold_hu = box.querySelector('#rev-quote-bold-hu').value.trim() || quote_bold_en;
    const quote_body_hu = box.querySelector('#rev-quote-body-hu').value.trim() || quote_body_en;

    const title_ro = box.querySelector('#rev-title-ro').value.trim() || title_en;
    const quote_bold_ro = box.querySelector('#rev-quote-bold-ro').value.trim() || quote_bold_en;
    const quote_body_ro = box.querySelector('#rev-quote-body-ro').value.trim() || quote_body_en;

    let finalAvatar = avatarSelect.value;
    if (finalAvatar === 'custom') {
      finalAvatar = customAvatarInput.value.trim();
      if (!finalAvatar) {
        showToast('Please enter a valid image URL', 'error');
        return;
      }
    } else if (finalAvatar === 'file') {
      if (uploadedBase64Avatar) {
        finalAvatar = uploadedBase64Avatar;
      } else if (isEditing && rev.avatar) {
        finalAvatar = rev.avatar;
      } else {
        showToast('Please select or upload an image file from your PC', 'error');
        return;
      }
    }

    const submitBtn = box.querySelector('#submit-review-btn');
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    submitBtn.textContent = 'Uploading to Cloudinary...';

    try {
      if (finalAvatar && (finalAvatar.startsWith('data:image/') || finalAvatar.startsWith('http'))) {
        const cldRes = await uploadMediaToCloudinary(finalAvatar, 'swen_portfolio/reviews');
        if (cldRes && cldRes.url) finalAvatar = cldRes.url;
      }

      submitBtn.textContent = isEditing ? 'Updating...' : 'Saving...';
      const currentReviews = await getReviews();

      if (isEditing) {
        const index = currentReviews.findIndex(r => r.id === rev.id);
        if (index !== -1) {
          currentReviews[index] = {
            ...currentReviews[index],
            name,
            company,
            status,
            avatar: finalAvatar,
            title_en, title_hu, title_ro,
            quote_bold_en, quote_bold_hu, quote_bold_ro,
            quote_body_en, quote_body_hu, quote_body_ro
          };
        }
        localStorage.setItem('custom_reviews', JSON.stringify(currentReviews));
        setTimeout(() => {
          showToast('Feedback updated successfully!', 'success');
          closeModal();
          renderDynamicReviews();
        }, 300);
      } else {
        const nextId = currentReviews.length > 0 ? Math.max(...currentReviews.map(r => r.id)) + 1 : 1;
        const newReview = {
          id: nextId,
          name,
          company,
          status,
          avatar: finalAvatar,
          title_en, title_hu, title_ro,
          quote_bold_en, quote_bold_hu, quote_bold_ro,
          quote_body_en, quote_body_hu, quote_body_ro
        };
        currentReviews.push(newReview);
        localStorage.setItem('custom_reviews', JSON.stringify(currentReviews));
        setTimeout(() => {
          showToast('Feedback added successfully!', 'success');
          closeModal();
          renderDynamicReviews();
        }, 300);
      }
    } catch (err) {
      console.error(err);
      showToast('Error saving feedback', 'error');
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      submitBtn.textContent = submitText;
    }
  });
}

/* ==========================================================================
   DYNAMIC SERVICES PAGE CMS ENGINE & EDITING SYSTEM
   ========================================================================== */

async function getServicesData() {
  const localData = localStorage.getItem('custom_services');
  if (localData) {
    try {
      return JSON.parse(localData);
    } catch(e) {
      console.error('Error parsing custom_services', e);
    }
  }

  try {
    const res = await fetch('services.json');
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('custom_services', JSON.stringify(data));
      return data;
    }
  } catch(e) {
    console.error('Error fetching services.json', e);
  }

  return null;
}

function saveServicesData(data) {
  localStorage.setItem('custom_services', JSON.stringify(data));
  renderDynamicServicesPage();
}

function createLanguageTabsHTML() {
  return `
    <div style="display: flex; gap: 0.5rem; margin-bottom: 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.75rem;">
      <button type="button" class="tab-lang-btn" data-lang="en" style="padding: 0.4rem 0.9rem; border-radius: 8px; border: 1px solid rgba(59, 130, 246, 0.3); background: rgba(59, 130, 246, 0.15); color: #60a5fa; cursor: pointer; font-size: 0.85rem; font-weight: 600;">🇬🇧 English</button>
      <button type="button" class="tab-lang-btn" data-lang="hu" style="padding: 0.4rem 0.9rem; border-radius: 8px; border: 1px solid transparent; background: none; color: #94a3b8; cursor: pointer; font-size: 0.85rem; font-weight: 600;">🇭🇺 Magyar</button>
      <button type="button" class="tab-lang-btn" data-lang="ro" style="padding: 0.4rem 0.9rem; border-radius: 8px; border: 1px solid transparent; background: none; color: #94a3b8; cursor: pointer; font-size: 0.85rem; font-weight: 600;">🇷🇴 Română</button>
    </div>
  `;
}

function setupLanguageTabs(modalBox) {
  const tabs = modalBox.querySelectorAll('.tab-lang-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.style.background = 'none';
        t.style.borderColor = 'transparent';
        t.style.color = '#94a3b8';
      });
      tab.style.background = 'rgba(59, 130, 246, 0.15)';
      tab.style.borderColor = 'rgba(59, 130, 246, 0.3)';
      tab.style.color = '#60a5fa';

      const targetLang = tab.getAttribute('data-lang');
      modalBox.querySelectorAll('.lang-tab-content').forEach(c => {
        if (c.getAttribute('data-lang') === targetLang) {
          c.style.display = 'block';
        } else {
          c.style.display = 'none';
        }
      });
    });
  });
}

async function renderDynamicServicesPage() {
  const heroContainer = document.getElementById('services-hero-container');
  const topServicesGrid = document.getElementById('top-services-grid');
  if (!heroContainer && !topServicesGrid) return;

  const currentLang = localStorage.getItem('lang') || 'en';
  const isAdmin = localStorage.getItem('admin_token') === 'swentech_authenticated_admin';
  const servicesData = await getServicesData();
  if (!servicesData) return;

  const getStr = (obj, key) => {
    if (!obj) return '';
    return obj[`${key}_${currentLang}`] || obj[`${key}_en`] || obj[key] || '';
  };

  /* 1. Hero Section */
  if (heroContainer && servicesData.hero) {
    const heroTitle = getStr(servicesData.hero, 'title');
    const heroSubtitle = getStr(servicesData.hero, 'subtitle');
    heroContainer.innerHTML = `
      <div style="position: relative; display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between;">
        <div>
          <h1>${heroTitle}</h1>
          <p>${heroSubtitle}</p>
        </div>
        ${isAdmin ? `
          <button class="admin-edit-sec-btn edit-hero-btn" style="margin-top: 0.5rem; padding: 0.5rem 1rem; background: rgba(59, 130, 246, 0.2); border: 1px solid rgba(59, 130, 246, 0.4); border-radius: 8px; color: #60a5fa; font-weight: 600; cursor: pointer; transition: all 0.2s ease;">
            <i class="fa-solid fa-pen-to-square"></i> Edit Hero Section
          </button>
        ` : ''}
      </div>
    `;

    if (isAdmin) {
      const editHeroBtn = heroContainer.querySelector('.edit-hero-btn');
      if (editHeroBtn) {
        editHeroBtn.addEventListener('click', () => showEditHeroModal(servicesData));
      }
    }
  }

  /* 2. Top Services Grid */
  if (topServicesGrid && servicesData.topServices) {
    topServicesGrid.innerHTML = '';
    servicesData.topServices.forEach(card => {
      const cardTitle = getStr(card, 'title');
      const cardDesc = getStr(card, 'desc');
      const cardEl = document.createElement('div');
      cardEl.className = 'card';
      cardEl.style.display = 'flex';
      cardEl.style.flexDirection = 'column';
      cardEl.style.justifyContent = 'space-between';
      cardEl.style.alignItems = 'stretch';
      cardEl.style.minHeight = '250px';
      cardEl.style.position = 'relative';

      cardEl.innerHTML = `
        <div style="flex-grow: 1;">
          <div class="card-icon-wrapper"><i class="${card.icon || 'fa-solid fa-code'} card-icon"></i></div>
          <h3>${cardTitle}</h3>
          <p>${cardDesc}</p>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
          ${isAdmin ? `
            <div style="display: flex; gap: 0.5rem;">
              <button class="edit-top-service-btn" data-id="${card.id}" style="padding: 0.35rem 0.7rem; background: rgba(59, 130, 246, 0.18); border: 1px solid rgba(59, 130, 246, 0.35); border-radius: 6px; color: #60a5fa; cursor: pointer; font-size: 0.8rem;" title="Edit Service"><i class="fa-solid fa-pen-to-square"></i></button>
              <button class="delete-top-service-btn" data-id="${card.id}" style="padding: 0.35rem 0.7rem; background: rgba(239, 68, 68, 0.18); border: 1px solid rgba(239, 68, 68, 0.35); border-radius: 6px; color: #f87171; cursor: pointer; font-size: 0.8rem;" title="Delete Service"><i class="fa-solid fa-trash"></i></button>
            </div>
          ` : '<div></div>'}
          <a href="#pricing-guide" class="card-scroll-arrow-link" style="color: var(--primary); font-size: 1.35rem; text-decoration: none;" title="Scroll to Pricing Guide">
            <i class="fa-solid fa-circle-arrow-down"></i>
          </a>
        </div>
      `;

      if (isAdmin) {
        const editBtn = cardEl.querySelector('.edit-top-service-btn');
        if (editBtn) editBtn.addEventListener('click', () => showEditTopServiceModal(card, servicesData));
        const delBtn = cardEl.querySelector('.delete-top-service-btn');
        if (delBtn) delBtn.addEventListener('click', () => deleteTopServiceCard(card.id, servicesData));
      }

      topServicesGrid.appendChild(cardEl);
    });

    if (isAdmin) {
      const addCard = document.createElement('div');
      addCard.className = 'card';
      addCard.style.display = 'flex';
      addCard.style.flexDirection = 'column';
      addCard.style.justifyContent = 'center';
      addCard.style.alignItems = 'center';
      addCard.style.minHeight = '250px';
      addCard.style.border = '2px dashed rgba(59, 130, 246, 0.4)';
      addCard.style.background = 'rgba(13, 19, 33, 0.4)';
      addCard.style.cursor = 'pointer';
      addCard.style.transition = 'all 0.3s ease';
      addCard.innerHTML = `
        <i class="fa-solid fa-plus-circle" style="font-size: 2.2rem; color: #3b82f6; margin-bottom: 0.75rem;"></i>
        <h3 style="font-size: 1.1rem; color: #60a5fa; margin: 0;">Add Service Card</h3>
      `;
      addCard.addEventListener('click', () => showEditTopServiceModal(null, servicesData));
      topServicesGrid.appendChild(addCard);
    }
  }

  /* 3. Pricing Guide Header */
  const pricingHeaderContainer = document.getElementById('pricing-header-container');
  if (pricingHeaderContainer && servicesData.pricingHeader) {
    const pTitle = getStr(servicesData.pricingHeader, 'title');
    const pIntro = getStr(servicesData.pricingHeader, 'intro');
    pricingHeaderContainer.innerHTML = `
      <div style="position: relative;">
        <h2>${pTitle}</h2>
        <p class="pricing-intro">${pIntro}</p>
        ${isAdmin ? `
          <button class="edit-pricing-header-btn" style="margin-top: 0.5rem; padding: 0.45rem 0.9rem; background: rgba(59, 130, 246, 0.2); border: 1px solid rgba(59, 130, 246, 0.4); border-radius: 8px; color: #60a5fa; font-weight: 600; cursor: pointer;">
            <i class="fa-solid fa-pen-to-square"></i> Edit Pricing Header
          </button>
        ` : ''}
      </div>
    `;

    const editHeaderBtn = pricingHeaderContainer.querySelector('.edit-pricing-header-btn');
    if (editHeaderBtn) editHeaderBtn.addEventListener('click', () => showEditPricingHeaderModal(servicesData));
  }

  /* 4. Pricing Packages Grid */
  const pricingCardsGrid = document.getElementById('pricing-cards-grid');
  if (pricingCardsGrid && servicesData.packages) {
    pricingCardsGrid.innerHTML = '';
    const includesLabel = currentLang === 'hu' ? 'Mit tartalmaz:' : (currentLang === 'ro' ? 'Ce este inclus:' : (currentLang === 'it' ? 'Cosa è incluso:' : "What's Included:"));
    const timelineLabel = currentLang === 'hu' ? 'Várható időtartam:' : (currentLang === 'ro' ? 'Timp estimat:' : (currentLang === 'it' ? 'Tempistica stimata:' : 'Estimated Timeline:'));

    servicesData.packages.forEach(pkg => {
      const pkgTagline = getStr(pkg, 'tagline');
      const pkgTitle = getStr(pkg, 'title');
      const pkgSubtitle = getStr(pkg, 'subtitle');
      const pkgBadge = getStr(pkg, 'badge');
      const pkgTimeline = getStr(pkg, 'timeline');
      const pkgNote = getStr(pkg, 'note');

      let items = pkg[`items_${currentLang}`] || pkg.items_en || [];
      if (!Array.isArray(items)) items = [];

      const cardEl = document.createElement('div');
      cardEl.className = `pricing-card ${pkg.isPopular ? 'popular' : ''}`;
      cardEl.style.display = 'flex';
      cardEl.style.flexDirection = 'column';

      cardEl.innerHTML = `
        ${pkg.isPopular && pkgBadge ? `<span class="pricing-badge">${pkgBadge}</span>` : ''}
        <div class="pkg-tagline">${pkgTagline}</div>
        <h3>${pkgTitle}</h3>
        <p class="pkg-subtitle">${pkgSubtitle}</p>
        
        <div class="pkg-includes-title">${includesLabel}</div>
        <ul>
          ${items.map(item => `
            <li>
              <i class="fa-solid fa-circle-check"></i>
              <span>${item.bold ? `<strong>${item.bold}</strong>` : ''}${item.text || ''}</span>
            </li>
          `).join('')}
        </ul>

        <div class="pkg-footer" style="margin-top: auto;">
          <div class="pkg-timeline"><i class="fa-regular fa-calendar-days"></i> <span><span>${timelineLabel}</span> ${pkgTimeline}</span></div>
          <div class="pkg-investment">${pkg.investment || ''}</div>
          ${pkgNote ? `<div class="pkg-note">${pkgNote}</div>` : ''}
        </div>

        ${isAdmin ? `
          <div style="display: flex; gap: 0.5rem; margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid rgba(255,255,255,0.1);">
            <button class="edit-pricing-pkg-btn" style="flex: 1; padding: 0.4rem; background: rgba(59, 130, 246, 0.2); border: 1px solid rgba(59, 130, 246, 0.4); border-radius: 6px; color: #60a5fa; font-weight: 600; cursor: pointer; font-size: 0.85rem;"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
            <button class="delete-pricing-pkg-btn" style="padding: 0.4rem 0.8rem; background: rgba(239, 68, 68, 0.2); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 6px; color: #f87171; cursor: pointer; font-size: 0.85rem;"><i class="fa-solid fa-trash"></i></button>
          </div>
        ` : ''}
      `;

      if (isAdmin) {
        const editBtn = cardEl.querySelector('.edit-pricing-pkg-btn');
        if (editBtn) editBtn.addEventListener('click', () => showEditPricingPackageModal(pkg, servicesData));
        const delBtn = cardEl.querySelector('.delete-pricing-pkg-btn');
        if (delBtn) delBtn.addEventListener('click', () => deletePricingPackage(pkg.id, servicesData));
      }

      pricingCardsGrid.appendChild(cardEl);
    });

    if (isAdmin) {
      const addPkgCard = document.createElement('div');
      addPkgCard.className = 'pricing-card';
      addPkgCard.style.display = 'flex';
      addPkgCard.style.flexDirection = 'column';
      addPkgCard.style.justifyContent = 'center';
      addPkgCard.style.alignItems = 'center';
      addPkgCard.style.minHeight = '350px';
      addPkgCard.style.border = '2px dashed rgba(59, 130, 246, 0.4)';
      addPkgCard.style.background = 'rgba(13, 19, 33, 0.4)';
      addPkgCard.style.cursor = 'pointer';
      addPkgCard.innerHTML = `
        <i class="fa-solid fa-plus-circle" style="font-size: 2.5rem; color: #3b82f6; margin-bottom: 0.75rem;"></i>
        <h3 style="font-size: 1.2rem; color: #60a5fa; margin: 0;">Add Pricing Package</h3>
      `;
      addPkgCard.addEventListener('click', () => showEditPricingPackageModal(null, servicesData));
      pricingCardsGrid.appendChild(addPkgCard);
    }
  }

  /* 5. Hourly & Retainer Rates Section */
  const ratesContainer = document.getElementById('rates-section-container');
  if (ratesContainer && servicesData.rates) {
    const rates = servicesData.rates;
    ratesContainer.innerHTML = `
      <div class="rates-card" style="position: relative;">
        <h3><i class="fa-solid fa-clock-rotate-left"></i> <span>${getStr(rates, 'hourlyTitle')}</span></h3>
        <p>${getStr(rates, 'hourlyDesc')}</p>
        <div class="rates-item" style="margin-top: 0.5rem;">
          <span class="rates-label">${getStr(rates, 'hourlyLabel')}</span>
          <span class="rates-value">${getStr(rates, 'hourlyValue')}</span>
        </div>
        ${isAdmin ? `<button class="edit-rates-btn" style="position: absolute; top: 1rem; right: 1rem; padding: 0.35rem 0.7rem; background: rgba(59, 130, 246, 0.2); border: 1px solid rgba(59, 130, 246, 0.4); border-radius: 6px; color: #60a5fa; cursor: pointer; font-size: 0.8rem;"><i class="fa-solid fa-pen-to-square"></i> Edit Rates</button>` : ''}
      </div>
      <div class="rates-card" style="position: relative;">
        <h3><i class="fa-solid fa-shield-halved"></i> <span>${getStr(rates, 'retainerTitle')}</span></h3>
        <p>${getStr(rates, 'retainerDesc')}</p>
        <div class="rates-item" style="margin-top: 0.5rem;">
          <span class="rates-label">${getStr(rates, 'retainerLabel')}</span>
          <span class="rates-value">${getStr(rates, 'retainerValue')}</span>
        </div>
        ${getStr(rates, 'retainerNote') ? `<p style="font-size: 0.8rem; font-style: italic;">${getStr(rates, 'retainerNote')}</p>` : ''}
        ${isAdmin ? `<button class="edit-rates-btn" style="position: absolute; top: 1rem; right: 1rem; padding: 0.35rem 0.7rem; background: rgba(59, 130, 246, 0.2); border: 1px solid rgba(59, 130, 246, 0.4); border-radius: 6px; color: #60a5fa; cursor: pointer; font-size: 0.8rem;"><i class="fa-solid fa-pen-to-square"></i> Edit Rates</button>` : ''}
      </div>
    `;

    if (isAdmin) {
      ratesContainer.querySelectorAll('.edit-rates-btn').forEach(btn => {
        btn.addEventListener('click', () => showEditRatesModal(servicesData));
      });
    }
  }

  /* 6. Process Section */
  const processContainer = document.getElementById('process-section-container');
  if (processContainer && servicesData.process) {
    const processData = servicesData.process;
    const processTitle = getStr(processData, 'title');
    const steps = processData.steps || [];

    processContainer.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; position: relative;">
        <h3>${processTitle}</h3>
        ${isAdmin ? `
          <div style="display: flex; gap: 0.5rem;">
            <button class="edit-process-title-btn" style="padding: 0.35rem 0.75rem; background: rgba(59, 130, 246, 0.2); border: 1px solid rgba(59, 130, 246, 0.4); border-radius: 6px; color: #60a5fa; font-weight: 600; cursor: pointer; font-size: 0.85rem;"><i class="fa-solid fa-pen-to-square"></i> Edit Title</button>
            <button class="add-process-step-btn" style="padding: 0.35rem 0.75rem; background: rgba(16, 185, 129, 0.2); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 6px; color: #34d399; font-weight: 600; cursor: pointer; font-size: 0.85rem;"><i class="fa-solid fa-plus"></i> Add Step</button>
          </div>
        ` : ''}
      </div>
      <div class="process-steps">
        ${steps.map(s => `
          <div class="process-step" style="position: relative;">
            <div class="step-num">${s.num || ''}</div>
            <div class="step-title">${getStr(s, 'title')}</div>
            <div class="step-desc">${getStr(s, 'desc')}</div>
            ${isAdmin ? `
              <div style="display: flex; gap: 0.4rem; margin-top: 0.75rem; justify-content: center;">
                <button class="edit-step-btn" data-id="${s.id}" style="padding: 0.25rem 0.55rem; background: rgba(59, 130, 246, 0.2); border: 1px solid rgba(59, 130, 246, 0.4); border-radius: 4px; color: #60a5fa; cursor: pointer; font-size: 0.75rem;"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="delete-step-btn" data-id="${s.id}" style="padding: 0.25rem 0.55rem; background: rgba(239, 68, 68, 0.2); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 4px; color: #f87171; cursor: pointer; font-size: 0.75rem;"><i class="fa-solid fa-trash"></i></button>
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;

    if (isAdmin) {
      const editTitleBtn = processContainer.querySelector('.edit-process-title-btn');
      if (editTitleBtn) editTitleBtn.addEventListener('click', () => showEditProcessTitleModal(servicesData));
      const addStepBtn = processContainer.querySelector('.add-process-step-btn');
      if (addStepBtn) addStepBtn.addEventListener('click', () => showEditProcessStepModal(null, servicesData));

      processContainer.querySelectorAll('.edit-step-btn').forEach(btn => {
        const stepId = parseInt(btn.getAttribute('data-id'), 10);
        const step = steps.find(s => s.id === stepId);
        btn.addEventListener('click', () => showEditProcessStepModal(step, servicesData));
      });

      processContainer.querySelectorAll('.delete-step-btn').forEach(btn => {
        const stepId = parseInt(btn.getAttribute('data-id'), 10);
        btn.addEventListener('click', () => deleteProcessStep(stepId, servicesData));
      });
    }
  }

  /* 7. CTA Section */
  const ctaContainer = document.getElementById('cta-card-container');
  if (ctaContainer && servicesData.cta) {
    const cta = servicesData.cta;
    ctaContainer.style.position = 'relative';
    ctaContainer.innerHTML = `
      <h3>${getStr(cta, 'title')}</h3>
      <p>${getStr(cta, 'desc')}</p>
      <a href="mailto:${cta.email || 'bellanaevents@gmail.com'}" class="cta-email">
        <i class="fa-solid fa-envelope-open-text"></i> ${cta.email || 'bellanaevents@gmail.com'}
      </a>
      ${isAdmin ? `
        <button class="edit-cta-btn" style="position: absolute; top: 1rem; right: 1rem; padding: 0.4rem 0.85rem; background: rgba(59, 130, 246, 0.2); border: 1px solid rgba(59, 130, 246, 0.4); border-radius: 6px; color: #60a5fa; font-weight: 600; cursor: pointer; font-size: 0.85rem;">
          <i class="fa-solid fa-pen-to-square"></i> Edit CTA Section
        </button>
      ` : ''}
    `;

    if (isAdmin) {
      const editCtaBtn = ctaContainer.querySelector('.edit-cta-btn');
      if (editCtaBtn) editCtaBtn.addEventListener('click', () => showEditCtaModal(servicesData));
    }
  }
}

/* ==========================================================================
   SERVICES EDIT MODALS & HANDLERS
   ========================================================================== */

function createModalOverlay(id, titleText) {
  const existing = document.getElementById(id);
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = id;
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.background = 'rgba(7, 10, 19, 0.85)';
  modal.style.backdropFilter = 'blur(12px)';
  modal.style.webkitBackdropFilter = 'blur(12px)';
  modal.style.zIndex = '9999';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.padding = '1.5rem';

  const box = document.createElement('div');
  box.style.background = 'rgba(13, 19, 33, 0.95)';
  box.style.border = '1px solid rgba(59, 130, 246, 0.3)';
  box.style.borderRadius = '20px';
  box.style.maxWidth = '680px';
  box.style.width = '100%';
  box.style.maxHeight = '90vh';
  box.style.overflowY = 'auto';
  box.style.padding = '2rem';
  box.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.6)';
  box.style.transition = 'transform 0.3s ease';

  box.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
      <h3 style="margin: 0; font-size: 1.35rem; color: #ffffff; display: flex; align-items: center; gap: 0.6rem;">
        <i class="fa-solid fa-pen-to-square" style="color: #3b82f6;"></i> ${titleText}
      </h3>
      <button class="close-modal-x" style="background: none; border: none; color: #94a3b8; font-size: 1.5rem; cursor: pointer; line-height: 1;"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div class="modal-body-content"></div>
  `;

  modal.appendChild(box);
  document.body.appendChild(modal);

  const closeModal = () => {
    modal.style.opacity = '0';
    setTimeout(() => modal.remove(), 250);
  };

  box.querySelector('.close-modal-x').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  return { modal, box, closeModal, body: box.querySelector('.modal-body-content') };
}

/* 1. Edit Hero Section Modal */
function showEditHeroModal(data) {
  const { modal, box, closeModal, body } = createModalOverlay('edit-hero-modal', 'Edit Hero Section');
  const hero = data.hero || {};

  body.innerHTML = `
    <form id="edit-hero-form">
      ${createLanguageTabsHTML()}
      
      <div class="lang-tab-content" data-lang="en">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Hero Title (English)</label>
          <input type="text" id="hero-title-en" value="${hero.title_en || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;" required>
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Hero Subtitle (English)</label>
          <textarea id="hero-sub-en" rows="3" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;" required>${hero.subtitle_en || ''}</textarea>
        </div>
      </div>

      <div class="lang-tab-content" data-lang="hu" style="display: none;">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Hero Title (Magyar)</label>
          <input type="text" id="hero-title-hu" value="${hero.title_hu || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Hero Subtitle (Magyar)</label>
          <textarea id="hero-sub-hu" rows="3" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">${hero.subtitle_hu || ''}</textarea>
        </div>
      </div>

      <div class="lang-tab-content" data-lang="ro" style="display: none;">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Hero Title (Română)</label>
          <input type="text" id="hero-title-ro" value="${hero.title_ro || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Hero Subtitle (Română)</label>
          <textarea id="hero-sub-ro" rows="3" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">${hero.subtitle_ro || ''}</textarea>
        </div>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="button" class="cancel-modal-btn" style="padding: 0.65rem 1.2rem; background: rgba(255,255,255,0.1); border: none; border-radius: 8px; color: #fff; cursor: pointer;">Cancel</button>
        <button type="submit" style="padding: 0.65rem 1.5rem; background: linear-gradient(135deg, #3b82f6, #6366f1); border: none; border-radius: 8px; color: #fff; font-weight: 600; cursor: pointer;">Save Changes</button>
      </div>
    </form>
  `;

  setupLanguageTabs(box);
  box.querySelector('.cancel-modal-btn').addEventListener('click', closeModal);

  box.querySelector('#edit-hero-form').addEventListener('submit', (e) => {
    e.preventDefault();
    data.hero = {
      title_en: box.querySelector('#hero-title-en').value,
      subtitle_en: box.querySelector('#hero-sub-en').value,
      title_hu: box.querySelector('#hero-title-hu').value || box.querySelector('#hero-title-en').value,
      subtitle_hu: box.querySelector('#hero-sub-hu').value || box.querySelector('#hero-sub-en').value,
      title_ro: box.querySelector('#hero-title-ro').value || box.querySelector('#hero-title-en').value,
      subtitle_ro: box.querySelector('#hero-sub-ro').value || box.querySelector('#hero-sub-en').value
    };
    saveServicesData(data);
    showToast('Hero section updated!', 'success');
    closeModal();
  });
}

/* 2. Edit / Add Top Service Modal */
function showEditTopServiceModal(cardToEdit, data) {
  const isEditing = !!cardToEdit;
  const card = cardToEdit || {};
  const { modal, box, closeModal, body } = createModalOverlay('edit-top-service-modal', isEditing ? 'Edit Service Card' : 'Add Service Card');

  body.innerHTML = `
    <form id="edit-top-service-form">
      <div style="margin-bottom: 1.25rem;">
        <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Icon Class (FontAwesome)</label>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <input type="text" id="service-icon" value="${card.icon || 'fa-solid fa-laptop-code'}" style="flex: 1; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;" required>
          <div style="padding: 0.75rem 1rem; background: rgba(59,130,246,0.15); border: 1px solid rgba(59,130,246,0.3); border-radius: 8px; color: #60a5fa; font-size: 1.2rem;">
            <i id="service-icon-preview" class="${card.icon || 'fa-solid fa-laptop-code'}"></i>
          </div>
        </div>
      </div>

      ${createLanguageTabsHTML()}

      <div class="lang-tab-content" data-lang="en">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Title (English)</label>
          <input type="text" id="card-title-en" value="${card.title_en || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;" required>
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Description (English)</label>
          <textarea id="card-desc-en" rows="3" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;" required>${card.desc_en || ''}</textarea>
        </div>
      </div>

      <div class="lang-tab-content" data-lang="hu" style="display: none;">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Title (Magyar)</label>
          <input type="text" id="card-title-hu" value="${card.title_hu || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Description (Magyar)</label>
          <textarea id="card-desc-hu" rows="3" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">${card.desc_hu || ''}</textarea>
        </div>
      </div>

      <div class="lang-tab-content" data-lang="ro" style="display: none;">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Title (Română)</label>
          <input type="text" id="card-title-ro" value="${card.title_ro || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Description (Română)</label>
          <textarea id="card-desc-ro" rows="3" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">${card.desc_ro || ''}</textarea>
        </div>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="button" class="cancel-modal-btn" style="padding: 0.65rem 1.2rem; background: rgba(255,255,255,0.1); border: none; border-radius: 8px; color: #fff; cursor: pointer;">Cancel</button>
        <button type="submit" style="padding: 0.65rem 1.5rem; background: linear-gradient(135deg, #3b82f6, #6366f1); border: none; border-radius: 8px; color: #fff; font-weight: 600; cursor: pointer;">${isEditing ? 'Save Changes' : 'Create Card'}</button>
      </div>
    </form>
  `;

  setupLanguageTabs(box);
  const iconInput = box.querySelector('#service-icon');
  const iconPrev = box.querySelector('#service-icon-preview');
  iconInput.addEventListener('input', () => {
    iconPrev.className = iconInput.value || 'fa-solid fa-code';
  });

  box.querySelector('.cancel-modal-btn').addEventListener('click', closeModal);

  box.querySelector('#edit-top-service-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const updatedCard = {
      id: isEditing ? card.id : (data.topServices.length > 0 ? Math.max(...data.topServices.map(c => c.id)) + 1 : 1),
      icon: iconInput.value,
      title_en: box.querySelector('#card-title-en').value,
      desc_en: box.querySelector('#card-desc-en').value,
      title_hu: box.querySelector('#card-title-hu').value || box.querySelector('#card-title-en').value,
      desc_hu: box.querySelector('#card-desc-hu').value || box.querySelector('#card-desc-en').value,
      title_ro: box.querySelector('#card-title-ro').value || box.querySelector('#card-title-en').value,
      desc_ro: box.querySelector('#card-desc-ro').value || box.querySelector('#card-desc-en').value
    };

    if (isEditing) {
      const idx = data.topServices.findIndex(c => c.id === card.id);
      if (idx !== -1) data.topServices[idx] = updatedCard;
    } else {
      data.topServices.push(updatedCard);
    }

    saveServicesData(data);
    showToast(isEditing ? 'Service card updated!' : 'Service card created!', 'success');
    closeModal();
  });
}

function deleteTopServiceCard(id, data) {
  if (confirm('Are you sure you want to delete this service card?')) {
    data.topServices = data.topServices.filter(c => c.id !== id);
    saveServicesData(data);
    showToast('Service card deleted.', 'success');
  }
}

/* 3. Edit Pricing Header Modal */
function showEditPricingHeaderModal(data) {
  const { modal, box, closeModal, body } = createModalOverlay('edit-pricing-header-modal', 'Edit Pricing Section Header');
  const ph = data.pricingHeader || {};

  body.innerHTML = `
    <form id="edit-pricing-header-form">
      ${createLanguageTabsHTML()}

      <div class="lang-tab-content" data-lang="en">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Section Title (English)</label>
          <input type="text" id="ph-title-en" value="${ph.title_en || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;" required>
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Intro Text (English)</label>
          <textarea id="ph-intro-en" rows="4" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;" required>${ph.intro_en || ''}</textarea>
        </div>
      </div>

      <div class="lang-tab-content" data-lang="hu" style="display: none;">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Section Title (Magyar)</label>
          <input type="text" id="ph-title-hu" value="${ph.title_hu || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Intro Text (Magyar)</label>
          <textarea id="ph-intro-hu" rows="4" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">${ph.intro_hu || ''}</textarea>
        </div>
      </div>

      <div class="lang-tab-content" data-lang="ro" style="display: none;">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Section Title (Română)</label>
          <input type="text" id="ph-title-ro" value="${ph.title_ro || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Intro Text (Română)</label>
          <textarea id="ph-intro-ro" rows="4" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">${ph.intro_ro || ''}</textarea>
        </div>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="button" class="cancel-modal-btn" style="padding: 0.65rem 1.2rem; background: rgba(255,255,255,0.1); border: none; border-radius: 8px; color: #fff; cursor: pointer;">Cancel</button>
        <button type="submit" style="padding: 0.65rem 1.5rem; background: linear-gradient(135deg, #3b82f6, #6366f1); border: none; border-radius: 8px; color: #fff; font-weight: 600; cursor: pointer;">Save Changes</button>
      </div>
    </form>
  `;

  setupLanguageTabs(box);
  box.querySelector('.cancel-modal-btn').addEventListener('click', closeModal);

  box.querySelector('#edit-pricing-header-form').addEventListener('submit', (e) => {
    e.preventDefault();
    data.pricingHeader = {
      title_en: box.querySelector('#ph-title-en').value,
      intro_en: box.querySelector('#ph-intro-en').value,
      title_hu: box.querySelector('#ph-title-hu').value || box.querySelector('#ph-title-en').value,
      intro_hu: box.querySelector('#ph-intro-hu').value || box.querySelector('#ph-intro-en').value,
      title_ro: box.querySelector('#ph-title-ro').value || box.querySelector('#ph-title-en').value,
      intro_ro: box.querySelector('#ph-intro-ro').value || box.querySelector('#ph-intro-en').value
    };
    saveServicesData(data);
    showToast('Pricing header updated!', 'success');
    closeModal();
  });
}

/* 4. Edit / Add Pricing Package Modal */
function showEditPricingPackageModal(pkgToEdit, data) {
  const isEditing = !!pkgToEdit;
  const pkg = pkgToEdit || {};
  const { modal, box, closeModal, body } = createModalOverlay('edit-pkg-modal', isEditing ? 'Edit Pricing Package' : 'Add Pricing Package');

  const itemsEnStr = (pkg.items_en || []).map(i => `${i.bold ? i.bold + ' ' : ''}${i.text || ''}`).join('\n');
  const itemsHuStr = (pkg.items_hu || []).map(i => `${i.bold ? i.bold + ' ' : ''}${i.text || ''}`).join('\n');
  const itemsRoStr = (pkg.items_ro || []).map(i => `${i.bold ? i.bold + ' ' : ''}${i.text || ''}`).join('\n');

  body.innerHTML = `
    <form id="edit-pkg-form">
      <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1.25rem; background: rgba(255,255,255,0.03); padding: 0.75rem 1rem; border-radius: 10px; border: 1px solid rgba(255,255,255,0.08);">
        <label style="display: flex; align-items: center; gap: 0.5rem; color: #fff; font-weight: 500; cursor: pointer;">
          <input type="checkbox" id="pkg-is-popular" ${pkg.isPopular ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: #3b82f6;"> Highlight as Popular Package
        </label>
      </div>

      <div style="margin-bottom: 1.25rem;">
        <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Investment / Price (e.g. €2,500 – €3,800 EUR)</label>
        <input type="text" id="pkg-investment" value="${pkg.investment || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;" required>
      </div>

      ${createLanguageTabsHTML()}

      <div class="lang-tab-content" data-lang="en">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Package Tagline (e.g., Complete Overhaul)</label>
          <input type="text" id="pkg-tagline-en" value="${pkg.tagline_en || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;" required>
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Package Title</label>
          <input type="text" id="pkg-title-en" value="${pkg.title_en || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;" required>
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Subtitle / Audience</label>
          <input type="text" id="pkg-sub-en" value="${pkg.subtitle_en || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Badge Text (if popular)</label>
          <input type="text" id="pkg-badge-en" value="${pkg.badge_en || 'Most Popular'}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Included Items (One per line)</label>
          <textarea id="pkg-items-en" rows="5" placeholder="UX Audit: Analyzing performance&#10;UI Redesign: Figma wireframes" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-family: inherit;">${itemsEnStr}</textarea>
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Timeline (English)</label>
          <input type="text" id="pkg-timeline-en" value="${pkg.timeline_en || '3 – 6 Weeks'}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Footer Note Label (Optional)</label>
          <input type="text" id="pkg-note-en" value="${pkg.note_en || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
        </div>
      </div>

      <div class="lang-tab-content" data-lang="hu" style="display: none;">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Package Tagline (Magyar)</label>
          <input type="text" id="pkg-tagline-hu" value="${pkg.tagline_hu || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Package Title (Magyar)</label>
          <input type="text" id="pkg-title-hu" value="${pkg.title_hu || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Subtitle / Audience (Magyar)</label>
          <input type="text" id="pkg-sub-hu" value="${pkg.subtitle_hu || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Badge Text (Magyar)</label>
          <input type="text" id="pkg-badge-hu" value="${pkg.badge_hu || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Included Items (Magyar, One per line)</label>
          <textarea id="pkg-items-hu" rows="5" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-family: inherit;">${itemsHuStr}</textarea>
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Timeline (Magyar)</label>
          <input type="text" id="pkg-timeline-hu" value="${pkg.timeline_hu || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Footer Note Label (Magyar)</label>
          <input type="text" id="pkg-note-hu" value="${pkg.note_hu || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
        </div>
      </div>

      <div class="lang-tab-content" data-lang="ro" style="display: none;">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Package Tagline (Română)</label>
          <input type="text" id="pkg-tagline-ro" value="${pkg.tagline_ro || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Package Title (Română)</label>
          <input type="text" id="pkg-title-ro" value="${pkg.title_ro || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Subtitle / Audience (Română)</label>
          <input type="text" id="pkg-sub-ro" value="${pkg.subtitle_ro || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Badge Text (Română)</label>
          <input type="text" id="pkg-badge-ro" value="${pkg.badge_ro || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Included Items (Română, One per line)</label>
          <textarea id="pkg-items-ro" rows="5" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-family: inherit;">${itemsRoStr}</textarea>
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Timeline (Română)</label>
          <input type="text" id="pkg-timeline-ro" value="${pkg.timeline_ro || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Footer Note Label (Română)</label>
          <input type="text" id="pkg-note-ro" value="${pkg.note_ro || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
        </div>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="button" class="cancel-modal-btn" style="padding: 0.65rem 1.2rem; background: rgba(255,255,255,0.1); border: none; border-radius: 8px; color: #fff; cursor: pointer;">Cancel</button>
        <button type="submit" style="padding: 0.65rem 1.5rem; background: linear-gradient(135deg, #3b82f6, #6366f1); border: none; border-radius: 8px; color: #fff; font-weight: 600; cursor: pointer;">${isEditing ? 'Save Changes' : 'Create Package'}</button>
      </div>
    </form>
  `;

  setupLanguageTabs(box);
  box.querySelector('.cancel-modal-btn').addEventListener('click', closeModal);

  function parseItemsList(rawText) {
    if (!rawText) return [];
    return rawText.split('\n').map(line => line.trim()).filter(Boolean).map(line => {
      const parts = line.split(':');
      if (parts.length > 1 && parts[0].length < 35) {
        return { bold: parts[0].trim() + ':', text: ' ' + parts.slice(1).join(':').trim() };
      }
      return { bold: '', text: line };
    });
  }

  box.querySelector('#edit-pkg-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const updatedPkg = {
      id: isEditing ? pkg.id : (data.packages.length > 0 ? Math.max(...data.packages.map(p => p.id)) + 1 : 1),
      isPopular: box.querySelector('#pkg-is-popular').checked,
      investment: box.querySelector('#pkg-investment').value,

      tagline_en: box.querySelector('#pkg-tagline-en').value,
      title_en: box.querySelector('#pkg-title-en').value,
      subtitle_en: box.querySelector('#pkg-sub-en').value,
      badge_en: box.querySelector('#pkg-badge-en').value,
      timeline_en: box.querySelector('#pkg-timeline-en').value,
      note_en: box.querySelector('#pkg-note-en').value,
      items_en: parseItemsList(box.querySelector('#pkg-items-en').value),

      tagline_hu: box.querySelector('#pkg-tagline-hu').value || box.querySelector('#pkg-tagline-en').value,
      title_hu: box.querySelector('#pkg-title-hu').value || box.querySelector('#pkg-title-en').value,
      subtitle_hu: box.querySelector('#pkg-sub-hu').value || box.querySelector('#pkg-sub-en').value,
      badge_hu: box.querySelector('#pkg-badge-hu').value || box.querySelector('#pkg-badge-en').value,
      timeline_hu: box.querySelector('#pkg-timeline-hu').value || box.querySelector('#pkg-timeline-en').value,
      note_hu: box.querySelector('#pkg-note-hu').value || box.querySelector('#pkg-note-en').value,
      items_hu: parseItemsList(box.querySelector('#pkg-items-hu').value || box.querySelector('#pkg-items-en').value),

      tagline_ro: box.querySelector('#pkg-tagline-ro').value || box.querySelector('#pkg-tagline-en').value,
      title_ro: box.querySelector('#pkg-title-ro').value || box.querySelector('#pkg-title-en').value,
      subtitle_ro: box.querySelector('#pkg-sub-ro').value || box.querySelector('#pkg-sub-en').value,
      badge_ro: box.querySelector('#pkg-badge-ro').value || box.querySelector('#pkg-badge-en').value,
      timeline_ro: box.querySelector('#pkg-timeline-ro').value || box.querySelector('#pkg-timeline-en').value,
      note_ro: box.querySelector('#pkg-note-ro').value || box.querySelector('#pkg-note-en').value,
      items_ro: parseItemsList(box.querySelector('#pkg-items-ro').value || box.querySelector('#pkg-items-en').value)
    };

    if (isEditing) {
      const idx = data.packages.findIndex(p => p.id === pkg.id);
      if (idx !== -1) data.packages[idx] = updatedPkg;
    } else {
      data.packages.push(updatedPkg);
    }

    saveServicesData(data);
    showToast(isEditing ? 'Pricing package updated!' : 'Pricing package created!', 'success');
    closeModal();
  });
}

function deletePricingPackage(id, data) {
  if (confirm('Are you sure you want to delete this pricing package?')) {
    data.packages = data.packages.filter(p => p.id !== id);
    saveServicesData(data);
    showToast('Pricing package deleted.', 'success');
  }
}

/* 5. Edit Rates Section Modal */
function showEditRatesModal(data) {
  const { modal, box, closeModal, body } = createModalOverlay('edit-rates-modal', 'Edit Rates Section');
  const rates = data.rates || {};

  body.innerHTML = `
    <form id="edit-rates-form">
      ${createLanguageTabsHTML()}

      <div class="lang-tab-content" data-lang="en">
        <h4 style="color: #60a5fa; margin-bottom: 0.75rem;">Hourly Rates Card</h4>
        <div style="margin-bottom: 0.75rem;">
          <label style="display: block; margin-bottom: 0.3rem; font-size: 0.8rem; color: #94a3b8;">Title</label>
          <input type="text" id="hr-title-en" value="${rates.hourlyTitle_en || 'Hourly Rates'}" style="width: 100%; padding: 0.6rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff;">
        </div>
        <div style="margin-bottom: 0.75rem;">
          <label style="display: block; margin-bottom: 0.3rem; font-size: 0.8rem; color: #94a3b8;">Description</label>
          <input type="text" id="hr-desc-en" value="${rates.hourlyDesc_en || ''}" style="width: 100%; padding: 0.6rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff;">
        </div>
        <div style="display: flex; gap: 0.75rem; margin-bottom: 1.25rem;">
          <div style="flex: 1;">
            <label style="display: block; margin-bottom: 0.3rem; font-size: 0.8rem; color: #94a3b8;">Label</label>
            <input type="text" id="hr-label-en" value="${rates.hourlyLabel_en || 'Hourly Rate:'}" style="width: 100%; padding: 0.6rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff;">
          </div>
          <div style="flex: 1;">
            <label style="display: block; margin-bottom: 0.3rem; font-size: 0.8rem; color: #94a3b8;">Value / Rate</label>
            <input type="text" id="hr-value-en" value="${rates.hourlyValue_en || '€47 – €67 / hour'}" style="width: 100%; padding: 0.6rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff;">
          </div>
        </div>

        <h4 style="color: #60a5fa; margin-bottom: 0.75rem;">Retainer Rates Card</h4>
        <div style="margin-bottom: 0.75rem;">
          <label style="display: block; margin-bottom: 0.3rem; font-size: 0.8rem; color: #94a3b8;">Title</label>
          <input type="text" id="ret-title-en" value="${rates.retainerTitle_en || 'Retainer Rates'}" style="width: 100%; padding: 0.6rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff;">
        </div>
        <div style="margin-bottom: 0.75rem;">
          <label style="display: block; margin-bottom: 0.3rem; font-size: 0.8rem; color: #94a3b8;">Description</label>
          <input type="text" id="ret-desc-en" value="${rates.retainerDesc_en || ''}" style="width: 100%; padding: 0.6rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff;">
        </div>
        <div style="display: flex; gap: 0.75rem; margin-bottom: 0.75rem;">
          <div style="flex: 1;">
            <label style="display: block; margin-bottom: 0.3rem; font-size: 0.8rem; color: #94a3b8;">Label</label>
            <input type="text" id="ret-label-en" value="${rates.retainerLabel_en || 'Monthly Care Retainer:'}" style="width: 100%; padding: 0.6rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff;">
          </div>
          <div style="flex: 1;">
            <label style="display: block; margin-bottom: 0.3rem; font-size: 0.8rem; color: #94a3b8;">Value / Rate</label>
            <input type="text" id="ret-value-en" value="${rates.retainerValue_en || '€490 / month'}" style="width: 100%; padding: 0.6rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff;">
          </div>
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.3rem; font-size: 0.8rem; color: #94a3b8;">Retainer Note</label>
          <input type="text" id="ret-note-en" value="${rates.retainerNote_en || ''}" style="width: 100%; padding: 0.6rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff;">
        </div>
      </div>

      <div class="lang-tab-content" data-lang="hu" style="display: none;">
        <h4 style="color: #60a5fa; margin-bottom: 0.75rem;">Hourly Rates Card (Magyar)</h4>
        <div style="margin-bottom: 0.75rem;">
          <input type="text" id="hr-title-hu" placeholder="Óradíjak" value="${rates.hourlyTitle_hu || ''}" style="width: 100%; padding: 0.6rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff;">
        </div>
        <div style="margin-bottom: 0.75rem;">
          <input type="text" id="hr-desc-hu" placeholder="Leírás" value="${rates.hourlyDesc_hu || ''}" style="width: 100%; padding: 0.6rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff;">
        </div>
        <div style="display: flex; gap: 0.75rem; margin-bottom: 1.25rem;">
          <input type="text" id="hr-label-hu" placeholder="Címke" value="${rates.hourlyLabel_hu || ''}" style="flex:1; padding: 0.6rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff;">
          <input type="text" id="hr-value-hu" placeholder="Érték" value="${rates.hourlyValue_hu || ''}" style="flex:1; padding: 0.6rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff;">
        </div>

        <h4 style="color: #60a5fa; margin-bottom: 0.75rem;">Retainer Rates Card (Magyar)</h4>
        <div style="margin-bottom: 0.75rem;">
          <input type="text" id="ret-title-hu" placeholder="Rendelkezésre állási díjak" value="${rates.retainerTitle_hu || ''}" style="width: 100%; padding: 0.6rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff;">
        </div>
        <div style="margin-bottom: 0.75rem;">
          <input type="text" id="ret-desc-hu" placeholder="Leírás" value="${rates.retainerDesc_hu || ''}" style="width: 100%; padding: 0.6rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff;">
        </div>
        <div style="display: flex; gap: 0.75rem; margin-bottom: 0.75rem;">
          <input type="text" id="ret-label-hu" placeholder="Címke" value="${rates.retainerLabel_hu || ''}" style="flex:1; padding: 0.6rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff;">
          <input type="text" id="ret-value-hu" placeholder="Érték" value="${rates.retainerValue_hu || ''}" style="flex:1; padding: 0.6rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff;">
        </div>
        <div style="margin-bottom: 1rem;">
          <input type="text" id="ret-note-hu" placeholder="Megjegyzés" value="${rates.retainerNote_hu || ''}" style="width: 100%; padding: 0.6rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff;">
        </div>
      </div>

      <div class="lang-tab-content" data-lang="ro" style="display: none;">
        <h4 style="color: #60a5fa; margin-bottom: 0.75rem;">Hourly Rates Card (Română)</h4>
        <div style="margin-bottom: 0.75rem;">
          <input type="text" id="hr-title-ro" placeholder="Tarife Orare" value="${rates.hourlyTitle_ro || ''}" style="width: 100%; padding: 0.6rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff;">
        </div>
        <div style="margin-bottom: 0.75rem;">
          <input type="text" id="hr-desc-ro" placeholder="Descriere" value="${rates.hourlyDesc_ro || ''}" style="width: 100%; padding: 0.6rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff;">
        </div>
        <div style="display: flex; gap: 0.75rem; margin-bottom: 1.25rem;">
          <input type="text" id="hr-label-ro" placeholder="Etichetă" value="${rates.hourlyLabel_ro || ''}" style="flex:1; padding: 0.6rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff;">
          <input type="text" id="hr-value-ro" placeholder="Valoare" value="${rates.hourlyValue_ro || ''}" style="flex:1; padding: 0.6rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff;">
        </div>

        <h4 style="color: #60a5fa; margin-bottom: 0.75rem;">Retainer Rates Card (Română)</h4>
        <div style="margin-bottom: 0.75rem;">
          <input type="text" id="ret-title-ro" placeholder="Abonamente Lunare" value="${rates.retainerTitle_ro || ''}" style="width: 100%; padding: 0.6rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff;">
        </div>
        <div style="margin-bottom: 0.75rem;">
          <input type="text" id="ret-desc-ro" placeholder="Descriere" value="${rates.retainerDesc_ro || ''}" style="width: 100%; padding: 0.6rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff;">
        </div>
        <div style="display: flex; gap: 0.75rem; margin-bottom: 0.75rem;">
          <input type="text" id="ret-label-ro" placeholder="Etichetă" value="${rates.retainerLabel_ro || ''}" style="flex:1; padding: 0.6rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff;">
          <input type="text" id="ret-value-ro" placeholder="Valoare" value="${rates.retainerValue_ro || ''}" style="flex:1; padding: 0.6rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff;">
        </div>
        <div style="margin-bottom: 1rem;">
          <input type="text" id="ret-note-ro" placeholder="Notă" value="${rates.retainerNote_ro || ''}" style="width: 100%; padding: 0.6rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff;">
        </div>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="button" class="cancel-modal-btn" style="padding: 0.65rem 1.2rem; background: rgba(255,255,255,0.1); border: none; border-radius: 8px; color: #fff; cursor: pointer;">Cancel</button>
        <button type="submit" style="padding: 0.65rem 1.5rem; background: linear-gradient(135deg, #3b82f6, #6366f1); border: none; border-radius: 8px; color: #fff; font-weight: 600; cursor: pointer;">Save Changes</button>
      </div>
    </form>
  `;

  setupLanguageTabs(box);
  box.querySelector('.cancel-modal-btn').addEventListener('click', closeModal);

  box.querySelector('#edit-rates-form').addEventListener('submit', (e) => {
    e.preventDefault();
    data.rates = {
      hourlyTitle_en: box.querySelector('#hr-title-en').value,
      hourlyDesc_en: box.querySelector('#hr-desc-en').value,
      hourlyLabel_en: box.querySelector('#hr-label-en').value,
      hourlyValue_en: box.querySelector('#hr-value-en').value,

      retainerTitle_en: box.querySelector('#ret-title-en').value,
      retainerDesc_en: box.querySelector('#ret-desc-en').value,
      retainerLabel_en: box.querySelector('#ret-label-en').value,
      retainerValue_en: box.querySelector('#ret-value-en').value,
      retainerNote_en: box.querySelector('#ret-note-en').value,

      hourlyTitle_hu: box.querySelector('#hr-title-hu').value || box.querySelector('#hr-title-en').value,
      hourlyDesc_hu: box.querySelector('#hr-desc-hu').value || box.querySelector('#hr-desc-en').value,
      hourlyLabel_hu: box.querySelector('#hr-label-hu').value || box.querySelector('#hr-label-en').value,
      hourlyValue_hu: box.querySelector('#hr-value-hu').value || box.querySelector('#hr-value-en').value,

      retainerTitle_hu: box.querySelector('#ret-title-hu').value || box.querySelector('#ret-title-en').value,
      retainerDesc_hu: box.querySelector('#ret-desc-hu').value || box.querySelector('#ret-desc-en').value,
      retainerLabel_hu: box.querySelector('#ret-label-hu').value || box.querySelector('#ret-label-en').value,
      retainerValue_hu: box.querySelector('#ret-value-hu').value || box.querySelector('#ret-value-en').value,
      retainerNote_hu: box.querySelector('#ret-note-hu').value || box.querySelector('#ret-note-en').value,

      hourlyTitle_ro: box.querySelector('#hr-title-ro').value || box.querySelector('#hr-title-en').value,
      hourlyDesc_ro: box.querySelector('#hr-desc-ro').value || box.querySelector('#hr-desc-en').value,
      hourlyLabel_ro: box.querySelector('#hr-label-ro').value || box.querySelector('#hr-label-en').value,
      hourlyValue_ro: box.querySelector('#hr-value-ro').value || box.querySelector('#hr-value-en').value,

      retainerTitle_ro: box.querySelector('#ret-title-ro').value || box.querySelector('#ret-title-en').value,
      retainerDesc_ro: box.querySelector('#ret-desc-ro').value || box.querySelector('#ret-desc-en').value,
      retainerLabel_ro: box.querySelector('#ret-label-ro').value || box.querySelector('#ret-label-en').value,
      retainerValue_ro: box.querySelector('#ret-value-ro').value || box.querySelector('#ret-value-en').value,
      retainerNote_ro: box.querySelector('#ret-note-ro').value || box.querySelector('#ret-note-en').value
    };

    saveServicesData(data);
    showToast('Rates updated!', 'success');
    closeModal();
  });
}

/* 6. Edit Process Title Modal */
function showEditProcessTitleModal(data) {
  const { modal, box, closeModal, body } = createModalOverlay('edit-proc-title-modal', 'Edit Process Section Title');
  const proc = data.process || {};

  body.innerHTML = `
    <form id="edit-proc-title-form">
      ${createLanguageTabsHTML()}

      <div class="lang-tab-content" data-lang="en">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Section Title (English)</label>
          <input type="text" id="proc-title-en" value="${proc.title_en || 'HOW THE PROCESS WORKS'}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;" required>
        </div>
      </div>

      <div class="lang-tab-content" data-lang="hu" style="display: none;">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Section Title (Magyar)</label>
          <input type="text" id="proc-title-hu" value="${proc.title_hu || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
        </div>
      </div>

      <div class="lang-tab-content" data-lang="ro" style="display: none;">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Section Title (Română)</label>
          <input type="text" id="proc-title-ro" value="${proc.title_ro || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
        </div>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="button" class="cancel-modal-btn" style="padding: 0.65rem 1.2rem; background: rgba(255,255,255,0.1); border: none; border-radius: 8px; color: #fff; cursor: pointer;">Cancel</button>
        <button type="submit" style="padding: 0.65rem 1.5rem; background: linear-gradient(135deg, #3b82f6, #6366f1); border: none; border-radius: 8px; color: #fff; font-weight: 600; cursor: pointer;">Save Changes</button>
      </div>
    </form>
  `;

  setupLanguageTabs(box);
  box.querySelector('.cancel-modal-btn').addEventListener('click', closeModal);

  box.querySelector('#edit-proc-title-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!data.process) data.process = {};
    data.process.title_en = box.querySelector('#proc-title-en').value;
    data.process.title_hu = box.querySelector('#proc-title-hu').value || box.querySelector('#proc-title-en').value;
    data.process.title_ro = box.querySelector('#proc-title-ro').value || box.querySelector('#proc-title-en').value;

    saveServicesData(data);
    showToast('Process section title updated!', 'success');
    closeModal();
  });
}

/* 7. Edit / Add Process Step Modal */
function showEditProcessStepModal(stepToEdit, data) {
  const isEditing = !!stepToEdit;
  const step = stepToEdit || {};
  const { modal, box, closeModal, body } = createModalOverlay('edit-proc-step-modal', isEditing ? 'Edit Process Step' : 'Add Process Step');

  body.innerHTML = `
    <form id="edit-proc-step-form">
      <div style="margin-bottom: 1.25rem;">
        <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Step Number / Label (e.g., 1, 2, 3)</label>
        <input type="text" id="step-num" value="${step.num || (data.process.steps.length + 1)}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;" required>
      </div>

      ${createLanguageTabsHTML()}

      <div class="lang-tab-content" data-lang="en">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Step Title (English)</label>
          <input type="text" id="step-title-en" value="${step.title_en || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;" required>
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Step Description (English)</label>
          <textarea id="step-desc-en" rows="3" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;" required>${step.desc_en || ''}</textarea>
        </div>
      </div>

      <div class="lang-tab-content" data-lang="hu" style="display: none;">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Step Title (Magyar)</label>
          <input type="text" id="step-title-hu" value="${step.title_hu || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Step Description (Magyar)</label>
          <textarea id="step-desc-hu" rows="3" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">${step.desc_hu || ''}</textarea>
        </div>
      </div>

      <div class="lang-tab-content" data-lang="ro" style="display: none;">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Step Title (Română)</label>
          <input type="text" id="step-title-ro" value="${step.title_ro || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Step Description (Română)</label>
          <textarea id="step-desc-ro" rows="3" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">${step.desc_ro || ''}</textarea>
        </div>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="button" class="cancel-modal-btn" style="padding: 0.65rem 1.2rem; background: rgba(255,255,255,0.1); border: none; border-radius: 8px; color: #fff; cursor: pointer;">Cancel</button>
        <button type="submit" style="padding: 0.65rem 1.5rem; background: linear-gradient(135deg, #3b82f6, #6366f1); border: none; border-radius: 8px; color: #fff; font-weight: 600; cursor: pointer;">${isEditing ? 'Save Changes' : 'Create Step'}</button>
      </div>
    </form>
  `;

  setupLanguageTabs(box);
  box.querySelector('.cancel-modal-btn').addEventListener('click', closeModal);

  box.querySelector('#edit-proc-step-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const updatedStep = {
      id: isEditing ? step.id : (data.process.steps.length > 0 ? Math.max(...data.process.steps.map(s => s.id)) + 1 : 1),
      num: box.querySelector('#step-num').value,
      title_en: box.querySelector('#step-title-en').value,
      desc_en: box.querySelector('#step-desc-en').value,
      title_hu: box.querySelector('#step-title-hu').value || box.querySelector('#step-title-en').value,
      desc_hu: box.querySelector('#step-desc-hu').value || box.querySelector('#step-desc-en').value,
      title_ro: box.querySelector('#step-title-ro').value || box.querySelector('#step-title-en').value,
      desc_ro: box.querySelector('#step-desc-ro').value || box.querySelector('#step-desc-en').value
    };

    if (isEditing) {
      const idx = data.process.steps.findIndex(s => s.id === step.id);
      if (idx !== -1) data.process.steps[idx] = updatedStep;
    } else {
      data.process.steps.push(updatedStep);
    }

    saveServicesData(data);
    showToast(isEditing ? 'Process step updated!' : 'Process step created!', 'success');
    closeModal();
  });
}

function deleteProcessStep(id, data) {
  if (confirm('Are you sure you want to delete this process step?')) {
    data.process.steps = data.process.steps.filter(s => s.id !== id);
    saveServicesData(data);
    showToast('Process step deleted.', 'success');
  }
}

/* 8. Edit CTA Section Modal */
function showEditCtaModal(data) {
  const { modal, box, closeModal, body } = createModalOverlay('edit-cta-modal', 'Edit CTA Section');
  const cta = data.cta || {};

  body.innerHTML = `
    <form id="edit-cta-form">
      <div style="margin-bottom: 1.25rem;">
        <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Contact Email</label>
        <input type="email" id="cta-email" value="${cta.email || 'bellanaevents@gmail.com'}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;" required>
      </div>

      ${createLanguageTabsHTML()}

      <div class="lang-tab-content" data-lang="en">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Title (English)</label>
          <input type="text" id="cta-title-en" value="${cta.title_en || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;" required>
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Description (English)</label>
          <textarea id="cta-desc-en" rows="3" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;" required>${cta.desc_en || ''}</textarea>
        </div>
      </div>

      <div class="lang-tab-content" data-lang="hu" style="display: none;">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Title (Magyar)</label>
          <input type="text" id="cta-title-hu" value="${cta.title_hu || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Description (Magyar)</label>
          <textarea id="cta-desc-hu" rows="3" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">${cta.desc_hu || ''}</textarea>
        </div>
      </div>

      <div class="lang-tab-content" data-lang="ro" style="display: none;">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Title (Română)</label>
          <input type="text" id="cta-title-ro" value="${cta.title_ro || ''}" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8;">Description (Română)</label>
          <textarea id="cta-desc-ro" rows="3" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff;">${cta.desc_ro || ''}</textarea>
        </div>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
        <button type="button" class="cancel-modal-btn" style="padding: 0.65rem 1.2rem; background: rgba(255,255,255,0.1); border: none; border-radius: 8px; color: #fff; cursor: pointer;">Cancel</button>
        <button type="submit" style="padding: 0.65rem 1.5rem; background: linear-gradient(135deg, #3b82f6, #6366f1); border: none; border-radius: 8px; color: #fff; font-weight: 600; cursor: pointer;">Save Changes</button>
      </div>
    </form>
  `;

  setupLanguageTabs(box);
  box.querySelector('.cancel-modal-btn').addEventListener('click', closeModal);

  box.querySelector('#edit-cta-form').addEventListener('submit', (e) => {
    e.preventDefault();
    data.cta = {
      email: box.querySelector('#cta-email').value,
      title_en: box.querySelector('#cta-title-en').value,
      desc_en: box.querySelector('#cta-desc-en').value,
      title_hu: box.querySelector('#cta-title-hu').value || box.querySelector('#cta-title-en').value,
      desc_hu: box.querySelector('#cta-desc-hu').value || box.querySelector('#cta-desc-en').value,
      title_ro: box.querySelector('#cta-title-ro').value || box.querySelector('#cta-title-en').value,
      desc_ro: box.querySelector('#cta-desc-ro').value || box.querySelector('#cta-desc-en').value
    };

    saveServicesData(data);
    showToast('CTA section updated!', 'success');
    closeModal();
  });
}

/* ==========================================================================
   About Page Progressive Profile Photo & Admin Image Replacement
   ========================================================================== */

function getAboutProfileImage() {
  return localStorage.getItem('about_profile_image') || 'images/about_swen.jpg';
}

function initAboutPageImage() {
  const profileImg = document.getElementById('about-profile-img');
  if (!profileImg) return;

  const currentImage = getAboutProfileImage();
  if (profileImg.src !== currentImage && !profileImg.src.endsWith(currentImage)) {
    profileImg.src = currentImage;
  }

  // Progressive load handling
  if (profileImg.complete) {
    profileImg.classList.add('loaded');
  } else {
    profileImg.addEventListener('load', () => {
      profileImg.classList.add('loaded');
    });
  }

  const isAdmin = localStorage.getItem('admin_token') === 'swentech_authenticated_admin';
  const overlay = document.getElementById('about-photo-admin-overlay');
  const badgeBtn = document.getElementById('badge-change-photo-btn');
  const overlayBtn = document.getElementById('overlay-change-photo-btn');

  if (isAdmin) {
    if (overlay) overlay.classList.add('visible-admin');
    if (badgeBtn) {
      badgeBtn.style.display = 'inline-flex';
      badgeBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        showChangeAboutPhotoModal();
      };
    }
    if (overlayBtn) {
      overlayBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        showChangeAboutPhotoModal();
      };
    }
  } else {
    if (overlay) overlay.classList.remove('visible-admin');
    if (badgeBtn) badgeBtn.style.display = 'none';
  }
}

function showChangeAboutPhotoModal() {
  const { modal, box, closeModal, body } = createModalOverlay('change-about-photo-modal', 'Change About Profile Photo');
  const currentImg = getAboutProfileImage();

  let uploadedBase64 = null;

  body.innerHTML = `
    <form id="change-about-photo-form" style="display: flex; flex-direction: column; gap: 1.25rem;">
      <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 0;">
        Replace your About page profile photo with a high-resolution image from your local computer or a custom URL.
      </p>

      <div style="margin-bottom: 0.5rem;">
        <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8; font-weight: 500;">Image Source</label>
        <select id="about-img-source-select" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; outline: none; cursor: pointer;">
          <option value="file" style="background: #0d1423; color: #fff;">📁 Upload from Local PC</option>
          <option value="custom" style="background: #0d1423; color: #fff;">🔗 Custom Image URL</option>
          <option value="default" style="background: #0d1423; color: #fff;">✨ Original Default Photo</option>
        </select>
      </div>

      <!-- LOCAL FILE UPLOAD CONTAINER -->
      <div id="about-file-upload-container" style="display: flex; flex-direction: column; gap: 0.5rem;">
        <input type="file" id="about-image-file-input" accept="image/*" style="display: none;">
        <div id="about-file-dropzone" style="border: 2px dashed rgba(59, 130, 246, 0.4); border-radius: 12px; padding: 2rem 1.5rem; text-align: center; cursor: pointer; background: rgba(59, 130, 246, 0.04); transition: all 0.3s ease;">
          <div style="font-size: 2.2rem; color: #3b82f6; margin-bottom: 0.75rem;"><i class="fa-solid fa-cloud-arrow-up"></i></div>
          <p style="margin: 0 0 0.4rem 0; font-size: 0.95rem; font-weight: 600; color: #ffffff;">Choose an image or drag & drop here</p>
          <p style="margin: 0; font-size: 0.8rem; color: #94a3b8;">PNG, JPG, JPEG, WEBP up to 10MB</p>
        </div>
      </div>

      <!-- CUSTOM URL CONTAINER -->
      <div id="about-url-container" style="display: none; flex-direction: column; gap: 0.4rem;">
        <label style="font-size: 0.85rem; color: #94a3b8;">Image URL</label>
        <input type="url" id="about-custom-url-input" placeholder="https://example.com/photo.jpg" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-family: inherit; font-size: 0.9rem;">
      </div>

      <!-- LIVE PREVIEW BOX -->
      <div style="margin-top: 0.5rem; padding: 1rem; background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; display: flex; align-items: center; gap: 1.25rem;">
        <div style="width: 70px; height: 90px; border-radius: 8px; overflow: hidden; background: #000; border: 1px solid rgba(255,255,255,0.15); flex-shrink: 0;">
          <img id="about-preview-thumb" src="${currentImg}" alt="Preview" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="flex: 1;">
          <h4 style="margin: 0 0 0.25rem 0; font-size: 0.95rem; color: #fff;">Live Preview</h4>
          <p id="about-preview-status" style="margin: 0; font-size: 0.8rem; color: #94a3b8;">Showing current profile picture</p>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; gap: 0.75rem;">
        <button type="button" id="reset-about-photo-btn" style="padding: 0.65rem 1.2rem; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; color: #ef4444; cursor: pointer; font-size: 0.85rem; font-weight: 500;">Reset to Default</button>
        <div style="display: flex; gap: 0.75rem;">
          <button type="button" class="cancel-modal-btn" style="padding: 0.65rem 1.2rem; background: rgba(255,255,255,0.1); border: none; border-radius: 8px; color: #fff; cursor: pointer; font-size: 0.85rem;">Cancel</button>
          <button type="submit" style="padding: 0.65rem 1.5rem; background: linear-gradient(135deg, #3b82f6, #6366f1); border: none; border-radius: 8px; color: #fff; font-weight: 600; cursor: pointer; font-size: 0.85rem; box-shadow: 0 4px 15px rgba(59,130,246,0.35);">Save Photo</button>
        </div>
      </div>
    </form>
  `;

  box.querySelector('.cancel-modal-btn').addEventListener('click', closeModal);

  const sourceSelect = box.querySelector('#about-img-source-select');
  const fileUploadContainer = box.querySelector('#about-file-upload-container');
  const urlContainer = box.querySelector('#about-url-container');
  const fileInput = box.querySelector('#about-image-file-input');
  const dropzone = box.querySelector('#about-file-dropzone');
  const previewThumb = box.querySelector('#about-preview-thumb');
  const previewStatus = box.querySelector('#about-preview-status');
  const customUrlInput = box.querySelector('#about-custom-url-input');
  const resetBtn = box.querySelector('#reset-about-photo-btn');

  function updatePreview(src, label) {
    previewThumb.src = src;
    previewStatus.textContent = label;
  }

  // Handle local file dropzone & input
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.style.background = 'rgba(59, 130, 246, 0.15)';
      dropzone.style.borderColor = '#60a5fa';
    });
    dropzone.addEventListener('dragleave', () => {
      dropzone.style.background = 'rgba(59, 130, 246, 0.04)';
      dropzone.style.borderColor = 'rgba(59, 130, 246, 0.4)';
    });
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.style.background = 'rgba(59, 130, 246, 0.04)';
      dropzone.style.borderColor = 'rgba(59, 130, 246, 0.4)';
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files[0]) {
        handleFile(fileInput.files[0]);
      }
    });
  }

  function handleFile(file) {
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedBase64 = e.target.result;
      updatePreview(uploadedBase64, `Selected local file: ${file.name}`);
    };
    reader.readAsDataURL(file);
  }

  sourceSelect.addEventListener('change', () => {
    if (sourceSelect.value === 'file') {
      fileUploadContainer.style.display = 'flex';
      urlContainer.style.display = 'none';
      if (uploadedBase64) {
        updatePreview(uploadedBase64, 'Local file selected');
      }
    } else if (sourceSelect.value === 'custom') {
      fileUploadContainer.style.display = 'none';
      urlContainer.style.display = 'flex';
      if (customUrlInput.value) {
        updatePreview(customUrlInput.value, 'Custom URL');
      }
    } else if (sourceSelect.value === 'default') {
      fileUploadContainer.style.display = 'none';
      urlContainer.style.display = 'none';
      updatePreview('images/about_swen.jpg', 'Original default photo');
    }
  });

  customUrlInput.addEventListener('input', () => {
    if (customUrlInput.value.trim()) {
      updatePreview(customUrlInput.value.trim(), 'Custom URL preview');
    }
  });

  resetBtn.addEventListener('click', () => {
    localStorage.removeItem('about_profile_image');
    initAboutPageImage();
    showToast('Profile photo reset to default!', 'success');
    closeModal();
  });

  box.querySelector('#change-about-photo-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    let selectedImage = null;

    if (sourceSelect.value === 'file') {
      if (!uploadedBase64) {
        showToast('Please select an image file from your PC', 'error');
        return;
      }
      selectedImage = uploadedBase64;
    } else if (sourceSelect.value === 'custom') {
      const url = customUrlInput.value.trim();
      if (!url) {
        showToast('Please enter a valid image URL', 'error');
        return;
      }
      selectedImage = url;
    } else if (sourceSelect.value === 'default') {
      selectedImage = 'images/about_swen.jpg';
    }

    if (selectedImage) {
      const submitBtn = box.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Uploading to Cloudinary...';
      }

      if (selectedImage.startsWith('data:image/') || selectedImage.startsWith('http')) {
        const cldRes = await uploadMediaToCloudinary(selectedImage, 'swen_portfolio/about');
        if (cldRes && cldRes.url) selectedImage = cldRes.url;
      }

      if (selectedImage === 'images/about_swen.jpg') {
        localStorage.removeItem('about_profile_image');
      } else {
        localStorage.setItem('about_profile_image', selectedImage);
      }
      initAboutPageImage();
      showToast('Profile photo updated successfully!', 'success');
      closeModal();
    }
  });
}

/* ==========================================================================
   Hero & Site Background Photo Customization (Admin)
   ========================================================================== */

function initBackgroundPhotoFeature() {
  const bgImg = localStorage.getItem('site_background_photo');
  let styleEl = document.getElementById('dynamic-bg-style');

  if (bgImg) {
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'dynamic-bg-style';
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = `
      body {
        background-image: 
          radial-gradient(circle at 15% 15%, var(--primary-glow) 0%, transparent 45%),
          radial-gradient(circle at 85% 85%, var(--accent-glow) 0%, transparent 50%),
          linear-gradient(rgba(13, 20, 35, 0.76), rgba(9, 13, 24, 0.82)),
          url("${bgImg}") !important;
      }
      .hero, .page-hero {
        background-image: 
          linear-gradient(rgba(7, 10, 19, 0.72), rgba(7, 10, 19, 0.88)),
          url("${bgImg}") !important;
      }
      body.light-theme .hero,
      body.light-theme .page-hero {
        background-image: 
          linear-gradient(rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.82)),
          url("${bgImg}") !important;
      }
    `;
  } else {
    if (styleEl) styleEl.remove();
  }

  // Inject / update admin edit button on the page hero
  const isAdmin = localStorage.getItem('admin_token') === 'swentech_authenticated_admin';
  const heroSection = document.querySelector('.hero, .page-hero');
  let editBgBtn = document.getElementById('admin-edit-bg-btn');

  if (isAdmin && heroSection) {
    if (window.getComputedStyle(heroSection).position === 'static') {
      heroSection.style.position = 'relative';
    }
    if (!editBgBtn) {
      editBgBtn = document.createElement('button');
      editBgBtn.id = 'admin-edit-bg-btn';
      editBgBtn.className = 'admin-edit-bg-btn';
      editBgBtn.innerHTML = '<i class="fa-solid fa-image"></i> <span>Edit Background Photo</span>';
      editBgBtn.setAttribute('title', 'Change site background photo');
      editBgBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        showChangeBackgroundPhotoModal();
      });
      heroSection.appendChild(editBgBtn);
    }
  } else {
    if (editBgBtn) editBgBtn.remove();
  }
}

function showChangeBackgroundPhotoModal() {
  const { modal, box, closeModal, body } = createModalOverlay('change-bg-photo-modal', 'Edit Background Photo');
  const currentBg = localStorage.getItem('site_background_photo') || 'images/hero_bg.jpg';
  let uploadedBase64 = null;

  body.innerHTML = `
    <form id="change-bg-photo-form" style="display: flex; flex-direction: column; gap: 1.25rem;">
      <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 0;">
        Customize the hero and overall site background photo. Upload a high-resolution photo from your PC, enter a URL, or choose a default preset.
      </p>

      <div style="margin-bottom: 0.25rem;">
        <label style="display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: #94a3b8; font-weight: 500;">Select Image Source</label>
        <select id="bg-img-source-select" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; outline: none; cursor: pointer;">
          <option value="file" style="background: #0d1423; color: #fff;">📁 Upload from Local PC</option>
          <option value="custom" style="background: #0d1423; color: #fff;">🔗 Custom Image URL</option>
          <option value="preset" style="background: #0d1423; color: #fff;">🖼️ Default Presets</option>
        </select>
      </div>

      <!-- LOCAL FILE UPLOAD -->
      <div id="bg-file-upload-container" style="display: flex; flex-direction: column; gap: 0.5rem;">
        <input type="file" id="bg-image-file-input" accept="image/*" style="display: none;">
        <div id="bg-file-dropzone" style="border: 2px dashed rgba(59, 130, 246, 0.4); border-radius: 12px; padding: 2rem 1.5rem; text-align: center; cursor: pointer; background: rgba(59, 130, 246, 0.04); transition: all 0.3s ease;">
          <div style="font-size: 2.2rem; color: #3b82f6; margin-bottom: 0.75rem;"><i class="fa-solid fa-cloud-arrow-up"></i></div>
          <p style="margin: 0 0 0.4rem 0; font-size: 0.95rem; font-weight: 600; color: #ffffff;">Click or Drag & Drop local photo here</p>
          <p style="margin: 0; font-size: 0.8rem; color: #94a3b8;">PNG, JPG, WEBP formats supported</p>
        </div>
      </div>

      <!-- CUSTOM URL -->
      <div id="bg-url-container" style="display: none; flex-direction: column; gap: 0.4rem;">
        <label style="font-size: 0.85rem; color: #94a3b8;">Image URL</label>
        <input type="url" id="bg-custom-url-input" placeholder="https://images.unsplash.com/photo-..." style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; font-family: inherit; font-size: 0.9rem;">
      </div>

      <!-- PRESET PICKER -->
      <div id="bg-preset-container" style="display: none; flex-direction: column; gap: 0.6rem;">
        <label style="font-size: 0.85rem; color: #94a3b8;">Select Preset Background</label>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem;">
          <div class="preset-option-card active" data-src="images/hero_bg.jpg" style="border: 2px solid #3b82f6; border-radius: 8px; overflow: hidden; cursor: pointer; position: relative; height: 75px; background: #000;">
            <img src="images/hero_bg.jpg" alt="Preset 1" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.85;">
            <span style="position: absolute; bottom: 4px; left: 4px; background: rgba(0,0,0,0.7); color: #fff; font-size: 0.7rem; padding: 2px 6px; border-radius: 4px;">Original</span>
          </div>
          <div class="preset-option-card" data-src="images/background1.png" style="border: 2px solid rgba(255,255,255,0.1); border-radius: 8px; overflow: hidden; cursor: pointer; position: relative; height: 75px; background: #000;">
            <img src="images/background1.png" alt="Preset 2" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.85;" onerror="this.onerror=null; this.src='images/hero_bg.jpg';">
            <span style="position: absolute; bottom: 4px; left: 4px; background: rgba(0,0,0,0.7); color: #fff; font-size: 0.7rem; padding: 2px 6px; border-radius: 4px;">Dark Abstract</span>
          </div>
          <div class="preset-option-card" data-src="images/about_swen.jpg" style="border: 2px solid rgba(255,255,255,0.1); border-radius: 8px; overflow: hidden; cursor: pointer; position: relative; height: 75px; background: #000;">
            <img src="images/about_swen.jpg" alt="Preset 3" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.85;">
            <span style="position: absolute; bottom: 4px; left: 4px; background: rgba(0,0,0,0.7); color: #fff; font-size: 0.7rem; padding: 2px 6px; border-radius: 4px;">Swen Photo</span>
          </div>
        </div>
      </div>

      <!-- LIVE HERO PREVIEW -->
      <div style="margin-top: 0.25rem; padding: 1.25rem; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; position: relative; overflow: hidden;">
        <div id="bg-preview-hero-box" style="height: 110px; border-radius: 10px; background-image: linear-gradient(rgba(7, 10, 19, 0.7), rgba(7, 10, 19, 0.8)), url('${currentBg}'); background-size: cover; background-position: center; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 1rem; border: 1px solid rgba(255,255,255,0.12);">
          <h4 style="margin: 0 0 0.2rem 0; color: #ffffff; font-size: 1.1rem; text-shadow: 0 2px 8px rgba(0,0,0,0.8);">Background Preview</h4>
          <p id="bg-preview-status-text" style="margin: 0; color: #94a3b8; font-size: 0.8rem;">Showing current active background photo</p>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem; gap: 0.75rem;">
        <button type="button" id="reset-bg-photo-btn" style="padding: 0.65rem 1.2rem; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; color: #ef4444; cursor: pointer; font-size: 0.85rem; font-weight: 500;">Reset to Default</button>
        <div style="display: flex; gap: 0.75rem;">
          <button type="button" class="cancel-modal-btn" style="padding: 0.65rem 1.2rem; background: rgba(255,255,255,0.1); border: none; border-radius: 8px; color: #fff; cursor: pointer; font-size: 0.85rem;">Cancel</button>
          <button type="submit" style="padding: 0.65rem 1.5rem; background: linear-gradient(135deg, #3b82f6, #6366f1); border: none; border-radius: 8px; color: #fff; font-weight: 600; cursor: pointer; font-size: 0.85rem; box-shadow: 0 4px 15px rgba(59,130,246,0.35);">Save Background</button>
        </div>
      </div>
    </form>
  `;

  box.querySelector('.cancel-modal-btn').addEventListener('click', closeModal);

  const sourceSelect = box.querySelector('#bg-img-source-select');
  const fileContainer = box.querySelector('#bg-file-upload-container');
  const urlContainer = box.querySelector('#bg-url-container');
  const presetContainer = box.querySelector('#bg-preset-container');
  const fileInput = box.querySelector('#bg-image-file-input');
  const dropzone = box.querySelector('#bg-file-dropzone');
  const previewBox = box.querySelector('#bg-preview-hero-box');
  const previewStatusText = box.querySelector('#bg-preview-status-text');
  const customUrlInput = box.querySelector('#bg-custom-url-input');
  const resetBtn = box.querySelector('#reset-bg-photo-btn');
  let selectedSrc = currentBg;

  function setPreview(srcUrl, statusLabel) {
    selectedSrc = srcUrl;
    previewBox.style.backgroundImage = `linear-gradient(rgba(7, 10, 19, 0.7), rgba(7, 10, 19, 0.8)), url("${srcUrl}")`;
    if (statusLabel) previewStatusText.textContent = statusLabel;
  }

  // File Upload Handlers
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.style.background = 'rgba(59, 130, 246, 0.15)';
      dropzone.style.borderColor = '#60a5fa';
    });
    dropzone.addEventListener('dragleave', () => {
      dropzone.style.background = 'rgba(59, 130, 246, 0.04)';
      dropzone.style.borderColor = 'rgba(59, 130, 246, 0.4)';
    });
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.style.background = 'rgba(59, 130, 246, 0.04)';
      dropzone.style.borderColor = 'rgba(59, 130, 246, 0.4)';
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    });
    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files[0]) {
        handleFile(fileInput.files[0]);
      }
    });
  }

  function handleFile(file) {
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedBase64 = e.target.result;
      setPreview(uploadedBase64, `Local File: ${file.name}`);
    };
    reader.readAsDataURL(file);
  }

  // Preset Card Pickers
  const presetCards = box.querySelectorAll('.preset-option-card');
  presetCards.forEach(card => {
    card.addEventListener('click', () => {
      presetCards.forEach(c => c.style.borderColor = 'rgba(255,255,255,0.1)');
      card.style.borderColor = '#3b82f6';
      const presetSrc = card.getAttribute('data-src');
      setPreview(presetSrc, 'Selected preset background');
    });
  });

  sourceSelect.addEventListener('change', () => {
    if (sourceSelect.value === 'file') {
      fileContainer.style.display = 'flex';
      urlContainer.style.display = 'none';
      presetContainer.style.display = 'none';
      if (uploadedBase64) setPreview(uploadedBase64, 'Local file selected');
    } else if (sourceSelect.value === 'custom') {
      fileContainer.style.display = 'none';
      urlContainer.style.display = 'flex';
      presetContainer.style.display = 'none';
      if (customUrlInput.value.trim()) setPreview(customUrlInput.value.trim(), 'Custom URL preview');
    } else if (sourceSelect.value === 'preset') {
      fileContainer.style.display = 'none';
      urlContainer.style.display = 'none';
      presetContainer.style.display = 'flex';
      const firstPreset = presetCards[0]?.getAttribute('data-src') || 'images/hero_bg.jpg';
      setPreview(firstPreset, 'Default preset selected');
    }
  });

  customUrlInput.addEventListener('input', () => {
    if (customUrlInput.value.trim()) {
      setPreview(customUrlInput.value.trim(), 'Custom URL preview');
    }
  });

  resetBtn.addEventListener('click', () => {
    localStorage.removeItem('site_background_photo');
    initBackgroundPhotoFeature();
    showToast('Background photo reset to default!', 'success');
    closeModal();
  });

  box.querySelector('#change-bg-photo-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    let finalPhoto = null;

    if (sourceSelect.value === 'file') {
      if (!uploadedBase64) {
        showToast('Please select a photo from your computer', 'error');
        return;
      }
      finalPhoto = uploadedBase64;
    } else if (sourceSelect.value === 'custom') {
      const url = customUrlInput.value.trim();
      if (!url) {
        showToast('Please enter a valid image URL', 'error');
        return;
      }
      finalPhoto = url;
    } else if (sourceSelect.value === 'preset') {
      finalPhoto = selectedSrc || 'images/hero_bg.jpg';
    }

    if (finalPhoto) {
      const submitBtn = box.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Uploading to Cloudinary...';
      }

      if (finalPhoto.startsWith('data:image/') || finalPhoto.startsWith('http')) {
        const cldRes = await uploadMediaToCloudinary(finalPhoto, 'swen_portfolio/backgrounds');
        if (cldRes && cldRes.url) finalPhoto = cldRes.url;
      }

      if (finalPhoto === 'images/hero_bg.jpg') {
        localStorage.removeItem('site_background_photo');
      } else {
        localStorage.setItem('site_background_photo', finalPhoto);
      }
      initBackgroundPhotoFeature();
      showToast('Site background photo updated successfully!', 'success');
      closeModal();
    }
  });
}

/* ==========================================================================
   Cloudinary Media Storage Core & Admin Modal
   ========================================================================== */

async function uploadMediaToCloudinary(imageSource, folder = 'swen_portfolio') {
  if (!imageSource) return { success: false, url: null };
  if (typeof imageSource === 'string' && (imageSource.startsWith('images/') || imageSource.includes('res.cloudinary.com'))) {
    return { success: true, url: imageSource, provider: 'preset' };
  }

  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: imageSource, folder: folder })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.url) {
        if (data.provider === 'cloudinary' || data.provider === 'cloudinary_unsigned') {
          console.log(`[Cloudinary Media Storage] Uploaded to Cloudinary successfully: ${data.url}`);
        }
        return data;
      }
    }
  } catch (err) {
    console.warn('[Cloudinary Media Storage] Upload request failed, using fallback.', err);
  }

  return { success: true, url: imageSource, provider: 'fallback' };
}

async function showCloudinarySettingsModal() {
  const { modal, box, closeModal, body } = createModalOverlay('cloudinary-settings-modal', 'Cloudinary Media Storage');

  body.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.25rem;">
      <div id="cld-status-banner" style="padding: 1rem 1.25rem; border-radius: 12px; background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); display: flex; align-items: center; gap: 0.85rem;">
        <div style="font-size: 1.8rem; color: #3b82f6;"><i class="fa-solid fa-cloud"></i></div>
        <div>
          <h4 id="cld-status-title" style="margin: 0 0 0.25rem 0; font-size: 1rem; color: #ffffff;">Checking Cloudinary API...</h4>
          <p id="cld-status-sub" style="margin: 0; font-size: 0.82rem; color: #94a3b8;">Connecting to server endpoint /api/cloudinary-config</p>
        </div>
      </div>

      <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 1.25rem;">
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.95rem; color: #ffffff; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-layer-group" style="color: #60a5fa;"></i> Automated Media Folders
        </h4>
        <p style="margin: 0 0 0.75rem 0; font-size: 0.85rem; color: #94a3b8;">
          All media uploaded across the website is routed directly to Cloudinary media storage:
        </p>
        <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.83rem; color: #cbd5e1; display: flex; flex-direction: column; gap: 0.4rem;">
          <li>📁 <strong style="color: #60a5fa;">swen_portfolio/projects</strong> — Project card cover photos</li>
          <li>📁 <strong style="color: #60a5fa;">swen_portfolio/reviews</strong> — Client testimonial user avatars</li>
          <li>📁 <strong style="color: #60a5fa;">swen_portfolio/about</strong> — About page profile photos</li>
          <li>📁 <strong style="color: #60a5fa;">swen_portfolio/backgrounds</strong> — Site hero & canvas background images</li>
        </ul>
      </div>

      <!-- TEST CLOUDINARY UPLOAD SECTION -->
      <div style="background: rgba(0, 0, 0, 0.25); border: 1px dashed rgba(59, 130, 246, 0.3); border-radius: 12px; padding: 1.25rem;">
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.95rem; color: #ffffff;"><i class="fa-solid fa-vial" style="color: #a855f7;"></i> Test Live Upload to Cloudinary</h4>
        <p style="margin: 0 0 0.85rem 0; font-size: 0.82rem; color: #94a3b8;">Select a local image to run a test upload through the Cloudinary backend endpoint.</p>
        <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
          <input type="file" id="cld-test-file-input" accept="image/*" style="display: none;">
          <button type="button" id="cld-test-file-btn" style="padding: 0.6rem 1.2rem; background: rgba(59, 130, 246, 0.2); border: 1px solid rgba(59, 130, 246, 0.4); border-radius: 8px; color: #60a5fa; cursor: pointer; font-size: 0.85rem; font-weight: 600;">Choose File</button>
          <span id="cld-test-filename" style="font-size: 0.82rem; color: #94a3b8; max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">No file chosen</span>
          <button type="button" id="cld-test-upload-btn" style="padding: 0.6rem 1.2rem; background: linear-gradient(135deg, #10b981, #059669); border: none; border-radius: 8px; color: #ffffff; cursor: pointer; font-size: 0.85rem; font-weight: 600; margin-left: auto;">Upload Test</button>
        </div>
        <div id="cld-test-result" style="margin-top: 0.85rem; display: none; padding: 0.75rem; background: rgba(0,0,0,0.4); border-radius: 8px; font-size: 0.8rem; word-break: break-all; color: #34d399;"></div>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 0.5rem;">
        <button type="button" class="cancel-modal-btn" style="padding: 0.65rem 1.5rem; background: rgba(255, 255, 255, 0.1); border: none; border-radius: 8px; color: #ffffff; cursor: pointer; font-size: 0.85rem;">Close</button>
      </div>
    </div>
  `;

  box.querySelector('.cancel-modal-btn').addEventListener('click', closeModal);

  // Fetch API status
  try {
    const statusRes = await fetch('/api/cloudinary-config');
    if (statusRes.ok) {
      const config = await statusRes.json();
      const titleEl = box.querySelector('#cld-status-title');
      const subEl = box.querySelector('#cld-status-sub');
      const bannerEl = box.querySelector('#cld-status-banner');

      if (config.hasServerCredentials) {
        bannerEl.style.background = 'rgba(16, 185, 129, 0.12)';
        bannerEl.style.borderColor = 'rgba(16, 185, 129, 0.4)';
        titleEl.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> Cloudinary Connected & Active';
        subEl.textContent = `Cloud Name: ${config.cloudName} | Signed Server-Side Uploads Enabled`;
      } else if (config.configured) {
        bannerEl.style.background = 'rgba(59, 130, 246, 0.12)';
        bannerEl.style.borderColor = 'rgba(59, 130, 246, 0.4)';
        titleEl.innerHTML = '<i class="fa-solid fa-cloud-arrow-up" style="color: #60a5fa;"></i> Cloudinary Ready (Unsigned Preset)';
        subEl.textContent = `Cloud Name: ${config.cloudName} | Preset: ${config.uploadPreset}`;
      } else {
        bannerEl.style.background = 'rgba(245, 158, 11, 0.12)';
        bannerEl.style.borderColor = 'rgba(245, 158, 11, 0.4)';
        titleEl.innerHTML = '<i class="fa-solid fa-triangle-exclamation" style="color: #f59e0b;"></i> Cloudinary Endpoint Active (Awaiting Credentials)';
        subEl.textContent = 'Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in environment settings.';
      }
    }
  } catch (err) {
    console.warn('Failed to query Cloudinary config status', err);
  }

  // Test Upload Event Handlers
  const fileInput = box.querySelector('#cld-test-file-input');
  const fileBtn = box.querySelector('#cld-test-file-btn');
  const filenameSpan = box.querySelector('#cld-test-filename');
  const uploadBtn = box.querySelector('#cld-test-upload-btn');
  const resultDiv = box.querySelector('#cld-test-result');
  let selectedFile = null;

  fileBtn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => {
    if (fileInput.files && fileInput.files[0]) {
      selectedFile = fileInput.files[0];
      filenameSpan.textContent = selectedFile.name;
    }
  });

  uploadBtn.addEventListener('click', async () => {
    if (!selectedFile) {
      showToast('Please select a file to test upload', 'error');
      return;
    }
    uploadBtn.disabled = true;
    uploadBtn.textContent = 'Uploading...';
    resultDiv.style.display = 'block';
    resultDiv.style.color = '#94a3b8';
    resultDiv.textContent = 'Uploading test image to Cloudinary endpoint...';

    const reader = new FileReader();
    reader.onload = async (e) => {
      const cldRes = await uploadMediaToCloudinary(e.target.result, 'swen_portfolio/test');
      uploadBtn.disabled = false;
      uploadBtn.textContent = 'Upload Test';

      if (cldRes.success && cldRes.url) {
        resultDiv.style.color = '#34d399';
        resultDiv.innerHTML = `<strong>Success!</strong> Uploaded URL: <a href="${cldRes.url}" target="_blank" style="color: #60a5fa; text-decoration: underline;">${cldRes.url}</a><br><small style="color: #94a3b8;">Provider: ${cldRes.provider}</small>`;
      } else {
        resultDiv.style.color = '#f87171';
        resultDiv.textContent = `Upload Error: ${cldRes.error || 'Unknown error'}`;
      }
    };
    reader.readAsDataURL(selectedFile);
  });
}

async function showMongoDBSettingsModal() {
  const { modal, box, closeModal, body } = createModalOverlay('mongodb-settings-modal', 'MongoDB Atlas Metadata Storage');

  body.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.25rem;">
      <div id="mongo-status-banner" style="padding: 1rem 1.25rem; border-radius: 12px; background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); display: flex; align-items: center; gap: 0.85rem;">
        <div style="font-size: 1.8rem; color: #10b981;"><i class="fa-solid fa-database"></i></div>
        <div>
          <h4 id="mongo-status-title" style="margin: 0 0 0.25rem 0; font-size: 1rem; color: #ffffff;">Checking MongoDB Connection...</h4>
          <p id="mongo-status-sub" style="margin: 0; font-size: 0.82rem; color: #94a3b8;">Connecting to server endpoint /api/mongodb/status</p>
        </div>
      </div>

      <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 1.25rem;">
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.95rem; color: #ffffff; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-cubes" style="color: #10b981;"></i> Collections & Metadata Storage
        </h4>
        <p style="margin: 0 0 0.75rem 0; font-size: 0.85rem; color: #94a3b8;">
          All site metadata, project cards, reviews, and customized background configs are saved to MongoDB Atlas:
        </p>
        <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.83rem; color: #cbd5e1; display: flex; flex-direction: column; gap: 0.4rem;">
          <li>📦 <strong style="color: #34d399;">SiteMetadata</strong> — Stores site configuration, background photo, & profile photos</li>
          <li>📦 <strong style="color: #34d399;">Projects</strong> — Project catalog metadata, category tags, cover image links</li>
          <li>📦 <strong style="color: #34d399;">Reviews</strong> — Testimonials, reviewer ratings, status flags, & avatar URLs</li>
        </ul>
      </div>

      <div style="background: rgba(0, 0, 0, 0.25); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 1.25rem;">
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.95rem; color: #ffffff;"><i class="fa-solid fa-key" style="color: #f59e0b;"></i> How to Connect Your MongoDB Atlas Cluster</h4>
        <p style="margin: 0 0 0.6rem 0; font-size: 0.82rem; color: #94a3b8;">
          To link your own MongoDB Atlas database, add the <code>MONGODB_URI</code> environment variable in your project settings or <code>.env</code> file:
        </p>
        <div style="background: #090d18; padding: 0.75rem 1rem; border-radius: 8px; font-family: monospace; font-size: 0.8rem; color: #34d399; border: 1px solid rgba(255,255,255,0.1); word-break: break-all;">
          MONGODB_URI=mongodb+srv://&lt;username&gt;:&lt;password&gt;@&lt;cluster&gt;.mongodb.net/swen_portfolio?retryWrites=true&w=majority
        </div>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 0.5rem;">
        <button type="button" class="cancel-modal-btn" style="padding: 0.65rem 1.5rem; background: rgba(255, 255, 255, 0.1); border: none; border-radius: 8px; color: #ffffff; cursor: pointer; font-size: 0.85rem;">Close</button>
      </div>
    </div>
  `;

  box.querySelector('.cancel-modal-btn').addEventListener('click', closeModal);

  // Fetch Mongo Status
  try {
    const res = await fetch('/api/mongodb/status');
    if (res.ok) {
      const status = await res.json();
      const titleEl = box.querySelector('#mongo-status-title');
      const subEl = box.querySelector('#mongo-status-sub');
      const bannerEl = box.querySelector('#mongo-status-banner');

      if (status.connected) {
        bannerEl.style.background = 'rgba(16, 185, 129, 0.12)';
        bannerEl.style.borderColor = 'rgba(16, 185, 129, 0.4)';
        titleEl.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> Connected to MongoDB Atlas';
        subEl.textContent = `Database: ${status.dbName} | Docs: Metadata (${status.counts.metadata}), Projects (${status.counts.projects}), Reviews (${status.counts.reviews})`;
      } else if (status.uriConfigured) {
        bannerEl.style.background = 'rgba(239, 68, 68, 0.12)';
        bannerEl.style.borderColor = 'rgba(239, 68, 68, 0.4)';
        titleEl.innerHTML = '<i class="fa-solid fa-circle-xmark" style="color: #ef4444;"></i> Connection Failed';
        subEl.textContent = `Error: ${status.error || 'Check cluster credentials / Network Access IP list in MongoDB Atlas'}`;
      } else {
        bannerEl.style.background = 'rgba(245, 158, 11, 0.12)';
        bannerEl.style.borderColor = 'rgba(245, 158, 11, 0.4)';
        titleEl.innerHTML = '<i class="fa-solid fa-triangle-exclamation" style="color: #f59e0b;"></i> MongoDB Endpoint Ready (Awaiting Connection String)';
        subEl.textContent = 'Set MONGODB_URI in environment variables to link your cluster. Storing with local fallback mode in the meantime.';
      }
    }
  } catch (err) {
    console.warn('Failed to query MongoDB Atlas status', err);
  }
}

async function initFooterSocialLinks() {
  let socials = {
    linkedin: localStorage.getItem('swentech_footer_linkedin') || 'https://linkedin.com/in/swentech',
    behance: localStorage.getItem('swentech_footer_behance') || 'https://www.behance.net/Swentechx',
    github: localStorage.getItem('swentech_footer_github') || 'https://github.com/bellanaevents-swen'
  };

  try {
    const res = await fetch('/api/metadata/footer_socials');
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.found && data.data) {
        if (data.data.linkedin) {
          socials.linkedin = data.data.linkedin;
          localStorage.setItem('swentech_footer_linkedin', socials.linkedin);
        }
        if (data.data.behance) {
          socials.behance = data.data.behance;
          localStorage.setItem('swentech_footer_behance', socials.behance);
        }
        if (data.data.github) {
          socials.github = data.data.github;
          localStorage.setItem('swentech_footer_github', socials.github);
        }
      }
    }
  } catch (err) {
    // fallback to stored
  }

  const footerRightList = document.querySelectorAll('.footer-right');
  const isAdmin = localStorage.getItem('admin_token') === 'swentech_authenticated_admin';

  footerRightList.forEach(footerRight => {
    // Behance Link
    let behanceLink = footerRight.querySelector('#footer-behance-link') || footerRight.querySelector('a[href*="behance"]');
    if (behanceLink) {
      behanceLink.href = socials.behance;
    }

    // GitHub Link
    let githubLink = footerRight.querySelector('#footer-github-link') || footerRight.querySelector('a[href*="github"]');
    if (githubLink) {
      githubLink.href = socials.github;
    }

    // LinkedIn Link
    let linkedinLink = footerRight.querySelector('#footer-linkedin-link');
    if (!linkedinLink) {
      linkedinLink = document.createElement('a');
      linkedinLink.id = 'footer-linkedin-link';
      linkedinLink.className = 'footer-link';
      linkedinLink.target = '_blank';
      linkedinLink.rel = 'noopener noreferrer';
      linkedinLink.innerHTML = '<i class="fa-brands fa-linkedin"></i>LinkedIn Profile';
      footerRight.appendChild(linkedinLink);
    }
    linkedinLink.href = socials.linkedin;

    // Remove existing edit socials btn if present
    const existingEditBtn = footerRight.querySelector('#footer-socials-edit-btn');
    if (existingEditBtn) existingEditBtn.remove();

    if (isAdmin) {
      const editBtn = document.createElement('button');
      editBtn.id = 'footer-socials-edit-btn';
      editBtn.className = 'footer-socials-edit-btn';
      editBtn.style.padding = '0.2rem 0.65rem';
      editBtn.style.borderRadius = '20px';
      editBtn.style.border = '1px solid rgba(96, 165, 250, 0.4)';
      editBtn.style.background = 'rgba(96, 165, 250, 0.15)';
      editBtn.style.color = '#60a5fa';
      editBtn.style.fontSize = '0.75rem';
      editBtn.style.fontWeight = '600';
      editBtn.style.cursor = 'pointer';
      editBtn.style.transition = 'all 0.25s ease';
      editBtn.style.display = 'inline-flex';
      editBtn.style.alignItems = 'center';
      editBtn.style.gap = '0.35rem';
      editBtn.style.marginTop = '0.35rem';
      editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Edit Socials';

      editBtn.addEventListener('mouseenter', () => {
        editBtn.style.background = 'rgba(96, 165, 250, 0.3)';
        editBtn.style.transform = 'translateY(-1px)';
      });
      editBtn.addEventListener('mouseleave', () => {
        editBtn.style.background = 'rgba(96, 165, 250, 0.15)';
        editBtn.style.transform = 'translateY(0)';
      });

      editBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showEditSocialsModal(socials);
      });

      footerRight.appendChild(editBtn);
    }
  });
}

function showEditSocialsModal(currentSocials) {
  let modal = document.getElementById('edit-socials-modal');
  if (modal) modal.remove();

  modal = document.createElement('div');
  modal.id = 'edit-socials-modal';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.background = 'rgba(10, 15, 30, 0.75)';
  modal.style.backdropFilter = 'blur(12px)';
  modal.style.webkitBackdropFilter = 'blur(12px)';
  modal.style.zIndex = '10000';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.padding = '1.5rem';

  modal.innerHTML = `
    <div style="background: var(--surface, #1e293b); border: 1px solid var(--border, rgba(255,255,255,0.1)); border-radius: 1rem; padding: 2rem; max-width: 480px; width: 100%; box-shadow: 0 20px 50px rgba(0,0,0,0.5); font-family: inherit;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
        <h3 style="margin: 0; font-size: 1.25rem; font-weight: 600; color: #f8fafc; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-share-nodes" style="color: #60a5fa;"></i> Edit Social Profiles
        </h3>
        <button id="close-edit-socials-modal" style="background: none; border: none; color: #94a3b8; font-size: 1.25rem; cursor: pointer;">&times;</button>
      </div>
      <p style="font-size: 0.88rem; color: #94a3b8; margin-bottom: 1.25rem; line-height: 1.5;">
        Update the social profile URLs displayed in the footer across all pages:
      </p>

      <div style="margin-bottom: 1rem;">
        <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.82rem; font-weight: 600; color: #cbd5e1; margin-bottom: 0.4rem;">
          <i class="fa-brands fa-linkedin" style="color: #0a66c2;"></i> LinkedIn Profile URL
        </label>
        <input type="url" id="social-linkedin-input" value="${currentSocials.linkedin || ''}" placeholder="https://linkedin.com/in/swentech" style="width: 100%; padding: 0.7rem 0.9rem; border-radius: 0.5rem; border: 1px solid rgba(255,255,255,0.15); background: rgba(15,23,42,0.6); color: #ffffff; font-size: 0.9rem; outline: none;" />
      </div>

      <div style="margin-bottom: 1rem;">
        <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.82rem; font-weight: 600; color: #cbd5e1; margin-bottom: 0.4rem;">
          <i class="fa-brands fa-github" style="color: #f0f6fc;"></i> GitHub Profile URL
        </label>
        <input type="url" id="social-github-input" value="${currentSocials.github || ''}" placeholder="https://github.com/bellanaevents-swen" style="width: 100%; padding: 0.7rem 0.9rem; border-radius: 0.5rem; border: 1px solid rgba(255,255,255,0.15); background: rgba(15,23,42,0.6); color: #ffffff; font-size: 0.9rem; outline: none;" />
      </div>

      <div style="margin-bottom: 1.5rem;">
        <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.82rem; font-weight: 600; color: #cbd5e1; margin-bottom: 0.4rem;">
          <i class="fa-brands fa-behance" style="color: #053da6;"></i> Behance Profile URL
        </label>
        <input type="url" id="social-behance-input" value="${currentSocials.behance || ''}" placeholder="https://www.behance.net/Swentechx" style="width: 100%; padding: 0.7rem 0.9rem; border-radius: 0.5rem; border: 1px solid rgba(255,255,255,0.15); background: rgba(15,23,42,0.6); color: #ffffff; font-size: 0.9rem; outline: none;" />
      </div>

      <div style="display: flex; gap: 0.75rem; justify-content: flex-end;">
        <button id="cancel-edit-socials-btn" style="padding: 0.6rem 1.2rem; border-radius: 0.5rem; border: 1px solid rgba(255,255,255,0.15); background: transparent; color: #cbd5e1; font-weight: 500; cursor: pointer;">Cancel</button>
        <button id="save-edit-socials-btn" style="padding: 0.6rem 1.5rem; border-radius: 0.5rem; border: none; background: linear-gradient(135deg, #3b82f6, #2563eb); color: #ffffff; font-weight: 600; cursor: pointer; box-shadow: 0 4px 12px rgba(37,99,235,0.3);">Save Social Profiles</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const linkedinInput = document.getElementById('social-linkedin-input');
  linkedinInput.focus();

  const closeModal = () => modal.remove();
  document.getElementById('close-edit-socials-modal').addEventListener('click', closeModal);
  document.getElementById('cancel-edit-socials-btn').addEventListener('click', closeModal);

  document.getElementById('save-edit-socials-btn').addEventListener('click', async () => {
    const updatedSocials = {
      linkedin: document.getElementById('social-linkedin-input').value.trim() || 'https://linkedin.com/in/swentech',
      github: document.getElementById('social-github-input').value.trim() || 'https://github.com/bellanaevents-swen',
      behance: document.getElementById('social-behance-input').value.trim() || 'https://www.behance.net/Swentechx'
    };

    localStorage.setItem('swentech_footer_linkedin', updatedSocials.linkedin);
    localStorage.setItem('swentech_footer_github', updatedSocials.github);
    localStorage.setItem('swentech_footer_behance', updatedSocials.behance);

    try {
      await fetch('/api/metadata/footer_socials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: updatedSocials })
      });
    } catch (err) {
      console.warn('Could not save socials to backend, stored locally.', err);
    }

    closeModal();
    initFooterSocialLinks();
    if (typeof showToast === 'function') {
      showToast('Footer social profiles updated successfully!', 'success');
    }
  });
}

function initAdminFooterTools() {
  initFooterSocialLinks();
  const footerBottom = document.querySelector('.footer-bottom');
  if (!footerBottom) return;

  const existingAdminContainer = document.getElementById('footer-admin-tools-container');
  if (existingAdminContainer) existingAdminContainer.remove();

  const isAdmin = localStorage.getItem('admin_token') === 'swentech_authenticated_admin';
  if (!isAdmin) return;

  const adminContainer = document.createElement('div');
  adminContainer.id = 'footer-admin-tools-container';
  adminContainer.style.display = 'flex';
  adminContainer.style.justifyContent = 'center';
  adminContainer.style.alignItems = 'center';
  adminContainer.style.gap = '0.75rem';
  adminContainer.style.marginTop = '1rem';
  adminContainer.style.flexWrap = 'wrap';

  // Social Profiles Button
  const socialBtn = document.createElement('button');
  socialBtn.id = 'footer-socials-btn';
  socialBtn.style.padding = '0.5rem 1.25rem';
  socialBtn.style.borderRadius = '30px';
  socialBtn.style.border = '1px solid rgba(168, 85, 247, 0.4)';
  socialBtn.style.background = 'rgba(168, 85, 247, 0.1)';
  socialBtn.style.color = '#c084fc';
  socialBtn.style.fontSize = '0.82rem';
  socialBtn.style.fontWeight = '600';
  socialBtn.style.cursor = 'pointer';
  socialBtn.style.transition = 'all 0.3s ease';
  socialBtn.style.display = 'inline-flex';
  socialBtn.style.alignItems = 'center';
  socialBtn.style.gap = '0.5rem';
  socialBtn.innerHTML = '<i class="fa-solid fa-share-nodes"></i> Social Profiles';

  socialBtn.addEventListener('mouseenter', () => {
    socialBtn.style.background = 'rgba(168, 85, 247, 0.2)';
    socialBtn.style.transform = 'translateY(-1px)';
  });
  socialBtn.addEventListener('mouseleave', () => {
    socialBtn.style.background = 'rgba(168, 85, 247, 0.1)';
    socialBtn.style.transform = 'translateY(0)';
  });
  socialBtn.addEventListener('click', () => {
    const currentSocials = {
      linkedin: localStorage.getItem('swentech_footer_linkedin') || 'https://linkedin.com/in/swentech',
      behance: localStorage.getItem('swentech_footer_behance') || 'https://www.behance.net/Swentechx',
      github: localStorage.getItem('swentech_footer_github') || 'https://github.com/bellanaevents-swen'
    };
    showEditSocialsModal(currentSocials);
  });

  // Cloudinary Settings Button
  const cldBtn = document.createElement('button');
  cldBtn.id = 'footer-cloudinary-btn';
  cldBtn.style.padding = '0.5rem 1.25rem';
  cldBtn.style.borderRadius = '30px';
  cldBtn.style.border = '1px solid rgba(59, 130, 246, 0.4)';
  cldBtn.style.background = 'rgba(59, 130, 246, 0.1)';
  cldBtn.style.color = '#60a5fa';
  cldBtn.style.fontSize = '0.82rem';
  cldBtn.style.fontWeight = '600';
  cldBtn.style.cursor = 'pointer';
  cldBtn.style.transition = 'all 0.3s ease';
  cldBtn.style.display = 'inline-flex';
  cldBtn.style.alignItems = 'center';
  cldBtn.style.gap = '0.5rem';
  cldBtn.innerHTML = '<i class="fa-solid fa-cloud"></i> Cloudinary Media Storage';

  cldBtn.addEventListener('mouseenter', () => {
    cldBtn.style.background = 'rgba(59, 130, 246, 0.2)';
    cldBtn.style.transform = 'translateY(-1px)';
  });
  cldBtn.addEventListener('mouseleave', () => {
    cldBtn.style.background = 'rgba(59, 130, 246, 0.1)';
    cldBtn.style.transform = 'translateY(0)';
  });
  cldBtn.addEventListener('click', showCloudinarySettingsModal);

  // MongoDB Atlas Settings Button
  const mongoBtn = document.createElement('button');
  mongoBtn.id = 'footer-mongodb-btn';
  mongoBtn.style.padding = '0.5rem 1.25rem';
  mongoBtn.style.borderRadius = '30px';
  mongoBtn.style.border = '1px solid rgba(16, 185, 129, 0.4)';
  mongoBtn.style.background = 'rgba(16, 185, 129, 0.1)';
  mongoBtn.style.color = '#34d399';
  mongoBtn.style.fontSize = '0.82rem';
  mongoBtn.style.fontWeight = '600';
  mongoBtn.style.cursor = 'pointer';
  mongoBtn.style.transition = 'all 0.3s ease';
  mongoBtn.style.display = 'inline-flex';
  mongoBtn.style.alignItems = 'center';
  mongoBtn.style.gap = '0.5rem';
  mongoBtn.innerHTML = '<i class="fa-solid fa-database"></i> MongoDB Atlas Cluster';

  mongoBtn.addEventListener('mouseenter', () => {
    mongoBtn.style.background = 'rgba(16, 185, 129, 0.2)';
    mongoBtn.style.transform = 'translateY(-1px)';
  });
  mongoBtn.addEventListener('mouseleave', () => {
    mongoBtn.style.background = 'rgba(16, 185, 129, 0.1)';
    mongoBtn.style.transform = 'translateY(0)';
  });
  mongoBtn.addEventListener('click', showMongoDBSettingsModal);

  // Logout Button
  const logoutBtn = document.createElement('button');
  logoutBtn.id = 'footer-admin-logout-btn';
  logoutBtn.style.padding = '0.5rem 1.25rem';
  logoutBtn.style.borderRadius = '30px';
  logoutBtn.style.border = '1px solid rgba(239, 68, 68, 0.4)';
  logoutBtn.style.background = 'rgba(239, 68, 68, 0.1)';
  logoutBtn.style.color = '#ef4444';
  logoutBtn.style.fontSize = '0.82rem';
  logoutBtn.style.fontWeight = '600';
  logoutBtn.style.cursor = 'pointer';
  logoutBtn.style.transition = 'all 0.3s ease';
  logoutBtn.style.display = 'inline-flex';
  logoutBtn.style.alignItems = 'center';
  logoutBtn.style.gap = '0.5rem';
  logoutBtn.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i> Admin Logout';

  logoutBtn.addEventListener('mouseenter', () => {
    logoutBtn.style.background = 'rgba(239, 68, 68, 0.2)';
    logoutBtn.style.transform = 'translateY(-1px)';
  });
  logoutBtn.addEventListener('mouseleave', () => {
    logoutBtn.style.background = 'rgba(239, 68, 68, 0.1)';
    logoutBtn.style.transform = 'translateY(0)';
  });
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_email');
    showToast('Logged out successfully', 'success');
    refreshAllProjectViews();
    renderDynamicReviews();
    initAboutPageImage();
    initBackgroundPhotoFeature();
    initFooterSocialLinks();
    initAdminFooterTools();
  });

  adminContainer.appendChild(socialBtn);
  adminContainer.appendChild(cldBtn);
  adminContainer.appendChild(mongoBtn);
  adminContainer.appendChild(logoutBtn);
  footerBottom.appendChild(adminContainer);
}

// Premium Damped Smooth Scroll Engine (Silky slow scroll feel)
function initSmoothScroll() {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  let targetY = window.scrollY;
  let currentY = window.scrollY;
  let isRunning = false;
  const easing = 0.075; // Relaxed inertia damping factor for a luxurious feel

  function scrollStep() {
    currentY += (targetY - currentY) * easing;
    if (Math.abs(targetY - currentY) > 0.5) {
      window.scrollTo(0, currentY);
      requestAnimationFrame(scrollStep);
    } else {
      window.scrollTo(0, targetY);
      isRunning = false;
    }
  }

  window.addEventListener('wheel', (e) => {
    // Allow natural scrolling inside scrollable sub-elements like modals or textareas
    if (e.target.closest('.modal-content, textarea, .scrollable-area')) return;

    e.preventDefault();
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    targetY = Math.min(Math.max(0, targetY + e.deltaY * 0.8), maxScroll);

    if (!isRunning) {
      currentY = window.scrollY;
      isRunning = true;
      requestAnimationFrame(scrollStep);
    }
  }, { passive: false });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSmoothScroll);
} else {
  initSmoothScroll();
}








