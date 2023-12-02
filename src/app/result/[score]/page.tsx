import Image from 'next/image';
import { redirect } from 'next/navigation';
import React, { FC } from 'react';

import { questionsPool } from '@/configs/questions';

export type ScoreConfig = {
  value: number;
  color: string;
  textColor: string;
  bgColor: string;
  text1: string;
  text2: string;
  text3: string;
};

const config: ScoreConfig[] = [
  {
    value: 0,
    color: '#2A8C79',
    bgColor: 'bg-[#DCF1E8]',
    textColor: 'text-[#2A8C79]',
    text1: 'คนในครอบครัวของคุณที่เล่นพนันคนนั้นน่าจะ',
    text2: 'ยังพอควบคุมการเล่นพนัน\nของตัวเองได้',
    text3:
      'เราแนะนำว่าคุณควรหมั่นสังเกตคน ๆ นั้น อยู่บ่อย ๆ\nรวมถึงหมั่นสังเกตตัวเอง ว่าได้รับผลกระทบจากการเล่น\nพนันของคน ๆ นั้นมากขึ้นหรือไม่ และลองกลับมาทำ\nแบบประเมินนี้อีกครั้งเมื่อมีโอกาส',
  },
  {
    value: 3,
    color: '#FF7A00',
    textColor: 'text-[#FF7A00]',
    bgColor: 'bg-[#F7E6D3]',
    text1: 'ดูเหมือนว่าคนในครอบครัวของคุณที่เล่นการพนัน',
    text2:
      'ไม่สามารถควบคุมตัวเองได้แล้วนะ\nคุณน่าจะทำอะไรสักอย่าง\nกับพฤติกรรมการเล่นพนันของเขา',
    text3:
      'เราแนะนำให้คุณลองค้นหาข้อมูลเพิ่มเติม\nเกี่ยวกับวิธีการที่จะช่วยให้คน ๆ นั้น\nลด ละ เลิกพนันได้ตามช่องทางต่าง ๆ',
  },
  {
    value: 6,
    color: '#D35565',
    bgColor: 'bg-[#F1DCE6]',
    textColor: 'text-[#D35565]',
    text1: 'ดูเหมือนว่าคนในครอบครัวของคุณที่เล่นการพนัน',
    text2:
      'กำลังประสบปัญหา\nและคุณเองก็ได้รับผลกระทบ\nอย่าปล่อยให้รุนแรงไปกว่านี้เลย',
    text3:
      'เราแนะนำให้คุณลองแสวงหาความช่วยเหลือ\nตามช่องทางต่าง ๆ ที่เหมาะสมแม้ในกรณีที่\nคน ๆ นั้นไม่ให้ความร่วมมือ หรือยังไม่พร้อม\nจะเข้ารับการปรึกษาเพื่อแก้ปัญหา\nคุณเองก็สามารถเข้ารับคำปรึกษาก่อนได้',
  },
];

import CongratSvg from '@/app/result/[score]/congratSvg';
import OvalBackground from '@/app/result/[score]/ovalBackground';
import ResultTextCard from '@/app/result/[score]/resultTextCard';
import ScoreLevel from '@/app/result/[score]/scoreLevel';
import SuggestionTextCard from '@/app/result/[score]/suggestionTextCard';

type Props = {
  params: { score: string };
};

export async function generateStaticParams() {
  const maxQuestionsCount = Math.max(
    ...Object.entries(questionsPool).map(([k, v]) => v.question.length)
  );

  return Array(maxQuestionsCount).map((number) => ({
    score: number,
  }));
}

const ResultPage: FC<Props> = ({ params: { score } }) => {
  console.log(`static generated ${score}`);
  if (isNaN(parseFloat(score))) {
    redirect('/not-found');
  }

  const scoreNumber = parseFloat(score);

  const scoreVariant = config.findLast((e) => scoreNumber >= e.value);

  return (
    <div className='h-full w-full'>
      <div className='relative flex h-[180px] w-full flex-col items-center justify-center bg-[#C4E2F9]'>
        <div className='mb-8 text-[32px] font-bold'>ผลการประเมิน</div>
        {/* <div className='absolute bottom-0 z-0 flex h-[100px] w-[110%] translate-y-1/2 flex-col items-center rounded-[50%] bg-[#C4E2F9]'></div> */}
        <OvalBackground />
        <CongratSvg
          variant={scoreVariant?.color ?? '#000'}
          className='absolute bottom-[-45%] z-0 w-full max-w-[320px]'
        />
        <ScoreLevel scoreNumber={scoreNumber} scoreVariant={scoreVariant} />
      </div>
      <div className='z-10 mt-[150px] flex w-full flex-col items-center space-y-10'>
        <ResultTextCard variant={scoreVariant} />
        <SuggestionTextCard variant={scoreVariant} />
        <ConsultFooter />
      </div>
      {/* <div className=''>ResultTextCard</div> */}
    </div>
  );
};

const ConsultFooter = () => {
  return (
    <div className='flex h-[70px] w-full items-center justify-center space-x-7 bg-[#000000c8]'>
      <Image
        src='/images/1323.png'
        alt=''
        width={44}
        height={44}
        className='rounded-full'
      />
      <div className='whitespace-pre-line text-[12px] font-normal text-white'>
        ติดพนัน เป็นโรค รักษาได้{'\n'}สายด่วนสุขภาพจิต 1323
      </div>
    </div>
  );
};

export default ResultPage;
