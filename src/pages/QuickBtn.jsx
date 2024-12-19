import React , {useState, useEffect} from 'react';
import { BiSolidUpArrowAlt } from "react-icons/bi";



const QuickBtn = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(()=>{
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300); //스크롤 탑의 위치가 300이상이면 true
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }

  },[]);
  const scrollToTop = () => {
window.scrollTo({top:0, behavior:'smooth'});
  }

  return isVisible && (
    <div className='quickBtn'>
      <button className='quick-top' type='button' onClick={scrollToTop}>
        <BiSolidUpArrowAlt className='upArrowBtn' style={{}}/>
      </button>
    </div>
  );
};

export default QuickBtn;