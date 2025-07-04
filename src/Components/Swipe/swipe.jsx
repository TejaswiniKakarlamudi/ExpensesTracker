import React from 'react';

import { HiOutlineXCircle } from 'react-icons/hi';
import { GrEdit } from 'react-icons/gr';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Scrollbar, Mousewheel } from 'swiper/modules';
import styles from './swipe.module.css';

const Swipe = ({ selectedExpenses, renderCategoryIcon, handleDeleteExpense, setSelectedExpenses, setExpensesChanged, handleEditExpense, setExpenseToEdit, setPopupTitle, setIsPopupOpen,circle,edit }) => {
  return (
    <div className={styles.recenttransactions}>
      
      <Swiper
        direction={'vertical'}
        slidesPerView={3}
        freeMode={true}
        scrollbar={{ draggable: true }}
        mousewheel={true}
        modules={[FreeMode, Scrollbar, Mousewheel]}
        className={`${styles.mySwiper} mySwiper`}
      >
        {selectedExpenses.map((expense, index) => (
          expense.name && expense.price && (
            
            <SwiperSlide key={index} className={styles.expenseSlide}>
              
              <div className={styles.expenselist}>
                    <div className={styles.listitem}>
                      <div>
                        {renderCategoryIcon(expense.category)}
                        <div className={styles.listname}>
                          <div>{expense.name}</div>
                        </div>
                      </div>
                      <div>
                        <div className={styles.price}>₹{expense.price}</div>
                        <div className={styles.icondelete}>
                          <button onClick={() => handleDeleteExpense(expense, selectedExpenses, setSelectedExpenses, setExpensesChanged)}>
                            <HiOutlineXCircle />
                          </button>
                        </div>
                        <div className={styles.iconedit}>
                          <button onClick={() => handleEditExpense(expense, setExpenseToEdit, setPopupTitle, setIsPopupOpen)}>
                            <GrEdit />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className={styles.date}>{expense.date}</div>
                  
              </div>
            </SwiperSlide>
                   
          )
        ))}

      </Swiper>
    </div>

  );
};

export default Swipe;
