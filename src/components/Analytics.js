import {
  Divider,
  Flex,
  Group,
  Progress,
  RingProgress,
  Text,
} from "@mantine/core";
import "./../stylesheets/analytics.css";

function Analytics({ transactions }) {
  const totalTransactions = transactions.length;

  //total amount
  const totalAmount = transactions.reduce((acc, transaction) => {
    return acc + Number(transaction.amount);
  }, 0);
  const totalIncomeAmount = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => {
      return acc + Number(transaction.amount);
    }, 0);
  const totalExpenseAmount = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => {
      return acc + Number(transaction.amount);
    }, 0);
  const totalIncomeAmountPercentage = (totalIncomeAmount / totalAmount) * 100;
  const totalExpenseAmountPercentage = (totalExpenseAmount / totalAmount) * 100;

  // transactions count
  const totalIncomeTransactions = transactions.filter(
    (transaction) => transaction.type === "income"
  ).length;
  const totalExpenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  ).length;
  const totalIncomeTransactionsPercentage =
    (totalIncomeTransactions / totalTransactions) * 100;
  const totalExpenseTransactionsPercentage =
    (totalExpenseTransactions / totalTransactions) * 100;

  // categories
  const categories = [
    { value: "food", label: "Food" },
    { value: "transportation", label: "Transportation" },
    { value: "shopping", label: "Shopping" },
    { value: "entertainment", label: "Entertainment" },
    { value: "health", label: "Health" },
    { value: "education", label: "Education" },
    { value: "salary", label: "Salary" },
    { value: "freelance", label: "Freelance" },
    { value: "investment", label: "Investment" },
    { value: "business", label: "Business" },
  ];

  return (
    <div>
      <div>
        <Group className="flex" spacing="md" grow>
          <Flex gap="lg" className="total-balance justify-center items-center">
            <div>
              <h1 className="card-title">
                Total Balance: {totalIncomeAmount - totalExpenseAmount}
              </h1>
              <Divider my={20} />

              <p>Total Income: {totalIncomeAmount}</p>
              <p>Total Expense: {totalExpenseAmount}</p>
            </div>
            <RingProgress
              label={
                <Text size="xs" align="center">
                  Income {totalIncomeAmountPercentage.toFixed(2)}%
                </Text>
              }
              roundCaps
              sections={[
                { value: 100 - totalIncomeAmountPercentage },
                { value: totalIncomeAmountPercentage, color: "green" },
              ]}
            />
            <RingProgress
              label={
                <Text size="xs" align="center">
                  Expense {totalExpenseAmountPercentage.toFixed(2)}%
                </Text>
              }
              roundCaps
              sections={[
                { value: 100 - totalExpenseAmountPercentage },
                { value: totalExpenseAmountPercentage, color: "red" },
              ]}
            />
          </Flex>

          <Flex
            gap="lg"
            className="total-transactions justify-center items-center"
          >
            <div>
              <h1 className="card-title">
                Total Transactions: {totalTransactions}
              </h1>
              <Divider my={20} />

              <p>Income Transactions: {totalIncomeTransactions}</p>
              <p>Expense Transactions: {totalExpenseTransactions}</p>
            </div>
            <RingProgress
              label={
                <Text size="xs" align="center">
                  Income {totalIncomeTransactionsPercentage.toFixed(2)}%
                </Text>
              }
              roundCaps
              sections={[
                { value: 100 - totalIncomeTransactionsPercentage },
                { value: totalIncomeTransactionsPercentage, color: "green" },
              ]}
            />
            <RingProgress
              label={
                <Text size="xs" align="center">
                  Expense {totalExpenseTransactionsPercentage.toFixed(2)}%
                </Text>
              }
              roundCaps
              sections={[
                { value: 100 - totalExpenseTransactionsPercentage },
                { value: totalExpenseTransactionsPercentage, color: "red" },
              ]}
            />
          </Flex>
        </Group>
        <Group mt={20} grow>
          <div className="income-categories">
            <h1 className="card-title">Income Categories</h1>
            <Divider my={20} />
            {categories.map((category) => {
              const incomeCategoryTransactionsAmount = transactions
                .filter(
                  (transaction) =>
                    transaction.type === "income" &&
                    transaction.category === category.value
                )
                .reduce((acc, transaction) => {
                  return acc + Number(transaction.amount);
                }, 0);
              const incomeCategoryTransactionsPercentage =
                (incomeCategoryTransactionsAmount / totalIncomeAmount) * 100;
              return (
                <div>
                  <p>{category.label}</p>
                  <Progress
                    size={25}
                    color="teal"
                    value={incomeCategoryTransactionsPercentage}
                    label={
                      incomeCategoryTransactionsPercentage.toFixed(2) + "%"
                    }
                  />
                </div>
              );
            })}
          </div>

          <div className="expense-categories">
            <h1 className="card-title">Expense Categories</h1>
            <Divider my={20} />
            {categories.map((category) => {
              const expenceCategoryTransactionsAmount = transactions
                .filter(
                  (transaction) =>
                    transaction.type === "expense" &&
                    transaction.category === category.value
                )
                .reduce((acc, transaction) => {
                  return acc + Number(transaction.amount);
                }, 0);
              const expenceCategoryTransactionsPercentage =
                (expenceCategoryTransactionsAmount / totalExpenseAmount) * 100;
              return (
                <div>
                  <p>{category.label}</p>
                  <Progress
                    size={25}
                    color="red"
                    value={expenceCategoryTransactionsPercentage}
                    label={
                      expenceCategoryTransactionsPercentage.toFixed(2) + "%"
                    }
                  />
                </div>
              );
            })}
          </div>
        </Group>
      </div>
    </div>
  );
}

export default Analytics;
