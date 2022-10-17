import type { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '../utils/trpc';
import { signIn, signOut, useSession } from 'next-auth/react';
import styles from './index.module.css';
import { onPromise } from '@/utils';
import { chakra, Spinner } from '@chakra-ui/react';
import { PageLayout } from 'chakra.ui';

const Home: NextPage = () => {
  const { data, status } = trpc.preference.all.useQuery();

  return (
    <>
      <PageLayout
        type="default"
        title="My Landing Page"
        description="This is the landing page for my product, brand or service."
      >
        <div className={styles.containerOuter}>
          <div className={styles.containerInner}>
            <h1 className={styles.title}>
              Create <chakra.span color="brand.400">T3</chakra.span> App
            </h1>

            <h3 className={styles.subtitle}>This stack uses:</h3>
            <div className={styles.cardGrid}>
              <TechnologyCard
                name="NextJS"
                description="The React framework for production"
                documentation="https://nextjs.org/"
              />
              <TechnologyCard
                name="TypeScript"
                description="Strongly typed programming language that builds on JavaScript, giving you better tooling at any scale"
                documentation="https://www.typescriptlang.org/"
              />
              <TechnologyCard
                name="TailwindCSS"
                description="Rapidly build modern websites without ever leaving your HTML"
                documentation="https://tailwindcss.com/"
              />
              <TechnologyCard
                name="tRPC"
                description="End-to-end typesafe APIs made easy"
                documentation="https://trpc.io/"
              />
              <TechnologyCard
                name="Next-Auth"
                description="Authentication for Next.js"
                documentation="https://next-auth.js.org/"
              />
              <TechnologyCard
                name="Prisma"
                description="Build data-driven JavaScript & TypeScript apps in less time"
                documentation="https://www.prisma.io/docs/"
              />
            </div>
            <div className={styles.helloFrom}>
              {status !== 'loading' ? (
                <p>{JSON.stringify(data, null, 2)}</p>
              ) : (
                <Spinner />
              )}
            </div>
            <AuthShowcase />
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();

  const { data: sessionData } = useSession();

  return (
    <div className={styles.authShowcase}>
      {sessionData && <p>Logged in as {sessionData?.user?.name}</p>}
      {secretMessage && <p>{secretMessage}</p>}
      <button
        className={styles.signInButton}
        onClick={onPromise(sessionData ? () => signOut() : () => signIn())}
      >
        {sessionData ? 'Sign out' : 'Sign in'}
      </button>
    </div>
  );
};

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const TechnologyCard = ({
  name,
  description,
  documentation,
}: TechnologyCardProps) => {
  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>{name}</h2>
      <p className={styles.cardDescription}>{description}</p>
      <a
        className={styles.cardDocumentation}
        href={documentation}
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </a>
    </section>
  );
};
