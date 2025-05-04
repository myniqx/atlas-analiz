// Site colors
export const siteColors = {
  primary: "#000000", // Black
  secondary: "#FFFFFF", // White
  accent: "#00205B", // Navy Blue
};

// Used in: layout.tsx, navbar.tsx, footer.tsx
export const siteInfo = {
  siteName: "Atlas Analiz",
  siteDescription: "Akademik başarınız için profesyonel danışmanlık hizmetleri",
  logo: "/images/logo.jpeg", // Logo path for navbar

  primaryColor: siteColors.primary,
  secondaryColor: siteColors.secondary,
  accentColor: siteColors.accent,
};

// Used in: layout.tsx
export const seo = {
  siteName: siteInfo.siteName,
  title: `${siteInfo.siteName} - Akademik Danışmanlık Hizmetleri`,
  description:
    "Tez, makale ve akademik çalışmalarınız için profesyonel danışmanlık hizmetleri sunuyoruz. Akademik başarınızı bir üst seviyeye taşıyın.",
  keywords:
    "tez danışmanlığı, makale yazımı, istatistiksel analiz, akademik çeviri, intihal kontrolü, literatür taraması",
  author: siteInfo.siteName,
  ogTitle: `${siteInfo.siteName} - Akademik Danışmanlık Hizmetleri`,
  ogDescription:
    "Akademik çalışmalarınızda profesyonel destek ile başarıya ulaşın",
  ogImage: "/images/og-image.png",
  ogUrl: "https://atlasanaliz.com",
  twitterCard: "summary_large_image",
  twitterSite: "@atlasanaliz",
  twitterCreator: "@atlasanaliz",
  canonicalUrl: "https://atlasanaliz.com",
  locale: "tr-TR",
  type: "website",
};

// Add page-specific metadata
export const pageMetadata = {
  home: {
    title: seo.title,
    description: seo.description,
  },
  fiyat: {
    title: `Hizmet Başvuru Formu | ${siteInfo.siteName}`,
    description: `${siteInfo.siteName} akademik danışmanlık hizmetleri için başvuru formu. Tez, makale ve akademik çalışmalarınız için profesyonel destek alın.`,
  },
  // Add other pages as needed
};

// Used in: contact.tsx, footer.tsx
export const contactInfo = {
  senderEmail: "info@atlasanaliz.com",
  contactEmail: "atlasakademik@gmail.com",
  phone: "+ 90 (540) 640 40 10",
  address: null,
  whatsapp: {
    number: "+905406404010",
    defaultMessage:
      "Merhaba, Atlas Analiz'den akademik danışmanlık hizmetleriniz hakkında bilgi almak istiyorum.",
  },
  socialMedia: {
    linkedin: "https://linkedin.com/company/atlasanaliz",
    twitter: "https://twitter.com/atlasanaliz",
    instagram: "https://instagram.com/atlasanaliz",
  },
};

// Used in: page.tsx, background-image.tsx, hero.tsx, about-us.tsx
export const images = {
  background: "/images/background.jpg",
  hero: "/images/hero-image.jpg",
  aboutUs: "/images/about-us.jpg",
};

export const videos = {
  video: "/videos/hero-video.mp4",
};

// Used in: navbar.tsx
export const navigation = {
  navItems: [
    { key: "hero", label: "Anasayfa" },
    { key: "about-us", label: "Hakkımızda" },
    { key: "services", label: "Hizmetlerimiz" },
    { key: "testimonials", label: "Müşteri Yorumları" },
    { key: "faq", label: "SSS" },
  ],
  contactButton: "İletişime Geçin",
};

// Used in: hero.tsx
export const hero = {
  title: "Akademik Başarınız İçin Profesyonel Destek",
  description:
    "Tez, makale ve akademik çalışmalarınızda uzman kadromuzla yanınızdayız. Bilimsel araştırmalarınızı bir üst seviyeye taşıyoruz.",
  ctaText: "Ücretsiz fiyat teklifi alın",
  whatsappText: "WhatsApp'tan bize ulaşın",
};

// Used in: about-us.tsx
export const aboutUs = {
  title: "Akademik Yolculuğunuzda Güvenilir Partneriniz",
  description:
    "Atlas Analiz olarak, akademik çalışmalarınızda karşılaştığınız zorlukları aşmanıza yardımcı oluyoruz. Alanında uzman akademisyenlerden oluşan ekibimiz, en güncel metodolojileri kullanarak çalışmalarınız için özel çözümler üretiyor.",
  features: [
    {
      title: "Akademik Uzmanlık",
      description:
        "Farklı disiplinlerden doktora derecesine sahip akademisyenlerden oluşan kadromuzla yüksek kalitede hizmet sunuyoruz.",
    },
    {
      title: "Etik Değerler",
      description:
        "Tüm çalışmalarımızda akademik dürüstlük ve etik değerleri ön planda tutarak, özgün ve güvenilir içerik üretiyoruz.",
    },
    {
      title: "Kişiselleştirilmiş Yaklaşım",
      description:
        "Her projeyi benzersiz kabul ediyor, ihtiyaçlarınıza özel çözümler geliştirerek akademik hedeflerinize ulaşmanızı sağlıyoruz.",
    },
  ],
};

// Used in: services.tsx
export const services = {
  title: "Hizmetlerimiz",
  services: [
    {
      title: "Tez Danışmanlığı",
      icon: "GraduationCap",
      description:
        "Akademik kariyerinizin en önemli adımlarından biri olan tez sürecinizde uzman kadromuzla yanınızdayız. Konu belirleme, literatür taraması, metodoloji seçimi ve veri analizi aşamalarında profesyonel destek sağlıyoruz. Tezinizin özgün, bilimsel standartlara uygun ve akademik açıdan güçlü olması için çalışıyoruz.",
    },
    {
      title: "Makale & Yayın Desteği",
      icon: "ScrollText",
      description:
        "Araştırmalarınızı ulusal ve uluslararası dergilerde yayınlanabilir kaliteye ulaştırmak için kapsamlı destek sunuyoruz. Makalenizin yapılandırılması, literatür entegrasyonu ve metodoloji açıklaması konularında profesyonel rehberlik sağlıyoruz. Dergi seçiminden yayın sürecinin takibine kadar tüm aşamalarda yanınızdayız.",
    },
    {
      title: "Essay Editing",
      icon: "FileEdit",
      description:
        "Yurt dışı eğitim başvurularınızda veya uluslararası akademik çalışmalarınızda ihtiyaç duyduğunuz İngilizce düzenleme hizmetini sunuyoruz. Anadili İngilizce olan editörlerimiz, metinlerinizi dilbilgisi, kelime seçimi ve akademik ton açısından profesyonel standartlara uygun hale getiriyor. Çalışmalarınızın uluslararası platformlarda kabul görmesi için gerekli dil kalitesini sağlıyoruz.",
    },
    {
      title: "İstatistiksel Analiz",
      icon: "BarChart2",
      description:
        "Araştırma verilerinizi SPSS, R ve Python gibi gelişmiş yazılımlar kullanarak profesyonel düzeyde analiz ediyoruz. Tanımlayıcı istatistiklerden karmaşık çok değişkenli analizlere kadar geniş bir yelpazede hizmet sunuyoruz. Her analiz sonucunda detaylı raporlar hazırlayarak, bulguların doğru yorumlanmasını sağlıyoruz.",
    },
    {
      title: "İntihal Kontrolü",
      icon: "FileSearch",
      description:
        "Akademik çalışmalarınızın özgünlüğünü Turnitin ve diğer profesyonel yazılımlar aracılığıyla titizlikle kontrol ediyoruz. Detaylı intihal raporları sunarak, çalışmanızın hangi bölümlerinde düzenleme gerektiğini net bir şekilde belirliyoruz. Akademik dürüstlük standartlarına uygun, özgün çalışmalar ortaya koymanız için gerekli rehberliği sağlıyoruz.",
    },
    {
      title: "Literatür Taraması",
      icon: "BookOpen",
      description:
        "Araştırma konunuzla ilgili kapsamlı ve sistematik literatür taraması hizmeti sunuyoruz. Ulusal ve uluslararası akademik veritabanlarını kullanarak, alanınızdaki en güncel ve önemli çalışmaları tespit ediyor ve sentezliyoruz. Literatür taramanızın eksiksiz, güncel ve araştırmanızla doğrudan ilişkili olmasını sağlıyoruz.",
    },
    {
      title: "Akademik Çeviri",
      icon: "Languages",
      description:
        "Türkçe-İngilizce ve İngilizce-Türkçe akademik çeviri hizmetimizle, çalışmalarınızın uluslararası platformlarda yer almasını sağlıyoruz. Alanında uzman çevirmenlerimiz, akademik terminolojiye hâkim olarak, metinlerinizin anlam bütünlüğünü koruyarak profesyonel çeviriler yapıyor. Her iki dilde de akademik standartlara uygun, kaliteli çeviriler sunuyoruz.",
    },
    {
      title: "Araştırma Metodolojisi",
      icon: "FlaskConical",
      description:
        "Araştırma projeniz için en uygun metodolojinin belirlenmesi ve uygulanması konusunda uzman danışmanlık hizmeti veriyoruz. Nitel, nicel veya karma yöntem tasarımlarında, veri toplama araçlarının geliştirilmesinden örneklem seçimine kadar tüm süreçlerde rehberlik ediyoruz. Araştırmanızın bilimsel geçerliliğini ve güvenilirliğini artıracak metodolojik yaklaşımlar sunuyoruz.",
    },
  ],
};

// Used in: how-we-work.tsx
export const howWeWork = {
  title: "Nasıl Çalışıyoruz?",
  steps: [
    {
      title: "İhtiyaç Analizi",
      description:
        "Akademik çalışmanızın kapsamını ve ihtiyaçlarınızı detaylı olarak değerlendiriyoruz.",
    },
    {
      title: "Metodoloji Belirleme",
      description:
        "Çalışmanız için en uygun yöntem ve araçları belirleyerek bir yol haritası oluşturuyoruz.",
    },
    {
      title: "Uygulama",
      description:
        "Belirlenen metodoloji doğrultusunda akademik çalışmanızı titizlikle yürütüyoruz.",
    },
    {
      title: "Kalite Kontrolü",
      description:
        "Tüm çalışmalarımızı akademik standartlara uygunluk açısından detaylı kontrolden geçiriyoruz.",
    },
  ],
};

// Used in: testimonials.tsx
export const testimonials = {
  title: "Müşteri Yorumları",
  items: [
    {
      name: "Dr. Ahmet Yılmaz",
      company: "İstanbul Üniversitesi",
      position: "Doktora Öğrencisi",
      comment:
        "Atlas Analiz ile doktora tezim için çalıştım ve sonuçtan son derece memnun kaldım. İstatistiksel analizlerde sundukları destek sayesinde karmaşık verileri anlamlandırabildim ve tezim büyük beğeni topladı.",
    },
    {
      name: "Ayşe Kaya",
      company: "Ankara Üniversitesi",
      position: "Yüksek Lisans Öğrencisi",
      comment:
        "Yüksek lisans tezimin literatür taraması aşamasında Atlas Analiz'den aldığım destek paha biçilemezdi. Kapsamlı ve sistematik bir literatür taraması sayesinde araştırmamı sağlam temeller üzerine inşa edebildim.",
    },
    {
      name: "Prof. Dr. Mehmet Demir",
      company: "Boğaziçi Üniversitesi",
      position: "Akademisyen",
      comment:
        "Uluslararası bir dergide yayınlanacak makalem için Atlas Analiz'in akademik çeviri hizmetinden yararlandım. Terminolojiye hakimiyetleri ve profesyonel yaklaşımları sayesinde makalem prestijli bir dergide yayınlanmaya hak kazandı.",
    },
    {
      name: "Zeynep Şahin",
      company: "Oxford University",
      position: "Doktora Adayı",
      comment:
        "Yurt dışı doktora başvurularım için Essay Editing hizmetlerinden faydalandım. İngilizce metinlerimin akademik standartlara uygun hale getirilmesi sayesinde Oxford'dan kabul aldım. Atlas Analiz ekibine minnettarım.",
    },
  ],
};

// Used in: faq.tsx
export const faq = {
  title: "Sıkça Sorulan Sorular",
  questions: [
    {
      question: "Hizmetleriniz akademik etik kurallarına uygun mu?",
      answer:
        "Kesinlikle evet. Atlas Analiz olarak tüm hizmetlerimizde akademik etik kurallarını ve dürüstlük ilkelerini ön planda tutuyoruz. Danışmanlık hizmetlerimiz, öğrencilerin ve araştırmacıların kendi çalışmalarını daha iyi yapabilmeleri için rehberlik etmeyi amaçlar. İntihal veya akademik usulsüzlük teşkil edecek hiçbir hizmet sunmuyoruz.",
    },
    {
      question:
        "Tez danışmanlığı sürecinde hangi aşamalarda destek alabiliyorum?",
      answer:
        "Tez sürecinin her aşamasında destek sunuyoruz: Konu seçimi ve daraltılması, literatür taraması, metodoloji belirleme, veri toplama araçları geliştirme, veri analizi, bulguların yorumlanması ve tezin yazım aşaması. İhtiyacınıza göre tüm süreç boyunca veya sadece belirli aşamalarda danışmanlık hizmeti alabilirsiniz.",
    },
    {
      question: "İstatistiksel analiz için hangi programları kullanıyorsunuz?",
      answer:
        "SPSS, R, Python, STATA, AMOS, LISREL gibi yaygın kullanılan istatistiksel analiz programlarında uzmanız. Araştırmanızın niteliğine ve ihtiyaçlarınıza en uygun programı seçerek analizlerinizi gerçekleştiriyoruz. Ayrıca analiz sonuçlarının yorumlanması ve raporlanması konusunda da detaylı destek sağlıyoruz.",
    },
    {
      question: "Hizmetlerinizin fiyatlandırması nasıl belirleniyor?",
      answer:
        "Fiyatlandırmamız projenin kapsamına, süresine, karmaşıklığına ve ihtiyaç duyulan uzmanlık seviyesine göre değişiklik gösterir. Her müşterimize özel fiyatlandırma sunuyoruz. Ücretsiz ön görüşme sonrasında projenizi değerlendirip detaylı bir teklif hazırlıyoruz. Öğrenciler için özel indirimlerimiz bulunmaktadır.",
    },
    {
      question: "Ne kadar sürede sonuç alabilirim?",
      answer:
        "Hizmet süresi, projenin kapsamına ve karmaşıklığına bağlı olarak değişmektedir. Literatür taraması veya intihal kontrolü gibi hizmetler için genellikle 3-7 gün yeterli olurken, kapsamlı bir tez danışmanlığı veya istatistiksel analiz için daha uzun süreler gerekebilir. Acil durumlar için hızlandırılmış hizmet seçeneklerimiz de mevcuttur.",
    },
    {
      question: "Hangi akademik disiplinlerde hizmet veriyorsunuz?",
      answer:
        "Sosyal bilimler, fen bilimleri, sağlık bilimleri, mühendislik, eğitim bilimleri, işletme ve ekonomi başta olmak üzere geniş bir yelpazede akademik danışmanlık hizmeti sunuyoruz. Her disiplin için alanında uzman akademisyenlerden oluşan bir ekibimiz bulunmaktadır.",
    },
    {
      question: "Yurt dışındaki öğrenciler için hizmet veriyor musunuz?",
      answer:
        "Evet, dünyanın her yerinden öğrencilere ve araştırmacılara online olarak hizmet veriyoruz. Özellikle yurt dışında eğitim gören Türk öğrenciler ve Türkiye'de araştırma yapmak isteyen yabancı araştırmacılar için özel çözümlerimiz bulunmaktadır. İngilizce, Almanca ve Fransızca dillerinde de hizmet sunabiliyoruz.",
    },
    {
      question: "Gizlilik politikanız nedir?",
      answer:
        "Müşterilerimizin gizliliği bizim için son derece önemlidir. Tüm projelerimizde gizlilik sözleşmesi imzalıyor ve paylaşılan tüm bilgilerin kesinlikle gizli tutulacağını garanti ediyoruz. Çalışmalarınız ve kişisel bilgileriniz hiçbir şekilde üçüncü taraflarla paylaşılmaz.",
    },
  ],
};

// Used in: contact.tsx
export const contact = {
  title: "İletişim",
  description:
    "Akademik çalışmalarınız veya sorularınız için bizimle iletişime geçin. En kısa sürede size dönüş yapacağız.",
  formName: "Adınız",
  formEmail: "E-posta Adresiniz",
  formMessage: "Mesajınız",
  formButton: "Gönder",
  successMessage:
    "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.",
  errorMessage:
    "Mesajınız gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
};

// Used in: footer.tsx
export const footer = {
  description:
    "Akademik danışmanlık hizmetleri ile bilimsel çalışmalarınızda yanınızdayız.",
  quickLinks: {
    title: "Hızlı Bağlantılar",
    links: [
      { label: "Anasayfa", href: "#hero" },
      { label: "Hizmetlerimiz", href: "#services" },
      { label: "Müşteri Yorumları", href: "#testimonials" },
      { label: "SSS", href: "#faq" },
      { label: "İletişim", href: "#contact" },
    ],
  },
  copyright: "Tüm hakları saklıdır.",
};

// Function to colorize the first letter of the last word
export const colorizeLastWordFirstLetter = (title: string) => {
  // Implementation moved to ColoredHeader component
};

// Export a default object for backward compatibility if needed
export default {
  siteInfo,
  seo,
  contactInfo,
  images,
  navigation,
  hero,
  aboutUs,
  services,
  howWeWork,
  testimonials,
  faq,
  contact,
  footer,
};
