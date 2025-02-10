import { useState, useEffect, useRef } from 'react';
import { cx } from '../utils';
import { Status } from '../defaults';

interface Props {
  children?: React.ReactNode;
  id?: string;
  boxStyle?: string;
  count?: number;
  status?: Status;
}

const Accordion = ({
  children,
  id = '',
  boxStyle = '',
  count = 0,
  status = Status.PENDING,
}: Props) => {
  const [clicked, setClicked] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => {
    setClicked((prev) => !prev);
  };

  useEffect(() => {
    if (clicked && contentRef.current) {
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    } else if (contentRef.current) {
      contentRef.current.style.height = '0px';
    }
  }, [clicked]);

  return (
    <div className="accordion">
      <button
        onClick={handleToggle}
        className={cx('accordion-btn', clicked ? 'active' : '')}
      >
        <div className={cx('accordion-header', status)}>
          <span className="accordion-icon">
            {clicked ? '\u25BC' : '\u25B6'}
          </span>
          <div className={cx('accordion-dots', status)}>&#9679;</div>

          <p className="accordion-title uppercase">{status}</p>
        </div>

        <div>
          <p className="count">{count} Task</p>
        </div>
      </button>

      <div
        ref={contentRef}
        id={id}
        className={`accordion-content ${clicked ? 'show' : ''}`}
      >
        <div className={cx('accordion-box', boxStyle)}>{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
