import React, { useState } from 'react';
import styles from './Popup.module.css';
function EditPopup({ title, button, onCancel, onSubmit }) {
  const [formData, setFormData] = useState({
    Balance: '',
    name: '',
    price: '',
    category: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      Balance: '',
      name: '',
      price: '',
      category: '',
      date: ''
    });
  };

  return (
    <div className={styles.popup}>
      <div className={styles.title}>{title}</div>
      <form onSubmit={handleSubmit}>
        {title === 'Add Balance' ? (
          <div className={styles.inputs}>
            <input
              type='number'
              name="Balance"
              placeholder='Add Balance'
              value={formData.Balance}
              onChange={handleChange}
            />
          </div>
        ) : (
          <div>
            <div className={styles.inputs}>
              <input
                type="text"
                name="name"
                placeholder="Title"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <div className={styles.categories}>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Health">Health</option>
                <option value="House">House</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Travel">Travel</option>
              </select>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        )}
        <div className={styles.buttons}>
          <button type="submit">{button}</button>
          <button type="button" onClick={onCancel} className={styles.cancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditPopup;
