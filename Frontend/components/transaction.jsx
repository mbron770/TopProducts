import { useContext } from "react";
import { data } from "../context";

export default function Transaction({ transactions }) {
  const { cart, searchTerm, setSearchTerm } = useContext(data);

  const groupedTransactions = transactions.reduce((groups, transaction) => {
    if (!groups[transaction.transaction_code]) {
      groups[transaction.transaction_code] = [];
    }
    groups[transaction.transaction_code].push(transaction);
    return groups;
  }, {});

  const filteredTransactionCodes = Object.keys(groupedTransactions).filter(
    (transactionCode) => {
      return (
        transactionCode.includes(searchTerm) ||
        groupedTransactions[transactionCode].some(
          (transaction) =>
            transaction.product.product_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            transaction.product.product_quantity
              .toString()
              .includes(searchTerm) ||
            transaction.product.price.toString().includes(searchTerm) ||
            new Date(transaction.transaction_date)
              .toLocaleDateString()
              .includes(searchTerm)
        )
      );
    }
  );

  return (
    <div className="bg-gray-50 h-full w-[50vw] max-w-screen-lg mx-auto">
      {filteredTransactionCodes.reverse().map((transactionCode) => (
        <div
          key={transactionCode}
          className="flex flex-col shadow hover:shadow-md w-full bg-white rounded-lg overflow-hidden cursor-pointer mb-6"
        >
          <table className="w-full text-md text-left text-indigo-500">
            <thead className="text-xs text-indigo-500 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 rounded-l-lg">
                  Products
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3 rounded-r-lg">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {groupedTransactions[transactionCode].map(
                (transaction, index) => (
                  <tr key={index} className="bg-gray-50">
                    <th
                      scope="row"
                      className="px-2 py-2 font-medium text-indigo-500 whitespace-nowrap"
                    >
                      <img
                        src={transaction.product.image}
                        alt="Product"
                        className="inline-block max-w-xs max-h-12 align-middle mr-2"
                      />
                      <span className="inline-block align-middle">
                        {transaction.product.product_name}
                      </span>
                    </th>

                    <td className="px-6 py-4">
                      {transaction.product.product_quantity}
                    </td>
                    <td className="px-6 py-4">{`$${transaction.product.price.toFixed(
                      2
                    )}`}</td>
                  </tr>
                )
              )}
            </tbody>
            <tfoot>
              <tr className="font-semibold text-indigo-500">
                <th scope="row" className="text-sm px-6 py-3 text-base">
                  {`Order Date: ${new Date(
                    groupedTransactions[transactionCode][0].transaction_date
                  ).toLocaleDateString()}`}
                </th>

                <td className="text-sm px-6 py-3">{`Order Number: ${transactionCode}`}</td>
                <td className="text-sm px-6 py-3">{`Order Total: $${groupedTransactions[
                  transactionCode
                ]
                  .reduce(
                    (sum, transaction) => sum + transaction.product.price * 2,
                    0
                  )
                  .toFixed(2)}`}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      ))}
    </div>
  );
}
