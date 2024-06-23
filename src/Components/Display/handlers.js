import moment from 'moment';

export const handleAddIncome = (setPopupTitle, setIsPopupOpen) => {
  setPopupTitle('Add Balance');
  setIsPopupOpen(true);
};

export const handleAddExpense = (setPopupTitle, setIsPopupOpen) => {
  setPopupTitle('Add Expenses');
  setIsPopupOpen(true);
};

export const handleEditExpense = (expense, setExpenseToEdit, setPopupTitle, setIsPopupOpen) => {
  setExpenseToEdit(expense);
  setPopupTitle('Edit Expenses');
  setIsPopupOpen(true);
};

export const handleDeleteExpense = (expenseToDelete, selectedExpenses, setSelectedExpenses, setExpensesChanged) => {
  const updatedExpenses = selectedExpenses.filter(expense => expense !== expenseToDelete);
  setSelectedExpenses(updatedExpenses);
  setExpensesChanged(true);
};

export const handleCancel = (setIsPopupOpen, setExpenseToEdit) => {
  setIsPopupOpen(false);
  setExpenseToEdit(null);
};

export const addButton = (popupTitle) => {
  if (popupTitle === 'Add Expenses') {
    return 'Add Expense';
  } else if (popupTitle === 'Add Balance') {
    return 'Add Balance';
  } else {
    return 'Add Expense';
  }
};

export const handleSubmit = (formData, popupTitle, balance,
                            setBalance, selectedExpenses, setSelectedExpenses,
                            setExpensesTotal, setExpensesChanged, setIsPopupOpen,
                            setExpenseToEdit, calculateInitialExpenses,expenseToEdit) => {
  const handleDateChange = (value) => {
    const formattedDate = moment(value, 'YYYY-MM-DD').format('MMMM D, YYYY');
    return formattedDate;
  };

  if (popupTitle === 'Add Expenses') {
    const newPrice = parseFloat(formData.price);
    if (isNaN(newPrice)) {
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
    setSelectedExpenses(prev => [...prev, newExpense]);
    setBalance(newBalance);
    setExpensesTotal(prevTotal => prevTotal + newPrice);
    setExpensesChanged(true);
  } else if (popupTitle === 'Edit Expenses') {
    const updatedExpenses = selectedExpenses.map(expense =>
      expense ===  expenseToEdit? { ...formData, date: handleDateChange(formData.date) } : expense
    );
    setSelectedExpenses(updatedExpenses);
    setExpensesChanged(true);
  } else if (popupTitle === 'Add Balance') {
    console.log(formData.Balance);
    const additionalBalance = parseFloat(formData.Balance);
    if (isNaN(additionalBalance)) {
      alert('Please enter a valid balance.');
      return;
    }
    const newBalance = balance + additionalBalance;
    setBalance(newBalance);
    setExpensesChanged(true);
    console.log(balance);
  }

  setIsPopupOpen(false);
  setExpenseToEdit(null);
  calculateInitialExpenses();
};
