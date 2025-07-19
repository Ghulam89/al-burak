import React from "react";
import product from "../../assets/images/product.jpg";

const coupons = [
  {
    title: "Welcome Gift Voucher",
    discount: "10%",
    active: true,
    code: "Welcome100",
    time: { day: 25, hrs: 5, min: 56, sec: 34 },
  },
  {
    title: "Winter Gift Voucher",
    discount: "15%",
    active: true,
    code: "WINTER23",
    time: { day: 178, hrs: 5, min: 56, sec: 34 },
  },
  {
    title: "Summer Gift Voucher",
    discount: "12%",
    active: false,
    code: "SUMMER23",
    time: { day: 0, hrs: 0, min: 0, sec: 0 },
  },
  {
    title: "Summer Gift Voucher",
    discount: "12%",
    active: false,
    code: "SUMMER23",
    time: { day: 0, hrs: 0, min: 0, sec: 0 },
  },
];

const CouponSection = () => {
  return (
    <div style={styles.wrapper}>
      {/* Heading Section */}
      <div style={styles.headingContainer}>
        <div style={styles.line}></div>
        <div style={styles.heading}>COUPONS</div>
        <div style={styles.line}></div>
      </div>

      {/* Coupon Cards Section */}
      <div style={styles.container}>
        {coupons.map((coupon, index) => (
          <div key={index} style={styles.card}>
            {/* Left Section */}
            <div style={styles.left}>
              <img src={product} alt="product" style={styles.img} />
              <div>
                <h3 style={styles.title}>{coupon.title}</h3>
                <p style={styles.discount}>
                  <span style={styles.discountNum}>{coupon.discount}</span> Off
                </p>
                <div style={styles.timer}>
                  <span>{coupon.time.day} DAY</span> |
                  <span>{coupon.time.hrs} HRS</span> |
                  <span>{coupon.time.min} MIN</span> |
                  <span>{coupon.time.sec} SEC</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={styles.divider}></div>

            {/* Right Section */}
            <div style={styles.right}>
              <span
                style={{
                  ...styles.status,
                  color: coupon.active ? "#27ae60" : "#c0392b",
                }}
              >
                {coupon.active ? "Coupon Active" : "Coupon Inactive"}
              </span>
              <div style={styles.code}>{coupon.code}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: "#000",
    padding: "40px 20px",
    fontFamily: "'Arial', sans-serif",
    overflowX: "hidden",
  },
  headingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "30px",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#E5D0A5",
    padding: "0 15px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  line: {
    height: "3px",
    backgroundColor: "#E5D0A5",
    flex: 1,
    maxWidth: "550px",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "25px",
  },
  card: {
    width: "500px",
    height: "160px",
    backgroundColor: "black",
    border: "1px solid #EAEAEF",
    display: "flex",
    position: "relative",
    padding: "20px",
    alignItems: "center",
  },
  left: {
    flex: 2,
    paddingRight: "20px",
    display: "flex",
    gap: "10px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  img: {
    width: "100px",
    height: "auto",
    marginRight: "10px",
    objectFit: "contain",
  },
  title: {
    color: "#E5D0A5",
    fontSize: "18px",
    fontWeight: "500",
    marginBottom: "10px",
  },
  discount: {
    color: "#525258",
    fontSize: "17px",
    marginBottom: "15px",
  },
  discountNum: {
    color: "#FF2400",
    fontSize: "17px",
    fontWeight: "400",
  },
  timer: {
    color: "#E5D0A5",
    fontSize: "14px",
    display: "flex",
    textAlign: "center",
    justifyContent: "space-between",
    gap: "8px",
  },
  divider: {
    width: "4px",
    height: "100%",
    borderLeft: "3px dashed #E5D0A5",
    margin: "0 20px",
    backgroundColor: "transparent",
  },
  right: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  status: {
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  code: {
    backgroundColor: "#E5D0A5",
    color: "#000",
    fontSize: "15px",
    height: "20px",
    padding: "10px",
    border: "2px dashed black",
    fontWeight: "400",
    fontFamily: "monospace",
    letterSpacing: "1px",
  },
  "@media (max-width: 768px)": {
    wrapper: {
      padding: "30px 15px",
    },
    headingContainer: {
      marginBottom: "20px",
    },
    heading: {
      fontSize: "22px",
      fontFamily: "'Inter', serif",
      padding: "0 10px",
      letterSpacing: "0.5px",
    },
    line: {
      height: "2px",
      maxWidth: "100%",
    },
    container: {
      flexDirection: "column",
      gap: "15px",
    },
    card: {
      width: "100%",
      height: "auto",
      flexDirection: "column",
      alignItems: "stretch",
      padding: "15px",
    },
    left: {
      paddingRight: 0,
      marginBottom: "10px",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: "8px",
    },
    img: {
      width: "90px",
      marginBottom: "5px",
    },
    title: {
      fontSize: "15px",
      fontFamily: "'Righteous', serif",
      marginBottom: "5px",
    },
    discount: {
      fontSize: "14px",
      fontFamily: "'Righteous', serif",
      marginBottom: "8px",
    },
    discountNum: {
      fontSize: "14px",
      fontFamily: "'Righteous', serif",
    },
    timer: {
      fontSize: "11px",
      gap: "3px",
      fontFamily: "'Righteous', serif",
    },
    divider: {
      width: "100%",
      height: "1px",
      borderTop: "1px dashed #E5D0A5",
      borderLeft: "none",
      margin: "10px 0",
    },
    right: {
      alignItems: "center",
    },
    status: {
      fontSize: "12px",
      fontFamily: "'Righteous', serif",
      marginBottom: "8px",
    },
    code: {
      fontSize: "12px",
      fontFamily: "'Righteous', serif",
      padding: "6px 8px",
      letterSpacing: "0.5px",
    },
  },
};

export default CouponSection;