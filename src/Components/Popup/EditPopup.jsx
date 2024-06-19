import React, { useState } from 'react';
import styles from './Popup.module.css';
function EditPopup({ title, button, onCancel, onSubmit }) {
  const [formData, setFormData] = useState({
    balance: '',
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
      balance: '',
      name: '',
      price: '',
      category: '',
      date: ''
    });
  };

  return (
    <div>
      <div>{title}</div>
      <form onSubmit={handleSubmit}>
        {title === 'Add Balance' ? (
          <div>
            <input
              type='number'
              name="balance"
              placeholder='Add Balance'
              value={formData.balance}
              onChange={handleChange}
            />
          </div>
        ) : (
          <div>
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
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="food">Food</option>
              <option value="health">Health</option>
              <option value="house">House</option>
              <option value="entertainment">Entertainment</option>
              <option value="transport">Transport</option>
            </select>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div>
          <button type="submit">{button}</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditPopup;
