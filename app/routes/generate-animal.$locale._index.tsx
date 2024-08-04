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
      <div>
        <NavBar locale={locale} />
        <div className="container mx-auto py-6">
          <div className="prose lg:prose-l mx-auto p-4">
            <h1>{t('generate')}</h1>
            <AnimalGenerator />
          </div>
        </div>
      </div>
    </I18nextProvider>
  );
}
