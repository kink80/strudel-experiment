import { useState, useEffect, useRef, useCallback } from 'react';
import PlayCircleIcon from '@heroicons/react/20/solid/PlayCircleIcon';
import StopCircleIcon from '@heroicons/react/20/solid/StopCircleIcon';
import cx from '@src/cx.mjs';
import { useSettings, setIsZen } from '../../settings.mjs';
import '../Repl.css';

const { BASE_URL } = import.meta.env;
const baseNoTrailing = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;

function TempoIndicator({ context }) {
  const [bpm, setBpm] = useState(null);
  const [beat, setBeat] = useState(false);
  const animRef = useRef(null);
  const lastBeatRef = useRef(-1);
  const beatsPerCycle = 4;

  const getScheduler = useCallback(
    () => context?.editorRef?.current?.repl?.scheduler,
    [context],
  );

  useEffect(() => {
    let running = true;

    const tick = () => {
      if (!running) return;
      const scheduler = getScheduler();
      if (scheduler?.started) {
        const newBpm = Math.round(scheduler.cps * 60 * beatsPerCycle);
        setBpm((prev) => (prev !== newBpm ? newBpm : prev));
        const cyclePos = scheduler.now();
        const beatIndex = ((cyclePos * beatsPerCycle) | 0);
        if (beatIndex !== lastBeatRef.current) {
          lastBeatRef.current = beatIndex;
          setBeat(true);
          setTimeout(() => setBeat(false), 80);
        }
      }
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
    };
  }, [getScheduler]);

  if (bpm == null) return null;

  return (
    <div className="flex items-center space-x-1.5 px-2 text-foreground opacity-70 text-sm font-mono">
      <div className={cx('w-1.5 h-1.5 rounded-full', beat ? 'bg-foreground' : 'bg-foreground/25')} />
      <span>{bpm}</span>
      <span className="text-xs opacity-50">bpm</span>
    </div>
  );
}

export function Header({ context, embedded = false }) {
  const { started, pending, isDirty, activeCode, handleTogglePlay, handleEvaluate, handleShuffle, handleShare } =
    context;
  const isEmbedded = typeof window !== 'undefined' && (embedded || window.location !== window.parent.location);
  const { isZen, isButtonRowHidden, isCSSAnimationDisabled, fontFamily } = useSettings();

  return (
    <header
      id="header"
      className={cx(
        'flex-none text-black  z-[100] text-lg select-none h-20 md:h-14',
        !isZen && !isEmbedded && 'bg-lineHighlight',
        isZen ? 'h-12 w-8 fixed top-0 left-0' : 'sticky top-0 w-full py-1 justify-between',
        isEmbedded ? 'flex' : 'md:flex',
      )}
      style={{ fontFamily }}
    >
      <div className="px-4 flex space-x-2 md:pt-0 select-none">
        <h1
          onClick={() => {
            if (isEmbedded) window.open(window.location.href.replace('embed', ''));
          }}
          className={cx(
            isEmbedded ? 'text-l cursor-pointer' : 'text-xl',
            'text-foreground font-bold flex space-x-2 items-center',
          )}
        >
          <div
            className={cx(
              'mt-[1px]',
              started && !isCSSAnimationDisabled && 'animate-spin',
              'cursor-pointer text-blue-500',
              isZen && 'fixed top-2 right-4',
            )}
            onClick={() => {
              if (!isEmbedded) {
                setIsZen(!isZen);
              }
            }}
          >
            <span className="block text-foreground rotate-90">꩜</span>
          </div>
          {!isZen && (
            <div className="space-x-2">
              <span className="">strudel</span>
              <span className="text-sm font-medium">REPL</span>
              {!isEmbedded && isButtonRowHidden && (
                <a href={`${baseNoTrailing}/learn`} className="text-sm opacity-25 font-medium">
                  DOCS
                </a>
              )}
            </div>
          )}
        </h1>
        {!isZen && started && <TempoIndicator context={context} />}
      </div>
      {!isZen && !isButtonRowHidden && (
        <div className="flex max-w-full overflow-auto text-foreground px-1 md:px-2">
          <button
            onClick={handleTogglePlay}
            title={started ? 'stop' : 'play'}
            className={cx(
              !isEmbedded ? 'p-2' : 'px-2',
              'hover:opacity-50',
              !started && !isCSSAnimationDisabled && 'animate-pulse',
            )}
          >
            {!pending ? (
              <span className={cx('flex items-center space-x-2')}>
                {started ? <StopCircleIcon className="w-6 h-6" /> : <PlayCircleIcon className="w-6 h-6" />}
                {!isEmbedded && <span>{started ? 'stop' : 'play'}</span>}
              </span>
            ) : (
              <>loading...</>
            )}
          </button>
          <button
            onClick={handleEvaluate}
            title="update"
            className={cx(
              'flex items-center space-x-1',
              !isEmbedded ? 'p-2' : 'px-2',
              !isDirty || !activeCode ? 'opacity-50' : 'hover:opacity-50',
            )}
          >
            {!isEmbedded && <span>update</span>}
          </button>
          {/* !isEmbedded && (
            <button
              title="shuffle"
              className="hover:opacity-50 p-2 flex items-center space-x-1"
              onClick={handleShuffle}
            >
              <span> shuffle</span>
            </button>
          ) */}
          {!isEmbedded && (
            <button
              title="share"
              className={cx(
                'cursor-pointer hover:opacity-50 flex items-center space-x-1',
                !isEmbedded ? 'p-2' : 'px-2',
              )}
              onClick={handleShare}
            >
              <span>share</span>
            </button>
          )}
          {!isEmbedded && (
            <a
              title="learn"
              href={`${baseNoTrailing}/workshop/getting-started/`}
              className={cx('hover:opacity-50 flex items-center space-x-1', !isEmbedded ? 'p-2' : 'px-2')}
            >
              <span>learn</span>
            </a>
          )}
          {/* {isEmbedded && (
            <button className={cx('hover:opacity-50 px-2')}>
              <a href={window.location.href} target="_blank" rel="noopener noreferrer" title="Open in REPL">
                🚀
              </a>
            </button>
          )}
          {isEmbedded && (
            <button className={cx('hover:opacity-50 px-2')}>
              <a
                onClick={() => {
                  window.location.href = initialUrl;
                  window.location.reload();
                }}
                title="Reset"
              >
                💔
              </a>
            </button>
          )} */}
        </div>
      )}
    </header>
  );
}
