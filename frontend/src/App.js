import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

function App() {
  const [showForm, setShowForm] = useState(false); 
  const [secretKey, setSecretKey] = useState("");
  const [payments, setPayments] = useState(null);
  const [balance, setBalance] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/stripe-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ secretKey }), 
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setBalance(data.balance);
          setPayments(data.payments);
          setIsAuthenticated(true); 
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <>
      {!isAuthenticated ? (
        <>
          {!showForm ? (
            <Button variant="dark" size="lg" onClick={() => setShowForm(true)}>
              Authenticate with Stripe
            </Button>
          ) : (
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="secretKey">
                <Form.Label>Secret Key</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your Stripe Secret Key"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </>
      ) : (
        <>
          <h2>Balance Information</h2>
          <p>
            Available Balance: {balance.available[0].amount / 100}{" "}
            {balance.available[0].currency.toUpperCase()}
          </p>

          <h2>Payments</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {payments &&
                payments.map((payment, index) => (
                  <tr key={index}>
                    <td>
                      {new Date(payment.created * 1000).toLocaleDateString()}
                    </td>
                    <td>
                      {payment.amount / 100} {payment.currency.toUpperCase()}
                    </td>
                    <td>{payment.description || "No Description"}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
}

export default App;
