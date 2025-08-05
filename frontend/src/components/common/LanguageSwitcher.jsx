import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const toggleLanguage = () => {
    const newLang = currentLang === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
  };

  return (
    <button
      onClick={toggleLanguage}
      className="btn btn-outline btn-sm min-w-[40px] px-2 font-bold uppercase"
      aria-label="Change language"
    >
      {currentLang === "ar" ? "EN" : "AR"}
    </button>
  );
};

export default LanguageSwitcher;
