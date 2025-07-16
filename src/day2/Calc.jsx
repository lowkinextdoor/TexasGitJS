import React, { useState } from "react";

export default function SimpleCalculatorMinimal() {
  const [input, setInput] = useState("");

  const calculate = (expr) => {
    try {
      const outputQueue = [];
      const operatorStack = [];
      const operators = {
        "+": { precedence: 1, associativity: "L" },
        "-": { precedence: 1, associativity: "L" },
        "*": { precedence: 2, associativity: "L" },
        "/": { precedence: 2, associativity: "L" },
      };

      const tokens = expr.match(/(\d+\.?\d*|\.\d+|[+\-*/()])/g);
      if (!tokens) return "Error";

      tokens.forEach((token) => {
        if (!isNaN(token)) {
          outputQueue.push(parseFloat(token));
        } else if ("+-*/".includes(token)) {
          while (
            operatorStack.length &&
            "+-*/".includes(operatorStack[operatorStack.length - 1])
          ) {
            const topOp = operatorStack[operatorStack.length - 1];
            if (
              (operators[token].associativity === "L" &&
                operators[token].precedence <= operators[topOp].precedence) ||
              (operators[token].associativity === "R" &&
                operators[token].precedence < operators[topOp].precedence)
            ) {
              outputQueue.push(operatorStack.pop());
            } else {
              break;
            }
          }
          operatorStack.push(token);
        } else if (token === "(") {
          operatorStack.push(token);
        } else if (token === ")") {
          while (
            operatorStack.length &&
            operatorStack[operatorStack.length - 1] !== "("
          ) {
            outputQueue.push(operatorStack.pop());
          }
          if (operatorStack.length === 0 || operatorStack.pop() !== "(") {
            throw new Error("Mismatched parentheses");
          }
        } else {
          throw new Error("Invalid token");
        }
      });

      while (operatorStack.length) {
        const op = operatorStack.pop();
        if (op === "(" || op === ")") throw new Error("Mismatched parentheses");
        outputQueue.push(op);
      }

      const stack = [];
      outputQueue.forEach((token) => {
        if (typeof token === "number") {
          stack.push(token);
        } else {
          const b = stack.pop();
          const a = stack.pop();
          switch (token) {
            case "+":
              stack.push(a + b);
              break;
            case "-":
              stack.push(a - b);
              break;
            case "*":
              stack.push(a * b);
              break;
            case "/":
              stack.push(a / b);
              break;
            default:
              throw new Error("Unknown operator");
          }
        }
      });

      if (stack.length !== 1) throw new Error("Invalid Expression");
      return stack[0];
    } catch {
      return "Error";
    }
  };

  const handleClick = (value) => {
    if (value === "C") {
      setInput("");
    } else if (value === "=") {
      const res = calculate(input);
      setInput(res.toString());
    } else {
      setInput(input + value);
    }
  };

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "C", "+",
    "=",
  ];

  return (
    <div style={styles.wrapper}>
      <div style={styles.calculator}>
        <input
          type="text"
          value={input}
          readOnly
          placeholder="0"
          style={styles.display}
        />
        <div style={styles.buttons}>
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => handleClick(btn)}
              style={btn === "=" ? styles.equalsButton : styles.button}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  calculator: {
    backgroundColor: "#fdfdfd",
    padding: 24,
    borderRadius: 16,
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: 340,
  },
  display: {
    width: "100%",
    height: 60,
    fontSize: 28,
    marginBottom: 16,
    padding: "0 14px",
    borderRadius: 12,
    border: "1px solid #ddd",
    textAlign: "right",
    color: "#111",
    backgroundColor: "#fff",
  },
  buttons: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 12,
  },
  button: {
    padding: 18,
    fontSize: 20,
    borderRadius: 12,
    backgroundColor: "#f9f9f9",
    border: "1px solid #ccc",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  equalsButton: {
    padding: 18,
    fontSize: 20,
    borderRadius: 12,
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s",
    gridColumn: "span 4",
  },
};
