// src/pages/Dashboard.jsx
import React from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import OrdersPage from '../components/context/order';

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
        <OrdersPage/>
    </>
  );
};

export default Dashboard;