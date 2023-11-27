'use client';

import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useEffectOnce } from 'react-use';
// import { useWindowSize } from 'react-use';

type Props = {
  children: ReactNode;
};

const ClientLayout: React.FC<Props> = ({ children }) => {
  const isBreakpoint = useMediaQuery(450);

  const [isLoaded, setIsLoaded] = useState(false);
  useEffectOnce(() => {
    setIsLoaded(true);
  });

  return isLoaded ? (
    isBreakpoint ? (
      <div className='h-screen w-full overflow-hidden'>{children}</div>
    ) : (
      <div className=''>
        <BlackScreen>
          <MobileComponent>{children}</MobileComponent>
        </BlackScreen>
      </div>
    )
  ) : null;
};

const MobileComponent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const topMobile = () => (
  //   <div className='flex h-[22px]  w-full shrink-0 items-center justify-center'>
  //     <div className='h-full w-[80px]  shrink-0 bg-black'>
  //       <div className='h-full w-full rounded-tr-[3px] bg-white'></div>
  //     </div>
  //     <div className='h-full w-full overflow-clip rounded-b-[14px] bg-black'></div>
  //     <div className='h-full w-[80px] shrink-0 bg-black'>
  //       <div className='h-full w-full rounded-tl-[3px] bg-white'></div>
  //     </div>
  //   </div>
  // );

  return (
    <div className='max-w-mobile-screen h-mobile-screen relative  w-full rounded-[40px] bg-black p-4 shadow-2xl'>
      <MobileButton />
      <div className='absolute right-full top-[20%]  h-[8%] w-[6px] rounded-l-md bg-gray-700'></div>
      <div className='absolute right-full top-[29%]  h-[8%] w-[6px] rounded-l-md bg-gray-700'></div>
      <div className='absolute left-full top-[22%]  h-[9%] w-[6px] rounded-r-md bg-gray-700'></div>
      <div className='relative flex h-full w-full  flex-col overflow-hidden  rounded-[30px] bg-white '>
        {/* {topMobile()} */}
        <div className='h-full  w-full overflow-hidden'>{children}</div>

        <div className='absolute bottom-2 left-1/2 h-[5px] w-[120px] -translate-x-1/2 rounded-full bg-gray-800  '></div>
      </div>
    </div>
  );
};

const MobileButton = () => {
  return (
    <div className=''>
      <div className='absolute right-full top-[10%]  h-[5%] w-[6px] rounded-l-md bg-gray-700'></div>
    </div>
  );
};

const BlackScreen: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center bg-white'>
      {children}
    </div>
  );
};

export default ClientLayout;

const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e: MediaQueryListEvent) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addListener(updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeListener(updateTarget);
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  return targetReached;
};
