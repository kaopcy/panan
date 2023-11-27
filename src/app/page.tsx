'use client';

import Head from 'next/head';
import * as React from 'react';

import AnswerLink from '@/app/question/components/AnswerLink';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Logo from '~/svg/Background.svg';
import Card from '~/svg/Card.svg';
import Curve from '~/svg/Curve.svg';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <main className='h-full w-full'>
      <Head>
        <title>Hi</title>
      </Head>
      <div className='h-full w-full'>
        <section className='relative flex h-[65%] w-full flex-col items-center justify-center bg-gradient-to-b from-white from-[30%] to-[#88C0E8] '>
          <div className='relative w-[80%] min-w-[300px] '>
            <Logo className='w-full' />
            <Card className='absolute  top-0 w-[100%] ' />
          </div>
        </section>
        <section className='relative flex  -translate-y-8 flex-col items-center'>
          <Curve className='absolute top-0 z-[-1] -translate-y-[10px]' />
          <div className='mb-20 text-center text-[26px] leading-10 text-black '>
            <span>คุณกำลัง</span>
            <span className='text-[30px] text-[#D35565]'>ประสบปัญหา</span>
            <br />
            <span>จาก</span>
            <span className='text-[30px] text-[#D35565]'>การพนัน</span>
            <span>หรือไม่?</span>
          </div>

          <AnswerLink
            className='max-w-[300px]'
            href='/question'
            label='เริ่มทำแบบประเมิน'
          />
        </section>
      </div>
    </main>
  );
}
