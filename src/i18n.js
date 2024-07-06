import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ar: {
    translation: {
      "Welcome": "مرحبًا",
      "Description": "وصف",
      "Add Rule": "إضافة ضابط",
      "Complete": "مطبق كلياً",
      "Partial": "مطبق جزئياً",
      "Not Applied": "غير مطبق",
      "Number of Controls": "عدد الضوابط",
      "Compliance Status": "حالة الالتزام",
      "View Statistics": "عرض الإحصائيات",
      "Evaluation": "تقييم",
      "Admin Dashboard": "لوحة تحكم المشرف",
      "Button 5": "زر 5",
      "Button 6": "زر 6",
      "Logout": "تسجيل الخروج",
      // يمكنك إضافة المزيد من الترجمات هنا حسب الحاجة
    }
  },
  en: {
    translation: {
      "Welcome": "Welcome",
      "Description": "Description",
      "Add Rule": "Add Rule",
      "Complete": "Complete",
      "Partial": "Partial",
      "Not Applied": "Not Applied",
      "Number of Controls": "Number of Controls",
      "Compliance Status": "Compliance Status",
      "View Statistics": "View Statistics",
      "Evaluation": "Evaluation",
      "Admin Dashboard": "Admin Dashboard",
      "Button 5": "Button 5",
      "Button 6": "Button 6",
      "Logout": "Logout",
      // يمكنك إضافة المزيد من الترجمات هنا حسب الحاجة
    }
  }
  // يمكنك إضافة لغات أخرى هنا
};

i18n
  .use(initReactI18next) // تمرير i18n إلى react-i18next
  .init({
    resources,
    lng: 'ar', // اللغة الافتراضية
    fallbackLng: 'en', // اللغة البديلة إذا لم تتوفر الترجمة
    interpolation: {
      escapeValue: false // react بالفعل يقوم بعملية الهروب من الأحرف الخاصة
    }
  });

export default i18n;
