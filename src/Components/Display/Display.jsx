import React, { useState, useEffect } from 'react';
import styles from './Display.module.css';
import EditPopup from '../Popup/EditPopup';
import Piechart from '../Charts/Piechart';
import HorizontalBarChart from '../Charts/Barchart'; 
import { HiOutlineXCircle } from "react-icons/hi2";
import { GrEdit } from "react-icons/gr";
import { IoPizzaOutline } from "react-icons/io5";//food
import { FaCaravan } from "react-icons/fa6";//travel
import { AiFillGift } from "react-icons/ai";//entertainment
import { MdOutlineHealthAndSafety } from "react-icons/md";//health
import { BsHouse } from "react-icons/bs";//house
import moment from 'moment';
function Display() {
  const mainBalance = parseFloat(localStorage.getItem('mainbalance')) || 5000; 
  const [balance, setBalance] = useState(mainBalance);
  const [expensesTotal, setExpensesTotal] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [selectedExpenses, setSelectedExpenses] = useState(JSON.parse(localStorage.getItem('selectedExpenses')) ||[
    { mainBalance:5000,
      accountBalance: 4500 },
    {
      name: 'Movie',
      price: 300,
      category: 'Entertainment',
      date: 'March 21,2024'
    },
    {
      name: 'Samosa',
      price: 150,
      category: 'Food',
      date: 'March 20,2024'
    },
    
    {
      name: 'Auto',
      price: 50,
      category: 'Travel',
      date: 'March 22,2024'
    }
  ]);

  // if(mainBalance!==selectedExpenses[0].accountBalance){
  //   setBalance(()=>{
  //     const accountBalance = selectedExpenses[0].accountBalance;
  //     return accountBalance;
  //   });
  // }

  

  useEffect(() => {
    calculateInitialExpenses();
  }, [selectedExpenses]);
  useEffect(() => {
    localStorage.setItem('mainBalance', balance.toString());
    localStorage.setItem('selectedExpenses', JSON.stringify(selectedExpenses));
  },[balance, selectedExpenses]);

  const calculateInitialExpenses = () => {
    let totalExpenses = 0;
    selectedExpenses.forEach(expense => {
      if (!isNaN(parseFloat(expense.price))) {
        totalExpenses += parseFloat(expense.price);
      }
    });
    setExpensesTotal(totalExpenses);
    setBalance(mainBalance - totalExpenses);
    
  };

  const handleAddIncome = () => {
    setPopupTitle('Add Balance');
    setIsPopupOpen(true);
  };

  const handleAddExpense = () => {
    setPopupTitle('Add Expenses');
    setIsPopupOpen(true);
  };

  const handleEditExpense = (expense,index) => {
    setExpenseToEdit(expense);
    setPopupTitle('Edit Expenses');
    setIsPopupOpen(true);
  };

  const handleDeleteExpense = (expenseToDelete) => {
    const updatedExpenses = selectedExpenses.filter(expense => expense !== expenseToDelete);
    setSelectedExpenses(updatedExpenses);
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
    setExpenseToEdit(null);
  };

  const addButton = (popupTitle) => {
    if(popupTitle==='Add Expenses'){
      return 'Add Expense'
    }else if(popupTitle==='Add Balance'){
      return 'Add Balance'
    }else{
      return 'Add Expense'
    }
  }
  const handleSubmit = (formData) => {
    const handleDateChange = (value) => {
      const formattedDate = moment(value,'YYYY-MM-DD').format('MMMM D, YYYY');
      return formattedDate;
    };
   

    if (popupTitle === 'Add Expenses') {
      const newPrice = parseFloat(formData.price);
      if(isNaN(newPrice)){
        alert('Please enter a valid price');
      }
      const newBalance = balance - newPrice;
      if (newBalance < 0) {
        alert('You cannot spend more than your available balance.');
        return;
      }
      const newExpense = {
        ...formData,
        price: newPrice,
        date: handleDateChange(formData.date)
      };
      console.log(newExpense);
      setSelectedExpenses(prev=>[...prev, newExpense]);
      setBalance(newBalance);
      setExpensesTotal(prevTotal=>prevTotal+newPrice);
      
    } else if (popupTitle === 'Edit Expenses') {
      const updatedExpenses = selectedExpenses.map(expense =>
        expense === expenseToEdit ? { ...formData,date:handleDateChange(formData.date) } : expense
        
      );
      setSelectedExpenses(updatedExpenses);
    }else if (popupTitle==='Add Balance'){
      console.log(formData.Balance);
      const additionalBalance = parseFloat(formData.Balance);
      if (isNaN(additionalBalance)) {
        alert('Please enter a valid balance.');
        return;
      }
      const newBalance = balance + additionalBalance;
      setBalance(newBalance);
      console.log("New Balance: ", newBalance);
    }
    setIsPopupOpen(false);
    setExpenseToEdit(null);
  };
  const renderCategoryIcon = (category) => {
    switch (category) {
      case 'Food':
        return <div className={styles.categoryIcon}><IoPizzaOutline  /></div>;
      case 'Travel':
        return <div className={styles.categoryIcon}><FaCaravan /></div>;
      case 'Entertainment':
        return <div className={styles.categoryIcon}><AiFillGift/></div>;
      case 'Health':
        return <div className={styles.categoryIcon}><MdOutlineHealthAndSafety  /></div>;
      case 'House':
        return <div className={styles.categoryIcon}><BsHouse /></div>;
      default:
        return <div className={styles.categoryIcon}><HiOutlineXCircle/></div>;
    }
  };

  return (
    <div className={styles.display}>
      
      {isPopupOpen?(
        <EditPopup
          title={popupTitle}
          button={addButton(popupTitle)}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          expenseToEdit={expenseToEdit}
        />
      ):(
        <div>
          <div className={styles.title}>Expense Tracker</div>
          <div className={styles.topdisplay}>
              <div className={styles.balance}>
                Wallet Balance: ₹ {balance}
                <button onClick={handleAddIncome}>+ Add Income</button>
              </div>
              <div className={styles.expenses}>
                Expenses: ₹ {expensesTotal}
                <button onClick={handleAddExpense}>+ Add Expense</button>
              </div>
              <div>
                <Piechart expensesData={selectedExpenses} />
              </div>
          </div>
          <div className={styles.bottomdisplay}>
              <div className={styles.recenttransactions}>
                  <div className={styles.title1}>Recent Transactions</div>
                  <div className={styles.expenselist}>
                    <ul>
                      {selectedExpenses.slice(1).map((expense, index) => (
                        expense.name && expense.price && (
                            <li key={index}>
                              <div className={styles.listitem}>
                                <div>
                                  {renderCategoryIcon(expense.category)}
                                  <div className={styles.listname}>
                                    <div>{expense.name}</div>
                                    <div>{expense.date}</div>
                                  </div>
                                </div>
                                <div>
                                <div> ₹ {expense.price}</div>
                                <div className={styles.icondelete}><button onClick={() => handleDeleteExpense(expense)}><HiOutlineXCircle/></button></div>
                                <div className={styles.iconedit}><button onClick={() => handleEditExpense(expense,index)}><GrEdit  /></button></div>  
                                </div>                          
                              </div>
                            </li>
                          )
                        ))}
                    </ul>
                  </div>
              </div>        
              <div className={styles.topexpenses}>
                  <div className={styles.title1}>Top Expenses</div>
                  <HorizontalBarChart expensesData={selectedExpenses} />
              </div>
          </div>
        </div>   
      )}
    </div>
  );
}

export default Display;
