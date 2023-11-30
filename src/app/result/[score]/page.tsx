import { questionsPool } from '@/configs/questions';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React, { FC } from 'react';

type ScoreConfig = {
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

import CardLite from '~/svg/CardLite.svg';

type Props = {
  params: { score: string };
};

export async function generateStaticParams() {
  // const scores = Array(20).map((e) => e + 1);
  const maxQuestionsCount = Math.max(
    ...Object.entries(questionsPool).map(([k, v]) => v.question.length)
  );

  // const mostQuestionPool = questions.reduce((a , b)=> {
  //   return b.length > a.length ? b : a
  // }, [])

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
        <div className='absolute bottom-0 z-0 flex h-[100px] w-[110%] translate-y-1/2 flex-col items-center rounded-[50%] bg-[#C4E2F9]'></div>
        <CongratSvg
          variant={scoreVariant?.color ?? '#000'}
          className='absolute bottom-[-45%] z-0 w-full max-w-[320px]'
        />
        <div
          className={cn(
            'absolute bottom-[-44%] flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-full bg-white  text-[44px] font-black',
            scoreVariant?.textColor
          )}
        >
          <span>{scoreNumber}</span>

          <span className='absolute top-[110%] text-[18px] font-bold text-black'>
            ระดับคะแนน
          </span>
        </div>
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

const ResultTextCard: FC<{ variant?: ScoreConfig }> = ({ variant }) => {
  return (
    <div className='flex h-[180px] w-full max-w-[320px] flex-col items-center justify-center  space-y-3 rounded-2xl px-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
      <div className='text-[16px] font-bold leading-8 tracking-tighter'>
        {variant?.text1}
      </div>
      <div
        className={cn(
          'whitespace-pre-line px-4 text-center text-[20px] font-bold leading-8 tracking-tighter',
          variant?.textColor
        )}
      >
        {variant?.text2}
      </div>
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

const SuggestionTextCard: FC<{ variant?: ScoreConfig }> = ({ variant }) => {
  return (
    <div
      className={cn(
        'relative flex min-h-[145px] w-full max-w-[310px] items-center justify-center whitespace-pre-line rounded-[40px] py-6 text-center text-[14px] font-bold tracking-[-0.5px] ',
        variant?.bgColor
      )}
    >
      <CardLite className='absolute -right-1  -top-5 w-[108%]' />

      {variant?.text3}
    </div>
  );
};

const CongratSvg: FC<React.SVGProps<SVGSVGElement> & { variant: string }> = ({
  variant,
  ...props
}) => {
  return (
    <svg
      width='316'
      height='122'
      viewBox='0 0 316 122'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M44.8955 20.7836C41.9362 21.6245 38.814 20.0538 37.9223 17.2754C37.0303 14.4968 38.7059 11.5629 41.6652 10.722C44.6244 9.88111 47.7463 11.4519 48.6385 14.2305C49.5305 17.0089 47.8547 19.9429 44.8955 20.7836Z'
        fill={variant}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M297.541 39.0711C297.565 41.8629 295.175 44.1466 292.202 44.1719C289.228 44.1972 286.8 41.9544 286.776 39.1626C286.753 36.3705 289.143 34.087 292.116 34.0617C295.089 34.0365 297.517 36.279 297.541 39.0711Z'
        fill={variant}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M17.4711 6.36684C17.4531 4.24507 19.2697 2.5094 21.529 2.49019C23.7881 2.47099 25.6342 4.17551 25.6522 6.29729C25.6702 8.41902 23.8534 10.1547 21.5943 10.1739C19.3351 10.1931 17.4892 8.48856 17.4711 6.36684ZM25.0063 6.30278C24.9911 4.51601 23.4367 3.08063 21.5342 3.0968C19.6316 3.11298 18.1018 4.57459 18.117 6.36135C18.1322 8.14802 19.6866 9.5835 21.5892 9.56733C23.4917 9.55115 25.0215 8.08946 25.0063 6.30278Z'
        fill={variant}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6.25376 49.3123C2.09582 48.3654 -0.454158 44.4311 0.558384 40.5247C1.57093 36.6184 5.76254 34.2192 9.92072 35.1661C14.0789 36.1129 16.6289 40.0472 15.6163 43.9538C14.6037 47.8601 10.4119 50.2593 6.25376 49.3123ZM14.9887 43.8109C15.9169 40.23 13.5795 36.6237 9.76791 35.7556C5.95632 34.8877 2.11408 37.087 1.18595 40.6678C0.257797 44.2485 2.59523 47.8548 6.40661 48.7227C10.2181 49.5908 14.0606 47.3918 14.9887 43.8109Z'
        fill='#749BB1'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M305.427 68.4163C301.269 67.4695 298.719 63.5352 299.732 59.6288C300.744 55.7224 304.936 53.3233 309.094 54.2701C313.252 55.2169 315.802 59.1513 314.79 63.0578C313.777 66.9642 309.585 69.3634 305.427 68.4163ZM314.162 62.9149C315.09 59.3341 312.753 55.7277 308.941 54.8597C305.13 53.9918 301.287 56.191 300.359 59.7719C299.431 63.3526 301.769 66.9589 305.58 67.8268C309.391 68.6949 313.234 66.4958 314.162 62.9149Z'
        fill='#749BB1'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M55.2929 43.9745C54.9977 45.1139 53.7751 45.8136 52.5623 45.5374C51.3497 45.2614 50.6058 44.1138 50.901 42.9745C51.1964 41.8353 52.419 41.1353 53.6318 41.4114C54.8446 41.6876 55.5883 42.8351 55.2929 43.9745Z'
        fill='#36698D'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M131.899 5.39412C131.909 6.5668 130.905 7.52596 129.657 7.53657C128.408 7.54719 127.388 6.60523 127.378 5.43255C127.368 4.25991 128.372 3.30091 129.62 3.29029C130.869 3.27968 131.889 4.22148 131.899 5.39412Z'
        fill={variant}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M144.876 12.3615C144.882 12.9756 144.356 13.4782 143.702 13.4837C143.048 13.4893 142.513 12.9957 142.508 12.3817C142.503 11.7676 143.029 11.265 143.683 11.2595C144.337 11.2539 144.871 11.7474 144.876 12.3615Z'
        fill='#749BB1'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M229.813 100.717C229.805 99.8234 229.028 99.1057 228.077 99.1138C227.125 99.1219 226.36 99.8527 226.368 100.746C226.376 101.639 227.152 102.357 228.104 102.349C229.056 102.341 229.82 101.61 229.813 100.717Z'
        fill={variant}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M311.066 9.12894C311.081 10.8598 309.598 12.2758 307.756 12.2915C305.913 12.3071 304.407 10.9165 304.392 9.18567C304.377 7.45481 305.859 6.03881 307.702 6.02315C309.545 6.00748 311.051 7.39808 311.066 9.12894Z'
        fill='#36698D'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M32.8239 30.4767C31.0597 30.9778 29.1983 30.0414 28.6667 28.3851C28.135 26.7286 29.1338 24.9798 30.898 24.4783C32.6623 23.9772 34.5234 24.9136 35.0553 26.5699C35.587 28.2264 34.588 29.9754 32.8239 30.4767Z'
        fill={variant}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M244.185 23.4404C244.167 21.3187 245.984 19.583 248.243 19.5638C250.502 19.5446 252.348 21.2491 252.366 23.3709C252.384 25.4926 250.567 27.2283 248.308 27.2475C246.049 27.2668 244.203 25.5622 244.185 23.4404ZM251.72 23.3764C251.705 21.5896 250.151 20.1542 248.248 20.1704C246.346 20.1866 244.816 21.6482 244.831 23.435C244.846 25.2216 246.401 26.6571 248.303 26.6409C250.206 26.6248 251.736 25.1631 251.72 23.3764Z'
        fill={variant}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M259.538 47.5503C257.774 48.0514 255.913 47.115 255.381 45.4587C254.849 43.8022 255.848 42.0534 257.612 41.5518C259.377 41.0507 261.238 41.9871 261.77 43.6434C262.301 45.2999 261.302 47.0489 259.538 47.5503Z'
        fill={variant}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M82.116 83.28C79.1566 84.1209 76.0345 82.5502 75.1427 79.7718C74.2508 76.9932 75.9263 74.0593 78.8857 73.2184C81.8448 72.3775 84.9668 73.9483 85.859 76.7269C86.7509 79.5053 85.0751 82.4393 82.116 83.28Z'
        fill='#36698D'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M233.257 79.3358C230.298 80.1767 227.176 78.6059 226.284 75.8275C225.392 73.0489 227.068 70.115 230.027 69.2741C232.986 68.4332 236.108 70.004 237 72.7826C237.892 75.561 236.216 78.4951 233.257 79.3358Z'
        fill='#36698D'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M128.327 120.162C126.562 120.663 124.701 119.726 124.169 118.07C123.638 116.414 124.636 114.665 126.401 114.163C128.165 113.662 130.026 114.599 130.558 116.255C131.09 117.911 130.091 119.66 128.327 120.162Z'
        fill='#36698D'
      />
    </svg>
  );
};

export default ResultPage;
