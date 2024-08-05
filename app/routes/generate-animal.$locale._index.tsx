import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { MetaFunction } from "@remix-run/react";
import { useParams } from "react-router-dom";
import AnimalGenerator from "../components/AnimalGenerator";
import NavBar from "../components/NavBar";
import { useEffect } from 'react';
import { t } from 'i18next';

export const meta: MetaFunction = () => {
  return [{ title: "Random Animal Generator" }];
};

export default function GenerateAnimal() {
  const { locale } = useParams<{ locale: string }>();
  const { t } = useTranslation();

  useEffect(() => {
    if (locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale]);

  return (
    <I18nextProvider i18n={i18n}>
      <div className="min-h-screen bg-fixed bg-gradient-to-t from-yellow to-green bg-cover bg-center">
        <NavBar locale={locale} />
        <div className="px-6 pb-20">
          <div className="flex flex-col h-full">
            <div className="prose mx-auto py-6">
              <h1>{t('generate')}</h1>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-screen-xl">
                <AnimalGenerator />
              </div>
            </div>
          </div>
        </div>
      </div>
    </I18nextProvider>
  );
}
