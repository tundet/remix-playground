import { I18nextProvider } from 'react-i18next';
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

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return (
    <I18nextProvider i18n={i18n}>
      <div className="h-screen bg-gradient-to-t from-yellow to-green">
        <NavBar locale={locale} />
        <div className="px-6 py-6">
          <div className="flex flex-col h-full">
            <div className="prose lg:prose-l mx-auto py-6">
              <h1 className="text-yellow">{t('generate')}</h1>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-screen-xl h-full bg-gray-200 border-l border-gray-300">
                <AnimalGenerator />
              </div>
            </div>
          </div>
        </div>
      </div>
    </I18nextProvider>
  );
}
