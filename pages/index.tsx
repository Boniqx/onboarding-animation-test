import ContentLayout from '@components/Layout/ContentLayout';
import MainLayout from '@components/Layout/MainLayout';
import { MotionBox, MotionText } from '@components/motion';
import TextScrollTransition from '@components/TextScrollTransition';
import Head from 'next/head';
import { FC } from 'react';
const Home: FC = () => {
  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.5,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: 'afterChildren',
      },
    },
  };

  const itemRight = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -500 },
  };

  const itemLeft = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: 500 },
  };

  return (
    <MainLayout>
      <ContentLayout>
        <Head>
          <title>Home</title>
        </Head>

        <MotionBox initial="hidden" animate="visible" variants={list} height="60vh">
          <MotionText variants={itemRight} color="gray.900" w="full" display="block" size="main-heading-1">
            Building products
          </MotionText>
          <MotionText
            variants={itemLeft}
            color="gray.900"
            textAlign="center"
            w="full"
            display="block"
            size="main-heading-1"
          >
            that enable you
          </MotionText>
          <MotionText
            variants={itemRight}
            color="gray.900"
            textAlign="end"
            w="full"
            display="block"
            size="main-heading-1"
          >
            to become future ready.
          </MotionText>
        </MotionBox>

        <TextScrollTransition
          text="High Output Ventures is a venture builder keen to transform the future of work. Our teams build products from
        ground up and these spin-off to form part of our ventures."
        />
      </ContentLayout>
    </MainLayout>
  );
};

export default Home;
