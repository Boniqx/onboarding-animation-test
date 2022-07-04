import { FC, Ref, useLayoutEffect, useRef, useState } from 'react';
import { MotionBox, MotionText } from './motion';

interface TextScrollTransitionProps {
  text: string;
}

const TextScrollTransition: FC<TextScrollTransitionProps> = ({ text }) => {
  const boxRef: Ref<HTMLElement> | undefined = useRef(null);

  const [scrollHeight, setScrollHeight] = useState(0);

  useLayoutEffect(() => {
    const listenToScroll = (): void => {
      const winScroll = window.pageYOffset + document.documentElement.clientHeight;

      setScrollHeight(winScroll);
    };
    window.addEventListener('scroll', listenToScroll);
  }, []);

  const boxYposition = boxRef.current?.offsetTop || 0;
  const boxHeight = boxRef.current?.clientHeight || 0;
  const textArray = text.split('');
  const textLength = textArray.length;
  const enabledLetters = ((scrollHeight - boxYposition - 100) / boxHeight) * textLength;

  return (
    <MotionBox ref={boxRef}>
      <MotionBox>
        {textArray.map((letter, i) => (
          <MotionText
            key={i}
            size="main-heading-2"
            initial={{ color: '#E2E8F0' }}
            {...(enabledLetters > i && { animate: { color: '#111827' } })}
            display="inline"
          >
            {letter}
          </MotionText>
        ))}
      </MotionBox>
    </MotionBox>
  );
};

export default TextScrollTransition;
